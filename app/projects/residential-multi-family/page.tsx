import { ProjectCategory } from "../../../components/ProjectCategory";
import { pageMetadata } from "../../seo";

export const metadata = pageMetadata({ title: "Residential & Multi-Family Electrical Projects", description: "Explore Badesha Electrical residential, condominium, townhouse and rental project experience across British Columbia and the Lower Mainland.", path: "/projects/residential-multi-family", image: "/images/residential-modern-farmhouse.jpg" });

const slugs = ["chronicle", "centro", "nova", "rockridge-living", "park-maven", "flora-fauna", "element-1", "unison", "verge"];

export default function ResidentialProjectsPage() {
  return <ProjectCategory eyebrow="Residential & multi-family" title="Electrical work for where people live." description="Custom homes, condominiums, townhouses and purpose-built rental communities supported by experienced electrical delivery." path="/projects/residential-multi-family" slugs={slugs} showResidentialGallery />;
}
