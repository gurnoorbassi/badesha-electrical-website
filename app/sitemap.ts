import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://badeshaelectrical.com";
  return [
    ["", "weekly", 1],
    ["/services", "monthly", .9],
    ["/projects", "monthly", .9],
    ["/about", "monthly", .7],
    ["/safety", "yearly", .6],
    ["/contact", "monthly", .9],
    ["/book", "monthly", .8],
  ].map(([path, changeFrequency, priority]) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFrequency as "weekly" | "monthly" | "yearly",
    priority: priority as number,
  }));
}
