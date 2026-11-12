import { getCheckoutData } from '@/lib/api/checkout'

import { CheckoutForm } from './_components/CheckoutForm'

/**
 * Checkout page.
 *
 * This is an async Server Component: the plan data is read on the server so
 * the Stripe secret key never reaches the browser. The interactive parts
 * (currency and country pickers) live in the `CheckoutForm` client island.
 */
export default async function CheckOutPage() {
  const {
    planName,
    planDescription,
    exchangeRate,
    currencies,
    countries,
  } = await getCheckoutData()

  return (
    <CheckoutForm
      planName={planName}
      planDescription={planDescription}
      exchangeRate={exchangeRate}
      currencies={currencies}
      countries={countries}
    />
  )
}
