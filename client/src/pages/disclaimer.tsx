import LegalPageLayout from '@/components/legal/LegalPageLayout'
import { usePageMeta } from '@/hooks/usePageMeta'

const LAST_UPDATED = 'April 22, 2026'

export default function DisclaimerPage() {
  usePageMeta({
    title: 'Disclaimer | Phil Greene',
    description:
      'Disclaimer for philgreene.net clarifying informational content, no professional advice, external links, and no guarantees.',
    canonicalPath: '/disclaimer',
  })

  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Please read this page before relying on information from this website."
      lastUpdated={LAST_UPDATED}
    >
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">General information only</h2>
        <p className="text-muted-foreground">
          Content on this website is provided for general informational purposes and to showcase
          portfolio work.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">No professional advice</h2>
        <p className="text-muted-foreground">
          Nothing on this site is legal, tax, accounting, medical, or financial advice.
          Professional advice should be obtained from a licensed provider for your specific
          situation.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">External links</h2>
        <p className="text-muted-foreground">
          This website may include links to third-party platforms and resources. Those sites are
          not controlled by this website.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">No warranties and results may vary</h2>
        <p className="text-muted-foreground">
          The website and content are provided “as is” without warranties of any kind. Portfolio
          examples describe past work; outcomes for future projects can vary.
        </p>
      </section>
    </LegalPageLayout>
  )
}
