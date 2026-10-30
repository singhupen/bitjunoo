"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, ShieldCheck, Clock, User, Mail, Building2, Code, FileText, FileSignature, ArrowRight, ChevronDown, AlertCircle } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const services = [
  "Web Application (Next.js/React)",
  "Mobile App (iOS/Android)",
  "Enterprise .NET 9 Backend",
  "Cloud & DevOps Architecture",
  "AI & Automation Integration",
  "Code Audit & Refactoring",
  "UI/UX Design & Prototyping",
  "Dedicated Offshore Engineering Team",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: services[0],
    message: "",
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close custom dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to submit discovery request. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected network error occurred. Please try again.";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
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
            Tell us about your project. We respond within 2 working days.
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
            Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. A Principal Engineer will review your specs and contact you at <strong className="text-blue-600 dark:text-cyan-blue">{formData.email}</strong> within 2 working days.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setErrorMessage(null);
              setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                service: services[0],
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
          {/* Submission Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-medium flex items-start gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <p className="font-semibold mb-0.5">Unable to Submit Inquiry</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}
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
                <PhoneInput
                  defaultCountry="in"
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  placeholder="91754 25157"
                  className="w-full !flex !items-center !rounded-xl !border !border-slate-200 dark:!border-slate-800 !bg-[#F8FAFC] dark:!bg-slate-900/50 focus-within:!border-blue-500 focus-within:!ring-1 focus-within:!ring-blue-500 transition-all overflow-hidden"
                  inputClassName="!w-full !h-12 !border-none !bg-transparent !text-slate-900 dark:!text-white placeholder:!text-slate-400 !text-[13px] !font-medium focus:!outline-none !px-3.5"
                  countrySelectorStyleProps={{
                    buttonClassName:
                      "!h-12 !px-3.5 !bg-slate-100/70 dark:!bg-slate-800/60 !border-none !border-r !border-slate-200 dark:!border-slate-800 hover:!bg-slate-200/70 dark:hover:!bg-slate-700/60 !transition-colors !cursor-pointer",
                    dropdownStyleProps: {
                      className:
                        "!bg-white dark:!bg-slate-900 !border !border-slate-200 dark:!border-slate-800 !rounded-xl !shadow-2xl !max-h-64 !z-50 !text-slate-800 dark:!text-slate-200 !text-[13px]",
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Custom Service Selector */}
          <div ref={dropdownRef} className="relative">
            <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Primary Engineering Need <span className="text-rose-500">*</span>
            </label>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative flex items-center w-full py-3 pl-11 pr-10 rounded-xl border ${isDropdownOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-800'} bg-[#F8FAFC] dark:bg-slate-900/50 text-slate-900 dark:text-white text-[13px] font-bold transition-all cursor-pointer`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-600 dark:text-cyan-blue">
                <Code className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="block truncate">{formData.service}</span>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                {services.map((s) => (
                  <div
                    key={s}
                    onClick={() => {
                      setFormData({ ...formData, service: s });
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-colors ${
                      formData.service === s 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
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
                {formData.message.length}/1000
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
                2 Working Days SLA Response
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
