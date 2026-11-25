import { ArrowRight, Rss } from 'lucide-react'
import { Link } from 'wouter'
import SeoHead from '@/components/SeoHead'
import { articles } from '@/data/writing'

export default function WritingPage() {
  const visibleArticles = articles.filter(
    (article) => import.meta.env.DEV || article.published !== false
  )

  return (
    <>
      <SeoHead
        title="Writing & Digital Garden | Phil Greene"
        description="Essays, field notes, and evergreen technical notes on data analytics, AI workflows, local hardware, and building practical systems."
        canonicalPath="/writing"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="eyebrow-mono">Writing / Digital Garden</p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Essays &amp; Field Notes
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                A mix of longer essays, practical architecture notes, and evergreen pages that
                evolve as I build and test new ideas.
              </p>
            </div>
            <a href="/rss.xml" className="btn btn-secondary min-h-10 px-4 text-xs">
              <Rss size={14} aria-hidden="true" /> RSS Feed
            </a>
          </div>

          <div className="mt-12 divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
            {visibleArticles.map((article) => (
              <article
                key={article.slug}
                className="grid gap-4 py-8 md:grid-cols-[200px_1fr_auto] md:items-start"
              >
                <div className="font-mono-meta space-y-2 text-xs text-[var(--text-secondary)]">
                  <div>{article.date}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="meta-pill meta-pill-accent">{article.kind}</span>
                    <span>{article.readingTime}</span>
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-xl font-bold">
                    <Link
                      href={`/writing/${article.slug}`}
                      className="hover:text-[var(--accent-primary)]"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span key={tag} className="meta-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/writing/${article.slug}`}
                  className="text-action-link text-sm md:justify-self-end"
                >
                  Read <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
