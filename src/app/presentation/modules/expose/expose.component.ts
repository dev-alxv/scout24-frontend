import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';

import { Expose } from 'src/app/domain/models/expose/expose.model';
import { ExposeStore } from '../../+store/global/expose/expose.store';
import { ExposeState } from '../../+store/global/expose/expose.state';
import { ExposeService } from '../../+store/+services/expose/expose.service';
import { IExposeCollectionRequest } from 'src/app/domain/interfaces/expose/expose.interfaces';
import { UiState } from '../../+store/global/ui-state/ui.state';
import { UiStateStore } from '../../+store/global/ui-state/ui-state.store';

@UntilDestroy()

@Component({
  selector: 'scout24-expose',
  templateUrl: './expose.component.html',
  styleUrls: ['./expose.component.scss']
})
export class ExposeComponent implements OnInit {

  public exposeList: Expose[] = [];
  public waitingForServer = true;
  public uiStateStream$: Observable<UiState>;

  public itemsPerPage: number;
  public currentPage: number;
  public totalItems: number;

  @Output() public linkExposeEvent: EventEmitter<{ exposeObjectId: string }> = new EventEmitter();

  constructor(
    private exposeStore: ExposeStore,
    private exposeService: ExposeService,
    private uiStateStore: UiStateStore,
    private dialogRef: MatDialog
  ) { }

  public ngOnInit(): void {
    this.observeUiStateStream();
    this.handleExposeStateStream();
  }

  public closeExpose(): void {
    this.dialogRef.closeAll();
  }

  private observeUiStateStream(): void {
    this.uiStateStream$ = this.uiStateStore.stateStream$;
  }

  private handleExposeStateStream(): void {

    this.exposeStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: ExposeState) => {

          if (state.list && state.list.length) {
            this.exposeList = state.list;
          };

          if (state.pageData) {
            this.itemsPerPage = state.pageData.pageSize;
            this.currentPage = state.pageData.pageIndex;
            this.totalItems = state.pageData.rowCount;
          };

          this.waitingForServer = false;
        }
      });
  }

  public linkExpose(id: { exposeObjectId: string }): void {
    this.linkExposeEvent.emit(id);
  }

  public fetchPage(page: number): void {

    this.waitingForServer = true;

    const pageRequestParams: IExposeCollectionRequest = <IExposeCollectionRequest>{
      pageData: {
        pageNumber: page
      }
    };

    this.exposeService.getExposeCollectionSlice(pageRequestParams);
  }

  public exposesTrackFn = (i: number, expose: Expose) => expose.ids.objectID;

}
