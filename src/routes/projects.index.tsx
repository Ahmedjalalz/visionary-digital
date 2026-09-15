import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { projects } from "@/data/projects";
import { MaskLines } from "@/components/site/motion-primitives";
import { Button } from "@/components/ui/button";

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
    slug === "midwifery-program" ||
    slug === "pregnancy-support-pakistan"
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
              <Button
                key={cat.id}
                type="button"
                variant="ghost"
                onClick={() => setActiveFilter(cat.id)}
                className={`h-auto rounded-none border-b-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] shadow-none ${
                  activeFilter === cat.id
                    ? "border-clay text-clay"
                    : "border-transparent text-ink/55 hover:bg-transparent hover:text-ink"
                }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-background pb-28 pt-12 sm:pt-16">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col justify-between border-t border-ink/15 pt-5 transition-colors"
              >
                <div>
                  <div className="relative overflow-hidden bg-muted aspect-[16/10] rounded-xs">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className={`h-full w-full object-cover ${p.heroPosition} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                    />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      <span className="numeral bg-background/90 px-2.5 py-1 text-xs font-semibold text-clay shadow-xs backdrop-blur-xs">
                        {String(projects.findIndex((item) => item.slug === p.slug) + 1).padStart(2, "0")}
                      </span>
                      {p.problem?.figure && (
                        <span className="bg-ink/80 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-cream backdrop-blur-xs">
                          {p.problem.figure} {p.problem.unit}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="font-display text-lg font-bold text-ink transition-colors group-hover:text-clay sm:text-xl line-clamp-1">
                      {p.name}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-2">
                      {p.short}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs">
                  <span className="text-[0.68rem] font-medium uppercase tracking-wider text-ink/50">
                    {p.outcomes?.[0]?.value || "Direct Field Program"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-clay transition-transform group-hover:translate-x-0.5">
                    <span>Explore</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
