import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const C = { bg: '#0a0612', grad: 'linear-gradient(135deg, #a855f7, #ec4899)', text: '#f0eaf8', muted: '#6b7280', surface: '#120d1e', border: 'rgba(255,255,255,0.08)' }

export default function Success() {
  const router = useRouter()
  const { plan } = router.query

  useEffect(() => {
    try {
      localStorage.setItem('miq_member', JSON.stringify({ active: true, plan: plan || 'pro', since: Date.now() }))
    } catch {}
  }, [plan])

  const tools = [
    { icon: '📸', label: 'Profile Builder', slug: 'profile' },
    { icon: '💬', label: 'Conversation Coach', slug: 'coach' },
    { icon: '📅', label: 'Date Planner', slug: 'date' },
    { icon: '🚩', label: 'Red Flag Detector', slug: 'redflags' },
    { icon: '🔍', label: 'Date Debrief', slug: 'debrief' },
  ]

  return (
    <>
      <Head>
        <title>Welcome to MatchIQ Pro</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: 'Inter, sans-serif', color: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '540px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            You're{' '}
            <span style={{ background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {plan === 'lifetime' ? 'in for life' : 'now Pro'}
            </span>
          </h1>
          <p style={{ color: C.muted, marginBottom: '36px', fontSize: '16px', lineHeight: 1.6 }}>
            All 5 tools unlocked. Unlimited uses. Go get some dates.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {tools.map(t => (
              <Link key={t.slug} href={`/${t.slug}`} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '22px' }}>{t.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '700' }}>{t.label}</span>
              </Link>
            ))}
          </div>
          <Link href="/profile" style={{ display: 'inline-block', background: C.grad, color: '#fff', padding: '14px 32px', borderRadius: '10px', fontWeight: '800', fontSize: '15px' }}>
            Start with Profile Builder →
          </Link>
        </div>
      </div>
    </>
  )
}
