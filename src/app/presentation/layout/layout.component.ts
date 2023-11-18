import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UiStateStore } from '../+store/global/ui-state/ui-state.store';
import { UiState } from '../+store/global/ui-state/ui.state';

@UntilDestroy()

@Component({
  selector: 'scout24-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private uiStateStore: UiStateStore
  ) { }

  ngOnInit(): void {
    this.observeUiStateStream();
  }

  private observeUiStateStream(): void {

    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (s: UiState) => this.handleUiStateStream(s)
      });
  }

  private handleUiStateStream(uiState: UiState): void {

  }
}
