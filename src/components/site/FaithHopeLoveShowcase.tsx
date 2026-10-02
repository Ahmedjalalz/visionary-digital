import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Shield,
  GraduationCap,
  Users2,
  HeartHandshake,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Accessibility,
  Eye,
  Cross,
  SunMedium,
  Compass,
} from "lucide-react";
import classroomDesks from "@/assets/official-local/classroom-desks.jpg";
import schoolUniforms from "@/assets/official-local/school-uniforms.jpg";
import schoolStudents from "@/assets/official-local/school-students.jpg";

interface Cohort {
  id: string;
  badge: string;
  title: string;
  stat: string;
  statLabel: string;
  shortDesc: string;
  fullDesc: string;
  keyPoints: string[];
  img: string;
  focal: string;
}

const cohorts: Cohort[] = [
  {
    id: "orphaned-girls",
    badge: "Long-Term Care & Dignity",
    title: "35 Orphaned Girls",
    stat: "35",
    statLabel: "Orphaned Girls in Continuous Care",
    shortDesc:
      "Regular, ongoing support meeting educational and essential life needs so girls can prepare for an independent future.",
    fullDesc:
      "ELF provides regular, ongoing support to 35 orphaned girls, helping meet their educational and essential needs. Our goal is not simply to provide short-term assistance, but to walk alongside these girls as they grow—helping them remain in education, develop confidence, experience care and dignity, and prepare for a safe and independent future.",
    keyPoints: [
      "100% of educational fees, uniforms, and textbooks covered",
      "Nutritional and healthcare monitoring",
      "Safe residential and family-placement oversight",
      "Mentorship and life-skills preparation for adulthood",
    ],
    img: schoolUniforms,
    focal: "object-[50%_25%]",
  },
  {
    id: "single-parent",
    badge: "Preventing School Dropout",
    title: "Students from Single-Parent Families",
    stat: "500+",
    statLabel: "Students Funded in Classrooms",
    shortDesc:
      "Educational assistance ensuring financial hardship alone never forces a child out of the classroom.",
    fullDesc:
      "More than 500 students from single-parent families receive education-related support through different schools. For families already struggling with limited income, the cost of education can become an overwhelming burden. ELF helps vulnerable students remain connected to education so that financial hardship does not determine whether a child has a future.",
    keyPoints: [
      "Direct tuition subsidies across partner schools",
      "Annual stationery, backpacks, and uniform provisions",
      "Household relief preventing child labor dropouts",
      "Regular academic attendance tracking",
    ],
    img: classroomDesks,
    focal: "object-[50%_20%]",
  },
  {
    id: "modern-slavery",
    badge: "Generational Liberation",
    title: "Families Experiencing Modern Slavery",
    stat: "1,000+",
    statLabel: "Children of Kiln Laborers in School",
    shortDesc:
      "Breaking generational debt bondage through classrooms, protection, and community stability.",
    fullDesc:
      "ELF also supports more than 1,000 students whose families remain trapped in conditions of modern slavery and severe economic vulnerability. For these children, education can be more than a classroom—it can be a pathway toward dignity, opportunity, protection, and a future beyond generational poverty and exploitation. Our approach focuses on keeping children connected to education while supporting their families and communities toward greater stability.",
    keyPoints: [
      "Shielding children from dangerous kiln coal and clay molding",
      "Enrolment in recognized daytime and evening schooling",
      "Nutritional hampers for bonded households",
      "Advocacy and legal safeguarding against child coercion",
    ],
    img: schoolStudents,
    focal: "object-[50%_20%]",
  },
  {
    id: "disabilities",
    badge: "God-Given Dignity",
    title: "Children with Disabilities & Special Needs",
    stat: "120",
    statLabel: "Deaf, Blind & Special Needs Children",
    shortDesc:
      "Targeted educational and therapeutic assistance so disability never becomes an excuse for exclusion.",
    fullDesc:
      "ELF provides support to approximately 120 children who are deaf, blind, or living with other special needs and disabilities. We believe every child is created with God-given dignity and value. Disability should never become a reason for exclusion. Through education and targeted assistance, we seek to help children with special needs participate more fully in family, school, church, and community life.",
    keyPoints: [
      "Specialized learning resources for deaf and blind children",
      "Mobility, assistive tools, and healthcare support",
      "Community and church integration workshops",
      "Family counseling overcoming societal stigma",
    ],
    img: "/images/school-bags/DSC09384.JPG",
    focal: "object-[50%_30%]",
  },
];

