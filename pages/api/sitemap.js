const BASE = 'https://matchiq.ai'
const pages = ['', '/profile', '/coach', '/date', '/redflags', '/debrief', '/pricing']
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400')
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${BASE}${p}</loc><changefreq>${p === '' ? 'daily' : 'weekly'}</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`)
}
