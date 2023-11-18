import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IAuthDescription, IAuthResponseData } from 'src/app/domain/interfaces/api/descriptions/auth/description';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private readonly accessToken = '';

  private readonly newAccessToken = '';

  constructor(
    private http: HttpClient
  ) { }

  private parseAuthResponse(response: IAuthResponseData, rToken?: boolean): IAuthDescription {

    const descriptionData: IAuthDescription = <IAuthDescription>{
      payload: response,
      token: {
        payload: response.access_token
      }
    };

    return descriptionData;
  }

  public obtainAccessToken(): Observable<IAuthDescription> {

    // this.getUserProfile();
    // this.getUserLoginInfo();

    const responseData: IAuthResponseData = <IAuthResponseData>{
      // access_token: this.newAccessToken
    };

    return of(responseData)
      .pipe(
        take(1),
        map(
          (res: IAuthResponseData) => this.parseAuthResponse(res)
        )
      );
  }

  private getUserProfile(): void {

    this.http.get<any>(`${environment.immoMainApiBaseUrl}/account/v2.0/user/me`)
      .subscribe({
        next: (resp: any) => console.log('Resp > ', resp)
      });
  }

  private getUserLoginInfo(): void {

    this.http.get<any>(`${environment.ssoApiBaseUrl}/getLoginInfo`)
      .subscribe({
        next: (resp: any) => console.log('Resp > ', resp)
      });
  }

}
