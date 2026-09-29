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
    <section className="py-20 bg-slate-50 border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-2xl bg-royal-blue/10 text-royal-blue flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          The BitJunoo Engineering Dispatch
        </h2>

        <p className="text-base text-slate-600 max-w-xl mx-auto mb-8">
          Bi-weekly architecture breakdowns, production post-mortems, and performance benchmarks curated for engineering leaders, CTOs, and principal developers.
        </p>

        {subscribed ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 max-w-md mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-base mb-1">You&apos;re Subscribed!</h3>
            <p className="text-xs text-emerald-700">Thank you for joining. Look out for our next deep-dive engineering dispatch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              required
              className="flex-1 px-5 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-sm bg-white"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-royal-blue to-purple text-white font-bold text-sm shadow-md shadow-royal-blue/20 hover:shadow-royal-blue/40 hover:-translate-y-0.5 transition-all"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-royal-blue" />
          <span>Strictly technical insights. No marketing spam. Unsubscribe anytime.</span>
        </div>
      </div>
    </section>
  );
}
