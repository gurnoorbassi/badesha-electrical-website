export const siteUrl = "https://badeshaelectrical.com";

export const serviceAreas = ["Surrey", "Langley", "Burnaby", "Maple Ridge", "Delta", "Richmond", "Vancouver", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "North Vancouver", "West Vancouver", "Abbotsford", "Chilliwack", "Mission", "Hope"] as const;

export const locationPages = [
  {
    slug: "surrey",
    city: "Surrey",
    title: "Electrician in Surrey, BC",
    description: "Surrey electrician for residential, commercial, industrial and 24-hour emergency electrical service, backed by more than 30 years of experience.",
    intro: "Badesha Electrical is based in Surrey and serves homeowners, builders, businesses and facility teams throughout the city. The team handles everyday service calls, renovations, electrical construction and urgent power issues with the same focus on safe work and clear communication.",
    detail: "Surrey properties range from established homes and active industrial buildings to growing multi-family communities. Badesha Electrical brings experience across those environments, including residential upgrades, commercial systems, equipment power, lighting, generators and complete electrical delivery for new developments.",
    projectSlugs: ["chronicle", "centro", "nova", "park-maven", "partap-complex", "unison"],
  },
  {
    slug: "langley",
    city: "Langley",
    title: "Electrician Serving Langley, BC",
    description: "Electrical contractor serving Langley homes, businesses and developments with residential, commercial, construction and emergency electrical service.",
    intro: "Badesha Electrical serves Langley with residential, commercial and project electrical expertise. Customers can call for upgrades, troubleshooting, lighting, generators, construction work and emergency electrical response from a Surrey-based team with more than 30 years of experience.",
    detail: "Langley continues to grow through new homes, townhouses, condominium communities and active commercial spaces. Badesha Electrical has project experience in the community and provides practical service for both existing properties and new construction requirements.",
    projectSlugs: ["flora-fauna", "verge"],
  },
  {
    slug: "burnaby",
    city: "Burnaby",
    title: "Electrician Serving Burnaby, BC",
    description: "Electrical contractor serving Burnaby with residential, commercial, construction, panel, lighting, generator and emergency electrical services.",
    intro: "Badesha Electrical serves Burnaby homeowners, property teams and builders with electrical construction, maintenance, upgrades and troubleshooting. The team coordinates work carefully around the property, the electrical load and the people using the space.",
    detail: "Burnaby includes established residential neighbourhoods, multi-family communities, commercial properties and busy transportation connections. Badesha Electrical's experience includes the ELEMENT 1 townhome community near Edmonds SkyTrain station, along with broader service across Greater Vancouver.",
    projectSlugs: ["element-1"],
  },
  {
    slug: "maple-ridge",
    city: "Maple Ridge",
    title: "Electrician Serving Maple Ridge, BC",
    description: "Residential, commercial, construction and emergency electrical services for Maple Ridge properties from experienced Badesha Electrical technicians.",
    intro: "Badesha Electrical serves Maple Ridge with dependable electrical construction and service for homes, businesses and new developments. Available work includes panels, renovations, lighting, equipment power, generators, maintenance and urgent troubleshooting.",
    detail: "Maple Ridge combines established properties with continuing residential and rental development. Badesha Electrical brings Lower Mainland project experience to the area, including Rockridge Living, a purpose-built rental development in Maple Ridge.",
    projectSlugs: ["rockridge-living"],
  },
] as const;

