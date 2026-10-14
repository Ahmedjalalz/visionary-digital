import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Laptop,
  Scissors,
  MonitorCheck,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Award,
  Briefcase,
  Maximize2,
  X,
  BookOpen,
  Compass,
} from "lucide-react";

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  tag: string;
  caption: string;
  focal: string;
}

const digitalPhotos: GalleryPhoto[] = [
  {
    id: "dig-1",
    src: "/images/skills/digital/IMG_8746.JPG",
    alt: "Graduates holding accredited government and foundation certificates",
    tag: "Certified Graduates",
    caption: "Successful cohort students proudly displaying their recognized diplomas and computer literacy credentials.",
    focal: "object-[center_20%]",
  },
  {
    id: "dig-2",
    src: "/images/skills/digital/IMG_8766.JPG",
    alt: "Classroom computer lab with trainees working on individual workstations",
    tag: "IT Lab Infrastructure",
    caption: "Fully equipped computer lab providing dedicated monitors, internet connectivity, and reliable power.",
    focal: "object-[center_25%]",
  },
  {
    id: "dig-3",
    src: "/images/skills/digital/IMG_9098.JPG",
    alt: "Students actively engaged in software application practical session",
    tag: "Workstation Practical",
    caption: "Hands-on daily exercises covering typing accuracy, word processors, spreadsheets, and presentation decks.",
    focal: "object-[center_25%]",
  },
  {
    id: "dig-4",
    src: "/images/skills/digital/IMG_8802.JPG",
    alt: "Practical computer skill examination and evaluation session",
    tag: "Skills Assessment",
    caption: "Rigorous testing ensuring trainees meet commercial standards for administrative and clerical duties.",
    focal: "object-[center_20%]",
  },
  {
    id: "dig-5",
    src: "/images/skills/digital/IMG_8753.JPG",
    alt: "Student receiving formal graduation certificate and recognition",
    tag: "Graduation Award",
    caption: "Celebrating student milestones as they transition into dignified remote and local employment.",
    focal: "object-[center_20%]",
  },
  {
    id: "dig-6",
    src: "/images/skills/digital/IMG_5415.JPG",
    alt: "Instructor demonstrating digital workflow and typing mechanics",
    tag: "Faculty Mentorship",
    caption: "Personalized one-on-one instructor guidance ensuring every trainee masters modern interface fundamentals.",
    focal: "object-[center_20%]",
  },
];

const communityPhotos: GalleryPhoto[] = [
  {
    id: "com-1",
    src: "/images/skills/community/DSC04208.JPG",
    alt: "Vocational tailoring students operating sewing workstations in active session",
    tag: "Sewing Apprenticeship",
    caption: "Mastering foot-pedal tension control, industrial seams, and garment assembly under master tailors.",
    focal: "object-[center_25%]",
  },
  {
    id: "com-2",
    src: "/images/skills/community/community-skill-2.jpg",
    alt: "Apprentice practicing precision garment seam construction",
    tag: "Industrial Stitching",
    caption: "Commercial stitch standards preparing women to fulfill market orders and local tailoring requests.",
    focal: "object-[center_20%]",
  },
  {
    id: "com-3",
    src: "/images/skills/community/community-skill-3.jpg",
    alt: "Master trainer guiding student through intricate stitch work",
    tag: "Artisanal Guidance",
    caption: "Personalized apprenticeships enabling trainees to reach commercial fashion and uniform standards.",
    focal: "object-[center_20%]",
  },
  {
    id: "com-4",
    src: "/images/skills/community/community-skill-4.jpg",
    alt: "Full classroom of vocational sewing workstations in active session",
    tag: "Community Vocational Center",
    caption: "A dignified learning environment equipping vulnerable women with a certified lifelong trade.",
    focal: "object-[center_25%]",
  },
  {
    id: "com-5",
    src: "/images/skills/community/community-skill-5.jpg",
    alt: "Detailed garment finishing and stitching techniques",
    tag: "Garment Craftsmanship",
    caption: "From raw fabric to finished attire ready for local customers and retail orders.",
    focal: "object-[center_20%]",
  },
  {
    id: "com-6",
    src: "/images/skills/community/community-skill-6.jpg",
    alt: "Heavy-duty sewing machine distribution to certified graduate",
    tag: "Machine Distribution",
    caption: "Providing brand-new industrial sewing machines to graduates for independent home-based enterprise.",
    focal: "object-[center_20%]",
  },
];

