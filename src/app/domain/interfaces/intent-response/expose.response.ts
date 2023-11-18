import { Expose } from "../../models/expose/expose.model";
import { IIntentResponse } from "../common/intent.response";
import { IExposeCollectionRequestPageData } from "../expose/expose.interfaces";

export interface IExposeIntentResponseData extends IIntentResponse {
  exposeCollection?: Expose[];
  pageData?: IExposeCollectionRequestPageData;
}
