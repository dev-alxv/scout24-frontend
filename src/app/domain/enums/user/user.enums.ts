
enum UserContractStateEnum {
  ACTIVE,
  REQUIRES_ACTIVATION,
  INACTIVE,
  DELETED,
  CANCELED,
  UPGRADED
}

enum UserContractProductTypeEnum {
  VIRTUAL_TOUR,
  FLOORPLAN,
  DOLLHOUSE,
  BASE_FEE,
  MV_CAMERA,
  RICOH_V_CAMERA,
  RICOH_SC2B_CAMERA
}

enum UserContractPurchaseTypeEnum {
  ON_THE_GO,
  SUBSCRIPTION,
  CREDIT_PACK,
  USED_CREDIT,
  DIRECT_PURCHASE
}

enum UserContractPriceModifierTypeEnum {
  _360QM_UP,
  _720QM_UP,
  _1080QM_UP,
  _1440QM_UP,
  _1800QM_UP,
  _2160QM_UP,
  _2520QM_UP,
  _2880QM_UP,
  _3240QM_UP,
  _3600QM_UP,
  _3960QM_UP,
  _4320QM_UP,
  _4680QM_UP,
  _5040QM_UP
}

export type UserContractState = keyof typeof UserContractStateEnum;
export type UserContractProductType = keyof typeof UserContractProductTypeEnum;
export type UserContractPurchaseType = keyof typeof UserContractPurchaseTypeEnum;
export type UserContractPriceModifierType = keyof typeof UserContractPriceModifierTypeEnum;
