import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const C = {
  bg: '#0a0612', surface: '#120d1e', border: 'rgba(255,255,255,0.08)',
  purple: '#a855f7', pink: '#ec4899', grad: 'linear-gradient(135deg, #a855f7, #ec4899)',
  text: '#f0eaf8', muted: '#6b7280', dark: '#1a1028',
}

export default function ToolPage({ title, description, icon, color, fields, apiEndpoint, outputLabel, metaTitle, metaDesc, freeLimit = 1 }) {
  const [form, setForm] = useState({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uses, setUses] = useState(0)
  const [isMember, setIsMember] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const m = JSON.parse(localStorage.getItem('miq_member') || '{}')
      if (m.active) setIsMember(true)
      const u = parseInt(localStorage.getItem(`miq_uses_${apiEndpoint}`) || '0')
      setUses(u)
    } catch {}
  }, [])

  const isLocked = !isMember && uses >= freeLimit

  const handleSubmit = async () => {
    if (isLocked) return
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch(`/api/${apiEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.output) {
        setOutput(data.output)
        const newUses = uses + 1
        setUses(newUses)
        localStorage.setItem(`miq_uses_${apiEndpoint}`, newUses)
      } else {
        setError(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    }
    setLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Head>
        <title>{metaTitle || `${title} — MatchIQ`}</title>
        <meta name="description" content={metaDesc || description} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif', color: C.text }}>
        {/* Nav */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,6,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '20px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MatchIQ</Link>
          <Link href="/pricing" style={{ background: C.grad, color: '#fff', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '800' }}>
            {isMember ? '✓ Pro Member' : 'Upgrade to Pro →'}
          </Link>
        </nav>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px 80px' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{icon}</div>
            <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: '900', marginBottom: '8px', letterSpacing: '-0.02em' }}>{title}</h1>
            <p style={{ color: C.muted, fontSize: '15px', lineHeight: 1.6 }}>{description}</p>
            {!isMember && (
              <div style={{ marginTop: '12px', fontSize: '13px', color: C.muted, background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '8px', padding: '8px 12px', display: 'inline-block' }}>
                Free tier: {freeLimit} use{freeLimit > 1 ? 's' : ''} · <Link href="/pricing" style={{ color: C.purple, fontWeight: '700' }}>Upgrade for unlimited →</Link>
              </div>
            )}
          </div>

          {/* Form */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
              {fields.map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: C.text, marginBottom: '6px', letterSpacing: '0.02em' }}>
                    {f.label} {f.required && <span style={{ color: C.purple }}>*</span>}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      placeholder={f.placeholder}
                      value={form[f.name] || ''}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      rows={f.rows || 4}
                      style={{ width: '100%', background: C.dark, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px', color: C.text, fontSize: '14px', resize: 'vertical', outline: 'none' }}
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={form[f.name] || ''}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      style={{ width: '100%', background: C.dark, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px', color: form[f.name] ? C.text : C.muted, fontSize: '14px', outline: 'none' }}
                    >
                      <option value="">{f.placeholder}</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.name] || ''}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      style={{ width: '100%', background: C.dark, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '12px', color: C.text, fontSize: '14px', outline: 'none' }}
                    />
                  )}
                  {f.hint && <div style={{ fontSize: '12px', color: C.muted, marginTop: '4px' }}>{f.hint}</div>}
                </div>
              ))}
            </div>

            {isLocked ? (
              <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔒</div>
                <div style={{ fontWeight: '800', marginBottom: '6px' }}>Free use limit reached</div>
                <div style={{ fontSize: '13px', color: C.muted, marginBottom: '16px' }}>Upgrade to Pro for unlimited access to all 5 tools</div>
                <Link href="/pricing" style={{ display: 'inline-block', background: C.grad, color: '#fff', padding: '10px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}>
                  Upgrade to Pro — $19.99/mo →
                </Link>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: '100%', background: loading ? 'rgba(168,85,247,0.4)' : C.grad, color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: '800', transition: 'opacity 0.2s' }}
              >
                {loading ? '✨ AI is thinking...' : `Generate ${outputLabel || 'Results'} →`}
              </button>
            )}

            {error && (
              <div style={{ marginTop: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#f87171' }}>
                {error}
              </div>
            )}
          </div>

          {/* Output */}
          {output && (
            <div style={{ background: C.surface, border: `1px solid rgba(168,85,247,0.3)`, borderRadius: '16px', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: C.purple, letterSpacing: '0.06em' }}>✨ AI OUTPUT</div>
                <button
                  onClick={handleCopy}
                  style={{ background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(168,85,247,0.1)', border: `1px solid ${copied ? 'rgba(16,185,129,0.3)' : 'rgba(168,85,247,0.2)'}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: '700', color: copied ? '#10b981' : C.purple }}
                >
                  {copied ? '✓ Copied!' : 'Copy All'}
                </button>
              </div>
              <div style={{ fontSize: '14px', color: C.text, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{output}</div>
            </div>
          )}

          {/* Tool links */}
          <div style={{ marginTop: '40px', padding: '20px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: C.muted, letterSpacing: '0.08em', marginBottom: '12px' }}>OTHER TOOLS</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { icon: '📸', label: 'Profile Builder', slug: 'profile' },
                { icon: '💬', label: 'Coach', slug: 'coach' },
                { icon: '📅', label: 'Date Planner', slug: 'date' },
                { icon: '🚩', label: 'Red Flags', slug: 'redflags' },
                { icon: '🔍', label: 'Debrief', slug: 'debrief' },
              ].filter(t => t.slug !== apiEndpoint.replace('generate-', '')).map(t => (
                <Link key={t.slug} href={`/${t.slug}`} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: '600', color: C.muted }}>
                  {t.icon} {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
