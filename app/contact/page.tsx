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
  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20">
        <iframe
          src="https://calendly.com/philgreene/20min?embed_domain=philgreene.net&embed_type=Inline"
          className="w-full h-[700px] rounded-lg border"
          title="Book a 20-min Call"
        ></iframe>
      </div>
      <ContactForm />
    </div>
  );
}
