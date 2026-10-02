import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { projects } from "@/data/projects";
import { MaskLines } from "@/components/site/motion-primitives";
import { ProjectHighlightCards } from "@/components/site/ProjectHighlightCards";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Programmes & Initiatives — Education And Life Foundation" },
      {
        name: "description",
        content:
          "Explore ELF programmes across education, health, maternal care, clean water, skills training, and widow welfare in Pakistan.",
      },
      { property: "og:title", content: "ELF Programmes & Initiatives" },
      {
        property: "og:description",
        content: "Every programme is built around one specific, urgent problem in Pakistan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    slug === "health-wash-community-wellbeing" ||
    slug === "midwifery-program"
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
      <section className="relative overflow-hidden bg-sand px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-2.5 text-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            <span className="eyebrow text-clay">Direct Field Operations</span>
          </div>
          <h1 className="display-lg mt-5 max-w-[16ch] text-ink">
            <MaskLines lines={["Each one starts", "with a problem,", "not a brochure."]} />
          </h1>
          <p className="lede mt-6 max-w-2xl text-ink/75">
            Focused initiatives serving underprivileged families across Punjab. Every programme is built around direct community needs and verifiable outcomes.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-5">
            <span className="mr-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                  activeFilter === cat.id
                    ? "bg-clay text-cream shadow-xs"
                    : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-background pb-28 pt-12 sm:pt-16">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group relative flex flex-col justify-between h-full rounded-2xl border border-ink/10 bg-white/75 dark:bg-card/75 backdrop-blur-xs p-5 sm:p-6 shadow-xs hover:border-clay/45 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top ambient hover accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-clay/0 via-clay/70 to-clay/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  <div className="relative overflow-hidden bg-ink/10 aspect-[16/10] rounded-xl shadow-2xs group-hover:shadow-xs transition-shadow">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={`h-full w-full object-cover ${p.heroPosition} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15" />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="numeral inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-xs font-black text-clay shadow-xs backdrop-blur-md dark:bg-card/95 dark:text-clay-bright ring-1 ring-black/5 dark:ring-white/10">
                        {String(projects.findIndex((item) => item.slug === p.slug) + 1).padStart(2, "0")}
                      </span>
                      {p.problem?.figure && (
                        <span className="inline-flex items-center rounded-full bg-ink/90 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-md ring-1 ring-white/15">
                          {p.problem.figure} {p.problem.unit}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4.5 sm:mt-5">
                    <h2 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-clay sm:text-xl line-clamp-1">
                      {p.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-cream/70 line-clamp-2 min-h-[2.6rem]">
                      {p.short}
                    </p>
                  </div>

                  {/* Highlights ticker */}
                  <ProjectHighlightCards project={p} />
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ink/8 dark:border-white/10 pt-4 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-ink/55 dark:text-cream/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-clay/80" />
                    {p.outcomes?.[0]?.value || "Direct Field Program"}
                  </span>
                  <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-clay transition-colors group-hover:text-clay-deep dark:group-hover:text-clay-bright">
                    <span>Explore</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-clay/10 text-clay transition-all duration-300 group-hover:bg-clay group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
