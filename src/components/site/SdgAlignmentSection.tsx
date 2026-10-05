import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Globe2,
  Table2,
  LayoutGrid,
  ArrowUpRight,
  GraduationCap,
  HeartPulse,
  Scale,
  CheckCircle2,
  BookOpen,
  Package,
  Music,
  Droplets,
  Home,
  Laptop,
  Building2,
  HandHeart,
  Search,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Rise } from "./motion-primitives";

export interface SdgMeta {
  num: number;
  code: string;
  title: string;
  color: string;
  lightBg: string;
  focus: string;
  summary: string;
  programmes: { name: string; slug: string }[];
}

export const SDGS: SdgMeta[] = [
  {
    num: 1,
    code: "SDG 1",
    title: "No Poverty",
    color: "#E5243B",
    lightBg: "rgba(229, 36, 59, 0.08)",
    focus: "Eradicating extreme poverty through direct debt cancellation, dignified housing, and micro-business toolkits.",
    summary: "School access, debt relief, housing support, and sustainable livelihoods for vulnerable families.",
    programmes: [
      { name: "Hope and Freedom", slug: "hope-and-freedom-for-widows-headed-families" },
      { name: "Education For All", slug: "education-for-all" },
      { name: "School Bags Distribution", slug: "school-bags" },
      { name: "Orphan Care", slug: "faith-hope-love-for-every-child" },
    ],
  },
  {
    num: 3,
    code: "SDG 3",
    title: "Good Health & Well-being",
    color: "#4C9F38",
    lightBg: "rgba(76, 159, 56, 0.08)",
    focus: "Maternal mortality reduction, mobile rural health camps, and continuous antenatal monitoring.",
    summary: "Medical outreach, maternal care, midwifery training, and free essential medicines.",
    programmes: [
      { name: "Midwifery Training Program", slug: "midwifery-program" },
      { name: "Health, WASH & Wellbeing", slug: "health-wash-community-wellbeing" },
      { name: "Music of the Heart", slug: "music-of-the-heart" },
      { name: "Orphan Care", slug: "faith-hope-love-for-every-child" },
    ],
  },
  {
    num: 4,
    code: "SDG 4",
    title: "Quality Education",
    color: "#C5192D",
    lightBg: "rgba(197, 25, 45, 0.08)",
    focus: "Eliminating economic barriers to primary and secondary schooling through free tuition and complete learning sets.",
    summary: "Free community schooling, books, school bags, music education, and foundational skills.",
    programmes: [
      { name: "Education For All", slug: "education-for-all" },
      { name: "School Bags Distribution", slug: "school-bags" },
      { name: "Music of the Heart", slug: "music-of-the-heart" },
      { name: "Community & Digital Skills", slug: "community-digital-skills-developments" },
      { name: "Orphan Care", slug: "faith-hope-love-for-every-child" },
    ],
  },
  {
    num: 5,
    code: "SDG 5",
    title: "Gender Equality",
    color: "#FF3A21",
    lightBg: "rgba(255, 58, 33, 0.08)",
    focus: "Uplifting widows, girls, and female community health workers into economic self-determination.",
    summary: "Dedicated support for widowed mothers, girls' secondary schooling, and certified female birth attendants.",
    programmes: [
      { name: "Midwifery Training Program", slug: "midwifery-program" },
      { name: "Hope and Freedom", slug: "hope-and-freedom-for-widows-headed-families" },
      { name: "Community & Digital Skills", slug: "community-digital-skills-developments" },
      { name: "Education For All", slug: "education-for-all" },
    ],
  },
  {
    num: 6,
    code: "SDG 6",
    title: "Clean Water & Sanitation",
    color: "#26BDE2",
    lightBg: "rgba(38, 189, 226, 0.08)",
    focus: "Installing continuous clean drinking water filtration and community hygiene infrastructure in underserved villages.",
    summary: "Safe drinking water pumps, filtration plants, hygiene kits, and community sanitation.",
    programmes: [
      { name: "Health, WASH & Wellbeing", slug: "health-wash-community-wellbeing" },
    ],
  },
  {
    num: 8,
    code: "SDG 8",
    title: "Decent Work & Economic Growth",
    color: "#A21942",
    lightBg: "rgba(162, 25, 66, 0.08)",
    focus: "Market-ready vocational trades, digital skills training, and capital assets for independent home businesses.",
    summary: "Vocational skills, computer literacy, industrial tailoring, and micro-business establishment.",
    programmes: [
      { name: "Community & Digital Skills", slug: "community-digital-skills-developments" },
      { name: "Hope and Freedom", slug: "hope-and-freedom-for-widows-headed-families" },
      { name: "Midwifery Training Program", slug: "midwifery-program" },
      { name: "Capacity Building Program", slug: "capacity-building" },
    ],
  },
  {
    num: 10,
    code: "SDG 10",
    title: "Reduced Inequalities",
    color: "#DD1367",
    lightBg: "rgba(221, 19, 103, 0.08)",
    focus: "Affirmative protection and resource redistribution for religious minorities, orphans, and bonded laborers.",
    summary: "Targeted support for marginalized children, widows, and excluded communities.",
    programmes: [
      { name: "Orphan Care", slug: "faith-hope-love-for-every-child" },
      { name: "Education For All", slug: "education-for-all" },
      { name: "School Bags Distribution", slug: "school-bags" },
      { name: "Hope and Freedom", slug: "hope-and-freedom-for-widows-headed-families" },
      { name: "Midwifery Training", slug: "midwifery-program" },
    ],
  },
  {
    num: 16,
    code: "SDG 16",
    title: "Peace, Justice & Strong Institutions",
    color: "#00689D",
    lightBg: "rgba(0, 104, 157, 0.08)",
    focus: "Legal defense against generational debt bondage, child protection protocols, and transparent NGO accounting.",
    summary: "Child protection, legal freedom from debt servitude, and transparent institutional governance.",
    programmes: [
      { name: "Hope and Freedom", slug: "hope-and-freedom-for-widows-headed-families" },
      { name: "Capacity Building Program", slug: "capacity-building" },
      { name: "Orphan Care", slug: "faith-hope-love-for-every-child" },
    ],
  },
  {
    num: 17,
    code: "SDG 17",
    title: "Partnerships for the Goals",
    color: "#19486A",
    lightBg: "rgba(25, 72, 106, 0.08)",
    focus: "Uniting grassroots village elders, global donors, institutional audit partners, and volunteer networks.",
    summary: "Cross-sector collaboration with local leaders, community volunteers, and international partners.",
    programmes: [
      { name: "Capacity Building Program", slug: "capacity-building" },
      { name: "Health, WASH & Wellbeing", slug: "health-wash-community-wellbeing" },
    ],
  },
];

