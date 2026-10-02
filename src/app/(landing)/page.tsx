import Hero from '@/components/sections/Hero';
import VideoSection from '@/components/sections/VideoSection';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import CTABanner from '@/components/sections/CTABanner';

export const metadata = {
  title: "BitJunoo | Enterprise IT Consultancy & Digital Engineering",
  description: "BitJunoo crafts high-performance web applications, enterprise-grade .NET backends, and cloud architectures for scaling enterprises.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <VideoSection />
      <Services />
      <WhyChooseUs />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <CTABanner />
    </>
  );
}