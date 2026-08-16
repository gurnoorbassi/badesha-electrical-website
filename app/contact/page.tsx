import { PageIntro } from "../../components/SiteShell";
import Link from "next/link";
import { pageMetadata } from "../seo";
import { siteUrl } from "../content";

export const metadata = pageMetadata({ title: "Contact a Surrey Electrician", description: "Contact Badesha Electrical for residential, commercial, industrial or 24-hour emergency electrical service in Surrey and Greater Vancouver.", path: "/contact" });

const contactSchema = { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Badesha Electrical", url: `${siteUrl}/contact`, mainEntity: { "@id": `${siteUrl}/#business` }, isPartOf: { "@id": `${siteUrl}/#website` } };

export default function ContactPage() {
  return <main><PageIntro eyebrow="Contact" title="Tell us what needs power."><p>Call for immediate help or email the details of your project. Our regular office hours are Monday to Friday, 8:00 a.m. to 5:00 p.m.</p></PageIntro>
    <section className="contact-page"><div className="contact-primary"><p className="kicker light">24/7 emergency line</p><a href="tel:+16047806000">604-780-6000</a><span>Call for immediate assistance</span></div><div className="contact-options"><article><span>General inquiries</span><h2>Email our team</h2><p>Send your project details, location, timing and the best way to reach you.</p><a className="text-link" href="mailto:info@badeshaelectrical.com?subject=Electrical%20project%20inquiry">info@badeshaelectrical.com</a></article><article><span>Standard service</span><h2>Know what you need?</h2><p>Review standard service pricing for pot lights, fans, fixtures and troubleshooting.</p><Link className="text-link" href="/book">View service pricing</Link></article><article><span>Service area</span><h2>Greater Vancouver</h2><p>Based in Surrey and serving residential and commercial clients throughout the Lower Mainland.</p><Link className="text-link" href="/service-areas">View all service areas</Link></article></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
  </main>;
}