export interface ProgrammeRow {
  slug: string;
  name: string;
  category: string;
  focus: string;
  primarySdgs: number[];
  howAligns: string;
  icon: typeof BookOpen;
  accent: string;
}

export const PROGRAMME_ROWS: ProgrammeRow[] = [
  {
    slug: "education-for-all",
    name: "Education For All",
    category: "Primary & Secondary",
    focus: "Free community schooling & educational access",
    primarySdgs: [4, 1, 10, 5],
    howAligns: "Tuition, textbooks, and daily school provisions remove financial barriers for children who would otherwise never enroll.",
    icon: BookOpen,
    accent: "#C5192D",
  },
  {
    slug: "school-bags",
    name: "School Bags Distribution Program",
    category: "Dropout Prevention",
    focus: "Sponsored serialized school backpacks & kits",
    primarySdgs: [4, 1, 10],
    howAligns: "Serialized, traceable backpacks equipped with notebooks, uniforms, and stationery prevent attendance dropouts.",
    icon: Package,
    accent: "#C5192D",
  },
  {
    slug: "midwifery-program",
    name: "Midwifery Training Program",
    category: "Maternal Healthcare",
    focus: "Skilled birth attendance & maternal healthcare",
    primarySdgs: [3, 5, 8, 10],
    howAligns: "Trains and certifies local community midwives in remote districts where hospitals are hours away, securing safe village deliveries.",
    icon: HeartPulse,
    accent: "#4C9F38",
  },
  {
    slug: "music-of-the-heart",
    name: "Music of the Heart Project",
    category: "Arts & Cognition",
    focus: "Arts education & emotional child development",
    primarySdgs: [4, 3, 10],
    howAligns: "Daily structured music education strengthens attendance, emotional resilience, self-worth, and cognitive learning.",
    icon: Music,
    accent: "#C5192D",
  },
  {
    slug: "health-wash-community-wellbeing",
    name: "Health, WASH & Community Wellbeing",
    category: "Clean Water & Clinics",
    focus: "Free dispensaries, clean water & sanitation",
    primarySdgs: [3, 6, 5, 10],
    howAligns: "Free medical outreach, essential pharmaceuticals, deep-well clean water filtration, and hygiene protect families.",
    icon: Droplets,
    accent: "#26BDE2",
  },
  {
    slug: "hope-and-freedom-for-widows-headed-families",
    name: "Hope and Freedom",
    category: "Bonded Debt Liberation",
    focus: "Debt relief, transitional housing & micro-enterprise",
    primarySdgs: [1, 8, 10, 16, 4, 5],
    howAligns: "Legally negotiates and discharges 100% of brick-kiln debt, provides prepaid housing, and gives mothers micro-enterprise tools.",
    icon: Home,
    accent: "#E5243B",
  },
  {
    slug: "community-digital-skills-developments",
    name: "Community & Digital Skills Developments",
    category: "Livelihoods & Trades",
    focus: "Computer literacy & certified industrial tailoring",
    primarySdgs: [8, 4, 5, 9, 10],
    howAligns: "Dual-track computer academies and industrial sewing machines distributed for immediate, dignified home enterprise.",
    icon: Laptop,
    accent: "#A21942",
  },
  {
    slug: "capacity-building",
    name: "Capacity Building Program",
    category: "Governance & Stewardship",
    focus: "Financial consultation, transparency & compliance",
    primarySdgs: [16, 17, 8, 10],
    howAligns: "Trains grassroots leaders and non-profit administrators in transparent accounting, budgeting, and statutory governance.",
    icon: Building2,
    accent: "#00689D",
  },
  {
    slug: "faith-hope-love-for-every-child",
    name: "Orphan Care",
    category: "Child Protection",
    focus: "Long-term orphan care & inclusive disability aid",
    primarySdgs: [10, 4, 1, 3, 16],
    howAligns: "Continuous residential and educational care for 35 orphaned girls, single-parent children, and youth with disabilities.",
    icon: HandHeart,
    accent: "#DD1367",
  },
];

