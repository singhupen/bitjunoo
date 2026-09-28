import { ArrowRight, Mail } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-accent-600 px-8 py-16 sm:px-16 sm:py-20">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-400/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              Ready to Start Your Project?
            </h2>
            <p className="text-brand-100 text-lg mb-8">
              Let&apos;s talk about your idea. Get a free, no-obligation consultation
              with our technical team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@bitjunoo.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-5 h-5" />
                hello@bitjunoo.com
              </a>
              <a
                href="mailto:hello@bitjunoo.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-900/30 backdrop-blur text-white font-semibold border border-white/30 hover:bg-brand-900/50 transition-all"
              >
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
