import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/ui/Navbar";
import Script from "next/script";
import OnekoFix from "@/components/ui/OnekoFix";
import Footer from "@/components/ui/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secure Whisper – Anonymous & Private Messaging",
  description:
    "Secure Whisper lets anyone create a private link to receive anonymous messages securely. No sign-ups, no tracking, and complete privacy.",
  verification: {
    google: "Y6Aq-uAVdv0fEpTc9miNGQKPOhUHrU-EMr1YacYdERk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground relative`}
      >
        {/* 🔽 BACKGROUND LAYER (lowest) */}
        <AuroraBackground className="fixed inset-0 -z-50 pointer-events-none opacity-60"><></></AuroraBackground>

        {/* 🔼 ONEKO (top-most) */}
        <Script src="/oneko.js" strategy="afterInteractive" />
        <OnekoFix />

        {/* APP CONTENT */}
        <AuthProvider>
          <div className="relative z-0 flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>

          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
