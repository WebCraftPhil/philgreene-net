import { useEffect } from 'react'

interface SeoHeadProps {
  title: string
  description: string
  canonicalPath: string
}

const siteUrl = 'https://philgreene.net'

export default function SeoHead({ title, description, canonicalPath }: SeoHeadProps) {
  useEffect(() => {
    document.title = title

    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.appendChild(tag)
      }
      tag.content = content
    }

    const canonicalUrl = `${siteUrl}${canonicalPath}`
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow')
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
    setMeta('meta[property="og:image"]', 'property', 'og:image', `${siteUrl}/og-image.png`)
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `${siteUrl}/og-image.png`)

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

    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Phil Greene',
      url: siteUrl,
      email: 'me@philgreene.net',
      description: 'Conversion-focused websites, lead capture, AI reception, follow-up, and review-request systems for local service businesses.',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'New Hampshire',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manchester',
        addressRegion: 'NH',
        addressCountry: 'US',
      },
      sameAs: [
        'https://github.com/WebCraftPhil',
        'https://linkedin.com/in/phil.greene1',
      ],
      serviceType: [
        'Local business website design',
        'Conversion-focused website design',
        'Lead capture and appointment booking',
        'AI reception and customer communication',
        'Customer follow-up automation',
        'Google review request systems',
        'Lead recovery systems',
        'CRM automation for service businesses',
      ],
    })
  }, [canonicalPath, description, title])

  return null
}
