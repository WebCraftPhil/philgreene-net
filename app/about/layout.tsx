import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";
export const metadata: Metadata = {
  title: "About - Phil Greene",
  description:
    "Learn more about Phil Greene, a data analyst and full-stack developer specializing in AI automation and business intelligence.",
  openGraph: {
    title: "About - Phil Greene",
    url: `${siteUrl}/about`,
    images: [{ url: `${siteUrl}/og-image.svg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Phil Greene",
    images: [`${siteUrl}/og-image.svg`],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
