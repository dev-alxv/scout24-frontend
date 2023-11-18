import { UserContractPriceModifierType, UserContractProductType, UserContractPurchaseType } from "../../enums/user/user.enums";

export interface IUserProductOrderIntent {
  product: UserContractProductType;
  purchaseType: UserContractPurchaseType;
  resourceId: string;
  userEmail: string;
}

export interface IUserChangePlayerStylesIntent {
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

export interface IUploadTourPlayerLogoImagesIntent {
  company: File;
  tripodCover: File;
}

export interface IUserContractIDs {
  readonly main: string;
  readonly user: string;
  readonly createdBy: string;
}

export interface IUserContractPaymentSpecs {
  accountId: string;
  email: string;
  productPath: string;
  status: 'ACTIVE' | 'CANCELED';
}

export interface IProductPriceData {
  price: string;
  priceModifiers: IProductPriceModifier[];
  paymentSystem: 'FASTSPRING' | 'INTERNAL';
}

export interface IProductPriceModifier {
  type: UserContractPriceModifierType[];
}

export interface IProductFastSpringData {
  fsSecurePayload: string;
  fsSecureKey: string;
}

export interface IProductUserData {
  packSize: number;
  availableCredits: number;
}
