import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { Footer, Header } from "../components/SiteShell";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "badeshaelectrical.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
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
      description: "Electrical construction, service and emergency response across Greater Vancouver.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Badesha Electrical Ltd. — Built right. Powered for life." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Badesha Electrical Ltd. | Built right. Powered for life.",
      description: "Electrical construction, service and emergency response across Greater Vancouver.",
      images: [`${origin}/og.png`],
    },
    icons: { icon: "/favicon.svg", apple: "/images/logo.png" },
  };
}

export const viewport: Viewport = { themeColor: "#ed5a1f", colorScheme: "light" };

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "Badesha Electrical Ltd.",
  url: "https://badeshaelectrical.com",
  logo: "https://badeshaelectrical.com/wp-content/uploads/2022/05/BADESHA-ELECTRICAL-LOGO-450.png",
  telephone: "+1-604-780-6000",
  email: "info@badeshaelectrical.com",
  areaServed: ["Surrey", "Langley", "Burnaby", "Maple Ridge", "Greater Vancouver"],
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" }],
  description: "Residential, commercial and industrial electrical contractor based in Surrey, British Columbia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      </body>
    </html>
  );
}
