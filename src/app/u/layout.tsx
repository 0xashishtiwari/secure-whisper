import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


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
      <>
    <Navbar />
    {children}
      </>
    
  );
}
