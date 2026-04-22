import LegalPageLayout from '@/components/legal/LegalPageLayout'
import { usePageMeta } from '@/hooks/usePageMeta'

const LAST_UPDATED = 'April 22, 2026'

export default function AccessibilityPage() {
  usePageMeta({
    title: 'Accessibility Statement | Phil Greene',
    description:
      'Accessibility Statement for philgreene.net with commitment to inclusive access and contact instructions for reporting barriers.',
    canonicalPath: '/accessibility',
  })

  return (
    <LegalPageLayout
      title="Accessibility Statement"
      description="philgreene.net is committed to improving accessibility and usability for all visitors."
      lastUpdated={LAST_UPDATED}
    >
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Commitment</h2>
        <p className="text-muted-foreground">
          I aim to make this website usable with keyboard navigation, readable structure, and clear
          labels across devices.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Ongoing improvements</h2>
        <p className="text-muted-foreground">
          Accessibility is an ongoing process. I regularly review and improve content, navigation,
          and component behavior over time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Report an accessibility issue</h2>
        <p className="text-muted-foreground">
          If you encounter a barrier, email{' '}
          <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a>{' '}
          with details about the page and issue so it can be fixed.
        </p>
      </section>
    </LegalPageLayout>
  )
}
