import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const C = {
  bg: '#0a0612', surface: '#120d1e', border: 'rgba(255,255,255,0.08)',
  purple: '#a855f7', pink: '#ec4899', grad: 'linear-gradient(135deg, #a855f7, #ec4899)',
  text: '#f0eaf8', muted: '#6b7280', dark: '#1a1028',
}

const tools = [
  { icon: '📸', label: 'Profile Builder', slug: 'profile', desc: 'AI rewrites your bio, ranks your photos, optimizes every prompt', color: '#a855f7' },
  { icon: '💬', label: 'Conversation Coach', slug: 'coach', desc: 'Paste any match or dead conversation. Get exact lines to send', color: '#ec4899' },
  { icon: '📅', label: 'Date Planner', slug: 'date', desc: 'Tell us her interests. Get the perfect first date, tailored to her', color: '#f59e0b' },
  { icon: '🚩', label: 'Red Flag Detector', slug: 'redflags', desc: 'Paste her texts. AI reads between the lines so you don\'t have to', color: '#ef4444' },
  { icon: '🔍', label: 'Date Debrief', slug: 'debrief', desc: 'Post-date analysis. What went right, what went wrong, what to do next', color: '#10b981' },
]

const stats = [
  { n: '50K+', l: 'Matches Generated' },
  { n: '4.8★', l: 'Average Rating' },
  { n: '3x', l: 'More Responses' },
  { n: '89%', l: 'Get a Date Within 2 Weeks' },
]

const testimonials = [
  { text: "I went from 2 matches a week to 15. The profile rewrite alone is worth it.", name: "Jake, 28", city: "New York" },
  { text: "The conversation coach saved me from so many dead convos. I actually know what to say now.", name: "Marcus, 31", city: "Chicago" },
  { text: "Red flag detector is scary accurate. Dodged a bullet on the first date because of it.", name: "Tyler, 26", city: "LA" },
]

function Nav({ isMember }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,6,18,0.95)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/" style={{ fontWeight: '900', fontSize: '22px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MatchIQ</Link>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {tools.slice(0, 3).map(t => (
          <Link key={t.slug} href={`/${t.slug}`} style={{ fontSize: '13px', fontWeight: '600', color: C.muted, padding: '4px 10px', display: 'none' }}>{t.label}</Link>
        ))}
        <Link href="/pricing" style={{ fontSize: '13px', fontWeight: '700', color: C.muted, padding: '4px 10px' }}>Pricing</Link>
        {isMember
          ? <Link href="/dashboard" style={{ background: C.grad, color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '800' }}>Dashboard →</Link>
          : <Link href="/pricing" style={{ background: C.grad, color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '800' }}>Get Started →</Link>
        }
      </div>
    </nav>
  )
}

