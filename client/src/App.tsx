import { Switch, Route, useLocation } from 'wouter'
import { queryClient } from './lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CookieNotice from '@/components/CookieNotice'
import NotFound from '@/pages/not-found'
import PrivacyPolicyPage from '@/pages/privacy-policy'
import TermsPage from '@/pages/terms'
import CookiePolicyPage from '@/pages/cookie-policy'
import RefundPolicyPage from '@/pages/refund-policy'
import DisclaimerPage from '@/pages/disclaimer'
import AccessibilityPage from '@/pages/accessibility'
import ContactPage from '@/pages/contact'
import { usePageMeta } from '@/hooks/usePageMeta'

function HomePage() {
  const { theme, toggleTheme } = useTheme()

  usePageMeta({
    title: 'Phil Greene | Full-Stack Developer Portfolio',
    description:
      'Portfolio of Phil Greene featuring full-stack projects, services, and contact information for collaborations.',
    canonicalPath: '/',
  })

  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:border focus:border-border"
      >
        Skip to main content
      </a>
      <Header onThemeToggle={toggleTheme} isDark={theme === 'dark'} />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />

        <section aria-label="Compliance links" className="py-10 border-t border-border">
          <div className="max-w-6xl mx-auto px-4 text-sm text-muted-foreground space-y-2">
            <p>Legal and compliance information:</p>
            <p className="flex flex-wrap gap-x-4 gap-y-2">
              <a className="text-primary underline" href="/privacy-policy">Privacy Policy</a>
              <a className="text-primary underline" href="/terms">Terms</a>
              <a className="text-primary underline" href="/accessibility">Accessibility</a>
              <a className="text-primary underline" href="/contact">Contact</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function AppLayout() {
  const [location] = useLocation()

  return (
    <div className="min-h-screen">
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/cookie-policy" component={CookiePolicyPage} />
        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/accessibility" component={AccessibilityPage} />
        <Route component={NotFound} />
      </Switch>
      {location !== '/' && <Footer />}
      <CookieNotice />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppLayout />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
