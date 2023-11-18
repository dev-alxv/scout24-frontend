import { IStoreInteractAction } from '../base/interact-actions';
import { IUserPlayerPreviewData, IUserPlayerStyles, UserContract } from 'src/app/domain/models/User/user.model';

enum InteractActions {
  'SET_USER_ID',
  'SET_USER_CONTRACT',
  'SET_USER_PLAYER_STYLES',
  'SET_USER_PLAYER_PREVIEW_DATA',
  'CLEAR_USER_PLAYER_PREVIEW_DATA'
}

type ActionType = keyof typeof InteractActions;

export interface IUserInteractAction extends IStoreInteractAction {
  action: ActionType;
  userContract?: UserContract;
  userPlayerStyles?: IUserPlayerStyles;
  userPlayerPreviewData?: IUserPlayerPreviewData;
}
