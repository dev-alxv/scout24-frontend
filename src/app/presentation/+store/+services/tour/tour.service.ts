import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { RequestScopeEnum } from 'src/app/domain/enums/tour/tour.enums';
import { ITourIntentResponseData } from 'src/app/domain/interfaces/intent-response/tour.response';
import { ITourInteractAction } from 'src/app/domain/interfaces/store/tour/interact-actions';
import {
  IApproveTourFloorplanOrderIntent,
  IDeclineTourFloorplanOrderIntent,
  IDeleteTourIntent,
  ITourCollectionRequest,
  ITourFloorPlans,
  ITourLinkIntent,
  ITourUnlinkIntent
} from 'src/app/domain/interfaces/tour/tour.interfaces';
import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { TourManager } from 'src/app/domain/usecase-services/tour-manager';
import { ErrorService } from 'src/app/presentation/shared/services/error/error.service';
import { doAsyncTask } from 'src/app/utils/utils';
import { TourStore } from '../../global/tour/tour.store';
import { UiStateStore } from '../../global/ui-state/ui-state.store';

@UntilDestroy()

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private serviceInitialized = false;
  private latestSearchedPrase: string;
  private initialTourCollectionRequestDone = false;

  private initSearchDataSet = false;

  constructor(
    private tourManager: TourManager,
    private tourStore: TourStore,
    private uiStateStore: UiStateStore,
    private errorService: ErrorService
  ) { }

  public init() {

    if (!this.serviceInitialized) {

      this.serviceInitialized = true;

      // this.tourCollectionRequest({ requestScope: { 'integration': true } });
    }
  }

  public getTourCollectionSlice(sliceParams: ITourCollectionRequest, isAfterOrder?: boolean): void {

    const requestSliceParams: ITourCollectionRequest = <ITourCollectionRequest>{
      ...sliceParams,
      requestScope: {
        'integration': true
      }
    };

    if (sliceParams.searchData !== undefined) {
      this.latestSearchedPrase = sliceParams.searchData.input;

      if (sliceParams.pageData === undefined) {
        requestSliceParams.pageData = {
          pageNumber: 0
        }
      }
    }

    this.tourCollectionRequest(requestSliceParams, isAfterOrder);
  }

  public setUrlSearchData(data: string): void {
    this.uiStateStore.dispatchAction({
      action: 'INITIAL_URL_SEARCH',
      initSearchData: data
    });
  }

  public linkTour(linkData: ITourLinkIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'LINK_TOUR_INTENT_SENT'
    });

    this.tourManager.link(linkData)
      .subscribe({
        next: (resp: ITourIntentResponseData) => {

          if (resp.result === 'Ok') {
            if (resp.intentResultResponse === 'Tour_Linked') {
              this.uiStateStore.dispatchAction({
                action: 'LINK_TOUR_RESPONSE_RECEIVED'
              });
            }
          }
        },
        error: (err: any) => console.log(err)
      });
  }

  public unlinkTour(unlinkData: ITourUnlinkIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'UNLINK_TOUR_INTENT_SENT'
    });

    this.tourManager.unlink(unlinkData)
      .subscribe({
        next: (resp: ITourIntentResponseData) => {

          if (resp.result === 'Ok') {
            if (resp.intentResultResponse === 'Tour_Unlinked') {
              this.uiStateStore.dispatchAction({
                action: 'UNLINK_TOUR_RESPONSE_RECEIVED'
              });
            }
          }
        },
        error: (err: any) => console.log(err)
      })
  }

  public deleteTour(deleteData: IDeleteTourIntent): void {

    this.tourManager.delete(deleteData)
      .subscribe({
        next: (resp: ITourIntentResponseData) => {

          if (resp.result === 'Ok') {
            if (resp.intentResultResponse === 'Tour_Deleted') {
              this.uiStateStore.dispatchAction({
                action: 'DELETE_TOUR_RESPONSE_RECEIVED'
              });
            }
          }
        },
        error: (err: any) => console.log(err)
      })
  }

  public approveTourFloorplanOrder(approveData: IApproveTourFloorplanOrderIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'APPROVE_FLOORPLAN_ORDER_INTENT_SENT'
    });

    this.tourManager.approveFloorplanOrder(approveData)
      .subscribe({
        next: (resp: ITourIntentResponseData) => {

          if (resp.result === 'Ok') {
            this.uiStateStore.dispatchAction({
              action: 'APPROVE_FLOORPLAN_ORDER_RESPONSE_RECEIVED'
            });
          }
        },
        error: (err: any) => console.log(err)
      });
  }

  public declineTourFloorplanOrder(declineData: IDeclineTourFloorplanOrderIntent): void {
    this.uiStateStore.dispatchAction({
      action: 'DECLINE_FLOORPLAN_ORDER_INTENT_SENT'
    });

    this.tourManager.declineFloorplanOrder(declineData)
      .subscribe({
        next: (resp: ITourIntentResponseData) => {

          if (resp.result === 'Ok') {
            this.uiStateStore.dispatchAction({
              action: 'DECLINE_FLOORPLAN_ORDER_RESPONSE_RECEIVED'
            });
          }
        },
        error: (err: any) => console.log(err)
      });;
  }

  private tourCollectionRequest(sliceParams?: ITourCollectionRequest, isAfterOrder?: boolean): void {
    this.uiStateStore.dispatchAction({
      action: 'TOUR_LIST_PAGE_SLICE_REQUEST_SENT'
    });

    const requestParams: ITourCollectionRequest = <ITourCollectionRequest>{
      ...sliceParams,
      pageData: this.setPageData(sliceParams?.pageData),
      requestScope: this.setScopeParams(sliceParams?.requestScope)
    };

    if (this.latestSearchedPrase !== undefined && this.latestSearchedPrase !== '') {
      requestParams.searchData = {
        input: this.latestSearchedPrase
      }
    }

    this.tourManager.list(requestParams)
      .subscribe({
        next: (response: ITourIntentResponseData) => this.parseTourCollectionRequestResponse(response, isAfterOrder),
        error: (err: any) => console.log(err)
      });
  }

  private setPageData(nextPageData?: Partial<{ pageNumber: number, toursPerPage: number }>): Partial<{ pageNumber: number, toursPerPage: number }> {

    const currentPageData = this.tourStore.state.pageData?.pageIndex;
    const latestPageSizeData = this.tourStore.state.pageData?.pageSize;

    const pageData: Partial<{ pageNumber: number, toursPerPage: number }> = {
      pageNumber: nextPageData?.pageNumber !== undefined ? nextPageData.pageNumber : currentPageData,
      toursPerPage: nextPageData?.toursPerPage !== undefined ? nextPageData.toursPerPage : latestPageSizeData,
    };

    if (currentPageData && nextPageData?.pageNumber && currentPageData > nextPageData?.pageNumber) {
      pageData.pageNumber = nextPageData?.pageNumber;
    }

    return pageData;
  }

  private parseTourCollectionRequestResponse(data: ITourIntentResponseData, isAfterOrder?: boolean): void {

    const latestProductOrderResourceId: string | undefined = this.uiStateStore.state.latestProductOrderData?.resourceId;
    const latestProductOrderType: string | undefined = this.uiStateStore.state.latestProductOrderData?.productType;

    const toStoreData: ITourInteractAction = {
      action: 'UPDATE_TOUR_COLLECTION',
      list: data.tourCollection?.map((tour: Tour) => this.parseTourData(tour, isAfterOrder, latestProductOrderResourceId, latestProductOrderType)),
      pageData: data.pageData
    };

    this.uiStateStore.dispatchAction({
      action: 'TOUR_LIST_PAGE_SLICE_RECEIVED'
    });

    if (!data.tourCollection?.length && !this.initialTourCollectionRequestDone) {
      this.handleEmptyAccountTourList();
    } else if (!this.initialTourCollectionRequestDone) {
      this.initialTourCollectionRequestDone = true;
    }

    this.tourStore.dispatch(toStoreData);
  }

  private parseTourData(tour: Tour, isAfterOrder?: boolean, latestProductOrderResourceId?: string, latestProductOrderType?: string): Tour {

    tour.createdDate = this.parseTourDate(tour.createdDate);
    tour.modifiedDate = this.parseTourDate(tour.modifiedDate);

    if (isAfterOrder && latestProductOrderResourceId && tour.ids.main === latestProductOrderResourceId) {

      tour.floorPlans = <ITourFloorPlans>{
        dollhouseOrdered: latestProductOrderType === 'DOLLHOUSE' ? true : false,
        status: 'NEW'
      }
    }

    return tour;
  }

  private parseTourDate(dateToParse: string): string {

    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    const date: string = new Date(dateToParse).toLocaleString('de-DE', dateOptions);

    return date;
  }

  private setScopeParams(nextParams?: Partial<Record<RequestScopeEnum, boolean>>): Record<RequestScopeEnum, boolean> {

    let requiredArgs: Record<RequestScopeEnum, boolean> & Partial<Record<RequestScopeEnum, boolean>>;

    const defScopeParams: Record<RequestScopeEnum, boolean> = {
      'panoramas': true,
      'scopeOfWork': true,
      'attachments': true,
      'USER_SNIPPET': true,
      'internalID': true,
      'externalID': true,
      'floorplanorder': true,
      'firstImageUrls': true,
      'LINKS_DASHBOARD': true,
      'integration': false,
      'address': true,
      'externalID_IMMOBILIENSCOUT24': true,
    };

    if (nextParams?.integration === true) {
      requiredArgs = Object.assign({}, defScopeParams, { ...nextParams, 'integration.iframe': true, 'integration.qrCode': true, 'integration.pdf': false });
    } else {
      requiredArgs = Object.assign({}, defScopeParams, nextParams);
    }

    return requiredArgs;
  }

  private handleEmptyAccountTourList(): void {
    // Redirect
    doAsyncTask(500)
      .subscribe({
        complete: () => window.location.href = `https://www.immobilienscout24.de/anbieten/scoutmanager/erfolgssteigerung/virtuelle-touren.html#general`
      });
  }
}
