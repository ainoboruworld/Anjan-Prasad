import type { Metadata } from "next";
import { Inter, Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AP.com — India's Business Growth Ecosystem",
    template: "%s — AP.com",
  },
  description:
    "AP.com is India's business growth ecosystem — where entrepreneurs, professionals, and organisations learn how successful businesses are actually built. Led by Anjan Prasad, business transformation and growth advisor.",
  keywords: [
    "start a business in India",
    "business growth",
    "business consulting",
    "corporate training",
    "AI for business",
    "Anjan Prasad",
  ],
  openGraph: {
    title: "AP.com — India's Business Growth Ecosystem",
    description:
      "Start, build, and scale a profitable business — with the operator who has done it three times.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${fraunces.variable}`}
    >
      <body className="bg-paper min-h-screen antialiased">
        <ThemeProvider>
          <Preloader />
          <Cursor />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
