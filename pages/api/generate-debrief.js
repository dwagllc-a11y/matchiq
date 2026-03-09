export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { howItWent, whatHappened, signals, goal } = req.body
  if (!howItWent || !whatHappened) return res.status(400).json({ error: 'Missing required fields' })

  const prompt = `You are a dating coach doing a post-date debrief. Be honest, specific, and actionable.

How it went: ${howItWent}
What happened: ${whatHappened}
Signals she gave: ${signals || 'Not specified'}
His goal: ${goal || 'Second date'}

Give him:
1. HONEST ASSESSMENT (how it actually went based on what he described)
2. WHAT WORKED (specific things he did right)
3. WHAT MISSED (specific things to improve — be direct)
4. HOW SHE'S FEELING RIGHT NOW (your read)
5. EXACTLY WHAT TO TEXT HER (copy-paste ready message, when to send it)
6. SECOND DATE MOVE (if applicable — specific idea based on the date)

Don't be vague. Give him the text word for word. Tell him what time to send it.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 800, messages: [{ role: 'user', content: prompt }] })
    })
    const data = await response.json()
    const output = data.content?.[0]?.text
    if (!output) return res.status(500).json({ error: 'AI failed to generate. Try again.' })
    return res.status(200).json({ output })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
