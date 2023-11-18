
export interface IEncryptedFastSpringOrderDataDescription {
  fsSecureKey: string;
  fsSecurePayload: string;
}

export interface IEncryptFastSpringOrderDataIntentDescription {
  txIds: string[];
  referralCode: string;
}
