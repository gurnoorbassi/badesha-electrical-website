import type { Metadata } from "next";
import Image from "next/image";
import { ContactStrip, PageIntro } from "../../components/SiteShell";

export const metadata: Metadata = { title: "About Us", description: "Meet Badesha Electrical, a Surrey electrical contractor with more than 30 years of residential and commercial experience.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <main><PageIntro eyebrow="About Badesha" title="Pride in the work. Respect for the people."><p>Badesha Electrical Ltd. is a Surrey-based electrical contractor serving residential, commercial and industrial clients across Greater Vancouver.</p></PageIntro>
    <section className="about-feature"><Image src="/images/about.jpg" alt="A completed Badesha Electrical residential project" width={1200} height={800} sizes="(max-width: 980px) 100vw, 50vw" /><div><p className="kicker">Our story</p><h2>More than 30 years of practical electrical experience.</h2><p>Our team brings decades of experience to ceiling fans, backup generators, transfer switches, electrical construction, service upgrades and complex commercial installations.</p><p>We focus on clear communication, quality workmanship and fair pricing. Whether the job is a home upgrade or a multi-unit project, the standard stays the same: do the work carefully and stand behind the result.</p></div></section>
    <section className="values-grid"><article><span>01</span><h3>Professional</h3><p>We plan well, communicate clearly and treat every property and jobsite with respect.</p></article><article><span>02</span><h3>Experienced</h3><p>Three decades in the trade gives our team the judgment to solve problems efficiently.</p></article><article><span>03</span><h3>Accountable</h3><p>We take ownership of the details, from the first conversation through final testing.</p></article></section>
    <section className="reviews-block" id="reviews"><div><p className="kicker light">Client feedback</p><h2>What our clients say.</h2></div><blockquote><p>Great service from these guys, the best things about dealing with them were the price and quality of work. I wouldn&apos;t think twice about having these guys work in my home.</p><cite>Mehakpreet Singh</cite></blockquote><blockquote><p>The team at Badesha Electrical explained everything clearly and were respectful to me and my property. They completed all work as stated on the quote.</p><cite>Rajwant Sandhu</cite></blockquote></section>
    <ContactStrip /></main>;
}
