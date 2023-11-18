import { TransactionProcessingState } from "src/app/domain/enums/transaction/transaction.enums";
import { UserContractProductType, UserContractPurchaseType } from "src/app/domain/enums/user/user.enums";

export interface ICreateTransactionIntentDescription {
  productType: UserContractProductType;
  purchaseType: UserContractPurchaseType;
  relatedResourceID: string;
}

export interface ITransactionDescription {
  id: string;
  userID: string;
  contractID: string;
  relatedResourceID: string;
  invoiceID: string;
  packTransactionID: string;
  productType: UserContractProductType;
  purchaseType: UserContractPurchaseType;
  relatedResource: any;
  consumedCredits: number;
  price: number;
  packSize: number;
  packExhausted: boolean;
  expiresAt: string;
  processingState: TransactionProcessingState;
  additionalData: ITransactionAdditionalDataDescription;
}

export interface ITransactionAdditionalDataDescription {
  sqArea: number;
  shipHardware: boolean;
  shippingAddress: {
    city: string,
    state: string,
    zipCode: string,
    addressLine1: string,
    addressLine2: string,
    companyName: string,
    firstName: string,
    lastName: string,
  };
  phone: string;
}
