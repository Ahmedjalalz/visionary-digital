import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { MaskLines } from "@/components/site/motion-primitives";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Education and Life Foundation" },
      {
        name: "description",
        content:
          "Programmes across education, health, water, maternal care, digital skills and family support in Pakistan.",
      },
      { property: "og:title", content: "EFL Projects" },
      {
        property: "og:description",
        content: "Every programme is built around one specific problem.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <>
      <section className="relative overflow-hidden bg-sand px-5 pb-16 pt-40 sm:px-8 sm:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Our programmes</span>
          <h1 className="display-lg mt-6 max-w-[13ch] text-ink">
            <MaskLines lines={["Each one starts", "with a problem,", "not a brochure."]} />
          </h1>
        </div>
      </section>

      {/* index list — each row reveals its own image in place on hover */}
      <section className="relative bg-background pb-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <ul>
            {projects.map((p, i) => (
              <li key={p.slug} className="border-t border-ink/10 last:border-b">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex flex-col gap-3 py-6 md:flex-row md:items-center md:gap-8"
                >
                  <span className="numeral w-10 shrink-0 pt-1 text-xs text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <img
                    src={p.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-40 w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-0 md:w-40 md:opacity-0 md:group-hover:h-24 md:group-hover:opacity-100"
                  />

                  <span className="flex-1 font-display text-2xl font-bold leading-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-3xl">
                    {p.name}
                  </span>
                  <span className="hidden max-w-[34ch] text-sm leading-relaxed text-ink/55 lg:block">
                    {p.short}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition-colors group-hover:text-clay" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
