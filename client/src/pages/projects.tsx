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
        title="Work & Demonstrations | Phil Greene"
        description="Honest demonstrations and selected work showing local-business websites, lead capture, automation, analytics, and customer communication systems."
        canonicalPath="/projects"
      />
      <section className="projects-hero section">
        <div className="site-container">
          <p className="section-label">Work &amp; demonstrations</p>
          <h1>Practical examples of websites, automation, and customer journeys.</h1>
          <p>
            A focused selection of work showing how I think through clear interfaces, useful data,
            and connected business systems. Demonstrations are not client case studies or claimed results.
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
          <h2>Want to see what your own website could improve?</h2>
          <a className="button button-primary" href="/#audit">Get My Free Website Audit <ArrowRight aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  )
}
