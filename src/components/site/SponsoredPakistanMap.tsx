import { useState, useMemo } from "react";
import {
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Filter,
  Compass,
} from "lucide-react";
import {
  PAKISTAN_PROVINCES,
  PAKISTAN_FULL_VIEWBOX,
  type ProvinceKey,
} from "@/data/pakistanMapPaths";
import {
  SPONSORED_SCHOOLS_DATA,
  TOTAL_SPONSORED_SCHOOLS,
  TOTAL_SPONSORED_STUDENTS,
  type SponsoredSchool,
} from "@/data/sponsoredSchoolsData";

export interface DistrictPinConfig {
  id: string;
  name: string;
  province: "Punjab" | "Sindh" | "Azad Jammu & Kashmir";
  provinceKey: ProvinceKey;
  subDistrictsLabel?: string;
  x: number;
  y: number;
  match: (school: SponsoredSchool) => boolean;
}

export const SPONSORED_DISTRICT_PINS: DistrictPinConfig[] = [
  // ── SINDH ──
  {
    id: "karachi",
    name: "Karachi",
    province: "Sindh",
    provinceKey: "sindh",
    subDistrictsLabel: "Coastal fishing settlements & Forward Action Schools",
    x: 408,
    y: 858,
    match: (s) => s.district === "Karachi",
  },
  {
    id: "sanghar",
    name: "Sanghar",
    province: "Sindh",
    provinceKey: "sindh",
    subDistrictsLabel: "Interior agrarian belt & rural primary hubs",
    x: 498,
    y: 772,
    match: (s) => s.district === "Sanghar",
  },

  // ── SOUTH PUNJAB ──
  {
    id: "rahim-yar-khan",
    name: "Rahim Yar Khan",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Southern Punjab border region & rural clusters",
    x: 586,
    y: 648,
    match: (s) => s.district === "Rahim Yar Khan",
  },
  {
    id: "multan",
    name: "Multan",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Pyara Pully, Purana Dunyapur & brick kiln sites",
    x: 644,
    y: 554,
    match: (s) => s.district === "Multan",
  },
  {
    id: "khanewal",
    name: "Khanewal",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Khanewal City, Jahania & Mian Channu clusters",
    x: 668,
    y: 536,
    match: (s) => s.district.toLowerCase().includes("khanewal"),
  },

  // ── CENTRAL PUNJAB ──
  {
    id: "toba-tek-singh",
    name: "Toba Tek Singh",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Toba Tek Singh, Jhang Road & Gojra tehsils",
    x: 704,
    y: 492,
    match: (s) => s.district.toLowerCase().includes("toba"),
  },
  {
    id: "faisalabad",
    name: "Faisalabad",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Industrial brick kilns & rural weaver hubs",
    x: 732,
    y: 460,
    match: (s) => s.district === "Faisalabad",
  },
  {
    id: "nankana-sahib",
    name: "Nankana Sahib",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Holy Infant & rural community schooling",
    x: 760,
    y: 450,
    match: (s) => s.district === "Nankana Sahib",
  },
  {
    id: "kasur",
    name: "Kasur",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Small Flock bonded labor brick-kiln colonies",
    x: 806,
    y: 476,
    match: (s) => s.district === "Kasur",
  },
  {
    id: "lahore",
    name: "Lahore",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Youhanabad, Nawa Kot, Green Town & urban settlements",
    x: 810,
    y: 446,
    match: (s) => s.district === "Lahore",
  },
  {
    id: "sheikhupura",
    name: "Sheikhupura",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Bhikhi, Tayamor, Jandiala Sher Khan & rural belts",
    x: 780,
    y: 430,
    match: (s) => s.district === "Sheikhupura",
  },
  {
    id: "gujranwala",
    name: "Gujranwala",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Semi-urban industrial edge & village school clusters",
    x: 782,
    y: 390,
    match: (s) => s.district === "Gujranwala",
  },
  {
    id: "narowal",
    name: "Narowal",
    province: "Punjab",
    provinceKey: "punjab",
    subDistrictsLabel: "Eastern border farming settlements",
    x: 828,
    y: 396,
    match: (s) => s.district === "Narowal",
  },

  // ── AZAD JAMMU & KASHMIR ──
  {
    id: "mirpur",
    name: "Mirpur / Mangla",
    province: "Azad Jammu & Kashmir",
    provinceKey: "azadKashmir",
    subDistrictsLabel: "Mangla Dam foothills & border settlement",
    x: 754,
    y: 334,
    match: (s) => s.district.toLowerCase().includes("mirpur"),
  },
];

