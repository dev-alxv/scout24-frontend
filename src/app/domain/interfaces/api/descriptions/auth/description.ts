
export interface IAuthDescription {
  payload?: IAuthResponseData;
  token?: { payload: any };
  refreshTokenRequest?: boolean;
  error?: string;
  errorDescription?: string;
}

export interface IAuthResponseData {
  access_token?: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: string;
  scope?: string;
  email?: string;
  jti?: string;
}
