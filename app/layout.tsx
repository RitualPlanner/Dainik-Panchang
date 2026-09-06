import type React from "react";
import "./globals.css";
import "react-day-picker/dist/style.css";
import { LanguageProvider } from "./contexts/language-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins, Cinzel, Inter } from "next/font/google";
import { env } from "@/lib/env";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-cinzel",
});

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "Dainik Panchang - Hindu Lunar Calendar Generator",
  description:
    "Create, customize, and share daily panchang details including tithi, nakshatra, yog, karan, sunrise/sunset times, and more. Features multilingual support, QR code generation, and PDF export.",
  icons: {
    icon: env.NEXT_PUBLIC_LOGO_URL,
    shortcut: env.NEXT_PUBLIC_LOGO_URL,
    apple: env.NEXT_PUBLIC_LOGO_URL,
  },
  generator: "Dainik-Panchang",
};
