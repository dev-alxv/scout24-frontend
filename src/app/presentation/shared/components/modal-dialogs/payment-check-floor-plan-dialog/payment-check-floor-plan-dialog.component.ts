import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { TourService } from 'src/app/presentation/+store/+services/tour/tour.service';
import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';
import { uiOngoingActions, UiState } from 'src/app/presentation/+store/global/ui-state/ui.state';
import { doAsyncTask } from 'src/app/utils/utils';

@UntilDestroy()

@Component({
  selector: 'scout24-payment-check-floor-plan-dialog',
  templateUrl: './payment-check-floor-plan-dialog.component.html',
  styleUrls: ['./payment-check-floor-plan-dialog.component.scss']
})
export class PaymentCheckFloorPlanDialogComponent implements OnInit {

  private tour: Tour;
  private tourPlayerLink: string;
  private tourOrderId: string;
  private dollhouseOrdered: boolean;

  public reviewPlayerURL: SafeResourceUrl;
  public approveDeclineInProgress = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ModalTemplateInputData,
    private sanitizer: DomSanitizer,
    private tourService: TourService,
    private uiStateStore: UiStateStore,
    private dialogRef: MatDialog
  ) {
    this.tour = this.data.inputs.tour;
    this.tourPlayerLink = this.tour.dashboardLinks.tourPlayer || '';
    this.tourOrderId = this.tour.floorPlans.id || '';

    if (this.tour.floorPlans.dollhouseOrdered !== undefined) {
      this.dollhouseOrdered = this.tour.floorPlans.dollhouseOrdered;
    }

    this.buildReviewPlayerURL();

    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.parseUiState(state.uiOngoingActions)
      });
  }

  public ngOnInit(): void {

  }

  private parseUiState(state?: uiOngoingActions): void {
    if (this.approveDeclineInProgress === true && state?.apiIntent?.tourOrigin?.approveOrDeclineTourFloorplanOrder === false) {
      this.dialogRef.closeAll();

      doAsyncTask(230)
        .subscribe({
          complete: () => this.tourService.getTourCollectionSlice({})
        });
    }

    if (state?.apiIntent?.tourOrigin?.approveOrDeclineTourFloorplanOrder) {
      this.approveDeclineInProgress = state.apiIntent.tourOrigin.approveOrDeclineTourFloorplanOrder;
    }
  }

  private buildReviewPlayerURL(): void {

    let url: string = this.tourPlayerLink + '?p.device=Desktop&orderId=' + this.tourOrderId;

    if (this.dollhouseOrdered) {
      url = url + '&psm.showDollHouse=true';
    } else {
      url = url + '&psm.startWithClosedFP=false';
    }

    this.reviewPlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
