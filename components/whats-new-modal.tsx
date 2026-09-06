"use client";

import type React from "react";
import {
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Compass,
  Smartphone,
  FileText,
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
        icon: FileText,
        title: {
          gu: "પરફેક્ટ ઈમેજ અને PDF એક્સપોર્ટ",
          hi: "परफेक्ट इमेज और PDF एक्सपोर्ट",
          en: "Fixed Image & PDF Export",
        },
        description: {
          gu: "ઇમેજ અને PDF માં વધારાની લાઇન દૂર કરવામાં આવી છે, દિન મહિમા સ્થાન અને તિથિ લેઆઉટ સ્પેસિંગ સુધારવામાં આવ્યું છે.",
          hi: "इमेज और PDF में अतिरिक्त लाइन हटाई गई है, दिन महिमा स्थान और तिथि लेआउट स्पेसिंग को सुधारा गया है।",
          en: "Removed extra top lines, fixed Din Mahima label placement, and perfected Tithi layout line spacing in Image & PDF exports.",
        },
        badgeColor:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      },
      {
        icon: RotateCcw,
        title: {
          gu: "ઓટો-રીસેટ અને તાજા ઇનપુટ્સ",
          hi: "ऑटो-रीसेट और नए इनपुट",
          en: "Auto Reset & Clean Inputs",
        },
        description: {
          gu: "મધ્યરાત્રિ ૧૨:૦૦ વાગ્યે ઓટો-રીસેટ અને પેજ રીફ્રેશ પર ઇનપુટ ડેટા સુરક્ષિત રીતે ક્લીયર થાય છે.",
          hi: "मध्यरात्रि 12:00 बजे ऑटो-रीसेट और पेज रिफ्रेश पर इनपुट डेटा सुरक्षित रूप से साफ होता है।",
          en: "Automatic midnight reset and clean form inputs on page reload.",
        },
        badgeColor:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      },
      {
        icon: AlertTriangle,
        title: {
          gu: "રીફ્રેશ ચેતવણી ડાયલોગ મોડલ",
          hi: "रिफ्रेश चेतावनी संवाद मॉडल",
          en: "Page Refresh Alert Modal",
        },
        description: {
          gu: "ડેટા લખેલો હોય ત્યારે અકસ્માતે રીફ્રેશ થતાં અટકાવતી સ્માર્ટ કન્ફર્મેશન ચેતવણી ડાયલોગ.",
          hi: "डेटा लिखे होने पर गलती से रिफ्रेश होने से रोकने वाली स्मार्ट पुष्टि चेतावनी संवाद.",
          en: "Smart confirmation warning preventing accidental data loss on page refresh.",
        },
        badgeColor:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      },
      {
        icon: Compass,
        title: {
          gu: "સિસ્ટમ એરર અને લોડિંગ પેજ",
          hi: "सिस्टम त्रुटि और लोडिंग पेज",
          en: "System Fallback & Error Pages",
        },
        description: {
          gu: "૪૦૪ નોટ ફાઉન્ડ, ૫૦૦ સિસ્ટમ એરર બાઉન્ડ્રી અને સ્મૂધ લોડિંગ સ્ક્રીન સપોર્ટ.",
          hi: "404 नॉट फाउंड, 500 सिस्टम त्रुटि और स्मूथ लोडिंग स्क्रीन सपोर्ट।",
          en: "Dedicated 404 Not Found, 500 Error boundary, and smooth loading UI pages.",
        },
        badgeColor:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      },
      {
        icon: Smartphone,
        title: {
          gu: "યુનિફાઇડ રીસેટ બટન ડિઝાઈન",
          hi: "यूनिफाइड रीसेट बटन डिजाइन",
          en: "Unified Reset Button Design",
        },
        description: {
          gu: "તમામ ડેસ્કટોપ, લેપટોપ અને ટેબ્લેટ સ્ક્રીન પર 'ડેટા રીસેટ કરો' ટેક્સ્ટ અને આઇકોન બટન.",
          hi: "सभी डेस्कटॉप, लैपटॉप और टैबलेट स्क्रीन पर 'डेटा रीसेट करें' टेक्स्ट और आइकन बटन।",
          en: "Unified 'Reset Data' text and icon button across all screen sizes.",
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
