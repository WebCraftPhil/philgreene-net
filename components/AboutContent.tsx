'use client';

import Link from 'next/link';
import { trackEvent } from '../lib/analytics';

export default function AboutContent() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-display">
            Studio
          </h1>
          <p className="mt-4 text-xl text-foreground/70">
            A small creative studio founded by Phil Greene—building tools, designs, and systems that pay for themselves.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 font-display">Who we are</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg text-foreground/70 mb-6">
                  We operate like a studio: fast, opinionated, quality-obsessed. The work sits at the intersection of creative commerce, legal tech, and automation.
                </p>
                <p className="text-lg text-foreground/70 mb-6">
                  The philosophy is simple: make things beautiful, useful, and profitable. Ship small, iterate quickly, and reuse a consistent visual language across apps, sites, and social.
                </p>
                <p className="text-lg text-foreground/70">
                  Open to collaborations with founders, agencies, and creators.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-display">
                Technical Skills
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Data & Analytics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Python',
                      'Pandas',
                      'NumPy',
                      'Scikit-learn',
                      'SQL',
                      'PostgreSQL',
                      'MongoDB',
                      'Tableau',
                      'Power BI',
                    ].map(skill => (
                      <span
                        key={skill}
                        className="rounded-md bg-secondary/10 px-3 py-1 text-sm text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Web Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React',
                      'Next.js',
                      'TypeScript',
                      'Node.js',
                      'FastAPI',
                      'Docker',
                      'AWS',
                      'Tailwind CSS',
                    ].map(skill => (
                      <span
                        key={skill}
                        className="rounded-md bg-accent-green/10 px-3 py-1 text-sm text-accent-green"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    AI & Automation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'OpenAI GPT-4',
                      'LangChain',
                      'Automation',
                      'API Integration',
                      'Web Scraping',
                      'RPA',
                    ].map(skill => (
                      <span
                        key={skill}
                        className="rounded-md bg-secondary/10 px-3 py-1 text-sm text-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Git',
                      'GitHub',
                      'Vercel',
                      'Notion',
                      'Slack',
                      'Figma',
                      'Jira',
                      'Linear',
                    ].map(skill => (
                      <span
                        key={skill}
                        className="rounded-md bg-accent-orange/10 px-3 py-1 text-sm text-accent-orange"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Highlights */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-display">
                Key Achievements
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-accent p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🚀</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Scaled Products to 10K+ Users
                      </h3>
                      <p className="text-foreground/70">
                        Built and launched multiple SaaS products that have
                        collectively served over 10,000 active users.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-accent p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💰</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Generated $2M+ in Revenue
                      </h3>
                      <p className="text-foreground/70">
                        Data-driven insights and automation solutions have
                        directly contributed to over $2 million in revenue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-accent p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        80% Time Savings Through Automation
                      </h3>
                      <p className="text-foreground/70">
                        Implemented AI-powered automation that reduced manual
                        work by 80% across multiple projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resume Download */}
            <div className="rounded-lg bg-accent p-6">
              <h3 className="font-semibold text-secondary mb-4">
                Download Resume
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Get a detailed overview of my experience, skills, and
                achievements.
              </p>
              <a
                href="/resume-phil-greene.pdf"
                download
                onClick={() => trackEvent('download_resume')}
                className="inline-flex w-full items-center justify-center btn-primary"
              >
                Download PDF
              </a>
            </div>

            {/* Current Status */}
            <div className="rounded-lg bg-accent p-6">
              <h3 className="font-semibold text-secondary mb-4">
                Current Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-green"></div>
                  <span className="text-sm text-foreground/80">
                    Open to founder collabs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-green"></div>
                  <span className="text-sm text-foreground/80">
                    Available for collaborations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent-green"></div>
                  <span className="text-sm text-foreground/80">
                    Taking on freelance projects
                  </span>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="rounded-lg bg-accent p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                Interested in working together? I&apos;d love to hear about your
                project.
              </p>
              <Link
                href="/contact"
                onClick={() => trackEvent('book_call')}
                className="inline-flex w-full items-center justify-center btn-secondary"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
