import { ArrowRight, Compass, Hammer, Layers, LineChart } from 'lucide-react'
import { Link } from 'wouter'
import SeoHead from '@/components/SeoHead'
import { profile } from '@/data/profile'

const principles = [
  {
    icon: Hammer,
    title: 'Practical craftsmanship',
    text: 'Years in hands-on trades and service environments taught me that clean prep, clear scope, and reliable execution beat cleverness every time.',
  },
  {
    icon: LineChart,
    title: 'Evidence over guesswork',
    text: 'Studying Data Analytics at SNHU gives me a formal toolkit—SQL, Python, statistics, and Tableau—to test assumptions against real data.',
  },
  {
    icon: Compass,
    title: 'Independent exploration',
    text: 'From local AI on a Raspberry Pi 5 + Hailo-10H to n8n agent workflows, I learn best by assembling real systems and documenting what breaks.',
  },
  {
    icon: Layers,
    title: 'Sibling brand: Iron & Ink Systems',
    text: 'Iron & Ink Systems is my commercial venture for local service businesses. Philgreene.net is the broader personal home for my research, analytics, and builds.',
  },
]

export default function AboutPage() {
  return (
    <>
      <SeoHead
        title="About | Phil Greene"
        description="Background, principles, and story of Phillip Greene—from hands-on trades and entrepreneurship to SNHU Data Analytics, AI systems, and Iron & Ink Systems."
        canonicalPath="/about"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="editorial-measure">
            <p className="eyebrow-mono">About / Story</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              From hands-on trades to data, software, and intelligent systems.
            </h1>
            <p className="editorial-quote mt-6">{profile.mantra}</p>

            <div className="mt-10 space-y-5 text-base leading-relaxed text-[var(--text-secondary)]">
              <p>
                I&apos;m <strong className="text-[var(--text-primary)]">{profile.name}</strong>,
                based in {profile.location}. I&apos;m pursuing a B.S. in Data Analytics at Southern
                New Hampshire University while building software, automation workflows, and local AI
                experiments.
              </p>
              <p>
                Before focusing on data and software, I spent years working across service,
                industrial, hospitality, e-commerce, and construction-adjacent environments. That
                background shaped how I approach technology: I don&apos;t build tools for the sake
                of novelty. I look for where systems break, where information gets lost, and how
                cleaner engineering makes real work easier.
              </p>
              <p>
                Today, my work spans three connected threads: formal analytical training (SQL,
                Python, Tableau), applied AI and workflow automation (n8n, TypeScript, Raspberry Pi 5
                + Hailo-10H edge hardware), and practical entrepreneurship through{' '}
                <Link
                  href="/projects/iron-and-ink-systems"
                  className="text-action-link"
                >
                  Iron &amp; Ink Systems
                </Link>
                .
              </p>
            </div>
          </div>

          <section className="mt-16 border-t border-[var(--border-default)] pt-14">
            <p className="eyebrow-mono mb-2">How I Work</p>
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">Operating Principles</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {principles.map(({ icon: Icon, title, text }) => (
                <article key={title} className="surface-card p-6">
                  <Icon
                    size={20}
                    aria-hidden="true"
                    className="mb-3 text-[var(--accent-primary)]"
                  />
                  <h3 className="mb-2 text-lg font-bold">{title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-14 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              Explore Projects <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/resume" className="btn btn-secondary">
              View Résumé
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
