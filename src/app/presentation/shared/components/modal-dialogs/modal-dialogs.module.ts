import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiCoreModule } from '../../modules/ui-core/ui-core.module';
import { ExposeListDialogComponent } from './expose-list-dialog/expose-list-dialog.component';
import { ExposeModule } from 'src/app/presentation/modules/expose/expose.module';
import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import { TourEmbedDialogComponent } from './tour-embed-dialog/tour-embed-dialog.component';
import { PaymentOptionsDialogComponent } from './payment-options-dialog/payment-options-dialog.component';
import { PaymentInfosDialogComponent } from './payment-infos-dialog/payment-infos-dialog.component';
import { PaymentCheckFloorPlanDialogComponent } from './payment-check-floor-plan-dialog/payment-check-floor-plan-dialog.component';
import { PaymentCorrectionDialogComponent } from './payment-correction-dialog/payment-correction-dialog.component';
import { WaitingResponseDialogComponent } from './waiting-response-dialog/waiting-response-dialog.component';
import { ScoutBrandingDialogComponent } from './scout-branding-dialog/scout-branding-dialog.component';
import { PaymentAgbsDialogComponent } from './payment-agbs-dialog/payment-agbs-dialog.component';
import { GeneralUpdateDialogComponent } from './general-update-info/general-update-dialog.component';

const dialogs = [
  ActionDialogComponent,
  ExposeListDialogComponent,
  TourEmbedDialogComponent,
  PaymentOptionsDialogComponent,
  PaymentInfosDialogComponent,
  PaymentCheckFloorPlanDialogComponent,
  PaymentCorrectionDialogComponent,
  WaitingResponseDialogComponent,
  ScoutBrandingDialogComponent,
  PaymentAgbsDialogComponent,
  GeneralUpdateDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    UiCoreModule,
    ExposeModule
  ],
  declarations: [
    ...dialogs,
  ],
  exports: [
    ...dialogs
  ]
})
export class ModalDialogsModule { }
