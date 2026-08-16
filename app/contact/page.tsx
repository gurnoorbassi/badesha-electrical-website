import type { Metadata } from "next";
import { PageIntro } from "../../components/SiteShell";

export const metadata: Metadata = { title: "Contact", description: "Contact Badesha Electrical in Surrey for residential, commercial, industrial or emergency electrical service.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main><PageIntro eyebrow="Contact" title="Tell us what needs power."><p>Call for immediate help or email the details of your project. Our regular office hours are Monday to Friday, 8:00 a.m. to 5:00 p.m.</p></PageIntro>
    <section className="contact-page"><div className="contact-primary"><p className="kicker light">24/7 emergency line</p><a href="tel:+16047806000">604-780-6000</a><span>Tap to call</span></div><div className="contact-options"><article><span>General inquiries</span><h2>Email our team</h2><p>Send your project details, location, timing and the best way to reach you.</p><a className="text-link" href="mailto:info@badeshaelectrical.com?subject=Electrical%20project%20inquiry">info@badeshaelectrical.com <b>↗</b></a></article><article><span>Standard service</span><h2>Know what you need?</h2><p>Review standard service pricing for pot lights, fans, fixtures and troubleshooting.</p><a className="text-link" href="/book">View service pricing <b>↗</b></a></article><article><span>Service area</span><h2>Greater Vancouver</h2><p>Based in Surrey and serving residential and commercial clients throughout the Lower Mainland.</p></article></div></section>
  </main>;
}
