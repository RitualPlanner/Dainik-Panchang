"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-orange-500/20">
      <div className="relative flex flex-col items-center max-w-lg w-full text-center space-y-6 bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-2xl transition-colors">
        {/* Warning Icon */}
        <div className="relative flex items-center justify-center">
          <div className="p-4 rounded-3xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shadow-inner">
            <AlertTriangle className="h-12 w-12 animate-bounce" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 uppercase tracking-widest">
            ERROR 500 / CRASH
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            કંઈક ખોટું થયું!
          </h1>
          <h2 className="text-base sm:text-lg font-medium text-muted-foreground">
            Something Went Wrong
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
          સિસ્ટમમાં અણધારી ભૂલ આવી છે. તમારી માહિતી સુરક્ષિત છે. કૃપા કરીને
          રીસેટ કરો અથવા ફરીથી પ્રયાસ કરો.
        </p>

        {error?.message && (
          <div className="w-full max-h-32 overflow-y-auto p-3 rounded-xl bg-muted/60 border border-border text-left font-mono text-xs text-muted-foreground break-all">
            {error.message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 w-full flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-500 font-semibold px-5 py-2.5 shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            ફરી પ્રયાસ કરો / Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-xl border border-border bg-background hover:bg-accent text-foreground font-semibold px-5 py-2.5 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              મુખ્ય પેજ / Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
