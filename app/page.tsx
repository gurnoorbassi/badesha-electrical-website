import type { Metadata } from "next";
import Image from "next/image";
import { ContactStrip } from "../components/SiteShell";
import { primaryServices, projects } from "./content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Does Badesha Electrical provide emergency electrical service?", acceptedAnswer: { "@type": "Answer", text: "Yes. Badesha Electrical offers 24-hour emergency electrical service across its Greater Vancouver service area." } },
    { "@type": "Question", name: "What types of electrical work does Badesha Electrical handle?", acceptedAnswer: { "@type": "Answer", text: "The team provides residential, commercial and industrial electrical construction, service, troubleshooting, upgrades, lighting, generators and preventative maintenance." } },
    { "@type": "Question", name: "Where is Badesha Electrical based?", acceptedAnswer: { "@type": "Answer", text: "Badesha Electrical is based in Surrey, British Columbia and serves clients across Greater Vancouver." } },
  ],
};

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="kicker">Surrey, British Columbia</p>
          <h1>Built right.<br /><em>Powered</em> for life.</h1>
          <p className="hero-intro">Residential, commercial and industrial electrical work backed by more than 30 years of hands-on experience.</p>
          <div className="button-row hero-actions"><a className="button dark" href="/contact">Request a quote</a><a className="button outline" href="/projects">View all projects</a></div>
          <a className="hero-phone" href="tel:+16047806000">Call 604-780-6000</a>
          <div className="hero-facts"><div><strong>30+</strong><span>Years of experience</span></div><div><strong>24/7</strong><span>Emergency response</span></div><div><strong>Full scope</strong><span>Residential to industrial</span></div></div>
        </div>
        <div className="hero-visual">
          <Image src="/images/hero.png" alt="Flora and Fauna multi-family development, a Badesha Electrical project" width={768} height={458} priority sizes="(max-width: 980px) 100vw, 47vw" />
          <div className="hero-badge"><span>Current focus</span><strong>Complete electrical delivery</strong></div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Company strengths"><span>Licensed &amp; insured</span><span>Commercial construction</span><span>Same-day service</span><span>Generac service provider</span></section>

      <section className="section sector-showcase">
        <div className="section-heading"><div><p className="kicker">Project sectors</p><h2>Built for every environment.</h2></div><p>Thoughtful electrical delivery for homes, active commercial spaces and guest-focused properties throughout Greater Vancouver.</p></div>
        <div className="sector-grid">
          <article className="sector-card">
            <Image src="/images/about.jpg" alt="Completed residential project in British Columbia" width={900} height={650} sizes="(max-width: 760px) 100vw, 33vw" />
            <div><span>01</span><h3>Residential</h3><p>New construction, renovations, service upgrades, lighting and dependable backup power.</p></div>
          </article>
          <article className="sector-card">
            <Image src="/images/partap.jpg" alt="Partap Complex commercial and industrial project in Surrey" width={900} height={650} sizes="(max-width: 760px) 100vw, 33vw" />
            <div><span>02</span><h3>Commercial</h3><p>Complete electrical systems for workplaces, retail, industrial and multi-unit developments.</p></div>
          </article>
          <article className="sector-card">
            <Image src="/images/centro.jpg" alt="Centro multi-unit development in Central City, Surrey" width={900} height={650} sizes="(max-width: 760px) 100vw, 33vw" />
            <div><span>03</span><h3>Hospitality</h3><p>Carefully planned power, lighting and service solutions for welcoming, guest-focused spaces.</p></div>
          </article>
        </div>
        <div className="sector-footer"><a className="button dark" href="/projects">View all projects</a><p>Explore completed and upcoming work across the Lower Mainland.</p></div>
      </section>

      <section className="section services-home">
        <div className="section-heading"><div><p className="kicker">Capabilities</p><h2>One team.<br />Every connection.</h2></div><p>From a failed breaker at home to the full electrical scope of a multi-family build, our work is planned carefully and delivered professionally.</p></div>
        <div className="service-list">
          {primaryServices.map((service) => <a className="service-row" href="/services" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.summary}</p><strong className="service-action">View service</strong></a>)}
        </div>
      </section>

      <section className="split-story">
        <div className="story-image"><Image src="/images/about.jpg" alt="Completed residential electrical project in British Columbia" width={1200} height={800} sizes="(max-width: 980px) 100vw, 50vw" /></div>
        <div className="story-copy"><p className="kicker light">The Badesha standard</p><h2>Experience you can feel in the finished work.</h2><p>For more than three decades, Badesha Electrical has served homeowners, builders and businesses with pride. We pair seasoned field knowledge with clear communication, responsible planning and respect for every jobsite.</p><a className="button orange" href="/about">Meet Badesha Electrical</a></div>
      </section>

      <section className="section featured-projects">
        <div className="section-heading compact"><div><p className="kicker">Selected work</p><h2>Built across the Lower Mainland.</h2></div><a className="text-link" href="/projects">View project portfolio</a></div>
        <div className="project-grid">
          {projects.slice(0, 4).map((project, index) => <article className={`project-card project-${index + 1}`} key={project.title}><Image src={project.image} alt={`${project.title} development in ${project.location}`} width={900} height={650} sizes="(max-width: 640px) 100vw, 50vw" /><div><span>{project.status}</span><h3>{project.title}</h3><p>{project.location}</p></div></article>)}
        </div>
      </section>

      <section className="review-section"><p className="kicker light">Client feedback</p><blockquote>Great service from these guys. The best things about dealing with them were the price and quality of work.</blockquote><p>Mehakpreet Singh, customer review</p><a href="/about#reviews">Read client feedback</a></section>
      <ContactStrip />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
