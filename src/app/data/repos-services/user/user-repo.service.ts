import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

import { ApiService } from "../../providers/api/api.service";
import { IUserContractDescription, IUserContractResponseDescription, IUserPlayerStylesResponseDescription, IUserPlayerUploadedLogoResponseDescription } from "src/app/domain/interfaces/api/descriptions/user/description";
import { IUserIntentResponseData } from "src/app/domain/interfaces/intent-response/user.response";
import { UserContract } from "src/app/domain/models/User/user.model";
import { IUploadTourPlayerLogoImagesIntent, IUserChangePlayerStylesIntent, IUserProductOrderIntent } from "src/app/domain/interfaces/user/user.interfaces";
import { ICreateTransactionIntentDescription, ITransactionDescription } from "src/app/domain/interfaces/api/descriptions/transaction/description";
import { ICreateTransactionIntentResponse, IEncryptFastSpringOrderDataIntentResponse } from "src/app/domain/interfaces/api/descriptions/intent.response";
import { IEncryptedFastSpringOrderDataDescription, IEncryptFastSpringOrderDataIntentDescription } from "src/app/domain/interfaces/api/descriptions/fastspring/description";

export declare const fastspring: any;

@Injectable()
export class UserRepoService {

  private userContract: UserContract;
  private transactionInProgressData: ITransactionDescription;
  private fastSpringSessionObject: any;
  private dollhousePlusFloorplan: boolean;

  constructor(
    private apiService: ApiService
  ) { }

  public getContract(): Observable<IUserIntentResponseData> {

    return this.apiService.getUserContractRequest()
      .pipe(
        map((response: IUserContractResponseDescription) => this.parseUserContractRequestResponse(response))
      );
  }

  public getPlayerStyles(userID: string): Observable<IUserIntentResponseData> {

    return this.apiService.getUserPlayerStylesRequest(userID)
      .pipe(
        map((response: IUserPlayerStylesResponseDescription) => this.parsePlayerStylesRequestResponse(response))
      );
  }

  public changePlayerStyles(styles: IUserChangePlayerStylesIntent, userID: string): Observable<IUserIntentResponseData> {

    return this.apiService.changeUserPlayerStylesIntent(styles, userID)
      .pipe(
        map((response: IUserPlayerStylesResponseDescription) => this.parsePlayerStylesRequestResponse(response))
      );
  }

  public orderProduct(orderData: IUserProductOrderIntent): Observable<IUserIntentResponseData> {

    if (orderData.product === 'DOLLHOUSE') {
      this.dollhousePlusFloorplan = true;
    } else {
      this.dollhousePlusFloorplan = false;
    }

    const createTransactionDescription: ICreateTransactionIntentDescription = <ICreateTransactionIntentDescription>{
      productType: orderData.product,
      purchaseType: orderData.purchaseType
    };

    return this.apiService.createTransactionIntent(createTransactionDescription)
      .pipe(
        switchMap((response: ICreateTransactionIntentResponse) => this.parseCreateTransactionIntentResponse(response, orderData))
      );
  }

  public uploadPlayerLogoImages(logoFilesData: IUploadTourPlayerLogoImagesIntent): Observable<IUserIntentResponseData> {

    if (logoFilesData.company && !logoFilesData.tripodCover) {

      return this.apiService.uploadUserPlayerLogoImageIntent(logoFilesData.company, 'NORMAL')
        .pipe(
          map((resp: IUserPlayerUploadedLogoResponseDescription) => this.parsePlayerLogoImagesUploadRequestResponse(resp.type, resp.details, undefined))
        );

    } else if (!logoFilesData.company && logoFilesData.tripodCover) {

      return this.apiService.uploadUserPlayerLogoImageIntent(logoFilesData.tripodCover, 'ROUNDED')
        .pipe(
          map((resp: IUserPlayerUploadedLogoResponseDescription) => this.parsePlayerLogoImagesUploadRequestResponse(resp.type, undefined, resp.details))
        );

    } else {

      return forkJoin([
        this.apiService.uploadUserPlayerLogoImageIntent(logoFilesData.company, 'NORMAL'),
        this.apiService.uploadUserPlayerLogoImageIntent(logoFilesData.tripodCover, 'ROUNDED')
      ]).pipe(
        map((resp: IUserPlayerUploadedLogoResponseDescription[]) => this.parsePlayerLogoImagesUploadRequestResponse(resp[1].type, resp[0].details, resp[1].details))
      );
    }
  }

