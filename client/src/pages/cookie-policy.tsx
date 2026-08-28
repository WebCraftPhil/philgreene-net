import SeoHead from "@/components/SeoHead";

export default function CookiePolicyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <SeoHead
        title="Cookie Policy | Phil Greene"
        description="Read the Cookie Policy for philgreene.net, including information about preference cookies and site functionality cookies."
        canonicalPath="/cookie-policy"
      />
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
          <p className="text-muted-foreground">
            This Cookie Policy explains how philgreene.net uses cookies and similar technologies.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Cookies Used on This Site</h2>
          <p className="text-muted-foreground">
            This site uses limited cookies and local storage for website functionality, including
            remembering theme preferences and supporting basic site performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground">
            If third-party analytics or infrastructure providers are enabled, those services may set
            cookies as needed to operate securely and reliably.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Managing Cookies</h2>
          <p className="text-muted-foreground">
            You can manage or disable cookies through your browser settings. Disabling some cookies
            may affect functionality.
          </p>
        </section>
      </div>
    </main>
  );
}
