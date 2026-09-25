import { useState } from "react";
import { Counter, Rise } from "@/components/site/motion-primitives";
import { PAKISTAN_PROVINCES, PAKISTAN_FULL_VIEWBOX } from "@/data/pakistanMapPaths";

interface ProvinceDetail {
  key: "punjab" | "sindh" | "kpk" | "balochistan";
  name: string;
  nativeName?: string;
  figure: number;
  unit: string;
  sharePercent: number;
  capital: string;
  focusArea: string;
  description: string;
}

const PROVINCES_DATA: ProvinceDetail[] = [
  {
    key: "punjab",
    name: "Punjab",
    figure: 9.7,
    unit: "million",
    sharePercent: 37,
    capital: "Lahore",
    focusArea: "Brick kilns, rural south & urban squatter settlements",
    description:
      "As Pakistan's most populous province, Punjab carries the highest raw burden of children outside school gates. Expanding informal urban belts, agricultural child labor in southern rural districts, and hidden household costs for bags, uniforms, and books push millions out before completing primary grades.",
  },
  {
    key: "sindh",
    name: "Sindh",
    figure: 7.4,
    unit: "million",
    sharePercent: 28,
    capital: "Karachi",
    focusArea: "Interior rural districts, flood-affected tehsils & tenant families",
    description:
      "Severe rural-urban divides, agrarian tenancy, and catastrophic recurring flood damage across lower Sindh leave over 50% of rural school-age children without an operational classroom or teacher, making dropouts permanent when basic school materials cannot be afforded.",
  },
  {
    key: "kpk",
    name: "Khyber Pakhtunkhwa (KPK)",
    figure: 4.5,
    unit: "million",
    sharePercent: 17,
    capital: "Peshawar",
    focusArea: "Mountain valley settlements, newly merged districts & female continuation",
    description:
      "Steep mountainous topography, long commuting distances between valley villages, and a severe shortage of dedicated girls' middle and secondary schools create an acute cliff in attendance once children finish elementary grades.",
  },
  {
    key: "balochistan",
    name: "Balochistan",
    figure: 3.5,
    unit: "million",
    sharePercent: 14,
    capital: "Quetta",
    focusArea: "Vast arid distances, zero-school union councils & remote pastoral hubs",
    description:
      "Holding the country's highest proportional deprivation rate, over 65% of children have no accessible primary school within safe walking reach. Extreme geographic dispersion leaves entire union councils completely devoid of basic learning infrastructure.",
  },
];

