import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const nav = [
  { label: "Services", href: "/services", children: [["Residential", "/services#residential"], ["Commercial", "/services#commercial"], ["Industrial", "/services#commercial"], ["24-hour emergency", "/services#emergency"]] },
  { label: "Projects", href: "/projects", children: [["Upcoming projects", "/projects#upcoming"], ["Completed projects", "/projects#completed"], ["Residential & multi-family", "/projects/residential-multi-family"], ["Commercial & industrial", "/projects/commercial-industrial"], ["Hospitality", "/projects/hospitality"]] },
  { label: "About", href: "/about" },
  { label: "Safety", href: "/safety" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="logo-link" href="/" aria-label="Badesha Electrical Ltd. home">
        <Image src="/images/logo.png" alt="Badesha Electrical Ltd." width={2172} height={724} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map((item) => item.children ? <div className="nav-group" key={item.href}><Link className="nav-group-link" href={item.href}>{item.label}<span aria-hidden="true">+</span></Link><div className="nav-dropdown">{item.children.map(([label, href]) => <Link href={href} key={`${label}-${href}`}>{label}</Link>)}</div></div> : <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <a className="header-call" href="tel:+16047806000"><span>24/7 service</span>604-780-6000</a>
        <a className="header-quote" href="/contact">Request a quote</a>
      </div>
      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {nav.map((item) => item.children ? <details className="mobile-submenu" key={item.href}><summary>{item.label}</summary>{item.children.map(([label, href]) => <Link href={href} key={`${label}-${href}`}>{label}</Link>)}</details> : <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <a href="/book">Book a service</a>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="kicker light">Ready when you are</p>
        <h2>Let&apos;s power what&apos;s next.</h2>
        <div className="footer-actions">
          <a className="button orange" href="tel:+16047806000">Call 604-780-6000</a>
          <a className="button ghost-light" href="mailto:info@badeshaelectrical.com">Email our team</a>
        </div>
      </div>
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" href="/" aria-label="Badesha Electrical Ltd. home"><Image src="/images/logo-mark.png" alt="" width={512} height={512} /><span><strong>Badesha</strong><small>Electrical Ltd.</small></span></Link>
          <p>Residential, commercial and industrial electrical expertise across Greater Vancouver.</p>
        </div>
        <div><strong>Visit</strong><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/service-areas">Service areas</Link><Link href="/about">About</Link><Link href="/safety">Safety</Link></div>
        <div><strong>Popular services</strong><Link href="/services/residential-electrician-surrey">Residential electrical</Link><Link href="/services/commercial-electrical-services">Commercial electrical</Link><Link href="/services/emergency-electrician">24-hour emergency</Link><Link href="/services/generators-transfer-switches">Generators</Link></div>
        <div><strong>Contact</strong><a href="tel:+16047806000">604-780-6000</a><a href="mailto:info@badeshaelectrical.com">info@badeshaelectrical.com</a><span>Monday to Friday, 8:00 a.m. to 5:00 p.m.</span></div>
      </div>
      <div className="footer-bottom">
        <div className="footer-credit">
          <span>{new Date().getFullYear()} Badesha Electrical Ltd. All rights reserved.</span>
          <span>Web designed by <a href="https://www.instagram.com/agdigitalz/" target="_blank" rel="noopener noreferrer">AG Digitalz</a></span>
        </div>
        <span>Surrey, British Columbia</span>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="page-intro"><p className="kicker">{eyebrow}</p><h1>{title}</h1><div className="page-intro-copy">{children}</div></section>;
}

export function ContactStrip() {
  return <section className="contact-strip"><div><p className="kicker light">Need an electrician?</p><h2>Talk to a real person.</h2></div><div><a href="tel:+16047806000">604-780-6000</a><span>24/7 emergency response available</span></div></section>;
}
