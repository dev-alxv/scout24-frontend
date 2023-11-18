import { IIntentResponse } from '../common/intent.response';

export interface IAuthenticationIntentResponseData extends IIntentResponse {
  accessToken?: string;
  refreshToken?: string;
  refreshTokenUsed?: boolean;
  userData?: any;
  errorType?: string;
  uiMessage?: string;
}
