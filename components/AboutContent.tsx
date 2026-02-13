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
                  I'm a full-stack developer and beginner data analyst who loves turning complex challenges into simple, intuitive solutions. 
                  I've been sharpening my skills by building real projects that apply both coding and data analysis in practical ways.
                </p>
                <p className="text-lg text-foreground/70 mb-6">
                  Alongside my tech work, I run an Etsy shop, "Stellar Styles and More," where I design and sell home décor, apparel, and accessories. 
                  It's my creative outlet and a way to experiment with building products and managing a business.
                </p>
                <p className="text-lg text-foreground/70">
                  I see technology as the most powerful creative medium of our time—and I'm committed to growing every day as a developer and analyst.
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
                        One Year of Focused Development
                      </h3>
                      <p className="text-foreground/70">
                        Building real-world projects from AI-powered SaaS tools to e-commerce automations,
                        learning by doing and delivering solutions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-accent p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💰</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Etsy Shop Owner & Creator
                      </h3>
                      <p className="text-foreground/70">
                        Running "Stellar Styles and More" - designing and selling products across 
                        home décor, apparel, and accessories while applying tech skills to business growth.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-accent p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Full-Stack & Data Skills
                      </h3>
                      <p className="text-foreground/70">
                        Combining development expertise with growing data analysis skills,
                        turning complex challenges into simple, intuitive solutions.
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
