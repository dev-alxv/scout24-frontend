import { IStoreInteractAction } from '../base/interact-actions';
import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { ITourCollectionRequestPageData } from '../../tour/tour.interfaces';

enum InteractActions {
  'UPDATE_TOUR_COLLECTION',
}

type ActionType = keyof typeof InteractActions;

export interface ITourInteractAction extends IStoreInteractAction {
  action: ActionType;
  list?: Tour[];
  pageData?: ITourCollectionRequestPageData;
}
