import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable, Subscription } from 'rxjs';

import { TourStore } from '../../+store/global/tour/tour.store';
import { TourService } from '../../+store/+services/tour/tour.service';
import { ExposeService } from '../../+store/+services/expose/expose.service';
import { Tour } from 'src/app/domain/models/Tour/tour.model';
import {
  IApproveTourFloorplanOrderIntent,
  IDeclineTourFloorplanOrderIntent,
  IDeleteTourIntent,
  ITourCollectionRequest,
  ITourLinkIntent,
  ITourUnlinkIntent
} from 'src/app/domain/interfaces/tour/tour.interfaces';
import { TourState } from '../../+store/global/tour/tour.state';
import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';
import { UiState } from '../../+store/global/ui-state/ui.state';
import { BaseHostModalDialogComponent } from '../../shared/components/base-host-modal-dialog/base-host-modal-dialog.component';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { PaymentInfosDialogComponent } from '../../shared/components/modal-dialogs/payment-infos-dialog/payment-infos-dialog.component';
import { GeneralUpdateDialogComponent } from '../../shared/components/modal-dialogs/general-update-info/general-update-dialog.component';
import { doAsyncTask, isDefined } from 'src/app/utils/utils';
import { LocalStorageService } from 'src/app/utils/local-storage.service';

@UntilDestroy()

