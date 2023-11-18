import { IAuthorizedUser } from 'src/app/domain/interfaces/store/auth/auth-user';

export class AuthenticationState {

  constructor(
    public authorizedUser: IAuthorizedUser,
    public haveToken?: boolean,
    public authorized?: boolean,
    public authRequestSent?: boolean
  ) {
    this.haveToken = false;
    this.authorized = false;
    this.authRequestSent = false;

    // init AuthorizedUser
    this.authorizedUser = {
      accessToken: undefined,
      expire: undefined,
      profile: undefined
    };

  }

}
