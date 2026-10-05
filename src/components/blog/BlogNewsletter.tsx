"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-10 sm:py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden transition-colors duration-300">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-royal-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 text-center relative z-10">
        <div className="w-10 h-10 rounded-xl bg-royal-blue/15 border border-royal-blue/30 text-royal-blue dark:text-cyan-blue flex items-center justify-center mx-auto mb-3 shadow-lg">
          <Mail className="w-5 h-5" />
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight mb-2">
          The BitJunoo Engineering Dispatch
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-5 leading-relaxed">
          Bi-weekly architecture breakdowns, production post-mortems, and performance benchmarks curated for engineering leaders, CTOs, and principal developers.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 max-w-md mx-auto backdrop-blur-sm">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 dark:text-emerald-400 mx-auto mb-1.5" />
            <h3 className="font-bold text-sm mb-0.5 text-slate-900 dark:text-white">You&apos;re Subscribed!</h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300/90">Thank you for joining. Look out for our next deep-dive engineering dispatch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              required
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 focus:outline-none focus:border-royal-blue dark:focus:border-cyan-blue focus:ring-1 focus:ring-royal-blue/30 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-blue via-brand-azure to-brand-cyan text-white font-bold text-xs sm:text-sm shadow-md shadow-royal-blue/20 hover:shadow-royal-blue/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
          <span>Strictly technical insights. No marketing spam. Unsubscribe anytime.</span>
        </div>
      </div>
    </section>
  );
}
