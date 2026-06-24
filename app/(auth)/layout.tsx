import { type ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
      {/* Subtle white glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[140px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-2xl font-black tracking-tight transition-colors group-hover:text-white/80">
                CURZED
              </h1>
            </div>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
