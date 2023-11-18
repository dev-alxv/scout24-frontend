import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { TourRepo } from "../repository/tour.repo";
import { ITourIntentResponseData } from "../interfaces/intent-response/tour.response";
import {
  IApproveTourFloorplanOrderIntent,
  IDeclineTourFloorplanOrderIntent,
  IDeleteTourIntent,
  ITourCollectionRequest,
  ITourLinkIntent,
  ITourUnlinkIntent
} from "../interfaces/tour/tour.interfaces";

@Injectable()
export class TourManager {

  constructor(
    private tourRepo: TourRepo
  ) { }

  public list(reqParams: ITourCollectionRequest): Observable<ITourIntentResponseData> {
    return this.tourRepo.list(reqParams);
  }

  public link(linkData: ITourLinkIntent): Observable<ITourIntentResponseData> {
    return this.tourRepo.link(linkData);
  }

  public unlink(unlinkData: ITourUnlinkIntent): Observable<ITourIntentResponseData> {
    return this.tourRepo.unlink(unlinkData);
  }

  public delete(deleteData: IDeleteTourIntent): Observable<ITourIntentResponseData> {
    return this.tourRepo.delete(deleteData);
  }

  public approveFloorplanOrder(approveData: IApproveTourFloorplanOrderIntent): Observable<ITourIntentResponseData> {
    return this.tourRepo.approveFloorplanOrder(approveData);
  }

  public declineFloorplanOrder(declineData: IDeclineTourFloorplanOrderIntent): Observable<ITourIntentResponseData> {
    return this.tourRepo.declineFloorplanOrder(declineData);
  }
}
