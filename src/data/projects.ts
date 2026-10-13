import education from "@/assets/official-local/education.jpg";
import schoolwork from "@/assets/official-local/schoolwork.jpg";
// community unused
import widows from "@/assets/official-local/widows.jpg";
import health from "@/assets/official-local/health.jpg";
import midwifery from "@/assets/official-local/midwifery.jpg";
import digital from "@/assets/official-local/digital.jpg";
import { foundationMedia } from "./foundationMedia";

export type ProjectLayout = "statement" | "horizontal" | "portrait" | "data" | "map" | "object";

export interface Project {
  slug: string;
  name: string;
  short: string;
  /** The single problem this project exists to answer. */
  problem: { figure: string; unit: string; line: string; source: string };
  problemImage?: string;
  responseImage?: string;
  context: string[];
  response: string[];
  outcomes: { label: string; value: string; href?: string }[];
  image: string;
  gallery: string[];
  heroPosition: string;
  accent: "clay" | "moss" | "sand";
  layout: ProjectLayout;
}

export const projects: Project[] = [
  {
    slug: "education-for-all",
    name: "Education For All",
    short: "Free schooling, books and daily support for children locked out of the classroom.",
    problem: {
      figure: "26",
      unit: "million",
      line: "children in Pakistan are not in school.",
      source: "UNICEF Pakistan, education estimates",
    },
    problemImage: schoolwork,
    responseImage: education,
    context: [
      "Pakistan has one of the largest out-of-school populations on earth. Poverty, distance, and the cost of books and uniforms decide who learns and who does not.",
      "For girls in rural districts the odds narrow further — a single school fee can end an education permanently.",
    ],
    response: [
      "ELF runs and supports free community schooling, covering tuition, books, uniforms and stationery so that cost never becomes the reason a child leaves.",
      "Teachers are trained and paid locally, and families receive follow-up so enrolment turns into attendance.",
    ],
    outcomes: [
      { label: "Focus", value: "Primary & secondary" },
      { label: "Cost to family", value: "Zero" },
      { label: "Reach", value: "81 Schools · 8,704 Students" },
    ],
    image: foundationMedia.schoolStudents,
    gallery: [
      "/images/education/edu-1.jpg",
      "/images/education/edu-2.jpg",
      "/images/education/edu-3.jpg",
      "/images/education/edu-4.jpg",
      "/images/education/edu-5.jpg",
      "/images/education/edu-6.jpg",
      "/images/education/edu-7.jpg",
      "/images/education/edu-8.jpg",
    ],
    heroPosition: "object-top",
    accent: "clay",
    layout: "map",
  },
  {
    slug: "school-bags",
    name: "School Bags Distribution Program",
    short: "A sponsored bag, packed and delivered to a named child — trackable end to end.",
    problem: {
      figure: "1",
      unit: "bag",
      line: "is often the difference between attending and dropping out.",
      source: "ELF field reporting",
    },
    problemImage: "/images/school-bags/school-bags-problem.jpg",
    responseImage: "/images/school-bags/IMG_9475.JPG",
    context: [
      "Stationery is not a small thing. When a family cannot supply a notebook, a child is sent home, and being sent home repeatedly ends in leaving.",
    ],
    response: [
      "Each sponsored bag is packed with books, notebooks and supplies, tagged with a tracking ID, and delivered to a named student.",
      "Sponsors follow the bag from packing to the child's hands.",
    ],
    outcomes: [
      { label: "Traceable", value: "Every bag" },
      { label: "Contents", value: "Full year of supplies" },
      { label: "Delivered to", value: "A named child" },
    ],
    image: "/images/school-bags/IMG_9475.JPG",
    gallery: [
      "/images/school-bags/DSC09371.JPG",
      "/images/school-bags/DSC09450.JPG",
      "/images/school-bags/DSC00031.JPG",
      "/images/school-bags/DSC09762.JPG",
      "/images/school-bags/DSC01043.JPG",
      "/images/school-bags/DSC02270.JPG",
      "/images/school-bags/DSC01553.JPG",
      "/images/school-bags/DSC02868.JPG",
    ],
    heroPosition: "object-[center_28%]",
    accent: "clay",
    layout: "object",
  },
  {
    slug: "midwifery-program",
    name: "Midwifery Training Program",
    short: "Training skilled birth attendants where hospitals are hours away.",
    problem: {
      figure: "155",
      unit: "deaths",
      line: "per 100,000 live births — Pakistan's maternal mortality ratio.",
      source: "Pakistan Maternal Mortality Survey",
    },
    problemImage: "/images/midwifery/midwifery-problem.jpg",
    responseImage: "/images/midwifery/midwifery-training-1.jpg",
    context: [
      "Most maternal deaths are preventable with a skilled attendant present. In remote districts, there often isn't one.",
    ],
    response: [
      "ELF trains and equips community midwives so safe delivery does not depend on reaching a distant hospital in time.",
    ],
    outcomes: [
      { label: "Trained", value: "Community midwives" },
      { label: "Placed", value: "In home districts" },
      { label: "Focus", value: "Safe Delivery & Serve the Community" },
    ],
    image: "/images/midwifery/midwifery-training-2.jpg",
    gallery: [
      "/images/midwifery/midwifery-training-1.jpg",
      "/images/midwifery/midwifery-training-2.jpg",
      "/images/midwifery/midwifery-training-3.jpg",
      "/images/midwifery/midwifery-training-4.jpg",
      "/images/midwifery/midwifery-training-5.jpg",
      "/images/midwifery/midwifery-training-6.jpg",
      "/images/midwifery/midwifery-training-7.jpg",
      "/images/midwifery/midwifery-training-8.jpg",
    ],
    heroPosition: "object-[50%_12%]",
    accent: "clay",
    layout: "portrait",
  },
  {
    slug: "music-of-the-heart",
    name: "Music of the Heart Project",
    short: "A strategic arts and daily music education intervention for disadvantaged children in Lahore, in partnership with Opus 1 Foundation.",
    problem: {
      figure: "26",
      unit: "million",
      line: "children out of school — with 80% of enrolled students experiencing severe learning poverty.",
      source: "World Bank & UNICEF Pakistan Education Data",
    },
    problemImage: "/images/music/music-classroom-focus.jpg",
    responseImage: "/images/music/music-harmonium-performance.jpg",
    context: [
      "Pakistan is confronting an education crisis of extraordinary scale. Over 26 million children between ages 5 and 16 are out of school, giving Pakistan the world's second-largest out-of-school population. Among enrolled children, the World Bank and UNESCO estimate that approximately 80% experience learning poverty — unable to read and understand simple, age-appropriate text by the end of primary school.",
      "The challenge extends beyond physical access; it requires keeping children motivated, emotionally regulated, and eager to learn. Poverty, trauma, and child labor cause vulnerable children to withdraw and drop out. Music is uniquely positioned to engage cognitive, emotional, physical, and social dimensions simultaneously.",
    ],
    response: [
      "In strategic partnership with the Opus 1 Foundation USA, ELF treats music not as an extracurricular pastime, but as a strategic educational intervention. Daily structured music classes and violin instruction are integrated directly into the school curriculum across Lahore.",
      "Research shows underprivileged students participating in arts programs are 78% more likely to show up to school, with academic gains equivalent to +3 additional months of progress (Education Endowment Foundation). Supported by Advisory Council leader Dr. Jonathan Addleton (Rector of Forman Christian College, former US Ambassador & USAID Mission Director) and instrument pledges from George Mason University's Mason Community Arts Academy ('Instruments in the Attic') and Hungry for Music, the initiative is scaling from 10 pilot schools to 53,000 children across 3 Pakistani cities over ten years.",
    ],
    outcomes: [
      { label: "Attendance Likelihood", value: "+78% Higher Attendance" },
      { label: "Academic Progress", value: "+3 Additional Months (EEF)" },
      { label: "10-Year Scaling Target", value: "53,000 Children in 3 Cities" },
      { label: "Curriculum Integration", value: "Daily Structured Arts & Violins" },
    ],
    image: "/images/music/music-acoustic-guitar.jpg",
    gallery: [
      "/images/music/music-harmonium-performance.jpg",
      "/images/music/music-dholak-percussion.jpg",
      "/images/music/music-acoustic-guitar.jpg",
      "/images/music/music-children-joy.jpg",
      "/images/music/music-assembly-singing.jpg",
      "/images/music/music-opus1-children.jpg",
    ],
    heroPosition: "object-[center_25%]",
    accent: "clay",
    layout: "statement",
  },
  {
    slug: "health-wash-community-wellbeing",
    name: "Health, WASH & Community Wellbeing",
    short: "Integrated clinical outreach, pregnancy & antenatal care, safe drinking water systems, and dignified sanitation to protect vulnerable mothers and families.",
    problem: {
      figure: "70",
      unit: "percent",
      line: "of drinking water sources in Pakistan are bacterially contaminated, driving treatable infections across rural communities.",
      source: "UNICEF & Pakistan Council of Research in Water Resources (PCRWR)",
    },
    problemImage: "/images/wash/wash-s-7.jpg",
    responseImage: "/images/health/health-camp-doctor.jpg",
    context: [
      "In underserved rural districts and peri-urban settlements, community health, maternal safety, and environmental sanitation are inseparable. Contaminated groundwater, absent drainage, and a lack of private washrooms expose families to recurring bouts of typhoid, dysentery, and waterborne illness that deplete household savings and keep children away from school.",
      "The burden falls heaviest on expectant mothers and young women, who face acute barriers to prenatal nutrition, antenatal check-ups, and menstrual hygiene in communities where public healthcare facilities are often a multi-hour journey rather than a local resource.",
    ],
    response: [
      "ELF deploys mobile medical camps staffed by qualified physicians, offering direct diagnostic consultations, blood screenings, and free prescription medications directly within remote village clusters.",
      "We support expectant mothers with Lady Health Visitor consultations, prenatal vitamins, iron supplements, nutrition guidance, and structured postnatal follow-up to ensure safe deliveries.",
      "We engineer deep-bore water extraction points, solar-powered filtration stations, and hygienic school washrooms—pairing every infrastructure project with community-led hygiene and maternal health education.",
    ],
    outcomes: [
      { label: "Safe Water", value: "Laboratory-Tested Points" },
      { label: "Clinical Outreach", value: "100% Free Care & Medicine" },
      { label: "Maternal Care", value: "Antenatal & Postnatal Support", href: "#pregnant-women-support" },
      { label: "Dignity & WASH", value: "School & Community Facilities" },
    ],
    image: "/images/wash/wash-b-2.jpg",
    gallery: [
      "/images/health/health-exam-1.jpg",
      "/images/pregnant/pregnant-2.jpg",
      "/images/wash/wash-s-1.jpg",
      "/images/health/health-exam-2.jpg",
      "/images/wash/wash-s-3.jpg",
      "/images/pregnant/pregnant-4.jpg",
      foundationMedia.washSoapDistribution,
      "/images/health/health-exam-3.jpg",
    ],
    heroPosition: "object-[50%_12%]",
    accent: "moss",
    layout: "statement",
  },
  {
    slug: "hope-and-freedom-for-widows-headed-families",
    name: "Hope and Freedom",
    short: "Comprehensive debt cancellation, safe housing, children's schooling, and micro-enterprise capital to permanently liberate widow-headed families from generational brick kiln debt bondage.",
    problem: {
      figure: "20,000",
      unit: "kilns",
      line: "operate across Pakistan where widows and children inherit bonded debts.",
      source: "Azadi Freedom & ELF Field Intelligence",
    },
    problemImage: "/images/widows/widow-kiln-labor.jpg",
    responseImage: foundationMedia.widowsFoodRations,
    context: [
      "When a husband passes away in low-income kiln settlements, his debt is forcibly transferred to his widow and children, condemning the family to generational bonded servitude under extreme deprivation.",
      "Children are removed from school to mold clay and shovel coal, while widowed mothers struggle without healthcare, clean water, or legal protection.",
      "Emergency food rations and sustainable livelihood tools are urgently required to ensure families achieve lasting self-sufficiency and never fall back into exploitation.",
    ],
    response: [
      "We legally negotiate and discharge 100% of accumulated kiln loans, providing verified release certificates so families can never be claimed or coerced again.",
      "We provide 6 months of prepaid rent in dignified community housing, monthly staple nutrition hampers, and emergency health stabilization.",
      "Children are enrolled in accredited schools with uniforms and trackable backpacks, while mothers receive vocational sewing machines or mobile retail kiosks.",
    ],
    outcomes: [
      { label: "Sponsorship", value: "$1,850 Full Liberation" },
      { label: "Debt Status", value: "100% Debt Cleared" },
      { label: "Housing", value: "6 Months Rent Paid" },
      { label: "Long-Term", value: "Micro-Business Owner" },
    ],
    image: foundationMedia.projectWidows,
    gallery: [
      "/images/widows/widow-support-1.jpg",
      "/images/widows/widow-support-2.jpg",
      "/images/widows/widow-support-3.jpg",
      "/images/widows/widow-support-4.jpg",
      "/images/widows/widow-support-5.jpg",
      "/images/widows/widow-support-6.jpg",
      "/images/widows/scrolling/12.jpg",
      "/images/widows/scrolling/18.jpg",
    ],
    heroPosition: "object-[50%_15%]",
    accent: "clay",
    layout: "portrait",
  },
  {
    slug: "community-skills-development",
    name: "Community Skills Development Program",
    short: "Vocational tailoring, industrial stitching, and free sewing machine distribution equipping underprivileged women and mothers for independent home micro-enterprises.",
    problem: {
      figure: "78",
      unit: "percent",
      line: "of women in marginalized rural and peri-urban settlements lack vocational training or certified trades to escape exploitative labor.",
      source: "Pakistan Bureau of Statistics & Gender Economic Survey",
    },
    problemImage: "/images/skills/community/community-skill-1.jpg",
    responseImage: "/images/skills/community/DSC04208.JPG",
    context: [
      "In underserved settlements across Punjab, women and young mothers face severe structural exclusions from the formal economy. With limited schooling and no technical apprenticeship hubs, they are left with few alternatives beyond grueling, low-paid brick kiln labor or unregulated domestic servitude.",
      "Without independent earning capacity, families remain trapped in cyclical debt and food insecurity. Vocational trade mastery—particularly industrial stitching, garment cutting, and garment finishing—offers a proven, culturally supported route to sustainable home-based income generation.",
    ],
    response: [
      "ELF operates community vocational craft centers providing intensive, 6-month hands-on training courses led by master instructors. Students master precision fabric measurement, pattern drafting, foot-pedal machine operation, and retail-grade finishing.",
      "Upon graduation, ELF provides each certified student with a brand-new, heavy-duty sewing machine complete with motor, starter fabric, and tailoring tools—enabling mothers to accept commercial orders from day one and attain lasting financial independence.",
    ],
    outcomes: [
      { label: "Graduation Kit", value: "100% Free Sewing Machine", href: "#vocational-equipment" },
      { label: "Course Duration", value: "6-Month Certified Training", href: "#vocational-curriculum" },
      { label: "Focus Demographic", value: "Vulnerable Mothers & Women" },
      { label: "Economic Impact", value: "Dignified Home Enterprise" },
    ],
    image: "/images/skills/community/community-skill-2.jpg",
    gallery: [
      "/images/skills/community/DSC04208.JPG",
      "/images/skills/community/community-skill-3.jpg",
      "/images/skills/community/community-skill-4.jpg",
      "/images/skills/community/community-skill-5.jpg",
      "/images/skills/community/community-skill-6.jpg",
      "/images/skills/community/community-skill-7.jpg",
      foundationMedia.skillsSewingMachine,
      "/images/skills/community/community-skill-1.jpg",
    ],
    heroPosition: "object-[center_20%]",
    accent: "clay",
    layout: "statement",
  },
  {
    slug: "digital-skills-development",
    name: "Digital Skills Development Program",
    short: "Modern IT laboratories, computer literacy, office suites, and online freelancing mentorship connecting underprivileged youth to the global digital economy.",
    problem: {
      figure: "2.1",
      unit: "million",
      line: "young people enter Pakistan's workforce annually without basic computer literacy or modern digital skills.",
      source: "Pakistan Labour Force Survey & UNDP Youth Development Report",
    },
    problemImage: "/images/skills/digital/IMG_5370.JPG",
    responseImage: "/images/skills/digital/IMG_8746.JPG",
    context: [
      "Economic opportunity in modern Pakistan is rapidly shifting toward the remote service and digital economy. Yet in marginalized neighborhoods, young adults have zero access to desktop computers, reliable internet, or structured IT mentoring.",
      "This digital divide locks talented youth out of office employment, clerical careers, and online freelancing, confining them to hazardous manual labor despite their aptitude and ambition.",
    ],
    response: [
      "ELF establishes high-tech Community Digital Skills Academies equipped with modern workstations, high-speed broadband, and qualified faculty mentors. All training is 100% tuition-free.",
      "The curriculum takes students from absolute fundamentals—keyboarding, operating systems, and file management—through professional office suites, graphic tools, and freelance marketplace onboarding with accredited certification.",
    ],
    outcomes: [
      { label: "Lab Workstations", value: "100% Free High-Speed Access", href: "#it-lab-infrastructure" },
      { label: "Curriculum Track", value: "Office Suites & Freelancing", href: "#digital-curriculum" },
      { label: "Accreditation", value: "Certified IT Graduates" },
      { label: "Target Demographics", value: "Underprivileged Youth & Women" },
    ],
    image: "/images/skills/digital/IMG_8766.JPG",
    gallery: [
      "/images/skills/digital/IMG_8746.JPG",
      "/images/skills/digital/IMG_8766.JPG",
      "/images/skills/digital/IMG_9098.JPG",
      "/images/skills/digital/IMG_8802.JPG",
      "/images/skills/digital/IMG_8753.JPG",
      "/images/skills/digital/IMG_5415.JPG",
      "/images/skills/digital/IMG_5370.JPG",
      digital,
    ],
    heroPosition: "object-[center_25%]",
    accent: "clay",
    layout: "statement",
  },
  {
    slug: "capacity-building",
    name: "Capacity Building Program",
    short: "Strengthening local leadership, robust financial consultation, and transparent stewardship so community-driven initiatives achieve lasting independence.",
    problem: {
      figure: "84",
      unit: "percent",
      line: "of grassroots welfare initiatives fail within three years due to absent financial planning and accounting opacity.",
      source: "Pakistan Centre for Philanthropy & NGO Governance Survey",
    },
    problemImage: "/images/capacity-building/capacity-7.jpg",
    responseImage: "/images/capacity-building/capacity-1.jpg",
    context: [
      "Most community initiatives across Pakistan do not struggle from a lack of dedication — they struggle because local teams lack formal training in financial management, compliance, and institutional governance.",
      "Without structured financial consultation and bookkeeping protocols, grassroots schools, free dispensaries, and vocational centers struggle to manage cash flow, navigate regulatory audits, or prove fiscal integrity to donors.",
    ],
    response: [
      "ELF provides hands-on financial consultation and organizational governance training to community leaders, school administrators, and grassroots welfare partners.",
      "Our certified accounting and governance mentors guide local institutions through operational budgeting, transparent ledger tracking, formal audit readiness, and tax-exempt compliance under Pakistani non-profit laws.",
      "Beyond institutional advisory, we offer micro-financial counseling to community cooperative leaders and vocational graduates—teaching debt mitigation, cash reserves management, and sustainable reinvestment.",
    ],
    outcomes: [
      { label: "Financial Consultation", value: "Audit & Budget Advisory", href: "#financial-consultation" },
      { label: "Governance", value: "Transparent Accounting" },
      { label: "Compliance", value: "Non-Profit Certification" },
      { label: "Local Leaders", value: "Equipped for Autonomy" },
    ],
    image: "/images/capacity-building/capacity-2.jpg",
    gallery: [
      "/images/capacity-building/capacity-1.jpg",
      "/images/capacity-building/capacity-2.jpg",
      "/images/capacity-building/capacity-3.jpg",
      "/images/capacity-building/capacity-4.jpg",
      "/images/capacity-building/capacity-5.jpg",
      "/images/capacity-building/capacity-6.jpg",
      "/images/capacity-building/capacity-7.jpg",
      "/images/capacity-building/capacity-8.jpg",
    ],
    heroPosition: "object-[50%_15%]",
    accent: "moss",
    layout: "data",
  },
  {
    slug: "faith-hope-love-for-every-child",
    name: "Orphan Care",
    short: "Orphan care, education and comprehensive child protection walking alongside Pakistan's most vulnerable children.",
    problem: {
      figure: "1,655+",
      unit: "most vulnerable children",
      line: "are actively protected, educated, and cared for across our child welfare initiatives.",
      source: "ELF Child Protection & Orphan Care Intelligence",
    },
    problemImage: "/images/orphan-care/vulnerable-toddler-care.jpg",
    responseImage: "/images/orphan-care/physical-disability-support.jpg",
    context: [
      "Every child deserves to be loved, protected, educated, and given the opportunity to build a hopeful future. At Education And Life Foundation (ELF), we believe that children who have lost parental care, live with a single parent, experience extreme poverty, face disability, or remain trapped in cycles of exploitation should never be forgotten.",
      "ELF works with vulnerable children and families in communities where poverty and limited resources place children at serious risk of dropping out of school, exploitation, neglect, or a life without opportunity.",
      "Our work is rooted in compassion and Christian values, with a commitment to serve children with dignity, regardless of their circumstances.",
    ],
    response: [
      "We provide continuous, long-term care to 35 orphaned girls, helping meet their educational and essential needs so they grow in confidence and prepare for a safe, independent future.",
      "We support more than 500 students from single-parent families with tuition and supplies, and over 1,000 students from families experiencing modern slavery so education becomes a pathway beyond generational poverty.",
      "We provide targeted educational and specialized assistance to approximately 120 children who are deaf, blind, or living with disabilities, ensuring every child participates fully in family, school, and community life.",
    ],
    outcomes: [
      { label: "Orphan Care", value: "35 Girls in Long-Term Care" },
      { label: "Single-Parent Support", value: "500+ Students Funded" },
      { label: "Freedom From Bondage", value: "1,000+ Enrolled Students" },
      { label: "Special Needs & Disability", value: "120 Children Assisted" },
    ],
    image: "/images/orphan-care/vulnerable-girl-portrait.jpg",
    gallery: [
      "/images/orphan-care/special-needs-boy.jpg",
      "/images/orphan-care/vulnerable-girl-portrait.jpg",
      "/images/orphan-care/vulnerable-toddler-care.jpg",
      "/images/orphan-care/special-needs-group.jpg",
      "/images/orphan-care/physical-disability-support.jpg",
      "/images/orphan-care/mobility-impairment-boy.jpg",
      "/images/orphan-care/eye-impairment-child.jpg",
      "/images/orphan-care/hearing-support-child.jpg",
    ],
    heroPosition: "object-[center_18%]",
    accent: "clay",
    layout: "statement",
  },
];

