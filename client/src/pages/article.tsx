import { ArrowLeft } from 'lucide-react'
import { Link, useRoute } from 'wouter'
import SeoHead from '@/components/SeoHead'
import { getArticleBySlug } from '@/data/writing'
import NotFound from './not-found'

export default function ArticlePage() {
  const [, params] = useRoute('/writing/:slug')
  const article = params?.slug ? getArticleBySlug(params.slug) : undefined

  if (!article) {
    return <NotFound />
  }

  return (
    <>
      <SeoHead
        title={`${article.title} | Writing | Phil Greene`}
        description={article.summary}
        canonicalPath={`/writing/${article.slug}`}
        type="article"
        publishedTime={article.date}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.summary,
          datePublished: article.date,
          author: {
            '@type': 'Person',
            name: 'Phillip Greene',
            url: 'https://philgreene.net',
          },
        }}
      />
      <main id="main-content" className="section-pad">
        <article className="site-container">
          <Link href="/writing" className="text-action-link mb-8 text-sm">
            <ArrowLeft size={15} aria-hidden="true" /> Back to writing
          </Link>

          <header className="editorial-measure border-b border-[var(--border-default)] pb-8">
            <div className="font-mono-meta mb-4 flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)]">
              <span className="meta-pill meta-pill-accent">{article.kind}</span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
              {article.summary}
            </p>
          </header>

          <div className="editorial-measure mt-10 space-y-8">
            {article.sections.map((section, index) => (
              <section key={section.heading ?? index} className="space-y-4">
                {section.heading && (
                  <h2 className="text-xl font-bold sm:text-2xl">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-[var(--text-secondary)]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.code && (
                  <pre className="surface-card overflow-x-auto p-5 text-xs leading-relaxed text-[var(--text-primary)]">
                    <code>{section.code.snippet}</code>
                  </pre>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
    </>
  )
}
