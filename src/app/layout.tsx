import type { Metadata } from "next";
import { Inter, Manrope, Fraunces } from "next/font/google";
import { getSeoSettings, getNavbar } from "@/lib/cms";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
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

const baseMetadata: Metadata = {
  metadataBase: new URL("https://ap.com"),
  title: {
    default:
      "Anjan Prasad - Business Strategist, Startup Mentor & Growth Advisor",
    template: "%s - Anjan Prasad",
  },
  description:
    "Anjan Prasad is an entrepreneur, business strategist and growth advisor with 16+ years building, scaling and transforming companies. 250+ businesses guided, 100+ brands advised - from Fortune 500 rooms to bootstrapped ventures.",
  applicationName: "Anjan Prasad",
  authors: [{ name: "Anjan Prasad" }],
  creator: "Anjan Prasad",
  publisher: "Anjan Prasad",
  keywords: [
    "Anjan Prasad",
    "business strategist",
    "startup mentor",
    "growth advisor",
    "business advisory India",
    "business consulting",
    "startup consulting",
    "leadership coaching",
    "go-to-market strategy",
    "Noboru World",
    "Filing Buddy",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Anjan Prasad - Business Strategist, Startup Mentor & Growth Advisor",
    description:
      "16+ years building, scaling and transforming companies. Strategic advisory, executive consulting, and courses for founders and professionals.",
    type: "website",
    locale: "en_IN",
    siteName: "Anjan Prasad",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Anjan Prasad - Business Strategist, Startup Mentor & Growth Advisor",
    description:
      "16+ years building, scaling and transforming companies. Strategic advisory, executive consulting, and courses for founders.",
    creator: "@anjanpr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Merge Sanity global SEO defaults over the built-in metadata. Falls back to
 * the base values when unauthored. The favicon and OG image stay file-based
 * (src/app/icon.png, opengraph-image.png) unless the CMS supplies an OG image.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  if (!seo) return baseMetadata;

  const title = seo.title;
  const description = seo.description ?? baseMetadata.description ?? undefined;

  return {
    ...baseMetadata,
    ...(title ? { title: { default: title, template: "%s - Anjan Prasad" } } : {}),
    ...(seo.description ? { description } : {}),
    ...(seo.keywords && seo.keywords.length ? { keywords: seo.keywords } : {}),
    openGraph: {
      ...baseMetadata.openGraph,
      ...(title ? { title } : {}),
      ...(seo.description ? { description } : {}),
      ...(seo.ogImageUrl ? { images: [{ url: seo.ogImageUrl }] } : {}),
    },
    twitter: {
      ...baseMetadata.twitter,
      ...(title ? { title } : {}),
      ...(seo.description ? { description } : {}),
      ...(seo.ogImageUrl ? { images: [seo.ogImageUrl] } : {}),
    },
  };
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsNav = await getNavbar();
  const nav =
    cmsNav && cmsNav.length
      ? cmsNav.map((item) => ({
          label: item.label,
          href: item.href,
          ...(item.children
            ? {
                children: item.children.map((c) => ({
                  label: c.label,
                  href: c.href,
                  description: c.description ?? "",
                })),
              }
            : {}),
        }))
      : undefined;

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
          <QueryProvider>
            <AuthProvider>
              <Preloader />
              <Cursor />
              <Header items={nav} />
              {children}
              <Footer />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
