import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest } from 'rxjs';
import { ITourCollectionRequest, ITourLinkIntent, ITourUnlinkIntent } from 'src/app/domain/interfaces/tour/tour.interfaces';

import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { ExposeService } from '../../+store/+services/expose/expose.service';
import { TourService } from '../../+store/+services/tour/tour.service';
import { TourState } from '../../+store/global/tour/tour.state';
import { TourStore } from '../../+store/global/tour/tour.store';
import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';
import { UiState } from '../../+store/global/ui-state/ui.state';

@UntilDestroy()

@Component({
  selector: 'scout24-link-tour',
  templateUrl: './link-tour.component.html',
  styleUrls: ['./link-tour.component.scss']
})
export class LinkTourComponent implements OnInit {

  public tourList: Tour[] = [];
  public waitingForServer = true;
  public initialSearchRequestDone = false;
  public uiStateStream$: Observable<UiState>;

  public itemsPerPage: number;
  public currentPage: number;
  public totalItems: number;
  public scoutURL = 'https://www.immobilienscout24.de/scoutmanager/angebotsliste/app/overview.html';
  public exposeObjectId: string;
  public returnUrl: string;
  public internalID: string;
  public action: string;

  constructor(
    private tourService: TourService,
    private tourStore: TourStore,
    private exposeService: ExposeService,
    private uiStateStore: UiStateStore,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.observeUiStateStream();

    combineLatest([this.route.params, this.route.queryParams])
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (results: Params[]) => this.handleURLParamsData(results)
      });

    this.handleTourStoreStream();
  }

  private observeUiStateStream(): void {
    this.uiStateStream$ = this.uiStateStore.stateStream$;
  }

  private handleURLParamsData(results: Params[]): void {
    this.exposeObjectId = results[0]['exposeId'];
    this.returnUrl = results[1]['returnUrl'];
    this.internalID = results[1]['internalID'];
    this.action = results[1]['action'];
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

            if (!this.initialSearchRequestDone) {
              this.initialSearchRequestDone = true;
              var reqParams = {};

              if (this.internalID && this.action == 'UNLINK') {
                reqParams = {
                  searchData: {
                    input: this.internalID
                  }
                };
              }

              this.tourService.getTourCollectionSlice(reqParams);
            }
          }
          if (state.pageData) {
            this.itemsPerPage = state.pageData.pageSize;
            this.currentPage = state.pageData.pageIndex + 1;
            this.totalItems = state.pageData.rowCount;
          }
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
      }
    };

    this.tourService.getTourCollectionSlice(pageRequestParams);
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

  public closeWaitingResponseModalEvent(eventType: 'link-tour' | 'unlink-tour'): void {
    if (this.returnUrl) {
      window.location.href = this.returnUrl;
    }

    this.tourService.getTourCollectionSlice({});

    if (eventType === 'link-tour' || eventType === 'unlink-tour') {
      this.exposeService.getExposeCollectionSlice({});
    }
  }

  public toursTrackFn = (i: number, tour: Tour) => tour.ids.main;
}
