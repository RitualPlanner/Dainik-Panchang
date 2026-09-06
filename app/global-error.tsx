"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-orange-500/20 font-sans antialiased">
        <div className="relative flex flex-col items-center max-w-lg w-full text-center space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Critical Error Icon */}
          <div className="p-4 rounded-3xl bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertOctagon className="h-12 w-12" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-widest">
              CRITICAL SYSTEM ERROR
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              ગંભીર ભૂલ આવી છે
            </h1>
            <h2 className="text-base sm:text-lg font-medium text-slate-400">
              Critical Error Occurred
            </h2>
          </div>

          {/* Message */}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
            સિસ્ટમ લેઆઉટમાં ગંભીર ભૂલ આવી છે. એપ્લિકેશનને પુનઃપ્રારંભ કરવા માટે
            નીચેનું બટન દબાવો.
          </p>

          {/* Action Button */}
          <div className="pt-2 w-full flex justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              સિસ્ટમ રીસ્ટાર્ટ કરો / Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