export const servicePages = [
  {
    slug: "residential-electrician-surrey",
    shortTitle: "Residential electrical",
    title: "Residential Electrician in Surrey, BC",
    eyebrow: "Homes and renovations",
    description: "Residential electrician in Surrey for panel upgrades, renovations, lighting, rewiring, ceiling fans and backup power across Greater Vancouver.",
    intro: "Badesha Electrical provides careful residential electrical work for homeowners, renovators and builders throughout Surrey and the Lower Mainland. From a new circuit to a complete service upgrade, every installation is planned around safety, reliability and the finished space.",
    image: "/images/about.jpg",
    services: ["Service and panel upgrades", "Renovation wiring and new circuits", "LED and recessed lighting", "Ceiling fans and chandeliers", "Whole-home rewiring", "Surge protection", "Under-cabinet lighting", "Backup generators and transfer switches"],
    reasons: ["More than 30 years of electrical experience", "Licensed and insured electrical contractor", "Clear estimates before custom work proceeds", "Same-day and 24-hour emergency service available"],
    faqs: [
      ["What residential electrical work does Badesha Electrical handle?", "The team handles renovations, new circuits, lighting, ceiling fans, service and panel upgrades, rewiring, surge protection, generators and electrical troubleshooting."],
      ["Do you provide residential electrical service outside Surrey?", "Yes. Badesha Electrical is based in Surrey and serves residential clients throughout Greater Vancouver and the Lower Mainland."],
      ["Can you replace an older electrical panel?", "Yes. Badesha Electrical installs replacement panels, new services for additional power and repairs damaged or faulty service equipment."],
    ],
  },
  {
    slug: "commercial-electrical-services",
    shortTitle: "Commercial electrical",
    title: "Commercial Electrical Services in Greater Vancouver",
    eyebrow: "Workplaces and active facilities",
    description: "Commercial electrical contractor for lighting, power, data, preventative maintenance and tenant improvements in Surrey and Greater Vancouver.",
    intro: "Badesha Electrical supports businesses, property teams and builders with dependable commercial construction and service. Work is coordinated to protect uptime, communicate clearly with stakeholders and deliver an electrical system that is ready for daily operations.",
    image: "/images/partap.jpg",
    services: ["Commercial construction", "Office and warehouse lighting", "Retail and tenant improvements", "Equipment hookups and power drops", "Data and communication cabling", "Fire alarm electrical work", "Thermography scans and reports", "Preventative maintenance"],
    reasons: ["Experience across retail, healthcare and commercial facilities", "Service for active workplaces and strata properties", "Lighting upgrades and specialized receptacles", "Responsive maintenance and emergency support"],
    faqs: [
      ["What commercial properties do you work in?", "Badesha Electrical serves retail, office, warehouse, healthcare, strata, food-processing and other active commercial environments."],
      ["Can you work around an operating business?", "Commercial service is planned with owners and facility teams so access, shutdowns and the work sequence can be coordinated around operations."],
      ["Do you provide preventative electrical maintenance?", "Yes. Available services include troubleshooting, lighting maintenance, equipment power work and thermography scans and reports."],
    ],
  },
  {
    slug: "industrial-electrical-services",
    shortTitle: "Industrial electrical",
    title: "Industrial Electrical Services in Surrey and the Lower Mainland",
    eyebrow: "Power for demanding operations",
    description: "Industrial electrical services for equipment hookups, power distribution, lighting, maintenance and construction across Surrey and the Lower Mainland.",
    intro: "Industrial electrical work has to account for equipment, production schedules and long-term serviceability. Badesha Electrical brings practical field experience to new construction, equipment power, facility upgrades and maintenance for industrial and manufacturing environments.",
    image: "/images/partap.jpg",
    services: ["Industrial construction", "Equipment power and hookups", "Power drops and equipment relocation", "Warehouse and site lighting", "Electrical infrastructure upgrades", "Specialized receptacles and circuits", "Preventative maintenance", "Emergency troubleshooting"],
    reasons: ["Hands-on experience in industrial settings", "Planning around equipment and facility operations", "Support for new and existing infrastructure", "Commercial and emergency service from one team"],
    faqs: [
      ["Does Badesha Electrical handle industrial equipment hookups?", "Yes. Industrial services include equipment power, hookups, relocation power drops, specialized circuits and related electrical infrastructure."],
      ["Can you upgrade electrical infrastructure in an existing facility?", "Yes. The team works on service upgrades, circuits, lighting systems and other electrical infrastructure in existing industrial buildings."],
      ["Is emergency industrial electrical service available?", "Yes. A service technician is available 24 hours a day for urgent electrical repairs and power issues."],
    ],
  },
  {
    slug: "emergency-electrician",
    shortTitle: "24-hour emergency",
    title: "24-Hour Emergency Electrician in Surrey, BC",
    eyebrow: "Urgent electrical response",
    description: "Call Badesha Electrical for 24-hour emergency electrical service, urgent troubleshooting and repairs in Surrey and across Greater Vancouver.",
    intro: "Electrical problems do not follow business hours. Badesha Electrical keeps a service technician available around the clock for urgent power issues, repairs and troubleshooting across its Greater Vancouver service area.",
    image: "/images/hero.png",
    services: ["Urgent electrical troubleshooting", "Power and wiring repairs", "Electrical maintenance", "Fire alarm electrical issues", "Equipment power problems", "Lighting failures", "Generator and transfer-switch issues", "After-hours service response"],
    reasons: ["24-hour technician availability", "A real phone number for immediate assistance", "Residential, commercial and industrial experience", "Surrey-based service across Greater Vancouver"],
    faqs: [
      ["Is Badesha Electrical available 24 hours a day?", "Yes. Badesha Electrical offers 24-hour emergency electrical service with a technician available for urgent issues."],
      ["What should I do during an electrical emergency?", "Move away from exposed wiring, smoke, heat or damaged equipment and call emergency services if there is immediate danger. For urgent electrical assistance, call Badesha Electrical at 604-780-6000."],
      ["What areas do you cover for emergency service?", "Badesha Electrical is based in Surrey and provides electrical service across Greater Vancouver and the Lower Mainland."],
    ],
  },
  {
    slug: "generators-transfer-switches",
    shortTitle: "Generators and backup power",
    title: "Generator and Transfer Switch Installation in Surrey",
    eyebrow: "Reliable backup power",
    description: "Generator and transfer switch installation, service and preventative maintenance for homes and businesses in Surrey and Greater Vancouver.",
    intro: "Backup power can protect essential home and business systems during an outage. Badesha Electrical installs generators and transfer switches sized around the circuits or property areas that need dependable power when the utility supply is unavailable.",
    image: "/images/about.jpg",
    services: ["Backup generator installation", "Transfer switch and transfer panel installation", "Whole-home and selected-circuit planning", "Generator electrical connections", "Existing system troubleshooting", "Preventative maintenance", "Residential backup power", "Commercial backup power"],
    reasons: ["Certified Generac installer and service provider", "Systems planned for selected circuits or whole properties", "Installation and preventative maintenance support", "Residential and commercial electrical experience"],
    faqs: [
      ["Does Badesha Electrical install Generac generators?", "Yes. Badesha Electrical is a certified installer and service provider for Generac generators and also provides preventative maintenance."],
      ["Can a generator power an entire home?", "A backup system can be designed for selected essential circuits or a larger portion of a home or business. The appropriate setup depends on the equipment and available capacity."],
      ["Do you install transfer switches?", "Yes. Badesha Electrical installs transfer switches and transfer panels as part of residential and commercial backup-power systems."],
    ],
  },
  {
    slug: "electrical-panel-upgrades",
    shortTitle: "Panel and service upgrades",
    title: "Electrical Panel and Service Upgrades in Surrey",
    eyebrow: "Capacity, safety and reliability",
    description: "Electrical panel replacements, service upgrades, repairs and added capacity for homes and businesses in Surrey and Greater Vancouver.",
    intro: "An electrical service or panel upgrade can provide additional capacity, replace failing equipment and support renovations or new loads. Badesha Electrical assesses the existing system and plans the work required for a safe, practical upgrade.",
    image: "/images/element.jpg",
    services: ["Electrical panel replacement", "New services for additional power", "Repairs to faulty service equipment", "Renovation capacity planning", "New appliance and equipment circuits", "Lighting and receptacle circuits", "Service troubleshooting", "Residential and commercial upgrades"],
    reasons: ["Experience with new and existing buildings", "Clear planning around additional electrical loads", "Repairs and full replacement options", "Support for renovations and equipment changes"],
    faqs: [
      ["When might an electrical panel need replacement?", "Replacement may be appropriate when equipment is failing or damaged, when additional capacity is needed, or when renovation and equipment plans require a different service setup."],
      ["Can you add circuits for a renovation?", "Yes. Badesha Electrical installs new circuits for appliances, lighting and power as part of residential and commercial renovation work."],
      ["Do you repair electrical service equipment?", "Yes. The team repairs damaged or faulty service equipment and can recommend replacement when repair is not the appropriate option."],
    ],
  },
] as const;

