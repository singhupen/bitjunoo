import { Mail, Phone, MapPin, Clock, FileText, Rocket, Headphones, ArrowRight } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="space-y-6">
      {/* Primary Card - Direct Contact Channels */}
      <div className="rounded-[24px] p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-slate-800 dark:text-white relative z-10 transition-colors duration-300">
        
        <div className="flex items-start gap-4 mb-6">
          <div className="text-blue-500 shrink-0 mt-0.5">
            <Headphones className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-1">
              Direct Contact Channels
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Talk directly with our engineering team. No intermediaries.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Email */}
          <a
            href="mailto:hello@bitjunoo.com"
            className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-blue/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-blue/10 flex items-center justify-center text-blue-500 dark:text-cyan-blue group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                <Mail className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Email Us</div>
                <div className="text-[14px] font-bold text-slate-900 dark:text-white">hello@bitjunoo.com</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0 mr-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          {/* Phone - Commented out for now */}
          {/* 
          <a
            href="tel:+918882434777"
            className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-blue/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-blue/10 flex items-center justify-center text-blue-500 dark:text-cyan-blue group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                <Phone className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Call / WhatsApp</div>
                <div className="text-[14px] font-bold text-slate-900 dark:text-white">+91-88824 34777</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0 mr-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
          */}

          {/* Location */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-cyan-blue/50 hover:shadow-md transition-all group cursor-default">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-blue/10 flex items-center justify-center text-blue-500 dark:text-cyan-blue shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Headquarters</div>
                <div className="text-[14px] font-bold text-slate-900 dark:text-white">New Delhi, India (Global Remote Squads)</div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-500 shrink-0 mr-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* SLA Card */}
      <div className="rounded-[24px] p-6 sm:p-8 bg-[#F4F9FF] dark:bg-slate-900/40 border border-[#E6F0F9] dark:border-slate-800 relative z-10 transition-colors duration-300">
        
        <div className="flex items-start gap-4 mb-6">
          <div className="text-blue-500 shrink-0 mt-0.5">
            <Clock className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-1">
              Typical Response Times
            </h3>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              We value your time. Here&apos;s what to expect:
            </p>
          </div>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-[13px] font-medium">Inquiry Acknowledgment</span>
            </div>
            <strong className="text-[13px] text-blue-600 dark:text-cyan-blue">&lt; 2 Hours</strong>
          </li>
          <li className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="text-[13px] font-medium">Architecture Blueprint & Estimate</span>
            </div>
            <strong className="text-[13px] text-blue-600 dark:text-cyan-blue">&lt; 48 Hours</strong>
          </li>
          <li className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Rocket className="w-4 h-4 text-blue-500" />
              <span className="text-[13px] font-medium">Engineering Pod Kickoff</span>
            </div>
            <strong className="text-[13px] text-blue-600 dark:text-cyan-blue">Within 5-7 Business Days</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
