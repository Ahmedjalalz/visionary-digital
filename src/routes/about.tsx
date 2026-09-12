import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";

import heroAsset from "@/assets/official/community.jpg.asset.json";
import educationAsset from "@/assets/official/education.jpg.asset.json";
import healthAsset from "@/assets/official/health.jpg.asset.json";
import familyAsset from "@/assets/official/family.jpg.asset.json";
import widowsAsset from "@/assets/official/widows.jpg.asset.json";
import digitalAsset from "@/assets/official/digital.jpg.asset.json";
import { assetUrl } from "@/lib/asset";
import { foundationMedia } from "@/data/foundationMedia";

import { MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";

const heroImg = assetUrl(heroAsset.url);
const educationImg = assetUrl(educationAsset.url);
const healthImg = assetUrl(healthAsset.url);
const washImg = assetUrl(familyAsset.url);
const widowsImg = assetUrl(widowsAsset.url);
const digitalImg = assetUrl(digitalAsset.url);

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Education And Life Foundation" },
      {
        name: "description",
        content:
          "Who EFL is, our origins since 2003, and how a Lahore-based NGO serves marginalized communities across Punjab.",
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

const team = [
  {
    name: "Abdul Rahman Khan",
    role: "Founder & Chairperson",
    img: foundationMedia.chairpersonPortrait,
    detail:
      "Guides EFL's strategic direction, stewardship of partner trust, and signs off every programme before it reaches a community.",
  },
  {
    name: "Dr. Zoya Khan",
    role: "Programme Director — Education",
    img: foundationMedia.directorPortrait,
    detail:
      "Leads community schooling, teacher development, classroom infrastructure, and the daily attendance tracking that keeps vulnerable students enrolled.",
  },
  {
    name: "Dr. Sonu Bashir",
    role: "Chief Health Coordinator",
    img: foundationMedia.healthCampDoctor,
    detail:
      "Directs mobile rural medical camps, free medicine dispensaries, and coordinates community midwifery placement across Punjab.",
  },
  {
    name: "Tariq Mahmood",
    role: "Community Lead — Welfare & WASH",
    img: foundationMedia.communityLeadPortrait,
    detail:
      "Oversees monthly widow welfare rations, clean water hand-pump installations, and vocational skills placement cohorts.",
  },
];

const history = [
  { year: "Origins", title: "A response, not a plan", body: "EFL begins as direct assistance to families in Lahore who had fallen out of every other net — food, fees, medicine.", img: foundationMedia.widowsFoodRations },
  { year: "Schools", title: "Classrooms open", body: "Free schooling formalises: tuition, books, uniforms and stationery covered so cost stops deciding who learns.", img: foundationMedia.classroomDesks },
  { year: "Health", title: "Camps go rural", body: "Medical camps move out of the city into districts where the nearest clinic is a journey rather than a walk.", img: foundationMedia.healthCampDoctor },
  { year: "Water", title: "WASH added", body: "Safe water and sanitation become a programme in their own right after illness keeps emptying classrooms.", img: washImg },
  { year: "Skills", title: "From aid to income", body: "Vocational and digital training launch so families exit assistance instead of depending on it.", img: foundationMedia.skillsSewingMachine },
  { year: "Today", title: "Programmes across four countries", body: "Supporters in Pakistan, New Zealand, Canada and Germany fund work delivered by teams who live where it happens.", img: foundationMedia.schoolStudents },
];

function HistoryRail() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [distance, setDistance] = useState(0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

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
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="relative hidden bg-sand lg:block"
        style={{ height: `${Math.max(160, 60 + history.length * 20)}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24 pb-8">
          <div className="mx-auto mb-8 w-full max-w-[1600px] px-8">
            <span className="eyebrow">The journey</span>
            <h2 className="display-md mt-3 max-w-[18ch] text-ink">
              How a room full of urgency became a portfolio of programmes.
            </h2>
          </div>
          <motion.ol ref={trackRef} style={reduce ? {} : { x }} className="flex items-stretch gap-8 pl-8 pr-8">
            {history.map((h, i) => (
              <li key={h.year} className="w-[440px] shrink-0">
                <div className="relative h-[240px] overflow-hidden rounded-[2px]">
                  <img src={h.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover object-[center_30%]" />
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

      <section className="bg-sand px-5 py-14 lg:hidden">
        <span className="eyebrow">The journey</span>
        <h2 className="display-md mt-3 text-ink">How urgency became a portfolio of programmes.</h2>
        <ol className="mt-8 space-y-10">
          {history.map((h) => (
            <li key={h.year}>
              <div className="relative h-52 overflow-hidden rounded-[2px]">
                <img src={h.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover object-[center_30%]" />
                <div className="absolute inset-0 bg-ink/45" />
                <span className="numeral absolute bottom-3 left-4 text-4xl text-cream">{h.year}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{h.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      {/* hero — typographic, image behind */}
      <section className="relative flex min-h-[68svh] w-full flex-col justify-end overflow-hidden pb-14 pt-24 sm:min-h-[76svh] sm:pb-20">
        <ParallaxImage src={foundationMedia.schoolStudents} alt="Children outside an EFL village school in Punjab" className="absolute inset-0" imgClassName="object-[50%_32%]" priority strength={45} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/42 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div>
            <span className="eyebrow text-clay font-bold block mb-3">Founded 2003 · Lahore, Pakistan</span>
            <h1 className="display-xl max-w-[12ch] text-cream">
              <MaskLines lines={["To uplift", "the deprived", "community."]} />
            </h1>
          </div>
        </div>
      </section>

      {/* who we are */}
      <section className="paper py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Who we are</span>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              Education and Life Foundation is a non-governmental organisation working with deprived
              communities in Pakistan through sustainable development — free education, healthcare, food
              and financial support.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <p className="text-base leading-relaxed text-ink/70">
                We provide schooling and medical care where the state's reach thins out, and financial
                support to widows and low-income families holding households together alone.
              </p>
              <p className="text-base leading-relaxed text-ink/70">
                Our skill development programmes turn that support into self-reliance: practical training,
                employment, and a route out of dependence rather than a longer stay inside it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* vision / mission — split, oversized */}
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 bg-clay px-5 py-16 text-primary-foreground sm:px-10 sm:py-20">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] opacity-80">Vision</span>
          <p className="font-display text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            To uplift the deprived community in Pakistan.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-12 bg-sand px-5 py-16 text-ink sm:px-10 sm:py-20">
          <span className="eyebrow">Mission</span>
          <p className="font-display text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            To build a better life for the community, and to aid those who cannot help themselves.
          </p>
        </div>
      </section>

      {/* services — rich visual card showcase */}
      <section className="border-b border-ink/10 bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Direct Provisions</span>
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
                img: foundationMedia.schoolStudents,
                badge: "Education",
              },
              {
                title: "Monthly Rations & Widow Support",
                desc: "Direct nutritional rations and living stipends delivered with dignity to households headed solely by widows.",
                img: foundationMedia.widowsFoodRations,
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
                img: foundationMedia.cleanWaterPump,
                badge: "WASH",
              },
              {
                title: "Vocational Skills & Micro-Enterprise",
                desc: "Industrial sewing machines and computer literacy cohorts turning immediate relief into lifelong self-reliance.",
                img: foundationMedia.skillsSewingMachine,
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
                <div className="group relative overflow-hidden rounded-sm border border-ink/10 bg-sand/30 transition-all hover:border-clay/50 hover:bg-sand/60 hover:shadow-md">
                  <div className="relative h-48 w-full overflow-hidden bg-ink/10">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-60" />
                    <span className="absolute left-3 top-3 rounded-sm bg-ink/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cream backdrop-blur-sm">
                      {s.badge}
                    </span>
                    <span className="numeral absolute bottom-2.5 right-3 text-2xl font-black text-cream/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6">
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

      {/* team — the card IS the image */}
      <section className="bg-background px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">Leadership</span>
              <h2 className="display-md mt-2 max-w-[14ch] text-ink">Meet the People Behind It</h2>
            </div>
            <p className="max-w-sm text-sm text-ink/55">
              Experienced leaders and ground coordinators dedicated to transparent, compassionate execution.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Rise key={m.name} delay={i * 0.06}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-[2px] bg-ink/10">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-[center_22%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-cream">
                      {m.name}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-cream/70">{m.role}</div>
                  </figcaption>
                  <div className="absolute inset-0 flex flex-col justify-end bg-ink/90 p-5 sm:p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-cream">{m.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-cream/70">{m.role}</div>
                    <p className="mt-3 text-sm leading-relaxed text-cream/80">{m.detail}</p>
                  </div>
                  {/* mobile: details always readable below the fold of the image */}
                  <p className="sr-only">{m.detail}</p>
                </figure>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <HistoryRail />

      <section className="paper px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-8">
          <h2 className="display-lg max-w-[14ch]">Come and see the work.</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/projects" className="bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground hover:bg-clay-deep">
              The projects
            </Link>
            <Link to="/book" className="border border-ink/25 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] hover:border-ink">
              Book a meeting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
