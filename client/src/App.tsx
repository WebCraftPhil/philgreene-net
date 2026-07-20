import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AboutSection from "@/components/AboutSection";
import SolutionSection from "@/components/SolutionSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import PilotSection from "@/components/PilotSection";
import ProofSection from "@/components/ProofSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import NotFound from "@/pages/not-found";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";
import CookiePolicyPage from "@/pages/cookie-policy";
import RefundPolicyPage from "@/pages/refund-policy";
import DisclaimerPage from "@/pages/disclaimer";
import AccessibilityPage from "@/pages/accessibility";
import ContactPage from "@/pages/contact";
import ProjectsPage from "@/pages/projects";

function HomePage() {
  return (
    <>
      <SeoHead
        title="Local Business Lead Recovery Systems | Phil Greene"
        description="Conversion-focused websites, missed-call text-back, CRM automation, and lead follow-up systems for local service businesses in Manchester, NH and beyond."
        canonicalPath="/"
      />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <ServicesSection />
        <PilotSection />
        <ProofSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}

function RedirectRoute({ to }: { to: string }) {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} />

        <Route path="/projects" component={ProjectsPage} />

        <Route path="/privacy-policy" component={PrivacyPage} />
        <Route path="/privacy">
          <RedirectRoute to="/privacy-policy" />
        </Route>

        <Route path="/terms" component={TermsPage} />
        <Route path="/terms-of-service">
          <RedirectRoute to="/terms" />
        </Route>

        <Route path="/cookie-policy" component={CookiePolicyPage} />
        <Route path="/cookies">
          <RedirectRoute to="/cookie-policy" />
        </Route>

        <Route path="/refund-policy" component={RefundPolicyPage} />
        <Route path="/returns">
          <RedirectRoute to="/refund-policy" />
        </Route>

        <Route path="/disclaimer" component={DisclaimerPage} />

        <Route path="/accessibility" component={AccessibilityPage} />
        <Route path="/accessibility-statement">
          <RedirectRoute to="/accessibility" />
        </Route>

        <Route path="/contact" component={ContactPage} />

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return <AppLayout />;
}

export default App;
