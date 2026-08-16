import type { Metadata } from "next";
import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { primaryServices } from "../content";

export const metadata: Metadata = { title: "Electrical Services", description: "Residential, commercial, industrial and emergency electrical services in Surrey and Greater Vancouver.", alternates: { canonical: "/services" } };

const specialist = [
  ["Panels & service", "New electrical services, panel replacements, power upgrades and repairs to faulty service equipment."],
  ["Renovations & rewiring", "New appliance circuits, remodel wiring, knob-and-tube or cloth wiring replacement and electrical layout."],
  ["Lighting", "Recessed lighting, interior and exterior LED upgrades, parkade lighting and under-cabinet lighting."],
  ["Backup power", "Generac generator installation, transfer switches and preventative maintenance for dependable backup power."],
  ["Fans & fixtures", "Ceiling fans, remote controls, chandeliers, washroom fans and new fixture locations."],
  ["Commercial systems", "Equipment hookups, data cabling, fire alarm, thermography scans and isolated or specialized receptacles."],
];

export default function ServicesPage() {
  return <main><PageIntro eyebrow="Electrical services" title="From first wire to final test."><p>Badesha Electrical provides complete electrical construction, upgrades, maintenance and troubleshooting for homes, businesses and active jobsites.</p><a className="button dark" href="/book">Book a standard service</a></PageIntro>
    <section className="section service-detail-list">{primaryServices.map((s) => <article key={s.number}><div className="service-title"><span>{s.number}</span><h2>{s.title}</h2></div><div><p>{s.summary}</p><ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul></div></article>)}</section>
    <section className="dark-section"><div className="section-heading"><div><p className="kicker light">Specialized work</p><h2>Details matter.<br />So does uptime.</h2></div><p>We help owners, builders and facility teams keep electrical systems safe, efficient and ready for what comes next.</p></div><div className="specialist-grid">{specialist.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <ContactStrip /></main>;
}
