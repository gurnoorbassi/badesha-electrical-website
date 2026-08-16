import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactStrip } from "../../../components/SiteShell";
import { locationPages, projects, servicePages, siteUrl } from "../../content";
import { pageMetadata } from "../../seo";

type PageProps = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return locationPages.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = locationPages.find((item) => item.slug === city);
  if (!location) return {};
  return pageMetadata({ title: location.title, description: location.description, path: `/service-areas/${location.slug}`, image: null });
}

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = locationPages.find((item) => item.slug === city);
  if (!location) notFound();
  const localProjects = projects.filter((project) => location.projectSlugs.some((slug) => slug === project.slug));
  const canonical = `${siteUrl}/service-areas/${location.slug}`;
  const faqs = [
    [`Does Badesha Electrical serve ${location.city}?`, `Yes. Badesha Electrical provides residential, commercial, industrial and emergency electrical service in ${location.city}, subject to scheduling and project requirements.`],
    [`What electrical services are available in ${location.city}?`, "Available services include construction, troubleshooting, panels, renovations, lighting, equipment power, generators, preventative maintenance and 24-hour emergency response."],
    [`How do I request electrical service in ${location.city}?`, "Call 604-780-6000 for urgent assistance or contact Badesha Electrical with the property location, project details and preferred timing."],
  ];
  const schemas = [
    { "@context": "https://schema.org", "@type": "Service", name: `Electrical services in ${location.city}`, description: location.description, url: canonical, provider: { "@id": `${siteUrl}/#business` }, areaServed: { "@type": "City", name: location.city } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Service areas", item: `${siteUrl}/service-areas` }, { "@type": "ListItem", position: 3, name: location.city, item: canonical }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];

  return <main>
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/service-areas">Service areas</Link><span>/</span><span aria-current="page">{location.city}</span></nav>
    <section className="location-hero"><p className="kicker light">Greater Vancouver electrical service</p><h1>{location.title}</h1><p>{location.intro}</p><div className="button-row"><Link className="button orange" href="/contact">Request service</Link><a className="button ghost-light" href="tel:+16047806000">Call 604-780-6000</a></div></section>
    <section className="section location-overview"><div><p className="kicker">Local electrical expertise</p><h2>Built around the property and the work.</h2></div><div><p>{location.detail}</p><p>Badesha Electrical is licensed and insured, offers same-day service when available and keeps a technician on call for 24-hour electrical emergencies.</p></div></section>
    <section className="section location-service-links"><div className="section-heading compact"><div><p className="kicker">Services in {location.city}</p><h2>Complete electrical support.</h2></div><Link className="text-link" href="/services">View all services</Link></div><div className="related-grid">{servicePages.slice(0, 6).map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><span>{service.eyebrow}</span><h3>{service.shortTitle}</h3><p>{service.description}</p><strong>View service</strong></Link>)}</div></section>
    {localProjects.length > 0 ? <section className="section location-projects"><div className="section-heading compact"><div><p className="kicker">Project experience</p><h2>Work connected to {location.city}.</h2></div><Link className="text-link" href="/projects">All projects</Link></div><div className="related-project-grid">{localProjects.slice(0, 3).map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><Image src={project.image} alt={`${project.title} in ${project.location}`} width={700} height={500} sizes="(max-width: 700px) 100vw, 33vw" /><span>{project.status}</span><h3>{project.title}</h3><p>{project.location}</p></Link>)}</div></section> : null}
    <section className="faq-section"><div><p className="kicker light">Local service questions</p><h2>What to know.</h2></div><div>{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
    <ContactStrip />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
  </main>;
}
