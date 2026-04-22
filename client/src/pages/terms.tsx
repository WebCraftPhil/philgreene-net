import { useEffect } from "react";

export default function TermsPage() {
  const effectiveDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  useEffect(() => {
    document.title = "Terms of Service";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Effective date: {effectiveDate}</p>
          <p className="text-muted-foreground">
            Questions about these Terms? Email{" "}
            <a className="text-primary underline" href="mailto:me@philgreene.net">
              me@philgreene.net
            </a>
            .
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">1) Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using philgreene.net, you agree to these Terms of Service.
            If you do not agree, please do not use this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">2) About This Website</h2>
          <p className="text-muted-foreground">
            philgreene.net is a personal portfolio and business website that shares
            information about services, projects, and ways to get in touch.
            It may include contact forms and links to third-party platforms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">3) Eligibility</h2>
          <p className="text-muted-foreground">
            You must be at least 13 years old to use this website. If you are under
            18, you should use this website with the involvement of a parent or
            legal guardian.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">4) User Conduct</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Do not use the site for unlawful, fraudulent, or harmful activity.</li>
            <li>Do not attempt to interfere with the site, server, or networks.</li>
            <li>Do not impersonate another person or misrepresent your identity.</li>
            <li>
              Do not scrape or automate requests in a way that causes abuse,
              disruption, or unreasonable load.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">5) Intellectual Property</h2>
          <p className="text-muted-foreground">
            Unless otherwise stated, content on this website, including text,
            branding, graphics, and source code, is owned by philgreene.net or its
            licensors and is protected by applicable intellectual property laws.
            You are granted a limited, non-exclusive, non-transferable license to
            access and use the site for personal, non-commercial use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">6) User Content</h2>
          <p className="text-muted-foreground">
            If you submit information through the contact form, you represent that
            the information is accurate and that you have the right to share it.
            You keep ownership of your content, but you grant a limited license to
            use it as needed to review and respond to your inquiry.
          </p>
          <p className="text-muted-foreground">
            If user accounts, comments, or other upload features are added in the
            future, additional terms may apply.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">7) Links to Third Parties</h2>
          <p className="text-muted-foreground">
            This website may link to third-party websites or services. Those
            websites are controlled by third parties, and we are not responsible
            for their content, policies, or practices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">8) Disclaimers</h2>
          <p className="text-muted-foreground">
            This website is provided on an "as is" and "as available" basis,
            without warranties of any kind, express or implied, to the fullest
            extent permitted by law.
          </p>
          <p className="text-muted-foreground">
            Content on this website is for informational purposes only and is not
            legal, financial, medical, or other professional advice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">9) Limitation of Liability</h2>
          <p className="text-muted-foreground">
            To the fullest extent permitted by law, philgreene.net and its owner
            will not be liable for indirect, incidental, special, consequential,
            or punitive damages, or for loss of data, profits, or business
            opportunities arising from your use of the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">10) Indemnification</h2>
          <p className="text-muted-foreground">
            To the extent permitted by law, you agree to defend, indemnify, and
            hold harmless philgreene.net and its owner from claims, liabilities,
            damages, and expenses arising from your misuse of the website or your
            violation of these Terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">11) Changes to the Service and Terms</h2>
          <p className="text-muted-foreground">
            We may update, change, or discontinue parts of the website at any time.
            We may also revise these Terms from time to time. Updates are effective
            when posted on this page with a revised effective date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">12) Governing Law and Venue</h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of [STATE], without regard to
            conflict of laws rules. Any dispute will be brought in courts of
            competent jurisdiction in [STATE].
          </p>
          <p className="text-muted-foreground">
            TODO: Confirm the preferred U.S. state for governing law and venue.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">13) Contact</h2>
          <p className="text-muted-foreground">
            Questions about these Terms? Email{" "}
            <a className="text-primary underline" href="mailto:me@philgreene.net">
              me@philgreene.net
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
