import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Baby,
  Calculator,
  Droplets,
  FileSpreadsheet,
  HeartPulse,
  Music,
  Pill,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Counter, MaskLines, ParallaxImage, Rise } from "@/components/site/motion-primitives";
import { ProvincialEducationCensus } from "@/components/site/ProvincialEducationCensus";
import { BagTracker } from "@/components/site/BagTracker";
import { SchoolBagContentsSection } from "@/components/site/SchoolBagContentsSection";
import { SchoolBagShortcut } from "@/components/site/SchoolBagShortcut";
import { WidowsProjectShowcase } from "@/components/site/WidowsProjectShowcase";
import { WidowsHeroCarousel } from "@/components/site/WidowsHeroCarousel";
import { MusicalInstrumentsGallery } from "@/components/site/MusicalInstrumentsGallery";
import { SkillsDevelopmentShowcase } from "@/components/site/SkillsDevelopmentShowcase";
import { FaithHopeLoveShowcase } from "@/components/site/FaithHopeLoveShowcase";
import { EducationCrisisBadge } from "@/components/site/EducationCrisisBadge";
import { SponsoredSchoolsShowcase } from "@/components/site/SponsoredSchoolsShowcase";
import { TOTAL_SPONSORED_SCHOOLS, TOTAL_SPONSORED_STUDENTS } from "@/data/sponsoredSchoolsData";
import { foundationMedia } from "@/data/foundationMedia";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const childCareAliases = [
      "faith-hope-love",
      "faith-hope-and-love",
      "orphan-care",
      "child-protection",
      "faith-hope-love-for-every-child-project",
      "every-child",
    ];
    if (childCareAliases.includes(params.slug)) {
      throw redirect({
        to: "/projects/$slug",
        params: { slug: "faith-hope-love-for-every-child" },
      });
    }

    const healthWashAliases = [
      "health-care-program",
      "wash-improvement",
      "pregnancy-support",
      "pregnancy-support-pakistan",
      "pregnancy-support-program",
    ];
    if (healthWashAliases.includes(params.slug)) {
      throw redirect({ to: "/projects/$slug", params: { slug: "health-wash-community-wellbeing" } });
    }
    const schoolBagAliases = [
      "school-bag-distribution",
      "school-bags-distribution",
      "school-bag-distribution-program",
      "school-bags-distribution-program",
      "school-bag",
      "schoolbag",
      "schoolbags",
    ];
    if (schoolBagAliases.includes(params.slug)) {
      throw redirect({ to: "/projects/$slug", params: { slug: "school-bags" } });
    }
    const widowsAliases = [
      "widows-welfare",
      "widows-welfare-program",
      "hope-and-freedom",
      "hope-and-freedom-for-widows-headed-families-project",
      "widows-program",
    ];
    if (widowsAliases.includes(params.slug)) {
      throw redirect({
        to: "/projects/$slug",
        params: { slug: "hope-and-freedom-for-widows-headed-families" },
      });
    }
    const skillsAliases = [
      "community-digital-skills",
      "skill-development",
      "skills-development",
      "skills-developement",
      "community-digital-skills-development",
      "community-and-digital-skills-developments",
      "comminity-and-digital-skills-developments",
      "comminity-digital-skills-developments",
      "community-digital-skills-developments",
    ];
    if (skillsAliases.includes(params.slug)) {
      throw redirect({
        to: "/projects/$slug",
        params: { slug: "community-skills-development" },
      });
    }
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  notFoundComponent: () => (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <span className="eyebrow text-clay">Programme Directory</span>
      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-ink">
        Project Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink/70">
        The requested programme could not be found or may have been relocated.
      </p>
      <Link
        to="/projects"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-clay px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-all hover:bg-clay-deep shadow-xs"
      >
        View All Programmes
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — ELF" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const title = `${project.name} — Education and Life Foundation`;
    return {
      meta: [
        { title },
        { name: "description", content: project.short },
        { property: "og:title", content: title },
        { property: "og:description", content: project.short },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(project.image.startsWith("https://")
          ? [
              { property: "og:image", content: project.image },
              { name: "twitter:image", content: project.image },
            ]
          : []),
      ],
    };
  },
  component: ProjectPage,
});

const midwiferyPhotoDetails: { title: string; desc: string; position?: string }[] = [
  {
    title: "Graduating Midwife Cohort",
    desc: "A proud cohort of community midwifery students and their faculty instructors standing together at the training center.",
    position: "object-[center_20%]",
  },
  {
    title: "Classroom Clinical Theory",
    desc: "A full lecture hall of student midwives studying maternal health curriculum, antenatal screening, and safe delivery protocols.",
    position: "object-[center_35%]",
  },
  {
    title: "Obstetric Simulation Skills Lab",
    desc: "Hands-on delivery practicals using anatomical pelvic models and hospital ward equipment under instructor guidance.",
    position: "object-[center_30%]",
  },
  {
    title: "Sterile Delivery Tools & Instruments",
    desc: "Master obstetric trainer walking students through aseptic setup, sterilization protocols, surgical clamps, and delivery trays.",
    position: "object-[center_25%]",
  },
  {
    title: "Neonatal & Infant Ward Practical",
    desc: "Trainee practicing essential newborn care, temperature regulation, and vital checks in the clinical nursery bassinets.",
    position: "object-[center_30%]",
  },
  {
    title: "Certified Midwifery Graduates",
    desc: "Trainees proudly presenting their official Community Midwifery Training Center certificates of completion.",
    position: "object-[center_20%]",
  },
  {
    title: "Community Assembly & Dedication",
    desc: "Trainees, faculty, and community elders gathered together in prayer and dedication at the training center hall.",
    position: "object-[center_35%]",
  },
  {
    title: "Training Center Milestone",
    desc: "Graduating midwives assembled before the official digital certification ceremony at the training center.",
    position: "object-[center_20%]",
  },
];

