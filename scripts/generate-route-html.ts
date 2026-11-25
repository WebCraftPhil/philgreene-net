import fs from 'node:fs/promises'
import path from 'node:path'
import { applyRouteMeta, routeMeta } from '../server/route-meta'
import { projects } from '../client/src/data/projects'
import { articles } from '../client/src/data/writing'

const siteUrl = 'https://philgreene.net'
const publicDir = path.resolve(process.cwd(), 'dist', 'public')
const indexPath = path.join(publicDir, 'index.html')
const indexHtml = await fs.readFile(indexPath, 'utf-8')

await Promise.all(
  routeMeta.map(async (meta) => {
    const routeDir = path.join(publicDir, meta.path)
    await fs.mkdir(routeDir, { recursive: true })
    await fs.writeFile(path.join(routeDir, 'index.html'), applyRouteMeta(indexHtml, meta))
  })
)

const publishedProjects = projects.filter((p) => p.published !== false)
const publishedArticles = articles.filter((a) => a.published !== false)

const staticPaths = ['/', '/about', '/projects', '/writing', '/now', '/resume', '/contact']
const allUrls = [
  ...staticPaths,
  ...publishedProjects.map((p) => `/projects/${p.slug}`),
  ...publishedArticles.map((a) => `/writing/${a.slug}`),
]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (urlPath) => `  <url>
    <loc>${siteUrl}${urlPath}</loc>
    <changefreq>${urlPath === '/' || urlPath === '/now' ? 'weekly' : 'monthly'}</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>
`

const escapeXml = (str: string) =>
  str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Phil Greene — Writing &amp; Field Notes</title>
    <link>${siteUrl}/writing</link>
    <description>Essays and field notes on data analytics, AI systems, local hardware, and independent building.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${publishedArticles
  .map(
    (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteUrl}/writing/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/writing/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`

await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8')
await fs.writeFile(path.join(publicDir, 'rss.xml'), rssXml, 'utf-8')
