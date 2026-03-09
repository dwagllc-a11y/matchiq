export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { app, age, bio, prompts, vibe, goals } = req.body
  if (!bio || !app) return res.status(400).json({ error: 'Missing required fields' })

  const prompt = `You are an expert dating profile writer. Rewrite this man's dating profile to maximize matches.

App: ${app}
Age: ${age}
Current bio: ${bio}
Current prompts: ${prompts || 'None provided'}
Desired vibe: ${vibe || 'Authentic and confident'}
Looking for: ${goals || 'Not specified'}

Write a complete optimized profile including:
1. NEW BIO (2-3 punchy sentences, specific details, ends with a hook or question)
2. 3 OPTIMIZED PROMPTS with answers (specific to ${app} style)
3. PHOTO ORDER ADVICE (what types of photos to put first, second, third)
4. ONE LINE OPENER she can use on him (so she feels compelled to message first)

Rules: Be specific not generic. No clichés like "love to laugh" or "looking for my partner in crime". Sound like a real person. Make him sound attractive without trying too hard.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] })
    })
    const data = await response.json()
    const output = data.content?.[0]?.text
    if (!output) return res.status(500).json({ error: 'AI failed to generate. Try again.' })
    return res.status(200).json({ output })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
