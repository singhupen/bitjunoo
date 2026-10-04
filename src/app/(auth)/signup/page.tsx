import { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";
import AuthVisualSide from "@/components/auth/AuthVisualSide";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account | BitJunoo Enterprise Portal",
  description: "Join BitJunoo — create your author or admin account to access the editorial dashboard.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* ====== LEFT: Visual Side ====== */}
      <div className="hidden lg:block lg:w-1/2 xl:w-5/12 h-screen sticky top-0">
        <AuthVisualSide />
      </div>

      {/* ====== RIGHT: Signup Form ====== */}
      <div className="flex-1 flex flex-col justify-between min-h-screen p-5 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* Top Bar */}
        <div className="w-full max-w-lg mx-auto flex items-center justify-between gap-4 pb-4">
          <Link href="/" className="lg:hidden flex items-center gap-2 group">
            <img
              src="/icon.png"
              alt="BitJunoo Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105 dark:hidden"
            />
            <img
              src="/icon-dark.png"
              alt="BitJunoo Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
            />
            <span className="font-heading font-extrabold text-slate-900 dark:text-white text-base">
              BitJunoo
            </span>
          </Link>

          <div className="hidden lg:block">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              Enterprise Access Node
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeSwitcher />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-royal-blue dark:hover:text-cyan-blue transition-colors px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-royal-blue/30 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-6 sm:py-8">
          {/* Mobile Banner */}
          <div className="lg:hidden mb-6 p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-royal-blue/30 text-white border border-royal-blue/30 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-blue mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BITJUNOO CONSOLE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Join the platform powering enterprise software engineering, microservices &amp; AI automation.
            </p>
          </div>

          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue dark:text-cyan-blue text-[11px] font-bold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-royal-blue dark:text-cyan-blue" />
              <span>CREATE ACCOUNT</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
              Join BitJunoo Console
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Create your account to start publishing, managing articles, and tracking readership analytics.
            </p>
          </div>

          <SignupForm />

          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-royal-blue dark:text-cyan-blue hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="w-full max-w-lg mx-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted &bull; SOC-2 Ready</span>
          </div>
          <div>&copy; {new Date().getFullYear()} BitJunoo Engineering.</div>
        </div>
      </div>
    </div>
  );
}
