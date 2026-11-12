import type {
  CheckoutCountry,
  CheckoutCurrency,
} from '@/types/checkout.types'

/** Currencies offered at checkout. */
export const CHECKOUT_CURRENCIES: CheckoutCurrency[] = [
  { code: 'BDT', flag: 'BD', price: 'BDT 2,553.33' },
  { code: 'USD', flag: 'US', price: '$20.00' },
]

/** Countries a card can be billed to. */
export const CHECKOUT_COUNTRIES: CheckoutCountry[] = [
  { code: 'BD', flag: 'BD', label: 'Bangladesh' },
  { code: 'US', flag: 'US', label: 'United States' },
  { code: 'GB', flag: 'GB', label: 'United Kingdom' },
  { code: 'CA', flag: 'CA', label: 'Canada' },
]
