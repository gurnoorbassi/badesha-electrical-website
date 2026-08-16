import type { MetadataRoute } from "next";
import { locationPages, projects, servicePages, siteUrl } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = [
    ["", "weekly", 1], ["/services", "monthly", .9], ["/projects", "monthly", .9],
    ["/service-areas", "monthly", .8], ["/about", "monthly", .7], ["/safety", "yearly", .6],
    ["/contact", "monthly", .9], ["/book", "monthly", .8],
  ] as const;
  const serviceRoutes = servicePages.map((service) => [`/services/${service.slug}`, "monthly", .85] as const);
  const projectRoutes = projects.map((project) => [`/projects/${project.slug}`, project.status === "Upcoming" ? "monthly" : "yearly", .7] as const);
  const locationRoutes = locationPages.map((location) => [`/service-areas/${location.slug}`, "monthly", .75] as const);
  return [...core, ...serviceRoutes, ...projectRoutes, ...locationRoutes].map(([path, changeFrequency, priority]) => ({ url: `${siteUrl}${path}`, changeFrequency, priority }));
}
