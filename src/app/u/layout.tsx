import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"


import Navbar from "@/components/ui/Navbar";

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
      <div className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}>
      <Navbar />
      {children}
    </div>
    
  );
}
