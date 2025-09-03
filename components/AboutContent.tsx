"use client";

import Link from "next/link";
import { trackEvent } from "../lib/analytics";

export default function AboutContent() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            About Me
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Data-driven problem solver with a passion for building impactful
            solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Who I Am
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I&apos;m a data analyst and full-stack developer with over 4
                  years of experience building data-driven solutions that drive
                  business growth. My expertise spans from AI automation and
                  predictive modeling to scalable web applications and business
                  intelligence systems.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  I specialize in transforming complex business problems into
                  elegant, scalable solutions. Whether it&apos;s automating
                  repetitive tasks with AI, building comprehensive analytics
                  dashboards, or developing full-stack applications, I focus on
                  delivering measurable results that impact the bottom line.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Currently, I&apos;m open to data analyst roles and exciting
                  collaborations that challenge me to push the boundaries of
                  what&apos;s possible with data and technology.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Technical Skills
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Data & Analytics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python",
                      "Pandas",
                      "NumPy",
                      "Scikit-learn",
                      "SQL",
                      "PostgreSQL",
                      "MongoDB",
                      "Tableau",
                      "Power BI",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Web Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "FastAPI",
                      "Docker",
                      "AWS",
                      "Tailwind CSS",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    AI & Automation
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "OpenAI GPT-4",
                      "LangChain",
                      "Automation",
                      "API Integration",
                      "Web Scraping",
                      "RPA",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Git",
                      "GitHub",
                      "Vercel",
                      "Notion",
                      "Slack",
                      "Figma",
                      "Jira",
                      "Linear",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-orange-100 px-3 py-1 text-sm text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Key Achievements
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🚀</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Scaled Products to 10K+ Users
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Built and launched multiple SaaS products that have
                        collectively served over 10,000 active users.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💰</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Generated $2M+ in Revenue
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Data-driven insights and automation solutions have
                        directly contributed to over $2 million in revenue.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        80% Time Savings Through Automation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
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
            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Download Resume
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                Get a detailed overview of my experience, skills, and
                achievements.
              </p>
              <a
                href="/resume-phil-greene.pdf"
                download
                onClick={() => trackEvent("download_resume")}
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Download PDF
              </a>
            </div>

            {/* Current Status */}
            <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-4">
                Current Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-700 dark:text-green-300">
                    Open to data analyst roles
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-700 dark:text-green-300">
                    Available for collaborations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-700 dark:text-green-300">
                    Taking on freelance projects
                  </span>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Interested in working together? I&apos;d love to hear about your
                project.
              </p>
              <Link
                href="/contact"
                onClick={() => trackEvent("book_call")}
                className="inline-flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-white"
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
