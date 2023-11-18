
enum TransactionProcessingStateEnum {
  IN_TRANSACTION,
  COMPLETED,
  EXPIRED,
  FAILURE
}

export type TransactionProcessingState = keyof typeof TransactionProcessingStateEnum;
