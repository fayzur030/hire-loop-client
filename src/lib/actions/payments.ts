const BASE_URL = process.env.NEXT_PUBLIC_API_URL
export const checkoutVerify = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  })
  return res.json()
}
