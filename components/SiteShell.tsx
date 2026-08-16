import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["About", "/about"],
  ["Safety", "/safety"],
  ["Contact", "/contact"],
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="logo-link" href="/" aria-label="Badesha Electrical Ltd. home">
        <Image src="/images/logo.png" alt="Badesha Electrical Ltd." width={450} height={200} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="header-call" href="tel:+16047806000"><span>24/7 service</span>604-780-6000</a>
        <a className="header-quote" href="/contact">Request a quote</a>
      </div>
      <details className="mobile-menu">
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
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
          <Image className="footer-logo" src="/images/logo.png" alt="Badesha Electrical Ltd." width={450} height={200} />
          <p>Residential, commercial and industrial electrical expertise across Greater Vancouver.</p>
        </div>
        <div><strong>Visit</strong><a href="/services">Services</a><a href="/projects">Projects</a><a href="/about">About</a><a href="/safety">Safety</a></div>
        <div><strong>Contact</strong><a href="tel:+16047806000">604-780-6000</a><a href="mailto:info@badeshaelectrical.com">info@badeshaelectrical.com</a><span>Monday to Friday, 8:00 a.m. to 5:00 p.m.</span></div>
      </div>
      <div className="footer-bottom"><span>{new Date().getFullYear()} Badesha Electrical Ltd. All rights reserved.</span><span>Surrey, British Columbia</span></div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="page-intro"><p className="kicker">{eyebrow}</p><h1>{title}</h1><div className="page-intro-copy">{children}</div></section>;
}

export function ContactStrip() {
  return <section className="contact-strip"><div><p className="kicker light">Need an electrician?</p><h2>Talk to a real person.</h2></div><div><a href="tel:+16047806000">604-780-6000</a><span>24/7 emergency response available</span></div></section>;
}
