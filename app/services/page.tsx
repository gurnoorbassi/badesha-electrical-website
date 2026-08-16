import Image from "next/image";
import Link from "next/link";
import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { primaryServices, servicePages, siteUrl } from "../content";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Electrical Services in Surrey", description: "Residential, commercial, industrial and 24-hour emergency electrical services from Badesha Electrical in Surrey and across Greater Vancouver.", path: "/services" });

const specialist = [
  ["Panels & service", "New electrical services, panel replacements, power upgrades and repairs to faulty service equipment."],
  ["Renovations & rewiring", "New appliance circuits, remodel wiring, knob-and-tube or cloth wiring replacement and electrical layout."],
  ["Lighting", "Recessed lighting, interior and exterior LED upgrades, parkade lighting and under-cabinet lighting."],
  ["Backup power", "Generac generator installation, transfer switches and preventative maintenance for dependable backup power."],
  ["Fans & fixtures", "Ceiling fans, remote controls, chandeliers, washroom fans and new fixture locations."],
  ["Commercial systems", "Equipment hookups, data cabling, fire alarm, thermography scans and isolated or specialized receptacles."],
];

const serviceIndexSchema = [
  { "@context": "https://schema.org", "@type": "CollectionPage", name: "Electrical Services in Surrey", url: `${siteUrl}/services`, isPartOf: { "@id": `${siteUrl}/#website` } },
  { "@context": "https://schema.org", "@type": "ItemList", itemListElement: servicePages.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.shortTitle, url: `${siteUrl}/services/${service.slug}` })) },
];

export default function ServicesPage() {
  return <main><PageIntro eyebrow="Electrical services" title="From first wire to final test."><p>Badesha Electrical provides complete electrical construction, upgrades, maintenance and troubleshooting for homes, businesses and active jobsites.</p><a className="button dark" href="/book">Book a standard service</a></PageIntro>
    <section className="section service-landing-grid"><div className="section-heading"><div><p className="kicker">Service expertise</p><h2>Start with what your property needs.</h2></div><p>Each service page explains the work, where we operate and the questions customers ask before getting started.</p></div><div className="service-page-grid">{servicePages.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><Image src={service.image} alt={`${service.shortTitle} project by Badesha Electrical`} width={700} height={500} sizes="(max-width: 700px) 100vw, 33vw" /><div><span>{service.eyebrow}</span><h2>{service.shortTitle}</h2><p>{service.description}</p><strong>Explore this service</strong></div></Link>)}</div></section>
    <section className="section service-detail-list">{primaryServices.map((s) => <article key={s.number}><div className="service-title"><span>{s.number}</span><h2>{s.title}</h2></div><div><p>{s.summary}</p><ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul></div></article>)}</section>
    <section className="dark-section"><div className="section-heading"><div><p className="kicker light">Specialized work</p><h2>Details matter.<br />So does uptime.</h2></div><p>We help owners, builders and facility teams keep electrical systems safe, efficient and ready for what comes next.</p></div><div className="specialist-grid">{specialist.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <ContactStrip /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceIndexSchema) }} /></main>;
}
