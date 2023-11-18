export enum ApiCurrency {
  EUR = 'EUR',
  USD = 'USD'
}

export type CurrencyType = keyof typeof ApiCurrency;
