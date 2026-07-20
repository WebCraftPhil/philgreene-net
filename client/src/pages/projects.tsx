import { ArrowRight, BarChart3, Bot, Globe2, ShoppingBag } from 'lucide-react'
import SeoHead from '@/components/SeoHead'

const capabilities = [
  {
    icon: BarChart3,
    title: 'Analytics and reporting',
    description: 'SEO opportunity reporting and practical dashboards that turn scattered data into clear next steps.',
    examples: ['Manchester Junk Hauling SEO analysis', 'Search opportunity reporting'],
  },
  {
    icon: Globe2,
    title: 'Web applications',
    description: 'Responsive products and conversion-focused experiences built around a real user workflow.',
    examples: ['LegalLeaflet contract tools', 'Lead recovery workflow demonstration'],
  },
  {
    icon: Bot,
    title: 'Automation and AI workflows',
    description: 'Connected systems for content, follow-up, data processing, and repeatable operations.',
    examples: ['Local SEO content workflow', 'Marketing production automations'],
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce systems',
    description: 'Hands-on marketplace operations, product analysis, and tooling shaped by running an Etsy business.',
    examples: ['Etsy analytics tools', 'Stellar Styles and More operations'],
  },
]

export default function ProjectsPage() {
  return (
    <main id="main-content" className="projects-page">
      <SeoHead
        title="Technical Work and Projects | Phil Greene"
        description="Selected web applications, analytics, automation, and e-commerce work by Phil Greene."
        canonicalPath="/projects"
      />
      <section className="projects-hero section">
        <div className="site-container">
          <p className="section-label">Selected technical work</p>
          <h1>Technical work organized around business capability</h1>
          <p>
            A focused selection of projects that demonstrate web development, automation, analytics,
            product building, and e-commerce operations. Demonstrations are labeled as demonstrations.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="site-container capability-list">
          {capabilities.map(({ icon: Icon, title, description, examples }, index) => (
            <article key={title}>
              <div className="capability-number">0{index + 1}</div>
              <Icon aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <ul>{examples.map((example) => <li key={example}>{example}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="projects-cta section">
        <div className="site-container">
          <h2>Need the customer-facing system, not just the code?</h2>
          <a className="button button-primary" href="/#audit">Request a Free Audit <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  )
}