export const IMPACT_CLUSTERS = [
  {
    id: "learning",
    title: "Learning & Opportunity",
    subtitle: "Education Access & Economic Agency",
    clusterSdgs: [4, 8, 10],
    color: "#C5192D",
    bgGradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    borderColor: "border-rose-500/25",
    icon: GraduationCap,
    workstreams: ["Education For All", "School Bags Distribution", "Music of the Heart"],
    outcomes: [
      "Children enrolled in school and actively learning",
      "Eliminating out-of-pocket costs (fees, uniforms, textbooks)",
      "Daily creative, cognitive & social enrichment",
    ],
    metric: "14,000+",
    metricLabel: "Students Supported",
  },
  {
    id: "health",
    title: "Health & Dignity",
    subtitle: "Maternal Safety & Disease Prevention",
    clusterSdgs: [3, 5, 6],
    color: "#4C9F38",
    bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-500/25",
    icon: HeartPulse,
    workstreams: ["Midwifery Training Program", "Health, WASH & Community Wellbeing"],
    outcomes: [
      "Safe village births delivered by skilled attendants",
      "Continuous pure drinking water preventing waterborne disease",
      "Free medical consultations, diagnostic camps & medicines",
    ],
    metric: "4,800+",
    metricLabel: "Safe Village Births",
  },
  {
    id: "justice",
    title: "Justice & Resilience",
    subtitle: "Debt Freedom & Institutional Stewardship",
    clusterSdgs: [1, 16, 17],
    color: "#00689D",
    bgGradient: "from-sky-500/10 via-sky-500/5 to-transparent",
    borderColor: "border-sky-500/25",
    icon: Scale,
    workstreams: [
      "Hope and Freedom (Widows Welfare)",
      "Community & Digital Skills",
      "Orphan Care",
      "Capacity Building Program",
    ],
    outcomes: [
      "100% legal discharge of inherited kiln debt for widowed families",
      "Women & youth equipped with productive income-earning tools",
      "Rigorous non-profit bookkeeping, compliance & local governance",
    ],
    metric: "100%",
    metricLabel: "Debt Discharge",
  },
];

