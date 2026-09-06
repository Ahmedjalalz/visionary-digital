import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";

import heroAsset from "@/assets/official/community.jpg.asset.json";
import educationAsset from "@/assets/official/education.jpg.asset.json";
import healthAsset from "@/assets/official/health.jpg.asset.json";
import familyAsset from "@/assets/official/family.jpg.asset.json";
import widowsAsset from "@/assets/official/widows.jpg.asset.json";
import digitalAsset from "@/assets/official/digital.jpg.asset.json";

import { MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";

const heroImg = heroAsset.url;
const educationImg = educationAsset.url;
const healthImg = healthAsset.url;
const washImg = familyAsset.url;
const widowsImg = widowsAsset.url;
const digitalImg = digitalAsset.url;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Education and Life Foundation" },
      {
        name: "description",
        content:
          "Who EFL is, what we believe, and how a Lahore-based foundation works across Punjab.",
      },
      { property: "og:title", content: "About Education and Life Foundation" },
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
    name: "Founder & Chairperson",
    role: "Leadership",
    img: widowsImg,
    detail:
      "Sets EFL's direction, holds relationships with donors and partner organisations, and signs off every programme before it reaches a community.",
  },
  {
    name: "Programme Director",
    role: "Education & Schools",
    img: educationImg,
    detail:
      "Runs the schooling portfolio — enrolment, teacher support, supplies, and the attendance follow-up that keeps children in class.",
  },
  {
    name: "Health Coordinator",
    role: "Medical Camps & Midwifery",
    img: healthImg,
    detail:
      "Plans and staffs rural medical camps, manages the midwifery training pipeline, and handles referrals for patients who need more than a camp.",
  },
  {
    name: "Community Lead",
    role: "Water, Skills & Welfare",
    img: digitalImg,
    detail:
      "Works district by district on WASH improvements, skills cohorts and the monthly welfare cycle for widow-headed households.",
  },
];

const history = [
  { year: "Origins", title: "A response, not a plan", body: "EFL begins as direct assistance to families in Lahore who had fallen out of every other net — food, fees, medicine.", img: widowsImg },
  { year: "Schools", title: "Classrooms open", body: "Free schooling formalises: tuition, books, uniforms and stationery covered so cost stops deciding who learns.", img: educationImg },
  { year: "Health", title: "Camps go rural", body: "Medical camps move out of the city into districts where the nearest clinic is a journey rather than a walk.", img: healthImg },
  { year: "Water", title: "WASH added", body: "Safe water and sanitation become a programme in their own right after illness keeps emptying classrooms.", img: washImg },
  { year: "Skills", title: "From aid to income", body: "Skills and digital training launch so families exit assistance instead of depending on it.", img: digitalImg },
  { year: "Today", title: "Programmes across four countries", body: "Supporters in Pakistan, New Zealand, Canada and Germany fund work delivered by teams who live where it happens.", img: heroImg },
];

function HistoryRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["3%", "-78%"]);

  return (
    <>
      <section ref={ref} className="relative hidden h-[500vh] bg-sand lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-12 w-full max-w-[1600px] px-8">
            <span className="eyebrow">The journey</span>
             <h2 className="display-md mt-4 max-w-[18ch] text-ink">
              How a room full of urgency became a portfolio of programmes.
            </h2>
          </div>
          <motion.ol style={reduce ? {} : { x }} className="flex items-stretch gap-10 pl-8">
            {history.map((h, i) => (
              <li key={h.year} className="w-[520px] shrink-0">
                <div className="relative h-[300px] overflow-hidden">
                  <img src={h.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-ink/45" />
                  <span className="numeral absolute bottom-4 left-5 text-6xl text-cream">{h.year}</span>
                </div>
                 <div className="mt-6 border-t border-ink/15 pt-5">
                  <span className="numeral text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
                   <h3 className="mt-2 font-display text-3xl font-bold text-ink">{h.title}</h3>
                   <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-ink/60">{h.body}</p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </section>

       <section className="bg-sand px-5 py-20 lg:hidden">
        <span className="eyebrow">The journey</span>
         <h2 className="display-md mt-4 text-ink">How urgency became a portfolio of programmes.</h2>
        <ol className="mt-10 space-y-12">
          {history.map((h) => (
            <li key={h.year}>
              <div className="relative h-56 overflow-hidden">
                <img src={h.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-ink/45" />
                <span className="numeral absolute bottom-3 left-4 text-4xl text-cream">{h.year}</span>
              </div>
               <h3 className="mt-4 font-display text-2xl font-bold text-ink">{h.title}</h3>
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
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <ParallaxImage src={heroImg} alt="Children outside a village school in Punjab" className="absolute inset-0" priority strength={70} />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 mx-auto flex max-w-[1600px] items-end px-5 pb-16 sm:px-8">
          <h1 className="display-xl max-w-[12ch] text-cream">
            <MaskLines lines={["To uplift", "the deprived", "community."]} />
          </h1>
        </div>
      </section>

      {/* who we are */}
      <section className="paper py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Who we are</span>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              Education and Life Foundation is a non-governmental organisation working with deprived
              communities in Pakistan through sustainable development — free education, healthcare, food
              and financial support.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
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
         <div className="flex flex-col justify-between gap-16 bg-clay px-5 py-20 text-primary-foreground sm:px-10">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em]">Vision</span>
          <p className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            To uplift the deprived community in Pakistan.
          </p>
        </div>
         <div className="flex flex-col justify-between gap-16 bg-sand px-5 py-20 text-ink sm:px-10">
          <span className="eyebrow">Mission</span>
          <p className="font-display text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            To build a better life for the community, and to aid those who cannot help themselves.
          </p>
        </div>
      </section>

      {/* services — a list, deliberately plain */}
       <section className="bg-background px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">What the Foundation provides</span>
          <ul className="mt-10">
            {[
              "Free education for the less privileged",
              "Financial assistance to widows",
              "Free treatment and medicine for poor patients",
              "Food support for families in need",
              "Marriage support for orphan girls",
            ].map((s, i) => (
              <li
                key={s}
                 className="group flex items-baseline gap-6 border-t border-ink/10 py-6 last:border-b"
              >
                <span className="numeral text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
                 <span className="font-display text-[6vw] font-bold leading-[1.02] text-ink transition-transform duration-700 group-hover:translate-x-3 sm:text-4xl">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* team — the card IS the image */}
       <section className="bg-background px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
             <h2 className="display-md max-w-[14ch] text-ink">Meet the people behind it.</h2>
             <p className="max-w-sm text-sm text-ink/55">
              Roles shown are current. Names and photographs will be replaced with EFL's own on approval.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Rise key={m.name} delay={i * 0.06}>
                <figure className="group relative aspect-[3/4] overflow-hidden">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <div className="font-display text-2xl font-bold leading-tight tracking-tight text-cream">
                      {m.name}
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] text-clay">{m.role}</div>
                  </figcaption>
                  <div className="absolute inset-0 flex flex-col justify-end bg-ink/90 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="font-display text-2xl font-bold tracking-tight text-cream">{m.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-clay">{m.role}</div>
                    <p className="mt-4 text-sm leading-relaxed text-cream/75">{m.detail}</p>
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

      <section className="paper px-5 py-24 sm:px-8">
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
