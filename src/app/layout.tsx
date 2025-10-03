import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaDine.AI - Restoran Yapay Zeka Çözümleri",
  description: "QR Menü, Yapay Zeka Garson ve İleri Analitik ile restoranınızı geleceğe taşıyın. Zincir restoranlar için kurumsal AI çözümleri.",
  keywords: "restoran ai, qr menü, yapay zeka garson, restoran teknolojisi, pos sistemi",
  authors: [{ name: "NovaDine.AI" }],
  openGraph: {
    title: "NovaDine.AI - Restoran Yapay Zeka Çözümleri",
    description: "Restoranınızı geleceğe taşıyan AI teknolojisi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
