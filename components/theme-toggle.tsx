"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border bg-card opacity-20" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all shadow-xs cursor-pointer"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <SunIcon className="w-4 h-4 text-amber-500 animate-in zoom-in-50 duration-300" />
      ) : (
        <MoonIcon className="w-4 h-4 text-slate-700 dark:text-zinc-300 animate-in zoom-in-50 duration-300" />
      )}
    </button>
  );
}
