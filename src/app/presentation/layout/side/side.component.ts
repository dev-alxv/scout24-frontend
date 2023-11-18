import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { TourService } from '../../+store/+services/tour/tour.service';
import { ITourCollectionRequest } from 'src/app/domain/interfaces/tour/tour.interfaces';
import { BaseHostModalDialogComponent } from '../../shared/components/base-host-modal-dialog/base-host-modal-dialog.component';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { ScoutBrandingDialogComponent } from '../../shared/components/modal-dialogs/scout-branding-dialog/scout-branding-dialog.component';
import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';
import { UiState } from '../../+store/global/ui-state/ui.state';
import { doAsyncTask } from 'src/app/utils/utils';
import { UserService } from '../../+store/+services/user/user.service';

@UntilDestroy()

@Component({
  selector: 'scout24-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  public searchInputText: string;
  public toursPerPageSelected = '10';

  private tourInitialSearchSubmitted = false;

  constructor(
    private tourService: TourService,
    private uiStateStore: UiStateStore,
    private userService: UserService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.observeUiStateStream();
  }

  private observeUiStateStream(): void {

    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (s: UiState) => this.handleUiStateStream(s)
      });
  }

  private handleUiStateStream(state: UiState): void {

    if (!this.tourInitialSearchSubmitted && state.initialUrlSearchData !== undefined) {

      this.tourInitialSearchSubmitted = true;
      this.searchInputText = state.initialUrlSearchData;

      doAsyncTask(200)
        .subscribe({
          complete: () => this.submitSearch()
        });
    }
  }

  public submitSearch(): void {

    const pageRequestParams: ITourCollectionRequest = <ITourCollectionRequest>{
      searchData: {
        input: this.searchInputText
      }
    };

    if (this.searchInputText !== undefined) {
      this.tourService.getTourCollectionSlice(pageRequestParams);
    }
  }

  public changeToursPerPage(perPage: string): void {

    const pageRequestParams: ITourCollectionRequest = <ITourCollectionRequest>{
      pageData: {
        pageNumber: 0,
        toursPerPage: parseInt(perPage)
      }
    }

    this.tourService.getTourCollectionSlice(pageRequestParams);
  }

  public scoutBrandingEditor(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: 'relative-modal', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.SetLogoAndDesign'),
        controlActions: false,
        logo: true,
        component: ScoutBrandingDialogComponent, //--> here component to load
        inputs: { // here an object with inputs data needed by your hosted component
        },
        buttonsConfig: {
          closeButton: true,
          // cancelButton: true,
        }
      }),
    });

    dialogRef.afterClosed()
      .subscribe({
        next: () => {
          this.userService.clearUserPlayerPreviewData();
          outputActionsSubs.unsubscribe();
        }
      });
  }

  public keyDownFunction(event: any): void {

    // ENTER KEY
    if (event.keyCode === 13) {
      this.submitSearch();
    }
  }

  public clearSearchInput(): void {
    this.searchInputText = '';
    this.tourService.getTourCollectionSlice({
      pageData: {
        pageNumber: 0
      },
      searchData: {
        input: ''
      }
    });
  }

}
