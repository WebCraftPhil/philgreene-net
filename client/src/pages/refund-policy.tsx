import SeoHead from "@/components/SeoHead";

export default function RefundPolicyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <SeoHead
        title="Refund Policy | Phil Greene"
        description="Read the Refund Policy for philgreene.net regarding digital services, timelines, and dispute handling."
        canonicalPath="/refund-policy"
      />
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-muted-foreground">
            This Refund Policy applies to services offered through philgreene.net.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Service-Based Work</h2>
          <p className="text-muted-foreground">
            Because services are customized and time-based, refunds are evaluated case by case based
            on project scope, completed work, and signed agreements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">How to Request a Review</h2>
          <p className="text-muted-foreground">
            To request a refund review, email <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a> with your project details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Dispute Resolution</h2>
          <p className="text-muted-foreground">
            Most billing concerns can be resolved quickly through direct communication and documented
            scope review.
          </p>
        </section>
      </div>
    </main>
  );
}
