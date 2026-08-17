import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Geist_Mono, Manrope } from "next/font/google";
import { Footer, Header } from "../components/SiteShell";
import { MotionEnhancements } from "../components/MotionEnhancements";
import { serviceAreas, siteUrl } from "./content";
import "./globals.css";

const manrope = Manrope({ variable: "--font-body", subsets: ["latin"] });
const barlowCondensed = Barlow_Condensed({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: { default: "Badesha Electrical Ltd. | Surrey Electrician", template: "%s | Badesha Electrical" },
    description: "Residential, commercial and industrial electrical services across Surrey and Greater Vancouver, backed by more than 30 years of experience.",
    applicationName: "Badesha Electrical Ltd.",
    authors: [{ name: "Badesha Electrical Ltd." }],
    category: "Electrical contractor",
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: "Badesha Electrical Ltd.",
      title: "Badesha Electrical Ltd. | Built right. Powered for life.",
      description: "Residential, commercial and industrial electrical services across Surrey and Greater Vancouver, backed by more than 30 years of experience.",
      url: siteUrl,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Badesha Electrical Ltd. — Built right. Powered for life." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Badesha Electrical Ltd. | Built right. Powered for life.",
      description: "Residential, commercial and industrial electrical services across Surrey and Greater Vancouver, backed by more than 30 years of experience.",
      images: ["/og.png"],
    },
    icons: {
      icon: [{ url: "/images/logo-mark.png", type: "image/png", sizes: "1254x1254" }],
      shortcut: "/images/logo-mark.png",
      apple: [{ url: "/images/logo-mark.png", sizes: "1254x1254", type: "image/png" }],
    },
};

export const viewport: Viewport = { themeColor: "#ed5a1f", colorScheme: "light" };

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Badesha Electrical Ltd.",
  "@id": `${siteUrl}/#business`,
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/og.png`,
  telephone: "+1-604-780-6000",
  email: "info@badeshaelectrical.com",
  contactPoint: [
    { "@type": "ContactPoint", contactType: "project inquiries", email: "projects@badeshaelectrical.com", telephone: "+1-604-780-6000", areaServed: "CA-BC", availableLanguage: "English" },
    { "@type": "ContactPoint", contactType: "customer service", email: "info@badeshaelectrical.com", telephone: "+1-604-780-6000", areaServed: "CA-BC", availableLanguage: "English" },
  ],
  address: { "@type": "PostalAddress", streetAddress: "12777 76A Ave Unit 1A", addressLocality: "Surrey", addressRegion: "BC", postalCode: "V3W 1S9", addressCountry: "CA" },
  areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "17:00" }],
  description: "Residential, commercial and industrial electrical contractor based in Surrey, British Columbia.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Badesha Electrical Ltd.",
  inLanguage: "en-CA",
  publisher: { "@id": `${siteUrl}/#business` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${barlowCondensed.variable} ${geistMono.variable}`}>
        <MotionEnhancements />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([businessSchema, websiteSchema]) }} />
      </body>
    </html>
  );
}
