import { useEffect } from 'react'

interface SeoHeadProps {
  title: string
  description: string
  canonicalPath: string
  imagePath?: string
  type?: 'website' | 'article'
  publishedTime?: string
  structuredData?: Record<string, unknown>
}

const siteUrl = 'https://philgreene.net'

export default function SeoHead({
  title,
  description,
  canonicalPath,
  imagePath = '/og-image.png',
  type = 'website',
  publishedTime,
  structuredData,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (
      selector: string,
      attribute: 'name' | 'property',
      key: string,
      content: string
    ) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.appendChild(tag)
      }
      tag.content = content
    }

    const canonicalUrl = `${siteUrl}${canonicalPath}`
    const imageUrl = imagePath.startsWith('http')
      ? imagePath
      : `${siteUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    if (publishedTime) {
      setMeta('meta[property="article:published_time"]', 'property', 'article:published_time', publishedTime)
    }
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    let schema = document.head.querySelector('script[data-dynamic-schema]') as HTMLScriptElement | null
    if (!schema) {
      schema = document.createElement('script')
      schema.type = 'application/ld+json'
      schema.dataset.dynamicSchema = 'true'
      document.head.appendChild(schema)
    }

    schema.textContent = JSON.stringify(
      structuredData ?? {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Phillip Greene',
        alternateName: 'Phil Greene',
        url: siteUrl,
        email: 'me@philgreene.net',
        description:
          'Data analytics student at Southern New Hampshire University, independent software builder, AI & automation experimenter, and founder of Iron & Ink Systems.',
        homeLocation: {
          '@type': 'Place',
          name: 'Manchester, New Hampshire',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Southern New Hampshire University',
        },
        sameAs: [
          'https://github.com/WebCraftPhil',
          'https://linkedin.com/in/phil.greene1',
          'https://ironandinksystems.com',
        ],
      }
    )
  }, [canonicalPath, description, imagePath, publishedTime, structuredData, title, type])

  return null
}
