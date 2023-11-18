import { CurrencyType } from "src/app/domain/enums/common/currency.enum";
import {
  UserContractPriceModifierType,
  UserContractProductType,
  UserContractPurchaseType,
  UserContractState
} from "src/app/domain/enums/user/user.enums";

export interface IUserChangePlayerStylesIntentDescription {
  logoUrl?: string;
  hotspotLogo?: string;
  tripodCoverLogo?: string;
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
}

export interface IUserContractResponseDescription {
  type: 'QUERY_OK' | '';
  details: IUserContractDescription;
}

export interface IUserPlayerStylesResponseDescription {
  type: 'HTTP_OK' | '';
  details: IUserPlayerStylesDescription;
}

export interface IUserPlayerUploadedLogoResponseDescription {
  type: 'HTTP_OK' | '';
  details: string;
}

export interface IUserContractDescription {
  id: string;
  userID: string;
  createdBy: string;
  invoiceValueThreshold: number;
  state: UserContractState;
  currency: CurrencyType;
  paymentSpec: IUserContractPaymentSpecDescription;
  productConfigs: IUserContractProductConfigDescription[];
}

export interface IUserPlayerStylesDescription {
  logoUrl: string;
  hotspotLogo: string;
  tripodCoverLogo: string;
  mainColor: {
    r: number;
    g: number;
    b: number;
  };
  secondaryColor: {
    r: number;
    g: number;
    b: number;
  };
}

export interface IUserContractProductConfigDescription {
  productType: UserContractProductType;
  purchaseType: UserContractPurchaseType;
  paymentSystem: 'FASTSPRING' | 'INTERNAL';
  quantifier: 'PER_OFFICE' | 'PLAIN';
  price: number;
  priceModifiers: IUserContractPriceModifierDescription[];
  fsSecurePayload: string;
  fsSecureKey: string;
  packSize: number;
  availableCredits: number;
}

export interface IUserContractPaymentSpecDescription {
  accountID: string;
  email: string;
  productPath: string;
  status: 'ACTIVE' | 'CANCELED';
}

export interface IUserContractPriceModifierDescription {
  type: UserContractPriceModifierType[];
}