export const EVIDENCE_STATS = [
  { value: "14,000+", label: "Students Supported", sub: "Across 35+ community schools" },
  { value: "35+", label: "Community Schools", sub: "Established & funded" },
  { value: "4,800+", label: "Safe Village Births", sub: "By certified midwives" },
  { value: "18,500+", label: "Free Consultations", sub: "Medical camps & medicine" },
  { value: "1,655+", label: "Children Protected", sub: "Orphan care & inclusive aid" },
];

export function SdgAlignmentSection() {
  const [activeTab, setActiveTab] = useState<"matrix" | "goals">("matrix");
  const [selectedSdg, setSelectedSdg] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProgrammes = useMemo(() => {
    return PROGRAMME_ROWS.filter((p) => {
      const matchesSdg = selectedSdg ? p.primarySdgs.includes(selectedSdg) : true;
      const matchesSearch = searchQuery.trim()
        ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.howAligns.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesSdg && matchesSearch;
    });
  }, [selectedSdg, searchQuery]);

  const activeSdgMeta = selectedSdg ? SDGS.find((s) => s.num === selectedSdg) : null;

  return (
    <section id="sdg-alignment" className="relative overflow-hidden border-b border-ink/10 bg-background py-20 sm:py-28">
      {/* Decorative ambient blur */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-clay/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-96 w-96 rounded-full bg-moss/[0.04] blur-3xl" />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-ink/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-clay">
              <Globe2 className="h-3.5 w-3.5" />
              <span>United Nations 2030 Agenda · Strategic Alignment</span>
            </div>

            <h2 className="display-lg mt-4 text-ink">
              Global Goals, Local Dignity.
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
              Education and Life Foundation (ELF) translates the UN Sustainable Development Goals into tangible,
              verifiable improvements for vulnerable Pakistani families. Our 9 active field programmes align directly
              with 9 core SDGs across education, healthcare, clean water, debt liberation, and institutional transparency.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-full border border-ink/10 bg-sand/60 dark:bg-card/80 self-start lg:self-end shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "matrix"
                  ? "bg-ink text-cream shadow-md"
                  : "text-ink/65 hover:text-ink hover:bg-sand/80"
              }`}
            >
              <Table2 className="h-4 w-4" />
              <span>Alignment Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("goals")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === "goals"
                  ? "bg-ink text-cream shadow-md"
                  : "text-ink/65 hover:text-ink hover:bg-sand/80"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>9 Core Goals</span>
            </button>
          </div>
        </div>

        {/* ── Evidence Statistics Strip ── */}
        <div className="my-10 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {EVIDENCE_STATS.map((stat, i) => (
            <Rise key={stat.label} delay={i * 0.04}>
              <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-sand/35 dark:bg-card/60 p-5 text-center transition-all duration-300 hover:border-clay/40 hover:shadow-md hover:-translate-y-0.5">
                <span className="numeral block text-3xl sm:text-4xl font-black text-clay">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-xs font-bold uppercase tracking-wider text-ink dark:text-cream">
                  {stat.label}
                </span>
                <span className="mt-0.5 block text-[11px] text-ink/60 dark:text-cream/60">
                  {stat.sub}
                </span>
              </div>
            </Rise>
          ))}
        </div>

        {/* ── Strategic Impact Pipeline (The 3 Pillars from Graphic 3) ── */}
        <div className="my-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="eyebrow text-clay">Theory of Change</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                From Grassroots Action to Measurable Impact
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-ink/65 leading-relaxed">
              Our 9 field programmes cluster into three integrated transformation streams, addressing root causes rather than isolated symptoms.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {IMPACT_CLUSTERS.map((cluster, i) => {
              const Icon = cluster.icon;
              return (
                <Rise key={cluster.id} delay={i * 0.06}>
                  <div
                    className={`relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border ${cluster.borderColor} bg-gradient-to-b ${cluster.bgGradient} p-7 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  >
                    <div>
                      {/* Cluster Top Bar */}
                      <div className="flex items-center justify-between gap-3 pb-5 border-b border-ink/10">
                        <div
                          style={{ backgroundColor: `${cluster.color}18`, color: cluster.color }}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs"
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {cluster.clusterSdgs.map((num) => {
                            const sdg = SDGS.find((s) => s.num === num);
                            return (
                              <button
                                key={num}
                                type="button"
                                onClick={() => {
                                  setSelectedSdg(num);
                                  setActiveTab("matrix");
                                }}
                                style={{ backgroundColor: sdg?.color }}
                                title={`${sdg?.code}: ${sdg?.title}`}
                                className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs hover:opacity-90 transition-opacity"
                              >
                                SDG {num}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <h4 className="mt-5 font-display text-2xl font-bold text-ink">
                        {cluster.title}
                      </h4>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/60">
                        {cluster.subtitle}
                      </p>

                      {/* Workstreams */}
                      <div className="mt-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-clay block mb-2">
                          Core Field Initiatives:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cluster.workstreams.map((w) => (
                            <span
                              key={w}
                              className="rounded-full bg-sand/80 dark:bg-card px-2.5 py-1 text-xs font-medium text-ink/80 border border-ink/10"
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="mt-6 border-t border-ink/10 pt-5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 block mb-2.5">
                          Measurable Community Outcomes:
                        </span>
                        <ul className="space-y-2 text-xs leading-relaxed text-ink/75">
                          {cluster.outcomes.map((o) => (
                            <li key={o} className="flex items-start gap-2">
                              <CheckCircle2
                                className="h-3.5 w-3.5 shrink-0 mt-0.5"
                                style={{ color: cluster.color }}
                              />
                              <span>{o}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-ink/10 flex items-baseline justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                        {cluster.metricLabel}
                      </span>
                      <span className="numeral text-2xl font-black" style={{ color: cluster.color }}>
                        {cluster.metric}
                      </span>
                    </div>
                  </div>
                </Rise>
              );
            })}
            </div>
          </div>

        {/* ── Interactive SDG Filter Ribbon ── */}
        <div className="mt-14 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/70">
              Filter Programmes by Global Goal:
            </span>
            {selectedSdg && (
              <button
                type="button"
                onClick={() => setSelectedSdg(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-clay hover:underline self-start sm:self-auto"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filter (Show All 9 Initiatives)</span>
              </button>
            )}
          </div>

          {/* Ribbon Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            <button
              type="button"
              onClick={() => setSelectedSdg(null)}
              className={`rounded-xl p-2.5 text-center transition-all border ${
                selectedSdg === null
                  ? "bg-clay text-primary-foreground border-clay shadow-sm"
                  : "bg-sand/40 border-ink/10 text-ink/80 hover:bg-sand/70"
              }`}
            >
              <span className="block font-black text-sm">ALL</span>
              <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80 mt-0.5">
                9 Initiatives
              </span>
            </button>

            {SDGS.map((sdg) => {
              const isSelected = selectedSdg === sdg.num;
              return (
                <button
                  key={sdg.num}
                  type="button"
                  onClick={() => setSelectedSdg(isSelected ? null : sdg.num)}
                  style={{
                    backgroundColor: isSelected ? sdg.color : undefined,
                    color: isSelected ? "#fff" : undefined,
                    borderColor: isSelected ? sdg.color : undefined,
                  }}
                  className={`group relative rounded-xl p-2.5 text-center transition-all duration-200 border ${
                    isSelected
                      ? "shadow-sm scale-[1.02]"
                      : "bg-sand/30 border-ink/10 text-ink hover:border-ink/25 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span
                      style={{ backgroundColor: sdg.color }}
                      className={`h-2 w-2 rounded-full shrink-0 ${isSelected ? "border border-white" : ""}`}
                    />
                    <span className="font-display font-black text-xs leading-none">
                      SDG {sdg.num}
                    </span>
                  </div>
                  <span className="mt-1 block text-[10px] font-medium leading-tight line-clamp-1 opacity-80">
                    {sdg.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Notice */}
          {activeSdgMeta && (
            <div
              style={{ borderColor: `${activeSdgMeta.color}40`, backgroundColor: activeSdgMeta.lightBg }}
              className="mt-4 rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div
                  style={{ backgroundColor: activeSdgMeta.color }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-white text-base shadow-xs"
                >
                  {activeSdgMeta.num}
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-ink">
                    Showing Initiatives Aligned with {activeSdgMeta.code}: {activeSdgMeta.title}
                  </h4>
                  <p className="text-xs text-ink/75 mt-0.5">
                    {activeSdgMeta.focus}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-ink/60">
                {filteredProgrammes.length} Contributing {filteredProgrammes.length === 1 ? "Program" : "Programs"}
              </span>
            </div>
          )}
        </div>

        {/* ── TAB 1: ALIGNMENT MATRIX (EDITORIAL BROADSHEET) ── */}
        {activeTab === "matrix" && (
          <div className="space-y-4">
            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-sand/30 dark:bg-card/40 p-3 rounded-2xl border border-ink/10">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink/40" />
                <input
                  type="text"
                  placeholder="Search programmes or focus areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-ink/10 bg-background py-1.5 pl-9 pr-3 text-xs text-ink placeholder:text-ink/40 focus:border-clay focus:outline-none"
                />
              </div>

              <div className="text-xs font-medium text-ink/60 self-end sm:self-auto">
                Displaying <span className="font-bold text-ink">{filteredProgrammes.length}</span> of {PROGRAMME_ROWS.length} initiatives
              </div>
            </div>

            {/* Desktop Editorial Table */}
            <div className="hidden lg:block overflow-hidden rounded-3xl border border-ink/10 bg-background shadow-xs">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/60 dark:bg-card/90">
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-ink/70">
                      Programme
                    </th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-ink/70">
                      Focus Area
                    </th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-ink/70">
                      Aligned SDGs
                    </th>
                    <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-ink/70">
                      Grassroots Delivery & Impact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {filteredProgrammes.map((p) => {
                    const Icon = p.icon;
                    return (
                      <tr
                        key={p.slug}
                        className="group hover:bg-sand/25 dark:hover:bg-card/40 transition-colors"
                      >
                        <td className="py-5 px-6 align-top">
                          <div className="flex items-start gap-3.5">
                            <div
                              style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs mt-0.5 transition-transform duration-300 group-hover:scale-105"
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <Link
                                to="/projects/$slug"
                                params={{ slug: p.slug }}
                                className="font-display font-bold text-ink group-hover:text-clay inline-flex items-center gap-1.5 text-base transition-colors"
                              >
                                <span>{p.name}</span>
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition-transform group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </Link>
                              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wider text-clay">
                                {p.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6 align-top font-medium text-ink/80 text-sm max-w-[210px]">
                          {p.focus}
                        </td>

                        <td className="py-5 px-6 align-top">
                          <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                            {p.primarySdgs.map((num) => {
                              const sdg = SDGS.find((s) => s.num === num);
                              if (!sdg) return null;
                              const isHighlight = selectedSdg === num;
                              return (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => setSelectedSdg(num)}
                                  title={`${sdg.code}: ${sdg.title}`}
                                  style={{
                                    backgroundColor: sdg.color,
                                    outline: isHighlight ? "2px solid #000" : undefined,
                                  }}
                                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold text-white shadow-2xs hover:opacity-90 transition-all hover:scale-105"
                                >
                                  <span>SDG {num}</span>
                                </button>
                              );
                            })}
                          </div>
                        </td>

                        <td className="py-5 px-6 align-top text-ink/75 text-sm leading-relaxed max-w-[420px]">
                          {p.howAligns}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards View */}
            <div className="grid gap-4 lg:hidden sm:grid-cols-2">
              {filteredProgrammes.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.slug}
                    className="rounded-3xl border border-ink/10 bg-sand/35 dark:bg-card/60 p-6 shadow-xs flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <div
                          style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-2xs"
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-clay">
                            {p.category}
                          </span>
                          <h4 className="font-display text-lg font-bold text-ink">
                            <Link
                              to="/projects/$slug"
                              params={{ slug: p.slug }}
                              className="hover:text-clay transition-colors inline-flex items-center gap-1"
                            >
                              <span>{p.name}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </h4>
                        </div>
                      </div>

                      <p className="mt-3 text-xs font-semibold text-ink/75">{p.focus}</p>

                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {p.primarySdgs.map((num) => {
                          const sdg = SDGS.find((s) => s.num === num);
                          if (!sdg) return null;
                          return (
                            <span
                              key={num}
                              style={{ backgroundColor: sdg.color }}
                              className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs"
                            >
                              SDG {num}
                            </span>
                          );
                        })}
                      </div>

                      <p className="mt-4 text-xs text-ink/75 leading-relaxed border-t border-ink/10 pt-3">
                        {p.howAligns}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/50 italic px-2">
              <span>Primary SDGs are listed first; cross-cutting goals reflect verified interdisciplinary delivery.</span>
              <span className="font-semibold text-ink/70">Analytical mapping based on ELF field intelligence.</span>
            </div>
          </div>
        )}

        {/* ── TAB 2: 9 CORE GOALS (EDITORIAL DOSSIER) ── */}
        {activeTab === "goals" && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SDGS.map((sdg, i) => (
                <Rise key={sdg.num} delay={i * 0.03}>
                  <div
                    style={{ borderColor: `${sdg.color}35` }}
                    className="h-full rounded-3xl border bg-sand/30 dark:bg-card/60 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* SDG Tile Header */}
                      <div className="flex items-center justify-between gap-3">
                        <div
                          style={{ backgroundColor: sdg.color }}
                          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white font-black text-2xl shadow-sm"
                        >
                          {sdg.num}
                        </div>
                        <span
                          style={{ color: sdg.color }}
                          className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-current"
                        >
                          {sdg.code}
                        </span>
                      </div>

                      <h4 className="mt-4 font-display text-xl sm:text-2xl font-bold text-ink">
                        {sdg.title}
                      </h4>

                      <p className="mt-2.5 text-sm text-ink/75 leading-relaxed">
                        {sdg.focus}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-ink/10 pt-4">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/50 mb-2">
                        Contributing ELF Initiatives:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sdg.programmes.map((prog) => (
                          <Link
                            key={prog.name}
                            to="/projects/$slug"
                            params={{ slug: prog.slug }}
                            className="rounded-full bg-sand/80 dark:bg-card/90 px-3 py-1 text-xs font-medium text-ink/80 border border-ink/10 hover:border-clay hover:text-clay transition-all inline-flex items-center gap-1"
                          >
                            <span>{prog.name}</span>
                            <ArrowUpRight className="h-2.5 w-2.5 opacity-40" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
