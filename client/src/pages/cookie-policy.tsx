import LegalPageLayout from '@/components/legal/LegalPageLayout'
import { usePageMeta } from '@/hooks/usePageMeta'

const LAST_UPDATED = 'April 22, 2026'

export default function CookiePolicyPage() {
  usePageMeta({
    title: 'Cookie Policy | Phil Greene',
    description:
      'Cookie Policy for philgreene.net describing essential browser storage, optional analytics, and cookie controls.',
    canonicalPath: '/cookie-policy',
  })

  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="This page describes how cookies and similar technologies are used on this personal portfolio site."
      lastUpdated={LAST_UPDATED}
    >
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">What cookies are</h2>
        <p className="text-muted-foreground">
          Cookies are small text files stored in your browser that help websites remember settings
          and understand basic usage.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Cookies used on this site</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>
            <strong>Essential/functional:</strong> theme preference and notice dismissal settings.
          </li>
          <li>
            <strong>Analytics:</strong> analytics events are only sent if an analytics integration is
            configured.
          </li>
          <li>
            <strong>Embedded/third-party:</strong> if embedded third-party content is added in the
            future, that provider may set cookies under its own policy.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">How to manage cookies</h2>
        <p className="text-muted-foreground">
          You can control or delete cookies in your browser settings. Blocking some cookies may
          affect site preferences and functionality.
        </p>
      </section>
    </LegalPageLayout>
  )
}
