import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { BaseHostModalDialogComponent } from '../base-host-modal-dialog/base-host-modal-dialog.component';
import { ExposeListDialogComponent } from '../modal-dialogs/expose-list-dialog/expose-list-dialog.component';
import { TourEmbedDialogComponent } from '../modal-dialogs/tour-embed-dialog/tour-embed-dialog.component';
import { ActionDialogComponent } from '../modal-dialogs/action-dialog/action-dialog.component';
import {
  IApproveTourFloorplanOrderIntent,
  IDeclineTourFloorplanOrderIntent,
  IDeleteTourIntent,
  ITourLinkIntent,
  ITourUnlinkIntent
} from 'src/app/domain/interfaces/tour/tour.interfaces';
import { PaymentOptionsDialogComponent } from '../modal-dialogs/payment-options-dialog/payment-options-dialog.component';
import { PaymentCheckFloorPlanDialogComponent } from '../modal-dialogs/payment-check-floor-plan-dialog/payment-check-floor-plan-dialog.component';
import { PaymentCorrectionDialogComponent } from '../modal-dialogs/payment-correction-dialog/payment-correction-dialog.component';
import { WaitingResponseDialogComponent } from '../modal-dialogs/waiting-response-dialog/waiting-response-dialog.component';
import { doAsyncTask } from 'src/app/utils/utils';
import { PaymentAgbsDialogComponent } from '../modal-dialogs/payment-agbs-dialog/payment-agbs-dialog.component';
import { UserContractProductConfig } from 'src/app/domain/models/User/user.model';
import { IUserProductOrderIntent } from 'src/app/domain/interfaces/user/user.interfaces';
import { UserService } from 'src/app/presentation/+store/+services/user/user.service';
import { GeneralUpdateDialogComponent } from '../modal-dialogs/general-update-info/general-update-dialog.component';

@Component({
  selector: 'scout24-tour-list-item',
  templateUrl: './tour-list-item.component.html',
  styleUrls: ['./tour-list-item.component.scss']
})
export class TourListItemComponent implements OnInit {

  public defaultImage = 'assets/img/no_image.png';

  public hasEnteredDownloadMenu = false;
  public hasEnteredShareMenu = false;

  @Input() public tour: Tour;

