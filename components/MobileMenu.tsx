"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export type NavigationItem = {
  label: string;
  href: string;
  children?: readonly (readonly [string, string])[];
};

export function MobileMenu({ items }: { items: readonly NavigationItem[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => menuRef.current?.removeAttribute("open");

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <details className="mobile-menu" ref={menuRef}>
      <summary aria-label="Toggle navigation menu">
        <span className="menu-open-label">Menu</span>
        <span className="menu-close-label">Close</span>
        <span className="menu-toggle-icon" aria-hidden="true" />
      </summary>
      <nav aria-label="Mobile navigation">
        <p className="mobile-nav-label">Navigation</p>
        {items.map((item) => item.children ? (
          <details className="mobile-submenu" key={item.href}>
            <summary>{item.label}<span aria-hidden="true" /></summary>
            <div className="mobile-submenu-links">
              <Link className="mobile-view-all" href={item.href} onClick={closeMenu}>View all {item.label.toLowerCase()}</Link>
              {item.children.map(([label, href]) => <Link href={href} onClick={closeMenu} key={`${label}-${href}`}>{label}</Link>)}
            </div>
          </details>
        ) : <Link className="mobile-primary-link" key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
        <div className="mobile-menu-actions">
          <Link className="button orange" href="/book" onClick={closeMenu}>Book a service</Link>
          <a className="mobile-menu-call" href="tel:+16047806000" onClick={closeMenu}><span>24/7 service line</span>604-780-6000</a>
        </div>
      </nav>
    </details>
  );
}
