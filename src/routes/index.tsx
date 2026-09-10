import { createFileRoute, Link } from "@tanstack/react-router";
import { useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

import heroAsset from "@/assets/official/community.jpg.asset.json";
import educationAsset from "@/assets/official/education.jpg.asset.json";
import widowsAsset from "@/assets/official/widows.jpg.asset.json";
import familyAsset from "@/assets/official/family.jpg.asset.json";
import healthAsset from "@/assets/official/health.jpg.asset.json";
import digitalAsset from "@/assets/official/digital.jpg.asset.json";
import { assetUrl } from "@/lib/asset";
import { foundationMedia } from "@/data/foundationMedia";

import { projects } from "@/data/projects";
import { MapEmbed } from "@/components/site/MapEmbed";
import { Counter, MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";
import { PartnerTicker } from "@/components/site/PartnerTicker";

const heroImg = assetUrl(heroAsset.url);
const educationImg = assetUrl(educationAsset.url);
const widowsImg = assetUrl(widowsAsset.url);
const washImg = assetUrl(familyAsset.url);
const healthImg = assetUrl(healthAsset.url);
const digitalImg = assetUrl(digitalAsset.url);

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
  const imgY = useTransform(scrollYProgress, [0, 1], ["-2%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const fogHeight = useTransform(scrollYProgress, [0, 1], ["38%", "56%"]);

  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const px = useSpring(0, { stiffness: 40, damping: 20 });
  const py = useSpring(0, { stiffness: 40, damping: 20 });
  useEffect(() => {
    px.set(pointer.x);
    py.set(pointer.y);
  }, [pointer, px, py]);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        setPointer({
          x: ((e.clientX - r.left) / r.width - 0.5) * -20,
          y: ((e.clientY - r.top) / r.height - 0.5) * -14,
        });
      }}
      className="relative h-[calc(100svh-5rem)] min-h-[600px] w-full overflow-hidden bg-ink grain-overlay"
    >
      <motion.div className="absolute -inset-x-[3%] -inset-y-[5%]" style={reduce ? {} : { y: imgY, scale: imgScale }}>
        <motion.img
          src={heroImg}
          alt="Schoolchildren gathered in a village courtyard at dusk in rural Punjab, Pakistan"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_35%]"
          style={reduce ? {} : { x: px, y: py }}
        />
      </motion.div>

      {/* subtle top vignette */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/40 to-transparent" />

      {/* cinematic fog rising from the bottom */}
      <motion.div
        aria-hidden
        className="fog-up absolute inset-x-0 bottom-0"
        style={reduce ? { height: "42%" } : { height: fogHeight }}
      />

      <motion.div
        style={reduce ? {} : { y: titleY, opacity: titleOpacity }}
        className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-5 pb-10 sm:px-8 sm:pb-14"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-cream/20 bg-ink/50 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
              </span>
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cream/90">
                Registered Non-Profit NGO · Lahore, Pakistan · Est. 2003
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.2rem,5.4vw,5.2rem)] font-black uppercase tracking-tight leading-[0.98] text-cream">
              <MaskLines lines={["Action where the"]} delay={0.12} />
              <MaskLines lines={["shortfall is sharpest."]} delay={0.24} />
              <span className="block text-clay mt-1">
                <MaskLines lines={["Dignity. Education. Life."]} delay={0.38} />
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/85 sm:text-base"
            >
              Where classrooms lack roofs, medical camps are rare, and widow-headed households fight for survival — Education And Life Foundation delivers free schooling, clinical care, and life-changing self-reliance across Pakistan.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-sm bg-clay px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-lg transition-all hover:bg-clay-deep hover:shadow-clay/25"
              >
                <span>Explore 12 Programmes</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-sm border border-cream/30 bg-ink/40 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream backdrop-blur-md transition-all hover:border-cream hover:bg-ink/60"
              >
                <span>Donate to Field</span>
              </Link>
              <Link
                to="/impact"
                className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-cream/75 transition-colors hover:text-cream"
              >
                <span>Field Outcomes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Floating live metrics column */}
          <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-3 lg:items-end">
            {[
              { val: "14,000+", label: "Enrolled & Supported Students" },
              { val: "4,800+", label: "Safe Community Deliveries" },
              { val: "100%", label: "Direct Field Flow · 0% Deductions" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduce ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.95 + i * 0.12, duration: 0.8 }}
                className="w-full max-w-xs rounded-sm border border-cream/15 bg-ink/55 p-4 backdrop-blur-md shadow-xl"
              >
                <div className="font-display text-2xl font-black text-clay">{stat.val}</div>
                <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-cream/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────  PROJECTS (horizontal)  ───────────────────── */

function ProjectsRail() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [distance, setDistance] = useState(0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const items = projects.map((project, i) => ({
    project,
    img: project.image,
    n: String(i + 1).padStart(2, "0"),
  }));

  useEffect(() => {
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
  }, [items.length]);

  return (
    <>
      {/* desktop: pinned horizontal journey */}
      <section
        ref={ref}
        className="relative hidden bg-sand lg:block"
        style={{ height: `${Math.max(160, 60 + items.length * 18)}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24 pb-8">
          <div className="mx-auto mb-6 flex w-full max-w-[1600px] items-end justify-between px-8">
            <h2 className="display-md max-w-[14ch] text-ink">
              Different problems. Different answers.
            </h2>
            <Link
              to="/projects"
              className="link-underline mb-2 text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-clay"
            >
              All projects
            </Link>
          </div>

          <motion.div ref={trackRef} style={reduce ? {} : { x }} className="flex gap-6 pl-8 pr-8">
            {items.map(({ project, img, n }) => (
              <Link
                key={project.slug}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group relative block h-[clamp(380px,50vh,470px)] w-[clamp(280px,26vw,360px)] shrink-0 overflow-hidden"
              >
                <img
                  src={img}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/5" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="numeral text-sm text-clay">{n}</span>
                  <h3 className="mt-2 max-w-[16ch] font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:text-3xl line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="mt-2.5 max-w-[34ch] text-xs leading-relaxed text-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:text-sm line-clamp-3">
                    {project.short}
                  </p>
                  <span className="mt-3.5 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-clay">
                    Open project <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            <Link
              to="/projects"
              className="flex h-[clamp(380px,50vh,470px)] w-[clamp(280px,26vw,360px)] shrink-0 flex-col justify-end border border-ink/15 bg-background p-7 transition-colors hover:border-clay"
            >
              <span className="numeral text-6xl text-clay/30">More</span>
              <span className="mt-4 font-display text-2xl sm:text-3xl font-bold text-ink">
                See every project
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* mobile: stacked editorial */}
      <section className="bg-sand px-5 py-14 lg:hidden">
        <h2 className="display-md text-ink">Different problems. Different answers.</h2>
        <div className="mt-8 space-y-4">
          {items.map(({ project, img, n }) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="relative block h-[58vw] min-h-[260px] max-h-[340px] overflow-hidden"
            >
              <img src={img} alt={project.name} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="numeral text-xs text-clay">{n}</span>
                <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-cream">{project.name}</h3>
              </div>
            </Link>
          ))}
          <Link
            to="/projects"
            className="flex items-center justify-between border border-ink/15 bg-background px-5 py-5 text-ink"
          >
            <span className="font-display text-lg font-bold">See every project</span>
            <ArrowUpRight className="h-5 w-5 text-clay" />
          </Link>
        </div>
      </section>
    </>
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
          alt="School students studying in an EFL supported classroom"
          className="absolute inset-0"
          strength={60}
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <h2 className="display-xl text-cream">
              <MaskLines lines={["One child"]} />
            </h2>
            <div className="mt-6 max-w-xl pl-[4%]">
              <MaskLines
                lines={["can change the arithmetic", "of an entire family."]}
                className="font-serif text-2xl italic leading-tight text-cream sm:text-4xl"
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
              Six repeatable moves. Everything EFL runs is some combination of them.
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
    <section ref={ref} className="relative h-[80svh] min-h-[500px] overflow-hidden bg-background">
      <ParallaxImage
        src={foundationMedia.widowsFoodRations}
        alt="EFL team delivering essential food rations and family welfare support"
        className="absolute inset-0"
        strength={60}
        scaleFrom={1.1}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/75" />

      <div className="absolute inset-0 mx-auto flex max-w-[1600px] items-end px-5 py-12 sm:px-8 sm:py-16">
        <motion.div
          style={reduce ? {} : { x: quoteX }}
          className="w-full max-w-xl bg-ink/75 p-7 backdrop-blur-md sm:p-9"
        >
          <span className="eyebrow">One story</span>
          <p className="mt-2 font-display text-lg font-bold tracking-tight text-cream">
            Nasreen — Lahore
          </p>
          <p className="text-xs text-cream/55">Widows Welfare Program</p>
          <blockquote className="mt-5 font-serif text-2xl italic leading-snug text-cream sm:text-3xl">
            “They did not ask me to prove I was poor. They asked what my children needed.”
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────  NUMBERS  ───────────────────────── */

function Numbers() {
  const stats = [
    { value: 4, label: "Countries supporting the work", suffix: "" },
    { value: 5, label: "Core services delivered free", suffix: "" },
  ];
  return (
    <section className="border-y border-ink/10 bg-sand py-14 sm:py-16">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 md:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-5">
            <span className="numeral text-5xl text-clay sm:text-6xl">
              <Counter to={s.value} format={(n) => Math.round(n).toString()} />
            </span>
            <span className="max-w-[18ch] text-sm uppercase tracking-[0.14em] text-ink/60">{s.label}</span>
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
            title="Map showing the EFL head office in Allama Iqbal Town, Lahore"
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
            className="mt-10 inline-flex w-fit items-center gap-3 border border-clay px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-clay transition-colors hover:bg-clay hover:text-ink"
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
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/donate"
            className="bg-ink px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-clay hover:text-ink"
          >
            Support a project
          </Link>
          <Link
            to="/book"
            className="border border-ink/25 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
          >
            Book a meeting
          </Link>
          <Link
            to="/about"
            className="border border-ink/25 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
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
