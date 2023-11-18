import { IAuthenticationIntentResponseData } from '../../intent-response/auth.response';
import { IStoreInteractAction } from '../base/interact-actions';

enum InteractActions {
  'HAVE_TOKEN',
  'SET_USER_ACCESS_TOKEN',
  'SET_AUTHORIZED_USER_PROFILE',
  'AUTHORIZE',
  'DEAUTHORIZE',
  'AUTH_REQUEST_SENT',
  'BACK_TO_INITIAL_STATE',
  'SET_AUTH_RESPONSE'
}

type ActionType = keyof typeof InteractActions;

export interface IAuthStoreInteractAction extends IStoreInteractAction {
  action: ActionType;
  authResponse: IAuthenticationIntentResponseData;
  authorizedUser?: any;
}
