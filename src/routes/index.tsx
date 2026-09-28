import { createFileRoute, Link } from "@tanstack/react-router";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import heroImg from "@/assets/official-local/community.jpg";
// educationImg unused
// widowsImg unused
// washImg unused
// healthImg unused
// digitalImg unused
import { foundationMedia } from "@/data/foundationMedia";

import { projects } from "@/data/projects";
import { MapEmbed } from "@/components/site/MapEmbed";
import { Counter, MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";
import { PartnerTicker } from "@/components/site/PartnerTicker";
import { ProjectHighlightCards } from "@/components/site/ProjectHighlightCards";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Education And Life Foundation — Action Where the Shortfall is Sharpest" },
      {
        name: "description",
        content:
          "Education And Life Foundation works with deprived communities across Pakistan on free education, medical camps, safe water and widow family support.",
      },
      { property: "og:title", content: "Education And Life Foundation" },
      {
        property: "og:description",
        content: "Free schooling, medical camps, and family dignity across Punjab, Pakistan.",
      },
    ],
  }),
  component: Home,
});

/* ─────────────────────────  HERO  ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78svh] w-full flex-col justify-end overflow-hidden bg-ink pb-16 pt-32 sm:min-h-[84svh] sm:pb-20 lg:min-h-[calc(100svh-5rem)] lg:pb-24"
    >
      <motion.div className="absolute inset-0" style={reduce ? {} : { y: imgY, scale: imgScale }}>
        <motion.img
          src={heroImg}
          alt="Schoolchildren gathered in a village courtyard at dusk in rural Punjab, Pakistan"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover object-[56%_34%] sm:object-[58%_34%] lg:object-[62%_34%]"
        />
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/40 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink/75 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-cream/65" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cream/80">
                Lahore, Pakistan
              </span>
            </motion.div>

            <h1 className="max-w-[12ch] font-display text-[clamp(3rem,6.5vw,6.8rem)] font-bold leading-[0.98] text-cream">
              <MaskLines lines={["Uplifting the Lives", "of Community"]} delay={0.12} />
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-cream/82 sm:text-lg"
            >
              Education, healthcare, safe water, and pathways to self-reliance—delivered with dignity in communities across Pakistan.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-lg transition-all hover:bg-clay-deep hover:shadow-clay/25"
              >
                <span>Explore Our Programmes</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-ink/40 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream backdrop-blur-md transition-all hover:border-cream hover:bg-ink/60 shadow-sm"
              >
                <span>Donate to Field</span>
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:justify-end">
            <a href="#our-work" className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-cream/70 hover:text-cream">
              Continue to our work <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────  PROJECTS (horizontal)  ───────────────────── */

