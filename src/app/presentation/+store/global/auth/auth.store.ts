import { Injectable } from '@angular/core';

import { Store } from '../../base/base.store';
import { AuthenticationState } from './auth.state';
import { IAuthorizedUser } from 'src/app/domain/interfaces/store/auth/auth-user';
import { IAuthenticationIntentResponseData } from 'src/app/domain/interfaces/intent-response/auth.response';
import { IAuthStoreInteractAction } from 'src/app/domain/interfaces/store/auth/interact-actions';


@Injectable({
  providedIn: 'root'
})
export class AuthStore extends Store<AuthenticationState> {

  private constructor() {
    super(new AuthenticationState({}));
  }

  // Get the latest haveToken state
  public get getHaveToken(): boolean | undefined {
    return this.state.haveToken;
  }

  // Get the latest authorized state
  public get getAuthorized(): boolean | undefined {
    return this.state.authorized;
  }

  // Get the latest authorized user state
  public get getAuthorizedUser(): IAuthorizedUser {
    return this.state.authorizedUser;
  }

  private setUserAccessToken(data: IAuthenticationIntentResponseData): void {
    this.setState({
      ...this.state,
      haveToken: true,
      authorizedUser: {
        ...this.state.authorizedUser,
        accessToken: data.accessToken,
        // expire: new Date(data.userData.exp * 1000)
      }
    });
  }

  /**
   *
   * @param data : { action, authResponse? }
   */
  public dispatch(data: IAuthStoreInteractAction): void {

    switch (data.action) {

      case 'SET_USER_ACCESS_TOKEN':
        this.setUserAccessToken(data.authResponse);

    }

  }

}
