import { Mail, Phone, MapPin, Calendar, Clock, MessageSquare, ArrowRight } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="space-y-6">
      {/* Primary Card */}
      <div className="rounded-3xl p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-royal-blue/30 text-white border border-royal-blue/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-blue/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-blue/15 border border-cyan-blue/30 text-cyan-blue text-xs font-semibold mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>DIRECT CHANNELS</span>
          </div>

          <h3 className="font-heading text-2xl font-bold text-white mb-2">
            Talk to Principal Engineers
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            We don&apos;t use intermediary sales reps. You will speak directly with experienced software architects who understand code, scale, and deadlines.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <a
              href="mailto:hello@bitjunoo.com"
              className="flex items-center gap-3.5 text-sm text-slate-200 hover:text-cyan-blue transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-blue group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Direct Email</div>
                <div className="font-semibold text-white">hello@bitjunoo.com</div>
              </div>
            </a>

            <a
              href="tel:+918882434777"
              className="flex items-center gap-3.5 text-sm text-slate-200 hover:text-cyan-blue transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-blue group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Direct Phone & WhatsApp</div>
                <div className="font-semibold text-white">+91-88824 34777</div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 text-sm text-slate-200">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-blue">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Headquarters</div>
                <div className="font-semibold text-white">New Delhi, India (Global Remote Squads)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLA Card */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
        <h4 className="font-heading font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-royal-blue" />
          Average Response Times
        </h4>
        <ul className="text-xs text-slate-600 space-y-2">
          <li className="flex items-center justify-between">
            <span>Inquiry Acknowledgment:</span>
            <strong className="text-slate-900">&lt; 2 Hours</strong>
          </li>
          <li className="flex items-center justify-between">
            <span>Architecture Blueprint & Estimate:</span>
            <strong className="text-slate-900">&lt; 48 Hours</strong>
          </li>
          <li className="flex items-center justify-between">
            <span>Engineering Pod Kickoff:</span>
            <strong className="text-slate-900">Within 5-7 Business Days</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
