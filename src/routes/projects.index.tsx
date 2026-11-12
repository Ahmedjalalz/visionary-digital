import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { projects } from "@/data/projects";
import { MaskLines } from "@/components/site/motion-primitives";
import { ProjectCard } from "@/components/site/ProjectCard";
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
  if (
    slug === "education-for-all" ||
    slug === "music-of-the-heart" ||
    slug === "school-bags" ||
    slug === "faith-hope-love-for-every-child"
  ) {
    return "education";
  }
  if (
    slug === "health-wash-community-wellbeing" ||
    slug === "midwifery-program" ||
    slug === "women-health-hygiene-empowerment"
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
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => {
              const originalIndex = projects.findIndex((item) => item.slug === p.slug);
              return (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  index={originalIndex >= 0 ? originalIndex : 0}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
