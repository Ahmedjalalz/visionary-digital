import { useState } from "react";
import { MapEmbed } from "@/components/site/MapEmbed";

export interface School {
  name: string;
  area: string;
  students: number;
  query: string;
}

/** Schools supported by EFL. Replace with verified EFL records when supplied. */
export const schools: School[] = [
  { name: "EFL Community School — Raza Block", area: "Allama Iqbal Town, Lahore", students: 240, query: "181 Raza Block, Allama Iqbal Town, Lahore, Pakistan" },
  { name: "Govt. Primary School, Chak 42", area: "Sheikhupura District", students: 180, query: "Sheikhupura, Punjab, Pakistan" },
  { name: "Learning Centre — Kot Lakhpat", area: "Kot Lakhpat, Lahore", students: 130, query: "Kot Lakhpat, Lahore, Pakistan" },
  { name: "Girls' Study Centre — Green Town", area: "Green Town, Lahore", students: 95, query: "Green Town, Lahore, Pakistan" },
  { name: "Brick Kiln Children's School", area: "Raiwind Road, Lahore", students: 120, query: "Raiwind Road, Lahore, Pakistan" },
  { name: "Community Class — Kasur", area: "Kasur District", students: 85, query: "Kasur, Punjab, Pakistan" },
];

export function SchoolMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = schools[activeIndex];

  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8">
        <span className="eyebrow">School coverage</span>
        <h2 className="display-md mt-4 max-w-[18ch] text-cream">
          Every pin is a roof, a teacher and a register of names.
        </h2>
      </div>

      <div className="mt-14 grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="max-h-[80svh] overflow-y-auto border-t border-white/10">
          {schools.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={s.name}
                onClick={() => setActiveIndex(i)}
                aria-current={isActive}
                className={`group flex w-full items-start gap-5 border-b border-white/10 px-5 py-7 text-left transition-colors sm:px-8 ${
                  isActive ? "bg-clay/10" : "hover:bg-white/[0.04]"
                }`}
              >
                <span className="relative mt-1 flex h-3 w-3 shrink-0">
                  {isActive && <span className="pulse-ring absolute inset-0 rounded-full bg-clay/60" />}
                  <span
                    className={`relative h-3 w-3 rounded-full ${isActive ? "bg-clay" : "bg-cream/25"}`}
                  />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl font-bold leading-tight text-cream">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-sm text-cream/50">{s.area}</span>
                </span>
                <span className="numeral shrink-0 text-2xl text-clay">{s.students}</span>
              </button>
            );
          })}
          <p className="px-5 py-6 text-xs uppercase tracking-[0.16em] text-cream/35 sm:px-8">
            Student counts are indicative and pending EFL verification.
          </p>
        </div>

        <div className="relative min-h-[440px] lg:min-h-[80svh]">
          <MapEmbed
            key={active.query}
            query={active.query}
            title={`Map showing ${active.name}`}
            className="absolute inset-0"
            zoom={14}
          />
          <div className="pointer-events-none absolute bottom-6 left-6 max-w-xs bg-ink/85 p-5 backdrop-blur-md">
            <span className="eyebrow">Selected</span>
            <p className="mt-2 font-display text-lg font-bold leading-tight text-cream">{active.name}</p>
            <p className="text-sm text-cream/55">{active.area}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
