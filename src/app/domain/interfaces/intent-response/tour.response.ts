import { IIntentResponse } from "../common/intent.response";
import { Tour } from "../../models/Tour/tour.model";
import { ITourCollectionRequestPageData } from "../tour/tour.interfaces";

export interface ITourIntentResponseData extends IIntentResponse {
  tourCollection?: Tour[];
  pageData?: ITourCollectionRequestPageData;
}
