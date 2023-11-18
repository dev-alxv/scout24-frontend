import { Injectable } from '@angular/core';

import { Store } from '../../base/base.store';
import { IUiStateStoreInteractAction } from 'src/app/domain/interfaces/store/ui-state/interact-actions';
import { ILatestProductOrderData, UiState } from './ui.state';
import { LanguageString } from 'src/app/domain/enums/locales.enum';


@Injectable({
  providedIn: 'root'
})
export class UiStateStore extends Store<UiState> {

  private constructor() {
    super(new UiState());
  }

  private uiInitialized(): void {
    this.setState({
      ...this.state,
      initialized: true
    });
  }

  private setInitialSearchData(data: string): void {
    this.setState({
      ...this.state,
      initialUrlSearchData: data
    });
  }

  private setDefaultLanguage(language: LanguageString): void {
    this.setState({
      ...this.state,
      userSettings: {
        ...this.state.userSettings,
        defaultDisplayLanguage: language,
        currentDisplayLanguage: language
      }
    });
  }

  private changeDisplayLanguage(language: LanguageString): void {
    this.setState({
      ...this.state,
      userSettings: {
        ...this.state.userSettings,
        currentDisplayLanguage: language
      }
    });
  }

  private tourListPageSliceRequestSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiRequest: {
          ...this.state.uiOngoingActions?.apiRequest,
          fetchingTourListPageSlice: true
        }
      }
    });
  }

  private tourListPageSliceRequestResultReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiRequest: {
          ...this.state.uiOngoingActions?.apiRequest,
          fetchingTourListPageSlice: false
        }
      }
    });
  }

  private exposeListPageSliceRequestSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiRequest: {
          ...this.state.uiOngoingActions?.apiRequest,
          fetchingExposeListPageSlice: true
        }
      }
    });
  }

  private exposeListPageSliceRequestResultReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiRequest: {
          ...this.state.uiOngoingActions?.apiRequest,
          fetchingExposeListPageSlice: false
        }
      }
    });
  }

  private linkTourIntentSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            linkingTour: true
          }
        }
      }
    });
  }

  private linkTourIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            linkingTour: false
          }
        }
      }
    });
  }

  private unlinkTourIntentSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            unLinkingTour: true
          }
        }
      }
    });
  }

  private unlinkTourIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            unLinkingTour: false
          }
        }
      }
    });
  }

  private deleteTourIntentSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            deletingTour: true
          }
        }
      }
    });
  }

  private deleteTourIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            deletingTour: false
          }
        }
      }
    });
  }

  private createOrderIntentSent(data: ILatestProductOrderData): void {
    this.setState({
      ...this.state,
      latestProductOrderData: {
        ...this.state.latestProductOrderData,
        resourceId: data.resourceId,
        productType: data.productType
      },
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          orderOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.orderOrigin,
            creatingOrder: true
          }
        }
      }
    });
  }

  private createOrderIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          orderOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.orderOrigin,
            creatingOrder: false
          }
        }
      }
    });
  }

  private changePlayerStylesIntentSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          savingPlayerStyles: true
        }
      }
    });
  }

  private changePlayerStylesIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          savingPlayerStyles: false
        }
      }
    });
  }

  private approveOrDeclineTourFloorplanOrderIntentSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            approveOrDeclineTourFloorplanOrder: true
          }
        }
      }
    });
  }

  private approveOrDeclineTourFloorplanOrderIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          tourOrigin: {
            ...this.state.uiOngoingActions?.apiIntent?.tourOrigin,
            approveOrDeclineTourFloorplanOrder: false
          }
        }
      }
    });
  }

  private uploadPlayerLogoImageIntentSent(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          uploadingPlayerLogoImage: true
        }
      }
    });
  }

  private uploadPlayerLogoImageIntentResponseReceived(): void {
    this.setState({
      ...this.state,
      uiOngoingActions: {
        ...this.state.uiOngoingActions,
        apiIntent: {
          ...this.state.uiOngoingActions?.apiIntent,
          uploadingPlayerLogoImage: false
        }
      }
    });
  }

  /**
   *
   * @param data : { action }
   */
  public dispatchAction(action: IUiStateStoreInteractAction): void {

    switch (action.action) {

      case 'UI_INITIALIZED':
        this.uiInitialized();
        break;

      case 'INITIAL_URL_SEARCH':
        if (action.initSearchData) {
          this.setInitialSearchData(action.initSearchData);
        }
        break;

      case 'SET_DEFAULT_DISPLAY_LANGUAGE':
        if (action.language) {
          this.setDefaultLanguage(action.language);
        }
        break;

      case 'CHANGE_DISPLAY_LANGUAGE':
        if (action.language) {
          this.changeDisplayLanguage(action.language);
        }
        break;

      case "TOUR_LIST_PAGE_SLICE_REQUEST_SENT":
        this.tourListPageSliceRequestSent();
        break;

      case 'TOUR_LIST_PAGE_SLICE_RECEIVED':
        this.tourListPageSliceRequestResultReceived();
        break;

      case 'EXPOSE_LIST_PAGE_SLICE_REQUEST_SENT':
        this.exposeListPageSliceRequestSent();
        break;

      case 'EXPOSE_LIST_PAGE_SLICE_RECEIVED':
        this.exposeListPageSliceRequestResultReceived();
        break;

      case 'LINK_TOUR_INTENT_SENT':
        this.linkTourIntentSent();
        break;

      case 'LINK_TOUR_RESPONSE_RECEIVED':
        this.linkTourIntentResponseReceived();
        break;

      case 'UNLINK_TOUR_INTENT_SENT':
        this.unlinkTourIntentSent();
        break;

      case 'UNLINK_TOUR_RESPONSE_RECEIVED':
        this.unlinkTourIntentResponseReceived();
        break;

      case 'DELETE_TOUR_INTENT_SENT':
        this.deleteTourIntentSent();
        break;

      case 'DELETE_TOUR_RESPONSE_RECEIVED':
        this.deleteTourIntentResponseReceived();
        break;

      case 'CREATE_ORDER_INTENT_SENT':
        this.createOrderIntentSent(action.latestProductOrderData as ILatestProductOrderData);
        break;

      case 'CREATE_ORDER_RESPONSE_RECEIVED':
        this.createOrderIntentResponseReceived();
        break;

      case 'CHANGE_PLAYER_STYLES_INTENT_SENT':
        this.changePlayerStylesIntentSent();
        break;

      case 'CHANGE_PLAYER_STYLES_RESPONSE_RECEIVED':
        this.changePlayerStylesIntentResponseReceived();
        break;

      case 'APPROVE_FLOORPLAN_ORDER_INTENT_SENT':
        this.approveOrDeclineTourFloorplanOrderIntentSent();
        break;

      case 'APPROVE_FLOORPLAN_ORDER_RESPONSE_RECEIVED':
        this.approveOrDeclineTourFloorplanOrderIntentResponseReceived();
        break;

      case 'DECLINE_FLOORPLAN_ORDER_INTENT_SENT':
        this.approveOrDeclineTourFloorplanOrderIntentSent();
        break;

      case 'DECLINE_FLOORPLAN_ORDER_RESPONSE_RECEIVED':
        this.approveOrDeclineTourFloorplanOrderIntentResponseReceived();
        break;

      case 'UPLOAD_PLAYER_LOGO_IMAGE_INTENT_SENT':
        this.uploadPlayerLogoImageIntentSent();
        break;

      case 'UPLOAD_PLAYER_LOGO_IMAGE_RESPONSE_RECEIVED':
        this.uploadPlayerLogoImageIntentResponseReceived();
        break;
    }
  }

}
