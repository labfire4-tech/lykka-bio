import { type ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40 animate-aurora"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, transparent 40%, transparent 60%, rgba(236,72,153,0.12) 100%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-600/6 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/4 rounded-full blur-[140px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <h1 className="text-4xl font-black tracking-tight transition-colors group-hover:text-purple-400">
              LYKKA<span className="text-purple-500">.</span>BIO
            </h1>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
