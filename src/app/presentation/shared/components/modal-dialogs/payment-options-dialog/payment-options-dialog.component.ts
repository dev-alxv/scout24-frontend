import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { UserStore } from 'src/app/presentation/+store/global/user/user.store';
import { UserContract, UserContractProductConfig } from 'src/app/domain/models/User/user.model';
import { doAsyncTask, isDefined } from 'src/app/utils/utils';
import { TranslateService } from '@ngx-translate/core';

export declare const fastspring: any;

@Component({
  selector: 'scout24-payment-options-dialog',
  templateUrl: './payment-options-dialog.component.html',
  styleUrls: ['./payment-options-dialog.component.scss']
})
export class PaymentOptionsDialogComponent implements OnInit, AfterViewInit {

  public userContract: UserContract;
  public userContractProducts: UserContractProductConfig[];
  public floorPlanData: UserContractProductConfig;
  public dollhouseData: UserContractProductConfig;
  public floorplanOrdered = false;
  public initDone = false;
  public orderInProgress = false;

  public exampleDHLink = 'https://app.immoviewer.com/portal/tour/2108811';

  @Input() public tour: Tour;

  @Output() public productSelectedEvent: EventEmitter<UserContractProductConfig> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data: ModalTemplateInputData,
    private userStore: UserStore
  ) {
    this.tour = this.data.inputs.tour;
    this.userContract = this.userStore.state.userContract || {} as UserContract;
    this.userContractProducts = this.userStore.state.userContract?.productConfigs || [];
  }

  public calcDollHouseSum(sum1: any, sum2: any): number {
    const finalSum: number = Number(sum1) + Number(sum2);
    return finalSum;
  }

  public ngOnInit(): void {
    this.setUserProductData();
  }

  public ngAfterViewInit(): void {
    doAsyncTask(500)
      .subscribe({
        complete: () => this.initDone = true
      });
  }

  private setUserProductData(): void {

    if (isDefined(this.tour.floorPlans)) {
      this.floorplanOrdered = true;
    }

    this.userContractProducts.forEach((product: UserContractProductConfig) => {

      if (product.productType === 'FLOORPLAN') {
        this.floorPlanData = product;
      };

      if (product.productType === 'DOLLHOUSE') {
        this.dollhouseData = product;
      };

    });
  }

  public proceedToOrderInfo(product: UserContractProductConfig): void {
    this.productSelectedEvent.emit(product);
  }
}
