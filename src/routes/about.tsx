import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2, GraduationCap, HandHeart, Heart, ShieldCheck, Globe2 } from "lucide-react";

import skillsImg from "@/assets/official-local/skills.jpg";
import { foundationMedia } from "@/data/foundationMedia";

import { MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";
import { SdgAlignmentSection } from "@/components/site/SdgAlignmentSection";
import { useIsMobile } from "@/hooks/use-mobile";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Education And Life Foundation" },
      {
        name: "description",
        content:
          "Who ELF is, our origins, and how a Lahore-based NGO serves marginalized communities across Punjab.",
      },
      { property: "og:title", content: "About Education And Life Foundation" },
      {
        property: "og:description",
        content: "To uplift the deprived community in Pakistan — the mission, the work, the people.",
      },
    ],
  }),
  component: About,
});

interface BoardMember {
  name: string;
  role: string;
  credentials?: string;
  badge?: string;
  img: string;
  detail: string;
  position?: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Mr. Tasneem Najam",
    role: "Chairman",
    credentials: "M.A. Economics (FCCU)",
    badge: "Executive Board",
    img: "/images/board/tasneem-najam.png",
    position: "object-[center_12%]",
    detail:
      "Brings over three decades of distinguished leadership in Pakistan's education sector as an educator, school owner, and institutional administrator. Former Owner and Principal of Saint Matthew's Cambridge School (1986–2016), Head & Hostel Superintendent at Christian Vocational Training Center Narowal, and Vice Chairman of Assemblies of God Church overseeing nine community schools across suburban Punjab.",
  },
  {
    name: "Ms. Anita Qaiser",
    role: "Vice Chairperson",
    credentials: "BA (Hons) Biblical & Applied Theology (Mattersey Hall, UK)",
    badge: "Executive Board",
    img: "/images/board/anita-qaiser.png",
    position: "object-[center_12%]",
    detail:
      "Dedicated community and ministry leader serving since 1986 across Pakistan's four provinces, Gilgit-Baltistan, and Parachinar. Specializes in youth empowerment, family counseling, and leadership development, bringing extensive pastoral governance and community care to ELF's humanitarian programs.",
  },
  {
    name: "Rev. Zeeshan Hameed",
    role: "Founder & International Director",
    credentials: "BS (Hons) Educational Science (FCCU) · Univ. of Auckland",
    badge: "Executive Board",
    img: "/images/board/zeeshan-hameed.jpg",
    position: "object-[center_10%]",
    detail:
      "Founder and International Director of Education and Life Foundation. Leading non-profit initiatives since 2017, he spearheads ELF's international donor relations, strategic project planning, institutional capacity building, and cross-border partnerships connecting global resources directly to grassroots Pakistani communities.",
  },
  {
    name: "Dr. Sana Rafaqat",
    role: "General Secretary",
    credentials: "Ph.D. Biotechnology (Molecular Human Genetics)",
    badge: "Executive Board",
    img: "/images/board/sana-rafaqat.jpg",
    position: "object-[center_12%]",
    detail:
      "Accomplished scientist and researcher with over 40 peer-reviewed scientific publications in international journals. With over six years of experience in quality assurance, clinical research management, and university teaching, she oversees ELF's institutional governance, statutory compliance, and healthcare initiatives.",
  },
  {
    name: "Mr. Ejaz Pervaz",
    role: "Chief Financial Officer",
    badge: "Executive Board",
    img: "/images/board/ejaz-pervaz.png",
    position: "object-[center_12%]",
    detail:
      "Chief Financial Officer of Education and Life Foundation. Oversees financial governance, budgeting, external audits, and fiscal stewardship, ensuring that all donor contributions and institutional funds are deployed with rigorous transparency and maximum direct impact.",
  },
  {
    name: "Mr. Sohail Hameed",
    role: "Finance Secretary",
    credentials: "B.Com (Hailey College of Commerce)",
    badge: "Executive Board",
    img: "/images/board/sohail-hameed.png",
    position: "object-[center_12%]",
    detail:
      "Businessman with over 11 years of voluntary church financial administration. Holds a Bachelor of Commerce from Hailey College of Commerce and manages ELF's daily accounting, fiscal allocations, disbursement verification, and transparent reporting systems.",
  },
  {
    name: "Prof. Kamran Rehmat",
    role: "Office Secretary",
    credentials: "MPhil Economics (NCBA&E) · MSc Economics (FCCU)",
    badge: "Executive Board",
    img: "/images/board/kamran-rehmat.png",
    position: "object-[center_12%]",
    detail:
      "Economics Professor in the Punjab government sector (Government Associate College for Boys, Lahore) and former Human Rights Defender with the National Commission for Justice and Peace (NCJP). Directs official administration, secretarial documentation, and minority welfare advocacy for ELF.",
  },
  {
    name: "Rev. Samuel Bhatti",
    role: "Program Lead — Azadi Freedom",
    credentials: "Master in Theology",
    badge: "Programs Leadership",
    img: "/images/board/samuel-bhatti.png",
    position: "object-[center_12%]",
    detail:
      "Founder and Program Lead of Azadi Freedom under ELF. With a background directing a German non-profit in Pakistan, he advances UN Sustainable Development Goals through vocational skills training, micro-business grants, and rights-based social inclusion for marginalized communities.",
  },
  {
    name: "Rev. Javed Mukhtar",
    role: "Press Secretary",
    credentials: "Motivational Speaker & Consultant",
    badge: "Communications",
    img: "/images/board/javed-mukhtar.jpg",
    position: "object-[center_12%]",
    detail:
      "Press Secretary of Education and Life Foundation. Renowned motivational speaker and community consultant steering ELF's public communication, media outreach, and storytelling to highlight grassroots needs and rally community support.",
  },
  {
    name: "Mr. Faisal Ilyas",
    role: "Peace, Human Rights & Religious Harmony Advisor",
    credentials: "M.Phil Peace & Conflict Studies · UN Fellow (OHCHR Geneva)",
    badge: "Advisory Board",
    img: "/images/board/faisal-ilyas.jpg",
    position: "object-[center_12%]",
    detail:
      "M.Phil Research Scholar in Peace and Conflict Studies based in Lahore, Pakistan. UN Fellow in Human & Minority Rights (OHCHR United Nations, Geneva), Global Trustee At-Large at URI Global Council (San Francisco), Regional Expert for South Asia (International Prize – We Are Together, Moscow), and Paris Peace Forum Project Leader / Country Representative since 2018. Graduate of Goldin Institute (Chicago) and Euphrates Institute (New York); social scientist and defender of peace, human rights, and religious harmony since 2012.",
  },
  {
    name: "Prof. Dr. Christy Munir",
    role: "Former Chairman",
    credentials: "Ph.D. Chemistry (Wayne State, USA) · Professor Emeritus (FCCU)",
    badge: "Professor Emeritus",
    img: "/images/board/christy-munir.png",
    position: "object-[center_12%]",
    detail:
      "Former Chairman of ELF and Professor Emeritus of Inorganic Chemistry at Forman Christian College (A Chartered University). Over 40 years of academic and institutional leadership, including Vice Principal and Principal of FCCU, with 50+ published scientific papers guiding ELF's founding vision.",
  },
  {
    name: "Prof. Rev. Aslam Yuhanna",
    role: "Former Chairman",
    credentials: "M.Sc. Economics (Colorado State, USA) · Professor Emeritus (FCCU)",
    badge: "Professor Emeritus",
    img: "/images/board/aslam-yuhanna.png",
    position: "object-[center_12%]",
    detail:
      "Former Chairman of ELF and Professor Emeritus of Economics at Forman Christian College (1970–2007). Former Chairman of the Pakistan Assemblies of God and current Chairman of Assemblies of God Church, Lahore, providing lifelong spiritual wisdom, educational leadership, and ethical stewardship.",
  },
];