export default function Home() {
  const [isMember, setIsMember] = useState(false)
  useEffect(() => {
    try { const m = JSON.parse(localStorage.getItem('miq_member') || '{}'); if (m.active) setIsMember(true) } catch {}
  }, [])

  return (
    <>
      <Head>
        <title>MatchIQ — Your AI Dating Assistant</title>
        <meta name="description" content="AI-powered dating tools. Profile builder, conversation coach, date planner, red flag detector and more. Get more matches, better dates." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg }}>
        <Nav isMember={isMember} />

        {/* Hero */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', fontWeight: '700', color: C.purple, marginBottom: '24px' }}>
            🔥 The AI Wingman You Actually Need
          </div>
          <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: '900', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Stop Guessing.<br />
            <span style={{ background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Start Dating Smarter.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px,2.5vw,20px)', color: C.muted, maxWidth: '580px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            5 AI tools that fix your profile, coach your conversations, plan your dates, detect red flags, and debrief what went wrong.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing" style={{ background: C.grad, color: '#fff', padding: '14px 32px', borderRadius: '10px', fontWeight: '800', fontSize: '16px' }}>
              Start Free — No Card Needed →
            </Link>
            <Link href="/profile" style={{ background: 'rgba(255,255,255,0.06)', color: C.text, padding: '14px 32px', borderRadius: '10px', fontWeight: '700', fontSize: '16px', border: `1px solid ${C.border}` }}>
              Try Profile Builder
            </Link>
          </div>
          <div style={{ fontSize: '12px', color: C.muted, marginTop: '14px' }}>
            Free tier · Pro from $29.99/mo · Lifetime $99 one-time
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
            {stats.map((s, i) => (
              <div key={s.l} style={{ padding: '20px 16px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontSize: '26px', fontWeight: '900', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.n}</div>
                <div style={{ fontSize: '12px', color: C.muted, marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools grid */}
        <div style={{ maxWidth: '900px', margin: '0 auto 80px', padding: '0 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,40px)', fontWeight: '900', marginBottom: '12px', letterSpacing: '-0.02em' }}>5 Tools. One Subscription.</h2>
          <p style={{ textAlign: 'center', color: C.muted, marginBottom: '40px', fontSize: '16px' }}>Everything you need from first swipe to first date.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {tools.map(t => (
              <Link key={t.slug} href={`/${t.slug}`} style={{ display: 'block', background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '24px', transition: 'border-color 0.2s', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: `linear-gradient(90deg, ${t.color}, transparent)` }} />
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{t.icon}</div>
                <div style={{ fontSize: '17px', fontWeight: '800', color: C.text, marginBottom: '8px' }}>{t.label}</div>
                <div style={{ fontSize: '14px', color: C.muted, lineHeight: 1.6 }}>{t.desc}</div>
                <div style={{ marginTop: '16px', fontSize: '13px', fontWeight: '700', color: t.color }}>Try it free →</div>
              </Link>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '60px 24px', marginBottom: '80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: '900', marginBottom: '48px', letterSpacing: '-0.02em' }}>How It Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
              {[
                { n: '1', t: 'Pick a Tool', d: 'Start with the Profile Builder or paste a conversation you need help with' },
                { n: '2', t: 'Add Your Info', d: 'Answer a few quick questions. Takes under 2 minutes.' },
                { n: '3', t: 'Get AI Output', d: 'Instant, personalized results you can copy and use right now' },
              ].map(s => (
                <div key={s.n} style={{ textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: C.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '20px', fontWeight: '900', color: '#fff' }}>{s.n}</div>
                  <div style={{ fontSize: '17px', fontWeight: '800', marginBottom: '8px' }}>{s.t}</div>
                  <div style={{ fontSize: '14px', color: C.muted, lineHeight: 1.6 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ maxWidth: '900px', margin: '0 auto 80px', padding: '0 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,4vw,40px)', fontWeight: '900', marginBottom: '40px', letterSpacing: '-0.02em' }}>Guys Are Getting Dates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '16px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '24px' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontSize: '15px', color: C.text, lineHeight: 1.7, marginBottom: '16px' }}>"{t.text}"</p>
                <div style={{ fontSize: '13px', fontWeight: '700', color: C.purple }}>{t.name} · {t.city}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ maxWidth: '600px', margin: '0 auto 80px', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.12))', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '20px', padding: '48px 32px' }}>
            <h2 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: '900', marginBottom: '12px', letterSpacing: '-0.02em' }}>Your Next Match is Waiting</h2>
            <p style={{ color: C.muted, marginBottom: '28px', fontSize: '15px', lineHeight: 1.7 }}>Start free. Upgrade when you're ready. Cancel anytime.</p>
            <Link href="/pricing" style={{ display: 'inline-block', background: C.grad, color: '#fff', padding: '14px 36px', borderRadius: '10px', fontWeight: '800', fontSize: '16px' }}>
              Get Started Free →
            </Link>
            <div style={{ fontSize: '12px', color: C.muted, marginTop: '14px' }}>Pro $29.99/mo · Lifetime $299.99 · No BS</div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ fontWeight: '900', fontSize: '18px', background: C.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>MatchIQ</div>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            {tools.map(t => <Link key={t.slug} href={`/${t.slug}`} style={{ fontSize: '13px', color: C.muted }}>{t.label}</Link>)}
            <Link href="/pricing" style={{ fontSize: '13px', color: C.muted }}>Pricing</Link>
          </div>
          <div style={{ fontSize: '12px', color: C.muted }}>© 2025 MatchIQ · D.W.A.G. LLC · For entertainment purposes</div>
        </footer>
      </div>
    </>
  )
}
