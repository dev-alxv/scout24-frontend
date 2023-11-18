import { LanguageString } from 'src/app/domain/enums/locales.enum';
import { ILatestProductOrderData } from 'src/app/presentation/+store/global/ui-state/ui.state';
import { IStoreInteractAction } from '../base/interact-actions';

enum InteractActions {
  'UI_INITIALIZED',
  'INITIAL_URL_SEARCH',
  'SET_DEFAULT_DISPLAY_LANGUAGE',
  'CHANGE_DISPLAY_LANGUAGE',
  'TOUR_LIST_PAGE_SLICE_REQUEST_SENT',
  'TOUR_LIST_PAGE_SLICE_RECEIVED',
  'EXPOSE_LIST_PAGE_SLICE_REQUEST_SENT',
  'EXPOSE_LIST_PAGE_SLICE_RECEIVED',
  'LINK_TOUR_INTENT_SENT',
  'LINK_TOUR_RESPONSE_RECEIVED',
  'UNLINK_TOUR_INTENT_SENT',
  'UNLINK_TOUR_RESPONSE_RECEIVED',
  'DELETE_TOUR_INTENT_SENT',
  'DELETE_TOUR_RESPONSE_RECEIVED',
  'CREATE_ORDER_INTENT_SENT',
  'CREATE_ORDER_RESPONSE_RECEIVED',
  'CHANGE_PLAYER_STYLES_INTENT_SENT',
  'CHANGE_PLAYER_STYLES_RESPONSE_RECEIVED',
  'APPROVE_FLOORPLAN_ORDER_INTENT_SENT',
  'APPROVE_FLOORPLAN_ORDER_RESPONSE_RECEIVED',
  'DECLINE_FLOORPLAN_ORDER_INTENT_SENT',
  'DECLINE_FLOORPLAN_ORDER_RESPONSE_RECEIVED',
  'UPLOAD_PLAYER_LOGO_IMAGE_INTENT_SENT',
  'UPLOAD_PLAYER_LOGO_IMAGE_RESPONSE_RECEIVED'
}

type ActionType = keyof typeof InteractActions;

export interface IUiStateStoreInteractAction extends IStoreInteractAction {
  action: ActionType;
  language?: LanguageString;
  initSearchData?: string;
  latestProductOrderData?: ILatestProductOrderData;
}
