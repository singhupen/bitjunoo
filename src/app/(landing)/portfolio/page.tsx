import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";
import ImpactMetrics from "@/components/portfolio/ImpactMetrics";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | BitJunoo - Digital Engineering Systems",
  description: "Browse BitJunoo's portfolio of mission-critical systems: B2B financial engines, telehealth apps, global logistics portals, and enterprise AI workflows.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        badge="ENGINEERING CASE STUDIES"
        title="Production Systems Built for"
        titleHighlight="Non-Linear Scale"
        description="Explore how our senior engineering pods architect and deliver high-concurrency systems across Fintech, Logistics, Healthcare, and Enterprise AI."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Portfolio" },
        ]}
      />

      <ImpactMetrics />
      <PortfolioShowcase />

      <CTASection
        title="Want Architecture Specifics for"
        highlight="Your Upcoming Project?"
        description="We are happy to walk you through our system design choices, code architectures, and benchmark data during a confidential consultation."
        buttonText="Request Technical Walkthrough"
      />
    </>
  );
}
