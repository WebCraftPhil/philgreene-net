import { ArrowLeft } from 'lucide-react'
import { Link } from 'wouter'
import SeoHead from '@/components/SeoHead'

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page Not Found | Phil Greene"
        description="The requested page could not be found."
        canonicalPath="/404"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="max-w-xl">
            <p className="eyebrow-mono">404 / Not Found</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              That page isn&apos;t here.
            </h1>
            <p className="mt-4 text-base text-[var(--text-secondary)]">
              The link may be outdated or the route may have moved during the site redesign.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                <ArrowLeft size={16} aria-hidden="true" /> Return Home
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                Browse Projects
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
