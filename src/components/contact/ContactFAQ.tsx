"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How soon can BitJunoo start our project?",
    a: "Following an initial discovery session and scope alignment, we typically allocate our dedicated engineering squads within 5 to 7 business days. For urgent enterprise staff augmentation, engineers can be onboarded in as little as 48 hours.",
  },
  {
    q: "How do you protect our intellectual property (IP)?",
    a: "We sign a comprehensive, legally binding mutual NDA prior to discussing any sensitive technical architecture. All source code, Docker assets, configuration files, and architectural designs belong 100% to your organization from the first commit.",
  },
  {
    q: "How do you manage communication and sprint progress?",
    a: "We integrate directly into your workflow: dedicated Slack/Discord channels, real-time Jira/Linear tracking, asynchronous video walk-throughs, and clickable staging deployments at the end of every 1-2 week sprint.",
  },
  {
    q: "Can you take over or rescue an existing legacy codebase?",
    a: "Yes. A significant portion of our work involves auditing, refactoring, and modernizing legacy codebases (such as migrating legacy .NET Framework backends to .NET 9, or updating legacy React code to Next.js 16 App Router).",
  },
  {
    q: "What post-launch SLA and emergency support do you provide?",
    a: "Every engagement includes a 30-day post-launch warranty. For ongoing production systems, we offer 24/7 incident response SLAs, real-time error telemetry monitoring, and proactive monthly security patches.",
  },
];

export default function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-10 sm:py-14 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-royal-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-blue/10 border border-cyan-blue/20 text-cyan-blue text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMONLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Everything you need to know about partnering with BitJunoo for your software engineering.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={faq.q}
                className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700/80 transition-all backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 font-heading font-bold text-white hover:text-cyan-blue transition-colors text-xs sm:text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-cyan-blue" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
