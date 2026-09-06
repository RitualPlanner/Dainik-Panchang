"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Download, Copy, Upload, AlertCircle, FileText } from "lucide-react";
import DynamicFields from "./dynamic-fields";
import {
  generateImage,
  generateFormattedText,
  extractDataFromImage,
} from "./utils";
import { generatePDF } from "./utils/pdf-export";
import { getCurrentGujaratiDate } from "./utils/date-utils";
import EditableText from "./EditableText";
import { useLocalStorageWithExpiry } from "./hooks/useLocalStorageWithExpiry";
import { CalendarPicker } from "./components/calendar-picker";
import { type ThemeOption } from "./components/theme-selector";
import { ShareOptions } from "./components/share-options";
import { type OverlayOption } from "./components/image-overlay-selector";
import { LanguageSwitcher } from "./components/language-switcher";
import { useLanguage } from "./contexts/language-context";
import { useScreenSize, getResponsiveFontSize } from "./utils/responsive-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { env } from "@/lib/env";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";

type FormData = {
  tithi: string;
  tarikh: string;
  nakshatra: string;
  yog: string;
  karan: string;
  suryoday: string;
  suryasta: string;
  aajNiRashi: string;
  dinMahima: string[];
};

// Default form data
const defaultFormData: FormData = {
  tithi: "",
  tarikh: getCurrentGujaratiDate(),
  nakshatra: "",
  yog: "",
  karan: "",
  suryoday: "",
  suryasta: "",
  aajNiRashi: "",
  dinMahima: [""],
};

