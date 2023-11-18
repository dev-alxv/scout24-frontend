import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Tour } from 'src/app/domain/models/Tour/tour.model';
import { ModalTemplateInputData } from 'src/app/domain/interfaces/modal/modal.interfaces';
import { UserService } from 'src/app/presentation/+store/+services/user/user.service';
import { UserStore } from 'src/app/presentation/+store/global/user/user.store';
import { UserContract, UserContractProductConfig } from 'src/app/domain/models/User/user.model';
import { doAsyncTask, isDefined } from 'src/app/utils/utils';
import { IUserProductOrderIntent } from 'src/app/domain/interfaces/user/user.interfaces';
import { UiStateStore } from 'src/app/presentation/+store/global/ui-state/ui-state.store';
import { uiOngoingActions, UiState } from 'src/app/presentation/+store/global/ui-state/ui.state';
import { TranslateService } from '@ngx-translate/core';


export declare const fastspring: any;

@UntilDestroy()

@Component({
  selector: 'scout24-payment-agbs-dialog',
  templateUrl: './payment-agbs-dialog.component.html',
  styleUrls: ['./payment-agbs-dialog.component.scss']
})
export class PaymentAgbsDialogComponent implements OnInit, AfterViewInit {

  public userContract: UserContract;
  public userContractProducts: UserContractProductConfig[];
  public floorPlanData: UserContractProductConfig;
  public dollhouseData: UserContractProductConfig;
  public vatTax: number;
  public bruttoSum: number;
  public floorplanOrdered = false;
  public initDone = false;
  public orderInProgress = false;

  @Input() public tour: Tour;
  @Input() public productToOrder: UserContractProductConfig;

  @Output() public makeOrderEvent: EventEmitter<any> = new EventEmitter();

  public agbLink = 'https://www.immoviewer.de/agb';
  public dataProtectionLink = 'https://www.immoviewer.de/datenschutz';

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private data: ModalTemplateInputData,
    private userService: UserService,
    private userStore: UserStore,
    private uiStateStore: UiStateStore
  ) {
    this.tour = this.data.inputs.tour;
    this.productToOrder = this.data.inputs.productToOrder;
    this.userContract = this.userStore.state.userContract || {} as UserContract;
    this.userContractProducts = this.userStore.state.userContract?.productConfigs || [];
    this.uiStateStore.stateStream$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (state: UiState) => this.parseUiState(state.uiOngoingActions)
      });
  }

  public ngOnInit(): void {
    this.setUserProductData();
    this.calcVATPercentage();
  }

  public ngAfterViewInit(): void {
    doAsyncTask(500)
      .subscribe({
        complete: () => this.initDone = true
      });
  }

  public calcDollHouseSum(sum1: any, sum2: any): number {
    const finalSum: number = Number(sum1) + Number(sum2);
    return finalSum;
  }

  public calcVATPercentage(): void {
    if (this.productToOrder.productType === 'FLOORPLAN') {
      const vat: number = Number(this.productToOrder.priceData.price) * (19 / 100);
      this.vatTax = vat;
      this.calcBruttoSum(vat, Number(this.productToOrder.priceData.price));
    }

    if (this.productToOrder.productType === 'DOLLHOUSE') {
      const vat: number = (Number(this.productToOrder.priceData.price) + Number(this.floorPlanData.priceData.price)) * (19 / 100);
      this.vatTax = vat;
      this.calcBruttoSum(vat, (Number(this.productToOrder.priceData.price) + Number(this.floorPlanData.priceData.price)));
    }
  }

  public calcBruttoSum(vatTax: number, productPrice: number): void {
    const brutto: number = productPrice + vatTax;
    this.bruttoSum = Number(brutto.toPrecision(4));
  }

  public makeOrder(product: UserContractProductConfig): void {
    this.orderInProgress = true;

    const productOrderIntentData: IUserProductOrderIntent = <IUserProductOrderIntent>{
      product: product.productType,
      purchaseType: product.purchaseType,
      resourceId: this.tour.ids.main,
      userEmail: this.tour.author.email
    };

    this.userService.makeProductOrder(productOrderIntentData);
  }

  private parseUiState(state?: uiOngoingActions): void {
    if (state?.apiIntent?.orderOrigin?.creatingOrder) {
      this.orderInProgress = state.apiIntent.orderOrigin.creatingOrder;
    }

    if (!state?.apiIntent?.orderOrigin?.creatingOrder && this.initDone) {
      this.makeOrderEvent.emit('');
      this.fastSpringCheckout();
    }
  }

  private fastSpringCheckout(): void {

    if (this.uiStateStore.state.userSettings?.currentDisplayLanguage !== this.uiStateStore.state.userSettings?.defaultDisplayLanguage) {
      fastspring.builder.language(this.uiStateStore.state.userSettings?.currentDisplayLanguage?.toUpperCase());
    }

    fastspring.builder.checkout();
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
}
