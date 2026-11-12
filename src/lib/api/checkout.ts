import { CHECKOUT_COUNTRIES, CHECKOUT_CURRENCIES } from '@/constants/checkoutOptions'
import type { CheckoutData } from '@/types/checkout.types'

/** Plan being purchased. */
const PLAN_NAME = 'HireLoop Pro Plan'
const PLAN_DESCRIPTION = 'Access to all features'

/** Conversion rate used to show the price in BDT. */
const USD_TO_BDT_RATE = 127.6665

/** Stripe price for the Pro plan. */
const STRIPE_PRICE_ID = 'price_1Ub1rkQpbS2GeedA7EfKHKXz'

/** Used when Stripe cannot be reached, so the page still renders. */
const FALLBACK_USD_AMOUNT = 20

/**
 * Reads the live price from Stripe and derives the currency options from it.
 *
 * Server-only: the secret key never reaches the browser.
 */
export const getCheckoutData = async (): Promise<CheckoutData> => {
  const usdAmount = await getUsdAmount()

  const currencies = CHECKOUT_CURRENCIES.map((currency) =>
    currency.code === 'USD'
      ? { ...currency, price: formatUsd(usdAmount) }
      : {
          ...currency,
          price: `BDT ${formatBdt(usdAmount * USD_TO_BDT_RATE)}`,
        }
  )

  return {
    planName: PLAN_NAME,
    planDescription: PLAN_DESCRIPTION,
    exchangeRate: `1 USD = ${USD_TO_BDT_RATE} BDT`,
    currencies,
    countries: CHECKOUT_COUNTRIES,
  }
}

/**
 * Amount in USD, read from Stripe with a static fallback on failure.
 *
 * `stripe` is imported dynamically because its module throws when the secret
 * key is missing, and that must not take the whole page down.
 */
const getUsdAmount = async (): Promise<number> => {
  try {
    const { stripe } = await import('@/lib/stripe')

    const price = await stripe.prices.retrieve(STRIPE_PRICE_ID)

    return price.unit_amount ? price.unit_amount / 100 : FALLBACK_USD_AMOUNT
  } catch {
    return FALLBACK_USD_AMOUNT
  }
}

const formatUsd = (amount: number) => `$${amount.toFixed(2)}`

const formatBdt = (amount: number) =>
  amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
