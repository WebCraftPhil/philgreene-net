import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'wouter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import AboutPage from '@/pages/about'
import AccessibilityPage from '@/pages/accessibility'
import ArticlePage from '@/pages/article'
import ContactPage from '@/pages/contact'
import CookiePolicyPage from '@/pages/cookie-policy'
import DisclaimerPage from '@/pages/disclaimer'
import HomePage from '@/pages/home'
import NotFound from '@/pages/not-found'
import NowPage from '@/pages/now'
import PrivacyPage from '@/pages/privacy'
import ProjectDetailPage from '@/pages/project-detail'
import ProjectsPage from '@/pages/projects'
import RefundPolicyPage from '@/pages/refund-policy'
import ResumePage from '@/pages/resume'
import TermsPage from '@/pages/terms'
import WritingPage from '@/pages/writing'

function RedirectRoute({ to }: { to: string }) {
  const [, navigate] = useLocation()

  useEffect(() => {
    navigate(to, { replace: true })
  }, [navigate, to])

  return null
}

function ScrollToTop() {
  const [location] = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <div className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/projects/:slug" component={ProjectDetailPage} />
            <Route path="/writing" component={WritingPage} />
            <Route path="/writing/:slug" component={ArticlePage} />
            <Route path="/now" component={NowPage} />
            <Route path="/resume" component={ResumePage} />
            <Route path="/contact" component={ContactPage} />

            {/* Legacy URL Redirects */}
            <Route path="/website-checkup">
              <RedirectRoute to="/projects/iron-and-ink-systems" />
            </Route>
            <Route path="/privacy">
              <RedirectRoute to="/privacy-policy" />
            </Route>
            <Route path="/terms-of-service">
              <RedirectRoute to="/terms" />
            </Route>
            <Route path="/cookies">
              <RedirectRoute to="/cookie-policy" />
            </Route>
            <Route path="/returns">
              <RedirectRoute to="/refund-policy" />
            </Route>
            <Route path="/accessibility-statement">
              <RedirectRoute to="/accessibility" />
            </Route>

            {/* Legal Pages */}
            <Route path="/privacy-policy" component={PrivacyPage} />
            <Route path="/terms" component={TermsPage} />
            <Route path="/cookie-policy" component={CookiePolicyPage} />
            <Route path="/refund-policy" component={RefundPolicyPage} />
            <Route path="/disclaimer" component={DisclaimerPage} />
            <Route path="/accessibility" component={AccessibilityPage} />

            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
