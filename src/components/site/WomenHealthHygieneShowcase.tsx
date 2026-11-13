import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Droplets,
  Users,
  Home,
  GraduationCap,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertTriangle,
  Award,
  Layers,
  ChevronRight,
  Info,
  DollarSign,
  HeartHandshake,
  School,
  Smile,
  BookOpen,
  Sparkle,
} from "lucide-react";
import {
  SanitaryPadIcon,
  DisposalBagIcon,
  BathSoapIcon,
  LaundrySoapIcon,
  HandSanitiserIcon,
  WetWipesIcon,
  ZipPouchIcon,
  HygieneLeafletIcon,
  PackagingBoxIcon,
  KitIconProps,
} from "@/components/icons/DignityKitIcons";
import { Counter } from "@/components/site/motion-primitives";

interface DignityKitItem {
  id: string;
  name: string;
  quantity: string;
  description: string;
  benefit: string;
  Icon: React.ComponentType<KitIconProps>;
}

const dignityKitItems: DignityKitItem[] = [
  {
    id: "pads",
    name: "Sanitary Pads (9–10 pad packs)",
    quantity: "2 packs",
    description: "High-absorbency, breathable disposable pads with secure adhesive wings.",
    benefit: "Prevents leakages and enables adolescent girls to attend school with confidence and peace of mind.",
    Icon: SanitaryPadIcon,
  },
  {
    id: "disposal-bags",
    name: "Disposable Bag Pack",
    quantity: "5 bags",
    description: "Discreet, leak-proof disposal bags designed for safe and sanitary waste management.",
    benefit: "Prevents contamination of village drainage and provides girls with privacy when disposing used products.",
    Icon: DisposalBagIcon,
  },
  {
    id: "bath-soap",
    name: "Bath Soap (100–120 g)",
    quantity: "2 bars",
    description: "Gentle antiseptic bathing soap formulated for sensitive daily skin cleansing.",
    benefit: "Reduces bacterial buildup and protects against reproductive and dermal infections.",
    Icon: BathSoapIcon,
  },
  {
    id: "laundry-soap",
    name: "Laundry Soap",
    quantity: "1 bar",
    description: "High-strength laundry soap specifically allocated for washing clothes and reusable fabrics.",
    benefit: "Ensures undergarments and clothing are thoroughly sanitized and dried hygienically.",
    Icon: LaundrySoapIcon,
  },
  {
    id: "sanitiser",
    name: "Hand Sanitiser (50 ml)",
    quantity: "1 bottle (50 ml)",
    description: "Alcohol-based portable hand sanitizer for instant pathogen elimination on the go.",
    benefit: "Critical in remote classrooms and households where running clean water may be temporarily unavailable.",
    Icon: HandSanitiserIcon,
  },
  {
    id: "wipes",
    name: "Face / Hand Tissues & Wet Wipes",
    quantity: "1 pack",
    description: "Soft, hypoallergenic sanitizing wipes suitable for personal and facial hygiene.",
    benefit: "Offers rapid, discreet cleaning throughout school hours and during travel between villages.",
    Icon: WetWipesIcon,
  },
  {
    id: "pouch",
    name: "Reusable Zip Pouch / Cloth Bag",
    quantity: "1 pouch",
    description: "Durable, washable fabric pouch with a secure zip closure for private storage.",
    benefit: "Eliminates embarrassment and allows girls to carry their hygiene supplies in school backpacks invisibly.",
    Icon: ZipPouchIcon,
  },
  {
    id: "leaflet",
    name: "Menstrual Hygiene Leaflet (Urdu)",
    quantity: "1 illustrated guide",
    description: "Easy-to-read educational brochure in Urdu and regional languages with anatomical diagrams.",
    benefit: "Answers questions about pubertal changes, debunking local myths and providing lifelong guidance.",
    Icon: HygieneLeafletIcon,
  },
  {
    id: "box",
    name: "Custom Packaging Box with GN Sticker",
    quantity: "1 sturdy box",
    description: "Protective branded cardboard box keeping all supplies dust-free and organized at home.",
    benefit: "Provides a safe, dedicated personal home storage space free from humidity and dust.",
    Icon: PackagingBoxIcon,
  },
];


interface FieldPhotoItem {
  src: string;
  webp: string;
  title: string;
  desc: string;
}

const communityPhotos: FieldPhotoItem[] = [
  {
    src: "/images/women-health/community/community-1.jpg",
    webp: "/images/women-health/community/community-1.webp",
    title: "Village Courtyard Gathering",
    desc: "Female Community Health Workers leading an interactive open-air session on menstrual hygiene in Ladeke Bhuller.",
  },
  {
    src: "/images/women-health/community/community-2.jpg",
    webp: "/images/women-health/community/community-2.webp",
    title: "Hygiene Demonstration & Practice",
    desc: "Practical demonstration of hygienic pad handling, clean water usage, and sun-drying techniques.",
  },
  {
    src: "/images/women-health/community/community-4.jpg",
    webp: "/images/women-health/community/community-4.webp",
    title: "Mother-Daughter Learning Circles",
    desc: "Encouraging mothers and daughters to discuss puberty openly, eliminating fear and stigma prior to menarche.",
  },
  {
    src: "/images/women-health/community/community-6.jpg",
    webp: "/images/women-health/community/community-6.webp",
    title: "Community Q&A & Myth Busting",
    desc: "Addressing local cultural taboos, infection warning signs, and proper private waste disposal.",
  },
];

const householdPhotos: FieldPhotoItem[] = [
  {
    src: "/images/women-health/door-to-door/door-to-door-2.jpg",
    webp: "/images/women-health/door-to-door/door-to-door-2.webp",
    title: "In-Home Family Consultation",
    desc: "CHWs consulting privately with mothers and adolescent daughters inside their family living courtyards.",
  },
  {
    src: "/images/women-health/door-to-door/door-to-door-7.jpg",
    webp: "/images/women-health/door-to-door/door-to-door-7.webp",
    title: "Doorstep Village Outreach",
    desc: "Navigating rural pathways in Kasur to reach housebound girls unable to attend public meetings.",
  },
  {
    src: "/images/women-health/door-to-door/door-to-door-3.jpg",
    webp: "/images/women-health/door-to-door/door-to-door-3.webp",
    title: "Private Veranda Counseling",
    desc: "One-on-one pre-menarche guidance in a safe, confidential home atmosphere.",
  },
  {
    src: "/images/women-health/door-to-door/door-to-door-12.jpg",
    webp: "/images/women-health/door-to-door/door-to-door-12.webp",
    title: "Urdu Leaflet Walkthrough",
    desc: "Going through illustrated anatomical diagrams and personal hygiene schedules with mothers.",
  },
];

