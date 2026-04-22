import LegalPageLayout from '@/components/legal/LegalPageLayout'
import { usePageMeta } from '@/hooks/usePageMeta'

const LAST_UPDATED = 'April 22, 2026'

export default function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy | Phil Greene',
    description:
      'Privacy Policy for philgreene.net explaining contact form data, technical logs, cookies, analytics, and privacy rights.',
    canonicalPath: '/privacy-policy',
  })

  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This policy explains what data may be collected on this personal portfolio website and how it is used."
      lastUpdated={LAST_UPDATED}
    >
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Information collected</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>
            Information you submit through the contact form, such as your name, email address,
            project details, and message.
          </li>
          <li>
            Basic technical logs collected by hosting and infrastructure providers, such as IP
            address, browser type, and request timing for security and performance.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">How information is used</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>To respond to inquiries and project requests.</li>
          <li>To operate, secure, and improve the website.</li>
          <li>To troubleshoot availability and performance issues.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Cookies and similar technologies</h2>
        <p className="text-muted-foreground">
          This website uses a small number of browser storage features for basic functionality,
          including theme preference and dismissal of the cookie notice.
        </p>
        <p className="text-muted-foreground">
          This site does not use advertising cookies and is not intended to profile visitors for
          targeted ads.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Third-party services</h2>
        <p className="text-muted-foreground">
          Contact form messages may be delivered through SendGrid. The codebase also supports
          optional analytics integrations, but analytics are only active when configured.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Data retention</h2>
        <p className="text-muted-foreground">
          Inquiry messages may be retained for follow-up communication and project recordkeeping.
          Data is kept only as long as reasonably necessary for those purposes.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">GDPR and CCPA rights signals</h2>
        <p className="text-muted-foreground">
          Where applicable, you may request access, correction, or deletion of personal data you
          submitted through this site. You may also request information about how your submitted
          data is handled.
        </p>
        <p className="text-muted-foreground">
          This site does not sell personal information.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact for privacy requests</h2>
        <p className="text-muted-foreground">
          Email <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a>{' '}
          with the subject line “Privacy Request.”
        </p>
      </section>
    </LegalPageLayout>
  )
}
