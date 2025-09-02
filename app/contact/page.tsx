import ContactForm from "../../components/ContactForm";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";
export const metadata = {
  title: "Contact - Phil Greene",
  description:
    "Get in touch with Phil Greene for data analysis, automation, and development projects.",
  openGraph: {
    title: "Contact - Phil Greene",
    url: `${siteUrl}/contact`,
    images: [{ url: `${siteUrl}/og-image.svg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Phil Greene",
    images: [`${siteUrl}/og-image.svg`],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
