"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelectors = [
  ".trust-bar > *",
  ".section-heading > *",
  ".sector-card",
  ".service-row",
  ".residential-showcase-copy > *",
  ".residential-image",
  ".story-copy > *",
  ".story-image",
  ".project-card",
  ".review-section > *",
  ".page-intro > *",
  ".service-detail-list article",
  ".project-index article",
  ".portfolio-category-card",
  ".category-project-grid > a",
  ".property-photo-grid figure",
  ".service-page-grid > a",
  ".about-feature > *",
  ".values-grid article",
  ".reviews-block > *",
  ".safety-layout > *",
  ".contact-page > *",
  ".contact-map > *",
  ".inquiry-section > *",
  ".booking-grid > *",
  ".detail-hero > *",
  ".detail-proof > *",
  ".detail-service-grid article",
  ".faq-section > *",
  ".related-grid > a",
  ".project-detail-overview > *",
  ".project-profile > *",
  ".project-highlights > *",
  ".project-facts > div",
  ".area-grid > *",
  ".location-hero > *",
  ".location-overview > *",
  ".footer-lead > *",
  ".footer-grid > *",
].join(",");

export function MotionEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.toggle("motion-enabled", !reduceMotion);
    root.classList.toggle("motion-reduced", reduceMotion);

    if (reduceMotion) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors));
    targets.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-delay", `${(index % 5) * 70}ms`);
      element.dataset.motionDirection = index % 3 === 1 ? "left" : index % 3 === 2 ? "right" : "up";
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach((element) => observer.observe(element));

    const progress = document.querySelector<HTMLElement>(".motion-scroll-progress");
    const header = document.querySelector<HTMLElement>(".site-header");
    let frame = 0;

    const updateScrollMotion = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      progress?.style.setProperty("--scroll-progress", String(ratio));
      header?.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
      targets.forEach((element) => {
        element.classList.remove("motion-reveal", "motion-visible");
        element.style.removeProperty("--motion-delay");
        delete element.dataset.motionDirection;
      });
    };
  }, [pathname]);

  return <span className="motion-scroll-progress" aria-hidden="true" />;
}
