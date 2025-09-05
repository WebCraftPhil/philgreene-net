import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://philgreene.net';
  const pages = ['/', '/projects', '/about', '/contact'];
  return pages.map(page => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }));
}
