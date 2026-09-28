import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: (
      <>
        <img src="/icon.png" alt="BitJunoo Logo" className="inline-block h-4 w-auto mx-1 -mt-1" /> transformed our legacy system into a modern web platform. Their team was responsive, professional, and delivered ahead of schedule. Our user engagement doubled within three months.
      </>
    ),
    name: "Sarah Mitchell",
    role: "CEO, FinSight Technologies",
    initials: "SM",
    color: "from-brand-600 to-brand-500",
  },
  {
    quote: (
      <>
        The mobile app <img src="/icon.png" alt="BitJunoo Logo" className="inline-block h-4 w-auto mx-1 -mt-1" /> built for us exceeded every expectation. Clean code, beautiful UI, and seamless App Store approval. They genuinely care about the product.
      </>
    ),
    name: "James Okoro",
    role: "Founder, ShopGo",
    initials: "JO",
    color: "from-accent-500 to-accent-400",
  },
  {
    quote: (
      <>
        We hired <img src="/icon.png" alt="BitJunoo Logo" className="inline-block h-4 w-auto mx-1 -mt-1" /> to rebuild our .NET backend and the results were outstanding. Performance improved 40%, and their ongoing support has been invaluable.
      </>
    ),
    name: "Emily Chen",
    role: "CTO, TeamFlow Inc.",
    initials: "EC",
    color: "from-emerald-500 to-emerald-400",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider">
            Client Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-900 mt-3 mb-4">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-slate-600 flex items-center justify-center flex-wrap gap-1">
            Don&apos;t just take our word for it — here&apos;s what our clients have to
            say about working with <img src="/icon.png" alt="BitJunoo Logo" className="h-5 w-auto" />.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <Quote className="w-10 h-10 text-accent-200 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br ${t.color} text-white font-semibold text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-brand-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
