/** A currency the user can pay in. */
export interface CheckoutCurrency {
  /** Currency code, e.g. "BDT". */
  code: string
  /** Two-letter country code used to pick the flag icon, e.g. "BD". */
  flag: string
  /** Formatted price in this currency, e.g. "BDT 2,553.33". */
  price: string
}

/** A country or region a card can be billed to. */
export interface CheckoutCountry {
  /** Country code, e.g. "BD". */
  code: string
  /** Two-letter country code used to pick the flag icon, e.g. "BD". */
  flag: string
  /** Name shown in the dropdown, e.g. "Bangladesh". */
  label: string
}

/** Everything the checkout page needs before it can render. */
export interface CheckoutData {
  /** Plan being purchased, e.g. "HireLoop Pro Plan". */
  planName: string
  /** One-line description of the plan. */
  planDescription: string
  /** Conversion note shown under the currency picker, e.g. "1 USD = 127.6665 BDT". */
  exchangeRate: string
  /** Currencies offered for this plan. */
  currencies: CheckoutCurrency[]
  /** Countries a card can be billed to. */
  countries: CheckoutCountry[]
}