const schoolBagsPhotoDetails = [
  {
    title: "Active Classroom Reading & Instruction",
    desc: "Over twenty primary pupils engaged with open textbooks and learning kits as their teacher conducts morning reading in the central aisle.",
  },
  {
    title: "Full-Classroom Literacy Session",
    desc: "A packed classroom of students studying side by side, fully equipped with School in A bag stationery and learning supplies.",
  },
  {
    title: "Classroom Milestone & Distribution",
    desc: "Students seated with their teacher as dedicated School in A bag backpacks are delivered and lined up for daily coursework.",
  },
  {
    title: "Blackboard Instruction & Guided Study",
    desc: "Subject instructor teaching at the blackboard while secondary students follow along in workbooks with their learning packs.",
  },
  {
    title: "Courtyard Handover (Bags 190938–190943)",
    desc: "Primary school children assembled in the school courtyard with their serialized backpacks, lunchboxes, and water bottles.",
  },
  {
    title: "Early Childhood Learners (Bags 191751–191755)",
    desc: "Youngest kindergarten and nursery students equipped with essential starter kits to support early learning foundations.",
  },
  {
    title: "Girls Secondary Retention (Bags 191676–191679)",
    desc: "Empowering older female students with complete academic sets to encourage secondary retention and graduation.",
  },
  {
    title: "Secondary Student Cohort (Bags 191321–191326)",
    desc: "Equipping young men and women across vulnerable communities with essential supplies for continuous academic progress.",
  },
];

const capacityBuildingPhotoDetails = [
  {
    title: "Financial Literacy & Consultation",
    desc: "National Financial Literacy Program (NFLP) session with Sindh Bank covering transparent bookkeeping, banking, and budgeting.",
  },
  {
    title: "Women's Leadership & Governance",
    desc: "Senior community executive mentoring local female leaders and administrators on civic participation and institutional stewardship.",
  },
  {
    title: "Grassroots Community Council",
    desc: "Outdoor village leadership consultation bringing local elders and women together to deliberate community development priorities.",
  },
  {
    title: "Female Leadership & Advocacy",
    desc: "Dedicated workshop hall empowering community women with organizational, advocacy, and vocational leadership skills.",
  },
  {
    title: "Interactive Classroom Training",
    desc: "Youth and prospective community leaders engaged in structured curriculum studies, textbooks, and interactive lectures.",
  },
  {
    title: "Institutional Planning Workshop",
    desc: "Facilitator leading whiteboard sessions on program management, project implementation, and milestone tracking.",
  },
  {
    title: "Participatory Village Dialogue",
    desc: "Grassroots community gathering under open skies fostering cooperative problem-solving and collective community ownership.",
  },
  {
    title: "Collaborative Workshop Session",
    desc: "Community women actively participating in roundtable discussions, sharing ground realities and collaborative solutions.",
  },
];

const orphanCarePhotoDetails = [
  {
    title: "Special Needs Dignity & Affirmation",
    desc: "Empowering children with developmental conditions through compassionate, individualized care, emotional warmth, and acceptance.",
  },
  {
    title: "Protecting the Most Vulnerable",
    desc: "Close-up portrait of a child from an underserved rural community where ELF provides safety, nutrition, and child protection.",
  },
  {
    title: "Specialized Pediatric & Strabismus Care",
    desc: "Infant and toddler health interventions supporting children with congenital eye, facial, and pediatric medical challenges.",
  },
  {
    title: "Inclusive Childhood & Community Fellowship",
    desc: "Children with speech, hearing, and cognitive differences thriving alongside their peers without stigma or isolation.",
  },
  {
    title: "Mobility Assistance & Maternal Support",
    desc: "Walking alongside children with lower limb and physical impairments, partnering with families for long-term therapeutic care.",
  },
  {
    title: "Overcoming Rickets & Mobility Barriers",
    desc: "Equipping children with mobility impairments with educational tools and orthopedic pathways so school is always accessible.",
  },
  {
    title: "Adaptive Learning for Sensory Impairments",
    desc: "Ensuring children with vision and sensory loss receive dedicated learning materials, school supplies, and dignity.",
  },
  {
    title: "Deaf & Audiological Care Outreach",
    desc: "Grassroots identification and compassionate support for children with audiological and ear conditions in impoverished villages.",
  },
];

const musicPhotoDetails = [
  {
    title: "Harmonium & Vocal Performance",
    desc: "Master harmonium player and vocalists leading live classical hymns and melodies at community gathering.",
  },
  {
    title: "Carved Dholak Acoustic Rhythm",
    desc: "Traditional percussionist performing on carved wooden dholak, grounding students in indigenous musical rhythm.",
  },
  {
    title: "Acoustic Guitar Repertoire",
    desc: "Youth musician playing Yamaha acoustic guitar, bringing contemporary acoustic instrumentation to community sessions.",
  },
  {
    title: "Arts & Joy: Students Celebrating",
    desc: "Underprivileged students raising their hands in joyful song, demonstrating the transformative emotional power of music.",
  },
  {
    title: "Unified School Assembly Choir",
    desc: "Students in uniform singing together in morning assembly, building confidence, focus, and community cohesion.",
  },
  {
    title: "Opus 1 Collaborative Spirit",
    desc: "Children celebrating the introduction of daily music and arts instruction into their school experience.",
  },
];

const communitySkillsPhotoDetails = [
  {
    title: "Vocational Sewing Workshop",
    desc: "Students operating industrial sewing machines under expert craftswomen in community centers.",
  },
  {
    title: "Master Pattern & Seam Precision",
    desc: "Apprentices learning precision garment cutting and seam construction to meet commercial standards.",
  },
  {
    title: "Artisanal Tailoring Guidance",
    desc: "Master instructor guiding trainees through intricate finishing techniques on traditional garments.",
  },
  {
    title: "Community Vocational Center",
    desc: "Safe, dignified classroom equipping underprivileged mothers with accredited technical trades.",
  },
  {
    title: "Garment Finishing & Assembly",
    desc: "From bulk fabric rolls to custom-tailored apparel ready for local retail sales and school orders.",
  },
  {
    title: "Industrial Machine Handover",
    desc: "Distributing free heavy-duty sewing machines to certified graduates for home micro-enterprise.",
  },
  {
    title: "Heavy-Duty Equipment Distribution",
    desc: "Empowering mothers with lifelong production assets to achieve permanent household food security.",
  },
  {
    title: "Pattern Measurement & Drafting",
    desc: "Foundational drafting and pattern cutting fundamentals taught by certified master trainers.",
  },
];

