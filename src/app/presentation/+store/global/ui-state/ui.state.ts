import { UserContractProductType } from "src/app/domain/enums/user/user.enums";
import { IUserSettings } from "src/app/domain/interfaces/store/ui-state/user-settings";

export class UiState {

  constructor(
    public initialized?: boolean,
    public userSettings?: IUserSettings,
    public latestProductOrderData?: ILatestProductOrderData,
    public initialUrlSearchData?: string,
    public uiOngoingActions?: uiOngoingActions
  ) {
    this.initialized = false;

    //
    this.userSettings = {
      defaultDisplayLanguage: undefined,
      currentDisplayLanguage: undefined
    }

    //
    this.latestProductOrderData = {
      resourceId: undefined,
      productType: undefined
    }

    //
    this.initialUrlSearchData = undefined;

    // Initiate uiOngoingActions
    this.uiOngoingActions = {
      apiRequest: {
        fetchingTourListPageSlice: false,
        fetchingExposeListPageSlice: false
      },
      apiIntent: {
        tourOrigin: {
          linkingTour: false,
          unLinkingTour: false,
          deletingTour: false,
          approveOrDeclineTourFloorplanOrder: false
        },
        orderOrigin: {
          creatingOrder: false
        },
        savingPlayerStyles: false,
        uploadingPlayerLogoImage: false
      }
    }
  }

}

export interface uiOngoingActions {
  apiRequest?: {
    fetchingTourListPageSlice?: boolean;
    fetchingExposeListPageSlice?: boolean;
  };
  apiIntent?: {
    tourOrigin?: {
      linkingTour?: boolean;
      unLinkingTour?: boolean;
      deletingTour?: boolean;
      approveOrDeclineTourFloorplanOrder?: boolean;
    };
    orderOrigin?: {
      creatingOrder?: boolean;
    };
    savingPlayerStyles?: boolean;
    uploadingPlayerLogoImage?: boolean;
  }
};

export interface ILatestProductOrderData {
  resourceId?: string;
  productType?: UserContractProductType;
};
