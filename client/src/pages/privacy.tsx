export default function PrivacyPage() {
  const effectiveDate = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Effective date: {effectiveDate}</p>
          <p className="text-muted-foreground">
            Questions or requests? Email{' '}
            <a className="text-primary underline" href="mailto:me@philgreene.net">
              me@philgreene.net
            </a>
            .
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">1) Overview</h2>
          <p className="text-muted-foreground">
            This page explains what information this site may collect and how it may be used.
            The goal is to keep this simple, clear, and honest.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">2) Information We Collect</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              <strong>Information you provide:</strong> If you contact us through the site,
              we may receive details such as your name, email address, project details,
              and the message you submit.
            </li>
            <li>
              <strong>Information collected automatically:</strong> Our hosting provider may
              collect basic technical logs such as IP address, browser type, device
              information, and request timing for security and performance.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">3) How We Use Information</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>To respond to messages and project inquiries.</li>
            <li>To operate, secure, and improve the site.</li>
            <li>To troubleshoot technical issues.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">4) Cookies and Similar Technologies</h2>
          <p className="text-muted-foreground">
            This site stores a local theme preference in your browser so your light or dark
            mode setting is remembered.
          </p>
          <p className="text-muted-foreground">
            We do not intentionally use advertising cookies. Some infrastructure or embedded
            third-party services may set cookies when required for site functionality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">5) Analytics and Third-Party Services</h2>
          <p className="text-muted-foreground">
            The codebase includes optional support for analytics events with Plausible and
            Google Analytics. Those services are only active if separately configured.
          </p>
          <p className="text-muted-foreground">
            Contact form delivery may use SendGrid to send messages to the site owner. If
            analytics or additional third-party services are added later, this policy will be
            updated.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">6) Sharing of Information</h2>
          <p className="text-muted-foreground">
            Information is not sold. Information may be shared with service providers only as
            needed to run the site and handle contact requests.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">7) Data Retention</h2>
          <p className="text-muted-foreground">
            Contact request details may be retained as needed to respond to your inquiry,
            maintain records, and resolve follow-up requests.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">8) Your Choices and Rights</h2>
          <p className="text-muted-foreground">
            You can request access, correction, or deletion of personal information by
            emailing me@philgreene.net.
          </p>
          <p className="text-muted-foreground">
            Privacy rights can vary by location, so available rights may depend on where you
            live.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">9) Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            This site is not directed to children under 13, and we do not knowingly collect
            personal information from children under 13.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">10) Security</h2>
          <p className="text-muted-foreground">
            Reasonable safeguards are used to protect information, but no online system can be
            guaranteed to be fully secure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">11) Changes to This Policy</h2>
          <p className="text-muted-foreground">
            This policy may be updated from time to time. Updates will be posted on this page
            with a revised effective date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">12) Contact</h2>
          <p className="text-muted-foreground">
            For privacy questions or requests, email{' '}
            <a className="text-primary underline" href="mailto:me@philgreene.net">
              me@philgreene.net
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
