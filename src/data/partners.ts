import adventureAid from "@/assets/partners/Adventure Aid UK.jpg";
import azadiFreedom from "@/assets/partners/Azadi Freedom Germany.jpg";
import barnabasAid from "@/assets/partners/Barnabas Aid UK.jpg";
import consistentLife from "@/assets/partners/Consistent Life Network USA.jpg";
import happyToHelp from "@/assets/partners/Happy to Help Foundations UK.jpg";
import hungryForMusic from "@/assets/partners/Hungry for Music USA.jpg";
import opus1 from "@/assets/partners/Opus 1 Foundation USA.jpg";
import paulAid from "@/assets/partners/Paul Aid Trust New Zealand.jpg";
import schoolInABag from "@/assets/partners/SCHOOL IN A BAG UK.jpg";
import tbfTrust from "@/assets/partners/TBF Trust UK.jpg";
import visionForAsia from "@/assets/partners/Vision for Asia Germany.jpg";
import womenAndGirls from "@/assets/partners/Women & Girls First USA.jpg";
import youthForChrist from "@/assets/partners/Youth for Christ International USA.jpg";

export interface Partner {
  id: string;
  name: string;
  country: "United Kingdom" | "United States" | "Germany" | "New Zealand";
  countryCode: "GB" | "US" | "DE" | "NZ";
  logo: string;
  focus: string;
  role: string;
  collaborations: string[]; // project slugs
}

export const partners: Partner[] = [
  {
    id: "school-in-a-bag",
    name: "School in a Bag",
    country: "United Kingdom",
    countryCode: "GB",
    logo: schoolInABag,
    focus: "Child Education & School Supplies",
    role: "Official Partner for School Bag Distribution",
    collaborations: ["school-bags", "education-for-all"],
  },
  {
    id: "hungry-for-music",
    name: "Hungry for Music",
    country: "United States",
    countryCode: "US",
    logo: hungryForMusic,
    focus: "Creative Arts & Musical Education",
    role: "Musical Instruments & Youth Expression Sponsor",
    collaborations: ["music-of-the-heart"],
  },
  {
    id: "women-and-girls-first",
    name: "Women & Girls First",
    country: "United States",
    countryCode: "US",
    logo: womenAndGirls,
    focus: "Maternal Health & Female Empowerment",
    role: "Maternal Health & Midwife Kit Sponsor",
    collaborations: ["midwifery-program", "pregnancy-support-pakistan"],
  },
  {
    id: "barnabas-aid",
    name: "Barnabas Aid",
    country: "United Kingdom",
    countryCode: "GB",
    logo: barnabasAid,
    focus: "Humanitarian Relief & Vulnerable Families",
    role: "Food Support & Crisis Intervention Partner",
    collaborations: ["widows-welfare", "hope-and-freedom-for-widows-headed-families"],
  },
  {
    id: "vision-for-asia",
    name: "Vision for Asia",
    country: "Germany",
    countryCode: "DE",
    logo: visionForAsia,
    focus: "Community Health & Clean Water",
    role: "Rural Medical Camps & Water Infrastructure",
    collaborations: ["health-care-program", "wash-improvement"],
  },
  {
    id: "happy-to-help",
    name: "Happy to Help Foundation",
    country: "United Kingdom",
    countryCode: "GB",
    logo: happyToHelp,
    focus: "Grassroots Community Assistance",
    role: "Family Ration Packs & Education Support",
    collaborations: ["education-for-all", "widows-welfare"],
  },
  {
    id: "paul-aid-trust",
    name: "Paul Aid Trust",
    country: "New Zealand",
    countryCode: "NZ",
    logo: paulAid,
    focus: "Southern Hemisphere Humanitarian Outreach",
    role: "Classroom Sponsorship & Basic Needs",
    collaborations: ["education-for-all", "skill-development"],
  },
  {
    id: "youth-for-christ",
    name: "Youth for Christ International",
    country: "United States",
    countryCode: "US",
    logo: youthForChrist,
    focus: "Youth Development & Digital Literacy",
    role: "Youth Cohorts & Vocational Skills Partner",
    collaborations: ["community-digital-skills", "capacity-building"],
  },
  {
    id: "adventure-aid",
    name: "Adventure Aid",
    country: "United Kingdom",
    countryCode: "GB",
    logo: adventureAid,
    focus: "Youth Empowerment & Physical Welfare",
    role: "Youth Development & Activity Outreach",
    collaborations: ["music-of-the-heart", "capacity-building"],
  },
  {
    id: "tbf-trust",
    name: "TBF Trust",
    country: "United Kingdom",
    countryCode: "GB",
    logo: tbfTrust,
    focus: "Sustainable Livelihoods & Training",
    role: "Vocational Tools & Apprentice Support",
    collaborations: ["skill-development", "hope-and-freedom-for-widows-headed-families"],
  },
  {
    id: "opus-1-foundation",
    name: "Opus 1 Foundation",
    country: "United States",
    countryCode: "US",
    logo: opus1,
    focus: "Strategic Arts Education & Children's Wellbeing",
    role: "Arts Education & Musical Instrument Grantee (Music of the Heart)",
    collaborations: ["music-of-the-heart", "education-for-all", "school-bags"],
  },
  {
    id: "azadi-freedom",
    name: "Azadi Freedom",
    country: "Germany",
    countryCode: "DE",
    logo: azadiFreedom,
    focus: "Human Dignity & Freedom from Destitution",
    role: "Widow Dignity & Small-Business Grants",
    collaborations: ["widows-welfare", "hope-and-freedom-for-widows-headed-families"],
  },
  {
    id: "consistent-life-network",
    name: "Consistent Life Network",
    country: "United States",
    countryCode: "US",
    logo: consistentLife,
    focus: "Holistic Protection of Life & Welfare",
    role: "Maternity & Newborn Care Advocacy",
    collaborations: ["pregnancy-support-pakistan", "midwifery-program"],
  },
];