const history = [
  { year: "Origins", title: "A response, not a plan", body: "ELF begins as direct assistance to families in Lahore who had fallen out of every other net — food, fees, medicine.", img: "/images/widows/scrolling/5.jpg" },
  { year: "Schools", title: "Classrooms open", body: "Free schooling formalises: tuition, books, uniforms and stationery covered so cost stops deciding who learns.", img: "/images/wash/wash-s-2.jpg" },
  { year: "Health", title: "Camps go rural", body: "Medical camps move out of the city into districts where the nearest clinic is a journey rather than a walk.", img: "/images/pregnant/pregnant-9.jpg" },
  { year: "Water", title: "WASH added", body: "Safe water and sanitation become a programme in their own right after illness keeps emptying classrooms.", img: "/images/wash/wash-s-4.jpg" },
  { year: "Skills", title: "From aid to income", body: "Vocational and digital training launch so families exit assistance instead of depending on it.", img: skillsImg },
  { year: "Today", title: "Programmes across four countries", body: "Supporters in Pakistan, New Zealand, Canada and Germany fund work delivered by teams who live where it happens.", img: "/images/wash/wash-s-1.jpg" },
];

function HistoryRail() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [distance, setDistance] = useState(0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="bg-sand px-5 py-14">
        <span className="eyebrow">The journey</span>
        <h2 className="display-md mt-3 text-ink">How urgency became a portfolio of programmes.</h2>
        <ol className="mt-8 space-y-10">
          {history.map((h) => (
            <li key={h.year}>
              <div className="relative h-52 overflow-hidden rounded-2xl border border-ink/10 shadow-xs">
                <picture className="contents">
                  {h.img.startsWith("/") && (
                    <source srcSet={h.img.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                  )}
                  <img src={h.img} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-[center_16%]" />
                </picture>
                <div className="absolute inset-0 bg-ink/45" />
                <span className="numeral absolute bottom-3 left-4 text-4xl text-cream">{h.year}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{h.body}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative bg-sand"
      style={{ height: `${Math.max(160, 60 + history.length * 20)}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24 pb-8">
        <div className="mx-auto mb-8 w-full max-w-[1600px] px-8">
          <span className="eyebrow">The journey</span>
          <h2 className="display-md mt-3 max-w-4xl text-balance text-ink">
            How a room full of urgency became a portfolio of programmes.
          </h2>
        </div>
        <motion.ol ref={trackRef} style={reduce ? {} : { x }} className="flex items-stretch gap-8 pl-8 pr-8">
          {history.map((h, i) => (
            <li key={h.year} className="w-[440px] shrink-0">
              <div className="relative h-[240px] overflow-hidden rounded-2xl border border-ink/10 shadow-xs">
                <picture className="contents">
                  {h.img.startsWith("/") && (
                    <source srcSet={h.img.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                  )}
                  <img src={h.img} alt="" aria-hidden loading="lazy" decoding="async" className="h-full w-full object-cover object-[center_16%]" />
                </picture>
                <div className="absolute inset-0 bg-ink/45" />
                <span className="numeral absolute bottom-4 left-5 text-5xl text-cream">{h.year}</span>
              </div>
              <div className="mt-5 border-t border-ink/15 pt-4">
                <span className="numeral text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-ink">{h.title}</h3>
                <p className="mt-2.5 max-w-[42ch] text-sm leading-relaxed text-ink/60">{h.body}</p>
              </div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      {/* ── Modern Editorial Hero ── */}
      <section className="relative border-b border-ink/10 bg-sand/35 dark:bg-card/50 pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-clay">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Registered Non-Profit NGO · Lahore, Pakistan</span>
              </div>

              <h1 className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.05]">
                Rooted in Compassion. <br className="hidden sm:inline" />
                <span className="text-clay">Driven by Accountability.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed text-ink/80">
                Founded in Lahore in 2017, Education and Life Foundation (ELF) serves marginalized families, bonded brick-kiln laborers, and out-of-school children across Pakistan through direct, verifiable grassroots development.
              </p>

              {/* Quick Navigation Jump Pills */}
              <div className="mt-8 flex flex-wrap gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-ink/75">
                <a
                  href="#mission-vision"
                  className="rounded-full border border-ink/15 bg-background px-3 py-1.5 sm:px-4 sm:py-2 hover:border-clay hover:text-clay transition-all shadow-2xs"
                >
                  Mission & Vision
                </a>
                <a
                  href="#our-story"
                  className="rounded-full border border-ink/15 bg-background px-3 py-1.5 sm:px-4 sm:py-2 hover:border-clay hover:text-clay transition-all shadow-2xs"
                >
                  Our Origins & Story
                </a>
                <a
                  href="#sdg-alignment"
                  className="rounded-full border border-clay/30 bg-clay/10 px-3 py-1.5 sm:px-4 sm:py-2 text-clay hover:bg-clay hover:text-primary-foreground transition-all shadow-2xs"
                >
                  UN SDG Alignment
                </a>
                <a
                  href="#board-members"
                  className="rounded-full border border-ink/15 bg-background px-3 py-1.5 sm:px-4 sm:py-2 hover:border-clay hover:text-clay transition-all shadow-2xs"
                >
                  Board & Governance
                </a>
                <a
                  href="#direct-provisions"
                  className="rounded-full border border-ink/15 bg-background px-3 py-1.5 sm:px-4 sm:py-2 hover:border-clay hover:text-clay transition-all shadow-2xs"
                >
                  Direct Provisions
                </a>
              </div>
            </div>

            {/* Right Visual Image Column */}
            <div className="lg:col-span-5">
              <div className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-sand shadow-lg">
                <picture className="contents">
                  <source srcSet="/images/wash/wash-b-1.webp" type="image/webp" />
                  <img
                    src="/images/wash/wash-b-1.jpg"
                    alt="Children outside an ELF village school in Punjab"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-cream">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-clay-bright">
                    Direct Community Reach
                  </span>
                  <p className="mt-1 font-display text-base font-bold text-cream">
                    Serving rural Punjab with zero intermediary overhead
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Credential Highlights Ribbon */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-10 border-t border-ink/10 text-center">
            <div className="rounded-2xl border border-ink/10 bg-background/60 p-4 shadow-2xs">
              <span className="numeral block text-2xl sm:text-3xl font-black text-clay">100%</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-ink">Direct Delivery</span>
              <span className="text-[11px] text-ink/60">Zero administrative middle steps</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/60 p-4 shadow-2xs">
              <span className="numeral block text-2xl sm:text-3xl font-black text-clay">35+</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-ink">Village Schools</span>
              <span className="text-[11px] text-ink/60">Free tuition, books & supplies</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/60 p-4 shadow-2xs">
              <span className="numeral block text-2xl sm:text-3xl font-black text-clay">9 SDGs</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-ink">UN Aligned</span>
              <span className="text-[11px] text-ink/60">Global strategic integration</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/60 p-4 shadow-2xs">
              <span className="numeral block text-2xl sm:text-3xl font-black text-clay">2018</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-ink">Registered NGO</span>
              <span className="text-[11px] text-ink/60">Statutory Pakistani compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section id="mission-vision" className="border-b border-ink/10 bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow text-clay">Guiding Ethos</span>
            <h2 className="display-md mt-2 text-ink font-display">Purpose Behind Every Action</h2>
            <p className="mt-3 text-base text-ink/70">
              Clear commitments that define who we serve and how we measure real community transformation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-clay/30 bg-clay p-8 sm:p-12 text-primary-foreground shadow-md transition-all hover:shadow-xl">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-primary-foreground/80">
                  Our Vision
                </span>
                <p className="mt-4 font-display text-2xl sm:text-4xl font-extrabold leading-tight text-primary-foreground">
                  To uplift the deprived community in Pakistan.
                </p>
              </div>
              <p className="mt-8 text-sm sm:text-base leading-relaxed text-primary-foreground/85 border-t border-primary-foreground/20 pt-6">
                A Pakistan where no child drops out for lack of a notebook, no mother dies in unassisted childbirth, and no family is held in hereditary bonded labor.
              </p>
            </div>

            <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-sand/60 dark:bg-card/70 p-8 sm:p-12 text-ink shadow-sm transition-all hover:border-clay/40 hover:shadow-xl">
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-clay">
                  Our Mission
                </span>
                <p className="mt-4 font-display text-2xl sm:text-4xl font-extrabold leading-tight text-ink dark:text-cream">
                  To build a better life for the community, and to aid those who cannot help themselves.
                </p>
              </div>
              <p className="mt-8 text-sm sm:text-base leading-relaxed text-ink/75 dark:text-cream/75 border-t border-ink/10 pt-6">
                Delivering actionable solutions—free schooling, maternal health, pure water, legal debt discharge, and industrial skills—that transform helplessness into self-reliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story — A Story That Began with Compassion */}
      <section id="our-story" className="border-b border-ink/10 bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          {/* Header */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-clay">
              <Heart className="h-3.5 w-3.5 fill-clay" />
              <span>Our Origins & Story</span>
            </div>
            <h2 className="display-lg mt-4 text-ink">
              A Story That Began with Compassion
            </h2>
            <p className="mt-5 text-lg sm:text-xl font-medium leading-relaxed text-ink/80">
              Education and Life Foundation (ELF) began with a simple but deeply held belief: every person deserves dignity, opportunity, and hope, regardless of their circumstances.
            </p>
          </div>

          {/* Section 1: The Roots & Widows Welfare */}
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-7 text-base sm:text-lg leading-relaxed text-ink/75">
              <p>
                The roots of ELF can be traced to <strong className="text-ink font-semibold">Irshad Bibi</strong>, whose compassion for widows, vulnerable children, and struggling families inspired her sons, <strong className="text-ink font-semibold">Zeeshan Hameed</strong> and <strong className="text-ink font-semibold">Sohail Hameed</strong>, to take practical action.
              </p>
              <p>
                Irshad Bibi had a particular concern for widows who were raising children with very limited resources and little financial security. Seeing their daily struggles inspired the family to begin helping widows with their immediate needs. What started with supporting individual families gradually developed into a structured <strong className="text-ink font-semibold">Widows Welfare Project</strong>.
              </p>
              <p>
                But the needs they encountered went far beyond food and immediate assistance. Many of the widows and disadvantaged families they met were also struggling to educate their children. The family recognized that while emergency assistance could help people through a difficult moment, education could help change the direction of a child's life.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-sand/30 dark:bg-card/60 p-6 sm:p-8 shadow-xs">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl bg-ink/10 shadow-xs">
                  <picture className="contents">
                    <source srcSet="/images/about/irshad-bibi-and-husband.webp" type="image/webp" />
                    <img
                      src="/images/about/irshad-bibi-and-husband.jpg"
                      alt="Irshad Bibi and her husband, the founding inspiration of Education and Life Foundation"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[center_20%]"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-cream/90 bg-ink/70 backdrop-blur-xs px-3 py-1 rounded-full">
                    The Founding Inspiration
                  </span>
                </div>
                <div className="mt-5 space-y-1">
                  <h4 className="font-display text-base font-bold text-ink">
                    Irshad Bibi &amp; Her Husband
                  </h4>
                  <p className="text-xs text-ink/70 leading-relaxed">
                    Whose personal compassion for widows, struggling families, and vulnerable children inspired the inception and lifelong mission of Education and Life Foundation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Education Became Part of Our Mission */}
          <div className="mt-16 rounded-3xl border border-ink/10 bg-sand/25 dark:bg-card/40 p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-clay">
                  <GraduationCap className="h-4 w-4" />
                  <span>Transforming Lives Through Learning</span>
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-ink leading-tight">
                  Education Became Part of Our Mission
                </h3>
                <p className="text-base sm:text-lg leading-relaxed text-ink/75">
                  This realization led to the establishment of a school for disadvantaged children and, subsequently, support for other schools already serving vulnerable communities.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-ink/75">
                  Over time, the initiative grew to <strong className="text-ink font-semibold">support 12 schools</strong>, helping children from disadvantaged backgrounds gain access to education and learning opportunities.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-ink/85 font-medium border-l-2 border-clay pl-4">
                  Education remains one of the central pillars of ELF because we believe that poverty should never determine whether a child has the opportunity to learn, develop their abilities, and dream about a better future.
                </p>

                {/* Key Statistics Highlights */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl border border-ink/10 bg-background/90 dark:bg-card p-5 sm:p-6 shadow-xs">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-clay">12</span>
                    <p className="mt-1.5 text-xs uppercase tracking-wider font-bold text-ink/65">
                      Community Schools Supported
                    </p>
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-background/90 dark:bg-card p-5 sm:p-6 shadow-xs">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-ink">100%</span>
                    <p className="mt-1.5 text-xs uppercase tracking-wider font-bold text-ink/65">
                      Free Tuition &amp; Supplies
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Portrait & Learning Materials */}
              <div className="lg:col-span-5">
                <figure className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 shadow-md">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={foundationMedia.schoolStudents}
                      alt="Smiling ELF student studying with open textbook and coursework"
                      className="h-full w-full object-cover object-[center_12%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-85" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-cream">
                    <span className="inline-flex items-center rounded-full bg-clay px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-cream shadow-xs">
                      Free Education Program
                    </span>
                    <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-cream/90">
                      Every student is supported with uniforms, bags, certified textbooks, and foundational learning resources.
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          {/* Section 3: Growing into Education and Life Foundation */}
          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-3xl border border-ink/10 bg-ink p-8 sm:p-10 text-cream shadow-md">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay-bright">Formal Incorporation</span>
                <div className="mt-3 font-display text-4xl sm:text-5xl font-extrabold text-cream">
                  Registered 2018
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/80">
                  What began as a family response to the struggles of widows and children gradually developed into an organization addressing different dimensions of poverty and vulnerability.
                </p>
                <div className="mt-6 pt-6 border-t border-cream/15 text-xs text-cream/70 leading-relaxed">
                  Through years of working directly with communities, ELF learned that sustainable change requires a combination of education, practical assistance, skills, opportunity, and long-term support.
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-base sm:text-lg leading-relaxed text-ink/75">
              <span className="eyebrow">Institutional Growth</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Growing into Education and Life Foundation
              </h3>
              <p>
                As the work expanded, <strong className="text-ink font-semibold">Education and Life Foundation was formally registered in 2018</strong>.
              </p>
              <p>
                What began as a family response to the struggles of widows and children gradually developed into an organization addressing different dimensions of poverty and vulnerability.
              </p>
              <p>
                Through years of working directly with communities, ELF learned that sustainable change requires a combination of education, practical assistance, skills, opportunity, and long-term support.
              </p>
              <p>
                This understanding led to the development of additional programs that continue to serve vulnerable and deprived communities today.
              </p>
            </div>
          </div>

          {/* Section 4 & 5: Skills + Standing with Christians (2 Column Editorial) */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Skills */}
            <div className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-sand/30 dark:bg-card/50 p-8 sm:p-10 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-clay block mb-3">Livelihoods & Dignity</span>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Building Skills and Creating Opportunities
                </h3>
                <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-ink/75">
                  <p>
                    One of these initiatives is our <strong className="text-ink font-semibold">Skill Development Project</strong>, which helps young people and adults from disadvantaged backgrounds learn practical and vocational skills.
                  </p>
                  <p>
                    Many capable young people grow up with limited access to professional training or employment opportunities. ELF seeks to bridge this gap by connecting individuals with skills that can help them earn an income, support their families, and move toward greater independence.
                  </p>
                  <p className="font-medium text-ink/85 border-l-2 border-clay pl-3">
                    For us, development is not simply about giving someone assistance for today. Wherever possible, it is about helping people develop the knowledge, confidence, and skills they need to build a more sustainable tomorrow.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-ink/10 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink/60">
                <CheckCircle2 className="h-4 w-4 text-clay" />
                <span>Practical Training · Vocational Literacy · Independence</span>
              </div>
            </div>

            {/* Standing with Christian communities */}
            <div className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-sand/30 dark:bg-card/50 p-8 sm:p-10 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-clay block mb-3">Faith, Dignity & Compassion</span>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Standing with Persecuted and Vulnerable Christians
                </h3>
                <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-ink/75">
                  <p>
                    ELF has a particular commitment to serving poor, vulnerable, and persecuted Christian communities in Pakistan, while responding to human need with compassion and dignity.
                  </p>
                  <p>
                    Christian families living in disadvantaged communities can face a combination of poverty, limited opportunities, social exclusion, and religious discrimination. ELF works alongside such communities through education, skills development, welfare assistance, healthcare-related initiatives, emergency response, and other community-based programs.
                  </p>
                  <p className="font-medium text-ink/85 border-l-2 border-clay pl-3">
                    Our approach is rooted in relationship. We seek to understand the needs of communities, work alongside local people, and develop practical responses that can make a meaningful difference in their lives.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-ink/10 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink/60">
                <HandHeart className="h-4 w-4 text-clay" />
                <span>Relationship-Rooted · Community-Led · Compassionate</span>
              </div>
            </div>
          </div>

          {/* Section 6 & 7: Crisis Response & Children/Widows at the Heart */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Crisis */}
            <div className="rounded-3xl border border-ink/10 bg-background p-8 sm:p-10 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-clay block mb-3">Rapid Action</span>
              <h3 className="font-display text-2xl font-bold text-ink">
                Responding in Times of Crisis
              </h3>
              <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-ink/75">
                <p>
                  Our commitment to vulnerable communities becomes especially important when disaster or violence suddenly changes people's lives.
                </p>
                <p>
                  ELF has responded to communities affected by flooding and other disasters, as well as incidents of violence and terrorism affecting Christian communities. In times of emergency, families may lose homes, belongings, livelihoods, and their sense of security within a matter of hours.
                </p>
                <p>
                  Through our emergency and disaster response work, we seek to stand alongside affected families by providing practical assistance according to the needs of each situation and supporting communities as they begin the difficult process of recovery.
                </p>
                <blockquote className="mt-4 rounded-2xl bg-sand/40 dark:bg-card/80 p-4 italic font-medium text-ink">
                  "We believe that people should not have to face their darkest moments alone."
                </blockquote>
              </div>
            </div>

            {/* Children and Widows */}
            <div className="rounded-3xl border border-ink/10 bg-background p-8 sm:p-10 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-clay block mb-3">Our Core Heartbeat</span>
              <h3 className="font-display text-2xl font-bold text-ink">
                Children and Widows Remain at the Heart of Our Story
              </h3>
              <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-ink/75">
                <p>
                  Although ELF has grown and developed new areas of work, children and widows remain especially close to our heart. <strong className="text-ink font-semibold">They represent where our journey began.</strong>
                </p>
                <p>
                  We continue to encounter children who are eager to learn but whose families struggle to afford educational necessities. We meet widows carrying enormous responsibilities while trying to provide food, education, and security for their children. We also meet young people who have determination and ability but lack the opportunities needed to turn their potential into a livelihood.
                </p>
                <p>
                  Behind every project are real people, real families, and real stories.
                </p>
                <p className="font-semibold text-ink text-base sm:text-lg border-l-2 border-clay pl-4">
                  That is why our work is not simply about delivering projects. It is about people.
                </p>
              </div>
            </div>
          </div>

          {/* Section 8: The 5-Point Guiding Compass */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-ink p-8 sm:p-12 text-cream shadow-xl">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay-bright">The Guiding Principle</span>
              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-cream mt-2 leading-tight">
                From Compassion to Lasting Change
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/80">
                Since its registration in 2018, Education and Life Foundation has continued to develop programs that respond to both immediate needs and longer-term challenges. Our journey has taken us from supporting widows to educating children, developing vocational skills, supporting healthcare initiatives, assisting vulnerable families, and responding when communities face disasters and emergencies.
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest font-semibold text-clay-bright">
                Yet the principle behind our work has remained the same:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 lg:grid-cols-5">
              {[
                { step: "01", verb: "See", desc: "the need." },
                { step: "02", verb: "Care", desc: "for the person." },
                { step: "03", verb: "Take", desc: "practical action." },
                { step: "04", verb: "Create", desc: "opportunity." },
                { step: "05", verb: "Restore", desc: "hope." },
              ].map((p) => (
                <div key={p.step} className="rounded-2xl border border-cream/15 bg-white/5 p-4 sm:p-5 backdrop-blur-xs">
                  <span className="text-[11px] font-bold text-clay-bright">{p.step}</span>
                  <div className="mt-2 font-display text-lg sm:text-xl font-bold text-cream">{p.verb}</div>
                  <div className="text-xs text-cream/70 mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-cream/15 max-w-4xl text-sm sm:text-base leading-relaxed text-cream/80">
              We are grateful for the donors, churches, charitable organizations, volunteers, professionals, community leaders, and friends who have joined us on this journey. Their partnership has helped transform compassion into practical assistance for people who need it most.
            </div>
          </div>

          {/* Section 9: Our Journey Continues */}
          <div className="mt-16 rounded-3xl border border-ink/10 bg-sand/35 dark:bg-card/70 p-8 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="eyebrow">The Road Ahead</span>
                <h3 className="font-display text-2xl sm:text-4xl font-bold text-ink mt-2">
                  Our Journey Continues
                </h3>
                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-ink/75">
                  <p>
                    What began with Irshad Bibi's compassion for widows and vulnerable children has grown into a continuing mission carried forward through Education and Life Foundation.
                  </p>
                  <p>
                    Today, ELF continues to stand alongside disadvantaged families and persecuted Christian communities through programs designed to provide education, skills, practical support, dignity, and opportunities for a better future.
                  </p>
                  <p className="font-display text-xl sm:text-2xl font-bold text-ink pt-2">
                    There is still much more to do.
                  </p>
                  <p className="border-l-4 border-clay pl-5 text-ink/90 font-medium italic">
                    "And as long as there are children waiting for an opportunity to learn, widows struggling to provide for their families, young people searching for a path toward independence, and communities needing support in times of crisis, Education and Life Foundation will continue working to turn compassion into action and hope into opportunity."
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-xs hover:bg-clay-deep transition-all"
                  >
                    <span>Explore Our Projects</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-background/80 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-cream transition-all shadow-xs"
                  >
                    <span>Support Our Mission</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Widows Welfare Distribution Image in a longer frame */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-background/90 dark:bg-card p-6 sm:p-7 shadow-xs">
                  <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden rounded-2xl bg-ink/10">
                    <img
                      src={foundationMedia.widowsFoodRations}
                      alt="ELF Widows Welfare distribution in Punjab"
                      className="h-full w-full object-cover object-[center_16%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-cream/90 bg-ink/75 backdrop-blur-xs px-3 py-1 rounded-full">
                      Widows Welfare Initiative
                    </span>
                  </div>
                  <blockquote className="mt-5 border-l-2 border-clay pl-4 italic text-xs sm:text-sm text-ink/75 leading-relaxed">
                    "Seeing their daily struggles inspired the family to begin helping widows with their immediate needs — turning personal compassion into lifelong community commitment."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UN Sustainable Development Goals Alignment (Core Pillar) ── */}
      <SdgAlignmentSection />

      {/* ── Board of Directors & Officers (Core Pillar) ── */}
      <section id="board-members" className="bg-background px-5 py-20 sm:px-8 sm:py-28 border-b border-ink/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">Governance & Stewardship</span>
              <h2 className="display-md mt-2 max-w-[16ch] text-ink">Board of Directors & Officers</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/65">
              Distinguished educators, researchers, and community leaders providing strategic oversight, financial accountability, and grassroots direction for Education and Life Foundation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boardMembers.map((m, i) => (
              <Rise key={m.name} delay={i * 0.04}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <picture className="contents">
                    {m.img.startsWith("/") && (
                      <source srcSet={m.img.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                    )}
                    <img
                      src={m.img}
                      alt={`${m.name}, ${m.role}`}
                      loading="lazy"
                      decoding="async"
                      className={`h-full w-full object-cover ${m.position || "object-[center_20%]"} transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]`}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />
                  
                  {m.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-ink/75 backdrop-blur-md border border-cream/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-cream/90 shadow-xs">
                        {m.badge}
                      </span>
                    </div>
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                    <div className="font-display text-lg sm:text-xl font-bold leading-tight tracking-tight text-cream">
                      {m.name}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] font-semibold text-clay-bright">{m.role}</div>
                    {m.credentials && (
                      <div className="mt-0.5 text-[11px] text-cream/65 line-clamp-1">{m.credentials}</div>
                    )}
                  </figcaption>

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/95 to-ink/40 p-5 sm:p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-clay-bright">{m.role}</div>
                    <div className="mt-1 font-display text-lg sm:text-xl font-bold tracking-tight text-cream leading-snug">{m.name}</div>
                    {m.credentials && (
                      <div className="mt-1 text-[11px] font-medium text-cream/70 border-b border-cream/15 pb-2">{m.credentials}</div>
                    )}
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-cream/85 overflow-y-auto max-h-[52%] pr-1">{m.detail}</p>
                  </div>
                  <p className="sr-only">{m.detail}</p>
                </figure>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ── Direct Provisions (Operational Overview) ── */}
      <section id="direct-provisions" className="border-b border-ink/10 bg-sand/30 dark:bg-card/40 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Operational Delivery</span>
              <h2 className="display-md mt-3 text-ink">What the Foundation Provides</h2>
            </div>
            <p className="max-w-md text-sm text-ink/65 leading-relaxed">
              Every initiative is delivered directly into the hands of families with zero administrative intermediaries and verifiable community impact.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Free Education For Underprivileged",
                desc: "Tuition, uniforms, textbooks, and daily stationery for children across Punjab who would otherwise be out of school.",
                img: foundationMedia.projectEducation,
                badge: "Education",
              },
              {
                title: "Monthly Rations & Widow Support",
                desc: "Direct nutritional rations and living stipends delivered with dignity to households headed solely by widows.",
                img: "/images/widows/scrolling/16.jpg",
                badge: "Welfare",
              },
              {
                title: "Free Medical Care & Prescription",
                desc: "Mobile clinical camps, qualified volunteer doctors, diagnostic screening, and emergency medication in rural villages.",
                img: foundationMedia.healthCampDoctor,
                badge: "Healthcare",
              },
              {
                title: "Safe Water & Rural Hand Pumps",
                desc: "Clean drinking water wells and school sanitation infrastructure protecting children from waterborne illness.",
                img: "/images/wash/wash-b-6.jpg",
                badge: "WASH",
              },
              {
                title: "Vocational Skills & Micro-Enterprise",
                desc: "Industrial sewing machines and computer literacy cohorts turning immediate relief into lifelong self-reliance.",
                img: "/images/skills/community/community-skill-7.jpg",
                badge: "Livelihoods",
              },
              {
                title: "Emergency Relief & Orphan Support",
                desc: "Rapid flood and winter survival packages alongside marriage and educational grants for orphaned young women.",
                img: foundationMedia.emergencyRelief,
                badge: "Emergency Aid",
              },
            ].map((s, i) => (
              <Rise key={s.title} delay={i * 0.05}>
                <div className="group relative rounded-2xl border border-ink/10 bg-background p-6 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden rounded-xl bg-ink/10 shadow-2xs">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_12%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-60" />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cream backdrop-blur-xs shadow-xs">
                      {s.badge}
                    </span>
                    <span className="numeral absolute bottom-2.5 right-3 text-2xl font-black text-cream/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-xl font-bold leading-tight text-ink group-hover:text-clay transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <HistoryRail />

      <section className="paper px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-8">
          <h2 className="display-lg max-w-[14ch]">Come and see the work.</h2>
          <div className="flex flex-wrap gap-3.5">
            <Link to="/projects" className="rounded-full bg-clay px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-clay-deep shadow-md">
              The projects
            </Link>
            <Link to="/book" className="rounded-full border border-ink/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all hover:border-ink hover:bg-sand/60 shadow-xs">
              Book a meeting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
