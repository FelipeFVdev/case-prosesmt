import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Case ProsesMT",
  description: "Case for ProSESMT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} light antialiased lg:h-screen h-full flex items-center justify-center w-screen`}
      >
        <main className="mt-4 px-8 flex flex-col lg:grid lg:grid-cols-2 items-start justify-center gap-8">
          {children}
        </main>
        <Toaster theme="light" position="top-right" richColors />
      </body>
    </html>
  );
}
