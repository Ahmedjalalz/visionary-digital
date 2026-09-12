import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowUpRight, CheckCircle2, Filter } from "lucide-react";
import { projects } from "@/data/projects";
import { MaskLines } from "@/components/site/motion-primitives";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Programmes & Initiatives — Education And Life Foundation" },
      {
        name: "description",
        content:
          "Explore EFL programmes across education, health, maternal care, clean water, skills training, and widow welfare in Pakistan.",
      },
      { property: "og:title", content: "EFL Programmes & Initiatives" },
      {
        property: "og:description",
        content: "Every programme is built around one specific, urgent problem in Pakistan.",
      },
    ],
  }),
  component: ProjectsIndex,
});

const filterCategories = [
  { id: "all", label: "All Programmes" },
  { id: "education", label: "Education & Music" },
  { id: "health", label: "Health & Maternal" },
  { id: "welfare", label: "Widow Support & Relief" },
  { id: "skills", label: "Skills & Capacity" },
] as const;

function getProjectCategory(slug: string): string {
  if (slug === "education-for-all" || slug === "music-of-the-heart" || slug === "school-bags") {
    return "education";
  }
  if (
    slug === "health-care-program" ||
    slug === "midwifery-program" ||
    slug === "pregnancy-support-pakistan" ||
    slug === "wash-improvement"
  ) {
    return "health";
  }
  if (
    slug === "hope-and-freedom-for-widows-headed-families" ||
    slug === "widows-welfare"
  ) {
    return "welfare";
  }
  return "skills";
}

function ProjectsIndex() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => getProjectCategory(p.slug) === activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* Landing header */}
      <section className="relative overflow-hidden bg-sand px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-2.5 text-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            <span className="eyebrow text-clay">Direct Field Operations</span>
          </div>
          <h1 className="display-lg mt-4 max-w-[15ch] text-ink">
            <MaskLines lines={["Each one starts", "with a problem,", "not a brochure."]} />
          </h1>
          <p className="lede mt-6 max-w-2xl text-ink/75">
            Focused initiatives serving underprivileged families across Punjab. Every programme is built around direct community needs and verifiable outcomes.
          </p>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-4 border-t border-ink/10">
            <span className="mr-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? "bg-clay text-primary-foreground shadow-sm"
                    : "bg-background/80 text-ink/70 hover:bg-background hover:text-ink border border-ink/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Directory */}
      <section className="relative bg-background pb-24 pt-8">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, i) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-ink/10 bg-sand/30 p-5 transition-all duration-300 hover:border-clay/60 hover:bg-sand/60 hover:shadow-lg"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-56 w-full overflow-hidden rounded-sm bg-ink/10">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Index badge */}
                    <div className="absolute left-3 top-3 rounded bg-ink/80 px-2 py-1 backdrop-blur-sm">
                      <span className="font-mono text-xs font-bold text-cream">
                        {String(projects.findIndex((item) => item.slug === p.slug) + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Problem stat chip */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 rounded bg-sand/90 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="font-bold text-clay text-xs">{p.problem.figure} {p.problem.unit}</span>
                      <span className="text-[0.68rem] text-ink/70 truncate">— {p.problem.line}</span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="mt-5">
                    <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-clay">
                      {p.name}
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink/65 line-clamp-2">
                      {p.short}
                    </p>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                  <span>Explore Programme</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
