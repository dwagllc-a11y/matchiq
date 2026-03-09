import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

const C = {
  bg: '#0a0612', surface: '#120d1e', border: 'rgba(255,255,255,0.08)',
  purple: '#a855f7', pink: '#ec4899', grad: 'linear-gradient(135deg, #a855f7, #ec4899)',
  text: '#f0eaf8', muted: '#6b7280', dark: '#1a1028',
}

const features = [
  'AI Profile Builder (bio + prompts + photo order)',
  'Conversation Coach (exact lines to send)',
  'Date Planner (tailored to her interests)',
  'Red Flag Detector (honest analysis)',
  'Date Debrief (what to do next)',
  'Unlimited uses on all tools',
  'New tools as they launch',
]

export default function Pricing() {
  const [loading, setLoading] = useState(null)

  const handleCheckout = async (plan) => {
    setLoading(plan)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Something went wrong. Try again.')
    }
    setLoading(null)
  }

  return (
    <>
      <Head>
        <title>Pricing — MatchIQ</title>
        <meta name="description" content="MatchIQ Pro from $29.99/month. Unlimited access to all 5 AI dating tools. Or grab the lifetime deal for $299.99." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif', color: C.text }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,6,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '20px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MatchIQ</Link>
          <Link href="/" style={{ fontSize: '13px', color: C.muted }}>← Back</Link>
        </nav>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px 80px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: '900', marginBottom: '12px', letterSpacing: '-0.03em' }}>Simple Pricing</h1>
          <p style={{ color: C.muted, fontSize: '16px', marginBottom: '52px' }}>Try free. Upgrade when you're ready. No BS.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '48px' }}>

            {/* Free */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '32px', textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: C.muted, letterSpacing: '0.08em', marginBottom: '12px' }}>FREE</div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '4px' }}>$4.99</div>
              <div style={{ fontSize: '13px', color: C.muted, marginBottom: '24px' }}>forever</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {['1 use per tool', 'All 5 tools accessible', 'Pay once per tool'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px', color: C.muted }}>
                    <span style={{ color: '#10b981' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <Link href="/profile" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`, color: C.text, padding: '12px', borderRadius: '8px', fontWeight: '700', fontSize: '14px' }}>
                Start Free
              </Link>
            </div>

            {/* Pro */}
            <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.12))', border: '1px solid rgba(168,85,247,0.4)', borderRadius: '16px', padding: '32px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: C.grad, color: '#fff', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px' }}>MOST POPULAR</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: C.purple, letterSpacing: '0.08em', marginBottom: '12px' }}>PRO</div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '4px' }}>$29.99</div>
              <div style={{ fontSize: '13px', color: C.muted, marginBottom: '24px' }}>per month · cancel anytime</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: C.text }}>
                    <span style={{ color: '#10b981', flexShrink: 0, marginTop: '1px' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleCheckout('monthly')}
                disabled={loading === 'monthly'}
                style={{ width: '100%', background: C.grad, color: '#fff', border: 'none', padding: '13px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}
              >
                {loading === 'monthly' ? 'Loading...' : 'Get Pro Monthly →'}
              </button>
            </div>

            {/* Lifetime */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '32px', textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b', letterSpacing: '0.08em', marginBottom: '12px' }}>LIFETIME</div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '4px' }}>$299.99</div>
              <div style={{ fontSize: '13px', color: C.muted, marginBottom: '24px' }}>one-time · yours forever</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {[...features, 'All future tools included', 'Priority support'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: C.text }}>
                    <span style={{ color: '#f59e0b', flexShrink: 0, marginTop: '1px' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleCheckout('lifetime')}
                disabled={loading === 'lifetime'}
                style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', border: 'none', padding: '13px', borderRadius: '8px', fontWeight: '800', fontSize: '14px' }}
              >
                {loading === 'lifetime' ? 'Loading...' : 'Get Lifetime Access →'}
              </button>
            </div>
          </div>

          <div style={{ fontSize: '13px', color: C.muted }}>
            Payments secured by Stripe · Cancel Pro anytime · Lifetime = pay once, use per use
          </div>
        </div>
      </div>
    </>
  )
}