const pillars = [
  {
    num: "01",
    title: "Protect",
    tagline: "Safety & Child Protection",
    desc: "Helping vulnerable children remain safe from neglect, exploitation, abuse, trafficking, and harmful circumstances.",
    icon: Shield,
    color: "from-blue-600/20 to-blue-900/10",
  },
  {
    num: "02",
    title: "Educate",
    tagline: "Classroom Access",
    desc: "Supporting children to remain in school and access meaningful, continuous educational opportunities.",
    icon: GraduationCap,
    color: "from-amber-600/20 to-amber-900/10",
  },
  {
    num: "03",
    title: "Strengthen Families",
    tagline: "Preventing Separation",
    desc: "Supporting families facing poverty and hardship so that children can remain within safe and caring family environments whenever possible.",
    icon: Users2,
    color: "from-emerald-600/20 to-emerald-900/10",
  },
  {
    num: "04",
    title: "Restore Hope",
    tagline: "Dignity & Christian Compassion",
    desc: "Walking with children and families with compassion, dignity, prayer, and practical support so they can look toward a better future.",
    icon: HeartHandshake,
    color: "from-rose-600/20 to-rose-900/10",
  },
];

export function FaithHopeLoveShowcase() {
  const [activeCohort, setActiveCohort] = useState<string>("orphaned-girls");

  const currentCohort = cohorts.find((c) => c.id === activeCohort) || cohorts[0]!;

  return (
    <div className="space-y-20 sm:space-y-28 my-16 sm:my-24">
      {/* ── 1. MISSION MANIFESTO ── */}
      <section className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white dark:bg-card p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-8 border-b border-ink/10">
          <div className="max-w-3xl">
            <span className="eyebrow text-clay">Christian Values · Child Protection · Orphan Care</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink dark:text-cream">
              Bringing Faith, Hope &amp; Love to Vulnerable Children
            </h2>
            <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-ink/80 dark:text-cream/80">
              Every child deserves to be loved, protected, educated, and given the opportunity to build a hopeful future.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream transition-all hover:bg-clay-deep shadow-xs"
            >
              <span>Sponsor a Child</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-ink/5 bg-sand/40 dark:bg-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-clay">
              <SunMedium className="h-4 w-4" />
              <span>Our Foundational Conviction</span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/75 dark:text-cream/75">
              At Education And Life Foundation (ELF), we believe that children who have lost parental care, live with a single parent, experience extreme poverty, face disability, or remain trapped in cycles of exploitation should never be forgotten.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/5 bg-sand/40 dark:bg-white/5 p-6 sm:p-7">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-clay">
              <Compass className="h-4 w-4" />
              <span>Compassion &amp; Dignity</span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/75 dark:text-cream/75">
              Our commitment is to stand alongside the most vulnerable children and their families by providing education, essential support, protection, care, and opportunities for a better future. Our work is rooted in compassion and Christian values, with a commitment to serve children with dignity, regardless of their circumstances.
            </p>
          </div>
        </div>

        {/* Aggregate Reach Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-ink/10 bg-sand/20 dark:bg-white/5 p-4 sm:p-5 text-center">
            <span className="block font-display text-2xl sm:text-3xl font-black text-ink dark:text-cream">
              35
            </span>
            <span className="mt-1 block text-xs font-semibold text-ink/65 dark:text-cream/65">
              Orphaned Girls in Long-Term Care
            </span>
          </div>
          <div className="rounded-xl border border-ink/10 bg-sand/20 dark:bg-white/5 p-4 sm:p-5 text-center">
            <span className="block font-display text-2xl sm:text-3xl font-black text-ink dark:text-cream">
              500+
            </span>
            <span className="mt-1 block text-xs font-semibold text-ink/65 dark:text-cream/65">
              Single-Parent Students Funded
            </span>
          </div>
          <div className="rounded-xl border border-ink/10 bg-sand/20 dark:bg-white/5 p-4 sm:p-5 text-center">
            <span className="block font-display text-2xl sm:text-3xl font-black text-ink dark:text-cream">
              1,000+
            </span>
            <span className="mt-1 block text-xs font-semibold text-ink/65 dark:text-cream/65">
              Children from Modern Slavery Enrolled
            </span>
          </div>
          <div className="rounded-xl border border-ink/10 bg-sand/20 dark:bg-white/5 p-4 sm:p-5 text-center">
            <span className="block font-display text-2xl sm:text-3xl font-black text-ink dark:text-cream">
              120
            </span>
            <span className="mt-1 block text-xs font-semibold text-ink/65 dark:text-cream/65">
              Children with Disabilities &amp; Special Needs
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. THE FOUR VULNERABLE POPULATIONS WE SERVE ── */}
      <section>
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow text-clay">Standing with Children Who Need Us Most</span>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-ink dark:text-cream">
            The Children We Stand Alongside
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink/70 dark:text-cream/70">
            Poverty and limited resources place children at serious risk of school dropout, exploitation, neglect, or a life without opportunity.
          </p>
        </div>

        {/* Tab selection buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {cohorts.map((cohort) => {
            const isActive = cohort.id === activeCohort;
            return (
              <button
                key={cohort.id}
                type="button"
                onClick={() => setActiveCohort(cohort.id)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-white shadow-md dark:bg-white dark:text-ink"
                    : "border border-ink/15 bg-white/80 text-ink/75 hover:bg-sand/70 dark:border-white/15 dark:bg-card dark:text-cream/75"
                }`}
              >
                {cohort.title}
              </button>
            );
          })}
        </div>

        {/* Selected Cohort Detail Card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-white dark:bg-card shadow-md">
          <div className="grid gap-0 lg:grid-cols-12">
            {/* Visual Photo */}
            <div className="relative min-h-[320px] sm:min-h-[380px] lg:col-span-5 overflow-hidden bg-sand dark:bg-card">
              <img
                src={currentCohort.img}
                alt={currentCohort.title}
                className={`h-full w-full object-cover ${currentCohort.focal} transition-transform duration-700`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink shadow-xs backdrop-blur-md">
                  {currentCohort.badge}
                </span>
              </div>
            </div>

            {/* Narrative & Points */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-clay">
                    {currentCohort.stat}
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink dark:text-cream">
                      {currentCohort.title}
                    </h3>
                    <span className="text-xs text-ink/60 dark:text-cream/60 uppercase tracking-wider">
                      {currentCohort.statLabel}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm sm:text-base leading-relaxed text-ink/80 dark:text-cream/80">
                  {currentCohort.fullDesc}
                </p>

                <div className="mt-6 border-t border-ink/10 pt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ink dark:text-cream">
                    Core Support Actions Provided
                  </h4>
                  <ul className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                    {currentCohort.keyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-ink/75 dark:text-cream/75">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-clay mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-xs text-ink/60 dark:text-cream/60 italic">
                  Walking alongside children through continuous relationship and care.
                </span>
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-clay hover:text-clay-deep transition-colors"
                >
                  <span>Support this cohort</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR ACTION PILLARS: FROM VULNERABILITY TO HOPE ── */}
      <section className="rounded-3xl border border-ink/10 bg-sand/30 dark:bg-white/5 p-6 sm:p-10 lg:p-12">
        <div className="max-w-2xl">
          <span className="eyebrow text-clay">From Vulnerability to Hope</span>
          <h2 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-ink dark:text-cream">
            Our Four Key Action Pillars
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink/70 dark:text-cream/70">
            Our approach goes beyond temporary relief by addressing the root circumstances placing children at risk through education, family support, child protection, and compassionate care.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-white dark:bg-card p-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="numeral text-xs font-bold text-clay">
                      {pillar.num}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 dark:bg-white/10 text-ink dark:text-white transition-colors group-hover:bg-clay group-hover:text-white">
                      <IconComponent className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-ink dark:text-cream">
                    {pillar.title}
                  </h3>
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider text-clay block mt-0.5">
                    {pillar.tagline}
                  </span>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink/75 dark:text-cream/75">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 4. EVERY CHILD MATTERS (PHILOSOPHY & PROMISE) ── */}
      <section className="relative overflow-hidden rounded-3xl border border-ink/15 bg-ink p-8 sm:p-12 lg:p-16 text-cream shadow-xl">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-clay-bright">
            Our Core Vision
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            “Every Child Matters”
          </h2>

          <p className="mt-6 font-serif text-lg sm:text-xl italic leading-relaxed text-cream/90 max-w-2xl mx-auto">
            “A child should not be defined by being an orphan, poverty, disability, family circumstances, or the place where he or she was born. At ELF, we see potential where others may see vulnerability.”
          </p>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-cream/75 max-w-2xl mx-auto">
            When a child receives education, protection, care, encouragement, and an opportunity to develop their God-given abilities, the impact extends far beyond one child. It strengthens families, transforms communities, and helps break cycles of poverty and exploitation.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-clay-bright">
                Transformation
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                Protected rather than exploited
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-clay-bright">
                Opportunity
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                Educated rather than excluded
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-clay-bright">
                Family &amp; Care
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                Supported rather than abandoned
              </span>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-clay-bright">
                Future
              </span>
              <span className="mt-1 block text-sm font-semibold text-white">
                Empowered rather than trapped
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-clay-bright px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all hover:bg-white shadow-lg"
            >
              <span>Support This Initiative</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-white/20 transition-all"
            >
              <span>Partner With ELF</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
