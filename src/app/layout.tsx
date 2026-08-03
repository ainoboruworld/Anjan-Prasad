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
  metadataBase: new URL("https://ap.com"),
  title: {
    default: "Anjan Prasad — Entrepreneur, Business Strategist & Growth Advisor",
    template: "%s — Anjan Prasad",
  },
  description:
    "Anjan Prasad is an entrepreneur, business strategist, startup mentor and growth advisor with 16+ years building, scaling and transforming companies — from Fortune 500 rooms to bootstrapped ventures.",
  keywords: [
    "Anjan Prasad",
    "business strategist",
    "startup mentor",
    "growth advisor",
    "business advisory India",
    "business consulting",
    "startup consulting",
    "Noboru World",
    "Filing Buddy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anjan Prasad — Entrepreneur, Business Strategist & Growth Advisor",
    description:
      "16+ years building, scaling and transforming companies. Advisory, consultation, and courses for founders and professionals.",
    type: "website",
    locale: "en_IN",
    siteName: "Anjan Prasad",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anjan Prasad — Entrepreneur, Business Strategist & Growth Advisor",
    description:
      "16+ years building, scaling and transforming companies. Advisory, consultation, and courses.",
  },
};

/** Person + Organisation structured data for rich results. */
const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anjan Prasad",
  jobTitle: "Entrepreneur, Business Strategist & Growth Advisor",
  description:
    "Entrepreneur, business strategist, startup mentor and growth advisor with 16+ years building, scaling and transforming companies.",
  worksFor: { "@type": "Organization", name: "Noboru World" },
  alumniOf: ["IIFT", "IMT Ghaziabad", "BML Munjal University"],
  knowsAbout: [
    "Business Strategy",
    "Startup Consulting",
    "Business Growth",
    "Digital Transformation",
    "Go-to-Market Strategy",
    "Leadership & Mentorship",
  ],
  sameAs: [
    "https://www.linkedin.com/in/anjanprasad/",
    "https://www.instagram.com/anjanpr/?hl=en",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
        />
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
