import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfig } from '../api.config';
import { environment } from 'src/environments/environment';
import { ICreateTransactionIntentDescription, ITransactionDescription } from 'src/app/domain/interfaces/api/descriptions/transaction/description';
import { ICreateTransactionIntentResponse } from 'src/app/domain/interfaces/api/descriptions/intent.response';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) { }

  public createTransaction(transactionData: ICreateTransactionIntentDescription): Observable<ICreateTransactionIntentResponse> {

    const postData: string = JSON.stringify(<Partial<ICreateTransactionIntentDescription>>{
      productType: transactionData.productType,
      purchaseType: transactionData.purchaseType,
    });

    const reqHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const httpOptions = { headers: reqHeaders };
    const createTransactionIntentUrl: URL = this.apiConfig.buildApiURL({ urlType: 'Create_Transaction' });

    return this.http.post<ICreateTransactionIntentResponse>(createTransactionIntentUrl.href, postData, httpOptions);
  }

  public setRelatedResourceId(createdTransaction: ITransactionDescription, resourceId: string): void {

    const putData: string = JSON.stringify(<Partial<ITransactionDescription>>{
      ...createdTransaction,
      relatedResourceID: ''
    });

    const reqHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    const httpOptions = { headers: reqHeaders };
    const createTransactionIntentUrl: URL = this.apiConfig.buildApiURL({ urlType: 'Create_Transaction' });

    this.http.put(`${createTransactionIntentUrl.href}`, putData, httpOptions);
  }
}
