import AboutContent from "../../components/AboutContent";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";

export const metadata = {
  title: "About - Phil Greene",
  description:
    "Data-driven problem solver building automation, analytics, and web applications.",
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

export default function AboutPage() {
  return <AboutContent />;
}
