import Link from 'next/link';
import { Globe, Briefcase, Code, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  { label: 'Web App Development', href: '/services' },
  { label: 'Mobile App Engineering', href: '/services' },
  { label: 'Enterprise .NET Systems', href: '/services' },
  { label: 'Cloud & DevOps Architecture', href: '/services' },
  { label: 'AI Automation & Agents', href: '/services' },
];

const socials = [
  { icon: Globe, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Code, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient background brand glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1560px] mx-auto px-3 sm:px-5 lg:px-7 xl:px-8 py-10 sm:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-3">
              <img src="/icon.png" alt="BitJunoo Logo" className="h-9 md:h-10 w-auto object-contain" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 max-w-xs">
              Where systemic engineering logic (<span className="text-royal-blue font-semibold">Bit</span>) meets relentless passion & drive (<span className="text-purple font-semibold">Junoo</span>). High-performance software engineering for scaling enterprises.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-blue/50 hover:bg-cyan-blue/15 text-slate-300 hover:text-cyan-blue transition-all"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-3 text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-royal-blue inline-block" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-cyan-blue transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-xs text-royal-blue opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-3 text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-purple inline-block" />
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-cyan-blue transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-xs text-purple opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-heading text-white font-semibold mb-3 text-sm sm:text-base tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-cyan-blue inline-block" />
              Get in Touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@bitjunoo.com"
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-cyan-blue transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 mt-0.5 text-cyan-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                  hello@bitjunoo.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918882434777"
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400 hover:text-cyan-blue transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 mt-0.5 text-cyan-blue flex-shrink-0 group-hover:scale-110 transition-transform" />
                  +91-88824 34777
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-cyan-blue flex-shrink-0" />
                New Delhi, India
              </li>
            </ul>

            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-royal-blue/15 border border-royal-blue/30 text-cyan-blue text-xs font-semibold hover:bg-royal-blue/25 hover:border-royal-blue/50 transition-all"
              >
                Schedule Architecture Review
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            &copy; {new Date().getFullYear()} <img src="/icon.png" alt="BitJunoo Logo" className="h-4 sm:h-5 w-auto object-contain mx-1" />. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link href="/about" className="text-xs sm:text-sm text-slate-500 hover:text-cyan-blue transition-colors">About Us</Link>
            <Link href="/services" className="text-xs sm:text-sm text-slate-500 hover:text-cyan-blue transition-colors">Services</Link>
            <Link href="/contact" className="text-xs sm:text-sm text-slate-500 hover:text-cyan-blue transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}