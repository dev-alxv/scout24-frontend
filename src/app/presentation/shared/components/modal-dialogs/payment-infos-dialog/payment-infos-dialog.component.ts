import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { UserContractProductType } from 'src/app/domain/enums/user/user.enums';

@Component({
  selector: 'scout24-payment-infos-dialog',
  templateUrl: './payment-infos-dialog.component.html',
  styleUrls: ['./payment-infos-dialog.component.scss']
})
export class PaymentInfosDialogComponent implements OnInit {

  public currentDisplayLanguage?: 'en' | 'de';
  public orderedProductType: UserContractProductType;

  constructor(
    private uiStateStore: UiStateStore,
    @Inject(MAT_DIALOG_DATA) private data: ModalTemplateInputData
  ) {
    this.orderedProductType = this.data.inputs.orderType;
  }

  public ngOnInit(): void {
    if (this.uiStateStore.state.userSettings) {
      this.currentDisplayLanguage = this.uiStateStore.state.userSettings?.currentDisplayLanguage;
    }
  }

}
