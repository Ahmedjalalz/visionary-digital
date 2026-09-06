import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { MaskLines, ParallaxImage, Rise } from "@/components/site/motion-primitives";
import { SchoolMap } from "@/components/site/SchoolMap";
import { BagTracker } from "@/components/site/BagTracker";

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
    <article className="bg-ink">
      {/* ── hero ── */}
      <section className="relative h-[92svh] min-h-[560px] overflow-hidden">
        <ParallaxImage
          src={project.image}
          alt={project.name}
          className="absolute inset-0"
          strength={80}
          scaleFrom={1.14}
          priority
        />
        <div
          className={`absolute inset-0 ${
            heroLeft
              ? "bg-gradient-to-r from-ink/90 via-ink/40 to-transparent"
              : "bg-gradient-to-t from-ink via-ink/35 to-ink/50"
          }`}
        />
        <div className="absolute inset-0 mx-auto flex max-w-[1600px] items-end px-5 pb-16 sm:px-8">
          <div className={heroLeft ? "max-w-2xl" : "w-full"}>
            <span className="eyebrow">Project</span>
            <h1
              className={`mt-4 font-display font-extrabold uppercase leading-[0.86] tracking-[-0.045em] text-cream ${
                project.name.length > 34
                  ? "text-[9vw] sm:text-[5.4vw]"
                  : "text-[13vw] sm:text-[7.5vw]"
              }`}
            >
              <MaskLines lines={[project.name]} />
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70">{project.short}</p>
          </div>
        </div>
      </section>

      {/* ── the problem, huge ── */}
      <section className="border-b border-white/10 px-5 py-24 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">The problem</span>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className={`numeral text-[24vw] leading-[0.74] sm:text-[15vw] ${accentClass}`}>
              {project.problem.figure}
            </span>
            <span className="numeral text-[9vw] uppercase leading-none text-cream sm:text-[5vw]">
              {project.problem.unit}
            </span>
          </div>
          <p className="mt-8 max-w-[24ch] font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream sm:text-6xl">
            {project.problem.line}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-cream/40">
            Source: {project.problem.source} — figures pending final EFL verification
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-12">
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
        <section className="relative overflow-hidden py-24">
          <div
            aria-hidden
            className="pointer-events-none select-none whitespace-nowrap font-display text-[14vw] font-extrabold leading-none tracking-[-0.06em] text-cream/[0.06]"
          >
            <span className="inline-block marquee-track">
              {`${project.name.toUpperCase()} · `.repeat(6)}
            </span>
          </div>
          <div className="mx-auto mt-16 max-w-[1600px] px-5 sm:px-8">
            <h2 className="display-md max-w-[16ch] text-cream">What EFL does about it.</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {project.response.map((r, i) => (
                <Rise key={i} delay={i * 0.08}>
                  <p className="text-lg leading-relaxed text-cream/75">{r}</p>
                </Rise>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="paper py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
            <h2 className="display-md lg:col-span-5">Our response.</h2>
            <div className="space-y-7 lg:col-span-6 lg:col-start-7">
              {project.response.map((r, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink/75">
                  {r}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── outcomes strip ── */}
      <section className="border-y border-white/10 px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1600px] gap-8 sm:grid-cols-3">
          {project.outcomes.map((o) => (
            <div key={o.label}>
              <div className="text-[0.66rem] uppercase tracking-[0.2em] text-cream/40">{o.label}</div>
              <div className="mt-2 font-display text-3xl font-bold tracking-tight text-cream">
                {o.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── project-specific experience ── */}
      {project.slug === "education-for-all" && <SchoolMap />}

      {project.slug === "school-bags" && (
        <section className="relative overflow-hidden px-5 py-28 sm:px-8">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Sponsors</span>
              <h2 className="display-md mt-4 max-w-[15ch] text-cream">
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
          <div className="mx-auto grid max-w-[1600px] gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {["Enrol", "Train", "Practise", "Earn"].map((step, i) => (
              <div key={step} className="bg-ink p-8">
                <span className="numeral text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-4 font-display text-2xl font-bold tracking-tight text-cream">{step}</div>
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
              className="bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink hover:bg-cream"
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
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Continue</span>
          <ul className="mt-8">
            {others.map((p) => (
              <li key={p.slug} className="border-t border-white/10 last:border-b">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <span className="font-display text-2xl font-bold tracking-tight text-cream transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {p.name}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-cream/30 group-hover:text-clay" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
