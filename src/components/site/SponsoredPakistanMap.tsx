import { useState, useMemo } from "react";
import {
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Filter,
  Compass,
  LayoutGrid,
  Map as MapIcon,
  ZoomIn,
  RotateCcw,
} from "lucide-react";
import {
  PAKISTAN_PROVINCES,
  PAKISTAN_FULL_VIEWBOX,
  type ProvinceKey,
} from "@/data/pakistanMapPaths";
import {
  SPONSORED_DISTRICTS_MAP_DATA,
  type SponsoredDistrictMapData,
} from "@/data/sponsoredDistrictsMapData";
import {
  SPONSORED_SCHOOLS_DATA,
  TOTAL_SPONSORED_SCHOOLS,
  TOTAL_SPONSORED_STUDENTS,
  type SponsoredSchool,
} from "@/data/sponsoredSchoolsData";

type ProvinceFilter = "All" | "Punjab" | "Sindh" | "Azad Jammu & Kashmir";

// Matching rules from district ID to schools in SPONSORED_SCHOOLS_DATA
const DISTRICT_MATCHERS: Record<string, (s: SponsoredSchool) => boolean> = {
  karachi: (s) => s.district === "Karachi",
  sanghar: (s) => s.district === "Sanghar",
  "rahim-yar-khan": (s) => s.district === "Rahim Yar Khan",
  multan: (s) => s.district === "Multan",
  khanewal: (s) => s.district.toLowerCase().includes("khanewal"),
  "toba-tek-singh": (s) => s.district.toLowerCase().includes("toba"),
  faisalabad: (s) => s.district === "Faisalabad",
  "nankana-sahib": (s) => s.district === "Nankana Sahib",
  kasur: (s) => s.district === "Kasur",
  lahore: (s) => s.district === "Lahore",
  sheikhupura: (s) => s.district === "Sheikhupura",
  gujranwala: (s) => s.district === "Gujranwala",
  narowal: (s) => s.district === "Narowal",
  mirpur: (s) => s.district.toLowerCase().includes("mirpur"),
};

