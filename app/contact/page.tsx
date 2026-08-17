import { PageIntro } from "../../components/SiteShell";
import { ContactForm } from "../../components/ContactForm";
import Link from "next/link";
import { pageMetadata } from "../seo";
import { businessAddress, googleMapsUrl, siteUrl } from "../content";

export const metadata = pageMetadata({ title: "Contact a Surrey Electrician", description: "Contact Badesha Electrical for residential, commercial, industrial or 24-hour emergency electrical service in Surrey and Greater Vancouver.", path: "/contact" });

const contactSchema = { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Badesha Electrical", url: `${siteUrl}/contact`, mainEntity: { "@id": `${siteUrl}/#business` }, isPartOf: { "@id": `${siteUrl}/#website` } };

export default function ContactPage() {
  return <main><PageIntro eyebrow="Contact" title="Tell us what needs power."><p>Call for immediate help or email the details of your project. Our regular office hours are Monday to Friday, 7:00 a.m. to 5:00 p.m.</p></PageIntro>
    <section className="contact-page"><div className="contact-primary"><p className="kicker light">24/7 emergency line</p><a href="tel:+16047806000">604-780-6000</a><span>Call for immediate assistance</span></div><div className="contact-options"><article><span>Project inquiries</span><h2>Email our projects team</h2><p>Send project scope, location, timing and the best way to reach you.</p><a className="text-link" href="mailto:projects@badeshaelectrical.com?subject=Electrical%20project%20inquiry">projects@badeshaelectrical.com</a></article><article><span>General inquiries</span><h2>Contact the office</h2><p>For general questions and company information.</p><a className="text-link" href="mailto:info@badeshaelectrical.com">info@badeshaelectrical.com</a></article><article><span>Visit our Surrey office</span><h2>Find Badesha Electrical</h2><p>{businessAddress}</p><a className="text-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></article><article><span>Service area</span><h2>Greater Vancouver</h2><p>Based in Surrey and serving residential and commercial clients throughout the Lower Mainland.</p><Link className="text-link" href="/service-areas">View all service areas</Link></article></div></section>
    <ContactForm />
    <section className="contact-map" aria-labelledby="contact-map-title"><div><p className="kicker">Surrey office</p><h2 id="contact-map-title">Get directions.</h2><p>{businessAddress}</p><a className="text-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open full map</a></div><iframe title="Google map showing Badesha Electrical Ltd. in Surrey" src="https://www.google.com/maps?q=12777%2076A%20Ave%20Unit%201A%2C%20Surrey%2C%20BC%20V3W%201S9&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
  </main>;
}
