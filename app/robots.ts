import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://badeshaelectrical.com/sitemap.xml",
    host: "https://badeshaelectrical.com",
  };
}
