import { isDefined } from "src/app/utils/utils";
import { CurrencyType } from "../../enums/common/currency.enum";
import { UserContractProductType, UserContractPurchaseType, UserContractState } from "../../enums/user/user.enums";
import {
  IUserContractDescription,
  IUserContractPriceModifierDescription,
  IUserContractProductConfigDescription
} from "../../interfaces/api/descriptions/user/description";
import {
  IProductFastSpringData,
  IProductPriceData,
  IProductPriceModifier,
  IProductUserData,
  IUserContractIDs,
  IUserContractPaymentSpecs
} from "../../interfaces/user/user.interfaces";

export class User {

  public id: string;
  public email: string;
  public createdData: string;

  constructor() {

  }
}

export class UserContract {

  public ids: IUserContractIDs;
  public invoiceValueThreshold: number;
  public state: UserContractState;
  public currency: CurrencyType;
  public paymentSpec: IUserContractPaymentSpecs;
  public productConfigs: UserContractProductConfig[];

  constructor(userContractDescription: IUserContractDescription) {

    // Set IDs
    this.ids = <IUserContractIDs>{
      main: userContractDescription.id,
      user: userContractDescription.userID,
      createdBy: userContractDescription.createdBy
    };

    // Set invoice Value Threshold
    this.invoiceValueThreshold = userContractDescription.invoiceValueThreshold;

    // Set state
    this.state = userContractDescription.state;

    // Set currency type
    this.currency = isDefined(userContractDescription.currency) ? userContractDescription.currency : 'EUR';

    // Set payment spec
    if (isDefined(userContractDescription.paymentSpec)) {
      this.paymentSpec = <IUserContractPaymentSpecs>{
        accountId: userContractDescription.paymentSpec.accountID,
        email: userContractDescription.paymentSpec.email,
        productPath: userContractDescription.paymentSpec.productPath,
        status: userContractDescription.paymentSpec.status
      };
    }

    // Set product configs
    if (isDefined(userContractDescription.productConfigs)) {
      this.productConfigs = userContractDescription.productConfigs
        .map((description: IUserContractProductConfigDescription) => new UserContractProductConfig(description));
    }
  }
}

export class UserContractProductConfig {

  public productType: UserContractProductType;
  public purchaseType: UserContractPurchaseType;
  public priceData: IProductPriceData;
  public quantifier: 'PER_OFFICE' | 'PLAIN';
  public fastSpringData: IProductFastSpringData;
  public userData: IProductUserData;

  constructor(userContractProductConfigDescription: IUserContractProductConfigDescription) {

    // Set product type
    this.productType = userContractProductConfigDescription.productType;

    // Set purchase type
    this.purchaseType = userContractProductConfigDescription.purchaseType;

    // Set price data
    let productPriceModifierList: IProductPriceModifier[] = [];

    if (isDefined(userContractProductConfigDescription.priceModifiers)) {
      productPriceModifierList = userContractProductConfigDescription.priceModifiers
        .map((description: IUserContractPriceModifierDescription) => <IProductPriceModifier>{ type: description.type });
    }

    this.priceData = <IProductPriceData>{
      price: userContractProductConfigDescription.price.toFixed(2),
      paymentSystem: userContractProductConfigDescription.paymentSystem,
      priceModifiers: productPriceModifierList
    };

    // Set quantifier
    this.quantifier = userContractProductConfigDescription.quantifier;

    // Set FastSpring data
    this.fastSpringData = <IProductFastSpringData>{
      fsSecurePayload: userContractProductConfigDescription.fsSecurePayload,
      fsSecureKey: userContractProductConfigDescription.fsSecureKey
    }

    // Set user data
    this.userData = <IProductUserData>{
      packSize: userContractProductConfigDescription.packSize,
      availableCredits: userContractProductConfigDescription.availableCredits
    }
  }
}

export interface IUserPlayerStyles {
  mainColor?: {
    r: number;
    g: number;
    b: number;
  };
  secondaryColor?: {
    r: number;
    g: number;
    b: number;
  };
  logoUrl?: string;
  hotspotLogo?: string;
  tripodCoverLogo?: string;
}

export interface IUserPlayerPreviewData {
  logoURL: {
    company: string;
    tripod: string;
  }
}
