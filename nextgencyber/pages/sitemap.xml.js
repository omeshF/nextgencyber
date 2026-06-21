import sql from '../lib/db'

const SITE_URL = 'https://www.nextgencyber.co.uk'

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `      <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>`
}

function generateSiteMap(articles) {
  const now = new Date().toISOString()

  const staticEntries = [
    { loc: SITE_URL, lastmod: now, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE_URL}/tools`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/about`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${SITE_URL}/contact`, lastmod: now, changefreq: 'monthly', priority: '0.7' },
  ]

  const articleEntries = articles.map(a => ({
    loc: `${SITE_URL}/article/${a.slug}`,
    lastmod: new Date(a.updated_at || a.created_at || now).toISOString(),
    changefreq: 'monthly',
    priority: '0.9',
  }))

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...articleEntries].map(urlEntry).join('\n')}
    </urlset>`
}

export async function getServerSideProps({ res }) {
  let articles = []
  try {
    articles = await sql`
      SELECT slug, created_at, updated_at FROM articles
      WHERE published = true
      ORDER BY created_at DESC
    `
  } catch (e) {
    articles = []
  }

  const sitemap = generateSiteMap(articles)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function SiteMap() {
  return null
}
