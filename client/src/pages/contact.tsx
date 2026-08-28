import ContactSection from '@/components/ContactSection'
import SeoHead from '@/components/SeoHead'

export default function ContactPage() {
  return (
    <main id="main-content">
      <SeoHead
        title="Contact Phil Greene | Websites & Automation"
        description="Contact Phil Greene by email about websites, lead follow-up, and automation for local service businesses."
        canonicalPath="/contact"
      />
      <ContactSection />
    </main>
  )
}
