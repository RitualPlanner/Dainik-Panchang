"use client";

import type React from "react";
import {
  Sparkles,
  Moon,
  Smartphone,
  Type,
  Zap,
  ExternalLink,
  Check,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/app/contexts/language-context";
import pkg from "@/package.json";

interface WhatsNewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhatsNewModal({ open, onOpenChange }: WhatsNewModalProps) {
  const { language } = useLanguage();

  // Content localized for Gujarati, Hindi, and English
  const content = {
    title: {
      gu: `નવું શું છે v${pkg.version} માં?`,
      hi: `नया क्या है v${pkg.version} में?`,
      en: `What's New in v${pkg.version}?`,
    },
    subtitle: {
      gu: `દૈનિક પંચાંગ v${pkg.version} માં આપનું સ્વાગત છે! તમારા અનુભવને વધુ શ્રેષ્ઠ બનાવવા માટે કરવામાં આવેલા સુધારા:`,
      hi: `दैनिक पंचांग v${pkg.version} में आपका स्वागत है! आपके अनुभव को और बेहतर बनाने वाले सुधार:`,
      en: `Welcome to Dainik Panchang v${pkg.version}! Here are the latest improvements for you:`,
    },
    features: [
      {
        icon: Moon,
        title: {
          gu: "ડાર્ક મોડ અને થિમ સિલેક્ટર",
          hi: "डार्क मोड और थीम सेलेक्टर",
          en: "Dark Mode & Color Themes",
        },
        description: {
          gu: "લાઇટ અને ડાર્ક મોડ વચ્ચે સરળતાથી સ્વિચ કરો. હવે પંચાંગ જનરેટર રાત્રે પણ ઉપયોગમાં અત્યંત આરામદાયક છે.",
          hi: "लाइट और डार्क मोड के बीच आसानी से स्विच करें। अब रात में भी पंचांग बनाना और देखना सुविधाजनक है।",
          en: "Seamlessly switch between Light and Dark modes with custom tailored color palettes.",
        },
        badgeColor:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      },
      {
        icon: Smartphone,
        title: {
          gu: "મોબાઇલ ફ્રેન્ડલી ૩-ડોટ મેનૂ",
          hi: "मोबाइल अनुकूल 3-डॉट मेनू",
          en: "Mobile-Friendly Quick Menu",
        },
        description: {
          gu: "મોબાઇલ સ્ક્રીન પર થીમ અને ભાષા ઝડપથી બદલવા માટે નવું સરળ અને સુંદર ૩-ડોટ ક્વિક મેનૂ.",
          hi: "मोबाइल स्क्रीन पर थीम और भाषा तेजी से बदलने के लिए नया सुंदर 3-डॉट क्विक मेनू।",
          en: "Clean 3-dots mobile menu for quick theme and language controls on smartphones.",
        },
        badgeColor:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      },
      {
        icon: Type,
        title: {
          gu: "બોલ્ડ ટેક્સ્ટ હાઇલાઇટ્સ",
          hi: "बोल्ड टेक्स्ट हाइलाइट्स",
          en: "Bold Text Options",
        },
        description: {
          gu: "દિન મહિમા અને પંચાંગ વિગતોમાં મહત્વપૂર્ણ પોઇન્ટ્સને બોલ્ડ કરીને વધુ સ્પષ્ટ દર્શાવો.",
          hi: "दिन महिमा और पंचांग विवरण में महत्वपूर्ण बिंदुओं को बोल्ड करके अधिक स्पष्ट दर्शाएं।",
          en: "Highlight important Panchang points and Din Mahima details with bold formatting.",
        },
        badgeColor:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      },
      {
        icon: Zap,
        title: {
          gu: "ઝડપી ઇમેજ અને PDF એક્સપોર્ટ",
          hi: "त्वरित इमेज और PDF एक्सपोर्ट",
          en: "Enhanced Image & PDF Export",
        },
        description: {
          gu: "પંચાંગ કાર્ડ જનરેટ કરવા અને PDF ડાઉનલોડ કરવા માટે વધુ ઝડપી અને પ્રતિસાદી કાર્યક્ષમતા.",
          hi: "पंचांग कार्ड बनाने और PDF डाउनलोड करने के लिए अधिक तीव्र और सटीक प्रदर्शन।",
          en: "Faster image generation and PDF download with fully responsive layouts on all screens.",
        },
        badgeColor:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      },
    ],
    buttonText: {
      gu: "બરાબર છે, સમજાઈ ગયું",
      hi: "ठीक है, समझ गया",
      en: "Got it, thanks!",
    },
    githubText: {
      gu: "GitHub પર તમામ ટેકનિકલ વિગતો જુઓ",
      hi: "GitHub पर सभी तकनीकी विवरण देखें",
      en: "View technical changelog on GitHub",
    },
  };

  const langKey = (language as "gu" | "hi" | "en") || "gu";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-sans bg-card border border-border text-foreground max-w-[92vw] sm:max-w-lg md:max-w-xl rounded-3xl shadow-2xl p-6 sm:p-8 transition-colors duration-300 max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader className="space-y-2.5 text-left">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center p-2 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 shrink-0">
              <Sparkles className="h-6 w-6" />
            </span>
            <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-foreground tracking-wide">
              {content.title[langKey]}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed tracking-wide pt-1">
            {content.subtitle[langKey]}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Feature Grid */}
        <div className="my-6 space-y-4">
          {content.features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 transition-all duration-200 hover:border-orange-500/30"
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 border ${feature.badgeColor}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-semibold text-foreground tracking-wide">
                    {feature.title[langKey]}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed tracking-wide">
                    {feature.description[langKey]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <AlertDialogFooter className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-border/50 gap-3">
          <a
            href={`https://github.com/RitualPlanner/dainik-panchang/releases/tag/v${pkg.version}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium cursor-pointer"
          >
            {content.githubText[langKey]}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <AlertDialogAction
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-500 border-none cursor-pointer font-semibold shadow-md transition-all duration-200 px-6 py-2.5 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" />
            {content.buttonText[langKey]}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
