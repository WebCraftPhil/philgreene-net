import { ArrowUpRight } from 'lucide-react'
import { Link } from 'wouter'
import type { ProjectCaseStudy } from '@/data/projects'

export default function ProjectCard({ project }: { project: ProjectCaseStudy }) {
  return (
    <article className="surface-card surface-card-interactive flex h-full flex-col justify-between p-6">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="font-mono-meta text-xs text-[var(--accent-primary)]">
            {project.index} / {project.category}
          </span>
          <span className="meta-pill">{project.status}</span>
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight text-[var(--text-primary)]">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-[var(--accent-primary)] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
          {project.summary}
        </p>
      </div>

      <div>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="meta-pill">
              {tech}
            </span>
          ))}
        </div>

        <Link href={`/projects/${project.slug}`} className="text-action-link text-sm">
          Read case study <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
