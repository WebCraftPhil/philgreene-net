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
    path: '/about',
    title: 'About | Phil Greene',
    description: 'Background, principles, and story of Phillip Greene—from hands-on trades to SNHU Data Analytics, AI systems, and Iron & Ink Systems.',
    canonicalUrl: 'https://philgreene.net/about',
    imageUrl: 'https://philgreene.net/og-image.png',
    imageAlt: 'Phil Greene — About',
  },
  {
    path: '/projects',
    title: 'Projects & Case Studies | Phil Greene',
    description: 'Data analytics workbooks, Python pipelines, n8n AI workflows, Raspberry Pi 5 + Hailo-10H local AI lab, and Iron & Ink Systems.',
    canonicalUrl: 'https://philgreene.net/projects',
    imageUrl: 'https://philgreene.net/og-image.png',
    imageAlt: 'Phil Greene — Projects',
  },
  {
    path: '/writing',
    title: 'Writing & Digital Garden | Phil Greene',
    description: 'Essays, field notes, and evergreen technical notes on data analytics, AI workflows, local hardware, and building practical systems.',
    canonicalUrl: 'https://philgreene.net/writing',
    imageUrl: 'https://philgreene.net/og-image.png',
    imageAlt: 'Phil Greene — Writing',
  },
  {
    path: '/now',
    title: 'Now | Phil Greene',
    description: 'What Phillip Greene is focused on right now: SNHU Data Analytics, Raspberry Pi 5 + Hailo-10H local AI lab, n8n workflows, and Iron & Ink Systems.',
    canonicalUrl: 'https://philgreene.net/now',
    imageUrl: 'https://philgreene.net/og-image.png',
    imageAlt: 'Phil Greene — Now',
  },
  {
    path: '/resume',
    title: 'Résumé | Phil Greene',
    description: 'Education, technical skills, and experience for Phillip Greene—Data Analytics student at SNHU, software builder, and automation engineer.',
    canonicalUrl: 'https://philgreene.net/resume',
    imageUrl: 'https://philgreene.net/og-image.png',
    imageAlt: 'Phil Greene — Résumé',
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
