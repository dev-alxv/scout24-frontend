import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { ITourLinkIntent, ITourUnlinkIntent } from 'src/app/domain/interfaces/tour/tour.interfaces';
import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { doAsyncTask } from 'src/app/utils/utils';
import { BaseHostModalDialogComponent } from '../base-host-modal-dialog/base-host-modal-dialog.component';
import { ActionDialogComponent } from '../modal-dialogs/action-dialog/action-dialog.component';
import { WaitingResponseDialogComponent } from '../modal-dialogs/waiting-response-dialog/waiting-response-dialog.component';

@Component({
  selector: 'scout24-link-tour-list-item',
  templateUrl: './link-tour-list-item.component.html',
  styleUrls: ['./link-tour-list-item.component.scss']
})
export class LinkTourListItemComponent implements OnInit {

  private waitingForResponse = false;
  public defaultImage = 'assets/img/no_image.png';

  @Input() public tour: Tour;
  @Input() public exposeObjectId: string | null;
  @Input() public internalID: string | null;
  @Input() public action: string | null;
  @Input() public returnUrl: string | null;

  @Output() public linkTourEvent: EventEmitter<ITourLinkIntent> = new EventEmitter();
  @Output() public unlinkTourEvent: EventEmitter<ITourUnlinkIntent> = new EventEmitter();
  @Output() public closeModalEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    if (this.action && this.action === 'UNLINK' && this.internalID && this.internalID === this.tour.ids.internal) {

      doAsyncTask(200)
        .subscribe({
          complete: () => {
            this.unlinkTourConfirm();
          }
        });
    }
  }

  public openTourPlayer(): void {
    window.open(this.tour.dashboardLinks.tourPlayer, '_blank');
  }

  public linkTourConfirm(): void {
    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.LinkTour.Title'),
        controlActions: true,
        logo: false,
        component: ActionDialogComponent, //--> here component to load
        inputs: { // here an object with inputs data needed by your hosted component
          tourId: this.tour.ids.internal
        },
        buttonsConfig: {
          closeButton: false,
          cancelButton: true,
          actionButtonTwo: {
            enable: true,
            text: this.translate.instant('scout24.Main.LinkTourListItem.LinkExpose')
          }
        }
      }),
      width: '650px',
      height: '160px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionTwo
              .subscribe({
                next: () => {
                  const tourLinkIntent: ITourLinkIntent = <ITourLinkIntent>{
                    tourItemId: this.tour.ids.item,
                    exposeObjectId: this.exposeObjectId
                  }

                  this.waitingForResponse = true;
                  this.linkTourEvent.emit(tourLinkIntent);
                  this.waitingResponse('link-tour', this.translate.instant('scout24.Main.TourListItem.ExposeLinkingInProgress'));
                  dialogRef.componentInstance.closeModal();
                }
              })
          );
        }
      });

    dialogRef.afterClosed()
      .subscribe({
        next: () => {
          outputActionsSubs.unsubscribe();
          if (!this.waitingForResponse && this.returnUrl) {
              window.location.href = this.returnUrl;
          }
        }
      });
  }

  public unlinkTourConfirm(): void {
    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.DetachExpose'),
        controlActions: true,
        logo: false,
        component: ActionDialogComponent, //--> here component to load
        inputs: { // here an object with inputs data needed by your hosted component
          tourId: this.tour.ids.internal
        },
        buttonsConfig: {
          closeButton: false,
          cancelButton: true,
          actionButtonTwo: {
            enable: true,
            text: this.translate.instant('scout24.Main.TourListItem.LinkExposeDelete')
          }
        }
      }),
      width: '650px',
      height: '160px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionTwo
              .subscribe({
                next: () => {
                  this.waitingForResponse = true;
                  this.unlinkTourEvent.emit({ tourItemId: this.tour.ids.item });
                  this.waitingResponse('unlink-tour', this.translate.instant('scout24.Main.TourListItem.ExposeDeLinkingInProgress'));
                  dialogRef.componentInstance.closeModal();
                }
              })
          );
        }
      });

    dialogRef.afterClosed()
      .subscribe({
        next: () => {
          outputActionsSubs.unsubscribe();

          if (!this.waitingForResponse && this.returnUrl) {
              window.location.href = this.returnUrl;
          }
        }
      });
  }

  public waitingResponse(type: 'link-tour' | 'unlink-tour', firstMessage: string): void {
    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: '',
        controlActions: false,
        logo: false,
        component: WaitingResponseDialogComponent,
        inputs: {
          loading: true,
          message: firstMessage,
          type: type,
        },
        buttonsConfig: {
          closeButton: false
        }
      }),
      width: '600px',
      height: 'auto'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance['closeModalEvent' as keyof BaseHostModalDialogComponent]
              .subscribe({
                next: () => {
                  dialogRef.componentInstance.closeModal();

                  doAsyncTask(230)
                    .subscribe({
                      complete: () => {
                        this.closeModalEvent.emit(type);
                        this.waitingForResponse = false;
                      }
                    });
                }
              })
          );
        }
      });

    dialogRef.afterClosed()
      .subscribe({
        next: () => outputActionsSubs.unsubscribe()
      });
  }
}
