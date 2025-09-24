import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "House of Stroop - Vers gebakken stroopwafels & koffie",
  description: "Welkom bij House of Stroop! Geniet van vers gebakken stroopwafels, heerlijke koffie en een warme, uitnodigende sfeer in het hart van Curaçao.",
  keywords: "stroopwafels, koffie, Curaçao, House of Stroop, vers gebakken, Kurá Hulanda Village",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.className} bg-stroop-cream`}>
        {children}
      </body>
    </html>
  );
}
