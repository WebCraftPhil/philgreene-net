import LegalPageLayout from '@/components/legal/LegalPageLayout'
import { usePageMeta } from '@/hooks/usePageMeta'

const LAST_UPDATED = 'April 22, 2026'

export default function TermsPage() {
  usePageMeta({
    title: 'Terms of Service | Phil Greene',
    description:
      'Terms of Service for philgreene.net covering acceptable use, intellectual property, liability, and external links.',
    canonicalPath: '/terms',
  })

  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These terms apply to your use of this personal portfolio website."
      lastUpdated={LAST_UPDATED}
    >
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Acceptable use</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Use the site lawfully and respectfully.</li>
          <li>Do not attempt to disrupt, probe, or overload the site infrastructure.</li>
          <li>Do not submit false, abusive, or malicious content through forms.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Intellectual property</h2>
        <p className="text-muted-foreground">
          Unless otherwise noted, site content including text, design, and project presentation
          materials is owned by Phil Greene. You may view and reference the content for personal
          and informational use, but not republish it as your own.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">No unlawful use</h2>
        <p className="text-muted-foreground">
          You agree not to use this website to violate laws or third-party rights.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Service availability</h2>
        <p className="text-muted-foreground">
          This website is provided “as is” and may be changed, paused, or discontinued at any
          time. Continuous or error-free availability is not guaranteed.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Limitation of liability</h2>
        <p className="text-muted-foreground">
          To the maximum extent allowed by law, the site owner is not liable for indirect,
          incidental, special, or consequential damages resulting from use of this site.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">External links</h2>
        <p className="text-muted-foreground">
          This site may link to third-party websites. Their content and policies are controlled by
          those third parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          Questions about these terms can be sent to{' '}
          <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a>.
        </p>
      </section>
    </LegalPageLayout>
  )
}
