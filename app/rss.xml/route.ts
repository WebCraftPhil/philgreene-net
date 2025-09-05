import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";
  const items: { title: string; id: string }[] = [];
  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Phil Greene Blog</title><link>${siteUrl}/blog</link><description>Blog RSS Feed</description>${items
    .map(
      (p) =>
        `<item><title>${p.title}</title><link>${siteUrl}/blog/${p.id}</link></item>`,
    )
    .join("")}</channel></rss>`;
  return new NextResponse(rss, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
