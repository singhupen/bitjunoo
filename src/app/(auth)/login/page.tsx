import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { Sparkles, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | BitJunoo Enterprise Portal",
  description: "Sign in to access your digital engineering dashboard, sprint metrics, and project assets.",
};

export default function LoginPage() {
  return (
    <div className="w-full">
      {/* Auth Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(6,117,250,0.25)] p-6 sm:p-8 text-slate-900">
        {/* Header inside card */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[11px] font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE PORTAL</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
            Welcome Back
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Sign in to access your engineering dashboard, sprint deliverables, and publication management.
          </p>
        </div>

        {/* Interactive Form */}
        <LoginForm />
      </div>
    </div>
  );
}