export function ProvincialEducationCensus({
  className = "",
  showHeadline = true,
}: {
  className?: string;
  showHeadline?: boolean;
}) {
  const [activeProvince, setActiveProvince] = useState<string>("punjab");

  return (
    <section
      id="provincial-census"
      aria-label="Out-of-school children aged 5-16 in Pakistan by province"
      className={`relative overflow-hidden bg-[#FAF8F5] text-ink border-y border-ink/20 py-16 sm:py-24 ${className}`}
    >
      {/* Decorative vintage newspaper background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#143055_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Newspaper Top Folio / Masthead Bar */}
        <div className="border-b-2 border-ink pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-ink/70">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-clay" />
              <span className="font-bold text-ink">ELF Special Broadsheet Report</span>
              <span className="hidden sm:inline text-ink/40">·</span>
              <span className="hidden sm:inline">National Education Crisis Desk</span>
            </div>
            <div className="hidden md:block text-ink/60">
              Official Census &amp; UNESCO Demographic Survey
            </div>
            <div className="font-semibold text-clay">
              Aged 5–16 Years
            </div>
          </div>
        </div>

        {/* Lead Headline & 26 Million Hero Figure */}
        {showHeadline && (
          <div className="mt-8 grid gap-8 border-b border-ink/20 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Rise>
                <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-clay mb-4">
                  National Demographic Reality
                </div>
                <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
                  <span className="numeral text-[19vw] leading-[0.78] font-bold text-ink sm:text-[11vw] lg:text-[7.8rem]">
                    <Counter to={26.2} decimals={1} duration={1600} />
                  </span>
                  <span className="numeral text-[8.5vw] leading-none font-bold text-clay sm:text-[5vw] lg:text-[4rem]">
                    MILLION
                  </span>
                </div>
              </Rise>
              <h3 className="mt-5 font-serif text-2xl font-bold leading-[1.12] text-ink sm:text-4xl lg:text-[2.6rem]">
                Out-of-school children aged 5–16 in Pakistan.
              </h3>
            </div>

            <div className="lg:col-span-5 font-serif space-y-4">
              <p className="text-base sm:text-lg leading-relaxed text-ink/80">
                Pakistan confronts the world&apos;s second-largest out-of-school population. Behind this staggering figure lies a solvable barrier: the cost of a bag, notebooks, pencils, uniforms, and the everyday dignity required to walk through a school gate without being turned away.
              </p>
              <div className="pt-3 border-t border-ink/15 flex flex-wrap items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/55">
                <span>Total 5–16 Demographic: ~52.5M</span>
                <span className="text-clay font-bold font-mono">Out-of-School: ~49.9%</span>
              </div>
            </div>
          </div>
        )}

        {/* Section Dispatch Title */}
        <div className="my-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-clay">
              Provincial Registry · Field Dispatches
            </span>
            <h4 className="mt-1 font-serif text-xl sm:text-2xl font-bold text-ink">
              Breakdown by Province: The Missing Classroom Generation
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink/60">
            <span>Hover or tap to view map outline</span>
          </div>
        </div>

        {/* 4 Provinces Newspaper Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink/20 border border-ink/30 bg-background shadow-xs">
          {PROVINCES_DATA.map((prov) => {
            const mapData = PAKISTAN_PROVINCES[prov.key];
            const isHovered = activeProvince === prov.key;

            return (
              <article
                key={prov.key}
                onMouseEnter={() => setActiveProvince(prov.key)}
                onClick={() => setActiveProvince(prov.key)}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 transition-colors duration-200 cursor-pointer ${
                  isHovered ? "bg-sand/35" : "hover:bg-sand/20"
                }`}
              >
                {/* Column Masthead */}
                <div>
                  <div className="flex items-center justify-between border-b border-ink/15 pb-3">
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-ink/65">
                      {prov.name}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-clay bg-clay/10 px-2 py-0.5 rounded">
                      {prov.sharePercent}% Share
                    </span>
                  </div>

                  {/* Province Map Outline Feature Box */}
                  <div className="mt-5 rounded-md border border-ink/15 bg-sand/30 p-3 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-clay/40 group-hover:bg-clay/5">
                    <div className="h-36 w-full flex items-center justify-center">
                      {mapData && (
                        <svg
                          viewBox={mapData.viewBox}
                          className="h-full w-full max-h-32 object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                          preserveAspectRatio="xMidYMid meet"
                          aria-label={`Geographic map outline of ${prov.name}`}
                        >
                          {/* Province Boundary Stroke according to Theme Colors */}
                          <path
                            d={mapData.d}
                            className={`transition-all duration-300 ${
                              isHovered
                                ? "fill-clay/20 stroke-clay stroke-[2.5]"
                                : "fill-clay/8 stroke-clay/70 stroke-[1.8] group-hover:fill-clay/15 group-hover:stroke-clay"
                            }`}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="mt-2 w-full text-center border-t border-ink/10 pt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/50">
                      Map Outline · {prov.name} Boundary
                    </div>
                  </div>

                  {/* Big Number Headline */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="numeral text-4xl sm:text-5xl font-extrabold text-clay">
                        {prov.figure}
                      </span>
                      <span className="numeral text-xl sm:text-2xl font-bold uppercase text-ink">
                        {prov.unit}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/60">
                      Children Out of School
                    </div>
                  </div>

                  {/* 1-2 Lines Description in Newspaper Broadsheet Type */}
                  <div className="mt-4 pt-3 border-t border-ink/10 font-serif text-[13.5px] sm:text-[14px] leading-relaxed text-ink/80">
                    <p className="text-justify sm:text-left">
                      {prov.description}
                    </p>
                  </div>
                </div>

                {/* Newspaper Column Footnote / Dispatch Note */}
                <div className="mt-6 pt-3 border-t border-dashed border-ink/20 font-mono text-[10px] text-ink/60 space-y-1">
                  <div>
                    <span className="text-ink/40 uppercase">Capital:</span>{" "}
                    <span className="font-semibold text-ink/80">{prov.capital}</span>
                  </div>
                  <div className="line-clamp-2">
                    <span className="text-ink/40 uppercase">Vulnerable:</span>{" "}
                    <span>{prov.focusArea}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* National Context & Interactive Whole Pakistan Composite Map */}
        <div className="mt-10 rounded-xl border border-ink/20 bg-background p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Map Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-clay mb-2">
                Pakistan Provincial Silhouette
              </span>
              <div className="relative h-64 sm:h-72 w-full max-w-sm flex items-center justify-center p-2">
                <svg
                  viewBox={PAKISTAN_FULL_VIEWBOX}
                  className="h-full w-full object-contain"
                  preserveAspectRatio="xMidYMid meet"
                  aria-label="Complete map of Pakistan with highlighted provinces"
                >
                  {/* Gilgit Baltistan / Northern Areas */}
                  {PAKISTAN_PROVINCES["gilgitBaltistan"] && (
                    <path
                      d={PAKISTAN_PROVINCES["gilgitBaltistan"].d}
                      className="fill-sand/60 stroke-ink/25 stroke-[1.2]"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* Azad Kashmir */}
                  {PAKISTAN_PROVINCES["azadKashmir"] && (
                    <path
                      d={PAKISTAN_PROVINCES["azadKashmir"].d}
                      className="fill-sand/60 stroke-ink/25 stroke-[1.2]"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* ICT */}
                  {PAKISTAN_PROVINCES["islamabad"] && (
                    <path
                      d={PAKISTAN_PROVINCES["islamabad"].d}
                      className="fill-clay/40 stroke-clay stroke-[1.5]"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* 4 Main Provinces with interactive states */}
                  {(["balochistan", "punjab", "sindh", "kpk"] as const).map((key) => {
                    const p = PAKISTAN_PROVINCES[key];
                    const isActive = activeProvince === key;
                    if (!p) return null;
                    return (
                      <path
                        key={key}
                        d={p.d}
                        onClick={() => setActiveProvince(key)}
                        onMouseEnter={() => setActiveProvince(key)}
                        className={`cursor-pointer transition-all duration-200 stroke-[1.5] ${
                          isActive
                            ? "fill-clay stroke-clay-deep"
                            : "fill-clay/15 stroke-clay/60 hover:fill-clay/35 hover:stroke-clay"
                        }`}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {(["punjab", "sindh", "kpk", "balochistan"] as const).map((key) => {
                  const isActive = activeProvince === key;
                  const label = key === "kpk" ? "KPK" : key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveProvince(key)}
                      className={`px-3 py-1 rounded font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                        isActive
                          ? "bg-clay text-cream"
                          : "bg-sand text-ink/75 hover:bg-clay/10 hover:text-clay"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context Editorial Column */}
            <div className="lg:col-span-7 space-y-4 font-serif">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-clay">
                <span>The Solvable Link: School Bags &amp; Daily Dignity</span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-ink leading-tight">
                Why a single bag changes the provincial drop-out trajectory.
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-ink/75">
                In government surveys and ELF field reporting across Punjab, Sindh, KPK, and Balochistan, the primary trigger for absenteeism is rarely a lack of desire to learn — it is acute poverty manifesting in missing stationery, torn notebooks, or shame from being sent home for lack of materials.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-ink/75">
                By equipping a child with a durable, year-long school bag packed with every required textbook, notebook, pencil case, and geometry set, Education And Life Foundation eliminates the immediate financial burden on vulnerable families, ensuring the child remains enrolled and protected in school.
              </p>

              <div className="pt-4 border-t border-ink/10 flex flex-wrap items-center gap-6 font-mono text-xs text-ink/65">
                <div>
                  <span className="font-bold text-clay text-sm sm:text-base">100% Trackable:</span> Every bag given carries a verifiable sponsor tracking code.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newspaper Bottom Folio */}
        <div className="mt-8 border-t border-ink/20 pt-3 flex flex-wrap items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-ink/50">
          <span>Education and Life Foundation (ELF) · Registered Charity</span>
          <span>Demographic Baseline 2026</span>
        </div>
      </div>
    </section>
  );
}
