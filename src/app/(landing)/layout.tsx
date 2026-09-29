import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-royal-blue/20 selection:text-royal-blue">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
