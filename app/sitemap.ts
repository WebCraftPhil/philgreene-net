import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";
  const lastMod = new Date();
  return [
    { url: siteUrl, lastModified: lastMod },
    { url: `${siteUrl}/about`, lastModified: lastMod },
    { url: `${siteUrl}/blog`, lastModified: lastMod },
    { url: `${siteUrl}/projects`, lastModified: lastMod },
    { url: `${siteUrl}/contact`, lastModified: lastMod },
  ];
}