  private parseCreateTransactionIntentResponse(response: ICreateTransactionIntentResponse, orderData: IUserProductOrderIntent): Observable<IUserIntentResponseData> {

    const responseDataStream$: BehaviorSubject<IUserIntentResponseData> = new BehaviorSubject(<IUserIntentResponseData>{
      result: undefined
    });

    if (response.type === 'TRANSACTION_CREATED' && this.dollhousePlusFloorplan === false) {

      let responseData: IUserIntentResponseData = <IUserIntentResponseData>{};

      this.transactionInProgressData = response.details;

      const dataToEncrypt: IEncryptFastSpringOrderDataIntentDescription = <IEncryptFastSpringOrderDataIntentDescription>{
        txIds: new Array<string>(response.details.id)
      };

      this.apiService.encryptSessionOrderObjectIntent(dataToEncrypt)
        .pipe(take(1))
        .subscribe({
          next: (response: IEncryptFastSpringOrderDataIntentResponse) => {

            if (response.type === 'QUERY_OK') {
              this.setFastSpringSession(response.details, orderData, dataToEncrypt.txIds);

              responseData = <IUserIntentResponseData>{
                result: 'Ok',
                intentResultResponse: 'Order_Created'
              }

              responseDataStream$.next(responseData);
            }
          },
          error: (err: any) => console.log(err)
        });
    }

    if (response.type === 'TRANSACTION_CREATED' && this.dollhousePlusFloorplan === true) {

      let responseData: IUserIntentResponseData = <IUserIntentResponseData>{};

      this.transactionInProgressData = response.details;

      const dataToEncrypt: IEncryptFastSpringOrderDataIntentDescription = <IEncryptFastSpringOrderDataIntentDescription>{
        txIds: new Array<string>(response.details.id)
      };

      this.apiService.createTransactionIntent({
        productType: 'FLOORPLAN',
        purchaseType: 'DIRECT_PURCHASE',
        relatedResourceID: ''
      }).subscribe({
        next: (res: ICreateTransactionIntentResponse) => {

          dataToEncrypt.txIds.push(res.details.id);

          this.apiService.encryptSessionOrderObjectIntent(dataToEncrypt)
            .pipe(take(1))
            .subscribe({
              next: (response: IEncryptFastSpringOrderDataIntentResponse) => {

                if (response.type === 'QUERY_OK') {
                  this.setFastSpringSession(response.details, orderData, dataToEncrypt.txIds);

                  responseData = <IUserIntentResponseData>{
                    result: 'Ok',
                    intentResultResponse: 'Order_Created'
                  }

                  responseDataStream$.next(responseData);
                }
              },
              error: (err: any) => console.log(err)
            });
        }
      });
    }

    return responseDataStream$.asObservable();
  }

  private setFastSpringSession(encryptedSessionData: IEncryptedFastSpringOrderDataDescription, orderData: IUserProductOrderIntent, txId: string[]): void {

    const orderTags = {
      'userEmail': orderData.userEmail,
      'contractID': this.userContract.ids.main,
      'tourID': orderData.resourceId,
      'billingUserID': this.transactionInProgressData.userID,
      'transactionIDs': txId,
      'action': orderData.purchaseType,
    };

    fastspring.builder.secure(encryptedSessionData.fsSecurePayload, encryptedSessionData.fsSecureKey, (session: any) => this.fastSpringSessionObject = session);

    fastspring.builder.tag(orderTags, (session: any) => this.fastSpringSessionObject = session);
  }

  private parseUserContractRequestResponse(response: IUserContractResponseDescription): IUserIntentResponseData {

    let responseData: IUserIntentResponseData = <IUserIntentResponseData>{
      result: 'Fail'
    };

    if (response.type === 'QUERY_OK') {
      responseData = <IUserIntentResponseData>{
        result: 'Ok',
        userContract: this.createUserContract(response.details)
      }

      this.userContract = this.createUserContract(response.details);
    }

    return responseData;
  }

  private parsePlayerStylesRequestResponse(response: IUserPlayerStylesResponseDescription): IUserIntentResponseData {

    let responseData: IUserIntentResponseData = <IUserIntentResponseData>{
      result: 'Fail'
    };

    if (response.type === 'HTTP_OK') {
      responseData = <IUserIntentResponseData>{
        result: 'Ok',
        userPlayerStyles: response.details
      }
    }

    return responseData;
  }

  private parsePlayerLogoImagesUploadRequestResponse(response: string, company?: string, tripodCover?: string): IUserIntentResponseData {

    let responseData: IUserIntentResponseData = <IUserIntentResponseData>{
      result: 'Fail'
    };

    if (response === 'HTTP_OK') {
      responseData = <IUserIntentResponseData>{
        result: 'Ok',
        userPlayerUploadedPreviewLogos: {
          company: company ? company : undefined,
          tripod: tripodCover ? tripodCover : undefined
        }
      }
    }

    return responseData;
  }

  private createUserContract(userContractDescription: IUserContractDescription): UserContract {

    const userContract: UserContract = new UserContract(userContractDescription);

    return userContract;
  }
}
