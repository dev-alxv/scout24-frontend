import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";

import { isDefined } from "src/app/utils/utils";
import { ApiService } from "../../providers/api/api.service";
import { IExposeCollectionRequest } from "src/app/domain/interfaces/expose/expose.interfaces";
import { IExposeIntentResponseData } from "src/app/domain/interfaces/intent-response/expose.response";
import { Expose } from "src/app/domain/models/expose/expose.model";
import {
  IExposeCollectionRequestDescription,
  IExposeCollectionSliceDescription,
  IExposeDescription
} from "src/app/domain/interfaces/api/descriptions/expose/description";

@Injectable()
export class ExposeRepoService {

  private exposeCollectionSliceStream$: Observable<IExposeIntentResponseData>;

  constructor(
    private apiService: ApiService
  ) { }

  public list(reqParams?: IExposeCollectionRequest): Observable<IExposeIntentResponseData> {

    const isParamsDefined = isDefined(reqParams);

    const requestDescription: IExposeCollectionRequestDescription = <IExposeCollectionRequestDescription>{
      "p.page": isParamsDefined && isDefined(reqParams?.pageData?.pageNumber) ? reqParams?.pageData?.pageNumber : null,
      'p.pageSize': isParamsDefined && isDefined(reqParams?.pageData?.exposesPerPage) ? reqParams?.pageData?.exposesPerPage : null
    };

    // Clear undefined values
    Object.keys(requestDescription).forEach((key: keyof IExposeCollectionRequestDescription) => !isDefined(requestDescription[key]) && delete requestDescription[key]);

    this.exposeCollectionSliceStream$ = this.parseTourCollectionSliceRequestResponse(requestDescription).pipe(share());

    return this.exposeCollectionSliceStream$;
  }

  private parseTourCollectionSliceRequestResponse(reqParams: IExposeCollectionRequestDescription): Observable<IExposeIntentResponseData> {
    return this.apiService.getExposeCollectionSliceRequest(reqParams)
      .pipe(
        map((resp: IExposeCollectionSliceDescription) => {
          let responseData: IExposeIntentResponseData = <IExposeIntentResponseData>{};

          if (resp) {
            responseData = {
              result: 'Ok',
              exposeCollection: this.createExposeCollection(resp.details.list),
              pageData: {
                hasNext: resp.details.hasNext,
                pageIndex: resp.details.pageIndex,
                pageSize: resp.details.pageSize,
                pageCount: resp.details.pageCount,
                rowCount: resp.details.rowCount
              }
            }
          }

          return responseData;
        })
      );
  }

  private createExposeCollection(exposeDescriptionList: IExposeDescription[]): Expose[] {
    return exposeDescriptionList.map((description: IExposeDescription) => this.createExpose(description));
  }

  private createExpose(exposeDescription: IExposeDescription): Expose {

    const expose: Expose = new Expose(exposeDescription);

    return expose;
  }

}