@Component({
  selector: 'scout24-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit, OnDestroy {

  private newNewsModalHaveOpened = false;
  private donNotshowNewsModal = false;

  public tourList: Tour[] = [];
  public waitingForServer = true;
  public uiStateStream$: Observable<UiState>;
  public uiLatestState: UiState;

  public itemsPerPage: number;
  public currentPage: number;
  public totalItems: number;
  public scoutURL = 'https://www.immobilienscout24.de/scoutmanager/angebotsliste/app/overview.html';

  private initSearchDataSet = false;

  constructor(
    private tourStore: TourStore,
    private tourService: TourService,
    private exposeService: ExposeService,
    private uiStateStore: UiStateStore,
    private dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {
    this.donNotshowNewsModal = this.checkNewsModalView();
  }

  public ngOnInit(): void {

    this.observeUiStateStream();
    this.handleTourStoreStream();

    window.addEventListener('order-complete', this.proceedCompletedOrder.bind(this));

    combineLatest([this.route.params, this.route.queryParams])
      .subscribe({
        next: (results: Params[]) => this.handleURLParamsData(results)
      });
  }

  public ngOnDestroy(): void {
    window.removeEventListener('order-complete', this.proceedCompletedOrder.bind(this));
  }

  private proceedCompletedOrder(data: any) {
    if (data.detail.orderCompleted) {
      this.purchaseSuccessfulModal();
    }
  }

  private observeUiStateStream(): void {
    this.uiStateStream$ = this.uiStateStore.stateStream$;

    this.uiStateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (r: UiState) => {
          this.handleUiStateStream(r);
          this.uiLatestState = r;
        }
      });
  }

  private handleUiStateStream(uiState: UiState): void {

    if (uiState.initialized && !this.newNewsModalHaveOpened && !this.donNotshowNewsModal) {

      this.newNewsModalHaveOpened = true;

      doAsyncTask(850)
        .subscribe({
          complete: () => {
            this.newNewsAutoPopupModal();
          }
        });
    }
  }

  private handleTourStoreStream(): void {

    this.tourStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: TourState) => {

          if (state.list) {
            this.tourList = state.list;
          }
          if (state.list && state.list.length) {
            this.waitingForServer = false;
          }
          if (state.pageData) {
            this.itemsPerPage = state.pageData.pageSize;
            this.currentPage = state.pageData.pageIndex + 1;
            this.totalItems = state.pageData.rowCount;
          }
        }
      });
  }

  private handleURLParamsData(results: Params[]): void {

    if (!this.initSearchDataSet) {

      const haveTourIdUrl: boolean = isDefined(results[0]['tourId']);

      this.initSearchDataSet = true;

      if (haveTourIdUrl) {
        this.tourService.setUrlSearchData(results[0]['tourId']);
      } else {
        this.tourService.getTourCollectionSlice({ requestScope: { 'integration': true } });
      };
    }
  }

  public newNewsAutoPopupModal(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: '',
        controlActions: true,
        logo: false,
        component: GeneralUpdateDialogComponent,
        inputs: { // here an object with inputs data needed by your hosted component
        },
        buttonsConfig: {
          closeButton: true,
          actionButtonTwo: {
            enable: true,
            text: this.translate.instant('scout24.Main.Modal.News.Confirm')
          }
        }
      }),
      width: '530px',
      height: '630px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionTwo
              .subscribe({
                next: () => {
                  this.saveNewsModalViewToLocalStorage();
                  dialogRef.close();
                }
              })
          );
          outputActionsSubs.add(
            dialogRef.componentInstance['disableModalShowEvent' as keyof BaseHostModalDialogComponent]
              .subscribe({
                next: (evenData: boolean) => this.donNotshowNewsModal = evenData
              })
          );
        }
      });

    dialogRef.afterClosed()
      .subscribe({
        next: () => outputActionsSubs.unsubscribe()
      });
  }

  private purchaseSuccessfulModal(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.ThankYou'),
        controlActions: true,
        logo: false,
        component: PaymentInfosDialogComponent,
        inputs: {
          orderType: this.uiLatestState.latestProductOrderData?.productType
        },
        buttonsConfig: {
          closeButton: true,
          cancelButton: false,
          actionButtonTwo: {
            enable: true,
            text: this.translate.instant('scout24.Action.Finish')
          }
        }
      }),
      width: '700px',
      height: '290px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionTwo
              .subscribe({
                next: () => {
                  dialogRef.componentInstance.closeModal();
                }
              })
          );
        }
      });

    dialogRef.afterClosed()
      .subscribe({
        next: () => {
          this.tourService.getTourCollectionSlice({}, true);
          outputActionsSubs.unsubscribe();
        }
      });
  }

  public fetchPage(page: number): void {

    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 40); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 5);

    const pageRequestParams: ITourCollectionRequest = <ITourCollectionRequest>{
      pageData: {
        pageNumber: page - 1
      },
      requestScope: {
        'integration': true
      }
    };

    this.tourService.getTourCollectionSlice(pageRequestParams);
  }

  public deleteTour(deleteData: IDeleteTourIntent): void {
    const deleteTourIntentData: IDeleteTourIntent = <IDeleteTourIntent>{
      tourItemId: deleteData.tourItemId
    }

    this.tourService.deleteTour(deleteTourIntentData);
  }

  public linkTour(linkData: ITourLinkIntent): void {
    const lindTourIntentData: ITourLinkIntent = <ITourLinkIntent>{
      tourItemId: linkData.tourItemId,
      exposeObjectId: linkData.exposeObjectId
    }

    this.tourService.linkTour(lindTourIntentData);
  }

  public unlinkTour(unlinkData: ITourUnlinkIntent): void {
    const unlinkTourIntentData: ITourUnlinkIntent = <ITourUnlinkIntent>{
      tourItemId: unlinkData.tourItemId
    }

    this.tourService.unlinkTour(unlinkTourIntentData);
  }

  public approveTourFloorplanOrder(approveData: IApproveTourFloorplanOrderIntent): void {
    const approveIntentData: IApproveTourFloorplanOrderIntent = <IApproveTourFloorplanOrderIntent>{
      orderId: approveData.orderId
    };

    this.tourService.approveTourFloorplanOrder(approveIntentData);
  }

  public declineTourFloorplanOrder(declineData: IDeclineTourFloorplanOrderIntent): void {
    const declineIntentData: IDeclineTourFloorplanOrderIntent = <IDeclineTourFloorplanOrderIntent>{
      orderId: declineData.orderId,
      feedback: declineData.feedback
    };

    this.tourService.declineTourFloorplanOrder(declineIntentData);
  }

  public closeWaitingResponseModalEvent(eventType: 'link-tour' | 'unlink-tour'): void {

    this.tourService.getTourCollectionSlice({});

    if (eventType === 'link-tour' || eventType === 'unlink-tour') {
      this.exposeService.getExposeCollectionSlice({});
    }
  }

  private saveNewsModalViewToLocalStorage(): void {
    this.localStorage.set('donNotshowNewsModal', this.donNotshowNewsModal.toString());
  }

  private checkNewsModalView(): boolean {

    const modalOption: boolean = isDefined(this.localStorage.get('donNotshowNewsModal'));
    let modalOptionValue: boolean;

    if (modalOption) {

      modalOptionValue = this.localStorage.get('donNotshowNewsModal') === 'true' ? true : false;

    } else {

      modalOptionValue = false;

    }

    return modalOptionValue;
  }

  public toursTrackFn = (i: number, tour: Tour) => tour.ids.main;

}
