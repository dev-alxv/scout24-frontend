import { Observable } from "rxjs";

import { IExposeCollectionRequest } from "../interfaces/expose/expose.interfaces";
import { IExposeIntentResponseData } from "../interfaces/intent-response/expose.response";

export abstract class ExposeRepo {

  public abstract list(reqParams?: IExposeCollectionRequest): Observable<IExposeIntentResponseData>;

}