const schoolPhotos: FieldPhotoItem[] = [
  {
    src: "/images/women-health/schools/school-4.jpg",
    webp: "/images/women-health/schools/school-4.webp",
    title: "Adolescent Classroom Assembly",
    desc: "Over 40 students participating in a supportive, stigma-free session on pubertal health.",
  },
  {
    src: "/images/women-health/schools/school-9.jpg",
    webp: "/images/women-health/schools/school-9.webp",
    title: "Interactive Blackboard Instruction",
    desc: "Demystifying menstrual anatomy and teaching menstrual calendar tracking in schools.",
  },
  {
    src: "/images/women-health/schools/school-10.jpg",
    webp: "/images/women-health/schools/school-10.webp",
    title: "Peer Engagement & Questions",
    desc: "Students actively raising questions and overcoming fears about staining and pain in class.",
  },
  {
    src: "/images/women-health/schools/school-12.jpg",
    webp: "/images/women-health/schools/school-12.webp",
    title: "Teacher-Student Support Network",
    desc: "Engaging female teachers as continuous on-site counselors to prevent school dropouts.",
  },
];

const dignityKitDistributionPhotos: FieldPhotoItem[] = [
  {
    src: "/images/women-health/dignity-kits/dignity-kit-13.jpg",
    webp: "/images/women-health/dignity-kits/dignity-kit-13.webp",
    title: "Adolescent Dignity Kit Handover",
    desc: "Central Field Coordinator handing over the official Dignity Kit box to a student prefect at Govt Girls Elementary School.",
  },
  {
    src: "/images/women-health/dignity-kits/dignity-kit-7.jpg",
    webp: "/images/women-health/dignity-kits/dignity-kit-7.webp",
    title: "Classroom Distribution Cohort",
    desc: "Students equipped with complete 9-item kits containing pads, soaps, sanitizer, and guides.",
  },
  {
    src: "/images/women-health/dignity-kits/dignity-kit-10.jpg",
    webp: "/images/women-health/dignity-kits/dignity-kit-10.webp",
    title: "Ending Period Poverty",
    desc: "Empowering young girls to stay confident, healthy, and regular in their school attendance.",
  },
  {
    src: "/images/women-health/dignity-kits/dignity-kit-16.jpg",
    webp: "/images/women-health/dignity-kits/dignity-kit-16.webp",
    title: "School Distribution Ceremony",
    desc: "Handover sessions organized alongside headmistresses and female Community Health Workers.",
  },
];

const timelineMilestones = [
  {
    month: "Month 1",
    label: "September 2026",
    phase: "Mobilization & Capacity Launch",
    sessions: "12 Community Sessions (~300)",
    visits: "120 Household Visits",
    schools: "6 School Sessions (~240)",
    highlights: [
      "Recruitment of 2 local female Social Mobilizers / CHWs",
      "Comprehensive Stakeholder Orientation & Capacity-Building Workshop (10–15 key partners)",
      "Introduction to village elders and GWP site committees in Lahore & Kasur",
      "Initial 12 community awareness sessions (3 per village per week)",
      "Initial 120 confidential door-to-door household assessments (15 HH/district/week)",
      "First round of 6 school-based adolescent sessions across 6 schools",
    ],
  },
  {
    month: "Month 2",
    label: "October 2026",
    phase: "Full Scale Field Delivery",
    sessions: "24 Community Sessions (~600)",
    visits: "240 Household Visits",
    schools: "6 School Sessions (~240)",
    highlights: [
      "Doubled outreach to 6 community awareness sessions per village weekly",
      "Door-to-door visits scaled to 30 households per district weekly (240 HH total)",
      "Expansion to 6 additional schools covering adolescent girls approaching menarche",
      "Identification & beneficiary enrollment for 500 Dignity Kits distribution",
      "Mid-project monitoring and feedback collection by GN Lahore field team",
    ],
  },
  {
    month: "Month 3",
    label: "November 2026",
    phase: "Intensive Engagement & Kit Preparation",
    sessions: "24 Community Sessions (~600)",
    visits: "240 Household Visits",
    schools: "6 School Sessions (~240)",
    highlights: [
      "Continued high-intensity outreach: 24 community sessions and 240 household visits",
      "6 school sessions covering remaining secondary and middle institutions",
      "Procurement, quality inspection, and packing of 500 Dignity Kits",
      "Targeted focus on girls aged 12–15 experiencing early menarche",
      "Community peer-support groups established under CHW supervision",
    ],
  },
  {
    month: "Month 4",
    label: "December 2026",
    phase: "Kit Distribution & Sustainability Debrief",
    sessions: "20 Community Sessions (~500)",
    visits: "240 Household Visits",
    schools: "6 School Sessions (~240)",
    highlights: [
      "Final 20 community sessions and 240 household visits completing 840 HH target",
      "Formal distribution of 500 Dignity Kits to enrolled adolescent girls",
      "Final school-based feedback debriefs with headmistresses and teachers",
      "Final monitoring evaluation, data consolidation, and impact reporting",
      "Transition of trained CHWs into permanent village health champions",
    ],
  },
];

