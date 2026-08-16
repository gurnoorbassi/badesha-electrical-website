import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactStrip } from "../../../components/SiteShell";
import { serviceAreas, servicePages, siteUrl } from "../../content";
import { pageMetadata } from "../../seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.description, path: `/services/${service.slug}`, image: service.image });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  const canonical = `${siteUrl}/services/${service.slug}`;
  const related = servicePages.filter((item) => item.slug !== service.slug).slice(0, 3);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: service.title,
      description: service.description,
      url: canonical,
      image: `${siteUrl}${service.image}`,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: serviceAreas.map((name) => ({ "@type": "City", name })),
      serviceType: service.shortTitle,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: service.shortTitle, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ];

  return <main>
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span aria-current="page">{service.shortTitle}</span></nav>
    <section className="detail-hero">
      <div className="detail-hero-copy"><p className="kicker">{service.eyebrow}</p><h1>{service.title}</h1><p>{service.intro}</p><div className="button-row"><a className="button orange" href="/contact">Request a quote</a><a className="button ghost-light" href="tel:+16047806000">Call 604-780-6000</a></div></div>
      <div className="detail-hero-image"><Image src={service.image} alt={`${service.shortTitle} project by Badesha Electrical`} fill priority sizes="(max-width: 980px) 100vw, 48vw" /></div>
    </section>
    <section className="detail-proof" aria-label="Service strengths">{service.reasons.map((reason, index) => <div key={reason}><span>{String(index + 1).padStart(2, "0")}</span><strong>{reason}</strong></div>)}</section>
    <section className="section detail-services"><div className="section-heading"><div><p className="kicker">What we handle</p><h2>Practical electrical work, clearly scoped.</h2></div><p>Tell us what is changing, what is not working or what the new space needs. We will help define the electrical work and the next step.</p></div><div className="detail-service-grid">{service.services.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></article>)}</div></section>
    <section className="faq-section"><div><p className="kicker light">Straight answers</p><h2>Common questions.</h2></div><div>{service.faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
    <section className="section related-services"><div className="section-heading compact"><div><p className="kicker">Related expertise</p><h2>More from the same team.</h2></div><Link className="text-link" href="/services">All electrical services</Link></div><div className="related-grid">{related.map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span>{item.eyebrow}</span><h3>{item.shortTitle}</h3><p>{item.description}</p><strong>View service</strong></Link>)}</div></section>
    <ContactStrip />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
  </main>;
}
