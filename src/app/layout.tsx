import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/ui/Navbar";
import Script from "next/script";
import OnekoFix from "@/components/ui/OnekoFix";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secure Whisper",
  description:
    "Anonymous Messaging Platform for Secure and Private Communication",
    
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}
      > 
        <AuthProvider>
    
         <main className="flex-1 overflow-y-auto">
          {children}
        </main>

          <Toaster position="top-center" />
        </AuthProvider>
       <Script src="/oneko.js" strategy="afterInteractive"></Script>
       <OnekoFix/>
      </body>
    </html>
  );
}
