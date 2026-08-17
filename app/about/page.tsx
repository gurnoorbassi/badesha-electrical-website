import Image from "next/image";
import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { pageMetadata } from "../seo";
import { googleReviewsUrl, siteUrl } from "../content";

export const metadata = pageMetadata({ title: "About Badesha Electrical", description: "Meet Badesha Electrical, a licensed and insured Surrey electrical contractor with more than 30 years of residential and commercial experience.", path: "/about", image: "/images/residential-fairfield.jpg" });

const aboutSchema = { "@context": "https://schema.org", "@type": "AboutPage", name: "About Badesha Electrical", url: `${siteUrl}/about`, about: { "@id": `${siteUrl}/#business` }, isPartOf: { "@id": `${siteUrl}/#website` } };

export default function AboutPage() {
  return <main><PageIntro eyebrow="About Badesha" title="Pride in the work. Respect for the people."><p>Badesha Electrical Ltd. is a Surrey-based electrical contractor serving residential, commercial and industrial clients across Greater Vancouver.</p></PageIntro>
    <section className="about-feature"><Image src="/images/residential-fairfield.jpg" alt="Contemporary custom home from the Badesha Properties residential portfolio" width={1536} height={745} priority sizes="(max-width: 980px) 100vw, 50vw" /><div><p className="kicker">Our story</p><h2>More than 30 years of practical electrical experience.</h2><p>Our team brings decades of experience to ceiling fans, backup generators, transfer switches, electrical construction, service upgrades and complex commercial installations.</p><p>We focus on clear communication, quality workmanship and fair pricing. Whether the job is a home upgrade or a multi-unit project, the standard stays the same: do the work carefully and stand behind the result.</p></div></section>
    <section className="values-grid"><article><span>01</span><h3>Professional</h3><p>We plan well, communicate clearly and treat every property and jobsite with respect.</p></article><article><span>02</span><h3>Experienced</h3><p>Three decades in the trade gives our team the judgment to solve problems efficiently.</p></article><article><span>03</span><h3>Accountable</h3><p>We take ownership of the details, from the first conversation through final testing.</p></article></section>
    <section className="reviews-block" id="reviews"><div><p className="kicker light">Google reviews</p><h2>What our clients say.</h2><div className="review-rating"><strong>5.0 / 5</strong></div><a className="review-source" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">View all reviews on Google</a></div><blockquote><p>Amazing work, did the electrical scope on my rental building and couldn&apos;t think of anyone else to do it better.</p><cite>Gurbaj Gill · Google review</cite></blockquote><blockquote><p>Best rates, best service, friendly staff.</p><cite>J S Badesha · Google review</cite></blockquote><blockquote><p>Good job.</p><cite>Balkar Singh · Google review</cite></blockquote></section>
    <ContactStrip /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} /></main>;
}
