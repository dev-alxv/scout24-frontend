import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiConfig, IApiURLConfig } from '../api.config';
import { IUserChangePlayerStylesIntentDescription, IUserContractResponseDescription, IUserPlayerStylesResponseDescription, IUserPlayerUploadedLogoResponseDescription } from 'src/app/domain/interfaces/api/descriptions/user/description';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private currentUserID: string;

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) { }

  public getContract(): Observable<IUserContractResponseDescription> {

    const paramData = {
      scope: 'CONTRACT_FULL,SERVICE_IS24'
    };

    const reqParams: HttpParams = new HttpParams({ fromObject: paramData });

    const httpOptions = { params: reqParams };
    const userContractReqUrl = this.apiConfig.buildApiURL({ urlType: 'User_Contract' });

    return this.http.get<IUserContractResponseDescription>(userContractReqUrl.href, httpOptions);
  }

  public getPlayerStyles(userID: string): Observable<IUserPlayerStylesResponseDescription> {

    this.currentUserID = userID;

    const userPlayerStylesReqUrl = this.apiConfig.buildApiURL({ urlType: 'User_Player_Styles', urlData: { userId: userID } });

    return this.http.get<IUserPlayerStylesResponseDescription>(userPlayerStylesReqUrl.href);
  }

  public setPlayerStyles(styles: IUserChangePlayerStylesIntentDescription, userID: string): Observable<IUserPlayerStylesResponseDescription> {

    const postData: string = JSON.stringify(<IUserChangePlayerStylesIntentDescription>{
      ...styles
    });

    const reqHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const httpOptions = { headers: reqHeaders };
    const userSetPlayerStylesPostUrl = this.apiConfig.buildApiURL({ urlType: 'User_Player_Styles', urlData: { userId: userID } });

    return this.http.post<IUserPlayerStylesResponseDescription>(userSetPlayerStylesPostUrl.href, postData, httpOptions);
  }

  public uploadPlayerLogoImages(imageData: File, type: 'NORMAL' | 'ROUNDED'): Observable<IUserPlayerUploadedLogoResponseDescription> {

    const formData = new FormData();

    const userPlayerLogoImageUrlData: IApiURLConfig = <IApiURLConfig>{
      urlType: 'Upload_User_Player_Logo',
      urlData: {
        userId: this.currentUserID,
        tourPlayerData: {
          logoUploadType: type
        }
      },
    };

    formData.append(imageData.name, imageData)

    const userPlayerLogoImagePostUrl: URL = this.apiConfig.buildApiURL(userPlayerLogoImageUrlData);

    return this.http.post<IUserPlayerUploadedLogoResponseDescription>(userPlayerLogoImagePostUrl.href, formData);
  }
}
