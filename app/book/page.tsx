import type { Metadata } from "next";
import { PageIntro } from "../../components/SiteShell";
import { bookableServices } from "../content";

export const metadata: Metadata = { title: "Book a Service", description: "Review standard Badesha Electrical service pricing and request an appointment in Surrey or Greater Vancouver.", alternates: { canonical: "/book" } };

export default function BookPage() {
  return <main><PageIntro eyebrow="Standard services" title="Straightforward service. Clear starting prices."><p>Select the service that fits your needs, then call or email our team to confirm the details and arrange a visit.</p></PageIntro>
    <section className="booking-grid">{bookableServices.map((service, index) => <article key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.title}</h2><strong>{service.price}</strong><p>{service.note}</p><a className="button dark" href={`mailto:info@badeshaelectrical.com?subject=${encodeURIComponent(service.title)}`}>Request this service</a></article>)}</section>
    <section className="booking-note"><h2>Before you book</h2><p>Material costs are additional. Listed prices cover standard service and one hour of work. Custom work, additional materials or extra time may change the final amount. Badesha Electrical will confirm the details and provide an estimate before work proceeds.</p><a className="text-link" href="tel:+16047806000">Questions? Call 604-780-6000</a></section>
  </main>;
}
