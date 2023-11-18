import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ApiEndpoints } from 'src/app/domain/enums/api/api-endpoints.enum';
import { ITourCollectionRequestDescription } from 'src/app/domain/interfaces/api/descriptions/tour/description';
import { IExposeCollectionRequestDescription } from 'src/app/domain/interfaces/api/descriptions/expose/description';

enum ApiUrlEnum {
  Tour_List,
  Expose_List,
  Link_Tour_To_Expose,
  Unlink_Tour_From_Expose,
  Delete_Tour,
  User_Profile,
  User_Contract,
  User_Player_Styles,
  Create_Transaction,
  FastSpring_Order,
  Approve_Floor_PlanOrder,
  Decline_Floor_PlanOrder,
  Upload_User_Player_Logo
}

export type ApiUrlType = keyof typeof ApiUrlEnum;

export interface IApiURLConfig {
  urlType: ApiUrlType;
  urlData?: {
    userId?: string;
    portalType?: string;
    tourData?: {
      itemId?: string;
      floorplanOrderId?: string;
    };
    exposeData?: {
      objectId: string;
    },
    tourPlayerData?: {
      logoUploadType: 'NORMAL' | 'ROUNDED'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class ApiConfig {

  constructor(

  ) { }

  public buildApiURL(urlConfig: IApiURLConfig): URL {

    let buildedUrl: URL;

    switch (urlConfig.urlType) {

      case 'Tour_List':
        buildedUrl = new URL(`${environment.apiBaseUrl}${ApiEndpoints.tourList}`);
        break;

      case 'Expose_List':
        buildedUrl = new URL(`${environment.apiV1BaseUrl}${ApiEndpoints.exposeList}`);
        break;

      case 'Link_Tour_To_Expose':
        buildedUrl = new URL(`${environment.apiV1BaseUrl}/item/${urlConfig.urlData?.tourData?.itemId}/is24/syncLink`);
        break;

      case 'Unlink_Tour_From_Expose':
        buildedUrl = new URL(`${environment.apiV1BaseUrl}/item/${urlConfig.urlData?.tourData?.itemId}/is24/syncUnlink`);
        break;

      case 'Delete_Tour':
        buildedUrl = new URL(`${environment.apiV1BaseUrl}/item/${urlConfig.urlData?.tourData?.itemId}`);
        break;

      case 'User_Profile':
        buildedUrl = new URL(`${environment.apiV3BaseUrl}/user/me`);
        break;

      case 'User_Contract':
        buildedUrl = new URL(`${environment.apiV3BaseUrl}/user/me/contract`);
        break;

      case 'User_Player_Styles':
        buildedUrl = new URL(`${environment.apiBaseUrl}/user/${urlConfig.urlData?.userId}/player/styles`);
        break;

      case 'Upload_User_Player_Logo':
        buildedUrl = new URL(`${environment.apiBaseUrl}/user/${urlConfig.urlData?.userId}/player/logo/${urlConfig.urlData?.tourPlayerData?.logoUploadType}`);
        break;

      case 'Create_Transaction':
        buildedUrl = new URL(`${environment.apiV3BaseUrl}/user/me/transaction`);
        break;

      case 'FastSpring_Order':
        buildedUrl = new URL(`${environment.apiV3BaseUrl}/fastspring/order`);
        break;

      case 'Approve_Floor_PlanOrder':
        buildedUrl = new URL(`${environment.apiV1BaseUrl}/floorplan/order/${urlConfig.urlData?.tourData?.floorplanOrderId}/approve`);
        break;

      case 'Decline_Floor_PlanOrder':
        buildedUrl = new URL(`${environment.apiV1BaseUrl}/floorplan/order/${urlConfig.urlData?.tourData?.floorplanOrderId}/feedback`);
        break;
    }

    return buildedUrl;
  }

  public parseRequestParams(
    requestParams: ITourCollectionRequestDescription | IExposeCollectionRequestDescription,
    type: 'tour' | 'expose'): HttpParams {

    let apiReqParams = new HttpParams();

    switch (type) {
      case 'tour':
        const defaultTourPageDataRequest: ITourCollectionRequestDescription = { 'p.page': 0, 'p.pageSize': 10 };

        apiReqParams = this.handleScopeParams(apiReqParams, Object.assign({}, defaultTourPageDataRequest, requestParams));
        break;

      case 'expose':
        const defaultExposePageDataRequest: IExposeCollectionRequestDescription = { 'p.page': 1, 'p.pageSize': 4 };

        apiReqParams = this.handleScopeParams(apiReqParams, Object.assign({}, defaultExposePageDataRequest, requestParams));
        break;
    }

    return apiReqParams;
  }

  private handleScopeParams(baseParams: HttpParams, reqParams: ITourCollectionRequestDescription | IExposeCollectionRequestDescription): HttpParams {

    for (const [key, value] of Object.entries(reqParams).sort((a, b) => a[0].localeCompare(b[0]))) {

      if (value instanceof Object) {
        const innerObj: { [index: string]: any } = value;

        const keepTrueKeys = Object.keys(innerObj).filter((key) => innerObj[key] === true);

        baseParams = baseParams.append(key, keepTrueKeys.join(','));

      } else {
        baseParams = baseParams.append(`${key}`, `${value}`);
      }

    }

    return baseParams;
  }

}
