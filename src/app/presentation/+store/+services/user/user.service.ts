import { Injectable } from '@angular/core';

import { UserManager } from 'src/app/domain/usecase-services/user-manager';
import { UserStore } from '../../global/user/user.store';
import { IUserIntentResponseData } from 'src/app/domain/interfaces/intent-response/user.response';
import { IUploadTourPlayerLogoImagesIntent, IUserChangePlayerStylesIntent, IUserProductOrderIntent } from 'src/app/domain/interfaces/user/user.interfaces';
import { UiStateStore } from '../../global/ui-state/ui-state.store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceInitialized = false;

  constructor(
    private userManager: UserManager,
    private userStore: UserStore,
    private uiStateStore: UiStateStore
  ) { }

  public init(): void {
    if (!this.serviceInitialized) {
      this.serviceInitialized = true;
      this.userContractRequest();
    }
  }

  public makeProductOrder(productOrderData: IUserProductOrderIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'CREATE_ORDER_INTENT_SENT',
      latestProductOrderData: {
        resourceId: productOrderData.resourceId,
        productType: productOrderData.product
      }
    });

    this.userManager.orderProduct(productOrderData)
      .subscribe({
        next: (response: IUserIntentResponseData) => {

          if (response.result === 'Ok') {
            if (response.intentResultResponse === 'Order_Created') {
              this.uiStateStore.dispatchAction({
                action: 'CREATE_ORDER_RESPONSE_RECEIVED'
              });
            }
          }
        },
        error: (err: any) => console.log(err)
      });
  }

  public changeUserPlayerStyles(styles: IUserChangePlayerStylesIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'CHANGE_PLAYER_STYLES_INTENT_SENT'
    });

    this.userManager.changePlayerStyles(styles, this.userStore.state.userContract?.ids.user || '')
      .subscribe({
        next: (response: IUserIntentResponseData) => {

          if (response.result === 'Ok') {

            this.uiStateStore.dispatchAction({
              action: 'CHANGE_PLAYER_STYLES_RESPONSE_RECEIVED'
            });

            this.parseUserPlayerStylesRequestResponse(response);
          }
        }
      });
  }

  public uploadLogoImages(logoFiles: IUploadTourPlayerLogoImagesIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'UPLOAD_PLAYER_LOGO_IMAGE_INTENT_SENT'
    });

    this.userManager.uploadPlayerLogoImages(logoFiles)
      .subscribe({
        next: (data: IUserIntentResponseData) => this.parseUserPlayerLogoImageUploadRequestResponse(data),
        error: (err: any) => console.log(err)
      });
  }

  public clearUserPlayerPreviewData(): void {
    this.userStore.dispatch({
      action: 'CLEAR_USER_PLAYER_PREVIEW_DATA'
    });
  }

  private userContractRequest(): void {
    this.userManager.getContract()
      .subscribe({
        next: (data: IUserIntentResponseData) => this.parseUserContractRequestResponse(data),
        error: (err: any) => console.log(err)
      });
  }

  private userPlayerStylesRequest(userID?: string): void {

    if (userID) {
      this.userManager.getPlayerStyles(userID)
        .subscribe({
          next: (data: IUserIntentResponseData) => this.parseUserPlayerStylesRequestResponse(data),
          error: (err: any) => console.log(err)
        });
    }
  }

  private parseUserContractRequestResponse(data: IUserIntentResponseData): void {
    this.userStore.dispatch({
      action: 'SET_USER_CONTRACT',
      userContract: data.userContract
    });

    this.userPlayerStylesRequest(data.userContract?.ids.user);
  }

  private parseUserPlayerStylesRequestResponse(data: IUserIntentResponseData): void {
    this.userStore.dispatch({
      action: 'SET_USER_PLAYER_STYLES',
      userPlayerStyles: data.userPlayerStyles
    });
  }

  private parseUserPlayerLogoImageUploadRequestResponse(data: IUserIntentResponseData): void {
    this.uiStateStore.dispatchAction({
      action: 'UPLOAD_PLAYER_LOGO_IMAGE_RESPONSE_RECEIVED'
    });

    this.userStore.dispatch({
      action: 'SET_USER_PLAYER_PREVIEW_DATA',
      userPlayerPreviewData: {
        logoURL: {
          company: data.userPlayerUploadedPreviewLogos?.company || '',
          tripod: data.userPlayerUploadedPreviewLogos?.tripod || ''
        }
      }
    });
  }
}
