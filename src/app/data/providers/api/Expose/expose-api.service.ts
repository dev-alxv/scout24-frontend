import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiConfig } from '../api.config';
import {
  ExposeDescription,
  IExposeCollectionRequestDescription,
  IExposeCollectionSliceDescription,
  IExposeDescription
} from 'src/app/domain/interfaces/api/descriptions/expose/description';

@Injectable({
  providedIn: 'root'
})
export class ExposeApiService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) { }

  private parseExposeCollectionDescription(exposeCollectionDescription: IExposeDescription[]): ExposeDescription[] {
    return exposeCollectionDescription.map((description: IExposeDescription) => new ExposeDescription(description));
  }

  public getExposeCollectionSlice(reqParams: IExposeCollectionRequestDescription): Observable<IExposeCollectionSliceDescription> {

    const exposeListReqUrl: URL = this.apiConfig.buildApiURL({ urlType: 'Expose_List' });
    const exposeReqParams: HttpParams = this.apiConfig.parseRequestParams(reqParams, 'expose');

    return this.http.get<IExposeCollectionSliceDescription>(exposeListReqUrl.href, { params: exposeReqParams })
      .pipe(
        map((resp: IExposeCollectionSliceDescription) => {

          if (environment.forTestPurpose) {
            console.log('> EXPOSE API SERVICE >>> ', resp);
          }

          resp.details.list = this.parseExposeCollectionDescription(resp.details.list);
          return resp;
        })
      );
  }

}
