import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070E1E] text-slate-800 dark:text-slate-100 selection:bg-royal-blue/30 selection:text-white relative transition-colors duration-300">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
