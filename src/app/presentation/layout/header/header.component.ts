import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { UiStateService } from '../../+store/+services/ui-state/ui-state.service';
import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';
import { UiState } from '../../+store/global/ui-state/ui.state';
import { LanguageString } from '../../../domain/enums/locales.enum';

@UntilDestroy()

@Component({
  selector: 'scout24-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentDisplayLanguage: LanguageString;
  public uiState$: Observable<UiState>;


  constructor(
    private uiStateService: UiStateService,
    private uiStateStore: UiStateStore
  ) {
    this.uiState$ = uiStateStore.stateStream$;
  }

  public ngOnInit(): void {
    this.setDefaultLanguage();
    this.observeUiStateStream();
  }

  private setDefaultLanguage(): void {
    if (this.uiStateStore.state.userSettings && this.uiStateStore.state.userSettings.defaultDisplayLanguage) {
      this.currentDisplayLanguage = this.uiStateStore.state.userSettings.defaultDisplayLanguage;
    }
  }

  private observeUiStateStream(): void {
    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.handleUiStateStream(state)
      });
  }

  private handleUiStateStream(state: UiState): void {
    if (state.userSettings && state.userSettings.currentDisplayLanguage) {
      this.currentDisplayLanguage = state.userSettings.currentDisplayLanguage;
    }
  }

  public changeLanguage(languageInput: LanguageString): void {
    this.uiStateService.changeDisplayLanguageRequest(languageInput);
  }

}
