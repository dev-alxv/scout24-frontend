import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ExposeRepo } from "../repository/expose.repo";
import { IExposeCollectionRequest } from "../interfaces/expose/expose.interfaces";
import { IExposeIntentResponseData } from "../interfaces/intent-response/expose.response";

@Injectable()
export class ExposeManager {

  constructor(
    private exposeRepo: ExposeRepo
  ) { }

  public list(reqParams?: IExposeCollectionRequest): Observable<IExposeIntentResponseData> {
    return this.exposeRepo.list(reqParams);
  }

}
