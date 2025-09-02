import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";

export const metadata: Metadata = {
  title: "Phil Greene - Creator Automation & SaaS Developer",
  description:
    "I build automation and analytics tools that help creators earn more with less work. From scaling Etsy revenue by 1000% to launching AI-powered SaaS prototypes.",
  keywords: [
    "creator automation",
    "SaaS developer",
    "Etsy automation",
    "social media automation",
    "AI tools",
    "creator economy",
    "business automation",
    "revenue optimization",
    "portfolio",
  ],
  authors: [{ name: "Phil Greene" }],
  creator: "Phil Greene",
  publisher: "Phil Greene",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Phil Greene - Creator Automation & SaaS Developer",
    description:
      "I build automation and analytics tools that help creators earn more with less work. From scaling Etsy revenue by 1000% to launching AI-powered SaaS prototypes.",
    type: "website",
    locale: "en_US",
    siteName: "Phil Greene Portfolio",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Phil Greene - Creator Automation & SaaS Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phil Greene - Creator Automation & SaaS Developer",
    description:
      "I build automation and analytics tools that help creators earn more with less work.",
    creator: "@philgreene",
    images: [`${siteUrl}/og-image.svg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  classification: "Portfolio",
  other: {
    "theme-color": "#33658a",
    "msapplication-TileColor": "#33658a",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Phil Greene Portfolio",
    "application-name": "Phil Greene Portfolio",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Phil Greene",
              jobTitle: "Creator Automation Developer & SaaS Builder",
              description:
                "I build automation and analytics tools that help creators earn more with less work.",
              url: siteUrl,
              sameAs: [
                "https://github.com/philgreene",
                "https://linkedin.com/in/philgreene",
              ],
              knowsAbout: [
                "Creator Automation",
                "SaaS Development",
                "Etsy Optimization",
                "AI Tools",
                "Business Intelligence",
                "Revenue Optimization",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Creator Automation Developer",
                description:
                  "Building tools that help creators scale their businesses through automation and AI",
              },
            }),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/plausible.js"
          />
        )}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
              `}
            </Script>
          </>
        )}
      </head>

      <Script id="theme-init" strategy="beforeInteractive">
        {`
          try {
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const useDark = stored ? stored === 'dark' : prefersDark;
            if (useDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch {}
        `}
      </Script>

      <body className="bg-white text-slate-900 antialiased dark:bg-slate-900 dark:text-white">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
