export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { city, interests, vibe, budget, stage } = req.body
  if (!city || !interests) return res.status(400).json({ error: 'Missing required fields' })

  const prompt = `You are a dating expert who knows how to plan memorable first dates.

City: ${city}
Her interests: ${interests}
Vibe wanted: ${vibe || 'Casual and fun'}
Budget: ${budget || '$30-60'}
Stage: ${stage || 'First date'}

Create a complete date plan:
1. THE PLAN (specific venue type + activity, timeline from start to finish)
2. WHY IT WORKS for her specifically (reference her interests)
3. 3 CONVERSATION STARTERS tailored to her
4. HOW TO END THE DATE (exactly what to say to set up the second date)
5. BACKUP PLAN if something falls through

Be specific. Reference real types of venues. Give timing (e.g. "Meet at 7pm, grab drinks for an hour, walk to..."). Make it feel thoughtful not generic.`

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