// Focused viewboxes for smooth zooming into specific provinces
const PROVINCE_VIEWBOXES: Record<ProvinceFilter, string> = {
  All: PAKISTAN_FULL_VIEWBOX,
  Punjab: "510 240 365 440",
  Sindh: "355 600 280 330",
  "Azad Jammu & Kashmir": "735 160 140 190",
};

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
  const [activeProvince, setActiveProvince] = useState<ProvinceFilter>("All");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  // Aggregate schools for each district
  const districtDataList = useMemo(() => {
    return SPONSORED_DISTRICTS_MAP_DATA.map((dist) => {
      const matchFn = DISTRICT_MATCHERS[dist.id] || ((s: SponsoredSchool) => s.district === dist.name);
      const schools = SPONSORED_SCHOOLS_DATA.filter(matchFn);
      const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
      const totalBoys = schools.reduce((sum, s) => sum + (s.boys || 0), 0);
      const totalGirls = schools.reduce((sum, s) => sum + (s.girls || 0), 0);
      const categories = Array.from(new Set(schools.map((s) => s.category)));

      return {
        ...dist,
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
    if (activeProvince === "All") return districtDataList;
    return districtDataList.filter((d) => d.province === activeProvince);
  }, [districtDataList, activeProvince]);

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

  // Current SVG viewBox depending on province selection
  const currentViewBox = PROVINCE_VIEWBOXES[activeProvince] || PAKISTAN_FULL_VIEWBOX;

  return (
    <div className={`rounded-3xl border border-ink/10 bg-background/90 dark:bg-background/95 p-5 sm:p-8 lg:p-10 shadow-sm ${className}`}>
      
      {/* ── TOP HEADER BAR ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-ink/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-clay mb-2.5">
            <Compass className="h-3.5 w-3.5" />
            <span>Geographic Intelligence · Pakistan National &amp; District Map</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Institutional Coverage Across 14 Districts
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-ink/70 max-w-2xl">
            Real geographic boundaries and institutional footprint of all {TOTAL_SPONSORED_SCHOOLS} partner schools and {TOTAL_SPONSORED_STUDENTS.toLocaleString()} sponsored children. Select a province to drill into its districts, or inspect any hub below.
          </p>
        </div>

        {/* View Switcher: Interactive Map vs District Cards Grid */}
        <div className="flex items-center gap-1 self-start lg:self-center rounded-xl border border-ink/10 bg-background p-1 shadow-xs">
          <button
            onClick={() => setViewMode("map")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "map"
                ? "bg-clay text-cream shadow-xs"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-clay text-cream shadow-xs"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>District Cards Grid</span>
          </button>
        </div>
      </div>

      {/* ── PROVINCE TABS BAR ── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ink/50 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Province View:
          </span>
          {(["All", "Punjab", "Sindh", "Azad Jammu & Kashmir"] as const).map((prov) => {
            const isSelected = activeProvince === prov;
            const count =
              prov === "All"
                ? TOTAL_SPONSORED_SCHOOLS
                : provinceCounts[prov];

            return (
              <button
                key={prov}
                onClick={() => {
                  setActiveProvince(prov);
                  // Auto-select first district in that province
                  if (prov !== "All") {
                    const firstInProv = districtDataList.find((d) => d.province === prov);
                    if (firstInProv) setSelectedDistrictId(firstInProv.id);
                  }
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-clay text-cream shadow-xs"
                    : "border border-ink/10 bg-background/80 text-ink/70 hover:border-clay/40 hover:text-ink"
                }`}
              >
                <span>{prov === "Azad Jammu & Kashmir" ? "Azad Kashmir" : prov}</span>
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

        {activeProvince !== "All" && (
          <button
            onClick={() => setActiveProvince("All")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-clay hover:underline cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset to Whole Pakistan</span>
          </button>
        )}
      </div>

      {/* ── VIEW 1: INTERACTIVE MAP + DISTRICT INSPECTOR ── */}
      {viewMode === "map" && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ── LEFT: INTERACTIVE SVG MAP ── */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            <div className="relative w-full rounded-2xl border border-ink/10 bg-sand/25 dark:bg-card/40 p-4 sm:p-6 overflow-hidden flex flex-col items-center justify-center min-h-[480px] sm:min-h-[540px]">
              
              {/* Map Header Indicator */}
              <div className="w-full flex items-center justify-between text-xs text-ink/60 pb-3 mb-2 border-b border-ink/10">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                    <span className="font-semibold text-ink">
                      {activeProvince === "All"
                        ? `All 14 Sponsored Districts (${TOTAL_SPONSORED_SCHOOLS} Schools)`
                        : `${activeProvince} District Map`}
                    </span>
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-clay uppercase">
                  {activeDistrict ? activeDistrict.name : "Select a district"}
                </span>
              </div>

              {/* Pakistan SVG Canvas with Dynamic Province Zoom */}
              <div className="relative w-full max-w-[560px] aspect-[1000/959] flex items-center justify-center">
                <svg
                  viewBox={currentViewBox}
                  className="w-full h-full object-contain filter drop-shadow-xs transition-all duration-500 ease-in-out"
                  preserveAspectRatio="xMidYMid meet"
                  aria-label="Geographic map of Pakistan showing sponsored districts"
                >
                  {/* ── BACKGROUND NATIONAL PROVINCES (Visible in National View) ── */}
                  {activeProvince === "All" && (
                    <>
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
                    </>
                  )}

                  {/* ── PROVINCIAL BASE OUTLINES ── */}
                  
                  {/* Azad Kashmir Base Shape */}
                  {(activeProvince === "All" || activeProvince === "Azad Jammu & Kashmir") && PAKISTAN_PROVINCES.azadKashmir && (
                    <path
                      d={PAKISTAN_PROVINCES.azadKashmir.d}
                      className="fill-emerald-500/10 stroke-emerald-600/50 stroke-[1.5]"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Sindh Base Shape */}
                  {(activeProvince === "All" || activeProvince === "Sindh") && PAKISTAN_PROVINCES.sindh && (
                    <path
                      d={PAKISTAN_PROVINCES.sindh.d}
                      className="fill-amber-500/10 stroke-amber-600/50 stroke-[1.5]"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Punjab Base Shape */}
                  {(activeProvince === "All" || activeProvince === "Punjab") && PAKISTAN_PROVINCES.punjab && (
                    <path
                      d={PAKISTAN_PROVINCES.punjab.d}
                      className="fill-clay/10 stroke-clay/50 stroke-[1.5]"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* ── REAL GEOGRAPHIC DISTRICT BOUNDARY POLYGONS ── */}
                  {visibleDistricts.map((district) => {
                    const isSelected = selectedDistrictId === district.id;
                    const isHovered = hoveredDistrictId === district.id;
                    const isSindh = district.province === "Sindh";
                    const isAjk = district.province === "Azad Jammu & Kashmir";

                    // Determine fill & stroke style based on state
                    let fillClass = "fill-clay/20 stroke-clay/70 stroke-[1.4]";
                    if (isSindh) {
                      fillClass = "fill-amber-500/20 stroke-amber-600/70 stroke-[1.4]";
                    } else if (isAjk) {
                      fillClass = "fill-emerald-500/25 stroke-emerald-600/70 stroke-[1.4]";
                    }

                    if (isSelected || isHovered) {
                      if (isSindh) {
                        fillClass = "fill-amber-500/50 stroke-amber-700 dark:stroke-amber-400 stroke-[2.2]";
                      } else if (isAjk) {
                        fillClass = "fill-emerald-500/55 stroke-emerald-700 dark:stroke-emerald-400 stroke-[2.2]";
                      } else {
                        fillClass = "fill-clay/45 stroke-clay-deep dark:stroke-clay stroke-[2.2]";
                      }
                    }

                    return (
                      <path
                        key={`poly-${district.id}`}
                        d={district.d}
                        className={`cursor-pointer transition-all duration-200 ${fillClass}`}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        onClick={() => setSelectedDistrictId(district.id)}
                        onMouseEnter={() => setHoveredDistrictId(district.id)}
                        onMouseLeave={() => setHoveredDistrictId(null)}
                      >
                        <title>{`${district.name} District · ${district.schoolsCount} Schools · ${district.totalStudents} Students`}</title>
                      </path>
                    );
                  })}

                  {/* ── DYNAMIC DISTRICT BEACON PINS AT ACCURATE CENTROIDS ── */}
                  {visibleDistricts.map((district) => {
                    const isSelected = selectedDistrictId === district.id;
                    const isHovered = hoveredDistrictId === district.id;
                    const isSindh = district.province === "Sindh";
                    const isAjk = district.province === "Azad Jammu & Kashmir";

                    const beaconColor = isSindh
                      ? "#d97706"
                      : isAjk
                      ? "#059669"
                      : "#c25e38"; // clay

                    const cx = district.centroid.x;
                    const cy = district.centroid.y;

                    return (
                      <g
                        key={`pin-${district.id}`}
                        transform={`translate(${cx}, ${cy})`}
                        className="cursor-pointer transition-transform duration-200"
                        onClick={() => setSelectedDistrictId(district.id)}
                        onMouseEnter={() => setHoveredDistrictId(district.id)}
                        onMouseLeave={() => setHoveredDistrictId(null)}
                      >
                        {/* Pulse Wave Ring for Active / Hovered Pin */}
                        {(isSelected || isHovered) && (
                          <circle
                            r="16"
                            fill="none"
                            stroke={beaconColor}
                            strokeWidth="2"
                            className="animate-ping opacity-75"
                          />
                        )}

                        {/* Outer Glow Halo */}
                        <circle
                          r={isSelected ? "12" : "8"}
                          fill={beaconColor}
                          fillOpacity={isSelected ? "0.4" : "0.25"}
                          className="transition-all duration-300"
                        />

                        {/* White Base Circle */}
                        <circle
                          r={isSelected ? "8" : "6"}
                          fill="#ffffff"
                          stroke={beaconColor}
                          strokeWidth={isSelected ? "2.5" : "2"}
                          className="transition-all duration-300 shadow-sm"
                        />

                        {/* Center Core Dot */}
                        <circle
                          r={isSelected ? "4" : "2.8"}
                          fill={beaconColor}
                          className="transition-all duration-300"
                        />

                        {/* District Name Label on Hover or Active */}
                        {(isSelected || isHovered) && (
                          <g transform="translate(0, -18)" className="pointer-events-none select-none">
                            <rect
                              x="-42"
                              y="-12"
                              width="84"
                              height="18"
                              rx="9"
                              fill="#143055"
                              className="shadow-md"
                            />
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="8.5"
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

              {/* Bottom Caption & View Controls */}
              <div className="mt-3 w-full flex items-center justify-between text-[11px] text-ink/50 border-t border-ink/10 pt-2.5">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-clay" />
                  <span>Boundaries &amp; centroids computed from official Pakistan GIS registry</span>
                </span>
                {activeProvince !== "All" && (
                  <button
                    onClick={() => setActiveProvince("All")}
                    className="font-semibold text-clay hover:underline cursor-pointer"
                  >
                    Zoom out to national view
                  </button>
                )}
              </div>

            </div>

            {/* Quick Clickable District Chips */}
            <div className="mt-5 w-full">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-2">
                Click District to Inspect ({visibleDistricts.length} active hubs):
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

          {/* ── RIGHT: DISTRICT INTELLIGENCE CARD WITH MINI-MAP OUTLINE ── */}
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
                      Verified District Hub
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

              {/* District Geometric Map Outline (Similar to Province Map Boxes) */}
              <div className="my-4 rounded-xl border border-ink/10 bg-sand/35 dark:bg-card/50 p-3.5 flex flex-col items-center justify-center">
                <div className="h-28 w-full flex items-center justify-center">
                  <svg
                    viewBox={activeDistrict.viewBox}
                    className="h-full w-full max-h-24 object-contain filter drop-shadow-xs transition-transform duration-300 hover:scale-105"
                    preserveAspectRatio="xMidYMid meet"
                    aria-label={`Geographic map outline of ${activeDistrict.name}`}
                  >
                    <path
                      d={activeDistrict.d}
                      className={`stroke-[2] transition-colors ${
                        activeDistrict.province === "Sindh"
                          ? "fill-amber-500/25 stroke-amber-700 dark:stroke-amber-400"
                          : activeDistrict.province === "Azad Jammu & Kashmir"
                          ? "fill-emerald-500/25 stroke-emerald-700 dark:stroke-emerald-400"
                          : "fill-clay/25 stroke-clay"
                      }`}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="mt-1.5 w-full text-center border-t border-ink/10 pt-1 text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                  District Boundary Outline · {activeDistrict.name}
                </div>
              </div>

              {/* Metrics Pillar Grid */}
              <div className="my-4 grid grid-cols-2 gap-3">
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
              <div className="mb-4">
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
                    Schools in this District ({activeDistrict.schools.length})
                  </span>
                  <span className="text-[11px] text-ink/40">Scroll to view all</span>
                </div>

                <div className="mt-3 max-h-56 overflow-y-auto space-y-2 pr-1 divide-y divide-ink/5">
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
            <div className="mt-5 pt-4 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink/60 text-center sm:text-left">
                Want to view full profiles of these {activeDistrict.schoolsCount} schools?
              </span>
              <button
                onClick={() => {
                  if (onSelectDistrictFilter) {
                    onSelectDistrictFilter(activeDistrict.name);
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-clay bg-clay px-4 py-2 text-xs font-bold uppercase tracking-wider text-cream shadow-xs transition-all hover:bg-clay/90 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                <span>Filter Table Below</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ── VIEW 2: DISTRICT CARDS GALLERY (SIMILAR TO PROVINCES MAPPING) ── */}
      {viewMode === "grid" && (
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {visibleDistricts.map((dist) => {
              const isSindh = dist.province === "Sindh";
              const isAjk = dist.province === "Azad Jammu & Kashmir";
              const isSelected = selectedDistrictId === dist.id;

              return (
                <article
                  key={dist.id}
                  onClick={() => {
                    setSelectedDistrictId(dist.id);
                    setViewMode("map");
                  }}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-clay bg-background shadow-md -translate-y-1"
                      : "border-ink/10 bg-background/80 hover:border-clay/40 hover:bg-background hover:shadow-xs"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                      <span className="font-display text-base font-bold text-ink">
                        {dist.name}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isSindh
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            : isAjk
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-clay/10 text-clay"
                        }`}
                      >
                        {dist.schoolsCount} Schools
                      </span>
                    </div>

                    {/* District Map Outline Feature Box */}
                    <div className="mt-4 rounded-xl border border-ink/10 bg-sand/40 p-3 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-clay/30 group-hover:bg-clay/5">
                      <div className="h-24 w-full flex items-center justify-center">
                        <svg
                          viewBox={dist.viewBox}
                          className="h-full w-full max-h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                          preserveAspectRatio="xMidYMid meet"
                          aria-label={`Geographic map outline of ${dist.name}`}
                        >
                          <path
                            d={dist.d}
                            className={`stroke-[1.8] transition-colors ${
                              isSindh
                                ? "fill-amber-500/20 stroke-amber-600/70 group-hover:fill-amber-500/30 group-hover:stroke-amber-600"
                                : isAjk
                                ? "fill-emerald-500/20 stroke-emerald-600/70 group-hover:fill-emerald-500/30 group-hover:stroke-emerald-600"
                                : "fill-clay/15 stroke-clay/70 group-hover:fill-clay/25 group-hover:stroke-clay"
                            }`}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="mt-1.5 w-full text-center border-t border-ink/10 pt-1 text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                        District Outline · {dist.name}
                      </div>
                    </div>

                    {/* Numbers */}
                    <div className="mt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-3xl font-black text-clay">
                          {dist.totalStudents.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold uppercase text-ink/60">
                          Students
                        </span>
                      </div>
                      {dist.subDistrictsLabel && (
                        <p className="mt-1 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                          {dist.subDistrictsLabel}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between text-xs">
                    <span className="text-clay font-bold group-hover:underline flex items-center gap-1">
                      <span>View on Map</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span className="text-[11px] font-semibold text-ink/40">
                      {dist.province}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
