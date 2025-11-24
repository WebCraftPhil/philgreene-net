import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "../lib/projects";
import ProjectCard from "../components/ProjectCard";
import HeroSection from "../components/HeroSection";
import Script from "next/script";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const services = [
    {
      title: "Revenue Validation Sprint",
      price: "from $1,250",
      description:
        "Fast-track your offer, landing page, and analytics so you can see if revenue is ready to scale.",
      features: [
        "Launch-ready landing page with tracking in 14 days",
        "Offer + positioning tuned to buyer intent",
        "Proof-of-revenue dashboard you can share with stakeholders",
      ],
      accent: "#28965a",
      icon: "🚀",
    },
    {
      title: "Automation & AI Ops",
      price: "from $1,800",
      description:
        "Remove manual busywork with custom automations and AI workflows that keep quality high.",
      features: [
        "Workflow audit to prioritize ROI-positive automations",
        "Custom GPT + no-code flows for content, ops, and customer success",
        "Runbook, monitoring, and team handoff included",
      ],
      accent: "#e09f3e",
      icon: "🤖",
    },
    {
      title: "Conversion & Insights Engine",
      price: "from $1,400",
      description:
        "Turn your data into guardrails: clean tracking, dashboards, and experiments that lift revenue.",
      features: [
        "KPI instrumentation across web, product, and revenue events",
        "Dashboards with weekly signal reports and next best actions",
        "A/B tests and funnel fixes targeting 20–30% lift",
      ],
      accent: "#33658a",
      icon: "📊",
    },
    {
      title: "MVP to Launch (Full Stack)",
      price: "from $4,500",
      description:
        "Design, build, and ship a production-ready MVP with telemetry, payments, and onboarding baked in.",
      features: [
        "Scope, UX, and architecture aligned to revenue milestones",
        "Auth, billing, and usage analytics wired from day one",
        "Launch playbook plus onboarding and lifecycle assets",
      ],
      accent: "#c6f91f",
      icon: "💻",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Verified Proof of Value */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-gradient-coolors text-3xl font-bold sm:text-4xl">
              Verified Proof of Value
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A live, data-driven Printify dashboard showcasing fulfilled orders and revenue growth.
            </p>
          </div>

          <a
            href="https://webcraftphil.github.io/Kimi-Data-Viz-Printify-Insights-11-25/printify_dashboard.html"
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
              <Image
                src="/projects/printify-dashboard.svg"
                alt="Screenshot of a Printify performance dashboard"
                width={1440}
                height={900}
                className="h-auto w-full"
                priority
              />
            </div>
          </a>

          <p className="mt-6 text-center text-base text-muted-foreground sm:text-lg">
            Analyzed 43 weeks of e-commerce data to identify a critical 35% Q2 revenue spike, enabling strategic, profit-first inventory and marketing planning.
          </p>
        </div>
      </section>

      {/* Real Results Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gradient-coolors text-3xl font-bold sm:text-4xl">
              Real Results, Real Growth
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From Etsy scaling to SaaS launches, here’s what I’ve actually
              built and achieved
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 */}
            <div className="card card-hover text-center border-[#28965a]/20 hover:border-[#28965a]/40">
              <div className="mb-4 text-4xl">🚀</div>
              <div className="text-2xl font-bold text-[#28965a] mb-2">
                10x
              </div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                Year-over-Year Growth
              </div>
              <div className="text-xs text-muted-foreground">
                Achieved 10x Etsy shop revenue growth —
                <Link href="/projects/etsy-analytics" className="underline">
                  see case study
                </Link>
                .
              </div>
            </div>

            {/* Stat 2 */}
            <div className="card card-hover text-center border-[#e09f3e]/20 hover:border-[#e09f3e]/40">
              <div className="mb-4 text-4xl">📊</div>
              <div className="text-2xl font-bold text-[#e09f3e] mb-2">20+</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                Monthly Orders & Insights
              </div>
              <div className="text-xs text-muted-foreground">
                Proved demand in competitive niches and gained access to
                advanced analytics.
              </div>
            </div>

            {/* Stat 3 */}
            <div className="card card-hover text-center border-[#33658a]/20 hover:border-[#33658a]/40">
              <div className="mb-4 text-4xl">⚡</div>
              <div className="text-2xl font-bold text-[#33658a] mb-2">3</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                SaaS Prototypes in 12 Months
              </div>
              <div className="text-xs text-muted-foreground">
                CronPost, LegalLeaflet, Etsy Analytics — built and tested in the
                market.
              </div>
            </div>

            {/* Stat 4 */}
            <div className="card card-hover text-center border-[#c6f91f]/20 hover:border-[#c6f91f]/40">
              <div className="mb-4 text-4xl">⏰</div>
              <div className="text-2xl font-bold text-[#c6f91f] mb-2">80%</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                Time Saved with Automation
              </div>
              <div className="text-xs text-muted-foreground">
                Custom AI workflows that cut social posting and launch tasks
                nearly in half —
                <Link href="/projects/cronpost" className="underline">
                  see case study
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Now Building Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gradient-coolors text-3xl font-bold sm:text-4xl">
              Now Building
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Active projects that show I&apos;m iterating, learning, and
              shipping real value
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {/* CronPost */}
            <div className="card card-hover border-[#28965a]/20 hover:border-[#28965a]/40 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#28965a] to-[#c6f91f] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  CP
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-[#28965a] transition-colors">
                    CronPost
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Multi-platform AI content automation that reduces posting
                    time by 80%.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-[#28965a]/10 text-[#28965a] rounded-full">
                      AI Automation
                    </span>
                    <span className="px-2 py-1 bg-[#e09f3e]/10 text-[#e09f3e] rounded-full">
                      Social Media
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* LegalLeaflet */}
            <div className="card card-hover border-[#e09f3e]/20 hover:border-[#e09f3e]/40 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#e09f3e] to-[#c6f91f] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  LL
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-[#e09f3e] transition-colors">
                    LegalLeaflet
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    AI contracts for freelancers, creators, and startups.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-[#33658a]/10 text-[#33658a] rounded-full">
                      Legal Tech
                    </span>
                    <span className="px-2 py-1 bg-[#28965a]/10 text-[#28965a] rounded-full">
                      AI
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Etsy Analytics */}
            <div className="card card-hover border-[#33658a]/20 hover:border-[#33658a]/40 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#33658a] to-[#28965a] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  EA
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-[#33658a] transition-colors">
                    Etsy Analytics
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Finds high‑demand, low‑competition product opportunities
                    with automated scraping and analysis.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-[#33658a]/10 text-[#33658a] rounded-full">
                      E-commerce
                    </span>
                    <span className="px-2 py-1 bg-[#28965a]/10 text-[#28965a] rounded-full">
                      Data Analysis
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stellar Styles */}
            <div className="card card-hover border-[#c6f91f]/20 hover:border-[#c6f91f]/40 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#c6f91f] to-[#e09f3e] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  SS
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-[#c6f91f] transition-colors">
                    Stellar Styles & More
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Profitable POD shop with proven year-over-year growth.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-[#28965a]/10 text-[#28965a] rounded-full">
                      Etsy
                    </span>
                    <span className="px-2 py-1 bg-[#33658a]/10 text-[#33658a] rounded-full">
                      POD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gradient-coolors text-3xl font-bold sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Showcasing my expertise in data analysis, automation, and
              full-stack development
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gradient-coolors text-3xl font-bold sm:text-4xl">
              4 Services Focused on Your ROI.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Clear packages, transparent starter pricing, and deliverables that ship revenue-ready assets—not just tasks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="card card-hover flex flex-col h-full"
                style={{ borderColor: `${service.accent}33` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl" aria-hidden>
                    {service.icon}
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-sm font-semibold"
                    style={{ backgroundColor: `${service.accent}1a`, color: service.accent }}
                  >
                    {service.price}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mt-auto">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-card-foreground">
                      <span className="mt-0.5 text-lg" aria-hidden>
                        ✓
                      </span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#33658a] via-[#28965a] to-[#e09f3e] px-8 py-12 text-center shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Build Something Amazing?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Let&apos;s discuss how I can help you achieve your data and
              development goals.
            </p>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-[#33658a] hover:bg-gray-100 hover:text-[#28965a]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
      <Script
        id="service-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          provider: {
            "@type": "Person",
            name: "Phil Greene",
            url: siteUrl,
          },
          serviceType: "Creator Automation & SaaS Development",
          areaServed: "Worldwide",
        })}
      </Script>
    </div>
  );
}
