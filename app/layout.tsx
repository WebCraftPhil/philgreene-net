import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Phil Greene - Data Analyst & Full Stack Developer",
  description: "Professional portfolio showcasing data analysis, automation, and full-stack development projects. Specializing in AI integration, Etsy analytics, and business intelligence solutions.",
  keywords: ["data analyst", "full stack developer", "AI automation", "Etsy analytics", "business intelligence", "portfolio"],
  authors: [{ name: "Phil Greene" }],
  openGraph: {
    title: "Phil Greene - Data Analyst & Full Stack Developer",
    description: "Professional portfolio showcasing data analysis, automation, and full-stack development projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phil Greene - Data Analyst & Full Stack Developer",
    description: "Professional portfolio showcasing data analysis, automation, and full-stack development projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
