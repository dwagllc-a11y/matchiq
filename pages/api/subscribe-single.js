import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const toolNames = {
  profile: 'MatchIQ — Profile Builder',
  coach: 'MatchIQ — Conversation Coach',
  date: 'MatchIQ — Date Planner',
  redflags: 'MatchIQ — Red Flag Detector',
  debrief: 'MatchIQ — Date Debrief',
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { tool } = req.body
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const name = toolNames[tool] || 'MatchIQ — Single Tool'

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name, description: 'One use of this MatchIQ tool.' },
          unit_amount: 499,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${appUrl}/${tool}?paid=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
