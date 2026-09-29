import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata: Metadata = {
  title: "Contact Us & Architecture Consultation | BitJunoo",
  description: "Schedule a confidential technical discovery session with BitJunoo's lead software architects. 2-hour response SLA and strict mutual NDA protection.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="START A CONVERSATION"
        title="Let's Engineer Your Next"
        titleHighlight="Digital Breakthrough"
        description="Schedule a technical consultation with our principal software architects. We provide immediate feasibility insights, architectural guidance, and scoping estimates."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="py-20 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <ContactInfoCards />
            </div>
          </div>
        </div>
      </section>

      <ContactFAQ />
    </>
  );
}
