"use client";

import type React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/app/contexts/language-context";

interface RefreshConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RefreshConfirmModal({
  open,
  onOpenChange,
  onConfirm,
}: RefreshConfirmModalProps) {
  const { language } = useLanguage();

  const content = {
    title: {
      gu: "પેજ રિફ્રેશની ચેતવણી",
      hi: "पेज रिफ्रेश चेतावनी",
      en: "Page Refresh Warning",
    },
    description: {
      gu: "તમે પેજ રિફ્રેશ કરવા જઈ રહ્યા છો. તમારી દાખલ કરેલી તમામ માહિતી અને દિન મહિમા વિગતો નષ્ટ થઈ જશે. શું તમે આગળ વધવા માગો છો?",
      hi: "आप पेज रिफ्रेश करने जा रहे हैं। आपकी दर्ज की गई सभी जानकारी और दिन महिमा विवरण मिट जाएंगे। क्या आप आगे बढ़ना चाहते हैं?",
      en: "Your entered data and din mahima details will be lost upon refreshing. Are you sure you want to proceed?",
    },
    cancel: {
      gu: "રદ કરો",
      hi: "रद्द करें",
      en: "Cancel",
    },
    proceed: {
      gu: "હા, આગળ વધો",
      hi: "हां, आगे बढ़ें",
      en: "Yes, Proceed",
    },
  };

  const langKey = (language as "gu" | "hi" | "en") || "gu";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-sans bg-card border border-border text-foreground max-w-[92vw] sm:max-w-lg rounded-3xl shadow-2xl p-6 sm:p-7 transition-colors duration-300">
        <AlertDialogHeader className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </span>
            <AlertDialogTitle className="text-lg sm:text-xl font-bold text-foreground tracking-wide">
              {content.title[langKey]}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed tracking-wide pt-1">
            {content.description[langKey]}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-border bg-background hover:bg-muted text-foreground hover:text-foreground cursor-pointer font-medium px-5 py-2.5 text-sm sm:text-base"
          >
            {content.cancel[langKey]}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onOpenChange(false);
              onConfirm();
            }}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-500 border-none cursor-pointer font-semibold shadow-md transition-all duration-200 px-5 py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {content.proceed[langKey]}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
