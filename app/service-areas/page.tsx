import Link from "next/link";
import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { locationPages, serviceAreas, servicePages, siteUrl } from "../content";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Electrical Service Areas in Greater Vancouver", description: "Badesha Electrical serves Surrey, Langley, Burnaby, Vancouver, Maple Ridge and communities throughout Greater Vancouver and the Lower Mainland.", path: "/service-areas" });

const areaSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Badesha Electrical service areas",
  url: `${siteUrl}/service-areas`,
  about: serviceAreas.map((name) => ({ "@type": "City", name })),
  isPartOf: { "@id": `${siteUrl}/#website` },
};

export default function ServiceAreasPage() {
  const locationMap = new Map<string, string>(locationPages.map((location) => [location.city, location.slug]));
  return <main><PageIntro eyebrow="Based in Surrey, serving the region" title="Electrical service across Greater Vancouver."><p>Badesha Electrical supports homeowners, builders, businesses and facilities throughout the Lower Mainland. Call to confirm scheduling and availability for your location.</p><a className="button dark" href="tel:+16047806000">Call 604-780-6000</a></PageIntro>
    <section className="section area-section"><div className="section-heading"><div><p className="kicker">Service area</p><h2>Local knowledge. Regional reach.</h2></div><p>Our work spans established homes, active commercial properties, industrial facilities and new developments across the region.</p></div><div className="area-grid">{serviceAreas.map((area, index) => { const slug = locationMap.get(area); const content = <><span>{String(index + 1).padStart(2, "0")}</span><h2>{area}</h2><p>Residential, commercial and electrical project service subject to scheduling and project requirements.</p>{slug ? <strong>View local service details</strong> : null}</>; return slug ? <Link className="area-card" href={`/service-areas/${slug}`} key={area}>{content}</Link> : <article key={area}>{content}</article>; })}</div></section>
    <section className="dark-section area-services"><div className="section-heading"><div><p className="kicker light">Electrical expertise</p><h2>One team for every property type.</h2></div><p>Explore the service that matches your project, then contact the team for scope, timing and availability.</p></div><div className="specialist-grid">{servicePages.map((service) => <Link href={`/services/${service.slug}`} key={service.slug}><span>{service.eyebrow}</span><h3>{service.shortTitle}</h3><p>{service.description}</p></Link>)}</div></section>
    <ContactStrip />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }} />
  </main>;
}
