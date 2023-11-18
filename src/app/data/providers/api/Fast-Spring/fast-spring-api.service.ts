import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfig } from '../api.config';
import { IEncryptFastSpringOrderDataIntentDescription } from 'src/app/domain/interfaces/api/descriptions/fastspring/description';
import { IEncryptFastSpringOrderDataIntentResponse } from 'src/app/domain/interfaces/api/descriptions/intent.response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FastSpringApiService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) { }

  public encryptSessionOrderObject(dataToEncrypt: IEncryptFastSpringOrderDataIntentDescription): Observable<IEncryptFastSpringOrderDataIntentResponse> {

    const postData: string = JSON.stringify(<IEncryptFastSpringOrderDataIntentDescription>{
      txIds: dataToEncrypt.txIds
    });

    const reqHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const httpOptions = { headers: reqHeaders };
    const encryptOrderIntentUrl: URL = this.apiConfig.buildApiURL({ urlType: 'FastSpring_Order' });

    return this.http.post<IEncryptFastSpringOrderDataIntentResponse>(encryptOrderIntentUrl.href, postData, httpOptions);
  }
}