const budgetBreakdown = [
  {
    category: "Program Delivery Costs",
    share: "66.52%",
    totalPkr: "PKR 1,510,000",
    totalUsd: "$5,341",
    items: [
      {
        title: "Dignity Kits for 500 Adolescent Girls",
        detail: "500 comprehensive kits @ PKR 2,000 per kit ($7.07 USD)",
        amountPkr: "PKR 1,000,000",
        amountUsd: "$3,537",
        pct: "44.05%",
      },
      {
        title: "School-Based Menstrual Hygiene Sessions",
        detail: "24 expert-led classroom sessions across 2 districts @ PKR 10,000",
        amountPkr: "PKR 240,000",
        amountUsd: "$849",
        pct: "10.57%",
      },
      {
        title: "IEC Materials (Distribution, Sessions & Kits)",
        detail: "Multipurpose informational, educational, and visual materials",
        amountPkr: "PKR 120,000",
        amountUsd: "$424",
        pct: "5.29%",
      },
      {
        title: "Project Orientation & Capacity-Building Workshop",
        detail: "Expert stipends, venue hire, multimedia, travel & lunch for 10–12 participants",
        amountPkr: "PKR 100,000",
        amountUsd: "$354",
        pct: "4.41%",
      },
      {
        title: "Learning Materials (Posters & Booklets)",
        detail: "Design and full print run of visual anatomy and hygiene posters & booklets",
        amountPkr: "PKR 50,000",
        amountUsd: "$177",
        pct: "2.20%",
      },
      {
        title: "Community Sessions (80) & Door-to-Door Visits (840 HH)",
        detail: "Directly delivered by budgeted CHWs (zero duplicate program line)",
        amountPkr: "PKR 0*",
        amountUsd: "$0*",
        pct: "0.00%",
      },
    ],
  },
  {
    category: "Support & Human Resource Costs",
    share: "33.48%",
    totalPkr: "PKR 760,000",
    totalUsd: "$2,688",
    items: [
      {
        title: "2 Social Mobilizers / CHWs (4 Months)",
        detail: "Dedicated female field mobilizers (PKR 50,000 × 2 × 4 months)",
        amountPkr: "PKR 400,000",
        amountUsd: "$1,415",
        pct: "17.62%",
      },
      {
        title: "Travel & Field Logistics",
        detail: "Local inter-village travel and logistical support (PKR 50,000 × 4 months)",
        amountPkr: "PKR 200,000",
        amountUsd: "$707",
        pct: "8.81%",
      },
      {
        title: "Finance Officer Contribution",
        detail: "Financial reporting, compliance, and ledger oversight (PKR 30,000 × 4 months)",
        amountPkr: "PKR 120,000",
        amountUsd: "$424",
        pct: "5.29%",
      },
      {
        title: "Stationery, IT Support & Communications",
        detail: "Field reporting forms, digital communications, and connectivity (PKR 10,000 × 4)",
        amountPkr: "PKR 40,000",
        amountUsd: "$141",
        pct: "1.76%",
      },
      {
        title: "Monitoring & Evaluation (GN Lahore & HO Team)",
        detail: "Core technical oversight (PKR 200,000 charged to institutional R&D)",
        amountPkr: "Charged to R&D",
        amountUsd: "—",
        pct: "—",
      },
    ],
  },
];

