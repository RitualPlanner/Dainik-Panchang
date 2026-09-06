import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 selection:bg-orange-500/20">
      <div className="relative flex flex-col items-center max-w-md w-full text-center space-y-6">
        {/* Animated Spiritual Glow & Spinner */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-amber-500/20 border-b-amber-500 animate-spin-reverse" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 opacity-80 blur-xs animate-pulse" />
          <span className="absolute text-2xl font-bold text-orange-500 select-none">
            ૐ
          </span>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground tracking-wide">
            દૈનિક પંચાંગ લોડ થઈ રહ્યું છે...
          </h2>
          <p className="text-sm text-muted-foreground">
            કૃપા કરીને થોડી રાહ જુઓ / Loading Panchang details...
          </p>
        </div>

        {/* Skeleton Preview Card */}
        <div className="w-full bg-card border border-border/80 rounded-2xl p-6 shadow-xl space-y-4 animate-pulse mt-4">
          <div className="h-6 bg-muted rounded-md w-3/4 mx-auto" />
          <div className="h-4 bg-muted rounded-md w-1/2 mx-auto" />
          <div className="space-y-2.5 pt-3">
            <div className="h-4 bg-muted rounded-md w-full" />
            <div className="h-4 bg-muted rounded-md w-5/6" />
            <div className="h-4 bg-muted rounded-md w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
