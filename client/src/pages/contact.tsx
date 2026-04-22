import SeoHead from "@/components/SeoHead";

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <SeoHead
        title="Contact | Phil Greene"
        description="Contact Phil Greene for project inquiries, accessibility requests, or policy questions."
        canonicalPath="/contact"
      />
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Contact Information</h1>
          <p className="text-muted-foreground">
            Questions about privacy, accessibility, website policies, or project work? Get in touch.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Email</h2>
          <p className="text-muted-foreground">
            <a className="text-primary underline" href="mailto:me@philgreene.net">me@philgreene.net</a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Location</h2>
          <p className="text-muted-foreground">Manchester, New Hampshire, United States</p>
        </section>
      </div>
    </main>
  );
}
