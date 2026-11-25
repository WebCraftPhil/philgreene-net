import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import SeoHead from '@/components/SeoHead'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All')

  const visibleProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory)

  return (
    <>
      <SeoHead
        title="Projects & Case Studies | Phil Greene"
        description="Data analytics workbooks, Python pipelines, n8n AI workflows, Raspberry Pi 5 + Hailo-10H local AI lab, and Iron & Ink Systems."
        canonicalPath="/projects"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow-mono">Portfolio / Case Studies</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Selected Projects
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
              Case studies documented with a focus on problem framing, technical architecture,
              analytical trade-offs, and honest lessons learned.
            </p>
          </div>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? 'btn btn-primary min-h-9 px-4 text-xs'
                      : 'btn btn-secondary min-h-9 px-4 text-xs'
                  }
                >
                  {category}
                </button>
              )
            })}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
