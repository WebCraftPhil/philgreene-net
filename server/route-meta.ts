export interface RouteMeta {
  path: string
  title: string
  description: string
  canonicalUrl: string
  imageUrl: string
  imageAlt: string
}

export const routeMeta: RouteMeta[] = [
  {
    path: '/website-checkup',
    title: 'Free Website Lead Checkup | Phil Greene',
    description: 'Scan your local business website for call, quote-request, trust, local visibility, and mobile usability gaps. Get practical priorities in minutes.',
    canonicalUrl: 'https://philgreene.net/website-checkup',
    imageUrl: 'https://philgreene.net/og-image.png',
    imageAlt: 'Phil Greene free website checkup for local businesses',
  },
]

const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
}

function escapeHtml(value: string) {
  return value.replace(/[&"<>]/g, (character) => htmlEntities[character])
}

function normalizePath(pathname: string) {
  const pathOnly = pathname.split('?')[0]?.split('#')[0] || '/'
  return pathOnly.length > 1 ? pathOnly.replace(/\/$/, '') : pathOnly
}

function replaceOrInsertMeta(html: string, selector: 'name' | 'property', key: string, content: string) {
  const escaped = escapeHtml(content)
  const tagPattern = new RegExp(`<meta\\s+${selector}="${key}"\\s+content="[^"]*"\\s*/?>`)
  const tag = `<meta ${selector}="${key}" content="${escaped}" />`

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, tag)
  }

  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceOrInsertCanonical(html: string, canonicalUrl: string) {
  const escaped = escapeHtml(canonicalUrl)
  const tagPattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/
  const tag = `<link rel="canonical" href="${escaped}" />`

  if (tagPattern.test(html)) {
    return html.replace(tagPattern, tag)
  }

  return html.replace('</head>', `    ${tag}\n  </head>`)
}

export function findRouteMeta(pathname: string) {
  const normalizedPath = normalizePath(pathname)
  return routeMeta.find((meta) => meta.path === normalizedPath)
}

export function applyRouteMeta(html: string, meta: RouteMeta) {
  let page = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)

  page = replaceOrInsertMeta(page, 'name', 'description', meta.description)
  page = replaceOrInsertCanonical(page, meta.canonicalUrl)
  page = replaceOrInsertMeta(page, 'property', 'og:url', meta.canonicalUrl)
  page = replaceOrInsertMeta(page, 'property', 'og:title', meta.title)
  page = replaceOrInsertMeta(page, 'property', 'og:description', meta.description)
  page = replaceOrInsertMeta(page, 'property', 'og:image', meta.imageUrl)
  page = replaceOrInsertMeta(page, 'property', 'og:image:alt', meta.imageAlt)
  page = replaceOrInsertMeta(page, 'name', 'twitter:title', meta.title)
  page = replaceOrInsertMeta(page, 'name', 'twitter:description', meta.description)
  page = replaceOrInsertMeta(page, 'name', 'twitter:image', meta.imageUrl)
  page = replaceOrInsertMeta(page, 'name', 'twitter:image:alt', meta.imageAlt)
  page = replaceOrInsertMeta(page, 'name', 'twitter:url', meta.canonicalUrl)

  return page
}
