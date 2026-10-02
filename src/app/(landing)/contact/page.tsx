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
      />

      <section className="py-10 sm:py-14 bg-slate-950 relative overflow-hidden border-b border-slate-800/80">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-cyan-blue/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-royal-blue/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
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
