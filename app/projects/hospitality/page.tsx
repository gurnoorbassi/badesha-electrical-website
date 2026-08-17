import { ProjectCategory } from "../../../components/ProjectCategory";
import { pageMetadata } from "../../seo";

export const metadata = pageMetadata({ title: "Hospitality Electrical Projects in British Columbia", description: "Explore Badesha Electrical hospitality project experience, including hotel electrical work in Greater Victoria, British Columbia.", path: "/projects/hospitality", image: "/images/four-points-victoria.jpg" });

export default function HospitalityProjectsPage() {
  return <ProjectCategory eyebrow="Hospitality" title="Electrical systems behind the guest experience." description="Hospitality electrical work supporting accommodation, dining, wellness and event spaces across British Columbia." path="/projects/hospitality" slugs={["four-points-victoria-gateway"]} />;
}
