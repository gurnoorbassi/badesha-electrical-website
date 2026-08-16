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
  return <main><PageIntro eyebrow="Project portfolio" title="Powering communities across B.C."><p>A selection of multi-family, townhouse, rental and industrial projects completed or underway across the Lower Mainland.</p></PageIntro>
    <section className="project-index">{projects.map((project, index) => <article key={project.title}><div className="project-number">{String(index + 1).padStart(2, "0")}</div><Link className="project-index-image" href={`/projects/${project.slug}`}><Image src={project.image} alt={`${project.title} in ${project.location}`} width={1000} height={720} priority={index === 0} sizes="(max-width: 980px) 100vw, 48vw" /></Link><div className="project-meta"><span>{project.status} · {project.type}</span><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p className="location">{project.location}</p><p>{project.detail}</p><Link className="text-link" href={`/projects/${project.slug}`}>View project details</Link></div></article>)}</section>
    <ContactStrip /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectIndexSchema) }} /></main>;
}
