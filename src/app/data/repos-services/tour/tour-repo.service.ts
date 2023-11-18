import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";

import { isDefined } from "src/app/utils/utils";
import { ApiService } from "../../providers/api/api.service";
import { ITourIntentResponseData } from "src/app/domain/interfaces/intent-response/tour.response";
import {
  IApproveTourFloorPlanOrderIntentDescription,
  IDeclineTourFloorPlanOrderIntentDescription,
  IDeleteTourIntentDescription,
  ILinkTourIntentDescription,
  ITourCollectionRequestDescription,
  ITourCollectionSliceDescription,
  IUnlinkTourIntentDescription,
  TourDescription
} from "src/app/domain/interfaces/api/descriptions/tour/description";
import { Tour } from "src/app/domain/models/Tour/tour.model";
import { IApproveTourFloorplanOrderIntent, IDeclineTourFloorplanOrderIntent, IDeleteTourIntent, ITourCollectionRequest, ITourLinkIntent, ITourUnlinkIntent } from "src/app/domain/interfaces/tour/tour.interfaces";
import { IApiIntentResponse } from "src/app/domain/interfaces/api/descriptions/intent.response";
import { parseApiIntentResponseType } from "../common/utils";

@Injectable()
export class TourRepoService {

  private tourCollectionSliceStream$: Observable<ITourIntentResponseData>;

  constructor(
    private apiService: ApiService
  ) { }

  public list(reqParams: ITourCollectionRequest): Observable<ITourIntentResponseData> {

    const requestDescription: ITourCollectionRequestDescription = <ITourCollectionRequestDescription>{
      scope: reqParams.requestScope
    };

    if (isDefined(reqParams.pageData?.pageNumber)) {
      requestDescription["p.page"] = reqParams.pageData?.pageNumber;
    }

    if (isDefined(reqParams.pageData?.toursPerPage)) {
      requestDescription["p.pageSize"] = reqParams.pageData?.toursPerPage;
    }

    if (isDefined(reqParams.searchData)) {
      if (reqParams.searchData?.input !== '') {
        requestDescription.search = reqParams.searchData?.input;
      }
    }

    this.tourCollectionSliceStream$ = this.parseTourCollectionSliceRequestResponse(requestDescription).pipe(share());

    return this.tourCollectionSliceStream$;
  }

  public link(linkData: ITourLinkIntent): Observable<ITourIntentResponseData> {

    const requestDescription: ILinkTourIntentDescription = <ILinkTourIntentDescription>{
      itemID: linkData.tourItemId,
      objectID: linkData.exposeObjectId
    }

    return this.apiService.linkTourIntent(requestDescription)
      .pipe(
        map((resp: IApiIntentResponse) => {

          const responseData: ITourIntentResponseData = <ITourIntentResponseData>{
            result: 'Ok',
            intentResultResponse: parseApiIntentResponseType(resp.type)
          };

          return responseData;
        })
      );
  }

  public unlink(unlinkData: ITourUnlinkIntent): Observable<ITourIntentResponseData> {

    const tourUnlinkDescription: IUnlinkTourIntentDescription = <IUnlinkTourIntentDescription>{
      itemID: unlinkData.tourItemId
    };

    return this.apiService.unlinkTourIntent(tourUnlinkDescription)
      .pipe(
        map((resp: IApiIntentResponse) => {

          const responseData: ITourIntentResponseData = <ITourIntentResponseData>{
            result: 'Ok',
            intentResultResponse: parseApiIntentResponseType(resp.type)
          };

          return responseData;
        })
      );
  }

  public delete(deleteData: IDeleteTourIntent): Observable<ITourIntentResponseData> {

    const deleteTourDescription: IDeleteTourIntentDescription = <IDeleteTourIntentDescription>{
      itemID: deleteData.tourItemId,
      tourRemove: true
    };

    return this.apiService.deleteTourIntent(deleteTourDescription)
      .pipe(
        map((resp: IApiIntentResponse) => {

          const responseData: ITourIntentResponseData = <ITourIntentResponseData>{
            result: 'Ok',
            intentResultResponse: parseApiIntentResponseType(resp.type)
          };

          return responseData;
        })
      );
  }

  public approveFloorplanOrder(approveData: IApproveTourFloorplanOrderIntent): Observable<ITourIntentResponseData> {

    const approveFloorplanOrderDescription: IApproveTourFloorPlanOrderIntentDescription = <IApproveTourFloorPlanOrderIntentDescription>{
      orderID: approveData.orderId,
      updateEmplannerOrder: true
    };

    return this.apiService.approveTourFloorplanOrderIntent(approveFloorplanOrderDescription)
      .pipe(
        map((resp: IApiIntentResponse) => {

          const responseData: ITourIntentResponseData = <ITourIntentResponseData>{
            result: resp.type === 'HTTP_OK' ? 'Ok' : 'Error',
            intentResultResponse: parseApiIntentResponseType(resp.type)
          };

          return responseData;
        })
      );
  }

  public declineFloorplanOrder(declineData: IDeclineTourFloorplanOrderIntent): Observable<ITourIntentResponseData> {

    const declineFloorplanOrderDescription: IDeclineTourFloorPlanOrderIntentDescription = <IDeclineTourFloorPlanOrderIntentDescription>{
      orderID: declineData.orderId,
      feedback: declineData.feedback
    };

    return this.apiService.declineTourFloorplanOrderIntent(declineFloorplanOrderDescription)
      .pipe(
        map((resp: IApiIntentResponse) => {

          const responseData: ITourIntentResponseData = <ITourIntentResponseData>{
            result: resp.type === 'HTTP_OK' ? 'Ok' : 'Error',
            intentResultResponse: parseApiIntentResponseType(resp.type)
          };

          return responseData;
        })
      );
  }

  private parseTourCollectionSliceRequestResponse(reqParams: ITourCollectionRequestDescription): Observable<ITourIntentResponseData> {
    return this.apiService.getTourCollectionSliceRequest(reqParams)
      .pipe(
        map((resp: ITourCollectionSliceDescription) => {
          let responseData: ITourIntentResponseData = <ITourIntentResponseData>{};

          if (resp) {
            responseData = <ITourIntentResponseData>{
              result: 'Ok',
              tourCollection: this.createTourCollection(resp.list),
              pageData: {
                hasNext: resp.hasNext,
                pageIndex: resp.pageIndex,
                pageSize: resp.pageSize,
                pageCount: resp.pageCount,
                rowCount: resp.rowCount
              }
            }
          }

          return responseData;
        })
      );
  }

  private createTourCollection(tourDescriptionList: TourDescription[]): Tour[] {
    return tourDescriptionList.map((tourDescription: TourDescription) => this.createTour(tourDescription));
  }

  private createTour(tourDescription: TourDescription): Tour {

    const tour: Tour = new Tour(tourDescription);

    return tour;
  }
}
