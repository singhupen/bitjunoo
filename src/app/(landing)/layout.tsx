import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-royal-blue/30 selection:text-white relative">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  );
}
