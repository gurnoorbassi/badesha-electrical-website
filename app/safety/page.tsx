import { ContactStrip, PageIntro } from "../../components/SiteShell";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({ title: "Electrical Health and Safety", description: "Learn how Badesha Electrical approaches safe electrical work through training, regular safety meetings, jobsite planning and open communication.", path: "/safety" });

export default function SafetyPage() {
  return <main><PageIntro eyebrow="Health & safety" title="Safety is a way of working."><p>Safe electrical work starts with training, communication and a shared responsibility to protect every person on the jobsite.</p></PageIntro>
    <section className="safety-layout"><div className="safety-statement"><span>Our commitment</span><h2>People are our most important asset.</h2><p>Badesha Electrical is dedicated to providing the highest level of health and safety for our people, customers and suppliers.</p></div><div className="safety-copy"><p>Our policies are designed to provide every employee with a healthy work environment that is safe from physical and environmental hazards. We believe a safe workplace strengthens performance, productivity and morale.</p><p>Every team member is encouraged to voice issues or concerns through open communication at all levels of the organization.</p><p>Extensive training and regular safety meetings are led by Badesha Electrical’s electrical manager, with additional annual training for certified technicians.</p><ul><li>Regular safety meetings</li><li>Ongoing technician training</li><li>Open reporting and communication</li><li>Jobsite planning and hazard awareness</li></ul></div></section>
    <ContactStrip /></main>;
}
