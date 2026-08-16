import type { Metadata } from "next";
import Image from "next/image";
import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { projects } from "../content";

export const metadata: Metadata = { title: "Electrical Projects", description: "Explore Badesha Electrical project experience across Surrey, Langley, Burnaby and Maple Ridge.", alternates: { canonical: "/projects" } };

export default function ProjectsPage() {
  return <main><PageIntro eyebrow="Project portfolio" title="Powering communities across B.C."><p>A selection of multi-family, townhouse, rental and industrial projects completed or underway across the Lower Mainland.</p></PageIntro>
    <section className="project-index">{projects.map((project, index) => <article key={project.title}><div className="project-number">{String(index + 1).padStart(2, "0")}</div><Image src={project.image} alt={`${project.title} in ${project.location}`} width={1000} height={720} sizes="(max-width: 980px) 100vw, 48vw" /><div className="project-meta"><span>{project.status}</span><h2>{project.title}</h2><p className="location">{project.location}</p><p>{project.detail}</p></div></article>)}</section>
    <ContactStrip /></main>;
}
