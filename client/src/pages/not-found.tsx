import { ArrowLeft } from 'lucide-react'
import SeoHead from '@/components/SeoHead'

export default function NotFound() {
  return (
    <main id="main-content" className="projects-page">
      <SeoHead
        title="Page Not Found | Phil Greene"
        description="The page you requested could not be found."
        canonicalPath="/404"
      />
      <section className="projects-hero section">
        <div className="site-container">
          <p className="section-label">404</p>
          <h1>That page is not here.</h1>
          <p>The link may be outdated, or the page may have moved.</p>
          <a className="button button-primary" href="/"><ArrowLeft aria-hidden="true" /> Back to the homepage</a>
        </div>
      </section>
    </main>
  )
}
