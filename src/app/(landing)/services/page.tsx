import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import DeliveryFramework from "@/components/services/DeliveryFramework";
import EngagementModels from "@/components/services/EngagementModels";

export const metadata: Metadata = {
  title: "Engineering Services | BitJunoo - Web, Mobile, .NET & Cloud Systems",
  description: "Explore BitJunoo's enterprise software services: Next.js web applications, React Native mobile apps, high-throughput .NET 9 microservices, Cloud DevOps, and AI automation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="SERVICES & ARCHITECTURE"
        title="Engineering Resilient"
        titleHighlight="Digital Systems"
        description="From sub-second frontend web applications to high-throughput .NET 9 backends and autonomous cloud pipelines, we engineer software built for massive scale."
      />

      <ServicesCatalog />
      <DeliveryFramework />
      <EngagementModels />

      <CTASection
        title="Have an Ambitious Technical"
        highlight="Project in Mind?"
        description="Consult with our lead architects to discuss requirements, feasibility, tech stacks, and delivery timelines. No sales fluff — just high-caliber technical dialogue."
        buttonText="Book Architecture Review"
      />
    </>
  );
}
