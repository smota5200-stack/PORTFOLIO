import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Felipe Mota | Designer de iGaming",
  description: "Motion Graphics & Key Visuals para Cassinos e Slots. Especialista em Fortune Tiger, Fortune Ox, Fortune Rabbit e mais.",
  keywords: ["iGaming", "Designer", "Motion Graphics", "Key Visuals", "Cassino", "Slots", "Fortune Tiger"],
  authors: [{ name: "Felipe Mota" }],
  openGraph: {
    title: "Felipe Mota | Designer de iGaming",
    description: "Motion Graphics & Key Visuals para Cassinos e Slots",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
