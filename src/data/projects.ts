import education from "@/assets/official-local/education.jpg";
import schoolwork from "@/assets/official-local/schoolwork.jpg";
import community from "@/assets/official-local/community.jpg";
import family from "@/assets/official-local/family.jpg";
import widows from "@/assets/official-local/widows.jpg";
import health from "@/assets/official-local/health.jpg";
import midwifery from "@/assets/official-local/midwifery.jpg";
import digital from "@/assets/official-local/digital.jpg";
import skills from "@/assets/official-local/skills.jpg";
import capacity from "@/assets/official-local/capacity.jpg";
import { foundationMedia } from "./foundationMedia";

export type ProjectLayout = "statement" | "horizontal" | "portrait" | "data" | "map" | "object";

export interface Project {
  slug: string;
  name: string;
  short: string;
  /** The single problem this project exists to answer. */
  problem: { figure: string; unit: string; line: string; source: string };
  context: string[];
  response: string[];
  outcomes: { label: string; value: string }[];
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
    context: [
      "Pakistan has one of the largest out-of-school populations on earth. Poverty, distance, and the cost of books and uniforms decide who learns and who does not.",
      "For girls in rural districts the odds narrow further — a single school fee can end an education permanently.",
    ],
    response: [
      "EFL runs and supports free community schooling, covering tuition, books, uniforms and stationery so that cost never becomes the reason a child leaves.",
      "Teachers are trained and paid locally, and families receive follow-up so enrolment turns into attendance.",
    ],
    outcomes: [
      { label: "Focus", value: "Primary & secondary" },
      { label: "Cost to family", value: "Zero" },
      { label: "Reach", value: "Punjab communities" },
    ],
    image: foundationMedia.schoolStudents,
    gallery: [foundationMedia.classroomDesks, foundationMedia.schoolUniforms, education],
    heroPosition: "object-[50%_32%]",
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
      source: "EFL field reporting",
    },
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
    image: foundationMedia.bagsCeremony,
    gallery: [foundationMedia.schoolStudents, foundationMedia.bagsCeremony, schoolwork],
    heroPosition: "object-[50%_42%]",
    accent: "sand",
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
    context: [
      "Most maternal deaths are preventable with a skilled attendant present. In remote districts, there often isn't one.",
    ],
    response: [
      "EFL trains and equips community midwives so safe delivery does not depend on reaching a distant hospital in time.",
    ],
    outcomes: [
      { label: "Trained", value: "Community midwives" },
      { label: "Placed", value: "In home districts" },
      { label: "Focus", value: "Safe delivery" },
    ],
    image: midwifery,
    gallery: [midwifery, foundationMedia.maternalClinic, foundationMedia.clinicBanner],
    heroPosition: "object-[50%_30%]",
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
    context: [
      "Pakistan is confronting an education crisis of extraordinary scale. Over 26 million children between ages 5 and 16 are out of school, giving Pakistan the world's second-largest out-of-school population. Among enrolled children, the World Bank and UNESCO estimate that approximately 80% experience learning poverty — unable to read and understand simple, age-appropriate text by the end of primary school.",
      "The challenge extends beyond physical access; it requires keeping children motivated, emotionally regulated, and eager to learn. Poverty, trauma, and child labor cause vulnerable children to withdraw and drop out. Music is uniquely positioned to engage cognitive, emotional, physical, and social dimensions simultaneously.",
    ],
    response: [
      "In strategic partnership with the Opus 1 Foundation USA, EFL treats music not as an extracurricular pastime, but as a strategic educational intervention. Daily structured music classes and violin instruction are integrated directly into the school curriculum across Lahore.",
      "Research shows underprivileged students participating in arts programs are 78% more likely to show up to school, with academic gains equivalent to +3 additional months of progress (Education Endowment Foundation). Supported by Advisory Council leader Dr. Jonathan Addleton (Rector of Forman Christian College, former US Ambassador & USAID Mission Director) and instrument pledges from George Mason University's Mason Community Arts Academy ('Instruments in the Attic') and Hungry for Music, the initiative is scaling from 10 pilot schools to 53,000 children across 3 Pakistani cities over ten years.",
    ],
    outcomes: [
      { label: "Attendance Likelihood", value: "+78% Higher Attendance" },
      { label: "Academic Progress", value: "+3 Additional Months (EEF)" },
      { label: "10-Year Scaling Target", value: "53,000 Children in 3 Cities" },
      { label: "Curriculum Integration", value: "Daily Structured Arts & Violins" },
    ],
    image: foundationMedia.musicClassViolins,
    gallery: [
      foundationMedia.musicClassViolins,
      foundationMedia.musicOrchestraClass,
      foundationMedia.musicStudentSolo,
    ],
    heroPosition: "object-[50%_40%]",
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
    context: [
      "In underserved rural districts and peri-urban settlements, community health, maternal safety, and environmental sanitation are inseparable. Contaminated groundwater, absent drainage, and a lack of private washrooms expose families to recurring bouts of typhoid, dysentery, and waterborne illness that deplete household savings and keep children away from school.",
      "The burden falls heaviest on expectant mothers and young women, who face acute barriers to prenatal nutrition, antenatal check-ups, and menstrual hygiene in communities where public healthcare facilities are often a multi-hour journey rather than a local resource.",
    ],
    response: [
      "EFL deploys mobile medical camps staffed by qualified physicians, offering direct diagnostic consultations, blood screenings, and free prescription medications directly within remote village clusters.",
      "We support expectant mothers with Lady Health Visitor consultations, prenatal vitamins, iron supplements, nutrition guidance, and structured postnatal follow-up to ensure safe deliveries.",
      "We engineer deep-bore water extraction points, solar-powered filtration stations, and hygienic school washrooms—pairing every infrastructure project with community-led hygiene and maternal health education.",
    ],
    outcomes: [
      { label: "Safe Water", value: "Laboratory-Tested Points" },
      { label: "Clinical Outreach", value: "100% Free Care & Medicine" },
      { label: "Maternal Care", value: "Antenatal & Postnatal Support" },
      { label: "Dignity & WASH", value: "School & Community Facilities" },
    ],
    image: foundationMedia.washSchoolHygiene,
    gallery: [
      foundationMedia.washSchoolHygiene,
      foundationMedia.maternalAntenatalCheckup,
      foundationMedia.washHandPump,
      foundationMedia.maternalLhvConsultation,
      foundationMedia.maternalEflCare,
      foundationMedia.washSoapDistribution,
      foundationMedia.healthCampDoctor,
      foundationMedia.clinicBanner,
    ],
    heroPosition: "object-center",
    accent: "moss",
    layout: "statement",
  },
  {
    slug: "hope-and-freedom-for-widows-headed-families",
    name: "Hope and Freedom for Widows-Headed Families Project",
    short: "Comprehensive debt cancellation, safe housing, children's schooling, and micro-enterprise capital to permanently liberate widow-headed families from generational brick kiln debt bondage.",
    problem: {
      figure: "20,000",
      unit: "kilns",
      line: "operate across Pakistan where widows and children inherit bonded debts.",
      source: "Azadi Freedom & EFL Field Intelligence",
    },
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
      { label: "Debt Status", value: "100% Cancelled" },
      { label: "Housing", value: "6 Months Rent Paid" },
      { label: "Long-Term", value: "Micro-Business Owner" },
    ],
    image: "/images/widows/bottom/1.jpg",
    gallery: [
      "/images/widows/bottom/1.jpg",
      "/images/widows/bottom/2.jpg",
      "/images/widows/bottom/3.jpg",
      "/images/widows/bottom/4.jpg",
      foundationMedia.widowsFoodRations,
      foundationMedia.skillsSewingMachine,
      foundationMedia.projectWidows,
      widows,
    ],
    heroPosition: "object-[50%_35%]",
    accent: "clay",
    layout: "portrait",
  },
  {
    slug: "community-digital-skills",
    name: "Community Digital Skills Program",
    short: "Computer and online-work literacy for people the digital economy skipped.",
    problem: {
      figure: "1",
      unit: "laptop",
      line: "away from an income that does not depend on geography.",
      source: "EFL field reporting",
    },
    context: [
      "Remote work has redrawn who can earn — but only for people who can already use a computer confidently.",
    ],
    response: [
      "Structured training in computer basics, office tools, and freelancing fundamentals, aimed especially at women and young people.",
    ],
    outcomes: [
      { label: "Format", value: "Cohort training" },
      { label: "Priority", value: "Women & youth" },
      { label: "Outcome", value: "Employable skills" },
    ],
    image: foundationMedia.digitalSkillsLab,
    gallery: [foundationMedia.digitalSkillsLab, foundationMedia.projectDigital, digital],
    heroPosition: "object-center",
    accent: "sand",
    layout: "data",
  },
  {
    slug: "skill-development",
    name: "Skill Development Program",
    short: "Practical trades and training that convert directly into earnings.",
    problem: {
      figure: "0",
      unit: "qualifications",
      line: "and the only work available is the work that keeps you poor.",
      source: "EFL field reporting",
    },
    context: [
      "Without a trade, low-income workers rotate through daily-wage labour with no path upward and no protection.",
    ],
    response: [
      "Hands-on vocational training — stitching, technical trades, small business fundamentals — followed by placement or start-up support.",
    ],
    outcomes: [
      { label: "Training", value: "Hands-on" },
      { label: "After", value: "Placement support" },
      { label: "Aim", value: "Independence" },
    ],
    image: foundationMedia.skillsSewingMachine,
    gallery: [foundationMedia.skillsSewingMachine, skills, foundationMedia.projectWidows],
    heroPosition: "object-[50%_40%]",
    accent: "sand",
    layout: "horizontal",
  },
  {
    slug: "capacity-building",
    name: "Capacity Building Program",
    short: "Strengthening the people and partners who deliver the work locally.",
    problem: {
      figure: "1",
      unit: "generation",
      line: "of local leaders decides whether change outlasts the funding.",
      source: "EFL programme design",
    },
    context: [
      "Programmes fail when they are delivered to a community rather than by one.",
    ],
    response: [
      "EFL trains teachers, health workers, volunteers and partner organisations — governance, delivery, reporting and follow-through.",
    ],
    outcomes: [
      { label: "Trains", value: "Teams & partners" },
      { label: "Builds", value: "Local leadership" },
      { label: "Result", value: "Durable programmes" },
    ],
    image: capacity,
    gallery: [capacity, foundationMedia.communityLeadPortrait, community],
    heroPosition: "object-[50%_22%]",
    accent: "moss",
    layout: "data",
  },
];

export const getProject = (slug: string) => {
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
  return projects.find((p) => p.slug === slug);
};
