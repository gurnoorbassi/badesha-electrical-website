import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactStrip } from "../../../components/SiteShell";
import { projects, siteUrl } from "../../content";
import { pageMetadata } from "../../seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.title} Electrical Project — ${project.location}`;
  const description = `${project.title} in ${project.location}: ${project.detail}`;
  return pageMetadata({ title, description, path: `/projects/${project.slug}`, image: project.image, type: "article" });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const canonical = `${siteUrl}/projects/${project.slug}`;
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const schema = [
    { "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${canonical}#project`, name: project.title, description: project.detail, url: canonical, image: `${siteUrl}${project.image}`, locationCreated: { "@type": "Place", name: project.location }, creator: { "@id": `${siteUrl}/#business` } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` }, { "@type": "ListItem", position: 3, name: project.title, item: canonical }] },
  ];
  return <main>
    <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/projects">Projects</Link><span>/</span><span aria-current="page">{project.title}</span></nav>
    <section className="project-detail-hero"><div className="project-detail-title"><p className="kicker">{project.status} project</p><h1>{project.title}</h1><p>{project.location}</p></div><div className="project-detail-media"><Image src={project.image} alt={`${project.title} development in ${project.location}`} fill priority sizes="100vw" /></div></section>
    <section className="project-detail-overview" aria-label="Project summary"><div><span>Project type</span><strong>{project.type}</strong></div><div><span>Location</span><strong>{project.location}</strong></div><div><span>Portfolio status</span><strong>{project.status}</strong></div><p>{project.detail}</p></section>
    <section className="project-profile section">
      <div className="project-profile-copy"><p className="kicker">Project profile</p><h2>The development at a glance.</h2>{project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<p className="project-update"><span>Latest public update</span><strong>{project.update}</strong></p></div>
      <div className="project-facts" aria-label={`${project.title} project facts`}>{project.facts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    </section>
    <section className="project-highlights section"><div><p className="kicker">Key details</p><h2>What defines the project.</h2></div><div className="project-highlight-list">{project.highlights.map((highlight, index) => <div key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><p>{highlight}</p></div>)}</div><a className="text-link project-source" href={project.sourceUrl} target="_blank" rel="noreferrer">View {project.sourceLabel}<span aria-hidden="true"> ↗</span></a></section>
    <section className="section related-services"><div className="section-heading compact"><div><p className="kicker">More project experience</p><h2>Work across the Lower Mainland.</h2></div><Link className="text-link" href="/projects">View every project</Link></div><div className="related-project-grid">{related.map((item) => <Link href={`/projects/${item.slug}`} key={item.slug}><Image src={item.image} alt={`${item.title} in ${item.location}`} width={700} height={500} sizes="(max-width: 700px) 100vw, 33vw" /><span>{item.status}</span><h3>{item.title}</h3><p>{item.location}</p></Link>)}</div></section>
    <ContactStrip />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