export function WomenHealthHygieneShowcase() {
  const [activeTab, setActiveTab] = useState<"community" | "household" | "school">("community");
  const [selectedKitItem, setSelectedKitItem] = useState<DignityKitItem>(dignityKitItems[0]!);
  const [activeTimelineMonth, setActiveTimelineMonth] = useState<number>(0);
  const [communityPhotoIdx, setCommunityPhotoIdx] = useState<number>(0);
  const [householdPhotoIdx, setHouseholdPhotoIdx] = useState<number>(0);
  const [schoolPhotoIdx, setSchoolPhotoIdx] = useState<number>(0);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ── 0. PARTNERSHIP & FIELD ANNOUNCEMENT HEADER ── */}
      <section className="relative px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="overflow-hidden rounded-3xl border border-ink/10 bg-sand/60 p-6 sm:p-10 lg:p-12 shadow-xs">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-clay">
                    <Sparkles className="h-3.5 w-3.5" />
                    Field Collaboration · Good Neighbors Pakistan &amp; ELF
                  </span>
                  <span className="text-xs font-medium text-ink/60">
                    4-Month Intervention (September – December 2026)
                  </span>
                </div>
                <h2 className="display-sm font-bold text-ink">
                  Women Health &amp; Hygiene Empowerment Project
                </h2>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/80 max-w-4xl">
                  A high-impact health, dignity, and sanitation intervention focusing on{" "}
                  <strong>adolescent girls (ages 12–15)</strong>, children, and rural households.
                  Directly integrated into the 4 intervention villages of the existing{" "}
                  <strong>Good Water Project (GWP)</strong> across Lahore and Kasur, this initiative
                  couples safe drinking water infrastructure with vital menstrual hygiene
                  management (MHM), personal health education, and dignified supplies.
                </p>

                {/* Key partnership indicators */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-ink/10 pt-6">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      Total Budget
                    </div>
                    <div className="mt-1 font-display text-lg sm:text-xl font-bold text-ink">
                      PKR 2,270,000
                    </div>
                    <div className="text-[11px] text-clay font-medium">~USD $8,030</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      Target Villages
                    </div>
                    <div className="mt-1 font-display text-lg sm:text-xl font-bold text-ink">
                      4 GWP Sites
                    </div>
                    <div className="text-[11px] text-ink/60">Lahore &amp; Kasur</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      Dignity Kits
                    </div>
                    <div className="mt-1 font-display text-lg sm:text-xl font-bold text-ink">
                      500 Kits
                    </div>
                    <div className="text-[11px] text-clay font-medium">Girls Aged 12–15</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                      Duration
                    </div>
                    <div className="mt-1 font-display text-lg sm:text-xl font-bold text-ink">
                      4 Months
                    </div>
                    <div className="text-[11px] text-ink/60">Sept – Dec 2026</div>
                  </div>
                </div>
              </div>

              {/* Callout box */}
              <div className="lg:col-span-4 lg:border-l lg:border-ink/10 lg:pl-8">
                <div className="rounded-2xl border border-clay/20 bg-background/80 p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-clay">
                    <Droplets className="h-4 w-4" />
                    Built Upon Clean Water Infrastructure
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">
                    Why Link With Good Water Project?
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/75">
                    Reusing verified GWP water installation sites enables instant community trust,
                    established village profiles, and zero assessment delays. Access to clean water
                    means menstrual hygiene practices taught in sessions can actually be practiced
                    safely at home and school.
                  </p>
                  <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink/70">
                    <span className="font-semibold text-ink">Technical Partner:</span>
                    <span>Hamsaaya Consultancy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Field Distribution Gallery: 500 Girls Equipped */}
          <div className="mt-12 rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 shadow-xs">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                  Distribution Highlights &amp; Field Realities
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                  Empowering 500 Adolescent Girls Across Lahore &amp; Kasur
                </h3>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-ink/70">
                Photographic records from our field distributions, pairing complete Dignity Kits with
                compassionate pre-menarche guidance to ensure young girls stay in school without shame or fear.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dignityKitDistributionPhotos.map((photo, idx) => (
                <figure
                  key={idx}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-sand/30 shadow-2xs transition-all duration-300 hover:border-clay/40 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                    <picture className="contents">
                      <source srcSet={photo.webp} type="image/webp" />
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute top-2.5 right-2.5 rounded-md bg-ink/80 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-cream">
                      Kit #{String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold text-ink group-hover:text-clay transition-colors">
                        {photo.title}
                      </h4>
                      <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                        {photo.desc}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-ink/10 flex items-center justify-between text-[11px] text-ink/50">
                      <span>Dignity Kit Cohort</span>
                      <span className="font-bold text-clay">Age 12–15</span>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 1. THE THREE MAIN ACTIVITIES (Centerpiece Showcase) ── */}
      <section id="three-activities" className="scroll-mt-24 px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
              <Layers className="h-4 w-4" />
              Core Program Structure · 3 Direct Interventions
            </div>
            <h2 className="display-md mt-4 text-ink">
              The Three Main Activities
            </h2>
            <p className="lede mt-4 text-ink/75">
              To dismantle deep-seated cultural taboos, prevent school absenteeism, and protect
              adolescent girls from dangerous infections, the project executes three interlocking,
              on-ground education and engagement activities across all four target villages.
            </p>
          </div>

          {/* Activity Tabs Switcher */}
          <div className="mt-10 flex flex-wrap gap-2.5 border-b border-ink/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("community")}
              className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "community"
                  ? "bg-clay text-cream shadow-sm"
                  : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>1. Community Awareness Sessions</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${activeTab === "community" ? "bg-white/20 text-white" : "bg-ink/10 text-ink"}`}>
                80 Sessions
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("household")}
              className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "household"
                  ? "bg-clay text-cream shadow-sm"
                  : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>2. Door-to-Door Household Visits</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${activeTab === "household" ? "bg-white/20 text-white" : "bg-ink/10 text-ink"}`}>
                840 Households
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("school")}
              className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "school"
                  ? "bg-clay text-cream shadow-sm"
                  : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
              }`}
            >
              <School className="h-4 w-4" />
              <span>3. School-Based Awareness Sessions</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${activeTab === "school" ? "bg-white/20 text-white" : "bg-ink/10 text-ink"}`}>
                24 Sessions
              </span>
            </button>
          </div>

          {/* Tab 1: Community Awareness Sessions */}
          {activeTab === "community" && (
            <div className="mt-8 rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 lg:p-12 shadow-xs">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-clay">
                      Activity 01 · Community Engagement
                    </span>
                    <span className="text-xs font-medium text-ink/60">
                      All 4 Villages · 25 Beneficiaries / Session
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-ink leading-tight">
                    Community Awareness Sessions on Menstrual Hygiene &amp; Health
                  </h3>

                  <p className="text-base sm:text-lg leading-relaxed text-ink/80">
                    Conducted by locally recruited female Social Mobilizers serving as Community
                    Health Workers (CHWs), these interactive sessions bring together women, mothers,
                    and adolescent girls in safe, culturally sensitive neighborhood gatherings.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-ink/10 py-5">
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-clay">
                        <Counter to={80} duration={1200} />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Total Sessions
                      </div>
                    </div>
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                        ≈<Counter to={2000} duration={1400} />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Women &amp; Girls Reached
                      </div>
                    </div>
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                        4
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Target Villages Covered
                      </div>
                    </div>
                  </div>

                  {/* Implementation Schedule */}
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                      4-Month Session Scaling Plan:
                    </h4>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 1 (Sept)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">12 Sessions</div>
                        <div className="text-[11px] text-ink/60">~300 participants (3/vil/wk)</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 2 (Oct)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">24 Sessions</div>
                        <div className="text-[11px] text-ink/60">~600 participants (6/vil/wk)</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 3 (Nov)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">24 Sessions</div>
                        <div className="text-[11px] text-ink/60">~600 participants (6/vil/wk)</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 4 (Dec)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">20 Sessions</div>
                        <div className="text-[11px] text-ink/60">~500 participants (5/vil/wk)</div>
                      </div>
                    </div>
                  </div>

                  {/* Core curriculum topics */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                      Curriculum &amp; Learning Modules:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-ink/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Biological understanding of menstruation without stigma or shame</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Proper use, washing, drying in sunlight, and hygienic disposal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Prevention of reproductive tract infections (RTIs) and skin rashes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Mother-daughter open dialogue prior to adolescent menarche</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Visual Interactive Gallery Card */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-sand/40 p-4 shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink/10 bg-sand">
                      <picture className="contents">
                        <source srcSet={communityPhotos[communityPhotoIdx].webp} type="image/webp" />
                        <img
                          src={communityPhotos[communityPhotoIdx].src}
                          alt={communityPhotos[communityPhotoIdx].title}
                          className="h-full w-full object-cover transition-all duration-500"
                          loading="lazy"
                        />
                      </picture>
                      <div className="absolute top-3 left-3 rounded-md bg-ink/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
                        Photo {communityPhotoIdx + 1} of {communityPhotos.length} · Field Capture
                      </div>
                    </div>

                    <div className="mt-3 p-3.5 rounded-xl bg-background border border-ink/10">
                      <div className="flex items-center justify-between text-xs font-bold text-ink">
                        <span>{communityPhotos[communityPhotoIdx].title}</span>
                        <span className="text-[11px] font-semibold text-clay uppercase">Field Dispatch</span>
                      </div>
                      <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                        {communityPhotos[communityPhotoIdx].desc}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {communityPhotos.map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCommunityPhotoIdx(i)}
                          className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                            communityPhotoIdx === i
                              ? "border-clay ring-2 ring-clay/30 scale-102"
                              : "border-ink/10 opacity-70 hover:opacity-100 hover:border-ink/40"
                          }`}
                          title={p.title}
                        >
                          <img
                            src={p.webp || p.src}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Door-to-Door Household Visits */}
          {activeTab === "household" && (
            <div className="mt-8 rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 lg:p-12 shadow-xs">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-clay">
                      Activity 02 · Intimate Household Outreach
                    </span>
                    <span className="text-xs font-medium text-ink/60">
                      All 4 Villages · 840 Households Reached
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-ink leading-tight">
                    Door-to-Door Household Visits &amp; In-Person Hygiene Counseling
                  </h3>

                  <p className="text-base sm:text-lg leading-relaxed text-ink/80">
                    Menstrual health is intensely private in rural Punjab. Door-to-door visits allow
                    female Community Health Workers to cross the household threshold and engage
                    mothers, adolescent daughters, and family matriarchs in personal, confidential
                    dialogue free from outside judgment.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-ink/10 py-5">
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-clay">
                        <Counter to={840} duration={1400} />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Total Households Reached
                      </div>
                    </div>
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                        100%
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Confidential &amp; In-Home
                      </div>
                    </div>
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                        2
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Districts (Lahore &amp; Kasur)
                      </div>
                    </div>
                  </div>

                  {/* Household rollout timeline */}
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                      Monthly Household Coverage Milestones:
                    </h4>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 1 (Sept)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">120 Families</div>
                        <div className="text-[11px] text-ink/60">15 HH/district/week</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 2 (Oct)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">240 Families</div>
                        <div className="text-[11px] text-ink/60">30 HH/district/week</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 3 (Nov)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">240 Families</div>
                        <div className="text-[11px] text-ink/60">30 HH/district/week</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 4 (Dec)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">240 Families</div>
                        <div className="text-[11px] text-ink/60">30 HH/district/week</div>
                      </div>
                    </div>
                  </div>

                  {/* Why Household Visits are Decisive */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                      Key Objectives of In-Home Outreach:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-ink/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Reaching shy, restricted, or house-bound girls unable to attend public sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Direct inspection of water storage hygiene and private drying locations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Addressing painful periods, abnormal bleeding, and referral to clinics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Enrolling 500 vulnerable adolescent girls for Dignity Kit delivery</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Visual Interactive Gallery Card */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-sand/40 p-4 shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink/10 bg-sand">
                      <picture className="contents">
                        <source srcSet={householdPhotos[householdPhotoIdx].webp} type="image/webp" />
                        <img
                          src={householdPhotos[householdPhotoIdx].src}
                          alt={householdPhotos[householdPhotoIdx].title}
                          className="h-full w-full object-cover transition-all duration-500"
                          loading="lazy"
                        />
                      </picture>
                      <div className="absolute top-3 left-3 rounded-md bg-ink/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
                        Photo {householdPhotoIdx + 1} of {householdPhotos.length} · Field Capture
                      </div>
                    </div>

                    <div className="mt-3 p-3.5 rounded-xl bg-background border border-ink/10">
                      <div className="flex items-center justify-between text-xs font-bold text-ink">
                        <span>{householdPhotos[householdPhotoIdx].title}</span>
                        <span className="text-[11px] font-semibold text-clay uppercase">Field Dispatch</span>
                      </div>
                      <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                        {householdPhotos[householdPhotoIdx].desc}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {householdPhotos.map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setHouseholdPhotoIdx(i)}
                          className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                            householdPhotoIdx === i
                              ? "border-clay ring-2 ring-clay/30 scale-102"
                              : "border-ink/10 opacity-70 hover:opacity-100 hover:border-ink/40"
                          }`}
                          title={p.title}
                        >
                          <img
                            src={p.webp || p.src}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: School-Based Awareness Sessions */}
          {activeTab === "school" && (
            <div className="mt-8 rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 lg:p-12 shadow-xs">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-clay/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-clay">
                      Activity 03 · Adolescent Education
                    </span>
                    <span className="text-xs font-medium text-ink/60">
                      Both Districts · ~40 Students / Session
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-ink leading-tight">
                    School-Based Awareness Sessions for Adolescent Girls
                  </h3>

                  <p className="text-base sm:text-lg leading-relaxed text-ink/80">
                    Studies show that girls in rural Punjab frequently miss 4 to 5 days of school
                    every month during their period due to fear, staining, pain, and lack of supplies.
                    Conducted inside government and community schools, these sessions demystify puberty
                    and keep girls enrolled in classrooms.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-ink/10 py-5">
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-clay">
                        <Counter to={24} duration={1200} />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        School Sessions
                      </div>
                    </div>
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                        ≈<Counter to={960} duration={1400} />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Students Educated
                      </div>
                    </div>
                    <div>
                      <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                        3
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                        Schools / District / Month
                      </div>
                    </div>
                  </div>

                  {/* School session schedule */}
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                      Monthly School Session Cadence:
                    </h4>
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 1 (Sept)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">6 Sessions</div>
                        <div className="text-[11px] text-ink/60">~240 students reached</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 2 (Oct)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">6 Sessions</div>
                        <div className="text-[11px] text-ink/60">~240 students reached</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 3 (Nov)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">6 Sessions</div>
                        <div className="text-[11px] text-ink/60">~240 students reached</div>
                      </div>
                      <div className="p-3 rounded-xl bg-sand/60 border border-ink/10">
                        <div className="text-xs font-bold text-clay uppercase">Month 4 (Dec)</div>
                        <div className="font-display text-lg font-bold text-ink mt-0.5">6 Sessions</div>
                        <div className="text-[11px] text-ink/60">~240 students reached</div>
                      </div>
                    </div>
                  </div>

                  {/* School Curriculum */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                      Classroom Education Focus:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-ink/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Pre-menarche orientation for girls aged 11–13 so their first period brings zero terror</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Correct pad application, timing, changing intervals, and discreet school bathroom habits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Tackling absenteeism: encouraging girls to stay in class during active menstrual cycles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>Engaging female teachers as continuous on-site counselors and support allies</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Visual Interactive Gallery Card */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-sand/40 p-4 shadow-md">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-ink/10 bg-sand">
                      <picture className="contents">
                        <source srcSet={schoolPhotos[schoolPhotoIdx].webp} type="image/webp" />
                        <img
                          src={schoolPhotos[schoolPhotoIdx].src}
                          alt={schoolPhotos[schoolPhotoIdx].title}
                          className="h-full w-full object-cover transition-all duration-500"
                          loading="lazy"
                        />
                      </picture>
                      <div className="absolute top-3 left-3 rounded-md bg-ink/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
                        Photo {schoolPhotoIdx + 1} of {schoolPhotos.length} · Field Capture
                      </div>
                    </div>

                    <div className="mt-3 p-3.5 rounded-xl bg-background border border-ink/10">
                      <div className="flex items-center justify-between text-xs font-bold text-ink">
                        <span>{schoolPhotos[schoolPhotoIdx].title}</span>
                        <span className="text-[11px] font-semibold text-clay uppercase">Field Dispatch</span>
                      </div>
                      <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                        {schoolPhotos[schoolPhotoIdx].desc}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {schoolPhotos.map((p, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSchoolPhotoIdx(i)}
                          className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                            schoolPhotoIdx === i
                              ? "border-clay ring-2 ring-clay/30 scale-102"
                              : "border-ink/10 opacity-70 hover:opacity-100 hover:border-ink/40"
                          }`}
                          title={p.title}
                        >
                          <img
                            src={p.webp || p.src}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 2. DIGNITY KITS DISTRIBUTION (Girls 12–15, at/approaching menarche) ── */}
      <section id="dignity-kits" className="scroll-mt-24 border-y border-ink/10 bg-sand/30 px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          {/* Section Header */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                <PackageCheck className="h-4 w-4" />
                Direct Material Support · Ending Period Poverty
              </div>
              <h2 className="display-md mt-4 text-ink">
                Dignity Kits Distribution
              </h2>
              <p className="font-display text-lg sm:text-xl font-semibold text-clay mt-2">
                500 Adolescent Girls (Ages 12–15, At or Approaching Menarche)
              </p>
              <p className="lede mt-4 text-ink/75 max-w-3xl">
                In rural and low-income Pakistani communities, branded commercial sanitary pads are an
                unaffordable luxury. Low-income families prioritize flour and fuel over hygiene products,
                forcing young girls to use unwashed rags, dried husk, or old fabric—causing acute reproductive
                infections and school dropouts. Each Dignity Kit provides the complete supplies necessary to
                protect a girl’s dignity, health, and classroom attendance.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <div className="inline-block rounded-2xl border border-clay/25 bg-background p-6 shadow-xs text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-ink/60">
                  Targeted Kit Distribution
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="numeral text-4xl sm:text-5xl font-bold text-clay">500</span>
                  <span className="font-display text-lg font-bold text-ink">Dignity Kits</span>
                </div>
                <p className="mt-2 text-xs text-ink/70">
                  Unit Cost: <strong>PKR 2,000 (~$7.07 USD)</strong> · Total Budget:{" "}
                  <strong>PKR 1,000,000 ($3,537 USD)</strong>
                </p>
                <div className="mt-3 text-[11px] text-ink/50 italic">
                  *Target can be scaled upward should additional philanthropic funding become available.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Dignity Kit Inspection Box */}
          <div className="mt-14 rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                  Official Proposal Specification (Section 6.3)
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                  What Goes Inside Each Dignity Kit
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-ink/60">
                <Info className="h-4 w-4 text-clay" />
                <span>Click any item below to inspect details &amp; health benefit</span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
              {/* Item selection grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {dignityKitItems.map((item, idx) => {
                  const isSelected = selectedKitItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedKitItem(item)}
                      className={`group flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-clay bg-clay/5 shadow-sm ring-2 ring-clay/20"
                          : "border-ink/10 bg-sand/30 hover:border-clay/40 hover:bg-sand/70"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-clay text-cream shadow-xs"
                              : "bg-clay/10 text-clay group-hover:bg-clay group-hover:text-cream"
                          }`}>
                            <item.Icon className="h-6 w-6 stroke-[1.8]" />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider rounded-md px-1.5 py-0.5 ${
                            isSelected ? "bg-clay text-cream" : "bg-ink/10 text-ink/70"
                          }`}>
                            Item {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-sm font-bold text-ink group-hover:text-clay transition-colors leading-snug">
                          {item.name}
                        </h4>
                      </div>
                      <div className="mt-3 pt-2 border-t border-ink/10 text-xs font-semibold text-clay">
                        Qty: {item.quantity}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Inspector Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-clay/30 bg-sand/60 p-6 sm:p-8 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-clay text-cream shadow-md">
                      <selectedKitItem.Icon className="h-9 w-9 stroke-[1.8]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-clay">
                        Selected Kit Component
                      </span>
                      <h4 className="font-display text-xl font-bold text-ink">
                        {selectedKitItem.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/50">
                        Quantity In Each Kit:
                      </div>
                      <div className="font-display text-lg font-bold text-clay mt-0.5">
                        {selectedKitItem.quantity}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink/50">
                        Item Description:
                      </div>
                      <p className="mt-1 text-sm text-ink/80 leading-relaxed">
                        {selectedKitItem.description}
                      </p>
                    </div>

                    <div className="rounded-xl border border-clay/20 bg-background/90 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-clay">
                        <ShieldCheck className="h-4 w-4" />
                        Clinical &amp; Dignity Health Benefit:
                      </div>
                      <p className="mt-1.5 text-xs sm:text-sm text-ink/85 leading-relaxed font-medium">
                        {selectedKitItem.benefit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between text-xs text-ink/60">
                    <span>Part of 500 Kits Target</span>
                    <span className="font-semibold text-ink">GN &amp; ELF Verified Standard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ORIENTATION & CAPACITY-BUILDING SESSION ── */}
      <section id="capacity-building" className="scroll-mt-24 px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="overflow-hidden rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 lg:p-12 shadow-xs">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                  <Award className="h-4 w-4" />
                  Activity 6.4 · Institutional Capacity
                </div>

                <h2 className="display-sm font-bold text-ink">
                  Orientation &amp; Capacity-Building Session
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-ink/80">
                  Sustainable health transformation cannot happen through top-down mandates. In Month 1,
                  GN Pakistan and ELF convene an intensive project orientation and coordination workshop,
                  bringing together key institutional stakeholders, field leadership, and front-line health
                  workers.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-ink/10 py-5">
                  <div>
                    <div className="numeral text-3xl sm:text-4xl font-bold text-clay">1 Event</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                      Conducted in Month 1
                    </div>
                  </div>
                  <div>
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">10–15</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                      Key Stakeholder Participants
                    </div>
                  </div>
                  <div>
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">PKR 100K</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/60 mt-1">
                      Dedicated Allocation ($354)
                    </div>
                  </div>
                </div>

                {/* Scope & inclusions */}
                <div>
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                    Workshop Scope &amp; Deliverables:
                  </h4>
                  <ul className="mt-3 space-y-3 text-xs sm:text-sm text-ink/80">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                      <span>
                        <strong>Expert-Led Scientific Training:</strong> Training female Social Mobilizers / CHWs on evidence-based Menstrual Hygiene Management (MHM), infection prevention, and adolescent psychology.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                      <span>
                        <strong>Cultural De-escalation &amp; Stigma Navigation:</strong> Equipping mobilizers with tactical communication strategies to diffuse conservative pushback and engage village patriarchs respectfully.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                      <span>
                        <strong>Monitoring &amp; Attendance Protocols:</strong> Setting up rigorous reporting sheets, daily participant logs, household visit verification, and Dignity Kit distribution manifests.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                      <span>
                        <strong>Multi-Partner Coordination:</strong> Aligning GN Pakistan Lahore field office, Implementing Partners, Hamsaaya technical team, and local government health representatives.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Visual Card */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-sand/40 p-4 shadow-md">
                  <picture className="contents">
                    <source srcSet="/images/women-health/capacity-building.webp" type="image/webp" />
                    <img
                      src="/images/women-health/capacity-building.jpg"
                      alt="Stakeholder Capacity-Building and Orientation Session"
                      className="w-full h-auto rounded-xl object-cover"
                      loading="lazy"
                    />
                  </picture>
                  <div className="mt-3 p-4 rounded-xl bg-background border border-ink/10">
                    <div className="text-xs font-bold uppercase tracking-wider text-clay">
                      Budget Inclusions (Activity 4.1):
                    </div>
                    <p className="mt-1 text-xs text-ink/75 leading-relaxed">
                      Includes technical expert stipends, travel allowances for CHWs &amp; community representatives,
                      hall rental, multimedia projection, seating setup, and refreshments/lunch for participants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TARGET VILLAGES & GEOGRAPHIC COVERAGE (Table 1) ── */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
              <MapPin className="h-4 w-4" />
              Geographic Scope · 4 Villages in 2 Districts
            </div>
            <h2 className="display-sm mt-4 text-ink font-bold">
              Project Coverage by District &amp; Village
            </h2>
            <p className="lede mt-3 text-ink/75">
              The project is deployed across four distinct rural villages with existing Good Water Project
              installations, pairing safe water taps with structured personal hygiene outreach.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                district: "Lahore District",
                village: "Ladeke Bhuller",
                role: "Social Mobilizer / CHW – Lahore",
                desc: "Existing GWP water infrastructure site; high adolescent schoolgirl population with acute pre-menarche information gaps.",
                coverage: "Awareness sessions, door-to-door visits, school sessions, dignity kits",
              },
              {
                num: "02",
                district: "Lahore District",
                village: "Lakhoki",
                role: "Social Mobilizer / CHW – Lahore",
                desc: "Peri-urban village cluster where low maternal literacy restricts home discussions on reproductive health.",
                coverage: "Awareness sessions, door-to-door visits, school sessions, dignity kits",
              },
              {
                num: "03",
                district: "Kasur District",
                village: "Katluhi Kalan",
                role: "Social Mobilizer / CHW – Kasur",
                desc: "Rural settlement in Kasur facing severe groundwater contamination and industrial runoff; critical hygiene priority area.",
                coverage: "Awareness sessions, door-to-door visits, school sessions, dignity kits",
              },
              {
                num: "04",
                district: "Kasur District",
                village: "Gadhoki",
                role: "Social Mobilizer / CHW – Kasur",
                desc: "Isolated agricultural village where girls routinely miss school during menstrual cycles due to absence of sanitary pads.",
                coverage: "Awareness sessions, door-to-door visits, school sessions, dignity kits",
              },
            ].map((v) => (
              <div
                key={v.village}
                className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-6 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="numeral text-sm font-bold text-clay">{v.num}</span>
                    <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-bold text-ink/70">
                      {v.district}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink">
                    {v.village}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-clay">{v.role}</div>
                  <p className="mt-3 text-xs sm:text-sm text-ink/75 leading-relaxed">
                    {v.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink/50">
                    Delivered Activities:
                  </div>
                  <div className="mt-1 text-xs text-ink/80 font-medium">
                    {v.coverage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EVIDENCE-BASED RATIONALE: WATER QUALITY & HEALTH CRISIS ── */}
      <section className="border-t border-ink/10 bg-sand/40 px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
              <AlertTriangle className="h-4 w-4" />
              Critical Ground Intelligence &amp; Evidence
            </div>
            <h2 className="display-sm mt-4 text-ink font-bold">
              Why Menstrual Hygiene Awareness Cannot Wait
            </h2>
            <p className="lede mt-3 text-ink/75">
              Data from the Pakistan Council of Research in Water Resources (PCRWR), UNICEF MICS,
              and recent clinical studies reveal a compounding crisis: contaminated water, absent
              pre-menarche information, and acute gender disparities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-2xl bg-background border border-ink/10 shadow-xs">
              <div className="numeral text-4xl sm:text-5xl font-bold text-red-600">
                <Counter to={10} duration={1200} />%
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-red-600">
                Safe Water in Kasur
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink/75">
                PCRWR national monitoring repeatedly ranks Kasur among Pakistan’s least safe cities: only 1 in 10 water sources meets national safety standards. Close to 45% are contaminated with microbial pathogens.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-ink/10 shadow-xs">
              <div className="numeral text-4xl sm:text-5xl font-bold text-clay">
                <Counter to={31} duration={1200} />%
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-clay">
                Safe Water in Lahore
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink/75">
                National monitoring in Lahore found safe drinking water in fewer than 1 in 3 sources. Contaminated water dramatically magnifies the risk of reproductive infections when hygiene practices are poor.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-ink/10 shadow-xs">
              <div className="numeral text-4xl sm:text-5xl font-bold text-ink">
                3 in 10
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/70">
                Pre-Menarche Awareness
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink/75">
                A 2024 cross-sectional study (Cureus) of adolescent schoolgirls in rural Lahore found only ~30% had received any information prior to their first period, causing extreme fear and emotional trauma.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background border border-ink/10 shadow-xs">
              <div className="numeral text-4xl sm:text-5xl font-bold text-clay">
                57.4%
              </div>
              <div className="mt-2 text-xs font-bold uppercase tracking-wider text-clay">
                Kasur Female Literacy
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink/75">
                A stark gender literacy gap (57.44% female vs 67.97% male, 2023 Census) mirrors the severe school-attendance and engagement barriers rural girls face once they reach puberty without hygiene supplies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. 4-MONTH IMPLEMENTATION TIMELINE (Interactive Tracker) ── */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
              <Calendar className="h-4 w-4" />
              Project Execution · 4-Month Implementation Plan
            </div>
            <h2 className="display-sm mt-4 text-ink font-bold">
              Timeline &amp; Monthly Beneficiary Cadence
            </h2>
            <p className="lede mt-3 text-ink/75">
              From initial community mobilization in September through final Dignity Kit distribution
              and monitoring in December 2026.
            </p>
          </div>

          {/* Month buttons */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timelineMilestones.map((m, idx) => {
              const isActive = activeTimelineMonth === idx;
              return (
                <button
                  key={m.month}
                  type="button"
                  onClick={() => setActiveTimelineMonth(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "border-clay bg-clay text-cream shadow-md"
                      : "border-ink/10 bg-background text-ink hover:border-clay/40 hover:bg-sand/40"
                  }`}
                >
                  <div className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-cream/80" : "text-clay"}`}>
                    {m.month}
                  </div>
                  <div className="font-display text-lg font-bold mt-1">{m.label}</div>
                  <div className={`text-xs mt-1 truncate ${isActive ? "text-cream/80" : "text-ink/60"}`}>
                    {m.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Month Detail Box */}
          {timelineMilestones[activeTimelineMonth] && (
            <div className="mt-6 rounded-3xl border border-ink/10 bg-sand/50 p-6 sm:p-10 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-clay">
                    {timelineMilestones[activeTimelineMonth].month} Execution Blueprint
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ink mt-0.5">
                    {timelineMilestones[activeTimelineMonth].phase}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-ink border border-ink/10">
                    {timelineMilestones[activeTimelineMonth].sessions}
                  </span>
                  <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-ink border border-ink/10">
                    {timelineMilestones[activeTimelineMonth].visits}
                  </span>
                  <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-ink border border-ink/10">
                    {timelineMilestones[activeTimelineMonth].schools}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">
                  Key Milestones &amp; Operations Scheduled:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-ink/85">
                  {timelineMilestones[activeTimelineMonth].highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-clay" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 7. TRANSPARENT BUDGET BREAKDOWN (Table 12) ── */}
      <section className="border-t border-ink/10 bg-sand/30 px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                <DollarSign className="h-4 w-4" />
                Fiscal Transparency · Section 12 Budget Summary
              </div>
              <h2 className="display-md mt-4 text-ink font-bold">
                Total Project Budget Breakdown
              </h2>
              <p className="font-display text-xl font-bold text-clay mt-2">
                PKR 2,270,000 (Approx. USD $8,030 @ 282.7 PKR/USD)
              </p>
              <p className="lede mt-3 text-ink/75 max-w-3xl">
                Every rupee is mapped directly to measurable community deliverables. 66.52% of all
                funds directly purchase dignity kits, session supplies, and educational materials; 33.48%
                supports female Community Health Workers, local logistics, and financial oversight.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <div className="inline-block rounded-2xl border border-ink/10 bg-background p-6 shadow-xs text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-ink/50">
                  Mid-Year Review (MYR) Cap
                </div>
                <div className="font-display text-2xl font-bold text-ink mt-1">
                  $8,000 – $9,000 Range
                </div>
                <div className="mt-2 text-xs text-clay font-semibold">
                  100% compliant with GN Pakistan field limits
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {budgetBreakdown.map((sec) => (
              <div
                key={sec.category}
                className="rounded-3xl border border-ink/10 bg-background p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-clay">
                      {sec.share} of Total Budget
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink mt-0.5">
                      {sec.category}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-ink">{sec.totalPkr}</div>
                    <div className="text-xs text-clay font-medium">{sec.totalUsd}</div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {sec.items.map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-xl bg-sand/40 border border-ink/5 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h4 className="font-display text-sm font-bold text-ink">{item.title}</h4>
                          <p className="mt-1 text-xs text-ink/70">{item.detail}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-display text-sm font-bold text-ink">{item.amountPkr}</div>
                          <div className="text-[11px] text-clay font-semibold">{item.amountUsd}</div>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-ink/10 flex justify-between text-[11px] text-ink/50">
                        <span>Budget Allocation</span>
                        <span className="font-bold text-ink/70">{item.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-ink/60 italic">
            * Activities 2.1 (Community Awareness Sessions) and 2.2 (Door-to-Door Household Visits) carry zero direct program cost line items, as they are fully delivered by the 2 Social Mobilizers / CHWs budgeted under Support Costs.
          </div>
        </div>
      </section>

      {/* ── 8. SUSTAINABILITY & COMMUNITY OWNERSHIP ── */}
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="rounded-3xl border border-clay/30 bg-sand/60 p-8 sm:p-12 lg:p-16 shadow-md">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                  <ShieldCheck className="h-4 w-4" />
                  Long-Term Community Legacy
                </div>
                <h2 className="display-sm mt-4 text-ink font-bold">
                  Building Lasting Awareness Capacity in Every Village
                </h2>
                <p className="lede mt-4 text-ink/80">
                  Unlike short-term relief drops, this intervention is designed to leave permanent
                  human capacity behind. By recruiting female Social Mobilizers and Community Health
                  Workers from within the intervention communities themselves, local capacity to
                  educate young girls, counsel new mothers, and manage hygiene supplies remains rooted
                  in the villages long after the 4-month project period concludes.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/donate"
                    search={{ project: "women-health-hygiene-empowerment" }}
                    className="inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-xs font-bold uppercase tracking-wider text-cream shadow-xs hover:bg-clay-deep transition-all"
                  >
                    <span>Sponsor A Dignity Kit ($7.50 / PKR 2,000)</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-background px-8 py-4 text-xs font-bold uppercase tracking-wider text-ink hover:border-ink transition-all"
                  >
                    <span>Partner With Us</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-ink/10 bg-background p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-clay">
                    <HeartHandshake className="h-4 w-4" />
                    Field Leadership &amp; Contact
                  </div>
                  <div>
                    <div className="text-xs text-ink/60">Submitted By:</div>
                    <div className="font-display text-base font-bold text-ink">Rabia Tariq</div>
                    <div className="text-xs text-clay font-medium">Central Field Coordinator, GN Pakistan</div>
                  </div>
                  <div className="pt-3 border-t border-ink/10 text-xs text-ink/75 space-y-1">
                    <div>
                      <strong>Email:</strong> rabiatariq@goodneighbors.pk
                    </div>
                    <div>
                      <strong>Mobile:</strong> +92 324 4054202
                    </div>
                    <div>
                      <strong>Project Office:</strong> Lahore Field Office &amp; Head Office
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
