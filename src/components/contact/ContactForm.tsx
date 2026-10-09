"use client";

import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Clock, User, Mail, Building2, Phone, Code, FileText, FileSignature, ArrowRight } from "lucide-react";

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
  "Flexible / Retainer",
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
    <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-slate-800 relative z-10">
      
      <div className="flex items-start gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-cyan-blue/10 flex items-center justify-center text-blue-600 dark:text-cyan-blue shrink-0 border border-blue-100 dark:border-cyan-blue/20">
          <FileSignature className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <h2 className="font-heading text-[22px] sm:text-[26px] font-extrabold text-slate-900 dark:text-white mb-1 leading-tight">
            Request Technical Discovery
          </h2>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium">
            Tell us about your project. We respond within 2 business hours.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Inquiry Received!
          </h3>
          <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. A Principal Engineer will review your specs and contact you at <strong className="text-blue-600 dark:text-cyan-blue">{formData.email}</strong> within 2 hours.
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
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 stroke-[2]" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4 stroke-[2]" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Company and Phone */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Company / Organization
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4 stroke-[2]" />
                </div>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Inc."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Phone / WhatsApp (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4 stroke-[2]" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all"
                />
              </div>
            </div>
          </div>

          {/* Service Selector */}
          <div>
            <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Primary Engineering Need <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600 dark:text-cyan-blue">
                <Code className="w-4 h-4 stroke-[2]" />
              </div>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-bold transition-all cursor-pointer appearance-none"
              >
                {services.map((s) => (
                  <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                    {s}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Estimated Budget Bracket */}
          <div>
            <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-2">
              Estimated Budget Bracket
            </label>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setFormData({ ...formData, budget: b })}
                  className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all duration-300 cursor-pointer ${
                    formData.budget === b
                      ? "bg-[#007AFF] text-white shadow-md shadow-blue-500/25 border-transparent"
                      : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Message / Project Details */}
          <div>
            <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Project Description & Requirements <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400">
                <FileText className="w-4 h-4 stroke-[2]" />
              </div>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly describe what you're looking to engineer, target timeline, or existing technical challenges..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-[13px] font-medium transition-all resize-none"
              />
              <div className="absolute bottom-3 right-4 text-[10px] text-slate-400 font-medium">
                0/1000
              </div>
            </div>
          </div>

          {/* Submit and Assurance */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#007AFF] to-[#00D4FF] text-white font-bold text-[15px] shadow-[0_10px_20px_rgba(0,122,255,0.25)] hover:shadow-[0_15px_30px_rgba(0,122,255,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 transition-all cursor-pointer group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Processing Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Discovery Request</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                100% Confidential (Strict Mutual NDA)
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                2-Hour SLA Response
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Your Information is Safe
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
