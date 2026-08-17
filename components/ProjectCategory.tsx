import Image from "next/image";
import Link from "next/link";
import { projects, siteUrl } from "../app/content";
import { ContactStrip, PageIntro } from "./SiteShell";

const residentialImages = [
  ["/images/residential-modern-farmhouse.jpg", "Modern farmhouse"],
  ["/images/residential-fairfield.jpg", "Fairfield residence"],
  ["/images/residential-fairfield-infill.jpg", "Fairfield infill residence"],
  ["/images/residential-macdonald-park.jpg", "MacDonald Park residence"],
  ["/images/residential-alberg-lane.jpg", "Alberg Lane residence"],
  ["/images/residential-fairfield-east.jpg", "Fairfield East residence"],
  ["/images/residential-linwood.jpg", "Linwood townhomes"],
  ["/images/residential-mcdonald-residences.jpg", "McDonald Park residences"],
  ["/images/residential-mt-douglas.jpg", "Mt. Douglas residence"],
  ["/images/residential-south-oak-bay.jpg", "South Oak Bay residence"],
] as const;

export function ProjectCategory({ eyebrow, title, description, path, slugs, showResidentialGallery = false }: { eyebrow: string; title: string; description: string; path: string; slugs: readonly string[]; showResidentialGallery?: boolean }) {
  const selected = projects.filter((project) => slugs.includes(project.slug));
  const canonical = `${siteUrl}${path}`;
  const schema = [
    { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: canonical, isPartOf: { "@id": `${siteUrl}/#website` } },
    { "@context": "https://schema.org", "@type": "ItemList", itemListElement: selected.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.title, url: `${siteUrl}/projects/${project.slug}` })) },
  ];

  return <main>
    <nav className="breadcrumb category-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/projects">Projects</Link><span>/</span><span aria-current="page">{eyebrow}</span></nav>
    <PageIntro eyebrow={eyebrow} title={title}><p>{description}</p><Link className="button dark" href="/contact">Discuss a project</Link></PageIntro>
    <section className="section category-projects"><div className="section-heading compact"><div><p className="kicker">Selected work</p><h2>{selected.length} project{selected.length === 1 ? "" : "s"} in this category.</h2></div><Link className="text-link" href="/projects">View complete portfolio</Link></div><div className="category-project-grid">{selected.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><Image src={project.image} alt={`${project.title} in ${project.location}`} width={1000} height={720} sizes="(max-width: 760px) 100vw, 50vw" /><div><span>{project.status} · {project.type}</span><h2>{project.title}</h2><p>{project.location}</p><strong>View project details</strong></div></Link>)}</div></section>
    {showResidentialGallery ? <section className="section property-photo-library"><div className="section-heading"><div><p className="kicker">Residential environments</p><h2>More spaces built for living.</h2></div><p>Additional custom-home and multi-family photography shared from the Badesha Properties portfolio.</p></div><div className="property-photo-grid">{residentialImages.map(([src, label], index) => <figure className={index % 5 === 0 ? "property-photo-wide" : ""} key={src}><Image src={src} alt={`${label} from the Badesha Properties portfolio`} width={1500} height={1000} sizes="(max-width: 700px) 100vw, 33vw" /><figcaption>{label}</figcaption></figure>)}</div></section> : null}
    <ContactStrip />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