  @Output() public linkTourEvent: EventEmitter<ITourLinkIntent> = new EventEmitter();
  @Output() public unlinkTourEvent: EventEmitter<ITourUnlinkIntent> = new EventEmitter();
  @Output() public deleteTourEvent: EventEmitter<IDeleteTourIntent> = new EventEmitter();
  @Output() public approveTourFloorplanOrderEvent: EventEmitter<IApproveTourFloorplanOrderIntent> = new EventEmitter();
  @Output() public declineTourFloorplanOrderEvent: EventEmitter<IDeclineTourFloorplanOrderIntent> = new EventEmitter();
  @Output() public closeModalEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private translate: TranslateService,
    private userService: UserService
  ) { }

  public ngOnInit(): void {

  }

  public downloadHoverMenu(any: any): void {
    console.log(any);
  }

  public openTourPlayer(): void {
    window.open(this.tour.dashboardLinks.tourPlayer, '_blank');
  }

  public downloadQRcode(): void {
    window.open(this.tour.integrationLinks.qrCode, '_self');
  }

  public downloadImage(): void {
    window.open(this.tour.dashboardLinks.downloadPanoramas, '_self');
  }

  public downloadFloorPlan(): void {
    window.open(this.tour.dashboardLinks.fpZipImages, '_blank');
  }


  public deleteTourConfirm(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.DeleteTitle'),
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
            text: this.translate.instant('scout24.Main.Modal.ButtonConfirmDelete')
          }
        }
      }),
      width: '600px',
      height: '160px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionTwo
              .subscribe({
                next: () => {
                  this.deleteTourEvent.emit({ tourItemId: this.tour.ids.item });
                  this.waitingResponse('delete-tour', this.translate.instant('Tour.DeletingInProgress'));
                  dialogRef.componentInstance.closeModal();
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

  public unlinkExposeConfirm(): void {

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
        next: () => outputActionsSubs.unsubscribe()
      });
  }

  public openExposeListModal(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: 'expose-list-modal', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Expose.ExposeTitle'),
        controlActions: false,
        logo: false,
        component: ExposeListDialogComponent, //--> here component to load
        inputs: { // here an object with inputs data needed by your hosted component
          tourId: this.tour.ids.internal
        },
        buttonsConfig: {
          closeButton: true,
          // cancelButton: true,
        }
      }),
      width: '840px',
      height: '820px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance['linkExposeEvent' as keyof BaseHostModalDialogComponent]
              .subscribe({
                next: (eventData: { exposeObjectId: string }) => {

                  const tourLinkIntent: ITourLinkIntent = <ITourLinkIntent>{
                    tourItemId: this.tour.ids.item,
                    exposeObjectId: eventData.exposeObjectId
                  }

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
        next: () => outputActionsSubs.unsubscribe()
      });
  }

  public embedTour(): void {
    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.EmbedTabTitle'),
        controlActions: false,
        logo: false,
        component: TourEmbedDialogComponent, //--> here component to load
        inputs: { // here an object with inputs data needed by your hosted component
          internalID: this.tour.ids.internal,
          userID: this.tour.author.id
        },
        buttonsConfig: {
          closeButton: true,
          // cancelButton: true,
        }
      }),
      width: '840px',
      height: '361px'
    });
  }

  public copyTourLink(): void {
    const copy = `${this.tour.integrationLinks.iframe}`;
    this.clipboard.copy(copy);

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: '', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: '',
        controlActions: false,
        logo: false,
        component: ActionDialogComponent,
        inputs: {
          message: this.translate.instant('scout24.Main.TourListItem.TourNotifyCopy'),
          onlyInfoModal: true,
          closeTimeDelayInput: 1500
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
                next: () => dialogRef.componentInstance.closeModal()
              })
          );
        }
      });

    dialogRef.afterClosed()
      .subscribe({
        next: () => outputActionsSubs.unsubscribe()
      });
  }

  public openTourUpgradeOptions(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: 'relative-modal', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.UpgradeOptions'),
        controlActions: true,
        logo: true,
        component: PaymentOptionsDialogComponent,
        inputs: {
          tour: this.tour,
        },
        buttonsConfig: {
          closeButton: true,
          cancelButton: true,
        }
      }),
      width: '800px',
      height: '910px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance['productSelectedEvent' as keyof BaseHostModalDialogComponent]
              .subscribe({
                next: (product: UserContractProductConfig) => {
                  this.openAgbsConfirmationModal(product);
                  dialogRef.componentInstance.closeModal();
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

  public openAgbsConfirmationModal(selectedProduct: UserContractProductConfig): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: 'relative-modal', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.Agbs.Booking'),
        controlActions: true,
        logo: true,
        component: PaymentAgbsDialogComponent,
        inputs: {
          tour: this.tour,
          productToOrder: selectedProduct
        },
        buttonsConfig: {
          closeButton: true,
          cancelButton: true,
          actionButtonThree: {
            enable: true,
            text: this.translate.instant('scout24.Main.Modal.Agbs.Buy'),
          }
        }
      }),
      width: '800px',
      height: '900px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionThree
              .subscribe({
                next: () => {
                  this.makeOrder(selectedProduct);
                }
              })
          );
          outputActionsSubs.add(
            dialogRef.componentInstance['makeOrderEvent' as keyof BaseHostModalDialogComponent]
              .subscribe({
                next: (evenData: any) => {
                  dialogRef.componentInstance.closeModal();
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

  public reviewFloorplan(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: 'relative-modal', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant(' '),
        controlActions: true,
        logo: true,
        component: PaymentCheckFloorPlanDialogComponent,
        inputs: {
          tour: this.tour,
        },
        buttonsConfig: {
          closeButton: true,
          cancelButton: true,
          actionButtonOne: {
            enable: true,
            text: this.translate.instant('scout24.Action.Correct')
          },
          actionButtonTwo: {
            enable: true,
            text: this.translate.instant('scout24.Action.Confirm')
          }
        }
      }),
      width: '850px',
      height: '750px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance.actionOne
              .subscribe({
                next: () => {
                  dialogRef.componentInstance.closeModal();
                  this.sendFeedback();
                }
              })
          );

          outputActionsSubs.add(
            dialogRef.componentInstance.actionTwo
              .subscribe({
                next: () => {
                  const approveIntentData: IApproveTourFloorplanOrderIntent = <IApproveTourFloorplanOrderIntent>{
                    orderId: this.tour.floorPlans.id
                  };

                  this.approveTourFloorplanOrderEvent.emit(approveIntentData);

                  if (this.tour.floorPlans.dollhouseOrdered) {
                    this.waitingResponse('approveDollhouse', this.translate.instant('scout24.Main.TourListItem.FloorPlanDollhouseApprovingInProgress'));
                  } else {
                    this.waitingResponse('approveFloorplan', this.translate.instant('scout24.Main.TourListItem.FloorPlanDollhouseApprovingInProgress'));
                  }

                  dialogRef.componentInstance.closeModal();
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

  public sendFeedback(): void {

    const outputActionsSubs: Subscription = new Subscription();

    const dialogRef = this.dialog.open(BaseHostModalDialogComponent, {
      panelClass: 'relative-modal', // add class for this dialog
      data: new ModalTemplateInputData({
        modalTitle: this.translate.instant('scout24.Main.Modal.CorrectFloorPlan'),
        controlActions: false,
        logo: true,
        component: PaymentCorrectionDialogComponent,
        inputs: {
          internalID: this.tour.ids.internal,
        },
        buttonsConfig: {
          closeButton: true,
          cancelButton: true,
          actionButtonTwo: {
            enable: true,
            text: this.translate.instant('scout24.Action.ConfirmCorrection')
          }
        }
      }),
      width: '800px',
      height: '550px'
    });

    dialogRef.afterOpened()
      .subscribe({
        next: () => {
          outputActionsSubs.add(
            dialogRef.componentInstance['sendFeedbackEvent' as keyof BaseHostModalDialogComponent]
              .subscribe({
                next: (feedbackData: { feedbackInput: string }) => {

                  const declineIntentData: IDeclineTourFloorplanOrderIntent = <IDeclineTourFloorplanOrderIntent>{
                    orderId: this.tour.floorPlans.id,
                    feedback: feedbackData.feedbackInput
                  };

                  this.declineTourFloorplanOrderEvent.emit(declineIntentData);
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

  public makeOrder(product: UserContractProductConfig): void {

    const productOrderIntentData: IUserProductOrderIntent = <IUserProductOrderIntent>{
      product: product.productType,
      purchaseType: product.purchaseType,
      resourceId: this.tour.ids.main,
      userEmail: this.tour.author.email
    };

    this.userService.makeProductOrder(productOrderIntentData);
  }

  public waitingResponse(type: 'link-tour' | 'unlink-tour' | 'delete-tour' | 'approveFloorplan' | 'approveDollhouse', firstMessage: string): void {

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
                      complete: () => this.closeModalEvent.emit(type)
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