interface SponsoredPakistanMapProps {
  onSelectDistrictFilter?: (districtName: string) => void;
  className?: string;
}

export function SponsoredPakistanMap({
  onSelectDistrictFilter,
  className = "",
}: SponsoredPakistanMapProps) {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("khanewal");
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [provinceFilter, setProvinceFilter] = useState<"All" | "Punjab" | "Sindh" | "Azad Jammu & Kashmir">("All");

  // Aggregate schools for each district pin
  const districtDataList = useMemo(() => {
    return SPONSORED_DISTRICT_PINS.map((pin) => {
      const schools = SPONSORED_SCHOOLS_DATA.filter(pin.match);
      const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
      const totalBoys = schools.reduce((sum, s) => sum + (s.boys || 0), 0);
      const totalGirls = schools.reduce((sum, s) => sum + (s.girls || 0), 0);
      const categories = Array.from(new Set(schools.map((s) => s.category)));

      return {
        ...pin,
        schools,
        schoolsCount: schools.length,
        totalStudents,
        totalBoys,
        totalGirls,
        hasGenderMetrics: totalBoys > 0 || totalGirls > 0,
        categories,
      };
    });
  }, []);

  // Filtered districts for list view & pins
  const visibleDistricts = useMemo(() => {
    if (provinceFilter === "All") return districtDataList;
    return districtDataList.filter((d) => d.province === provinceFilter);
  }, [districtDataList, provinceFilter]);

  // Current active district
  const activeDistrict = useMemo(() => {
    return (
      districtDataList.find((d) => d.id === selectedDistrictId) ||
      districtDataList[0]
    );
  }, [districtDataList, selectedDistrictId]);

  // Province-level totals
  const provinceCounts = useMemo(() => {
    return {
      Punjab: districtDataList
        .filter((d) => d.province === "Punjab")
        .reduce((sum, d) => sum + d.schoolsCount, 0),
      Sindh: districtDataList
        .filter((d) => d.province === "Sindh")
        .reduce((sum, d) => sum + d.schoolsCount, 0),
      "Azad Jammu & Kashmir": districtDataList
        .filter((d) => d.province === "Azad Jammu & Kashmir")
        .reduce((sum, d) => sum + d.schoolsCount, 0),
    };
  }, [districtDataList]);

  return (
    <div className={`rounded-3xl border border-ink/10 bg-background/90 dark:bg-background/95 p-5 sm:p-8 lg:p-10 shadow-sm ${className}`}>
      
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-clay mb-2.5">
            <Compass className="h-3.5 w-3.5" />
            <span>Geographic Intelligence · Pakistan Map</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Institutional Presence Across 14 Districts
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-ink/70 max-w-2xl">
            Interactive map visualizing our {TOTAL_SPONSORED_SCHOOLS} partner schools and {TOTAL_SPONSORED_STUDENTS.toLocaleString()} sponsored scholars across Pakistan. Click or hover any district pin to inspect institutional coverage.
          </p>
        </div>

        {/* Province Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
          <span className="text-xs font-semibold text-ink/50 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Region:
          </span>
          {(["All", "Punjab", "Sindh", "Azad Jammu & Kashmir"] as const).map((prov) => {
            const isSelected = provinceFilter === prov;
            const count =
              prov === "All"
                ? TOTAL_SPONSORED_SCHOOLS
                : provinceCounts[prov];

            return (
              <button
                key={prov}
                onClick={() => {
                  setProvinceFilter(prov);
                  // Auto-select first district in that province
                  if (prov !== "All") {
                    const firstInProv = districtDataList.find((d) => d.province === prov);
                    if (firstInProv) setSelectedDistrictId(firstInProv.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-clay text-cream shadow-xs"
                    : "border border-ink/10 bg-background/80 text-ink/70 hover:border-clay/40 hover:text-ink"
                }`}
              >
                <span>{prov === "Azad Jammu & Kashmir" ? "AJK" : prov}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                    isSelected ? "bg-white/20 text-cream" : "bg-ink/10 text-ink/60"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Section: Map (Left) + District Details (Right) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* ── LEFT: INTERACTIVE SVG MAP ── */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          <div className="relative w-full rounded-2xl border border-ink/10 bg-sand/25 dark:bg-card/40 p-3 sm:p-6 overflow-hidden flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px]">
            
            {/* Map Legend & District Indicator */}
            <div className="w-full flex items-center justify-between text-xs text-ink/60 pb-3 mb-2 border-b border-ink/10">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                  <span className="font-semibold text-ink">Active Districts ({districtDataList.length})</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sand/80 dark:bg-sand/30" />
                  <span>National Territory</span>
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-clay uppercase">
                {activeDistrict ? activeDistrict.name : "Select a pin"}
              </span>
            </div>

            {/* Pakistan SVG Canvas */}
            <div className="relative w-full max-w-[540px] aspect-[1000/959] flex items-center justify-center">
              <svg
                viewBox={PAKISTAN_FULL_VIEWBOX}
                className="w-full h-full object-contain filter drop-shadow-xs"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Map of Pakistan showing sponsored districts"
              >
                {/* ── BACKGROUND PROVINCES ── */}
                
                {/* Balochistan (Neutral) */}
                {PAKISTAN_PROVINCES.balochistan && (
                  <path
                    d={PAKISTAN_PROVINCES.balochistan.d}
                    className="fill-sand/40 dark:fill-card/40 stroke-ink/15 stroke-[1.2]"
                    strokeLinejoin="round"
                  />
                )}

                {/* KPK (Neutral) */}
                {PAKISTAN_PROVINCES.kpk && (
                  <path
                    d={PAKISTAN_PROVINCES.kpk.d}
                    className="fill-sand/40 dark:fill-card/40 stroke-ink/15 stroke-[1.2]"
                    strokeLinejoin="round"
                  />
                )}

                {/* Gilgit Baltistan (Neutral) */}
                {PAKISTAN_PROVINCES.gilgitBaltistan && (
                  <path
                    d={PAKISTAN_PROVINCES.gilgitBaltistan.d}
                    className="fill-sand/40 dark:fill-card/40 stroke-ink/15 stroke-[1.2]"
                    strokeLinejoin="round"
                  />
                )}

                {/* Islamabad Capital Territory */}
                {PAKISTAN_PROVINCES.islamabad && (
                  <path
                    d={PAKISTAN_PROVINCES.islamabad.d}
                    className="fill-clay/20 stroke-clay/60 stroke-[1.5]"
                    strokeLinejoin="round"
                  />
                )}

                {/* ── ACTIVE SPONSORED PROVINCES ── */}
                
                {/* Azad Kashmir (Sponsored: 1 school) */}
                {PAKISTAN_PROVINCES.azadKashmir && (
                  <path
                    d={PAKISTAN_PROVINCES.azadKashmir.d}
                    onClick={() => setProvinceFilter("Azad Jammu & Kashmir")}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.8] ${
                      provinceFilter === "Azad Jammu & Kashmir"
                        ? "fill-emerald-500/25 stroke-emerald-600 dark:stroke-emerald-400"
                        : "fill-emerald-500/10 stroke-emerald-600/60 hover:fill-emerald-500/20 hover:stroke-emerald-600"
                    }`}
                    strokeLinejoin="round"
                  />
                )}

                {/* Sindh (Sponsored: 10 schools) */}
                {PAKISTAN_PROVINCES.sindh && (
                  <path
                    d={PAKISTAN_PROVINCES.sindh.d}
                    onClick={() => setProvinceFilter("Sindh")}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.8] ${
                      provinceFilter === "Sindh"
                        ? "fill-amber-500/25 stroke-amber-600 dark:stroke-amber-400"
                        : "fill-amber-500/12 stroke-amber-600/60 hover:fill-amber-500/20 hover:stroke-amber-600"
                    }`}
                    strokeLinejoin="round"
                  />
                )}

                {/* Punjab (Sponsored: 70 schools) */}
                {PAKISTAN_PROVINCES.punjab && (
                  <path
                    d={PAKISTAN_PROVINCES.punjab.d}
                    onClick={() => setProvinceFilter("Punjab")}
                    className={`cursor-pointer transition-all duration-300 stroke-[2] ${
                      provinceFilter === "Punjab"
                        ? "fill-clay/25 stroke-clay-deep dark:stroke-clay"
                        : "fill-clay/12 stroke-clay/70 hover:fill-clay/20 hover:stroke-clay"
                    }`}
                    strokeLinejoin="round"
                  />
                )}

                {/* ── DYNAMIC DISTRICT BEACON PINS ── */}
                {visibleDistricts.map((district) => {
                  const isSelected = selectedDistrictId === district.id;
                  const isHovered = hoveredDistrictId === district.id;
                  const isSindh = district.province === "Sindh";
                  const isAjk = district.province === "Azad Jammu & Kashmir";

                  // Colors according to province
                  const beaconColor = isSindh
                    ? "#d97706"
                    : isAjk
                    ? "#059669"
                    : "#c25e38"; // clay

                  return (
                    <g
                      key={district.id}
                      transform={`translate(${district.x}, ${district.y})`}
                      className="cursor-pointer transition-transform duration-200"
                      onClick={() => setSelectedDistrictId(district.id)}
                      onMouseEnter={() => setHoveredDistrictId(district.id)}
                      onMouseLeave={() => setHoveredDistrictId(null)}
                    >
                      {/* Pulse Wave Ring for Active / Hovered Pin */}
                      {(isSelected || isHovered) && (
                        <circle
                          r="18"
                          fill="none"
                          stroke={beaconColor}
                          strokeWidth="2"
                          className="animate-ping opacity-60"
                        />
                      )}

                      {/* Outer Glow Halo */}
                      <circle
                        r={isSelected ? "14" : "10"}
                        fill={beaconColor}
                        fillOpacity={isSelected ? "0.35" : "0.2"}
                        className="transition-all duration-300"
                      />

                      {/* White Base Circle */}
                      <circle
                        r={isSelected ? "9" : "7"}
                        fill="#ffffff"
                        stroke={beaconColor}
                        strokeWidth={isSelected ? "3" : "2"}
                        className="transition-all duration-300 shadow-sm"
                      />

                      {/* Center Core Dot */}
                      <circle
                        r={isSelected ? "4.5" : "3"}
                        fill={beaconColor}
                        className="transition-all duration-300"
                      />

                      {/* Mini School Count Pill on Selected or Hovered */}
                      {(isSelected || isHovered) && (
                        <g transform="translate(0, -22)" className="pointer-events-none select-none">
                          <rect
                            x="-38"
                            y="-14"
                            width="76"
                            height="20"
                            rx="10"
                            fill="#143055"
                            className="shadow-md"
                          />
                          <text
                            x="0"
                            y="0"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                            dominantBaseline="central"
                          >
                            {district.name} ({district.schoolsCount})
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Caption */}
            <div className="mt-3 w-full flex items-center justify-between text-[11px] text-ink/50 border-t border-ink/10 pt-2">
              <span>Coordinates synchronized with ELF on-ground registry</span>
              <button
                onClick={() => setProvinceFilter("All")}
                className="font-semibold text-clay hover:underline cursor-pointer"
              >
                Reset map zoom
              </button>
            </div>

          </div>

          {/* Quick Clickable District Chips Carousel / Wrap */}
          <div className="mt-5 w-full">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-2">
              Select District to Inspect ({visibleDistricts.length} active hubs):
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {visibleDistricts.map((dist) => {
                const isSelected = selectedDistrictId === dist.id;
                const isSindh = dist.province === "Sindh";
                const isAjk = dist.province === "Azad Jammu & Kashmir";

                return (
                  <button
                    key={dist.id}
                    onClick={() => setSelectedDistrictId(dist.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-clay text-cream font-bold shadow-xs scale-105"
                        : "border border-ink/10 bg-background/90 text-ink/75 hover:border-clay/40 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isSindh ? "bg-amber-500" : isAjk ? "bg-emerald-500" : "bg-clay"
                      }`}
                    />
                    <span>{dist.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                        isSelected ? "bg-white/20 text-cream" : "bg-ink/10 text-ink/60"
                      }`}
                    >
                      {dist.schoolsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── RIGHT: DISTRICT INTELLIGENCE CARD & SCHOOLS EXPLORER ── */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-6 sm:p-7 shadow-xs">
          <div>
            
            {/* Card Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-ink/10">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      activeDistrict.province === "Sindh"
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        : activeDistrict.province === "Azad Jammu & Kashmir"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-clay/10 text-clay"
                    }`}
                  >
                    {activeDistrict.province}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Presence
                  </span>
                </div>
                <h4 className="mt-2 font-display text-2xl font-black text-ink">
                  {activeDistrict.name} District
                </h4>
                {activeDistrict.subDistrictsLabel && (
                  <p className="mt-1 text-xs text-ink/65 leading-relaxed">
                    {activeDistrict.subDistrictsLabel}
                  </p>
                )}
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-clay/20 bg-clay/10 text-clay">
                <MapPin className="h-5 w-5" />
              </div>
            </div>

            {/* Metrics Pillar Grid */}
            <div className="my-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-ink/10 bg-sand/30 dark:bg-card/50 p-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50 block">
                  Partner Schools
                </span>
                <span className="mt-1 block font-mono text-2xl font-black text-clay">
                  {activeDistrict.schoolsCount}
                </span>
                <span className="text-[11px] text-ink/60">operating tuition-free</span>
              </div>

              <div className="rounded-xl border border-ink/10 bg-sand/30 dark:bg-card/50 p-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/50 block">
                  Sponsored Scholars
                </span>
                <span className="mt-1 block font-mono text-2xl font-black text-clay">
                  {activeDistrict.totalStudents.toLocaleString()}
                </span>
                {activeDistrict.hasGenderMetrics ? (
                  <span className="text-[11px] text-ink/60 font-mono">
                    {activeDistrict.totalBoys} Boys · {activeDistrict.totalGirls} Girls
                  </span>
                ) : (
                  <span className="text-[11px] text-ink/60">100% funded</span>
                )}
              </div>
            </div>

            {/* Community Focus Tags */}
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-1.5">
                Community Focus in {activeDistrict.name}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeDistrict.categories.map((cat) => (
                  <span
                    key={cat}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      cat === "Brick Kiln Community"
                        ? "bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                        : cat === "Partner Network"
                        ? "bg-clay/10 text-clay font-bold"
                        : "bg-ink/5 text-ink/70"
                    }`}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable School List for this district */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-ink/10">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/70">
                  Schools in this Hub ({activeDistrict.schools.length})
                </span>
                <span className="text-[11px] text-ink/40">Scroll to view all</span>
              </div>

              <div className="mt-3 max-h-64 overflow-y-auto space-y-2 pr-1 divide-y divide-ink/5">
                {activeDistrict.schools.map((school) => (
                  <div
                    key={school.srNo}
                    className="pt-2 first:pt-0 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-ink/40">
                          #{String(school.srNo).padStart(2, "0")}
                        </span>
                        <h5 className="font-bold text-ink truncate">
                          {school.name}
                        </h5>
                      </div>
                      <p className="text-[11px] text-ink/60 truncate mt-0.5">
                        {school.location}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1 rounded bg-clay/10 px-2 py-0.5 font-mono text-[11px] font-bold text-clay">
                        <Users className="h-2.5 w-2.5" />
                        {school.students}
                      </span>
                      {school.boys !== undefined && school.girls !== undefined && (
                        <span className="block text-[9px] font-mono text-ink/50 mt-0.5">
                          {school.boys}B · {school.girls}G
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action CTA Button */}
          <div className="mt-6 pt-5 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-ink/60 text-center sm:text-left">
              Want to see detailed profiles of these {activeDistrict.schoolsCount} schools?
            </span>
            <button
              onClick={() => {
                if (onSelectDistrictFilter) {
                  onSelectDistrictFilter(activeDistrict.name);
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-clay bg-clay px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream shadow-xs transition-all hover:bg-clay/90 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <span>View in Table Below</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
