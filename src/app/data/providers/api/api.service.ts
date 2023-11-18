import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserApiService } from './Contract/user-api.service';
import { TourApiService } from './Tour/tour-api.service';
import { ExposeApiService } from './Expose/expose-api.service';
import { TransactionApiService } from './Transaction/transaction-api.service';
import {
  IDeleteTourIntentDescription,
  IUnlinkTourIntentDescription,
  ITourCollectionRequestDescription,
  ITourCollectionSliceDescription,
  ILinkTourIntentDescription,
  IApproveTourFloorPlanOrderIntentDescription,
  IDeclineTourFloorPlanOrderIntentDescription
} from 'src/app/domain/interfaces/api/descriptions/tour/description';
import { IExposeCollectionRequestDescription, IExposeCollectionSliceDescription } from 'src/app/domain/interfaces/api/descriptions/expose/description';
import { IApiIntentResponse, ICreateTransactionIntentResponse, IEncryptFastSpringOrderDataIntentResponse } from 'src/app/domain/interfaces/api/descriptions/intent.response';
import {
  IUserChangePlayerStylesIntentDescription,
  IUserContractResponseDescription,
  IUserPlayerStylesResponseDescription,
  IUserPlayerUploadedLogoResponseDescription
} from 'src/app/domain/interfaces/api/descriptions/user/description';
import { ICreateTransactionIntentDescription } from 'src/app/domain/interfaces/api/descriptions/transaction/description';
import { IEncryptFastSpringOrderDataIntentDescription } from 'src/app/domain/interfaces/api/descriptions/fastspring/description';
import { FastSpringApiService } from './Fast-Spring/fast-spring-api.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private userApiService: UserApiService,
    private tourApiService: TourApiService,
    private exposeApiService: ExposeApiService,
    private transactionApiService: TransactionApiService,
    private fastSpringApiService: FastSpringApiService
  ) { }

  public getUserContractRequest(): Observable<IUserContractResponseDescription> {
    return this.userApiService.getContract();
  }

  public getUserPlayerStylesRequest(userID: string): Observable<IUserPlayerStylesResponseDescription> {
    return this.userApiService.getPlayerStyles(userID);
  }

  public getTourCollectionSliceRequest(reqParams: ITourCollectionRequestDescription): Observable<ITourCollectionSliceDescription> {
    return this.tourApiService.getTourCollectionSlice(reqParams);
  }

  public getExposeCollectionSliceRequest(reqParams: IExposeCollectionRequestDescription): Observable<IExposeCollectionSliceDescription> {
    return this.exposeApiService.getExposeCollectionSlice(reqParams);
  }

  public changeUserPlayerStylesIntent(styles: IUserChangePlayerStylesIntentDescription, userID: string): Observable<IUserPlayerStylesResponseDescription> {
    return this.userApiService.setPlayerStyles(styles, userID);
  }

  public uploadUserPlayerLogoImageIntent(imageData: File, type: 'NORMAL' | 'ROUNDED'): Observable<IUserPlayerUploadedLogoResponseDescription> {
    return this.userApiService.uploadPlayerLogoImages(imageData, type);
  }

  public deleteTourIntent(deleteData: IDeleteTourIntentDescription): Observable<IApiIntentResponse> {
    return this.tourApiService.deleteTour(deleteData);
  }

  public linkTourIntent(linkData: ILinkTourIntentDescription): Observable<IApiIntentResponse> {
    return this.tourApiService.linkTourToExpose(linkData);
  }

  public unlinkTourIntent(unlinkData: IUnlinkTourIntentDescription): Observable<IApiIntentResponse> {
    return this.tourApiService.unlinkTourFromExpose(unlinkData);
  }

  public approveTourFloorplanOrderIntent(approveData: IApproveTourFloorPlanOrderIntentDescription): Observable<IApiIntentResponse> {
    return this.tourApiService.approveFloorplanOrder(approveData);
  }

  public declineTourFloorplanOrderIntent(declineData: IDeclineTourFloorPlanOrderIntentDescription): Observable<IApiIntentResponse> {
    return this.tourApiService.declineFloorplanOrder(declineData);
  }

  public createTransactionIntent(transactionData: ICreateTransactionIntentDescription): Observable<ICreateTransactionIntentResponse> {
    return this.transactionApiService.createTransaction(transactionData);
  }

  public encryptSessionOrderObjectIntent(dataToEncrypt: IEncryptFastSpringOrderDataIntentDescription): Observable<IEncryptFastSpringOrderDataIntentResponse> {
    return this.fastSpringApiService.encryptSessionOrderObject(dataToEncrypt);
  }
}
