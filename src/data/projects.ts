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
    short: "Integrated clinical outreach, safe drinking water systems, and dignified sanitation to prevent disease and protect vulnerable families.",
    problem: {
      figure: "70",
      unit: "percent",
      line: "of drinking water sources in Pakistan are bacterially contaminated, driving treatable infections across rural communities.",
      source: "UNICEF & Pakistan Council of Research in Water Resources (PCRWR)",
    },
    context: [
      "In underserved rural districts and peri-urban settlements, community health and environmental sanitation are inseparable. Contaminated groundwater, absent drainage, and a lack of private washrooms expose families to recurring bouts of typhoid, dysentery, and waterborne illness that deplete household savings and keep children away from school.",
      "The burden falls heaviest on women and adolescent girls, who face acute barriers to menstrual hygiene and maternal wellbeing in communities where public healthcare facilities are often a multi-hour journey rather than a local resource.",
    ],
    response: [
      "EFL deploys mobile medical camps staffed by qualified physicians, offering direct diagnostic consultations, blood screenings, and free prescription medications directly within remote village clusters.",
      "We engineer deep-bore water extraction points, solar-powered filtration stations, and hygienic school washrooms—pairing every infrastructure project with community-led hygiene and menstrual health education.",
    ],
    outcomes: [
      { label: "Safe Water", value: "Laboratory-Tested Points" },
      { label: "Clinical Outreach", value: "100% Free Care & Medicine" },
      { label: "Dignity & WASH", value: "School & Community Facilities" },
      { label: "Prevention Focus", value: "Hygiene & Menstrual Education" },
    ],
    image: foundationMedia.cleanWaterPump,
    gallery: [
      foundationMedia.cleanWaterPump,
      foundationMedia.healthCampDoctor,
      foundationMedia.clinicBanner,
      foundationMedia.projectHealth,
      foundationMedia.projectWash,
    ],
    heroPosition: "object-center",
    accent: "moss",
    layout: "statement",
  },
  {
    slug: "pregnancy-support-pakistan",
    name: "Pregnancy Support: Pakistan",
    short: "Care, nutrition and guidance for mothers through pregnancy and after.",
    problem: {
      figure: "9",
      unit: "months",
      line: "that determine two lives at once.",
      source: "EFL programme design",
    },
    context: [
      "Antenatal care, nutrition and simple information change outcomes dramatically — and are exactly what is missing.",
    ],
    response: [
      "EFL supports expectant mothers with check-ups, nutritional support, and postnatal follow-up in partnership with local health workers.",
    ],
    outcomes: [
      { label: "Antenatal", value: "Check-ups" },
      { label: "Nutrition", value: "Supported" },
      { label: "After birth", value: "Follow-up" },
    ],
    image: family,
    gallery: [family, foundationMedia.maternalClinic, foundationMedia.healthCampDoctor],
    heroPosition: "object-[50%_38%]",
    accent: "moss",
    layout: "portrait",
  },
  {
    slug: "hope-and-freedom-for-widows-headed-families",
    name: "Hope And Freedom For Widows Headed Families Project",
    short: "Income, schooling and dignity for households a widow holds together alone.",
    problem: {
      figure: "1",
      unit: "income",
      line: "removed, and an entire household falls out of the economy.",
      source: "EFL field reporting",
    },
    context: [
      "When a husband dies, a widow in a low-income community often loses housing security, credit and social standing in the same week.",
      "Children are pulled out of school first, because their labour is worth more than their attendance.",
    ],
    response: [
      "Monthly food and financial support stabilises the household, while the children stay enrolled.",
      "Mothers are moved into skills training and small-enterprise support so the family exits aid rather than depending on it.",
    ],
    outcomes: [
      { label: "Support", value: "Monthly, sustained" },
      { label: "Children", value: "Kept in school" },
      { label: "Goal", value: "Self-reliance" },
    ],
    image: foundationMedia.widowsFoodRations,
    gallery: [foundationMedia.widowsFoodRations, foundationMedia.skillsSewingMachine, foundationMedia.projectWidows],
    heroPosition: "object-[50%_35%]",
    accent: "clay",
    layout: "portrait",
  },
  {
    slug: "widows-welfare",
    name: "Widows Welfare Program",
    short: "Monthly food and financial assistance for widows in acute need.",
    problem: {
      figure: "30",
      unit: "days",
      line: "is how far ahead a family in crisis can plan.",
      source: "EFL field reporting",
    },
    context: [
      "Before training or enterprise can matter, a household needs to eat this month.",
    ],
    response: [
      "Monthly food packages and direct financial assistance, delivered consistently and without conditions that shame the recipient.",
    ],
    outcomes: [
      { label: "Cycle", value: "Monthly" },
      { label: "Support", value: "Food & cash" },
      { label: "Principle", value: "Dignity first" },
    ],
    image: widows,
    gallery: [widows, foundationMedia.widowsFoodRations, foundationMedia.projectWidows],
    heroPosition: "object-[50%_34%]",
    accent: "clay",
    layout: "statement",
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

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