const digitalSkillsPhotoDetails = [
  {
    title: "Certified IT Graduates",
    desc: "Graduates proudly displaying government and foundation accredited computer literacy certificates.",
  },
  {
    title: "IT Computer Lab Workspace",
    desc: "Modern computer laboratory equipped with individual monitor workstations and high-speed connectivity.",
  },
  {
    title: "Practical Software Training",
    desc: "Students actively practicing office productivity suites, data entry, and digital design tools.",
  },
  {
    title: "Skills Evaluation & Practical Test",
    desc: "Comprehensive testing ensuring students meet professional standards for administrative and clerical duties.",
  },
  {
    title: "Diploma & Achievement Ceremony",
    desc: "Honoring outstanding students transitioning toward remote freelancing and IT career opportunities.",
  },
  {
    title: "Faculty Mentorship & Guidance",
    desc: "Instructors providing individual keyboard and software mechanics coaching to beginners.",
  },
  {
    title: "Classroom Digital Workstations",
    desc: "Dedicated computing hubs giving underprivileged youth equal access to modern technological tools.",
  },
  {
    title: "Modern Tech Education",
    desc: "Bridging the digital divide with structured technology education for disadvantaged youth and women.",
  },
];

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const isEducation = project.slug === "education-for-all";
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 4);
  const accentClass = project.accent === "moss" ? "text-moss" : "text-clay";

  const splitHero = ["portrait", "data", "map", "object"].includes(project.layout);
  const centeredHero = project.layout === "map" || project.layout === "object";

  return (
    <article className="bg-background">
      {project.slug === "school-bags" && (
        <aside
          aria-label="Implementing Partnership Announcement"
          className="border-b border-ink/10 bg-sand/65 dark:bg-card/75 py-4 sm:py-5 px-5 sm:px-8"
        >
          <div className="mx-auto max-w-[1600px] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-clay/20 bg-background/80 dark:bg-background/90 p-2 shadow-xs">
                <img
                  src="/school-in-a-bag-logo-red.png"
                  alt="School in A bag"
                  className="h-full w-full object-contain drop-shadow-xs"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-flex items-center rounded-full bg-clay/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-clay">
                    On-Ground Implementing Partner
                  </span>
                  <span className="text-[0.65rem] text-ink/40 hidden sm:inline">•</span>
                  <span className="text-[0.68rem] font-medium text-ink/60 hidden sm:inline">
                    UK Registered Charity No. 1186311
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-ink/80 max-w-4xl">
                  <span className="font-semibold text-ink">School in A bag</span> is a charity registered in England and Wales that delivers rucksacks filled with stationery, learning resources, eating utensils and a hygiene kit to disadvantaged, disaster-affected and displaced children globally. <span className="font-semibold text-ink">Education and Life Foundation</span> is the on ground project implementing partner of School in A bag organization.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
              <a
                href="#bag-contents"
                className="inline-flex items-center gap-1.5 rounded-full border border-clay/30 bg-background/80 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:border-clay hover:text-clay transition-all"
              >
                <span>Bag Contents</span>
              </a>
              <a
                href="#bag-tracker"
                className="inline-flex items-center gap-2 rounded-full border border-clay/40 bg-clay/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-clay hover:bg-clay hover:text-cream transition-all"
              >
                <span>Track A Bag</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>
      )}
      {project.slug === "hope-and-freedom-for-widows-headed-families" ? (
        <section className="relative overflow-hidden bg-sand/35 pt-12 pb-10 sm:pt-16 sm:pb-16 border-b border-ink/10">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-clay">
                <span>Initiative Portfolio · Widows Welfare</span>
              </div>
              <h1 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
                {project.name}
              </h1>
              <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-ink/75">
                {project.short}
              </p>
            </div>
          </div>

          {/* Centerpiece auto-switching hero carousel */}
          <div className="mt-6 sm:mt-10">
            <WidowsHeroCarousel />
          </div>
        </section>
      ) : (
        <section className={`relative overflow-hidden ${splitHero ? "grid min-h-[72svh] lg:grid-cols-2" : "flex min-h-[68svh] sm:min-h-[76svh] flex-col justify-end"}`}>
          <ParallaxImage
            src={project.image}
            alt={project.name}
            className={splitHero ? "relative min-h-[48svh] lg:order-2 lg:min-h-[72svh]" : "absolute inset-0"}
            imgClassName={project.slug === "education-for-all" ? "object-top" : project.heroPosition}
            strength={project.slug === "education-for-all" ? 15 : 60}
            scaleFrom={project.slug === "education-for-all" ? 1.02 : 1.12}
            priority
          />
          {!splitHero && <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/50 to-ink/20" />}

          <div className={`relative z-10 flex flex-col justify-end px-5 py-12 sm:px-8 sm:py-16 ${splitHero ? "bg-sand lg:order-1 lg:px-[8vw]" : "mx-auto w-full max-w-[1600px]"}`}>
            <div className={centeredHero ? "max-w-4xl" : "max-w-3xl"}>
              {(project.slug === "school-bags" || project.slug === "education-for-all") && (
                <div className="mb-5 sm:mb-6">
                  <EducationCrisisBadge />
                </div>
              )}
              <span className={`eyebrow font-bold ${splitHero ? "text-clay" : "!text-clay-bright drop-shadow-xs"}`}>Initiative Portfolio</span>
              <h1
                className={`mt-4 font-display font-bold leading-[1.02] ${splitHero ? "text-ink" : "!text-cream drop-shadow-md"} ${
                  project.name.length > 34
                    ? "text-[clamp(1.9rem,5vw,5.2rem)]"
                    : "text-[clamp(2.1rem,6vw,6.4rem)]"
                }`}
              >
                {project.name}
              </h1>
              <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${splitHero ? "text-ink/68" : "!text-cream/90 drop-shadow-xs"}`}>{project.short}</p>
              {project.slug === "education-for-all" && (
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#sponsored-schools"
                    className="inline-flex items-center gap-2 rounded-full border border-clay bg-clay px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream shadow-xs transition-all hover:bg-clay/90 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>View {TOTAL_SPONSORED_SCHOOLS} Sponsored Schools</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="text-xs font-bold uppercase tracking-wider text-clay">
                    {TOTAL_SPONSORED_STUDENTS.toLocaleString()} Students Enrolled
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── the problem, huge ── */}
      <section className="border-b border-ink/10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          {project.problemImage ? (
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className={`order-2 lg:order-1 ${isEducation ? "lg:col-span-4" : "lg:col-span-5"}`}>
                {project.slug === "music-of-the-heart" && (
                  <div className="mb-5 sm:mb-6">
                    <EducationCrisisBadge />
                  </div>
                )}
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-ink/10 bg-sand/30 shadow-md">
                  <picture className="contents">
                    {project.problemImage.startsWith("/") && (
                      <source srcSet={project.problemImage.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                    )}
                    <img
                      src={project.problemImage}
                      alt={`${project.name} problem context`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>

              <div className={`order-1 lg:order-2 ${isEducation ? "lg:col-span-8" : "lg:col-span-7"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">The problem</span>
                  {isEducation && (
                    <span className="animate-pulse-aggressive inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-red-500/35 bg-red-500/10 px-3.5 sm:px-4 py-1 text-xs font-bold uppercase tracking-wider text-red-600 shadow-xs dark:border-red-400/40 dark:bg-red-500/15 dark:text-red-400">
                      <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
                        <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-600 dark:bg-red-400" />
                      </span>
                      <span>Education Crisis in Pakistan</span>
                    </span>
                  )}
                </div>
                <div className={`mt-8 flex flex-wrap items-baseline ${isEducation ? "gap-x-4 sm:gap-x-8 gap-y-2" : "gap-x-4 sm:gap-x-6 gap-y-2"}`}>
                  <span
                    className={
                      isEducation
                        ? `numeral text-[clamp(3.2rem,14vw,14rem)] leading-[0.85] font-black tracking-tighter break-words ${accentClass}`
                        : `numeral text-[clamp(2.5rem,12vw,6.5rem)] leading-[0.85] sm:text-[8vw] lg:text-[5.5vw] xl:text-[5rem] break-words ${accentClass}`
                    }
                  >
                    {!isNaN(Number(project.problem.figure.replace(/,/g, ""))) ? (
                      <Counter
                        to={Number(project.problem.figure.replace(/,/g, ""))}
                        decimals={project.problem.figure.includes(".") ? 1 : 0}
                        duration={1600}
                      />
                    ) : (
                      project.problem.figure
                    )}
                  </span>
                  <span
                    className={
                      isEducation
                        ? "numeral text-[clamp(1.6rem,6.5vw,6rem)] uppercase font-black tracking-tight leading-none text-ink break-words"
                        : "numeral text-[clamp(1.3rem,5.5vw,2.5rem)] uppercase leading-none text-ink sm:text-[3.4vw] lg:text-[2.5vw] xl:text-[2.2rem] break-words"
                    }
                  >
                    {project.problem.unit}
                  </span>
                </div>
                <p
                  className={
                    isEducation
                      ? "mt-7 max-w-[20ch] font-display text-3xl font-bold leading-[1.08] text-ink sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight"
                      : "mt-6 max-w-[24ch] font-display text-2xl font-bold leading-[1.1] text-ink sm:text-4xl"
                  }
                >
                  {project.problem.line}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/45">
                  Source: {project.problem.source} — figures pending final ELF verification
                </p>

                <div className="mt-8 space-y-4">
                  {project.context.map((para, i) => (
                    <p key={i} className="lede max-w-xl">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <span className="eyebrow">The problem</span>
              <div className={`mt-8 flex flex-wrap items-baseline ${isEducation ? "gap-x-4 sm:gap-x-8 gap-y-2" : "gap-x-4 sm:gap-x-6 gap-y-2"}`}>
                <span
                  className={
                    isEducation
                      ? `numeral text-[clamp(3.2rem,14vw,14rem)] leading-[0.85] font-black tracking-tighter break-words ${accentClass}`
                      : `numeral text-[clamp(2.5rem,12vw,6.5rem)] leading-[0.85] sm:text-[8vw] break-words ${accentClass}`
                  }
                >
                  {!isNaN(Number(project.problem.figure.replace(/,/g, ""))) ? (
                    <Counter
                      to={Number(project.problem.figure.replace(/,/g, ""))}
                      decimals={project.problem.figure.includes(".") ? 1 : 0}
                      duration={1600}
                    />
                  ) : (
                    project.problem.figure
                  )}
                </span>
                <span
                  className={
                    isEducation
                      ? "numeral text-[clamp(1.6rem,6.5vw,6rem)] uppercase font-black tracking-tight leading-none text-ink break-words"
                      : "numeral text-[clamp(1.3rem,5.5vw,3rem)] uppercase leading-none text-ink sm:text-[3.4vw] break-words"
                  }
                >
                  {project.problem.unit}
                </span>
              </div>
              <p
                className={
                  isEducation
                    ? "mt-7 max-w-[20ch] font-display text-3xl font-bold leading-[1.08] text-ink sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight"
                    : "mt-6 max-w-[24ch] font-display text-2xl font-bold leading-[1.1] text-ink sm:text-4xl"
                }
              >
                {project.problem.line}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/45">
                Source: {project.problem.source} — figures pending final ELF verification
              </p>

              <div className="mt-12 grid gap-6 md:grid-cols-12">
                {project.context.map((para, i) => (
                  <p
                    key={i}
                    className={`lede ${i === 0 ? "md:col-span-6" : "md:col-span-5 md:col-start-8"}`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Provincial Education Census Broadsheet for education initiatives ── */}
      {(project.slug === "school-bags" || project.slug === "education-for-all") && (
        <ProvincialEducationCensus showHeadline={project.slug !== "education-for-all"} />
      )}

      {/* ── response section ── */}
      {project.responseImage ? (
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="display-md text-ink">Our response.</h2>
              <div className="mt-8 space-y-6">
                {project.response.map((r, i) => (
                  <p key={i} className="text-base sm:text-lg leading-relaxed text-ink/75">
                    {r}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-ink/10 bg-sand/30 shadow-md">
                <picture className="contents">
                  {project.responseImage.startsWith("/") && (
                    <source srcSet={project.responseImage.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                  )}
                  <img
                    src={project.responseImage}
                    alt={`${project.name} response in action`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>
      ) : project.layout === "horizontal" ? (
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none select-none whitespace-nowrap font-display text-[10vw] font-extrabold leading-none text-clay/[0.06]"
          >
            <span className="inline-block marquee-track">
              {`${project.name.toUpperCase()} · `.repeat(6)}
            </span>
          </div>
          <div className="mx-auto mt-12 max-w-[1600px] px-5 sm:px-8">
            <h2 className="display-md max-w-[16ch] text-ink">What ELF does about it.</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {project.response.map((r, i) => (
                <Rise key={i} delay={i * 0.08}>
                  <p className="text-base sm:text-lg leading-relaxed text-ink/75">{r}</p>
                </Rise>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="paper py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
            <h2 className="display-md lg:col-span-5">Our response.</h2>
            <div className="space-y-6 lg:col-span-6 lg:col-start-7">
              {project.response.map((r, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed text-ink/75">
                  {r}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── outcomes strip ── */}
      <section className="border-y border-ink/10 bg-sand px-5 py-12 sm:px-8 sm:py-14">
        <div className={`mx-auto grid max-w-[1600px] gap-8 ${project.outcomes.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
          {project.outcomes.map((o) => {
            const inner = (
              <>
                <div className="flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-ink/45">
                  <span>{o.label}</span>
                  {o.href && (
                    <span className="inline-flex items-center text-clay font-bold group-hover:translate-y-0.5 transition-transform">
                      ↓
                    </span>
                  )}
                </div>
                <div className={`mt-2 font-display text-2xl sm:text-3xl font-bold transition-colors ${o.href ? "text-ink group-hover:text-clay" : "text-ink"}`}>
                  {o.value}
                </div>
              </>
            );

            if (o.href) {
              return (
                <a
                  key={o.label}
                  href={o.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = o.href!.replace(/^#/, "");
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group block cursor-pointer rounded-xl -m-2 p-2 transition-colors hover:bg-ink/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-clay"
                  title={`Jump to ${o.label} section`}
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={o.label}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">From the field</span>
              <h2 className="display-md mt-4 max-w-[16ch] text-ink">The work, as it happens.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink/55">
              Photographs from Education and Life Foundation programmes and the communities they serve.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-12">
            {project.gallery.map((image, index) => {
              const total = project.gallery.length;
              let spanClass = "sm:col-span-4 aspect-[4/3]";
              if (total === 8) {
                spanClass = index < 2 ? "sm:col-span-6 aspect-[16/10]" : "sm:col-span-4 aspect-[4/3]";
              } else if (total === 4) {
                spanClass = "sm:col-span-6 aspect-[16/10]";
              } else if (total === 5) {
                spanClass = index < 2 ? "sm:col-span-6 aspect-[16/10]" : "sm:col-span-4 aspect-[4/3]";
              } else if (total === 3 || total === 6) {
                spanClass = "sm:col-span-4 aspect-[4/3]";
              } else if (total === 2) {
                spanClass = "sm:col-span-6 aspect-[16/10]";
              }

              const imagePosition =
                project.slug === "midwifery-program" && midwiferyPhotoDetails[index]?.position
                  ? midwiferyPhotoDetails[index].position
                  : index === 0
                  ? project.heroPosition
                  : "object-[center_12%]";

              const webpVersion = image.startsWith("/") ? image.replace(/\.(jpe?g|png)$/i, ".webp") : null;

              return (
                <figure key={image} className={`group relative overflow-hidden rounded-xl border border-ink/10 bg-muted shadow-2xs ${spanClass}`}>
                  <picture className="contents">
                    {webpVersion && webpVersion !== image && (
                      <source srcSet={webpVersion} type="image/webp" />
                    )}
                    <img
                      src={image}
                      alt={`${project.name} field work ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover ${imagePosition} transition-transform duration-700 group-hover:scale-[1.035]`}
                    />
                  </picture>
                  {project.slug === "midwifery-program" && midwiferyPhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · Field Dispatch
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {midwiferyPhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {midwiferyPhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                  {project.slug === "school-bags" && schoolBagsPhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · Field Dispatch
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {schoolBagsPhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {schoolBagsPhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                  {project.slug === "capacity-building" && capacityBuildingPhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · Field Dispatch
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {capacityBuildingPhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {capacityBuildingPhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                  {project.slug === "faith-hope-love-for-every-child" && orphanCarePhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · Field Dispatch
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {orphanCarePhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {orphanCarePhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                  {project.slug === "music-of-the-heart" && musicPhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · Field Dispatch
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {musicPhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {musicPhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                  {project.slug === "community-skills-development" && communitySkillsPhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · Vocational Center
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {communitySkillsPhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {communitySkillsPhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                  {project.slug === "digital-skills-development" && digitalSkillsPhotoDetails[index] && (
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/35 to-transparent p-5 text-cream opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay-bright">
                        {String(index + 1).padStart(2, "0")} · IT Academy
                      </span>
                      <h4 className="mt-1 font-display text-base font-bold text-cream">
                        {digitalSkillsPhotoDetails[index].title}
                      </h4>
                      <p className="mt-1 text-xs text-cream/80 leading-relaxed line-clamp-2">
                        {digitalSkillsPhotoDetails[index].desc}
                      </p>
                    </div>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── project-specific experience ── */}
      {project.slug === "music-of-the-heart" && (
        <>
          <section className="relative overflow-hidden bg-sand px-5 py-20 sm:px-8 sm:py-28 border-y border-ink/10">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                  <Music className="h-4 w-4" />
                  Global Strategic Partnership
                </div>
                <h2 className="display-md mt-5 text-ink">
                  In Partnership with Opus 1 Foundation
                </h2>
                <p className="mt-4 font-serif text-xl sm:text-2xl text-ink/80 italic leading-relaxed">
                  “Every child deserves the chance to hold an instrument, discover their voice, and experience the transformative dignity of orchestral music.”
                </p>
                <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-ink/75">
                  <p>
                    <strong>Opus 1 Foundation</strong> and <strong>Education And Life Foundation</strong> have partnered to bring classical string training — violins, cellos, and orchestral ensembles — directly into community classrooms across Lahore, Islamabad, and Karachi.
                  </p>
                  <p>
                    Advised by <strong>Dr. Jonathan Addleton</strong> (former U.S. Ambassador and former Rector of Forman Christian College) and backed by instrument pledges from the <strong>Mason Community Arts Academy</strong> at George Mason University, this initiative breaks socioeconomic boundaries through the power of classical repertoire.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
                  <div className="rounded-xl bg-background p-4 border border-ink/10 shadow-xs">
                    <div className="font-display text-3xl font-black text-clay">+78%</div>
                    <div className="mt-1 text-xs text-ink/65 uppercase tracking-wider font-semibold">School Attendance Rate</div>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-ink/10 shadow-xs">
                    <div className="font-display text-3xl font-black text-clay">53,000</div>
                    <div className="mt-1 text-xs text-ink/65 uppercase tracking-wider font-semibold">Children Scale Target</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://opus1foundation.org/music-of-the-heart/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-clay hover:text-ink transition-colors"
                  >
                    <span>Visit Opus 1 Initiative</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Opus 1 Visual Showcase */}
              <div className="grid grid-cols-2 gap-4 lg:col-span-6">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl border border-ink/10 aspect-[4/5] bg-ink/10 shadow-xs">
                    <img
                      src="/images/music/music-harmonium-performance.jpg"
                      alt="Harmonium and vocal performance in community music program"
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-ink/10 aspect-[4/3] bg-ink/10 shadow-xs">
                    <img
                      src="/images/music/music-dholak-percussion.jpg"
                      alt="Live dholak percussionist playing carved acoustic instrument"
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-xl border border-ink/10 aspect-[4/3] bg-ink/10 shadow-xs">
                    <img
                      src="/images/music/music-acoustic-guitar.jpg"
                      alt="Acoustic guitarist performing during community event"
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-ink/10 aspect-[4/5] bg-ink/10 shadow-xs">
                    <img
                      src="/images/music/music-children-joy.jpg"
                      alt="School children celebrating with song and hands raised in joy"
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_25%] transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <MusicalInstrumentsGallery />
      </>
      )}

      {project.slug === "education-for-all" && (
        <SponsoredSchoolsShowcase />
      )}

      {project.slug === "school-bags" && (
        <>
          <SchoolBagContentsSection />
          <section id="bag-tracker" className="relative overflow-hidden px-5 py-28 sm:px-8">
            <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2">
              <div>
                <span className="eyebrow">Sponsors</span>
                <h2 className="display-md mt-4 max-w-[15ch] text-ink">
                  Follow your bag all the way to a name.
                </h2>
                <p className="lede mt-6">
                  Every bag is tagged when it is packed and updated at each hand-off. If you sponsored one,
                  your receipt carries the ID.
                </p>
              </div>
              <BagTracker />
            </div>
          </section>
          <SchoolBagShortcut />
        </>
      )}

      {project.slug === "health-wash-community-wellbeing" && (
        <>
          {/* ── dedicated pregnant women support section ── */}
          <section id="pregnant-women-support" className="scroll-mt-24 border-y border-ink/10 bg-sand/30 px-5 py-24 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1600px]">
              {/* Eyebrow & Headline */}
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                  <Baby className="h-4 w-4" />
                  Dedicated Initiative · Safe Motherhood & Maternal Dignity
                </div>
                <h2 className="display-md mt-5 text-ink">
                  Pregnant Women Support: Saving Mothers & Newborns
                </h2>
                <p className="lede mt-5 text-ink/75">
                  In rural Pakistan and displaced communities where hospitals are hours away, pregnancy carries immense danger. Education And Life Foundation deploys certified Lady Health Visitors, clinical antenatal diagnostics, life-saving micronutrients, and safe birth delivery kits to ensure no mother faces childbirth in isolation.
                </p>
              </div>

              {/* The Problem Statement with the BIG NUMBER */}
              <div className="mt-14 rounded-2xl border border-clay/25 bg-background p-8 sm:p-12 shadow-xs">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-5">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                      Maternal Health Emergency
                    </span>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-4">
                      <span className="numeral text-[clamp(3rem,15vw,7.5rem)] leading-[0.78] font-bold text-clay">
                        <Counter to={27} duration={1400} />
                      </span>
                      <span className="font-display text-2xl sm:text-3xl font-bold uppercase leading-tight text-ink">
                        Mothers Every Day
                      </span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-ink/50">
                      Source: WHO, UNICEF & UNFPA Maternal Mortality Global Estimates
                    </p>
                  </div>
                  <div className="lg:col-span-7 lg:border-l lg:border-ink/10 lg:pl-10">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-ink">
                      27 mothers and 675 newborns lose their lives every single day in Pakistan to preventable pregnancy and childbirth complications.
                    </h3>
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink/75">
                      That is <strong>one mother dying every 50 minutes</strong> — claiming over <strong>11,000 women each year</strong>. In remote districts and informal settlements, maternal mortality reaches twice the urban rate because expectant mothers lack basic antenatal screening, iron supplements to fight chronic anaemia, and emergency obstetric care.
                    </p>
                  </div>
                </div>

                {/* 4 Supporting Research Metric Cards */}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-ink/10 pt-8">
                  <div className="p-5 rounded-xl bg-sand/60 border border-ink/10 shadow-2xs">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      <Counter to={11000} duration={1600} />
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Annual Maternal Deaths</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Pakistan accounts for over 4.1% of the entire global burden of maternal mortality (WHO).
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-sand/60 border border-ink/10 shadow-2xs">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      <Counter to={44.3} decimals={1} duration={1500} />%
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Rural Maternal Anaemia</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Severe micronutrient deficiency creating critical risk of fatal postpartum hemorrhage (NNS).
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-sand/60 border border-ink/10 shadow-2xs">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      <Counter to={51} duration={1500} />%
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Unscreened Pregnancies</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Rural mothers receiving zero or inadequate antenatal checks, leaving preeclampsia undetected (PDHS).
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-sand/60 border border-ink/10 shadow-2xs">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      1 in <Counter to={89} duration={1500} />
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Lifetime Maternal Risk</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Lifetime risk of maternal death for Pakistani women, vs. 1 in 4,900 in high-income nations.
                    </p>
                  </div>
                </div>
              </div>

              {/* ELF's 4-Tier Pregnancy Intervention Model */}
              <div className="mt-16 sm:mt-20">
                <div className="max-w-2xl">
                  <span className="eyebrow">Our Ground Intervention</span>
                  <h3 className="display-sm mt-3 text-ink">How ELF Protects Expectant Mothers</h3>
                  <p className="mt-3 text-sm sm:text-base text-ink/70">
                    By bringing clinical care and trained female health workers directly to rural courtyards and field tents, we eliminate the distance and financial barriers that cost mothers their lives.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      step: "01",
                      title: "Antenatal Clinical Check-ups",
                      icon: Stethoscope,
                      desc: "Clinical blood pressure monitoring, fetal heart rate tracking, gestational screening, and preeclampsia triage in local medical tents.",
                    },
                    {
                      step: "02",
                      title: "Prenatal Iron & Micronutrients",
                      icon: Pill,
                      desc: "Full-course supplies of iron, folic acid, and calcium provided 100% free to eliminate gestational anaemia and prevent neural tube defects.",
                    },
                    {
                      step: "03",
                      title: "Doorstep Lady Health Visitors",
                      icon: HeartPulse,
                      desc: "Qualified female healthcare workers conducting home visits on charpais for private consultations, birth planning, and hygiene education.",
                    },
                    {
                      step: "04",
                      title: "Infant Nutrition & Clean Delivery",
                      icon: Baby,
                      desc: "Sterile delivery kits, Lactogen infant formula for vulnerable newborns, feeding bottles, postpartum pads, and emergency transport funds.",
                    },
                  ].map((tier) => {
                    const Icon = tier.icon;
                    return (
                      <div
                        key={tier.step}
                        className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-6 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="numeral text-sm font-bold text-clay">{tier.step}</span>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-clay/10 text-clay">
                              <Icon className="h-4 w-4" />
                            </div>
                          </div>
                          <h4 className="mt-4 font-display text-lg font-bold text-ink">{tier.title}</h4>
                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/70">{tier.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photographic Showcase Cards */}
              <div className="mt-16 sm:mt-20">
                <span className="eyebrow">On the Ground</span>
                <h3 className="display-sm mt-3 text-ink">Field Care in Action</h3>
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                  <div className="group overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src="/images/pregnant/pregnant-10.jpg"
                        alt="Clinical Antenatal Checkup"
                        className="h-full w-full object-cover object-[center_12%] transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay">Clinical Care</span>
                      <h4 className="font-display text-base font-bold text-ink mt-1">Antenatal Screening in Medical Tents</h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70">
                        Physicians and nurses measuring blood pressure and monitoring vitals of expectant mothers to prevent maternal hypertension and preeclampsia.
                      </p>
                    </div>
                  </div>

                  <div className="group overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src="/images/pregnant/pregnant-11.jpg"
                        alt="Lady Health Visitor Home Consultation"
                        className="h-full w-full object-cover object-[center_12%] transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay">Community Outreach</span>
                      <h4 className="font-display text-base font-bold text-ink mt-1">Doorstep Lady Health Visitor Care</h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70">
                        Certified health workers visiting families directly in village courtyards, providing compassionate consultations, medicine, and newborn checks on charpais.
                      </p>
                    </div>
                  </div>

                  <div className="group overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src="/images/pregnant/pregnant-14.jpg"
                        alt="ELF Nutrition Support and Infant Formula"
                        className="h-full w-full object-cover object-[center_12%] transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay">Newborn Nutrition</span>
                      <h4 className="font-display text-base font-bold text-ink mt-1">Infant Formula & Postpartum Aid</h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70">
                        ELF volunteers distributing high-grade infant formula (Lactogen), safe feeding bottles, and maternal supplements to prevent infant malnourishment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Callout */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-clay/30 bg-clay/5 p-6 sm:p-8 shadow-xs">
                  <div>
                    <h4 className="font-display text-xl font-bold text-ink">Support a Mother Through Safe Childbirth</h4>
                    <p className="mt-1 text-xs sm:text-sm text-ink/70 max-w-xl">
                      Your sponsorship funds a full package of prenatal micronutrients, Lady Health Visitor home consultations, clean birth delivery essentials, and emergency medical referral coverage.
                    </p>
                  </div>
                  <Link
                    to="/donate"
                    search={{ project: "health-wash-community-wellbeing" }}
                    className="rounded-full bg-clay px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground hover:bg-clay-deep transition-colors shadow-xs"
                  >
                    Sponsor Maternal Care
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ── six pillars section ── */}
          <section className="border-b border-ink/10 bg-sand/40 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="max-w-3xl">
              <span className="eyebrow">Integrated Health, WASH & Maternal Framework</span>
              <h2 className="display-md mt-4 text-ink">
                Six Pillars of Community Dignity & Wellbeing
              </h2>
              <p className="lede mt-5">
                Education And Life Foundation unites clinical medical care, pregnancy support, and essential WASH initiatives.
                By bridging direct clinical intervention, antenatal & postnatal monitoring, safe water infrastructure, hygiene awareness, and
                dignified sanitation, we target preventative and curative health across Pakistan&apos;s most underserved areas.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  num: "01",
                  tag: "Clinical Medicine",
                  title: "Community Health & Medical Outreach",
                  icon: Stethoscope,
                  desc: "Qualified doctors and medical teams conduct mobile outreach camps, diagnostic screenings, and triage across hard-to-reach brick kiln communities and rural settlements.",
                  points: [
                    "Comprehensive physical examinations",
                    "Preventative diagnostics and triage",
                    "Referrals for secondary hospital care",
                  ],
                },
                {
                  num: "02",
                  tag: "Safe Water",
                  title: "Clean Drinking Water Infrastructure",
                  icon: Droplets,
                  desc: "Engineering and installing deep-bore electric water pumps and community filtration systems to bypass heavy metal, microbial, and arsenic contaminants.",
                  points: [
                    "Deep-aquifer extraction points",
                    "Routine laboratory water testing",
                    "Community maintenance committees",
                  ],
                },
                {
                  num: "03",
                  tag: "Sanitation",
                  title: "Water, Sanitation & Hygiene (WASH)",
                  icon: ShieldCheck,
                  desc: "Constructing and restoring dignified, gender-segregated toilet blocks, handwashing stations, and clean drainage at local schools and community centers.",
                  points: [
                    "Dedicated girls' sanitation blocks",
                    "Handwashing and soap stations",
                    "Safe blackwater containment",
                  ],
                },
                {
                  num: "04",
                  tag: "Maternal & Pregnancy",
                  title: "Pregnancy Support & Maternal Dignity",
                  icon: HeartPulse,
                  desc: "Providing prenatal vitamins, iron supplementation, Lady Health Visitor antenatal consultations, postpartum follow-up, and safe menstrual hygiene education.",
                  points: [
                    "Antenatal check-ups & postpartum monitoring",
                    "Prenatal vitamin & iron distribution",
                    "Confidential doctor consultations & hygiene kits",
                  ],
                },
                {
                  num: "05",
                  tag: "Early Prevention",
                  title: "Child Health & Hygiene Education",
                  icon: Sparkles,
                  desc: "Instilling lifelong hygiene practices among students through structured classroom sessions, handwashing protocols, oral hygiene, and routine pediatric deworming.",
                  points: [
                    "Classroom handwashing routines",
                    "School deworming campaigns",
                    "Growth and nutrition tracking",
                  ],
                },
                {
                  num: "06",
                  tag: "Continuous Care",
                  title: "Essential Medicines & Health Sessions",
                  icon: Activity,
                  desc: "Dispensing 100% free prescription antibiotics, rehydration salts, analgesics, and vitamins alongside interactive community sessions on disease prevention.",
                  points: [
                    "Free verified pharmaceuticals",
                    "Seasonal illness awareness",
                    "Waterborne epidemic prevention",
                  ],
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-sand/40 p-7 sm:p-8 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="numeral text-sm font-bold text-clay">{pillar.num}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">
                        {pillar.tag}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/75">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-ink/10 pt-4">
                      <ul className="space-y-2">
                        {pillar.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-xs font-medium text-ink/80">
                            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
    )}

      {project.slug === "hope-and-freedom-for-widows-headed-families" && (
        <section className="border-t border-ink/10 bg-background pt-16 sm:pt-24">
          <WidowsProjectShowcase />
        </section>
      )}

      {project.slug === "community-skills-development" && (
        <SkillsDevelopmentShowcase mode="community" />
      )}

      {project.slug === "digital-skills-development" && (
        <SkillsDevelopmentShowcase mode="digital" />
      )}

      {project.slug === "faith-hope-love-for-every-child" && (
        <section className="border-t border-ink/10 bg-background pt-16 sm:pt-24 px-5 sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            <FaithHopeLoveShowcase />
          </div>
        </section>
      )}

      {project.slug === "capacity-building" && (
        <section id="financial-consultation" className="scroll-mt-24 border-t border-ink/10 bg-sand/30 px-5 py-24 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-[1600px]">
            {/* Eyebrow & Headline */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
                <Calculator className="h-4 w-4" />
                Specialized Advisory Module · Fiscal Stewardship
              </div>
              <h2 className="display-md mt-5 text-ink">
                Financial Consultation &amp; Institutional Governance
              </h2>
              <p className="lede mt-5 text-ink/75">
                Compassion begins the work, but financial discipline ensures it survives. Education And Life Foundation deploys senior accountants, non-profit legal specialists, and fiscal advisors directly to grassroots schools, clinics, and welfare initiatives to institute transparent bookkeeping, audit resilience, and sustainable budgeting.
              </p>
            </div>

            {/* 4 Pillars of Financial Consultation */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  num: "01",
                  tag: "Cashflow & Planning",
                  title: "Budgeting & Cashflow Management",
                  icon: Calculator,
                  desc: "Structuring detailed operational budgets for community schools, free clinics, and field centers to eliminate sudden deficits and ensure reliable monthly funding.",
                  deliverables: [
                    "Itemized operational expenditure models",
                    "Emergency contingency reserve planning",
                    "12-month rolling cashflow forecasts",
                  ],
                },
                {
                  num: "02",
                  tag: "Accounting & Audits",
                  title: "Bookkeeping Systems & Audit Prep",
                  icon: FileSpreadsheet,
                  desc: "Transitioning grassroots partners from informal cash boxes to verifiable double-entry accounting ledgers and digital cloud spreadsheets ready for formal third-party audit.",
                  deliverables: [
                    "Standardized non-profit chart of accounts",
                    "Monthly bank reconciliations & receipts trail",
                    "Annual external audit readiness protocols",
                  ],
                },
                {
                  num: "03",
                  tag: "Legal & Compliance",
                  title: "Regulatory Compliance & Non-Profit Law",
                  icon: Scale,
                  desc: "Advising local committees on charity registration deeds, tax exemption under Pakistani law (FBR 2(36) and PCP certification), and ethical board governance.",
                  deliverables: [
                    "Charity registration & renewal filing support",
                    "Tax-exempt status & withholding compliance",
                    "Board governance charters & meeting minutes",
                  ],
                },
                {
                  num: "04",
                  tag: "Micro-Enterprise",
                  title: "Cooperative & Livelihood Advisory",
                  icon: TrendingUp,
                  desc: "Providing tailored financial counseling to vocational graduates, women's tailoring clusters, and small artisan groups to break debt cycles and reinvest earnings wisely.",
                  deliverables: [
                    "Predatory debt liquidation roadmaps",
                    "Unit economics & pricing margins",
                    "Community rotating savings & credit groups",
                  ],
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.num}
                    className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-7 sm:p-8 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="numeral text-sm font-bold text-clay">{pillar.num}</span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">
                        {pillar.tag}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-bold text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/75">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-ink/10 pt-4">
                      <ul className="space-y-2">
                        {pillar.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-xs font-medium text-ink/80">
                            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strategic Callout Banner */}
            <div className="mt-12 rounded-2xl border border-ink/10 bg-sand p-8 sm:p-10 shadow-xs">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                    Verified Stewardship Policy
                  </span>
                  <h3 className="display-sm mt-2 text-ink">
                    Why Financial Consultation Protects Vulnerable Communities
                  </h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/70">
                    When grassroots organizations implement disciplined financial controls, zero donor funds are wasted, service delivery never halts unexpectedly, and international philanthropic partners invest with absolute confidence.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center rounded-full bg-clay px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-xs hover:bg-clay-deep transition-colors"
                  >
                    Request Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {project.layout === "data" && (
        <section className="px-5 py-24 sm:px-8">
           <div className="mx-auto grid max-w-[1600px] gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 shadow-xs sm:grid-cols-2 lg:grid-cols-4">
            {(project.slug === "capacity-building"
              ? [
                  { step: "Fiscal Audit", desc: "Diagnostic review of books, ledger practices, and operating overheads" },
                  { step: "Consultation", desc: "Tailored financial controls, budgeting models, and compliance roadmaps" },
                  { step: "Implementation", desc: "Staff training on accounting software, reconciliations, and reporting" },
                  { step: "Sustained Autonomy", desc: "Audited financial transparency and continuous organizational resilience" },
                ]
              : [
                  { step: "Enrol", desc: "Community outreach and student selection" },
                  { step: "Train", desc: "Structured vocational and digital coursework" },
                  { step: "Practise", desc: "Hands-on projects and supervised field practicals" },
                  { step: "Earn", desc: "Certified market placement and independent income" },
                ]
            ).map((item, i) => (
              <div key={item.step} className="bg-sand p-8">
                <span className="numeral text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-4 font-display text-2xl font-bold text-ink">{item.step}</div>
                <p className="mt-2 text-xs text-ink/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── closing ── */}
      <section className="relative h-[68svh] min-h-[520px] overflow-hidden">
        <ParallaxImage src={project.gallery.at(-1) ?? project.image} alt="" className="absolute inset-0" strength={45} />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-center px-5 sm:px-8">
          <h2 className="display-lg max-w-[14ch] !text-cream drop-shadow-md">Support this work.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/donate"
              search={{ project: project.slug }}
               className="rounded-full bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground hover:bg-clay-deep shadow-xs transition-colors"
            >
              Fund {project.name.split(" ").slice(0, 2).join(" ")}
            </Link>
            <Link
              to="/book"
              className="rounded-full border border-cream/30 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream hover:border-cream shadow-xs transition-colors"
            >
              Talk to the team
            </Link>
          </div>
        </div>
      </section>

      {/* ── next ── */}
       <section className="bg-sand px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Continue</span>
          <ul className="mt-8">
            {others.map((p) => (
               <li key={p.slug} className="border-t border-ink/10 last:border-b">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                   <span className="font-display text-2xl font-bold text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {p.name}
                  </span>
                   <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 group-hover:text-clay" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
