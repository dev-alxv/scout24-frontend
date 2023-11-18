import { Observable } from "rxjs";

import { ITourIntentResponseData } from "../interfaces/intent-response/tour.response";
import {
  IApproveTourFloorplanOrderIntent,
  IDeclineTourFloorplanOrderIntent,
  IDeleteTourIntent,
  ITourCollectionRequest,
  ITourLinkIntent,
  ITourUnlinkIntent
} from "../interfaces/tour/tour.interfaces";

export abstract class TourRepo {

  public abstract list(reqParams: ITourCollectionRequest): Observable<ITourIntentResponseData>;
  public abstract link(linkData: ITourLinkIntent): Observable<ITourIntentResponseData>;
  public abstract unlink(unlinkData: ITourUnlinkIntent): Observable<ITourIntentResponseData>;
  public abstract delete(deleteData: IDeleteTourIntent): Observable<ITourIntentResponseData>;
  public abstract approveFloorplanOrder(approveData: IApproveTourFloorplanOrderIntent): Observable<ITourIntentResponseData>;
  public abstract declineFloorplanOrder(declineData: IDeclineTourFloorplanOrderIntent): Observable<ITourIntentResponseData>;

}
