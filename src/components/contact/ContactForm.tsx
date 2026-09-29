"use client";

import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

const services = [
  "Web Application (Next.js/React)",
  "Mobile App (iOS/Android)",
  "Enterprise .NET 9 Backend",
  "Cloud & DevOps Architecture",
  "AI & Automation Integration",
  "Code Audit & Refactoring",
];

const budgetRanges = [
  "< $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000+",
  "Flexible / Retainer Squad",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: services[0],
    budget: budgetRanges[1],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 lg:p-8 border border-slate-200/80 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-0.5">
            Request Technical Discovery
          </h2>
          <p className="text-xs text-slate-500">
            Tell us about your project. We respond within 2 business hours.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Engineers Available</span>
        </div>
      </div>

      {submitted ? (
        <div className="py-8 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="font-heading text-xl font-bold text-slate-900 mb-1.5">
            Inquiry Received Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Thank you, <strong className="text-slate-900">{formData.name}</strong>. A Principal Engineer from BitJunoo will review your specs and contact you at <strong className="text-slate-900">{formData.email}</strong> within 2 hours with an initial feasibility assessment.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                service: services[0],
                budget: budgetRanges[1],
                message: "",
              });
            }}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name and Email */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Johnson"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-xs sm:text-sm bg-slate-50/50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-xs sm:text-sm bg-slate-50/50"
              />
            </div>
          </div>

          {/* Row 2: Company and Phone */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company Inc."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-xs sm:text-sm bg-slate-50/50"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-xs sm:text-sm bg-slate-50/50"
              />
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Primary Engineering Need
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-xs sm:text-sm bg-slate-50/50"
            >
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Estimated Budget Bracket */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Estimated Budget Bracket
            </label>
            <div className="flex flex-wrap gap-1.5">
              {budgetRanges.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setFormData({ ...formData, budget: b })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    formData.budget === b
                      ? "bg-royal-blue text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Message / Project Details */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Project Description & Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Briefly describe what you're looking to engineer, target timeline, or existing technical challenges..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-blue focus:border-transparent text-xs sm:text-sm bg-slate-50/50 resize-none"
            />
          </div>

          {/* Submit and Assurance */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-royal-blue via-deep-blue to-purple text-white font-bold text-sm shadow-md shadow-royal-blue/30 hover:shadow-royal-blue/50 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Processing Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Discovery Request</span>
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-royal-blue" />
                100% Confidential (Strict Mutual NDA)
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-blue" />
                2-Hour SLA Response
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
