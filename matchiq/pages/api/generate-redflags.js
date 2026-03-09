export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { content, context, concern } = req.body
  if (!content) return res.status(400).json({ error: 'Missing required fields' })

  const prompt = `You are a brutally honest dating coach who tells men what they need to hear, not what they want to hear.

Content to analyze: ${content}
How long they've been talking: ${context || 'Unknown'}
His gut feeling: ${concern || 'None specified'}

Analyze this and give:
1. RED FLAGS (list each one, explain what it signals, rate severity: Low/Medium/High)
2. GREEN FLAGS (what looks promising if anything)
3. WHAT'S REALLY GOING ON (your honest read of the situation)
4. WHAT TO DO NEXT (specific action — not vague advice)
5. VERDICT: Proceed / Proceed with caution / Walk away

Be direct and honest. Don't sugarcoat. If there are no red flags, say so. If he should walk away, say so clearly.`

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
