import { Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="space-y-4">
      {/* Primary Card */}
      <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/70 border border-slate-800 text-white shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-blue/15 border border-cyan-blue/30 text-cyan-blue text-[11px] font-semibold mb-3">
            <Clock className="w-3 h-3" />
            <span>DIRECT CHANNELS</span>
          </div>

          <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1">
            Talk to Principal Engineers
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            We don&apos;t use intermediary sales reps. You speak directly with experienced software architects who understand code, scale, and deadlines.
          </p>

          <div className="space-y-2.5 pt-3 border-t border-slate-800">
            <a
              href="mailto:hello@bitjunoo.com"
              className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 hover:text-cyan-blue transition-colors group p-2 rounded-xl hover:bg-slate-800/60"
            >
              <div className="w-8 h-8 rounded-lg bg-royal-blue/15 border border-royal-blue/30 flex items-center justify-center text-cyan-blue group-hover:scale-110 group-hover:border-cyan-blue/50 transition-all flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Direct Email</div>
                <div className="font-semibold text-white">hello@bitjunoo.com</div>
              </div>
            </a>

            <a
              href="tel:+918882434777"
              className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 hover:text-cyan-blue transition-colors group p-2 rounded-xl hover:bg-slate-800/60"
            >
              <div className="w-8 h-8 rounded-lg bg-royal-blue/15 border border-royal-blue/30 flex items-center justify-center text-cyan-blue group-hover:scale-110 group-hover:border-cyan-blue/50 transition-all flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Direct Phone & WhatsApp</div>
                <div className="font-semibold text-white">+91-88824 34777</div>
              </div>
            </a>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 p-2">
              <div className="w-8 h-8 rounded-lg bg-royal-blue/15 border border-royal-blue/30 flex items-center justify-center text-cyan-blue flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400">Headquarters</div>
                <div className="font-semibold text-white">New Delhi, India (Global Remote Squads)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLA Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
        <h4 className="font-heading font-bold text-white text-xs sm:text-sm mb-2 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-cyan-blue" />
          Average Response Times
        </h4>
        <ul className="text-xs text-slate-300 space-y-1.5">
          <li className="flex items-center justify-between">
            <span>Inquiry Acknowledgment:</span>
            <strong className="text-cyan-blue">&lt; 2 Hours</strong>
          </li>
          <li className="flex items-center justify-between">
            <span>Architecture Blueprint & Estimate:</span>
            <strong className="text-white">&lt; 48 Hours</strong>
          </li>
          <li className="flex items-center justify-between">
            <span>Engineering Pod Kickoff:</span>
            <strong className="text-white">Within 5-7 Business Days</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
