import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { TourService } from 'src/app/presentation/+store/+services/tour/tour.service';
import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';
import { uiOngoingActions, UiState } from 'src/app/presentation/+store/global/ui-state/ui.state';
import { doAsyncTask } from 'src/app/utils/utils';

@UntilDestroy()

@Component({
  selector: 'scout24-payment-correction-dialog',
  templateUrl: './payment-correction-dialog.component.html',
  styleUrls: ['./payment-correction-dialog.component.scss']
})
export class PaymentCorrectionDialogComponent implements OnInit {

  public feedbackInput: string;
  public approveDeclineInProgress = false;

  @Output() public sendFeedbackEvent: EventEmitter<{ feedbackInput: string }> = new EventEmitter();

  constructor(
    private uiStateStore: UiStateStore,
    private tourService: TourService,
    private dialogRef: MatDialog
  ) {
    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.parseUiState(state.uiOngoingActions)
      });
  }

  public ngOnInit(): void {

  }

  public closeModal(): void {
    this.dialogRef.closeAll();
  }

  public sendFeedback(): void {
    if (this.feedbackInput !== undefined && this.feedbackInput !== '') {
      this.sendFeedbackEvent.emit({
        feedbackInput: this.feedbackInput
      });
    }
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

}
