import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'
import { Link, useRoute } from 'wouter'
import SeoHead from '@/components/SeoHead'
import { getProjectBySlug, projects } from '@/data/projects'
import NotFound from './not-found'

export default function ProjectDetailPage() {
  const [, params] = useRoute('/projects/:slug')
  const project = params?.slug ? getProjectBySlug(params.slug) : undefined

  if (!project) {
    return <NotFound />
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <>
      <SeoHead
        title={`${project.title} | Projects | Phil Greene`}
        description={project.summary}
        canonicalPath={`/projects/${project.slug}`}
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <Link href="/projects" className="text-action-link mb-8 text-sm">
            <ArrowLeft size={15} aria-hidden="true" /> Back to all projects
          </Link>

          <header className="max-w-3xl border-b border-[var(--border-default)] pb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="font-mono-meta text-xs text-[var(--accent-primary)]">
                {project.index} / {project.category}
              </span>
              <span className="meta-pill">{project.year}</span>
              <span className="meta-pill meta-pill-accent">{project.status}</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="meta-pill">
                  {tech}
                </span>
              ))}
            </div>

            {(project.externalUrl || project.repoUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary min-h-10 px-4 text-xs"
                  >
                    Visit {project.title} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary min-h-10 px-4 text-xs"
                  >
                    <Github size={14} aria-hidden="true" /> View on GitHub
                  </a>
                )}
              </div>
            )}
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
            <div className="space-y-12">
              {/* Problem & Goal */}
              <section className="grid gap-6 sm:grid-cols-2">
                <div className="surface-card p-6">
                  <p className="eyebrow-mono mb-2">01 / Problem</p>
                  <p className="m-0 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.context.problem}
                  </p>
                </div>
                <div className="surface-card p-6">
                  <p className="eyebrow-mono mb-2">02 / Objective</p>
                  <p className="m-0 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.context.goal}
                  </p>
                </div>
              </section>

              {/* Architecture */}
              <section>
                <p className="eyebrow-mono mb-2">03 / Architecture</p>
                <h2 className="mb-3 text-2xl font-bold">{project.architecture.heading}</h2>
                <p className="mb-6 text-base text-[var(--text-secondary)]">
                  {project.architecture.description}
                </p>

                <div className="grid gap-4">
                  {project.architecture.components.map((component) => (
                    <div key={component.name} className="surface-card p-5">
                      <h3 className="mb-1.5 text-base font-bold">{component.name}</h3>
                      <p className="m-0 text-sm text-[var(--text-secondary)]">{component.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Methodology */}
              <section>
                <p className="eyebrow-mono mb-2">04 / Implementation &amp; Methodology</p>
                <h2 className="mb-4 text-2xl font-bold">How it was approached</h2>
                <ul className="space-y-3 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.methodology.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </section>

              {/* Decisions & Trade-offs */}
              <section>
                <p className="eyebrow-mono mb-2">05 / Decisions &amp; Trade-offs</p>
                <h2 className="mb-4 text-2xl font-bold">Key engineering choices</h2>
                <div className="space-y-4">
                  {project.decisionsAndTradeoffs.map((item) => (
                    <div
                      key={item.decision}
                      className="border-l-2 border-[var(--accent-warm-rule)] pl-5"
                    >
                      <h3 className="mb-1 text-base font-bold">{item.decision}</h3>
                      <p className="m-0 text-sm text-[var(--text-secondary)]">{item.rationale}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Lessons Learned */}
              <section>
                <p className="eyebrow-mono mb-2">06 / Lessons Learned</p>
                <h2 className="mb-4 text-2xl font-bold">Takeaways</h2>
                <ul className="space-y-3 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.lessonsLearned.map((lesson) => (
                    <li key={lesson}>{lesson}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="surface-card p-6">
                <p className="eyebrow-mono mb-2">Next Steps</p>
                <ul className="m-0 space-y-2.5 pl-4 text-sm text-[var(--text-secondary)]">
                  {project.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="surface-card p-6">
                <p className="eyebrow-mono mb-2">Next Case Study</p>
                <h3 className="mb-2 text-lg font-bold">{nextProject.title}</h3>
                <p className="mb-4 text-xs text-[var(--text-secondary)]">{nextProject.tagline}</p>
                <Link href={`/projects/${nextProject.slug}`} className="text-action-link text-sm">
                  Open case study <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
