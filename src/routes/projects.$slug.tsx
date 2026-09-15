import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Droplets,
  HeartPulse,
  Music,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { MaskLines, ParallaxImage, Rise } from "@/components/site/motion-primitives";
import { SchoolMap } from "@/components/site/SchoolMap";
import { BagTracker } from "@/components/site/BagTracker";
import { SchoolBagShortcut } from "@/components/site/SchoolBagShortcut";
import { foundationMedia } from "@/data/foundationMedia";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    if (params.slug === "health-care-program" || params.slug === "wash-improvement") {
      throw redirect({ to: "/projects/$slug", params: { slug: "health-wash-community-wellbeing" } });
    }
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found — EFL" }, { name: "robots", content: "noindex" }] };
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

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 4);
  const accentClass =
    project.accent === "moss" ? "text-moss" : project.accent === "sand" ? "text-sand" : "text-clay";

  const splitHero = ["portrait", "data", "map", "object"].includes(project.layout);
  const centeredHero = project.layout === "map" || project.layout === "object";

  return (
    <article className="bg-background">
      <section className={`relative overflow-hidden ${splitHero ? "grid min-h-[72svh] lg:grid-cols-2" : "flex min-h-[68svh] sm:min-h-[76svh] flex-col justify-end"}`}>
        <ParallaxImage
          src={project.image}
          alt={project.name}
          className={splitHero ? "relative min-h-[48svh] lg:order-2 lg:min-h-[72svh]" : "absolute inset-0"}
          imgClassName={project.heroPosition}
          strength={60}
          scaleFrom={1.12}
          priority
        />
        {!splitHero && <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/28 to-ink/10" />}

        <div className={`relative z-10 flex flex-col justify-end px-5 py-12 sm:px-8 sm:py-16 ${splitHero ? "bg-sand lg:order-1 lg:px-[8vw]" : "mx-auto w-full max-w-[1600px]"}`}>
          <div className={centeredHero ? "max-w-4xl" : "max-w-3xl"}>
            <span className={`eyebrow font-bold ${splitHero ? "text-clay" : "text-cream/75"}`}>Initiative Portfolio</span>
            <h1
              className={`mt-4 font-display font-bold leading-[1.02] ${splitHero ? "text-ink" : "text-cream"} ${
                project.name.length > 34
                  ? "text-[clamp(2.5rem,5vw,5.2rem)]"
                  : "text-[clamp(3rem,6vw,6.4rem)]"
              }`}
            >
              <MaskLines lines={[project.name]} />
            </h1>
            <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${splitHero ? "text-ink/68" : "text-cream/80"}`}>{project.short}</p>
          </div>
        </div>
      </section>

      {/* ── the problem, huge ── */}
      <section className="border-b border-ink/10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">The problem</span>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className={`numeral text-[17vw] leading-[0.78] sm:text-[8vw] ${accentClass}`}>
              {project.problem.figure}
            </span>
            <span className="numeral text-[7vw] uppercase leading-none text-ink sm:text-[3.4vw]">
              {project.problem.unit}
            </span>
          </div>
          <p className="mt-6 max-w-[24ch] font-display text-2xl font-bold leading-[1.1] text-ink sm:text-4xl">
            {project.problem.line}
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink/45">
            Source: {project.problem.source} — figures pending final EFL verification
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
        </div>
      </section>

      {/* ── response, treated differently per layout ── */}
      {project.layout === "horizontal" ? (
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
            <h2 className="display-md max-w-[16ch] text-ink">What EFL does about it.</h2>
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
        <div className="mx-auto grid max-w-[1600px] gap-8 sm:grid-cols-3">
          {project.outcomes.map((o) => (
            <div key={o.label}>
              <div className="text-[0.66rem] uppercase tracking-[0.2em] text-ink/45">{o.label}</div>
              <div className="mt-2 font-display text-3xl font-bold text-ink">
                {o.value}
              </div>
            </div>
          ))}
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
            {project.gallery.map((image, index) => (
              <figure key={image} className={`group relative overflow-hidden bg-muted ${index === 0 ? "aspect-[16/10] sm:col-span-8" : "aspect-[4/3] sm:col-span-4"}`}>
                <img
                  src={image}
                  alt={`${project.name} field work ${index + 1}`}
                  loading="lazy"
                  className={`h-full w-full object-cover ${index === 0 ? project.heroPosition : "object-center"} transition-transform duration-700 group-hover:scale-[1.035]`}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── project-specific experience ── */}
      {project.slug === "education-for-all" && <SchoolMap />}

      {project.slug === "music-of-the-heart" && (
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
                  <div className="rounded-sm bg-background p-4 border border-ink/10">
                    <div className="font-display text-3xl font-black text-clay">+78%</div>
                    <div className="mt-1 text-xs text-ink/65 uppercase tracking-wider font-semibold">School Attendance Rate</div>
                  </div>
                  <div className="rounded-sm bg-background p-4 border border-ink/10">
                    <div className="font-display text-3xl font-black text-clay">53,000</div>
                    <div className="mt-1 text-xs text-ink/65 uppercase tracking-wider font-semibold">Children Scale Target</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://opus1foundation.org/music-of-the-heart/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-clay hover:text-ink transition-colors"
                  >
                    <span>Visit Opus 1 Initiative</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Opus 1 Visual Showcase */}
              <div className="grid grid-cols-2 gap-4 lg:col-span-6">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-sm aspect-[4/5] bg-ink/10 shadow-md">
                    <img
                      src={foundationMedia.musicStudentSolo}
                      alt="Student practicing violin in Music of the Heart program"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="overflow-hidden rounded-sm aspect-[4/3] bg-ink/10 shadow-md">
                    <img
                      src={foundationMedia.musicClassViolins}
                      alt="Violins unpacked in EFL classroom"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-sm aspect-[4/3] bg-ink/10 shadow-md">
                    <img
                      src={foundationMedia.musicOrchestraClass}
                      alt="Classroom orchestra rehearsal session"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="overflow-hidden rounded-sm aspect-[4/5] bg-ink/10 shadow-md">
                    <img
                      src={foundationMedia.musicConcertHall}
                      alt="Youth concert performance"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {project.slug === "school-bags" && (
        <>
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
        <section className="border-y border-ink/10 bg-sand/40 px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1600px]">
            <div className="max-w-3xl">
              <span className="eyebrow">Integrated Health & WASH Framework</span>
              <h2 className="display-md mt-4 text-ink">
                Six Pillars of Community Dignity & Wellbeing
              </h2>
              <p className="lede mt-5">
                Education And Life Foundation unites clinical medical care with essential WASH initiatives.
                By bridging direct clinical intervention, safe water infrastructure, hygiene awareness, and
                dignified sanitation, we target preventative and curative health in Punjab&apos;s most underserved areas.
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
                  tag: "Women's Health",
                  title: "Maternal Health & Menstrual Dignity",
                  icon: HeartPulse,
                  desc: "Providing women-led health education, safe menstrual hygiene kits, maternal care counsel, and confidential doctor consultations without social stigma.",
                  points: [
                    "Hygienic menstrual product distribution",
                    "Reproductive health education",
                    "Private doctor consultations",
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
                    className="flex flex-col justify-between rounded-sm border border-ink/10 bg-sand p-7 sm:p-8 transition-colors duration-300 hover:border-clay/40"
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
      )}

      {project.layout === "data" && (
        <section className="px-5 py-24 sm:px-8">
           <div className="mx-auto grid max-w-[1600px] gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {["Enrol", "Train", "Practise", "Earn"].map((step, i) => (
               <div key={step} className="bg-sand p-8">
                <span className="numeral text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                 <div className="mt-4 font-display text-2xl font-bold text-ink">{step}</div>
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
          <h2 className="display-lg max-w-[14ch] text-cream">Support this work.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/donate"
              search={{ project: project.slug }}
               className="bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground hover:bg-clay-deep"
            >
              Fund {project.name.split(" ").slice(0, 2).join(" ")}
            </Link>
            <Link
              to="/book"
              className="border border-cream/30 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream hover:border-cream"
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
