import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Music } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { MaskLines, ParallaxImage, Rise } from "@/components/site/motion-primitives";
import { SchoolMap } from "@/components/site/SchoolMap";
import { BagTracker } from "@/components/site/BagTracker";
import { foundationMedia } from "@/data/foundationMedia";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
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

  const heroLeft = project.layout === "portrait" || project.layout === "data";

  return (
    <article className="bg-background">
      {/* ── hero ── */}
      <section className="relative min-h-[52svh] sm:min-h-[58svh] w-full flex flex-col justify-center overflow-hidden pt-16 pb-14 sm:pt-20 sm:pb-16">
        <ParallaxImage
          src={project.image}
          alt={project.name}
          className="absolute inset-0"
          strength={60}
          scaleFrom={1.12}
          priority
        />
        <div
          className={`absolute inset-0 ${
            heroLeft
              ? "bg-gradient-to-r from-ink/85 via-ink/40 to-transparent"
              : "bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20"
          }`}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className={heroLeft ? "max-w-3xl" : "w-full"}>
            <span className="eyebrow text-clay font-bold">Initiative Portfolio</span>
            <h1
              className={`mt-3 font-display font-black uppercase leading-[1.04] text-cream ${
                project.name.length > 34
                  ? "text-[6vw] sm:text-[3.2vw] lg:text-[2.8vw]"
                  : "text-[7.5vw] sm:text-[4.5vw] lg:text-[3.8vw]"
              }`}
            >
              <MaskLines lines={[project.name]} />
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-cream/80">{project.short}</p>
          </div>
        </div>
      </section>

      {/* ── the problem, huge ── */}
      <section className="border-b border-ink/10 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">The problem</span>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className={`numeral text-[18vw] leading-[0.78] sm:text-[9vw] ${accentClass}`}>
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

      <section className="px-5 py-16 sm:px-8 sm:py-22">
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <figure key={image} className="group relative aspect-[4/3] overflow-hidden rounded-[2px] bg-ink/10">
                <img
                  src={image}
                  alt={`${project.name} field work ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
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
        <section className="relative overflow-hidden px-5 py-28 sm:px-8">
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
      <section className="relative h-[70svh] overflow-hidden">
        <ParallaxImage src={project.image} alt="" className="absolute inset-0" strength={60} />
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
