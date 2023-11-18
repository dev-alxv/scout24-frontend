import { ApiIntentResponseType } from "src/app/domain/enums/api/api-response-type.enum";
import { IEncryptedFastSpringOrderDataDescription } from "./fastspring/description";
import { ITransactionDescription } from "./transaction/description";

export interface IApiIntentResponse {
  type: ApiIntentResponseType;
}

export interface ICreateTransactionIntentResponse extends IApiIntentResponse {
  details: ITransactionDescription;
}

export interface IEncryptFastSpringOrderDataIntentResponse extends IApiIntentResponse {
  details: IEncryptedFastSpringOrderDataDescription;
}
