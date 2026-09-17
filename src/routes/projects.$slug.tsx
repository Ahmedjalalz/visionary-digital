import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  Baby,
  Droplets,
  HeartPulse,
  Music,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Counter, MaskLines, ParallaxImage, Rise } from "@/components/site/motion-primitives";
import { SchoolMap } from "@/components/site/SchoolMap";
import { BagTracker } from "@/components/site/BagTracker";
import { SchoolBagShortcut } from "@/components/site/SchoolBagShortcut";
import { foundationMedia } from "@/data/foundationMedia";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
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
        className="mt-6 inline-flex items-center justify-center rounded-md bg-clay px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-clay-deep"
      >
        View All Programmes
      </Link>
    </div>
  ),
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

              return (
                <figure key={image} className={`group relative overflow-hidden bg-muted ${spanClass}`}>
                  <img
                    src={image}
                    alt={`${project.name} field work ${index + 1}`}
                    loading="lazy"
                    className={`h-full w-full object-cover ${index === 0 ? project.heroPosition : "object-center"} transition-transform duration-700 group-hover:scale-[1.035]`}
                  />
                </figure>
              );
            })}
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
        <>
          {/* ── dedicated pregnant women support section ── */}
          <section className="border-y border-ink/10 bg-sand/30 px-5 py-24 sm:px-8 sm:py-28">
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
              <div className="mt-14 rounded-sm border border-clay/25 bg-background p-8 sm:p-12 shadow-sm">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-5">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay">
                      Maternal Health Emergency
                    </span>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-4">
                      <span className="numeral text-[18vw] leading-[0.78] sm:text-[7.5rem] font-bold text-clay">
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
                  <div className="p-5 rounded-sm bg-sand/60 border border-ink/5">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      <Counter to={11000} duration={1600} />
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Annual Maternal Deaths</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Pakistan accounts for over 4.1% of the entire global burden of maternal mortality (WHO).
                    </p>
                  </div>
                  <div className="p-5 rounded-sm bg-sand/60 border border-ink/5">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      <Counter to={44.3} decimals={1} duration={1500} />%
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Rural Maternal Anaemia</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Severe micronutrient deficiency creating critical risk of fatal postpartum hemorrhage (NNS).
                    </p>
                  </div>
                  <div className="p-5 rounded-sm bg-sand/60 border border-ink/5">
                    <div className="numeral text-3xl sm:text-4xl font-bold text-ink">
                      <Counter to={51} duration={1500} />%
                    </div>
                    <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-clay">Unscreened Pregnancies</div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      Rural mothers receiving zero or inadequate antenatal checks, leaving preeclampsia undetected (PDHS).
                    </p>
                  </div>
                  <div className="p-5 rounded-sm bg-sand/60 border border-ink/5">
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

              {/* EFL's 4-Tier Pregnancy Intervention Model */}
              <div className="mt-16 sm:mt-20">
                <div className="max-w-2xl">
                  <span className="eyebrow">Our Ground Intervention</span>
                  <h3 className="display-sm mt-3 text-ink">How EFL Protects Expectant Mothers</h3>
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
                        className="flex flex-col justify-between rounded-sm border border-ink/10 bg-background p-6 transition-all duration-300 hover:border-clay/40 hover:shadow-sm"
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
                  <div className="group overflow-hidden rounded-sm border border-ink/10 bg-background transition-colors duration-300 hover:border-clay/40">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={foundationMedia.maternalAntenatalCheckup}
                        alt="Clinical Antenatal Checkup"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

                  <div className="group overflow-hidden rounded-sm border border-ink/10 bg-background transition-colors duration-300 hover:border-clay/40">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={foundationMedia.maternalLhvConsultation}
                        alt="Lady Health Visitor Home Consultation"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

                  <div className="group overflow-hidden rounded-sm border border-ink/10 bg-background transition-colors duration-300 hover:border-clay/40">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={foundationMedia.maternalEflCare}
                        alt="EFL Nutrition Support and Infant Formula"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-clay">Newborn Nutrition</span>
                      <h4 className="font-display text-base font-bold text-ink mt-1">Infant Formula & Postpartum Aid</h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70">
                        EFL volunteers distributing high-grade infant formula (Lactogen), safe feeding bottles, and maternal supplements to prevent infant malnourishment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Callout */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-sm border border-clay/30 bg-clay/5 p-6 sm:p-8">
                  <div>
                    <h4 className="font-display text-xl font-bold text-ink">Support a Mother Through Safe Childbirth</h4>
                    <p className="mt-1 text-xs sm:text-sm text-ink/70 max-w-xl">
                      Your sponsorship funds a full package of prenatal micronutrients, Lady Health Visitor home consultations, clean birth delivery essentials, and emergency medical referral coverage.
                    </p>
                  </div>
                  <Link
                    to="/donate"
                    search={{ project: "health-wash-community-wellbeing" }}
                    className="bg-clay px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground hover:bg-clay-deep transition-colors"
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
      </>
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