interface SkillsDevelopmentShowcaseProps {
  mode?: "all" | "community" | "digital";
}

export function SkillsDevelopmentShowcase({ mode = "all" }: SkillsDevelopmentShowcaseProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <div className="relative">
      {/* ── Sub-navigation sticky jump bar (only shown in combined view) ── */}
      {mode === "all" && (
        <div className="sticky top-20 z-30 border-y border-ink/10 bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clay" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink">
                Two Integrated Pathways to Self-Reliance
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="#digital-skills-section"
                className="inline-flex items-center gap-1.5 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-semibold text-clay transition hover:bg-clay hover:text-primary-foreground"
              >
                <Laptop className="h-3.5 w-3.5" />
                <span>01 · Digital Skills</span>
              </a>
              <a
                href="#community-skills-section"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-sand/60 px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:bg-ink hover:text-cream"
              >
                <Scissors className="h-3.5 w-3.5" />
                <span>02 · Community Skills</span>
              </a>
              <a
                href="#equipment-pathway-section"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-sand/60 px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:bg-ink hover:text-cream"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>03 · Graduation &amp; Tools</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: DIGITAL SKILLS & MODERN COMPUTER LITERACY
          ═══════════════════════════════════════════════════════════════ */}
      {(mode === "all" || mode === "digital") && (
      <section
        id="digital-skills-section"
        className="scroll-mt-32 border-b border-ink/10 bg-sand/20 px-5 py-24 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
              <Laptop className="h-4 w-4" />
              Pillar 01 · Technology Literacy &amp; Remote Economy
            </div>
            <h2 className="display-md mt-5 text-ink">
              Digital Skills: Bridging the Tech Divide for Youth &amp; Women
            </h2>
            <p className="lede mt-5 text-ink/75">
              The modern economy demands digital fluency, yet millions of underprivileged youth and
              women in Pakistan have never operated a desktop computer. ELF’s Community Digital
              Skills academies provide 100% free, structured technical training to transform
              complete beginners into digitally autonomous professionals ready for freelance and
              remote work.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-ink/10 bg-background p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-clay">100%</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Free Workstation Access
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Zero tuition, hardware, or internet cost to students.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-ink">40+ WPM</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Typing &amp; Data Entry
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Rigorous keyboard dexterity and speed benchmarks.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-clay">65%</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Female Trainees
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Dedicated safe hours empowering girls in IT.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-ink">Direct</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Market Readiness
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Freelancing profile setup and remote micro-tasks.
              </p>
            </div>
          </div>

          {/* Visual Showcase: 6 Digital Skills Photos */}
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                  Field Documentation · Digital Lab
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                  Inside the Computer Skills Academy
                </h3>
              </div>
              <p className="text-xs text-ink/60 max-w-md">
                Click any photograph to view high-resolution imagery and direct field context from
                our ongoing IT training cohorts.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {digitalPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                    <picture className="contents">
                      {photo.src.startsWith("/") && (
                        <source srcSet={photo.src.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                      )}
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${photo.focal}`}
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-3 right-3 rounded-full bg-background/80 p-2 backdrop-blur-xs text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block rounded-full bg-clay px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-primary-foreground">
                        {photo.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs leading-relaxed text-ink/80 font-medium">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Tracks for Digital Skills */}
          <div className="mt-16 rounded-2xl border border-ink/10 bg-background p-8 sm:p-10 shadow-xs">
            <h4 className="font-display text-xl font-bold text-ink">
              Core Digital Skills Curriculum Tracks
            </h4>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <MonitorCheck className="h-4 w-4" />
                  <span>Module 01</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Hardware &amp; Operating Systems
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Keyboard mastery, touch typing, mouse precision, file folder organization, and OS
                  security basics.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="h-4 w-4" />
                  <span>Module 02</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Office Productivity Suites
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Word processing, spreadsheets, formulas, structured data entry, presentation
                  decks, and PDF creation.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <Compass className="h-4 w-4" />
                  <span>Module 03</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Internet Literacy &amp; Research
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Web browser navigation, search queries, cloud file storage, email etiquette, and
                  online fraud prevention.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <Briefcase className="h-4 w-4" />
                  <span>Module 04</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Freelance &amp; Remote Earning
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Setting up verified freelancer profiles, writing proposals, client communication,
                  and digital payment withdrawal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: COMMUNITY SKILLS & VOCATIONAL TRADES
          ═══════════════════════════════════════════════════════════════ */}
      {(mode === "all" || mode === "community") && (
      <section
        id="community-skills-section"
        className="scroll-mt-32 border-b border-ink/10 bg-background px-5 py-24 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
              <Scissors className="h-4 w-4" />
              Pillar 02 · Vocational Trades &amp; Micro-Enterprise
            </div>
            <h2 className="display-md mt-5 text-ink">
              Community Skills: Converting Traditional Crafts into Livelihoods
            </h2>
            <p className="lede mt-5 text-ink/75">
              Vocational trades provide an immediate, tangible buffer against destitution. Our
              Community Skills centers offer intensive 6-month certified apprenticeships in
              cutting, tailoring, pattern making, and machine craftsmanship. Every successful
              graduate receives a brand-new heavy-duty sewing machine, permanently liberating their
              household from exploitative daily wage labor.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-ink/10 bg-sand/40 p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-clay">6 Months</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Certified Curriculum
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Rigorous daily hands-on practice under master tailors.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-sand/40 p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-ink">100% Free</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Sewing Machine Kit
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Awarded to every graduate to start home micro-business.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-sand/40 p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-clay">Dignified</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Home Enterprise
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Enables mothers to earn while caring for children.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-sand/40 p-6 shadow-2xs">
              <span className="font-display text-3xl sm:text-4xl font-black text-ink">Lifetime</span>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/65">
                Market Independence
              </p>
              <p className="mt-1 text-xs text-ink/60">
                Graduates transition permanently out of welfare dependence.
              </p>
            </div>
          </div>

          {/* Visual Showcase: 7 Community Skills Photos */}
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                  Field Documentation · Vocational Workshops
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                  Inside the Community Vocational Center
                </h3>
              </div>
              <p className="text-xs text-ink/60 max-w-md">
                Real photos from our vocational tailoring classes, fabric cutting workshops, and
                graduation ceremonies across Punjab.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {communityPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ink/10 bg-sand/20 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                    <picture className="contents">
                      {photo.src.startsWith("/") && (
                        <source srcSet={photo.src.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                      )}
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${photo.focal}`}
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute top-3 right-3 rounded-full bg-background/80 p-2 backdrop-blur-xs text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block rounded-full bg-clay px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider text-primary-foreground">
                        {photo.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs leading-relaxed text-ink/80 font-medium">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocational Curriculum Breakdown */}
          <div className="mt-16 rounded-2xl border border-ink/10 bg-sand/30 p-8 sm:p-10 shadow-xs">
            <h4 className="font-display text-xl font-bold text-ink">
              Vocational Stitching &amp; Enterprise Curriculum
            </h4>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <Scissors className="h-4 w-4" />
                  <span>Phase 01</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Measurement &amp; Drafting
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Body measurement precision, drafting paper patterns, fabric grain alignment, and
                  waste minimization.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>Phase 02</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Machine Stitching &amp; Assembly
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Straight seams, curved necklines, zipper installations, piping, overlocking, and
                  finishing hems.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <Award className="h-4 w-4" />
                  <span>Phase 03</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Advanced Garment Construction
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Shalwar kameez, kurtas, children’s school uniforms, and festive embroidery
                  embellishment.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-clay font-bold text-xs uppercase tracking-wider">
                  <Users className="h-4 w-4" />
                  <span>Phase 04</span>
                </div>
                <h5 className="font-display text-base font-bold text-ink">
                  Micro-Business Setup
                </h5>
                <p className="text-xs text-ink/70 leading-relaxed">
                  Costing, profit pricing, acquiring local neighborhood orders, and maintaining cash
                  ledgers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: INTEGRATED GRADUATION & SUSTAINED AUTONOMY
          ═══════════════════════════════════════════════════════════════ */}
      <section
        id="equipment-pathway-section"
        className="scroll-mt-32 border-b border-ink/10 bg-sand/40 px-5 py-24 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <span className="eyebrow text-clay">Step-by-Step Delivery</span>
            <h2 className="display-md mt-4 text-ink">
              From Enrolment to Lifelong Independence
            </h2>
            <p className="lede mt-5 text-ink/75">
              ELF does not offer temporary aid that disappears when the program ends. We accompany
              every student from initial community outreach to formal graduation and tool
              distribution.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-ink/10 bg-background p-7 shadow-xs">
              <span className="font-display text-2xl font-bold text-clay">Step 01</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">Community Outreach</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                Door-to-door surveys identifying vulnerable youth, widows, and low-income breadwinners
                who need urgent trade skills.
              </p>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-background p-7 shadow-xs">
              <span className="font-display text-2xl font-bold text-clay">Step 02</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">Structured Apprenticeship</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                Intensive practice in our {mode === "digital" ? "digital IT labs" : mode === "community" ? "vocational tailoring center" : "digital labs or vocational tailoring centers"} with
                all materials provided.
              </p>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-background p-7 shadow-xs">
              <span className="font-display text-2xl font-bold text-clay">Step 03</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">Equipment Distribution</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                Graduates receive verified certifications alongside {mode === "digital" ? "accredited diplomas and digital access" : "industrial sewing machines and starter kits"}.
              </p>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-background p-7 shadow-xs">
              <span className="font-display text-2xl font-bold text-clay">Step 04</span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">Market Linkages</h3>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                Connecting graduates with retail boutiques, school uniform orders, and remote
                freelancing platforms for sustained income.
              </p>
            </div>
          </div>

          {/* Callout Action Banner */}
          <div className="mt-14 rounded-2xl border border-ink/10 bg-ink p-8 sm:p-12 text-cream shadow-md">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay-bright">
                  Sponsor a Student’s Livelihood
                </span>
                <h3 className="display-sm mt-3 text-cream">
                  {mode === "digital"
                    ? "Equip a Youth with a Dedicated Computer Workstation & Mentorship"
                    : "Equip a Mother with a Heavy-Duty Sewing Machine & Startup Kit"}
                </h3>
                <p className="mt-3 text-sm text-cream/75 max-w-2xl leading-relaxed">
                  Your donation directly funds certified trade instruction and provides the
                  machinery a family needs to permanently lift themselves out of poverty.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  to="/donate"
                  search={{
                    project:
                      mode === "digital"
                        ? "digital-skills-development"
                        : "community-skills-development",
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-xs hover:bg-clay-deep transition-colors"
                >
                  <span>Sponsor a Trainee</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal for Photo Zoom ── */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-background border border-ink/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 z-10 rounded-full bg-ink/70 p-2 text-cream hover:bg-ink transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-ink/5">
              <picture className="contents">
                {selectedPhoto.src.startsWith("/") && (
                  <source srcSet={selectedPhoto.src.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                )}
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  decoding="async"
                  className="h-full w-full object-contain max-h-[65vh]"
                />
              </picture>
            </div>

            <div className="p-6">
              <span className="inline-block rounded-full bg-clay px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                {selectedPhoto.tag}
              </span>
              <h4 className="font-display text-lg font-bold text-ink mt-2">
                {selectedPhoto.alt}
              </h4>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
