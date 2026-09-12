import educationAsset from "@/assets/official/education.jpg.asset.json";
import schoolworkAsset from "@/assets/official/schoolwork.jpg.asset.json";
import communityAsset from "@/assets/official/community.jpg.asset.json";
import familyAsset from "@/assets/official/family.jpg.asset.json";
import widowsAsset from "@/assets/official/widows.jpg.asset.json";
import healthAsset from "@/assets/official/health.jpg.asset.json";
import midwiferyAsset from "@/assets/official/midwifery.jpg.asset.json";
import digitalAsset from "@/assets/official/digital.jpg.asset.json";
import skillsAsset from "@/assets/official/skills.jpg.asset.json";
import capacityAsset from "@/assets/official/capacity.jpg.asset.json";
import { assetUrl } from "@/lib/asset";
import { foundationMedia } from "./foundationMedia";

const education = assetUrl(educationAsset.url);
const schoolwork = assetUrl(schoolworkAsset.url);
const community = assetUrl(communityAsset.url);
const family = assetUrl(familyAsset.url);
const widows = assetUrl(widowsAsset.url);
const health = assetUrl(healthAsset.url);
const midwifery = assetUrl(midwiferyAsset.url);
const digital = assetUrl(digitalAsset.url);
const skills = assetUrl(skillsAsset.url);
const capacity = assetUrl(capacityAsset.url);

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
    image: foundationMedia.maternalClinic,
    gallery: [foundationMedia.maternalClinic, foundationMedia.healthCampDoctor, foundationMedia.clinicBanner],
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
    accent: "clay",
    layout: "statement",
  },
  {
    slug: "health-care-program",
    name: "Health Care Program",
    short: "Free medical camps and medicine for rural communities without a clinic.",
    problem: {
      figure: "0",
      unit: "clinics",
      line: "within reach for many rural families in Pakistan.",
      source: "EFL field reporting",
    },
    context: [
      "Health services concentrate in cities. Rural districts absorb the shortfall — and treatable conditions become permanent ones.",
    ],
    response: [
      "EFL runs medical camps in underserved areas with volunteer doctors, free consultation and free medicine.",
      "Patients who need more than a camp can offer are referred and supported.",
    ],
    outcomes: [
      { label: "Consultation", value: "Free" },
      { label: "Medicine", value: "Free" },
      { label: "Model", value: "Mobile camps" },
    ],
    image: foundationMedia.healthCampDoctor,
    gallery: [foundationMedia.healthCampDoctor, foundationMedia.clinicBanner, foundationMedia.projectHealth],
    accent: "moss",
    layout: "statement",
  },
  {
    slug: "wash-improvement",
    name: "WASH Improvement Project",
    short: "Safe water, sanitation and hygiene where contaminated water is the default.",
    problem: {
      figure: "70",
      unit: "percent",
      line: "of households drink water contaminated with bacteria.",
      source: "WHO / UNICEF Joint Monitoring Programme, Pakistan",
    },
    context: [
      "Waterborne illness keeps children out of classrooms and adults out of work. In many villages the nearest safe source is a walk, not a tap.",
    ],
    response: [
      "EFL improves water points, sanitation facilities and hygiene practice in schools and villages, with community upkeep built into the plan.",
    ],
    outcomes: [
      { label: "Water", value: "Safer sources" },
      { label: "Sanitation", value: "School facilities" },
      { label: "Hygiene", value: "Community training" },
    ],
    image: foundationMedia.cleanWaterPump,
    gallery: [foundationMedia.cleanWaterPump, foundationMedia.projectWash, community],
    accent: "moss",
    layout: "horizontal",
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
    image: foundationMedia.maternalClinic,
    gallery: [foundationMedia.maternalClinic, foundationMedia.healthCampDoctor, family],
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
    image: foundationMedia.widowsFoodRations,
    gallery: [foundationMedia.widowsFoodRations, foundationMedia.emergencyRelief, foundationMedia.projectWidows],
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
    gallery: [foundationMedia.skillsSewingMachine, foundationMedia.digitalSkillsLab, skills],
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
    image: foundationMedia.communityLeadPortrait,
    gallery: [foundationMedia.communityLeadPortrait, foundationMedia.emergencyRelief, capacity],
    accent: "moss",
    layout: "data",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
