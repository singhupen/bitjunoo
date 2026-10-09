import { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
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
      <PortfolioHero />

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
