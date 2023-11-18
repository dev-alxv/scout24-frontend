import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';
import { UiState } from '../../+store/global/ui-state/ui.state';
import { DevTestService } from './dev-test.service';

@UntilDestroy()

@Component({
  selector: 'scout24-dev-test',
  templateUrl: './dev-test.component.html',
  styleUrls: ['./dev-test.component.scss']
})
export class DevTestComponent implements OnInit {

  public uiState: UiState;

  constructor(
    private uiStateStore: UiStateStore,
    private devTestService: DevTestService
  ) { }

  public ngOnInit(): void {
    this.handleUiState();
  }

  private handleUiState(): void {
    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.uiState = state
      });
  }

}
