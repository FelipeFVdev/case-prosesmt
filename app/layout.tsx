import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import StatusForm from "@/components/status-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatesProvider } from "./context/states-context";

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
          <Card>
            <CardHeader>
              <CardTitle>Status Atual da COVID 19</CardTitle>
              <CardDescription>
                Consulta para visualizar o status atual da COVID-19: por estado,
                data específica ou globalmente.
              </CardDescription>
            </CardHeader>
            <StatesProvider>{children}</StatesProvider>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Envie o status atual da COVID-19 no estado</CardTitle>
              <CardDescription>
                Forneça o relatório atualizado sobre a situação do estado em
                relação à COVID-19.
              </CardDescription>
            </CardHeader>
            <StatusForm />
          </Card>
        </main>
        <Toaster theme="light" position="top-right" richColors />
      </body>
    </html>
  );
}