export const primaryServices = [
  { number: "01", title: "Electrical construction", summary: "Complete electrical scopes for multi-family, retail, industrial, healthcare, food-processing and manufacturing projects.", items: ["New construction", "Design-build delivery", "Site development", "Equipment power and hookups"], href: "/services/commercial-electrical-services" },
  { number: "02", title: "Commercial service", summary: "Responsive electrical service for active workplaces, strata properties, warehouses and commercial facilities.", items: ["Troubleshooting", "Lighting and outlet setup", "Power drops", "Preventative maintenance"], href: "/services/commercial-electrical-services" },
  { number: "03", title: "Residential electrical", summary: "Safe, careful electrical work for renovations, upgrades, lighting, fans and backup power systems.", items: ["Panel and service upgrades", "Rewiring and new circuits", "LED and recessed lighting", "Generators and transfer switches"], href: "/services/residential-electrician-surrey" },
  { number: "04", title: "24-hour emergency", summary: "A technician is available around the clock for urgent electrical repairs and power issues.", items: ["Repair and maintenance", "Power wiring", "Fire alarm", "Emergency troubleshooting"], href: "/services/emergency-electrician" },
] as const;

export const projects = [
  { slug: "chronicle", legacySlugs: ["chronicle"], title: "Chronicle", location: "Cloverdale, Surrey", status: "Upcoming", type: "Multi-family residential", image: "/images/chronicle.jpg", detail: "Modern one- and two-bedroom homes connecting Cloverdale's past with its future." },
  { slug: "centro", legacySlugs: ["centro"], title: "Centro", location: "Central City, Surrey", status: "Upcoming", type: "Purpose-built rental", image: "/images/centro.jpg", detail: "A 60-unit purpose-built rental development in an amenity-rich central location." },
  { slug: "nova", legacySlugs: ["nova"], title: "Nova", location: "Fleetwood, Surrey", status: "Upcoming", type: "Master-planned community", image: "/images/nova.webp", detail: "A multi-phase master-planned residential community in central Fleetwood." },
  { slug: "rockridge-living", legacySlugs: ["rockridge-living"], title: "Rockridge Living", location: "Maple Ridge", status: "Upcoming", type: "Purpose-built rental", image: "/images/rockridge.jpg", detail: "A 64-unit purpose-built rental development in Maple Ridge." },
  { slug: "park-maven", legacySlugs: ["park-maven-condo-19310-fraser-highway-surrey"], title: "Park & Maven", location: "Cloverdale, Surrey", status: "Upcoming", type: "Master-planned community", image: "/images/park-maven.jpg", detail: "A seven-building master-planned community with up to 595 condominium homes." },
  { slug: "flora-fauna", legacySlugs: ["flora-fauna-20267-72-avenue-langley"], title: "Flora & Fauna", location: "Langley", status: "Completed", type: "Condominium community", image: "/images/hero.png", detail: "A 132-home condominium community by Tangerine Developments and Sagebrooke Properties." },
  { slug: "element-1", legacySlugs: ["element-1-7131-17th-ave-burnaby"], title: "ELEMENT 1", location: "Burnaby", status: "Completed", type: "Townhome community", image: "/images/element.jpg", detail: "A collection of 23 townhomes near Edmonds SkyTrain station." },
  { slug: "partap-complex", legacySlugs: ["partap-complex-12082-90-avenue-surrey-british-columbia"], title: "Partap Complex", location: "Newton, Surrey", status: "Completed", type: "Industrial development", image: "/images/partap.jpg", detail: "A modern industrial development with direct access to Scott Road and Nordel Way." },
  { slug: "unison", legacySlugs: ["unison-14225-103-a-avenue-surrey-bc"], title: "Unison", location: "Surrey", status: "Completed", type: "Condominium development", image: "/images/unison.jpg", detail: "An 80-home condominium development by Ecogen Properties." },
  { slug: "verge", legacySlugs: ["verge-langley-city"], title: "Verge", location: "Langley", status: "Completed", type: "Townhome community", image: "/images/verge.jpg", detail: "A 107-home townhouse development completed in 2022." },
] as const;

export const bookableServices = [
  { title: "LED pot light installation", price: "$80 / pc", note: "Professional LED pot light installation for a clean, efficient lighting upgrade." },
  { title: "Washroom fan replacement", price: "$180 / unit", note: "Replacement service to restore reliable washroom ventilation." },
  { title: "Ceiling fan or chandelier installation", price: "$220 / unit", note: "Careful installation and connection of your fan or chandelier." },
  { title: "Electrical troubleshooting", price: "$150 / visit", note: "On-site diagnosis for electrical faults, outages and inconsistent operation." },
] as const;
