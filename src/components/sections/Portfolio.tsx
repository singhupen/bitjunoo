import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    img: "https://images.pexels.com/photos/12969403/pexels-photo-12969403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "FinSight Analytics Dashboard",
    desc: "A real-time financial analytics platform with custom charting, role-based access, and automated reporting.",
    tag: "Web App",
    tagColor: "bg-brand-100 text-brand-700",
  },
  {
    img: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "ShopGo Mobile Commerce",
    desc: "A cross-platform mobile shopping app with secure checkout, push notifications, and loyalty rewards.",
    tag: "Mobile App",
    tagColor: "bg-accent-100 text-accent-700",
  },
  {
    img: "https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "TeamFlow Project Hub",
    desc: "An enterprise .NET-based project management suite with real-time collaboration and workflow automation.",
    tag: "Enterprise",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-900 mt-3 mb-4">
              Projects That Speak for Themselves
            </h2>
            <p className="text-slate-600">
              A selection of products we&apos;ve built for clients across fintech,
              e-commerce, and enterprise SaaS.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-accent-500 transition-colors whitespace-nowrap"
          >
            Start your project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-900/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent" />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${p.tagColor}`}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-brand-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                  View case study
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
