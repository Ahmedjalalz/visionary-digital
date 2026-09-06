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
          "Eleven programmes across education, health, water, maternal care, digital skills and family support in Pakistan.",
      },
      { property: "og:title", content: "EFL Projects" },
      {
        property: "og:description",
        content: "Eleven programmes, each built around one specific problem.",
      },
    ],
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  const [hover, setHover] = useState<string | null>(null);
  const active = projects.find((p) => p.slug === hover);

  return (
    <>
      <section className="relative overflow-hidden bg-ink px-5 pb-16 pt-40 sm:px-8 sm:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Eleven programmes</span>
          <h1 className="display-lg mt-6 max-w-[13ch] text-cream">
            <MaskLines lines={["Each one starts", "with a problem,", "not a brochure."]} />
          </h1>
        </div>
      </section>

      {/* index list with a floating preview — no card grid */}
      <section className="relative bg-ink pb-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <ul onMouseLeave={() => setHover(null)}>
            {projects.map((p, i) => (
              <li key={p.slug} className="border-t border-white/10 last:border-b">
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  onMouseEnter={() => setHover(p.slug)}
                  className="group flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-10"
                >
                  <span className="numeral w-12 shrink-0 text-sm text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-[7vw] font-bold leading-[0.95] tracking-[-0.04em] text-cream transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:text-4xl lg:text-5xl">
                    {p.name}
                  </span>
                  <span className="hidden max-w-[34ch] text-sm leading-relaxed text-cream/50 lg:block">
                    {p.short}
                  </span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-cream/30 transition-colors group-hover:text-clay" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {active && (
          <div className="pointer-events-none fixed right-10 top-1/2 hidden w-[26vw] max-w-sm -translate-y-1/2 xl:block">
            <img
              key={active.slug}
              src={active.image}
              alt=""
              aria-hidden
              className="h-[52vh] w-full object-cover shadow-2xl"
            />
          </div>
        )}
      </section>
    </>
  );
}