function ProjectsRail() {
  const items = projects.map((project, i) => ({
    project,
    img: project.image,
    n: String(i + 1).padStart(2, "0"),
  }));

  return (
    <section id="our-work" className="bg-sand px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Our work</span>
            <h2 className="display-md mt-3 max-w-[15ch] text-ink">Different problems. Deliberate answers.</h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-clay">
            Explore all programmes <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ project, img, n }) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group flex flex-col justify-between h-full rounded-2xl border border-ink/10 bg-background p-6 sm:p-7 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="relative overflow-hidden bg-ink/10 aspect-[16/10] rounded-xl shadow-2xs">
                  <img
                    src={img}
                    alt={project.name}
                    loading="lazy"
                    className={`h-full w-full object-cover ${project.heroPosition} transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
                  />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="numeral rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold text-clay shadow-xs backdrop-blur-xs">
                      {n}
                    </span>
                    {project.problem?.figure && (
                      <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-cream backdrop-blur-xs">
                        {project.problem.figure} {project.problem.unit}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-clay sm:text-xl line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-2">
                    {project.short}
                  </p>
                </div>

                {/* Moving slider with mini squarish highlight cards */}
                <ProjectHighlightCards project={project} />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-xs">
                <span className="text-[0.68rem] font-medium uppercase tracking-wider text-ink/50">
                  {project.outcomes?.[0]?.value || "Direct Field Program"}
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-clay transition-transform group-hover:translate-x-0.5">
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}

          {/* 12th Card: Directory Feature Tile completing the 4x3 grid */}
          <Link
            to="/projects"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-ink p-6 sm:p-7 text-cream transition-all duration-300 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 aspect-[16/10] md:aspect-auto"
          >
            <div className="relative z-10">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-clay-bright">
                Complete Field Directory
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-cream sm:text-2xl">
                Explore All 11 Programmes
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                From rural schools and mobile health clinics to women's livelihoods and emergency relief across Pakistan.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-cream/20 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-cream group-hover:text-clay-bright transition-colors">
              <span>View full directory</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-6 select-none font-display text-7xl font-black tracking-tighter text-cream/[0.04]"
            >
              ELF
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  IMPACT  ───────────────────────── */

function Impact() {
  return (
    <>
      <section className="relative overflow-hidden bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Rise>
            <div className="flex flex-wrap items-baseline gap-x-6">
              <span className="numeral text-[18vw] leading-[0.8] text-ink sm:text-[11vw]">
                <Counter to={26} format={(n) => Math.round(n).toString()} />
              </span>
              <span className="numeral text-[7vw] leading-none text-clay sm:text-[4vw]">MILLION</span>
            </div>
          </Rise>
          <div className="mt-8 grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-12">
            <p className="md:col-span-6 md:col-start-1 font-display text-2xl font-bold leading-[1.1] text-ink sm:text-4xl">
              children in Pakistan are not in a classroom today.
            </p>
            <div className="md:col-span-4 md:col-start-9">
              <p className="lede">
                It is one of the largest out-of-school populations in the world. Behind the figure sits
                something much smaller and much more solvable: a fee, a uniform, a walk that is too long,
                a family that needs the income more than the certificate.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/45">
                Source: UNICEF Pakistan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* the turn */}
      <section className="relative h-[75svh] min-h-[460px] overflow-hidden">
        <ParallaxImage
          src={foundationMedia.classroomDesks}
          alt="School students studying in an ELF supported classroom"
          className="absolute inset-0"
          strength={60}
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <h2 className="display-xl !text-cream drop-shadow-md">
              <MaskLines lines={["One child"]} />
            </h2>
            <div className="mt-6 max-w-xl pl-[4%]">
              <MaskLines
                lines={["can change the arithmetic", "of an entire family."]}
                className="font-serif text-2xl italic leading-tight !text-cream drop-shadow-md sm:text-4xl"
                delay={0.15}
              />
            </div>
          </div>
        </div>
      </section>

      {/* what we do — numbered, no cards */}
      <section className="paper py-16 sm:py-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md max-w-[18ch]">How the work actually happens.</h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Six repeatable moves. Everything ELF runs is some combination of them.
            </p>
          </div>
          <ul className="mt-14">
            {[
              ["We find & fund", "We look continuously for communities carrying the sharpest shortfall, and we fund the response."],
              ["We build networks", "Partners, local leaders and volunteers — because programmes delivered to a community do not last."],
              ["We strengthen", "Resources and opportunity that make growth self-sustaining rather than donor-dependent."],
              ["We educate", "Free schooling, books and supplies for children who would otherwise never enrol."],
              ["We provide care", "Medical camps in rural districts where the nearest clinic is a journey, not a walk."],
              ["We consult", "A professional network training small businesses and community organisations."],
            ].map(([title, body], i) => (
              <li
                key={title}
                className="group grid items-baseline gap-2 border-t border-ink/15 py-6 md:grid-cols-12 md:gap-8"
              >
                <span className="numeral col-span-1 text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="col-span-4 font-display text-2xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                  {title}
                </h3>
                <p className="col-span-6 col-start-7 max-w-[52ch] text-sm leading-relaxed text-ink/65">
                  {body}
                </p>
              </li>
            ))}
          </ul>

          {/* Operational field photography trio */}
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-ink/10 aspect-[4/3] bg-ink/10 shadow-xs">
              <img
                src={foundationMedia.schoolUniforms}
                alt="ELF students in rural Punjab"
                loading="lazy"
                className="h-full w-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[0.62rem] font-bold uppercase tracking-wider text-clay">Direct Education</span>
                <p className="font-display text-sm font-bold text-cream">Enrolment to Attendance</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-ink/10 aspect-[4/3] bg-ink/10 shadow-xs">
              <img
                src="/images/wash/wash-b-3.jpg"
                alt="Installed clean water hand pump"
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[0.62rem] font-bold uppercase tracking-wider text-clay">Safe Water Points</span>
                <p className="font-display text-sm font-bold text-cream">Preventing Waterborne Illness</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-ink/10 aspect-[4/3] bg-ink/10 shadow-xs">
              <img
                src="/images/pregnant/pregnant-7.jpg"
                alt="Medical camp doctor examining patient"
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[0.62rem] font-bold uppercase tracking-wider text-clay">Clinical Care</span>
                <p className="font-display text-sm font-bold text-cream">Free Medicine & Diagnosis</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────  STORY  ───────────────────────── */

function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const quoteX = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative h-[82svh] min-h-[520px] overflow-hidden bg-background">
      <ParallaxImage
        src="/images/widows/scrolling/12.jpg"
        alt="ELF team delivering essential food rations and family welfare support"
        className="absolute inset-0"
        imgClassName="object-[63%_32%]"
        strength={16}
        scaleFrom={1.04}
      />
      {/* Refined ambient overlay that keeps the photo details visible to refract through the glass */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/25 to-black/10" />

      <div className="absolute inset-0 mx-auto flex max-w-[1600px] items-end px-5 py-12 sm:px-8 sm:py-16">
        <motion.div
          style={reduce ? {} : { x: quoteX }}
          className="realistic-blue-glass relative w-full max-w-2xl rounded-3xl p-8 sm:p-12 shadow-2xl"
        >
          {/* Realistic physical glass reflection & optical flare layers */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none overflow-hidden rounded-[inherit]"
          >
            {/* Prismatic internal flare glow */}
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-clay-bright/25 blur-3xl" />

            {/* Diagonal specular surface light reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/28 via-white/8 to-transparent [mask-image:linear-gradient(125deg,black_25%,transparent_60%)]" />

            {/* Silky frosted glass diffusion texture */}
            <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'160\' height=\'160\' filter=\'url(%23n)\' opacity=\'0.7\'/%3E%3C/svg%3E')]" />

            {/* Decorative subtle serif quote watermark */}
            <span className="absolute -right-4 -top-8 font-serif text-[11rem] font-normal leading-none text-white/[0.07]">
              “
            </span>
          </div>

          <div className="relative z-10">
            {/* Frosted pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-3.5 py-1.5 backdrop-blur-md shadow-inner">
              <span className="h-2 w-2 rounded-full bg-clay-bright shadow-[0_0_8px_#62B7FF]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white">One Story</span>
            </div>

            <p className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.55)]">
              Nasreen — Lahore
            </p>
            <p className="text-xs sm:text-sm font-medium text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              Widows Welfare Program
            </p>

            <blockquote className="mt-6 font-serif text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18] italic text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]">
              “They did not ask me to prove I was poor. They asked what my children needed.”
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────  NUMBERS  ───────────────────────── */

function Numbers() {
  const stats = [
    { value: 20, label: "Years of continuous direct community service", suffix: "+" },
    { value: 4000, label: "Children supported in school & music education", suffix: "+" },
    { value: 4, label: "Connected areas of education, health, water & welfare", suffix: "" },
    { value: 100, label: "Direct field focus across every initiative", suffix: "%" },
  ];
  return (
    <section className="border-y border-ink/10 bg-sand py-14 sm:py-18">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l-2 border-clay/40 pl-5">
            <div className="flex items-baseline">
              <span className="numeral text-4xl sm:text-5xl font-black text-clay">
                <Counter to={s.value} format={(n) => Math.round(n).toString()} />
              </span>
              {s.suffix && <span className="numeral text-2xl font-bold text-clay ml-0.5">{s.suffix}</span>}
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink/70 leading-relaxed font-semibold">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────  LOCATION  ───────────────────────── */

function Location() {
  return (
    <section className="relative bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-[75svh]">
          <MapEmbed
            query="181 Raza Block, Allama Iqbal Town, Lahore, Pakistan"
            title="Map showing the ELF head office in Allama Iqbal Town, Lahore"
            className="absolute inset-0"
            zoom={15}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-clay/10 mix-blend-multiply" />
        </div>

        <div className="flex flex-col justify-center px-5 py-14 sm:px-12 lg:py-16">
          <span className="eyebrow">Head office</span>
          <h2 className="display-md mt-4 max-w-[14ch] text-ink">Lahore, Pakistan.</h2>
          <p className="lede mt-6">
            The work is planned, funded and dispatched from Allama Iqbal Town — and delivered across
            Punjab's districts by teams who live there.
          </p>
          <dl className="mt-10 space-y-6 border-t border-ink/10 pt-8 text-sm">
            <div className="flex flex-wrap gap-x-10 gap-y-1">
              <dt className="w-28 text-xs uppercase tracking-[0.18em] text-ink/45">Address</dt>
              <dd className="max-w-xs text-ink/85">181 Raza Block, Allama Iqbal Town, Lahore</dd>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-1">
              <dt className="w-28 text-xs uppercase tracking-[0.18em] text-ink/45">Phone</dt>
              <dd>
                <a href="tel:+923009475513" className="link-underline text-ink/85">
                  +92 300 9475513
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-1">
              <dt className="w-28 text-xs uppercase tracking-[0.18em] text-ink/45">Email</dt>
              <dd>
                <a
                  href="mailto:info@educationandlifefoundation.org"
                  className="link-underline break-all text-ink/85"
                >
                  info@educationandlifefoundation.org
                </a>
              </dd>
            </div>
          </dl>
          <Link
            to="/contact"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-clay px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-clay transition-all hover:bg-clay hover:text-cream shadow-xs"
          >
            All four branches <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  CTA  ───────────────────────── */

function FinalCta() {
  return (
    <section className="paper relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <p className="eyebrow">The end of the page is not the end of the story</p>
        <h2 className="display-lg mt-6 max-w-[16ch]">
          Somewhere a child is one bag, one fee, one clinic away.
        </h2>
        <div className="mt-12 flex flex-wrap gap-3.5">
          <Link
            to="/donate"
            className="rounded-full bg-ink px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-all hover:bg-clay hover:text-cream shadow-md"
          >
            Support a project
          </Link>
          <Link
            to="/book"
            className="rounded-full border border-ink/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all hover:border-ink hover:bg-sand/60 shadow-xs"
          >
            Book a meeting
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-ink/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all hover:border-ink hover:bg-sand/60 shadow-xs"
          >
            Who we are
          </Link>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none mt-12 select-none whitespace-nowrap font-display text-[10vw] font-extrabold leading-[0.85] tracking-[-0.07em] text-ink/[0.07]"
      >
        <span className="inline-block marquee-track">
          EDUCATION · HEALTH · WATER · DIGNITY · EDUCATION · HEALTH · WATER · DIGNITY ·&nbsp;
          EDUCATION · HEALTH · WATER · DIGNITY · EDUCATION · HEALTH · WATER · DIGNITY ·&nbsp;
        </span>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <PartnerTicker />
      <ProjectsRail />
      <Impact />
      <Story />
      <Numbers />
      <Location />
      <FinalCta />
    </>
  );
}