export default function PanchangForm() {
  // Add this after the component declaration
  const { t, language } = useLanguage();
  const screenSize = useScreenSize();

  // Use localStorage with expiry for each field
  const [tithi, setTithi] = useLocalStorageWithExpiry(
    "panchang_tithi",
    defaultFormData.tithi
  );
  const [tarikh, setTarikh] = useLocalStorageWithExpiry(
    "panchang_tarikh",
    defaultFormData.tarikh
  );
  const [nakshatra, setNakshatra] = useLocalStorageWithExpiry(
    "panchang_nakshatra",
    defaultFormData.nakshatra
  );
  const [yog, setYog] = useLocalStorageWithExpiry(
    "panchang_yog",
    defaultFormData.yog
  );
  const [karan, setKaran] = useLocalStorageWithExpiry(
    "panchang_karan",
    defaultFormData.karan
  );
  const [suryoday, setSuryoday] = useLocalStorageWithExpiry(
    "panchang_suryoday",
    defaultFormData.suryoday
  );
  const [suryasta, setSuryasta] = useLocalStorageWithExpiry(
    "panchang_suryasta",
    defaultFormData.suryasta
  );
  const [aajNiRashi, setAajNiRashi] = useLocalStorageWithExpiry(
    "panchang_aajNiRashi",
    defaultFormData.aajNiRashi
  );
  const [dinMahima, setDinMahima] = useLocalStorageWithExpiry(
    "panchang_dinMahima",
    defaultFormData.dinMahima
  );

  // Add these new state variables after the existing ones
  const [selectedOverlay] = useState<OverlayOption>({
    id: "none",
    name: {
      gu: "કોઈ નહીં",
      hi: "कोई नहीं",
      en: "None",
    },
    previewUrl: "/placeholder.svg?height=60&width=60",
    imageUrl: "",
    type: "none",
  });

  // Combine all fields into formData object
  const formData: FormData = {
    tithi,
    tarikh,
    nakshatra,
    yog,
    karan,
    suryoday,
    suryasta,
    aajNiRashi,
    dinMahima,
  };

  // Field setter functions map
  const fieldSetters = {
    tithi: setTithi,
    tarikh: setTarikh,
    nakshatra: setNakshatra,
    yog: setYog,
    karan: setKaran,
    suryoday: setSuryoday,
    suryasta: setSuryasta,
    aajNiRashi: setAajNiRashi,
    dinMahima: setDinMahima,
  };

  const [boldFields, setBoldFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>({
    id: "default",
    name: "મૂળભૂત",
    background: "#1a2e3b",
    textColor: "white",
    borderColor: "#ffffff",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load bold fields from localStorage
  useEffect(() => {
    const storedBoldFields = localStorage.getItem("panchang_boldFields");
    if (storedBoldFields) {
      try {
        const parsedBoldFields = JSON.parse(storedBoldFields);
        if (Array.isArray(parsedBoldFields)) {
          setBoldFields(parsedBoldFields);
        }
      } catch (error) {
        console.error("Error parsing bold fields from localStorage:", error);
      }
    }
  }, []);

  // Save bold fields to localStorage when they change
  useEffect(() => {
    localStorage.setItem("panchang_boldFields", JSON.stringify(boldFields));
  }, [boldFields]);

  // Check URL for shared data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedData = urlParams.get("share");

      if (sharedData) {
        try {
          const decodedData = JSON.parse(atob(sharedData));

          // Update form data from shared data
          if (decodedData.formData) {
            Object.entries(decodedData.formData).forEach(([key, value]) => {
              if (key in fieldSetters) {
                (
                  fieldSetters[key as keyof typeof fieldSetters] as (
                    val: any
                  ) => void
                )(value);
              }
            });
          }

          // Update bold fields from shared data
          if (decodedData.boldFields && Array.isArray(decodedData.boldFields)) {
            setBoldFields(decodedData.boldFields);
          }

          // Show toast notification
          toast.success(
            language === "gu"
              ? "શેર કરેલ પંચાંગ સફળતાપૂર્વક લોડ થયું"
              : language === "hi"
                ? "शेयर किया गया पंचांग सफलतापूर्वक लोड हुआ"
                : "Shared panchang loaded successfully"
          );
        } catch (error) {
          console.error("Error parsing shared data:", error);
        }
      }
    }
  }, [language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Use the appropriate setter function from our map
    if (name in fieldSetters) {
      (fieldSetters[name as keyof typeof fieldSetters] as (val: any) => void)(
        value
      );
    }
  };

  const handleGenerate = async () => {
    const imageBlob = await generateImage(
      formData,
      boldFields,
      currentTheme,
      selectedOverlay
    );
    const imageUrl = URL.createObjectURL(imageBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "panchang.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Show toast notification
    toast.success(
      language === "gu"
        ? "પંચાંગ ઇમેજ સફળતાપૂર્વક જનરેટ થઈ"
        : language === "hi"
          ? "पंचांग इमेज सफलतापूर्वक जनरेट हुई"
          : "Panchang image generated successfully"
    );
  };

  const handleGeneratePDF = async () => {
    const pdfBlob = await generatePDF(formData, boldFields);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = "panchang.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Show toast notification
    toast.success(
      language === "gu"
        ? "પંચાંગ PDF સફળતાપૂર્વક જનરેટ થઈ"
        : language === "hi"
          ? "पंचांग PDF सफलतापूर्वक जनरेट हुई"
          : "Panchang PDF generated successfully"
    );
  };

  const handleCopy = async () => {
    const formattedText = generateFormattedText(formData, boldFields);
    try {
      await navigator.clipboard.writeText(formattedText);

      // Show toast notification
      toast.success(
        language === "gu"
          ? "પંચાંગ ટેક્સ્ટ ક્લિપબોર્ડ પર કોપી થઈ"
          : language === "hi"
            ? "પંચાંગ ટેક્સ્ટ ક્લિપબોર્ડ પર કોપી હુઆ"
            : "Panchang text copied to clipboard"
      );
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy text");
    }
  };

  const toggleBoldField = (field: string) => {
    setBoldFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const isFieldBold = (field: string) => boldFields.includes(field);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setExtractionError(null);

    try {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);

      // Extract data from the image
      const extractedData = await extractDataFromImage(imageUrl);

      // Check if we got meaningful data
      const hasData = Object.values(extractedData).some(
        (value) =>
          value &&
          (Array.isArray(value)
            ? value.length > 0 && value[0] !== ""
            : value !== "")
      );

      if (!hasData) {
        throw new Error("Could not extract meaningful data from the image");
      }

      // Update each field with its corresponding extracted data
      Object.entries(extractedData).forEach(([key, value]) => {
        if (key in fieldSetters) {
          (
            fieldSetters[key as keyof typeof fieldSetters] as (val: any) => void
          )(value);
        }
      });

      // Clean up the URL
      URL.revokeObjectURL(imageUrl);

      // Show toast notification
      toast.success(
        language === "gu"
          ? "ઇમેજમાંથી ડેટા સફળતાપૂર્વક એક્સટ્રેક્ટ થયો"
          : language === "hi"
            ? "ઇમેજ સે ડેટા સફળતાપૂર્વક એક્સટ્રેક્ટ હુઆ"
            : "Data successfully extracted from image"
      );
    } catch (error) {
      console.error("Error extracting data from image:", error);
      setExtractionError(t("extractionError"));
      toast.error(
        language === "gu"
          ? "ઇમેજ પ્રોસેસ કરવામાં નિષ્ફળ"
          : language === "hi"
            ? "ઇમેજ પ્રોસેસ કરને મેં વિફલ"
            : "Failed to process image"
      );
    } finally {
      setIsLoading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Replace the existing Card component with this updated version
  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-2 sm:px-4 md:px-8 flex items-center justify-center transition-colors duration-300">
      <Card className="relative max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 bg-card border border-border text-card-foreground shadow-xl rounded-2xl transition-colors duration-300">
        <div className="flex flex-col border-b border-border pb-6 text-center">
          <div className="flex items-center justify-between w-full mb-4 sm:mb-2 gap-2 sm:gap-4 overflow-hidden">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
              <img
                src={env.NEXT_PUBLIC_LOGO_URL}
                alt="Dainik Panchang Logo"
                className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain hover:scale-105 transition-all duration-200 bg-background p-1 rounded-xl border border-border shadow-xs shrink-0"
              />
              <span className="text-base sm:text-xl md:text-2xl font-bold tracking-tight sm:tracking-wider text-foreground select-none truncate">
                Dainik
                <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Panchang
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-muted/60 backdrop-blur-sm p-1 sm:p-1.5 rounded-xl border border-border shadow-xs shrink-0">
              <ThemeToggle />
              <div className="h-4 w-px bg-border" />
              <LanguageSwitcher />
            </div>
          </div>
          <div className="space-y-3 w-full flex flex-col items-center">
            <h1
              className={`${getResponsiveFontSize(screenSize.width, 2.5)} font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 tracking-wider drop-shadow-sm spiritual-glow px-2`}
            >
              {t("ganeshInvocation")}
            </h1>
            <h2
              className={`${getResponsiveFontSize(screenSize.width, 1.2)} font-semibold text-muted-foreground tracking-wide uppercase`}
            >
              {t("panchangHeader")}
            </h2>
            <div className="w-full flex justify-center">
              <EditableText />
            </div>
          </div>
        </div>

        {extractionError && (
          <Alert
            variant="destructive"
            className="border-destructive/50 bg-destructive/10 text-destructive rounded-xl"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="font-semibold">{t("error")}</AlertTitle>
            <AlertDescription>{t("extractionError")}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-2"></div>

          <div
            className={`grid grid-cols-1 ${screenSize.isTablet ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}
          >
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("tithi")}
              </label>
              <Input
                name="tithi"
                autoFocus
                value={tithi}
                onChange={handleInputChange}
                placeholder={t("enterTithi")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("tarikh")}
              </label>
              <CalendarPicker
                value={tarikh}
                onChange={(value) => setTarikh(value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("nakshatra")}
              </label>
              <Input
                name="nakshatra"
                value={nakshatra}
                onChange={handleInputChange}
                placeholder={t("enterNakshatra")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("yog")}
              </label>
              <Input
                name="yog"
                value={yog}
                onChange={handleInputChange}
                placeholder={t("enterYog")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("karan")}
              </label>
              <Input
                name="karan"
                value={karan}
                onChange={handleInputChange}
                placeholder={t("enterKaran")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("suryoday")}
              </label>
              <Input
                name="suryoday"
                value={suryoday}
                onChange={handleInputChange}
                placeholder={t("enterSunrise")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("suryasta")}
              </label>
              <Input
                name="suryasta"
                value={suryasta}
                onChange={handleInputChange}
                placeholder={t("enterSunset")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground tracking-wide">
                {t("aajNiRashi")}
              </label>
              <Input
                name="aajNiRashi"
                value={aajNiRashi}
                onChange={handleInputChange}
                placeholder={t("enterRashi")}
                className="rounded-xl border-border bg-background text-foreground focus:ring-2 focus:ring-ring hover:border-muted-foreground/40 shadow-xs transition-all duration-200 input-premium"
              />
            </div>
          </div>

          <DynamicFields
            fields={dinMahima}
            onChange={(newFields) => setDinMahima(newFields)}
          />

          <div className="flex gap-3 justify-center flex-wrap pt-4 border-t border-border">
            <Button
              onClick={handleGenerate}
              className={`bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-xs transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("generateImage")}
            </Button>

            <Button
              onClick={handleGeneratePDF}
              variant="outline"
              className={`border border-border bg-card hover:bg-accent font-semibold text-foreground rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
            >
              <FileText className="mr-2 h-4 w-4 text-orange-500" />
              {t("generatePDF")}
            </Button>

            <Button
              onClick={handleCopy}
              variant="outline"
              className={`border border-border bg-card hover:bg-accent font-semibold text-foreground rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
            >
              <Copy className="mr-2 h-4 w-4 text-orange-500" />
              {t("copyText")}
            </Button>

            <ShareOptions formData={formData} boldFields={boldFields} />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={triggerFileInput}
                    variant="outline"
                    className={`border border-border bg-card hover:bg-accent font-semibold text-foreground rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
                    disabled={isLoading}
                  >
                    <Upload className="mr-2 h-4 w-4 text-orange-500" />
                    {isLoading ? t("loading") : t("loadFromImage")}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload a Panchang image to extract data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`border border-border bg-card hover:bg-accent font-semibold text-foreground rounded-xl transition-all duration-200 ${screenSize.isMobile ? "text-xs px-3" : "w-44"}`}
                >
                  {t("makeBold")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-1 rounded-xl p-2 border border-border bg-popover text-popover-foreground shadow-xl">
                {Object.keys(formData).map((key) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={isFieldBold(key)}
                    onCheckedChange={() => toggleBoldField(key)}
                    onSelect={(e) => e.preventDefault()}
                    className="cursor-pointer text-popover-foreground font-medium rounded-lg focus:bg-accent"
                  >
                    {t(key)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </div>
  );
}
