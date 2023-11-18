import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IExposeCollectionRequest } from 'src/app/domain/interfaces/expose/expose.interfaces';
import { IExposeIntentResponseData } from 'src/app/domain/interfaces/intent-response/expose.response';
import { ExposeManager } from 'src/app/domain/usecase-services/expose-manager';
import { ExposeStore } from '../../global/expose/expose.store';
import { UiStateStore } from '../../global/ui-state/ui-state.store';

@UntilDestroy()

@Injectable({
  providedIn: 'root'
})
export class ExposeService {

  private serviceInitialized = false;

  constructor(
    private exposeManager: ExposeManager,
    private exposeStore: ExposeStore,
    private uiStateStore: UiStateStore
  ) { }

  public init() {
    if (!this.serviceInitialized) {
      this.serviceInitialized = true;
      this.exposeCollectionRequest();
    }
  }

  public getExposeCollectionSlice(requestParams: IExposeCollectionRequest) {
    this.exposeCollectionRequest(requestParams);
  }

  private exposeCollectionRequest(requestParams?: IExposeCollectionRequest): void {
    this.uiStateStore.dispatchAction({
      action: 'EXPOSE_LIST_PAGE_SLICE_REQUEST_SENT'
    });

    this.exposeManager.list(requestParams)
      .subscribe({
        next: (response: IExposeIntentResponseData) => this.parseExposeCollectionRequestResponse(response)
      });
  }

  private parseExposeCollectionRequestResponse(data: IExposeIntentResponseData): void {
    this.uiStateStore.dispatchAction({
      action: 'EXPOSE_LIST_PAGE_SLICE_RECEIVED'
    });

    this.exposeStore.dispatch({
      action: 'UPDATE_EXPOSE_COLLECTION',
      list: data.exposeCollection,
      pageData: data.pageData
    });
  }
}
