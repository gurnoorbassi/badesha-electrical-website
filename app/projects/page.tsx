import Image from "next/image";
import Link from "next/link";
import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { projects, siteUrl } from "../content";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Electrical Projects in British Columbia", description: "Explore completed and upcoming Badesha Electrical projects across Surrey, Langley, Burnaby, Maple Ridge and British Columbia's Lower Mainland.", path: "/projects" });

const projectIndexSchema = [
  { "@context": "https://schema.org", "@type": "CollectionPage", name: "Badesha Electrical projects", url: `${siteUrl}/projects`, isPartOf: { "@id": `${siteUrl}/#website` } },
  { "@context": "https://schema.org", "@type": "ItemList", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.title, url: `${siteUrl}/projects/${project.slug}` })) },
];

export default function ProjectsPage() {
  const upcoming = projects.filter((project) => project.status === "Upcoming");
  const completed = projects.filter((project) => project.status === "Completed");
  const residential = projects.filter((project) => !project.type.toLowerCase().includes("industrial") && project.type !== "Hospitality");
  const commercial = projects.filter((project) => project.type.toLowerCase().includes("industrial"));
  const hospitality = projects.filter((project) => project.type === "Hospitality");
  const renderProjects = (items: readonly (typeof projects)[number][], start = 0) => <div className="project-index">{items.map((project, index) => <article key={project.title}><div className="project-number">{String(start + index + 1).padStart(2, "0")}</div><Link className="project-index-image" href={`/projects/${project.slug}`}><Image src={project.image} alt={`${project.title} in ${project.location}`} width={1000} height={720} priority={start === 0 && index === 0} sizes="(max-width: 980px) 100vw, 48vw" /></Link><div className="project-meta"><span>{project.status} · {project.type}</span><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p className="location">{project.location}</p><p>{project.detail}</p><Link className="text-link" href={`/projects/${project.slug}`}>View project details</Link></div></article>)}</div>;
  return <main><PageIntro eyebrow="Project portfolio" title="Powering communities across B.C."><p>A selection of multi-family, townhouse, rental and industrial projects completed or underway across the Lower Mainland.</p></PageIntro>
    <nav className="page-tabs" aria-label="Project categories"><a href="#upcoming">Upcoming</a><a href="#completed">Completed</a><Link href="/projects/residential-multi-family">Residential &amp; multi-family</Link><Link href="/projects/commercial-industrial">Commercial &amp; industrial</Link><Link href="/projects/hospitality">Hospitality</Link></nav>
    <section className="portfolio-section" id="upcoming"><div className="portfolio-heading"><p className="kicker">Currently underway</p><h2>Upcoming projects.</h2><span>{upcoming.length} projects</span></div>{renderProjects(upcoming)}</section>
    <section className="portfolio-section portfolio-section-muted" id="completed"><div className="portfolio-heading"><p className="kicker">Delivered work</p><h2>Completed projects.</h2><span>{completed.length} projects</span></div>{renderProjects(completed, upcoming.length)}</section>
    <section className="portfolio-categories"><Link className="portfolio-category-card" href="/projects/residential-multi-family"><span>01</span><p>Residential &amp; multi-family</p><strong>{residential.length} projects</strong><b>Open category</b></Link><Link className="portfolio-category-card" href="/projects/commercial-industrial"><span>02</span><p>Commercial &amp; industrial</p><strong>{commercial.length} project</strong><b>Open category</b></Link><Link className="portfolio-category-card" href="/projects/hospitality"><span>03</span><p>Hospitality</p><strong>{hospitality.length} project</strong><b>Open category</b></Link></section>
    <ContactStrip /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectIndexSchema) }} /></main>;
}
