import { PageIntro } from "../../components/SiteShell";
import { bookableServices, siteUrl } from "../content";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Book an Electrical Service", description: "Review standard Badesha Electrical pricing for pot lights, fans, fixtures and troubleshooting, then request electrical service in Greater Vancouver.", path: "/book" });

const serviceCatalogSchema = { "@context": "https://schema.org", "@type": "OfferCatalog", name: "Standard electrical services", url: `${siteUrl}/book`, itemListElement: bookableServices.map((service) => ({ "@type": "Offer", priceCurrency: "CAD", price: service.price.match(/[\d.]+/)?.[0], itemOffered: { "@type": "Service", name: service.title, description: service.note, provider: { "@id": `${siteUrl}/#business` } } })) };

export default function BookPage() {
  return <main><PageIntro eyebrow="Standard services" title="Straightforward service. Clear starting prices."><p>Select the service that fits your needs, then call or email our team to confirm the details and arrange a visit.</p></PageIntro>
    <section className="booking-grid">{bookableServices.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.title}</h2><strong>{service.price}</strong><p>{service.note}</p><a className="button dark" href={`mailto:info@badeshaelectrical.com?subject=${encodeURIComponent(service.title)}`}>Request this service</a></article>)}</section>
    <section className="booking-note"><h2>Before you book</h2><p>Material costs are additional. Listed prices cover standard service and one hour of work. Custom work, additional materials or extra time may change the final amount. Badesha Electrical will confirm the details and provide an estimate before work proceeds.</p><a className="text-link" href="tel:+16047806000">Questions? Call 604-780-6000</a></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }} />
  </main>;
}
