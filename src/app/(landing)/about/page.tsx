import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import AboutMission from "@/components/about/AboutMission";
import CoreValues from "@/components/about/CoreValues";
import CompanyMilestones from "@/components/about/CompanyMilestones";

export const metadata: Metadata = {
  title: "About Us | BitJunoo - Enterprise IT Consultancy & Digital Engineering",
  description: "Learn about BitJunoo: Where systemic logic meets unstoppable passion. Discover our engineering philosophy, mission, core values, and delivery milestones.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="ABOUT BITJUNOO"
        title="Pioneering the Next Era of"
        titleHighlight="Digital Engineering"
        description="We are a senior-led technical consultancy that builds resilient, high-speed software architectures for forward-thinking enterprises and venture-backed startups."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <AboutMission />
      <CoreValues />
      <CompanyMilestones />

      <CTASection
        title="Ready to Partner with"
        highlight="Battle-Tested Engineers?"
        description="Let's discuss your technical roadmap, architecture requirements, and milestone delivery schedules with our lead software architects."
        buttonText="Schedule Technical Discovery"
      />
    </>
  );
}
