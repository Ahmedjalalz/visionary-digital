import { createFileRoute, Link } from "@tanstack/react-router";
import { useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import heroAsset from "@/assets/official/community.jpg.asset.json";
import educationAsset from "@/assets/official/education.jpg.asset.json";
import widowsAsset from "@/assets/official/widows.jpg.asset.json";
import familyAsset from "@/assets/official/family.jpg.asset.json";
import healthAsset from "@/assets/official/health.jpg.asset.json";
import digitalAsset from "@/assets/official/digital.jpg.asset.json";

import { projects } from "@/data/projects";
import { MapEmbed } from "@/components/site/MapEmbed";
import { Counter, MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";

const heroImg = heroAsset.url;
const educationImg = educationAsset.url;
const widowsImg = widowsAsset.url;
const washImg = familyAsset.url;
const healthImg = healthAsset.url;
const digitalImg = digitalAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Education and Life Foundation — Uplifting the Lives of Communities" },
      {
        name: "description",
        content:
          "26 million children in Pakistan are out of school. EFL works with deprived communities on education, healthcare, safe water and family support.",
      },
      { property: "og:title", content: "Uplifting the Lives of Communities — EFL" },
      {
        property: "og:description",
        content: "Education, healthcare and dignity for deprived communities across Pakistan.",
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
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fogHeight = useTransform(scrollYProgress, [0, 1], ["62%", "100%"]);

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
          x: ((e.clientX - r.left) / r.width - 0.5) * -26,
          y: ((e.clientY - r.top) / r.height - 0.5) * -18,
        });
      }}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink grain-overlay"
    >
      <motion.div className="absolute inset-0" style={reduce ? {} : { y: imgY, scale: imgScale }}>
        <motion.img
          src={heroImg}
          alt="Schoolchildren gathered in a village courtyard at dusk in rural Punjab, Pakistan"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover object-[55%_22%]"
          style={reduce ? {} : { x: px, y: py }}
        />
      </motion.div>

      {/* top scrim for nav legibility */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />

      {/* cinematic fog rising from the bottom */}
      <motion.div
        aria-hidden
        className="fog-up absolute inset-x-0 bottom-0"
        style={reduce ? { height: "62%" } : { height: fogHeight }}
      />

      <motion.div
        style={reduce ? {} : { y: titleY }}
        className="absolute inset-x-0 bottom-[16svh] mx-auto max-w-[1500px] px-5 sm:px-10"
      >
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="eyebrow mb-5 block text-cream/70"
        >
          Education &amp; Life Foundation — Pakistan
        </motion.span>

        <h1 className="font-display text-[clamp(2.3rem,7.4vw,7.4rem)] font-extrabold uppercase leading-[0.92] text-cream">
          <MaskLines lines={["Uplifting"]} delay={0.15} />
          <MaskLines lines={["the Lives"]} delay={0.28} />
          <span className="block text-clay">
            <MaskLines lines={["of Communities"]} delay={0.4} />
          </span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 flex flex-wrap items-end justify-between gap-6"
        >
          <p className="max-w-md text-sm leading-relaxed text-cream/85 sm:text-base">
            A Pakistani non-governmental organisation working where the shortfall is sharpest —
            classrooms, clinics, clean water, and the families holding it all together.
          </p>
          <div className="hidden items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-cream/50 md:flex">
            <span className="h-10 w-px animate-pulse bg-cream/40" />
            Scroll
          </div>
        </motion.div>
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
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      {/* desktop: pinned horizontal journey */}
      <section
        ref={ref}
        className="relative hidden bg-sand lg:block"
        style={{ height: `${100 + items.length * 42}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-10 flex w-full max-w-[1600px] items-end justify-between px-8">
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

          <motion.div style={reduce ? {} : { x }} className="flex gap-8 pl-8">
            {items.map(({ project, img, n }, i) => (
              <Link
                key={project.slug}
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group relative block shrink-0 overflow-hidden"
                style={{ width: i % 2 === 0 ? 620 : 460, height: i % 2 === 0 ? 520 : 600 }}
              >
                <img
                  src={img}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="numeral text-sm text-clay">{n}</span>
                  <h3 className="mt-2 max-w-[16ch] font-display text-3xl font-bold leading-[0.95] tracking-tight text-cream">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-cream/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {project.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-clay">
                    Open project <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            <Link
              to="/projects"
               className="flex h-[520px] w-[420px] shrink-0 flex-col justify-end border border-ink/15 bg-background p-8 transition-colors hover:border-clay"
            >
               <span className="numeral text-7xl text-clay/30">More</span>
               <span className="mt-4 font-display text-3xl font-bold text-ink">
                See every project
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* mobile: stacked editorial */}
      <section className="bg-sand px-5 py-20 lg:hidden">
        <h2 className="display-md text-ink">Different problems. Different answers.</h2>
        <div className="mt-10 space-y-4">
          {items.map(({ project, img, n }) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="relative block h-[68vw] min-h-[320px] overflow-hidden"
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
             className="flex items-center justify-between border border-ink/15 bg-background px-5 py-6 text-ink"
          >
            <span className="font-display text-xl font-bold">See every project</span>
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
       <section className="relative overflow-hidden bg-background py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <Rise>
            <div className="flex flex-wrap items-baseline gap-x-6">
               <span className="numeral text-[22vw] leading-[0.75] text-ink sm:text-[18vw]">
                <Counter to={26} format={(n) => Math.round(n).toString()} />
              </span>
              <span className="numeral text-[9vw] leading-none text-clay sm:text-[6vw]">MILLION</span>
            </div>
          </Rise>
           <div className="mt-8 grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-12">
             <p className="md:col-span-6 md:col-start-1 font-display text-3xl font-bold leading-[1.05] text-ink sm:text-5xl">
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
      <section className="relative h-[110svh] overflow-hidden">
        <ParallaxImage
          src={educationImg}
          alt="A student writing in a notebook in a classroom lit by a single window"
          className="absolute inset-0"
          strength={110}
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
                className="font-serif text-3xl italic leading-tight text-cream sm:text-5xl"
                delay={0.15}
              />
            </div>
          </div>
        </div>
      </section>

      {/* what we do — numbered, no cards */}
      <section className="paper py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md max-w-[18ch]">How the work actually happens.</h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Six repeatable moves. Everything EFL runs is some combination of them.
            </p>
          </div>
          <ul className="mt-16">
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
                className="group grid items-baseline gap-2 border-t border-ink/15 py-7 md:grid-cols-12 md:gap-8"
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
  const quoteX = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const reduce = useReducedMotion();

  return (
     <section ref={ref} className="relative bg-background">
      <div className="relative h-[130svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <ParallaxImage
            src={widowsImg}
            alt="Portrait of a widow standing in the doorway of her home"
            className="absolute inset-0"
            strength={70}
            scaleFrom={1.1}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-ink/70" />

          <div className="absolute inset-0 mx-auto flex max-w-[1600px] flex-col justify-between px-5 py-24 sm:px-8">
            <div>
              <span className="eyebrow">One story</span>
              <p className="mt-3 font-display text-xl font-bold tracking-tight text-cream sm:text-2xl">
                Nasreen — Lahore
              </p>
              <p className="text-sm text-cream/55">Widows Welfare Program</p>
            </div>

            <motion.blockquote
              style={reduce ? {} : { x: quoteX }}
              className="max-w-[20ch] font-serif text-[13vw] italic leading-[0.95] text-cream sm:max-w-[16ch] sm:text-[7vw]"
            >
              “They did not ask me to prove I was poor. They asked what my children needed.”
            </motion.blockquote>
          </div>
        </div>
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
    <section className="border-y border-ink/10 bg-sand py-20">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 md:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-5">
            <span className="numeral text-7xl text-clay sm:text-8xl">
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
        <div className="relative min-h-[420px] lg:min-h-[80svh]">
          <MapEmbed
            query="181 Raza Block, Allama Iqbal Town, Lahore, Pakistan"
            title="Map showing the EFL head office in Allama Iqbal Town, Lahore"
            className="absolute inset-0"
            zoom={15}
          />
           <div aria-hidden className="pointer-events-none absolute inset-0 bg-clay/10 mix-blend-multiply" />
        </div>

        <div className="flex flex-col justify-center px-5 py-20 sm:px-12 lg:py-0">
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
    <section className="paper relative overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <p className="eyebrow">The end of the page is not the end of the story</p>
        <h2 className="display-lg mt-6 max-w-[16ch]">
          Somewhere a child is one bag, one fee, one clinic away.
        </h2>
        <div className="mt-14 flex flex-wrap gap-3">
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
        className="pointer-events-none mt-20 select-none whitespace-nowrap font-display text-[15vw] font-extrabold leading-[0.8] tracking-[-0.07em] text-ink/[0.07]"
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
      <ProjectsRail />
      <Impact />
      <Story />
      <Numbers />
      <Location />
      <FinalCta />
    </>
  );
}
