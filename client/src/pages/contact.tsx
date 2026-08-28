import ContactSection from '@/components/ContactSection'
import SeoHead from '@/components/SeoHead'

export default function ContactPage() {
  return (
    <main id="main-content">
      <SeoHead
        title="Request a Free Lead-Loss Audit | Phil Greene"
        description="Request a practical review of your local service business website, lead response, and follow-up process."
        canonicalPath="/contact"
      />
      <ContactSection />
    </main>
  )
}
