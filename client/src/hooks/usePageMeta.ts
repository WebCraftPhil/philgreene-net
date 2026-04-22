import { useEffect } from 'react'

interface PageMetaOptions {
  title: string
  description: string
  canonicalPath: string
}

function upsertMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', url)
}

export function usePageMeta({ title, description, canonicalPath }: PageMetaOptions) {
  useEffect(() => {
    const baseUrl = 'https://www.philgreene.net'
    document.title = title
    upsertMetaTag('description', description)
    upsertCanonical(`${baseUrl}${canonicalPath}`)
  }, [title, description, canonicalPath])
}
