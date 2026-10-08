import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TechStack from '@/components/sections/TechStack';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import CTABanner from '@/components/sections/CTABanner';

export const metadata = {
  title: "Bitjuno | Enterprise IT Consultancy & Digital Engineering",
  description: "Bitjuno combines strategic consulting with modern technology to build secure, scalable, and high-performance digital solutions that help businesses grow faster.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <WhyChooseUs />
      <TechStack />
      <Portfolio />
      <Testimonials />
      <CTABanner />
    </>
  );
}