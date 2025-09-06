import Link from 'next/link';
import { getFeaturedProjects } from '../lib/projects';
import ProjectCard from '../components/ProjectCard';
import HeroSection from '../components/HeroSection';
import Script from 'next/script';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://philgreene.net';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Real Results Section */}
      <section className="py-20 bg-accent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl font-display">
              Real Results, Real Growth
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              From Etsy scaling to SaaS launches, here’s what I’ve actually
              built and achieved
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 */}
            <div className="card card-hover text-center border-accent-green/30 hover:border-accent-green/50">
              <div className="mb-4 text-4xl">🚀</div>
              <div className="text-2xl font-bold text-accent-green mb-2">10x</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                Year-over-Year Growth
              </div>
              <div className="text-xs text-foreground/70">
                Achieved 10x Etsy shop revenue growth —
                <Link href="/projects/etsy-analytics" className="underline">
                  see case study
                </Link>
                .
              </div>
            </div>

            {/* Stat 2 */}
            <div className="card card-hover text-center border-accent-orange/30 hover:border-accent-orange/50">
              <div className="mb-4 text-4xl">📊</div>
              <div className="text-2xl font-bold text-accent-orange mb-2">20+</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                Monthly Orders & Insights
              </div>
              <div className="text-xs text-foreground/70">
                Proved demand in competitive niches and gained access to
                advanced analytics.
              </div>
            </div>

            {/* Stat 3 */}
            <div className="card card-hover text-center border-secondary/30 hover:border-secondary/50">
              <div className="mb-4 text-4xl">⚡</div>
              <div className="text-2xl font-bold text-secondary mb-2">3</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                SaaS Prototypes in 12 Months
              </div>
              <div className="text-xs text-foreground/70">
                CronPost, LegalLeaflet, Etsy Analytics — built and tested in the
                market.
              </div>
            </div>

            {/* Stat 4 */}
            <div className="card card-hover text-center border-accent-lime/30 hover:border-accent-lime/50">
              <div className="mb-4 text-4xl">⏰</div>
              <div className="text-2xl font-bold text-accent-lime mb-2">80%</div>
              <div className="text-sm font-semibold text-card-foreground mb-2">
                Time Saved with Automation
              </div>
              <div className="text-xs text-foreground/70">
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

      {/* Projects Grid (Asymmetric, Staggered) */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl font-display">Projects</h2>
            <p className="mt-4 text-lg text-foreground/70">Creative commerce, smart contracts, and AI automation.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {/* Stellar Styles & More → Creative commerce. */}
            <div className="card card-hover border-accent-lime/30 hover:border-accent-lime/50 group lg:translate-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-lime to-accent-orange rounded-xl flex items-center justify-center text-secondary-foreground text-2xl font-bold">
                  SS
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-accent-lime transition-colors">Stellar Styles & More</h3>
                  <p className="text-foreground/70 mb-3">Creative commerce.</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full">E-commerce</span>
                    <span className="px-2 py-1 bg-accent-orange/10 text-accent-orange rounded-full">Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LegalLeaflet → Smart contracts for freelancers. */}
            <div className="card card-hover border-accent-orange/30 hover:border-accent-orange/50 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-lime rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  LL
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-accent-orange transition-colors">LegalLeaflet</h3>
                  <p className="text-foreground/70 mb-3">Smart contracts for freelancers.</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full">Legal Tech</span>
                    <span className="px-2 py-1 bg-accent-green/10 text-accent-green rounded-full">AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CronPost → AI content automation. */}
            <div className="card card-hover border-accent-green/30 hover:border-accent-green/50 group lg:-translate-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-green to-secondary rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                  CP
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-accent-green transition-colors">CronPost</h3>
                  <p className="text-foreground/70 mb-3">AI content automation.</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full">Automation</span>
                    <span className="px-2 py-1 bg-accent-orange/10 text-accent-orange rounded-full">Social</span>
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
            <h2 className="text-3xl font-bold sm:text-4xl font-display">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Showcasing my expertise in data analysis, automation, and
              full-stack development
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-secondary underline-grow">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl font-display">What I Do</h2>
            <p className="mt-4 text-lg text-foreground/70">Comprehensive solutions for data-driven businesses</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="card card-hover border-accent-green/30 hover:border-accent-green/50">
              <div className="mb-4 text-3xl">📈</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Data Analysis & BI
              </h3>
              <p className="text-foreground/70">
                Transform raw data into actionable insights with custom
                dashboards, predictive modeling, and automated reporting
                systems.
              </p>
            </div>

            <div className="card card-hover border-accent-orange/30 hover:border-accent-orange/50">
              <div className="mb-4 text-3xl">🤖</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                AI & Automation
              </h3>
              <p className="text-foreground/70">
                Build intelligent systems that automate workflows, analyze
                documents, and optimize business processes using cutting-edge AI
                technologies.
              </p>
            </div>

            <div className="card card-hover border-secondary/30 hover:border-secondary/50">
              <div className="mb-4 text-3xl">💻</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Full Stack Development
              </h3>
              <p className="text-foreground/70">
                Create scalable web applications from concept to deployment,
                with modern frameworks and cloud-native architectures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-secondary via-accent-green to-accent-orange px-8 py-12 text-center shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl font-display">Work with me</h2>
            <p className="mb-8 text-xl text-white/90">Collabs, shop, or SaaS — let’s build something that pays for itself.</p>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-secondary hover:bg-gray-100 hover:text-accent-green underline-grow"
            >
              Get in touch
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
          '@context': 'https://schema.org',
          '@type': 'Service',
          provider: {
            '@type': 'Person',
            name: 'Phil Greene',
            url: siteUrl,
          },
          serviceType: 'Creator Automation & SaaS Development',
          areaServed: 'Worldwide',
        })}
      </Script>
    </div>
  );
}
