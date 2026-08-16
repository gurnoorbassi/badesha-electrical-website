import type { Metadata } from "next";
import { siteUrl } from "./content";

const brandSuffix = " | Badesha Electrical";

export function fitTitle(title: string) {
  const clean = title.replace(/\s+/g, " ").trim();
  const complete = `${clean}${brandSuffix}`;
  if (complete.length <= 60) return complete;
  return `${clean.slice(0, 60 - brandSuffix.length).trimEnd()}${brandSuffix}`;
}

export function pageMetadata({ title, description, path, image = "/og.png", type = "website" }: { title: string; description: string; path: string; image?: string | null; type?: "website" | "article" }): Metadata {
  const fittedTitle = fitTitle(title);
  const canonical = `${siteUrl}${path}`;
  const socialImages = image ? [{ url: `${siteUrl}${image}`, alt: title }] : [];
  return {
    title: { absolute: fittedTitle },
    description,
    alternates: { canonical },
    openGraph: { type, url: canonical, siteName: "Badesha Electrical Ltd.", locale: "en_CA", title: fittedTitle, description, images: socialImages },
    twitter: { card: "summary_large_image", title: fittedTitle, description, images: socialImages.map(({ url }) => url) },
  };
}
