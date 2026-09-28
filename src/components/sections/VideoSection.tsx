import React from 'react';

export default function VideoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-accent-50 text-accent-600 text-sm font-semibold mb-4">
            Innovation
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-brand-900 mb-4">
            Shaping the Future with AI & Technology
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Experience our vision for seamless technological integration. We harness the power of artificial intelligence to build smarter, more efficient digital solutions.
          </p>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/10 border border-slate-100 group max-w-5xl mx-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover max-h-[600px] transition-transform duration-700 hover:scale-105"
          >
            <source src="/assets/ai-tech.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end">
            <div className="p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-2">Next-Gen Solutions</h3>
              <p className="text-white/80">Empowering businesses with cutting-edge artificial intelligence.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
