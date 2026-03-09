import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { plan } = req.body
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  try {
    if (plan === 'lifetime') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'MatchIQ — Lifetime Access', description: 'All 5 tools, unlimited forever, all future tools included.' },
            unit_amount: 29999,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${appUrl}/success?plan=lifetime&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/pricing`,
      })
      return res.status(200).json({ url: session.url })
    } else {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: { name: 'MatchIQ Pro', description: 'Unlimited access to all 5 AI dating tools.' },
            unit_amount: 2999,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: `${appUrl}/success?plan=monthly&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/pricing`,
      })
      return res.status(200).json({ url: session.url })
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
// single use handled by individual tool checkout
