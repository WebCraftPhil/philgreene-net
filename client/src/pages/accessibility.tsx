import SeoHead from "@/components/SeoHead";

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <SeoHead
        title="Accessibility Statement | Phil Greene"
        description="Read the accessibility statement for philgreene.net and learn how to request accessibility support or report issues."
        canonicalPath="/accessibility"
      />
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Accessibility Statement</h1>
          <p className="text-muted-foreground">
            philgreene.net is committed to making this website accessible and usable for all visitors.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Accessibility Efforts</h2>
          <p className="text-muted-foreground">
            We aim to provide semantic headings, meaningful links, keyboard-friendly navigation, and
            sufficient contrast where possible.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Need Help Accessing Content?</h2>
          <p className="text-muted-foreground">
            If you experience an accessibility barrier, email <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a> and include the page URL and issue details.
          </p>
        </section>
      </div>
    </main>
  );
}
