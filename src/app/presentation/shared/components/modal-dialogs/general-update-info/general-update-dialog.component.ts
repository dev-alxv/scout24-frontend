import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';

@Component({
  selector: 'scout24-general-update-dialog',
  templateUrl: './general-update-dialog.component.html',
  styleUrls: ['./general-update-dialog.component.scss']
})
export class GeneralUpdateDialogComponent implements OnInit {

  public currentDisplayLanguage?: 'en' | 'de';

  @Output() public disableModalShowEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private uiStateStore: UiStateStore,
  ) { }

  public ngOnInit(): void {
    if (this.uiStateStore.state.userSettings) {
      this.currentDisplayLanguage = this.uiStateStore.state.userSettings?.currentDisplayLanguage;
    }
  }

  public dismissCheckboxState(state: boolean): void {
    this.disableModalShowEvent.emit(state);
  }
}
