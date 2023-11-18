import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiConfig, IApiURLConfig } from '../api.config';
import {
  IDeleteTourIntentDescription,
  IUnlinkTourIntentDescription,
  ITourCollectionRequestDescription,
  ITourCollectionSliceDescription,
  ITourDescription,
  TourDescription,
  ILinkTourIntentDescription,
  IApproveTourFloorPlanOrderIntentDescription,
  IDeclineTourFloorPlanOrderIntentDescription
} from 'src/app/domain/interfaces/api/descriptions/tour/description';
import { IApiIntentResponse } from 'src/app/domain/interfaces/api/descriptions/intent.response';

@Injectable({
  providedIn: 'root'
})
export class TourApiService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) { }

  private parseTourCollectionDescription(tourCollectionDescription: ITourDescription[]): TourDescription[] {
    return tourCollectionDescription.map((description: ITourDescription) => new TourDescription(description));
  }

  public getTourCollectionSlice(requestParams: ITourCollectionRequestDescription): Observable<ITourCollectionSliceDescription> {

    const tourListReqUrl: URL = this.apiConfig.buildApiURL({ urlType: 'Tour_List' });
    const tourListReqParams: HttpParams = this.apiConfig.parseRequestParams(requestParams, 'tour');

    return this.http.get<ITourCollectionSliceDescription>(tourListReqUrl.href, { params: tourListReqParams })
      .pipe(
        map((resp: ITourCollectionSliceDescription) => {

          if (environment.forTestPurpose) {
            console.log('> TOUR API SERVICE >>> ', resp);
          }

          resp.list = this.parseTourCollectionDescription(resp.list);
          return resp
        })
      );
  }

  public deleteTour(deleteData: IDeleteTourIntentDescription): Observable<IApiIntentResponse> {

    const paramData = {
      tourRemove: deleteData.tourRemove ? 'true' : 'false'
    };

    const deleteTourUrlData: IApiURLConfig = <IApiURLConfig>{
      urlType: 'Delete_Tour',
      urlData: {
        tourData: {
          itemId: deleteData.itemID
        }
      }
    }

    const reqParams: HttpParams = new HttpParams({ fromObject: paramData });

    const httpOptions = { params: reqParams };
    const tourDeleteIntentUrl: URL = this.apiConfig.buildApiURL(deleteTourUrlData);

    return this.http.delete<IApiIntentResponse>(tourDeleteIntentUrl.href, httpOptions);
  }

  public linkTourToExpose(linkData: ILinkTourIntentDescription): Observable<IApiIntentResponse> {

    const linkTourUrlData: IApiURLConfig = <IApiURLConfig>{
      urlType: 'Link_Tour_To_Expose',
      urlData: {
        tourData: {
          itemId: linkData.itemID
        }
      }
    }

    const paramData = {
      objectID: linkData.objectID
    };

    const reqHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const reqParams: HttpParams = new HttpParams({ fromObject: paramData });

    const httpOptions = { headers: reqHeaders, params: reqParams };
    const linkTourIntentUrl: URL = this.apiConfig.buildApiURL(linkTourUrlData);

    return this.http.post<IApiIntentResponse>(linkTourIntentUrl.href, JSON.stringify({}), httpOptions);
  }

  public unlinkTourFromExpose(unlinkData: IUnlinkTourIntentDescription): Observable<IApiIntentResponse> {

    const unlinkTourUrlData: IApiURLConfig = <IApiURLConfig>{
      urlType: 'Unlink_Tour_From_Expose',
      urlData: {
        tourData: {
          itemId: unlinkData.itemID
        }
      }
    }

    const unlinkTourIntentUrl: URL = this.apiConfig.buildApiURL(unlinkTourUrlData);

    return this.http.delete<IApiIntentResponse>(unlinkTourIntentUrl.href);
  }

  public approveFloorplanOrder(approveData: IApproveTourFloorPlanOrderIntentDescription): Observable<IApiIntentResponse> {

    const paramData = {
      updateEmplannerOrder: approveData.updateEmplannerOrder ? 'true' : 'false'
    }

    const approveFloorplanOrderUrlData: IApiURLConfig = <IApiURLConfig>{
      urlType: 'Approve_Floor_PlanOrder',
      urlData: {
        tourData: {
          floorplanOrderId: approveData.orderID
        }
      }
    };

    const reqParams: HttpParams = new HttpParams({ fromObject: paramData });

    const httpOptions = { params: reqParams };
    const approveFloorplanOrderIntentUrl: URL = this.apiConfig.buildApiURL(approveFloorplanOrderUrlData);

    return this.http.post<IApiIntentResponse>(approveFloorplanOrderIntentUrl.href, {}, httpOptions);
  }

  public declineFloorplanOrder(declineData: IDeclineTourFloorPlanOrderIntentDescription): Observable<IApiIntentResponse> {

    const declineFloorplanOrderUrlData: IApiURLConfig = <IApiURLConfig>{
      urlType: 'Decline_Floor_PlanOrder',
      urlData: {
        tourData: {
          floorplanOrderId: declineData.orderID
        }
      }
    };

    const postData: string = JSON.stringify(<IDeclineTourFloorPlanOrderIntentDescription>{
      feedback: declineData.feedback
    });

    const reqHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const httpOptions = { headers: reqHeaders };
    const declineFloorplanOrderIntentUrl: URL = this.apiConfig.buildApiURL(declineFloorplanOrderUrlData);

    return this.http.post<IApiIntentResponse>(declineFloorplanOrderIntentUrl.href, postData, httpOptions);
  }
}
