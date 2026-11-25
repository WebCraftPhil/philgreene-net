import { ArrowRight } from 'lucide-react'
import { Link } from 'wouter'
import SeoHead from '@/components/SeoHead'
import { nowData } from '@/data/profile'

export default function NowPage() {
  return (
    <>
      <SeoHead
        title="Now | Phil Greene"
        description="What Phillip Greene is focused on right now: SNHU Data Analytics, Raspberry Pi 5 + Hailo-10H local AI lab, n8n workflows, and Iron & Ink Systems."
        canonicalPath="/now"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="editorial-measure">
            <p className="eyebrow-mono">
              Now / Updated {nowData.updated} · {nowData.location}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Current Focus
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
              {nowData.intro}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {nowData.focusAreas.map((area) => (
              <article key={area.label} className="surface-card p-6">
                <span className="font-mono-meta text-xs text-[var(--accent-primary)]">
                  {area.label}
                </span>
                <h2 className="mt-2 mb-2 text-xl font-bold">{area.title}</h2>
                <p className="m-0 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {area.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/projects" className="text-action-link">
              See related projects <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="text-action-link">
              Start a conversation <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
