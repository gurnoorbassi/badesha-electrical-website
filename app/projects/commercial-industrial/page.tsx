import { ProjectCategory } from "../../../components/ProjectCategory";
import { pageMetadata } from "../../seo";

export const metadata = pageMetadata({ title: "Commercial & Industrial Electrical Projects", description: "Explore Badesha Electrical commercial and industrial project experience in Surrey and across British Columbia's Lower Mainland.", path: "/projects/commercial-industrial", image: "/images/partap.jpg" });

export default function CommercialProjectsPage() {
  return <ProjectCategory eyebrow="Commercial & industrial" title="Power for demanding operations." description="Electrical construction and infrastructure experience for industrial properties, active businesses and commercial environments." path="/projects/commercial-industrial" slugs={["partap-complex"]} />;
}