export const getProject = (slug: string) => {
  const childCareAliases = [
    "faith-hope-love-for-every-child",
    "faith-hope-love",
    "faith-hope-and-love",
    "orphan-care",
    "child-protection",
    "faith-hope-love-for-every-child-project",
  ];
  if (childCareAliases.includes(slug)) {
    return projects.find((p) => p.slug === "faith-hope-love-for-every-child");
  }

  const widowsAliases = [
    "widows-welfare",
    "widows-welfare-program",
    "hope-and-freedom-for-widows-headed-families-project",
    "hope-and-freedom-for-widows-headed-families",
    "hope-and-freedom",
  ];
  if (widowsAliases.includes(slug)) {
    return projects.find((p) => p.slug === "hope-and-freedom-for-widows-headed-families");
  }

  const communitySkillsAliases = [
    "community-skills",
    "community-skills-development",
    "community-skills-developments",
    "community-skill-development",
    "vocational-skills",
    "vocational-training",
    "community-digital-skills-developments",
    "community-and-digital-skills-developments",
    "comminity-and-digital-skills-developments",
    "comminity-digital-skills-developments",
    "community-digital-skills-development",
    "community-digital-skills",
    "skill-development",
    "skills-development",
    "skills-developement",
  ];
  if (communitySkillsAliases.includes(slug)) {
    return projects.find((p) => p.slug === "community-skills-development");
  }

  const digitalSkillsAliases = [
    "digital-skills",
    "digital-skills-development",
    "digital-skills-developments",
    "digital-skill-development",
    "computer-skills",
    "it-training",
  ];
  if (digitalSkillsAliases.includes(slug)) {
    return projects.find((p) => p.slug === "digital-skills-development");
  }

  return projects.find((p) => p.slug === slug);
};
