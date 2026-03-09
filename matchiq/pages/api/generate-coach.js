export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { situation, profile, yourStyle, context } = req.body
  if (!situation || !profile) return res.status(400).json({ error: 'Missing required fields' })

  const prompt = `You are an elite dating coach — direct, practical, no fluff.

Situation: ${situation}
Her profile/conversation: ${profile}
His style: ${yourStyle || 'Natural and genuine'}
Extra context: ${context || 'None'}

Give him:
1. 3 SPECIFIC LINES he can send right now (copy-paste ready, no placeholders)
2. WHY these lines work (1 sentence each)
3. WHAT TO DO if she doesn't respond within 48 hours
4. ONE THING to avoid saying

Rules: Be specific to her actual profile/messages. Don't be generic. Sound like a real person not a pickup artist. Lines should feel natural, not scripted.`

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
