import ContactSection from '@/components/ContactSection'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function ContactPage() {
  usePageMeta({
    title: 'Contact | Phil Greene',
    description:
      'Contact Phil Greene for freelance and project inquiries through the website contact form or by email.',
    canonicalPath: '/contact',
  })

  return (
    <main id="main-content" className="min-h-screen pt-24 pb-16 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Reach out about project work, collaboration, or general questions. You can use the form
          below or email me directly at <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a>.
        </p>
      </div>
      <ContactSection />
    </main>
  )
}
