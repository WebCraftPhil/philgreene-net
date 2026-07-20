import { Switch, Route, useLocation } from "wouter";
import { useEffect, useState } from "react";
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
import AiReceptionSection from "@/components/AiReceptionSection";
import RetentionSection from "@/components/RetentionSection";
import GuidedLeadAssistant from "@/components/GuidedLeadAssistant";
import type { AuditPrefill, PackageId } from "@/types/audit";
import { packageNames } from "@/lib/assistant";
import { trackEvent } from "@/lib/analytics";

function HomePage() {
  const [auditPrefill, setAuditPrefill] = useState<AuditPrefill | undefined>()

  const sendToAudit = (prefill?: AuditPrefill) => {
    if (prefill) setAuditPrefill(prefill)
    window.requestAnimationFrame(() => document.querySelector('#audit')?.scrollIntoView({ behavior: 'smooth' }))
  }

  const selectPackage = (selectedPackage: PackageId) => {
    trackEvent('package_selected', { package: selectedPackage })
    sendToAudit({
      websiteUrl: '',
      businessType: '',
      problem: `I am interested in the ${packageNames[selectedPackage]} package.`,
      selectedPackage,
    })
  }

  return (
    <>
      <SeoHead
        title="Local Business Websites & Automation | Phil Greene"
        description="Conversion-focused websites, lead capture, follow-up, AI reception, and review-request systems for owner-operated local service businesses."
        canonicalPath="/"
      />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <ServicesSection />
        <AiReceptionSection />
        <RetentionSection />
        <PilotSection onSelectPackage={selectPackage} />
        <ProofSection />
        <AboutSection />
        <ContactSection prefill={auditPrefill} />
      </main>
      <GuidedLeadAssistant onComplete={sendToAudit} />
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
