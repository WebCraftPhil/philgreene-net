import SeoHead from "@/components/SeoHead";

export default function DisclaimerPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <SeoHead
        title="Disclaimer | Phil Greene"
        description="Read the philgreene.net disclaimer regarding informational content, third-party links, and no professional advice."
        canonicalPath="/disclaimer"
      />
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Disclaimer</h1>
          <p className="text-muted-foreground">
            The information on philgreene.net is provided for general informational purposes.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">No Professional Advice</h2>
          <p className="text-muted-foreground">
            Content on this website does not constitute legal, financial, tax, or other professional advice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Accuracy and Availability</h2>
          <p className="text-muted-foreground">
            While reasonable efforts are made to keep content accurate and current, no guarantees are made about completeness or availability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Third-Party Links</h2>
          <p className="text-muted-foreground">
            This site may link to third-party websites. philgreene.net is not responsible for third-party content, policies, or services.
          </p>
        </section>
      </div>
    </main>
  );
}
