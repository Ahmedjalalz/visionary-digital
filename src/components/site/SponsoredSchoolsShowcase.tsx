import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  Users,
  MapPin,
  Search,
  Table as TableIcon,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Building2,
  Filter,
  Sparkles,
} from "lucide-react";
import {
  SPONSORED_SCHOOLS_DATA,
  TOTAL_SPONSORED_STUDENTS,
  TOTAL_SPONSORED_SCHOOLS,
  PROVINCE_STATS,
  type SponsoredSchool,
} from "@/data/sponsoredSchoolsData";
import { SponsoredPakistanMap } from "@/components/site/SponsoredPakistanMap";

type ProvinceFilter = "All" | "Punjab" | "Sindh" | "Azad Jammu & Kashmir";

export function SponsoredSchoolsShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<ProvinceFilter>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    SPONSORED_SCHOOLS_DATA.forEach((s) => set.add(s.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered schools
  const filteredSchools = useMemo(() => {
    return SPONSORED_SCHOOLS_DATA.filter((school) => {
      // Province match
      if (selectedProvince !== "All" && school.province !== selectedProvince) {
        return false;
      }
      // Category match
      if (selectedCategory !== "All" && school.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = school.name.toLowerCase().includes(query);
        const matchLocation = school.location.toLowerCase().includes(query);
        const matchDistrict = school.district.toLowerCase().includes(query);
        const matchProvince = school.province.toLowerCase().includes(query);
        const matchSr = String(school.srNo) === query;
        return matchName || matchLocation || matchDistrict || matchProvince || matchSr;
      }
      return true;
    });
  }, [searchQuery, selectedProvince, selectedCategory]);

  // Aggregate stats for current view
  const currentStudentsTotal = useMemo(() => {
    return filteredSchools.reduce((sum, s) => sum + s.students, 0);
  }, [filteredSchools]);

  const handleSelectDistrictFromMap = (districtName: string) => {
    setSelectedProvince("All");
    setSelectedCategory("All");
    setSearchQuery(districtName);
    setVisibleCount(24);
    const directoryEl = document.getElementById("schools-directory-controls");
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sponsored-schools" className="scroll-mt-20 border-b border-ink/10 bg-sand/35 dark:bg-card/35 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-ink/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay mb-4">
              <GraduationCap className="h-4 w-4" />
              <span>Institutional Sponsorship Registry · Education For All</span>
            </div>
            <h2 className="display-md text-ink">
              {TOTAL_SPONSORED_SCHOOLS} Sponsored Schools Across Pakistan
            </h2>
            <p className="lede mt-4 text-ink/75 max-w-2xl">
              Education And Life Foundation directly funds and operates partnerships with {TOTAL_SPONSORED_SCHOOLS} schools across Punjab, Sindh, and Azad Jammu &amp; Kashmir. By covering tuition, books, uniforms, and local teachers, we ensure {TOTAL_SPONSORED_STUDENTS.toLocaleString()} children have free, guaranteed access to a classroom.
            </p>
          </div>

          {/* Quick Metrics Pillar Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
            <div className="rounded-2xl border border-ink/10 bg-background/90 dark:bg-background/95 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">{TOTAL_SPONSORED_SCHOOLS}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Partner Schools</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/90 dark:bg-background/95 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">{TOTAL_SPONSORED_STUDENTS.toLocaleString()}</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Students Enrolled</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/90 dark:bg-background/95 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">3</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Provinces / Regions</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/90 dark:bg-background/95 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">100%</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Free to Families</span>
            </div>
          </div>
        </div>

        {/* Regional Distribution Bar */}
        <div className="my-8 rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-ink/10">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
              Geographic Sponsorship Distribution
            </span>
            <span className="text-xs font-medium text-ink/50">
              Verified on-ground institutional coverage
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Punjab */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-ink/10 bg-sand/30 dark:bg-card/50">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay/10 text-clay font-bold text-sm">
                  PB
                </span>
                <div>
                  <span className="font-bold text-sm text-ink block">Punjab</span>
                  <span className="text-xs text-ink/60">{PROVINCE_STATS.Punjab.schools} Schools</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-base font-bold text-clay block">
                  {PROVINCE_STATS.Punjab.students.toLocaleString()}
                </span>
                <span className="text-[11px] text-ink/50">Students</span>
              </div>
            </div>

            {/* Sindh */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-ink/10 bg-sand/30 dark:bg-card/50">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  SN
                </span>
                <div>
                  <span className="font-bold text-sm text-ink block">Sindh</span>
                  <span className="text-xs text-ink/60">{PROVINCE_STATS.Sindh.schools} Schools</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-base font-bold text-amber-700 dark:text-amber-400 block">
                  {PROVINCE_STATS.Sindh.students.toLocaleString()}
                </span>
                <span className="text-[11px] text-ink/50">Students</span>
              </div>
            </div>

            {/* AJK */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-ink/10 bg-sand/30 dark:bg-card/50">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  AJK
                </span>
                <div>
                  <span className="font-bold text-sm text-ink block">Azad Kashmir</span>
                  <span className="text-xs text-ink/60">{PROVINCE_STATS["Azad Jammu & Kashmir"].schools} School</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-base font-bold text-emerald-700 dark:text-emerald-400 block">
                  {PROVINCE_STATS["Azad Jammu & Kashmir"].students.toLocaleString()}
                </span>
                <span className="text-[11px] text-ink/50">Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Pakistan Map & District Intelligence Explorer */}
        <SponsoredPakistanMap
          onSelectDistrictFilter={handleSelectDistrictFromMap}
          className="my-10"
        />

        {/* Filter Controls Bar */}
        <div id="schools-directory-controls" className="mt-8 flex flex-col gap-4 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search by school name, city, or district..."
                className="w-full rounded-full border border-ink/15 bg-background px-4 py-2.5 pl-10 text-xs sm:text-sm text-ink placeholder:text-ink/40 shadow-xs focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-ink/40 hover:text-ink cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Province Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {(["All", "Punjab", "Sindh", "Azad Jammu & Kashmir"] as ProvinceFilter[]).map((prov) => {
                const count = prov === "All"
                  ? TOTAL_SPONSORED_SCHOOLS
                  : PROVINCE_STATS[prov as keyof typeof PROVINCE_STATS]?.schools || 0;

                return (
                  <button
                    key={prov}
                    onClick={() => {
                      setSelectedProvince(prov);
                      setVisibleCount(12);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedProvince === prov
                        ? "bg-clay text-cream shadow-xs"
                        : "border border-ink/10 bg-background/80 text-ink/70 hover:border-clay/40 hover:text-ink"
                    }`}
                  >
                    <span>{prov === "Azad Jammu & Kashmir" ? "AJK" : prov}</span>
                    <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                      selectedProvince === prov
                        ? "bg-white/20 text-cream"
                        : "bg-ink/10 text-ink/60"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 self-start md:self-center rounded-xl border border-ink/10 bg-background/80 p-1 shadow-xs">
              <button
                onClick={() => setViewMode("cards")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-clay text-cream shadow-xs"
                    : "text-ink/60 hover:text-ink"
                }`}
                title="Cards View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-clay text-cream shadow-xs"
                    : "text-ink/60 hover:text-ink"
                }`}
                title="Full Table View"
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Directory Table</span>
              </button>
            </div>

          </div>

          {/* Result Count and Active Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink/60 border-t border-ink/10 pt-3">
            <div>
              Showing <span className="font-bold text-ink">{filteredSchools.length}</span> schools with{" "}
              <span className="font-bold text-clay font-mono">{currentStudentsTotal.toLocaleString()}</span> sponsored students
              {selectedProvince !== "All" && ` in ${selectedProvince}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>

            {/* Quick Category filter chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-ink/50 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Focus:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(12);
                  }}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-clay/20 text-clay font-bold"
                      : "text-ink/50 hover:text-ink hover:bg-ink/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── VIEW 1: CARDS GRID ── */}
        {viewMode === "cards" && (
          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredSchools.slice(0, visibleCount).map((school) => {
                const isSindh = school.province === "Sindh";
                const isAjk = school.province === "Azad Jammu & Kashmir";
                const isBrickKiln = school.category === "Brick Kiln Community";

                return (
                  <article
                    key={school.srNo}
                    className="group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-5 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-md hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between pb-3 border-b border-ink/10">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-ink/40 group-hover:text-clay transition-colors">
                            #{String(school.srNo).padStart(2, "0")}
                          </span>
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isSindh
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              : isAjk
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "bg-clay/10 text-clay"
                          }`}>
                            {school.province === "Azad Jammu & Kashmir" ? "AJK" : school.province}
                          </span>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isBrickKiln
                            ? "bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
                            : "bg-ink/5 text-ink/60"
                        }`}>
                          {school.category}
                        </span>
                      </div>

                      {/* School Name */}
                      <div className="mt-3">
                        <h3 className="font-display text-base font-bold text-ink leading-snug group-hover:text-clay transition-colors">
                          {school.name}
                        </h3>

                        {/* Location */}
                        <div className="mt-2 flex items-start gap-1.5 text-xs text-ink/70">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-clay mt-0.5" />
                          <span className="line-clamp-2 leading-relaxed">
                            {school.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Stats & District */}
                    <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-ink/40" />
                        <span className="text-xs font-medium text-ink/60">
                          {school.district}
                        </span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 rounded-lg border border-clay/30 bg-clay/10 px-2.5 py-1 text-xs font-bold text-clay">
                          <Users className="h-3 w-3" />
                          <span className="font-mono">{school.students}</span>
                          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-clay/80">Students</span>
                        </div>
                        {school.boys !== undefined && school.girls !== undefined && (
                          <div className="text-[10px] font-mono text-ink/60 flex items-center gap-1">
                            <span>{school.boys} Boys</span>
                            <span>·</span>
                            <span>{school.girls} Girls</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Button if filtered count exceeds visibleCount */}
            {filteredSchools.length > visibleCount && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 16)}
                  className="inline-flex items-center gap-2 rounded-full border border-clay bg-clay px-6 py-3 text-xs font-bold uppercase tracking-wider text-cream shadow-xs transition-all hover:bg-clay/90 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Show More Schools ({filteredSchools.length - visibleCount} remaining)</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── VIEW 2: FULL DIRECTORY TABLE ── */}
        {viewMode === "table" && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/50 dark:bg-card/80 text-xs font-bold uppercase tracking-wider text-ink/75">
                    <th scope="col" className="py-4 px-4 sm:px-6 w-16 text-center">Sr.</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">School Name</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Location &amp; Address</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 hidden md:table-cell">Province</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 hidden sm:table-cell">District</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 w-36 text-right">No. of Students</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-sm">
                  {filteredSchools.map((school) => {
                    const isSindh = school.province === "Sindh";
                    const isAjk = school.province === "Azad Jammu & Kashmir";
                    const isBrickKiln = school.category === "Brick Kiln Community";

                    return (
                      <tr
                        key={school.srNo}
                        className="transition-colors hover:bg-sand/25 dark:hover:bg-card/40"
                      >
                        <td className="py-3.5 px-4 sm:px-6 text-center font-mono font-bold text-ink/50 text-xs">
                          {school.srNo}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="font-semibold text-ink flex items-center gap-2">
                            <span>{school.name}</span>
                            {isBrickKiln && (
                              <span className="rounded bg-red-500/15 text-red-600 dark:text-red-400 px-1.5 py-0.2 text-[9px] font-bold uppercase">
                                Brick Kiln
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-ink/50 md:hidden block mt-0.5">
                            {school.province} · {school.district}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-xs text-ink/75 leading-relaxed max-w-md">
                          {school.location}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 hidden md:table-cell">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                            isSindh
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              : isAjk
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "bg-clay/10 text-clay"
                          }`}>
                            {school.province}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 hidden sm:table-cell text-xs font-medium text-ink/70">
                          {school.district}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <span className="inline-flex items-center justify-center rounded-lg border border-clay/30 bg-clay/10 px-3 py-1 font-mono text-xs font-bold text-clay">
                            {school.students.toLocaleString()}
                          </span>
                          {school.boys !== undefined && school.girls !== undefined && (
                            <span className="block text-[10px] font-mono text-ink/50 mt-0.5">
                              {school.boys}B · {school.girls}G
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-ink/20 bg-sand/40 dark:bg-card/70 font-bold text-ink text-sm">
                    <td colSpan={3} className="py-4 px-4 sm:px-6">
                      <span className="font-display uppercase tracking-wider text-xs">
                        Grand Total for Current Selection
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 hidden md:table-cell text-xs text-ink/60">
                      {filteredSchools.length} Schools
                    </td>
                    <td className="py-4 px-4 sm:px-6 hidden sm:table-cell" />
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <span className="font-mono text-sm font-black text-clay">
                        {currentStudentsTotal.toLocaleString()} Students
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Table Footer */}
            <div className="border-t border-ink/10 bg-sand/20 dark:bg-card/50 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/60">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-clay shrink-0" />
                <span>All {TOTAL_SPONSORED_SCHOOLS} institutions verified under ELF educational sponsorship agreements.</span>
              </span>
              <span className="font-mono text-[11px] font-bold text-ink/40">
                OFFICIAL REGISTRY · {TOTAL_SPONSORED_STUDENTS.toLocaleString()} SCHOLARS
              </span>
            </div>
          </div>
        )}

        {/* Strategic Impact Community Callouts */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clay/10 text-clay mb-4">
              <Building2 className="h-5 w-5" />
            </div>
            <h4 className="font-display text-base font-bold text-ink">
              Brick Kiln &amp; Bonded Labor Schools
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
              Operating inside brick-kiln colonies in Kasur (307 students) and Faisalabad factory sites (136 students), ensuring debt bondage does not prevent children from learning to read, write, and calculate.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 mb-4">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="font-display text-base font-bold text-ink">
              Sindh Coastal &amp; Rural Network
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
              In partnership with Hisaar Foundation, 9 Forward Action Schools (FAS) across Karachi coastal communities (Rehri Goth: 371 students) and Deen Primary in Sanghar provide full schooling for 1,542 pupils.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-6 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="font-display text-base font-bold text-ink">
              Minority &amp; Slum Colonies
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
              Sustaining education in impoverished minority settlements across Youhanabad, Francis Abad, Essa Nagari, and remote rural hamlets in Sheikhupura, Narowal, and Azad Kashmir.
            </p>
          </div>
        </div>

        {/* Bottom Banner: Support or Sponsor a School */}
        <div className="mt-10 rounded-2xl border border-clay/20 bg-background/90 dark:bg-background/95 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-clay/20 bg-clay/10 text-clay p-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-ink">
                  Sponsor a Classroom or Fund an Entire School
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-ink/75 max-w-3xl">
                  Each school on this registry costs approximately $150 – $350 per month to maintain complete tuition-free operations, teacher compensation, and learning supplies for its children.
                </p>
              </div>
            </div>
            <Link
              to="/donate"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-clay bg-clay px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream shadow-xs transition-all hover:bg-clay/90 hover:scale-105 active:scale-95 self-start md:self-center"
            >
              <span>Sponsor Education Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
