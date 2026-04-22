import LegalPageLayout from '@/components/legal/LegalPageLayout'
import { usePageMeta } from '@/hooks/usePageMeta'

const LAST_UPDATED = 'April 22, 2026'

export default function RefundPolicyPage() {
  usePageMeta({
    title: 'Refund Policy | Phil Greene',
    description:
      'Refund Policy for philgreene.net clarifying that the website does not process direct purchases and project work is governed by separate agreements.',
    canonicalPath: '/refund-policy',
  })

  return (
    <LegalPageLayout
      title="Refund Policy"
      description="This website is a portfolio and contact point, not an ecommerce checkout."
      lastUpdated={LAST_UPDATED}
    >
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">No direct purchases on this site</h2>
        <p className="text-muted-foreground">
          philgreene.net does not process direct purchases, subscriptions, or checkout transactions
          through this website.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">When refunds apply</h2>
        <p className="text-muted-foreground">
          Because the site does not sell products directly, standard consumer refund and return
          workflows do not apply to website browsing or contact-form submissions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Freelance and project work</h2>
        <p className="text-muted-foreground">
          If paid services are agreed to, refund or cancellation terms are defined in the separate
          written agreement for that project.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Questions</h2>
        <p className="text-muted-foreground">
          For policy questions, email{' '}
          <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a>.
        </p>
      </section>
    </LegalPageLayout>
  )
}
