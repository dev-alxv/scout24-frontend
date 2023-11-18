import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';
import { uiOngoingActions, UiState } from 'src/app/presentation/+store/global/ui-state/ui.state';
import { doAsyncTask } from 'src/app/utils/utils';

@UntilDestroy()

@Component({
  selector: 'scout24-waiting-response-dialog',
  templateUrl: './waiting-response-dialog.component.html',
  styleUrls: ['./waiting-response-dialog.component.scss']
})
export class WaitingResponseDialogComponent implements OnInit {

  public uiStateStream: UiState;
  public uiStateReceived = false;
  public done = false;

  @Input() public loading = false;
  @Input() public message: string;
  @Input() public type: 'link-tour' | 'unlink-tour' | 'delete-tour' | 'approveFloorplan' | 'approveDollhouse';

  @Output() public closeModalEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private uiStateStore: UiStateStore
  ) {
    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.parseUiState(state.uiOngoingActions)
      });
  }

  public ngOnInit(): void {

  }

  private parseUiState(state?: uiOngoingActions): void {
    if (state?.apiIntent?.tourOrigin) {

      if (this.type === 'link-tour' && !state?.apiIntent?.tourOrigin.linkingTour) {
        this.uiStateReceived = true;
        this.responseReceived();
      }

      if (this.type === 'unlink-tour' && !state?.apiIntent?.tourOrigin.unLinkingTour) {
        this.uiStateReceived = true;
        this.responseReceived();
      }

      if (this.type === 'delete-tour' && !state?.apiIntent?.tourOrigin.deletingTour) {
        this.uiStateReceived = true;
        this.responseReceived();
      }

      if (this.type === 'approveFloorplan' && !state?.apiIntent?.tourOrigin.approveOrDeclineTourFloorplanOrder) {
        this.uiStateReceived = true;
        this.responseReceived();
      }

      if (this.type === 'approveDollhouse' && !state?.apiIntent?.tourOrigin.approveOrDeclineTourFloorplanOrder) {
        this.uiStateReceived = true;
        this.responseReceived();
      }
    }
  }

  private responseReceived(): void {
    this.loading = false;
    this.done = true;

    doAsyncTask(4500)
      .subscribe({
        complete: () => this.closeModalEvent.emit()
      });
  }

}
