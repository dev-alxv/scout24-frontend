import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthApiService } from 'src/app/data/providers/auth/auth-api.service';
import { IAuthDescription } from 'src/app/domain/interfaces/api/descriptions/auth/description';
import { IAuthenticationIntentResponseData } from 'src/app/domain/interfaces/intent-response/auth.response';
import { AuthStore } from '../../global/auth/auth.store';

@UntilDestroy()

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serviceInitialized = false;

  constructor(
    private authApiService: AuthApiService,
    private authStore: AuthStore
  ) { }

  public init() {
    if (!this.serviceInitialized) {
      this.serviceInitialized = true;
      this.requestAuthentication();
    }
  }

  private requestAuthentication(): void {
    this.authApiService.obtainAccessToken()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response: IAuthDescription) => this.handleAuthResponse(response)
      });
  }

  private handleAuthResponse(response: IAuthDescription): void {

    const responseData: IAuthenticationIntentResponseData = <IAuthenticationIntentResponseData>{
      accessToken: response.token?.payload
    };

    this.authStore.dispatch({ action: 'SET_USER_ACCESS_TOKEN', authResponse: responseData });

  }
}
