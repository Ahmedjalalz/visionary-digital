import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight, School, Users, CheckCircle2 } from "lucide-react";
import { Counter, Rise } from "@/components/site/motion-primitives";
import { PAKISTAN_PROVINCES, PAKISTAN_FULL_VIEWBOX } from "@/data/pakistanMapPaths";
import { PROVINCIAL_DISTRIBUTION_DATA } from "@/data/schoolBagsDistributionData";

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
  const [activeProvince, setActiveProvince] = useState<"punjab" | "sindh" | "kpk" | "balochistan">("punjab");
  const [activeDistrictId, setActiveDistrictId] = useState<string>("lahore");

  const handleSelectProvince = (provKey: "punjab" | "sindh" | "kpk" | "balochistan") => {
    setActiveProvince(provKey);
    const data = PROVINCIAL_DISTRIBUTION_DATA[provKey];
    if (data?.districts.length && data.districts[0]) {
      setActiveDistrictId(data.districts[0].id);
    }
  };

  const currentProvCoverage =
    PROVINCIAL_DISTRIBUTION_DATA[activeProvince] || PROVINCIAL_DISTRIBUTION_DATA.punjab;
  const currentDistrict =
    currentProvCoverage.districts.find((d) => d.id === activeDistrictId) ||
    currentProvCoverage.districts[0];

  return (
    <section
      id="provincial-census"
      aria-label="Out-of-school children aged 5-16 in Pakistan by province"
      className={`relative overflow-hidden bg-sand/30 text-ink border-y border-ink/10 py-20 sm:py-28 ${className}`}
    >
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* Top Folio / Category Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-clay" />
            <span className="eyebrow text-clay">National Demographic Reality</span>
            <span className="hidden sm:inline text-ink/30">·</span>
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-ink/60">
              Education &amp; Life Foundation Field Intelligence
            </span>
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink/50">
            Aged 5–16 Years · Census &amp; UNESCO Survey
          </div>
        </div>

        {/* Lead Headline & 26.2 Million Hero Figure */}
        {showHeadline && (
          <div className="mt-10 grid gap-8 border-b border-ink/10 pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Rise>
                <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay mb-5">
                  Critical Challenge
                </div>
                <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-6">
                  <span className="numeral text-[18vw] leading-[0.8] font-bold text-ink sm:text-[10vw] lg:text-[7.5rem]">
                    <Counter to={26.2} decimals={1} duration={1600} />
                  </span>
                  <span className="font-display text-[8vw] leading-none font-black uppercase text-clay sm:text-[4vw] lg:text-[3.8rem]">
                    MILLION
                  </span>
                </div>
              </Rise>
              <h3 className="display-sm mt-5 text-ink">
                Out-of-school children aged 5–16 in Pakistan.
              </h3>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <p className="lede text-ink/75">
                Pakistan confronts the world&apos;s second-largest out-of-school population. Behind
                this staggering figure lies a solvable barrier: the cost of a bag, notebooks,
                pencils, uniforms, and the everyday dignity required to walk through a school gate
                without being turned away.
              </p>
              <div className="pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2.5 text-xs font-semibold uppercase tracking-wider text-ink/60">
                <span>Total 5–16 Demographic: ~52.5M</span>
                <span className="animate-pulse-aggressive inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold tracking-wider text-red-600 dark:border-red-400/35 dark:bg-red-500/15 dark:text-red-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
                  </span>
                  <span>Out-of-School: ~49.9%</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section Dispatch Title */}
        <div className="my-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ink/10 pb-5">
          <div>
            <span className="eyebrow text-clay">Provincial Registry · Field Dispatches</span>
            <h4 className="display-sm mt-2 text-ink">
              Breakdown by Province: The Missing Classroom Generation
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
            <span>Hover or tap to view map outline &amp; district coverage</span>
          </div>
        </div>

        {/* 4 Provinces Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROVINCES_DATA.map((prov) => {
            const mapData = PAKISTAN_PROVINCES[prov.key];
            const isHovered = activeProvince === prov.key;

            return (
              <article
                key={prov.key}
                onMouseEnter={() => handleSelectProvince(prov.key)}
                onClick={() => handleSelectProvince(prov.key)}
                className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "border-clay bg-background shadow-md -translate-y-1"
                    : "border-ink/10 bg-background/80 hover:border-clay/40 hover:bg-background hover:shadow-xs"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                    <span className="font-display text-base font-bold text-ink">
                      {prov.name}
                    </span>
                    <span className="rounded-full bg-clay/10 px-2.5 py-0.5 text-xs font-bold text-clay uppercase tracking-wider">
                      {prov.sharePercent}% Share
                    </span>
                  </div>

                  {/* Province Map Outline Feature Box */}
                  <div className="mt-5 rounded-xl border border-ink/10 bg-sand/40 p-4 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-clay/30 group-hover:bg-clay/5">
                    <div className="h-32 w-full flex items-center justify-center">
                      {mapData && (
                        <svg
                          viewBox={mapData.viewBox}
                          className="h-full w-full max-h-28 object-contain transition-transform duration-300 group-hover:scale-105"
                          preserveAspectRatio="xMidYMid meet"
                          aria-label={`Geographic map outline of ${prov.name}`}
                        >
                          <path
                            d={mapData.d}
                            className={`transition-all duration-300 ${
                              isHovered
                                ? "fill-clay/20 stroke-clay stroke-[2.2]"
                                : "fill-clay/10 stroke-clay/70 stroke-[1.6] group-hover:fill-clay/15 group-hover:stroke-clay"
                            }`}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="mt-2 w-full text-center border-t border-ink/10 pt-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                      Map Outline · {prov.name}
                    </div>
                  </div>

                  {/* Big Number Headline */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="numeral text-4xl sm:text-5xl font-black text-clay">
                        {prov.figure}
                      </span>
                      <span className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                        {prov.unit}
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/50">
                      Children Out of School
                    </div>
                  </div>

                  {/* 1-2 Lines Description in Clean Modern Sans Typography */}
                  <div className="mt-4 pt-3 border-t border-ink/10 text-xs sm:text-sm leading-relaxed text-ink/75 font-normal">
                    <p>{prov.description}</p>
                  </div>
                </div>

                {/* Card Footnote */}
                <div className="mt-6 pt-3 border-t border-ink/10 text-xs text-ink/60 space-y-1">
                  <div>
                    <span className="font-bold text-ink/70 uppercase text-[10px] tracking-wider">
                      Capital:
                    </span>{" "}
                    <span className="font-semibold text-ink">{prov.capital}</span>
                  </div>
                  <div className="line-clamp-2">
                    <span className="font-bold text-ink/70 uppercase text-[10px] tracking-wider">
                      Priority:
                    </span>{" "}
                    <span>{prov.focusArea}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* National Context & Interactive Whole Pakistan Composite Map */}
        <div className="mt-12 rounded-3xl border border-ink/10 bg-background p-6 sm:p-10 shadow-xs">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* Map Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="eyebrow text-clay mb-3">
                Interactive Pakistan Map
              </span>
              <div className="relative h-64 sm:h-72 w-full max-w-sm flex items-center justify-center p-2 rounded-2xl bg-sand/30 border border-ink/5">
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
                      className="fill-sand/60 stroke-ink/20 stroke-[1.2]"
                      strokeLinejoin="round"
                    />
                  )}
                  {/* Azad Kashmir */}
                  {PAKISTAN_PROVINCES["azadKashmir"] && (
                    <path
                      d={PAKISTAN_PROVINCES["azadKashmir"].d}
                      className="fill-sand/60 stroke-ink/20 stroke-[1.2]"
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
                        onClick={() => handleSelectProvince(key)}
                        onMouseEnter={() => handleSelectProvince(key)}
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

              {/* Province Toggle Buttons */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {(["punjab", "sindh", "kpk", "balochistan"] as const).map((key) => {
                  const isActive = activeProvince === key;
                  const label = key === "kpk" ? "KPK" : key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectProvince(key)}
                      onMouseEnter={() => handleSelectProvince(key)}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-clay text-primary-foreground shadow-xs"
                          : "bg-sand text-ink/75 hover:bg-clay/15 hover:text-clay"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Context & District/School Coverage Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-clay" />
                    <span className="eyebrow text-clay">
                      {currentProvCoverage.name} Field Coverage
                    </span>
                  </div>
                  <div className="text-xs font-bold">
                    {currentProvCoverage.status === "active" ? (
                      <span className="rounded-full bg-clay/10 px-3 py-1 text-clay font-bold uppercase tracking-wider">
                        {currentProvCoverage.totalStudents.toLocaleString()} Students Sponsored · {currentProvCoverage.totalSchools} Schools
                      </span>
                    ) : (
                      <span className="rounded-full bg-sand px-3 py-1 text-ink/60 uppercase tracking-wider">
                        Field Survey Pipeline
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-display text-2xl font-bold text-ink">
                    {currentProvCoverage.status === "active"
                      ? `Districts Covered in ${currentProvCoverage.name}`
                      : `${currentProvCoverage.name} Assessment & Expansion Pipeline`}
                  </h4>
                  <p className="mt-1 text-sm text-ink/70 leading-relaxed font-normal">
                    {currentProvCoverage.status === "active"
                      ? `Hover or tap any district below to see the specific schools supported and students sponsored by ELF.`
                      : currentProvCoverage.pipelineNote}
                  </p>
                </div>

                {/* District Selection Chips */}
                <div className="mt-5 flex flex-wrap gap-2 border-b border-ink/10 pb-4">
                  {currentProvCoverage.districts.map((d) => {
                    const isDistrictActive = currentDistrict?.id === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onMouseEnter={() => setActiveDistrictId(d.id)}
                        onClick={() => setActiveDistrictId(d.id)}
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isDistrictActive
                            ? "bg-clay text-primary-foreground shadow-xs"
                            : "bg-sand text-ink/75 hover:bg-clay/15 hover:text-clay"
                        }`}
                      >
                        <span>{d.name}</span>
                        {d.totalStudents > 0 && (
                          <span
                            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                              isDistrictActive
                                ? "bg-cream/20 text-cream"
                                : "bg-ink/10 text-ink/70"
                            }`}
                          >
                            {d.totalStudents}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Schools List for Active District */}
                {currentDistrict && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between pb-2.5 text-xs font-bold uppercase tracking-wider text-ink/55">
                      <span>
                        Schools in {currentDistrict.name} ({currentDistrict.schools.length})
                      </span>
                      {currentDistrict.totalStudents > 0 && (
                        <span className="font-bold text-clay">
                          {currentDistrict.totalStudents} Total Sponsored
                        </span>
                      )}
                    </div>

                    <div className="max-h-[300px] overflow-y-auto pr-1 space-y-3">
                      {currentDistrict.schools.map((school, sIdx) => (
                        <div
                          key={school.name + (school.bagCodes || sIdx)}
                          className="rounded-xl border border-ink/10 bg-sand/30 p-4 hover:border-clay/40 hover:bg-background transition-all shadow-2xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h5 className="font-display text-base font-bold text-ink leading-snug">
                                {school.name}
                              </h5>
                              <p className="mt-1 text-xs text-ink/65 flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 shrink-0 text-clay" />
                                <span className="truncate">{school.location}</span>
                              </p>
                            </div>
                            {school.totalStudents > 0 ? (
                              <div className="text-right shrink-0">
                                <span className="font-display text-xl font-black text-clay">
                                  {school.totalStudents}
                                </span>
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-ink/50">
                                  Students
                                </span>
                              </div>
                            ) : (
                              <span className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink/60">
                                Surveyed
                              </span>
                            )}
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-ink/10 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/65">
                            <div className="flex items-center gap-2">
                              {school.female !== undefined && school.female !== "-" && (
                                <span className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-bold text-ink/80 border border-ink/10">
                                  {school.female} Girls · {school.male} Boys
                                </span>
                              )}
                              {school.phase && (
                                <span className="text-ink/60 font-medium text-[11px]">
                                  {school.phase}
                                </span>
                              )}
                            </div>
                            {school.bagCodes && (
                              <span className="text-clay font-semibold text-[11px]">
                                Codes: {school.bagCodes}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Summary Bar */}
              <div className="mt-6 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/65 font-medium">
                <div>
                  <span className="font-bold text-clay">100% End-to-End Traceable:</span> Every
                  bag given carries a named recipient tracking ID.
                </div>
                {currentProvCoverage.status === "pipeline" && (
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-1 font-bold text-clay hover:underline uppercase text-xs"
                  >
                    <span>Sponsor this Province</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Folio Bar */}
        <div className="mt-10 border-t border-ink/10 pt-4 flex flex-wrap items-center justify-between text-xs font-medium uppercase tracking-wider text-ink/50">
          <span>Education And Life Foundation (ELF) · Verified Field Registry</span>
          <span>Demographic Baseline 2026</span>
        </div>
      </div>
    </section>
  );
}
