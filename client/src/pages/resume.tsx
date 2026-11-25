import { Github, Linkedin, Mail, MapPin, Printer } from 'lucide-react'
import { Link } from 'wouter'
import SeoHead from '@/components/SeoHead'
import { profile, resumeData } from '@/data/profile'

export default function ResumePage() {
  return (
    <>
      <SeoHead
        title="Résumé | Phil Greene"
        description="Education, technical skills, and experience for Phillip Greene—Data Analytics student at SNHU, software builder, and automation engineer."
        canonicalPath="/resume"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[var(--border-default)] pb-8">
            <div>
              <p className="eyebrow-mono">Curriculum Vitae / Résumé</p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                {profile.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden="true" /> {profile.location}
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[var(--accent-primary)]"
                >
                  <Mail size={14} aria-hidden="true" /> {profile.email}
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--accent-primary)]"
                >
                  <Github size={14} aria-hidden="true" /> GitHub
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[var(--accent-primary)]"
                >
                  <Linkedin size={14} aria-hidden="true" /> LinkedIn
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-secondary no-print"
            >
              <Printer size={16} aria-hidden="true" /> Print / Save PDF
            </button>
          </div>

          <section className="mt-10 max-w-3xl">
            <p className="eyebrow-mono mb-2">Summary</p>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {resumeData.summary}
            </p>
          </section>

          <section className="mt-12 border-t border-[var(--border-default)] pt-10">
            <p className="eyebrow-mono mb-4">Technical Capabilities</p>
            <div className="grid gap-6 md:grid-cols-3">
              {resumeData.skills.map((group) => (
                <div key={group.group} className="surface-card p-5">
                  <h2 className="mb-3 text-base font-bold">{group.group}</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="meta-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-[var(--border-default)] pt-10">
            <p className="eyebrow-mono mb-6">Experience &amp; Initiatives</p>
            <div className="space-y-8">
              {resumeData.experience.map((entry) => (
                <article key={entry.role} className="surface-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-xl font-bold">{entry.role}</h2>
                    <span className="font-mono-meta text-xs text-[var(--accent-primary)]">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-1 mb-4 text-sm font-medium text-[var(--text-primary)]">
                    {entry.organization}
                  </p>
                  <ul className="m-0 space-y-2 pl-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-[var(--border-default)] pt-10">
            <p className="eyebrow-mono mb-6">Education</p>
            {resumeData.education.map((edu) => (
              <article key={edu.institution} className="surface-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-bold">{edu.credential}</h2>
                  <span className="font-mono-meta text-xs text-[var(--text-secondary)]">
                    {edu.location}
                  </span>
                </div>
                <p className="mt-1 mb-3 text-sm font-medium text-[var(--text-primary)]">
                  {edu.institution}
                </p>
                <p className="m-0 text-sm text-[var(--text-secondary)]">{edu.details}</p>
              </article>
            ))}
          </section>

          <div className="no-print mt-12 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              Browse Case Studies
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Me
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
