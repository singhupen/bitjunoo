import Navbar from '@/components/layouts/Navbar';
import Hero from '@/components/sections/Hero';
import VideoSection from '@/components/sections/VideoSection';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/layouts/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <VideoSection />
        <Services />
        <WhyChooseUs />
        <TechStack />
        <Portfolio />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;