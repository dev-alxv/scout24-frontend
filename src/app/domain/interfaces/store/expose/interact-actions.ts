import { IStoreInteractAction } from '../base/interact-actions';
import { Expose } from 'src/app/domain/models/expose/expose.model';
import { IExposeCollectionRequestPageData } from '../../expose/expose.interfaces';

enum InteractActions {
  'UPDATE_EXPOSE_COLLECTION',
}

type ActionType = keyof typeof InteractActions;

export interface IExposeInteractAction extends IStoreInteractAction {
  action: ActionType;
  list?: Expose[];
  pageData?: IExposeCollectionRequestPageData;
}
