import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, ArrowUpRight, Cpu, Database, Layers, Terminal } from 'lucide-react'
import { Link } from 'wouter'
import ProjectCard from '@/components/ProjectCard'
import SectionHeader from '@/components/SectionHeader'
import SeoHead from '@/components/SeoHead'
import { nowData, profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { articles } from '@/data/writing'

const disciplines = [
  {
    id: 'analytics',
    index: '01',
    icon: Database,
    title: 'Data Analytics',
    focus: 'SNHU B.S. · Python · SQL · Tableau',
    detail:
      'Turning raw operational and financial tables into clear, margin-aware decisions without chart clutter.',
    href: '/projects/tableau-superstore-sales-analysis',
    cta: 'View Tableau case study',
  },
  {
    id: 'automation',
    index: '02',
    icon: Terminal,
    title: 'AI & Automation',
    focus: 'n8n · TypeScript · Structured Schemas',
    detail:
      'Pairing deterministic workflow orchestration with narrow, schema-validated LLM steps and human fallback.',
    href: '/projects/ai-agent-n8n-automation-workflows',
    cta: 'View automation architecture',
  },
  {
    id: 'hardware',
    index: '03',
    icon: Cpu,
    title: 'Hardware & Edge Lab',
    focus: 'Raspberry Pi 5 · Hailo-10H · Linux',
    detail:
      'Exploring local-first inference, quantization trade-offs, and containerized services on a 15W footprint.',
    href: '/projects/raspberry-pi-5-hailo-10h-local-ai-lab',
    cta: 'Inspect local AI lab',
  },
  {
    id: 'ventures',
    index: '04',
    icon: Layers,
    title: 'Ventures & Systems',
    focus: 'Iron & Ink Systems · Full-Stack Web',
    detail:
      'Commercial web engineering and practical lead-recovery automation built for owner-operated trades.',
    href: '/projects/iron-and-ink-systems',
    cta: 'Read venture breakdown',
  },
]

const disciplinePanelId = 'discipline-panel'

export default function HomePage() {
  const [activeDiscipline, setActiveDiscipline] = useState(disciplines[0].id)
  const tablistRef = useRef<HTMLDivElement>(null)
  const currentDiscipline =
    disciplines.find((item) => item.id === activeDiscipline) ?? disciplines[0]

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, tabId: string) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return
    }
    event.preventDefault()
    const index = disciplines.findIndex((item) => item.id === tabId)
    if (index === -1) {
      return
    }
    const direction = event.key === 'ArrowLeft' ? -1 : 1
    const nextIndex = (index + direction + disciplines.length) % disciplines.length
    setActiveDiscipline(disciplines[nextIndex].id)
    const tabs = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[nextIndex]?.focus()
  }

  const publishedProjects = projects.filter((project) => project.published !== false)
  const featuredProjects = publishedProjects.filter((project) => project.featuredOnHome).slice(0, 4)
  const latestArticles = articles.filter((article) => article.published !== false).slice(0, 3)

  return (
    <>
      <SeoHead
        title="Phil Greene — Independent Builder, Data Analytics & AI Systems"
        description="Personal website of Phillip Greene: data analytics student at SNHU, independent software builder, AI & automation experimenter, and founder of Iron & Ink Systems."
        canonicalPath="/"
      />
      <main id="main-content">
        {/* Asymmetric Editorial Hero */}
        <section className="tech-grid-bg border-b border-[var(--border-default)] py-20 md:py-28">
          <div className="site-container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="eyebrow-mono">{profile.eyebrow}</p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                {profile.headlineTop}
                <br />
                <span className="text-[var(--accent-primary)]">{profile.headlineAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]">
                {profile.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/projects" className="btn btn-primary">
                  Explore my work <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/about" className="btn btn-secondary">
                  About me
                </Link>
              </div>

              <p className="editorial-quote mt-10">{profile.mantra}</p>
            </div>

            {/* Interactive System & Lab Explorer */}
            <aside
              aria-label="Interactive areas of focus"
              className="surface-card overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3.5">
                <span className="font-mono-meta text-xs text-[var(--accent-primary)]">
                  SYSTEM_INDEX // 2026
                </span>
                <span className="font-mono-meta text-xs text-[var(--text-secondary)]">
                  Manchester, NH
                </span>
              </div>

              <div
                ref={tablistRef}
                className="grid grid-cols-2 border-b border-[var(--border-default)]"
                role="tablist"
                aria-label="Core disciplines"
              >
                {disciplines.map(({ id, index, icon: Icon, title }) => {
                  const isSelected = id === currentDiscipline.id
                  return (
                    <button
                      key={id}
                      type="button"
                      id={`discipline-tab-${id}`}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={disciplinePanelId}
                      tabIndex={isSelected ? 0 : -1}
                      onKeyDown={(event) => handleTabKeyDown(event, id)}
                      onClick={() => setActiveDiscipline(id)}
                      className={`flex items-center gap-2.5 border-b border-r border-[var(--border-default)] px-4 py-3.5 text-left text-xs font-semibold transition-colors last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0 ${
                        isSelected
                          ? 'bg-[var(--bg-primary)] text-[var(--accent-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Icon size={15} aria-hidden="true" />
                      <span>
                        <span className="font-mono-meta mr-1.5 opacity-70">{index}</span>
                        {title}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                id={disciplinePanelId}
                className="p-6"
                role="tabpanel"
                aria-labelledby={`discipline-tab-${currentDiscipline.id}`}
              >
                <p className="font-mono-meta mb-2 text-xs text-[var(--accent-warm)]">
                  {currentDiscipline.focus}
                </p>
                <h2 className="mb-2 text-xl font-bold">{currentDiscipline.title}</h2>
                <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {currentDiscipline.detail}
                </p>
                <Link href={currentDiscipline.href} className="text-action-link text-sm">
                  {currentDiscipline.cta} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Selected Work */}
        <section className="section-pad">
          <div className="site-container">
            <SectionHeader
              eyebrow="Selected Work / 2026"
              title="Projects & Case Studies"
              description="Analytical workbooks, Python pipelines, n8n/AI orchestration, edge hardware experiments, and entrepreneurial builds."
              actionLabel={`View all ${publishedProjects.length} projects`}
              actionHref="/projects"
            />

            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Writing & Digital Garden */}
        <section className="section-pad section-divider">
          <div className="site-container">
            <SectionHeader
              eyebrow="Writing & Field Notes"
              title="Thinking in Public"
              description="Notes on transitioning from hands-on trades to data analytics, designing reliable AI workflows, and learning on constrained hardware."
              actionLabel="Browse all writing"
              actionHref="/writing"
            />

            <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
              {latestArticles.map((article) => (
                <article
                  key={article.slug}
                  className="grid gap-4 py-6 md:grid-cols-[180px_1fr_auto] md:items-baseline"
                >
                  <div className="font-mono-meta flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                    <span>{article.date}</span>
                    <span className="meta-pill">{article.kind}</span>
                  </div>

                  <div>
                    <h3 className="mb-1.5 text-lg font-bold text-[var(--text-primary)]">
                      <Link
                        href={`/writing/${article.slug}`}
                        className="hover:text-[var(--accent-primary)]"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="m-0 max-w-2xl text-sm text-[var(--text-secondary)]">
                      {article.summary}
                    </p>
                  </div>

                  <Link
                    href={`/writing/${article.slug}`}
                    className="text-action-link text-sm md:justify-self-end"
                  >
                    Read <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Now & Collaboration */}
        <section className="section-pad section-divider">
          <div className="site-container grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow-mono mb-2">Now / {nowData.updated}</p>
              <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
                What I&apos;m focused on right now
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {nowData.focusAreas.map((item) => (
                  <div key={item.label} className="surface-card p-5">
                    <span className="font-mono-meta block text-xs text-[var(--accent-primary)]">
                      {item.label}
                    </span>
                    <h3 className="mt-1.5 mb-1.5 text-base font-bold">{item.title}</h3>
                    <p className="m-0 text-sm text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/now" className="text-action-link">
                  Full /now snapshot <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="surface-card flex flex-col justify-between p-7">
              <div>
                <p className="eyebrow-mono mb-2">Ecosystem &amp; Contact</p>
                <h2 className="mb-3 text-2xl font-bold">Let&apos;s connect</h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Whether you&apos;re a recruiter reviewing my analytics and engineering work, a
                  fellow builder comparing notes on local AI, or someone exploring{' '}
                  <strong className="text-[var(--text-primary)]">Iron &amp; Ink Systems</strong>,
                  I&apos;d be glad to hear from you.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Get in touch <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/resume" className="btn btn-secondary">
                  View Résumé
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}
