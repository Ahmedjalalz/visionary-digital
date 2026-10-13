import { useState } from "react";
import {
  BookOpen,
  PenTool,
  Ruler,
  Compass,
  Eraser,
  Palette,
  Pen,
  Droplets,
  UtensilsCrossed,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Package,
  CheckCircle2,
  Table as TableIcon,
  LayoutGrid,
  ArrowRight,
  Backpack,
  Sparkle,
} from "lucide-react";

export type CategoryKey = "all" | "stationery" | "nutrition" | "hygiene";

export interface BagItem {
  srNo: number;
  contents: string;
  quantity: string;
  unitNote: string;
  category: "stationery" | "nutrition" | "hygiene";
  categoryLabel: string;
  description: string;
  icon: typeof BookOpen;
  accent: "clay" | "moss" | "amber";
}

export const BAG_CONTENTS: BagItem[] = [
  {
    srNo: 1,
    contents: "Note Books",
    quantity: "3",
    unitNote: "3 Exercise Books",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Ruled and square-grid multi-subject exercise books providing structured space for daily lessons, mathematics, and homework.",
    icon: BookOpen,
    accent: "clay",
  },
  {
    srNo: 2,
    contents: "Pencil Case",
    quantity: "1",
    unitNote: "1 Zippered Case",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Sturdy zippered pouch that prevents loss and protects pens, pencils, geometry instruments, and erasers throughout the academic year.",
    icon: PenTool,
    accent: "clay",
  },
  {
    srNo: 3,
    contents: "Ruler",
    quantity: "1",
    unitNote: "1 Straight Ruler",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Durable 30cm measuring straight-edge ruler with clear metric demarcations for geometry, diagrams, underline work, and examinations.",
    icon: Ruler,
    accent: "clay",
  },
  {
    srNo: 4,
    contents: "Math Set",
    quantity: "1",
    unitNote: "1 Geometry Box",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Complete mathematical geometry set tin containing metal compass, divider, 180° protractor, set squares, and precision stencil.",
    icon: Compass,
    accent: "clay",
  },
  {
    srNo: 5,
    contents: "Erasers",
    quantity: "10",
    unitNote: "10 Non-Smudge Erasers",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Generous pack of 10 clean-erasing non-abrasive rubber erasers, ensuring students never face distress from running out during school terms.",
    icon: Eraser,
    accent: "clay",
  },
  {
    srNo: 6,
    contents: "Coloring Pencils",
    quantity: "1 Pack",
    unitNote: "Full Colour Pencil Pack",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Vibrant assorted colouring pencils stimulating creative expression, biology diagrams, map cartography, and artistic discovery.",
    icon: Palette,
    accent: "clay",
  },
  {
    srNo: 7,
    contents: "Biro Pens + lead Pencil",
    quantity: "5+5",
    unitNote: "5 Pens + 5 Pencils",
    category: "stationery",
    categoryLabel: "Stationery & Learning",
    description: "Balanced dual writing set: 5 smooth-flow ballpoint biro pens for exams and senior classes, plus 5 break-resistant graphite lead pencils.",
    icon: Pen,
    accent: "clay",
  },
  {
    srNo: 8,
    contents: "Water bottle",
    quantity: "1",
    unitNote: "1 Reusable Bottle",
    category: "nutrition",
    categoryLabel: "Nutrition & Mealtime",
    description: "Food-grade BPA-free hygienic water container providing clean, portable drinking hydration during long class hours in Punjab heat.",
    icon: Droplets,
    accent: "amber",
  },
  {
    srNo: 9,
    contents: "Lunch Box",
    quantity: "1",
    unitNote: "1 Clip-Seal Container",
    category: "nutrition",
    categoryLabel: "Nutrition & Mealtime",
    description: "Airtight clip-seal lunch container enabling children to bring home-cooked food safely to school, preventing daytime hunger and fatigue.",
    icon: UtensilsCrossed,
    accent: "amber",
  },
  {
    srNo: 10,
    contents: "Tooth brush and toothpaste",
    quantity: "1+1",
    unitNote: "1 Brush + 1 Toothpaste",
    category: "hygiene",
    categoryLabel: "Health & Personal Hygiene",
    description: "Essential dental hygiene pair including a soft-bristled child toothbrush and cavity-protective toothpaste for daily oral wellness.",
    icon: Sparkles,
    accent: "moss",
  },
  {
    srNo: 11,
    contents: "Soap and Hand Towel",
    quantity: "1+1",
    unitNote: "1 Soap + 1 Cotton Towel",
    category: "hygiene",
    categoryLabel: "Health & Personal Hygiene",
    description: "Antibacterial hand-washing soap bar paired with a soft quick-drying cotton towel for washing hands before meals and after playtime.",
    icon: HeartHandshake,
    accent: "moss",
  },
  {
    srNo: 12,
    contents: "Face Mask",
    quantity: "10",
    unitNote: "10 Protective Masks",
    category: "hygiene",
    categoryLabel: "Health & Personal Hygiene",
    description: "Pack of 10 breathable high-filtration face masks protecting children against brick-kiln smoke, particulate dust, and classroom viral spread.",
    icon: ShieldCheck,
    accent: "moss",
  },
];

export function SchoolBagContentsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredItems = selectedCategory === "all"
    ? BAG_CONTENTS
    : BAG_CONTENTS.filter((item) => item.category === selectedCategory);

  const categories: { key: CategoryKey; label: string; count: number }[] = [
    { key: "all", label: "All Contents", count: 12 },
    { key: "stationery", label: "Stationery & Learning", count: 7 },
    { key: "nutrition", label: "Nutrition & Mealtime", count: 2 },
    { key: "hygiene", label: "Health & Hygiene", count: 3 },
  ];

  return (
    <section id="bag-contents" className="scroll-mt-20 border-b border-ink/10 bg-sand/35 dark:bg-card/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        
        {/* Top Header & Context */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-ink/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay mb-4">
              <Backpack className="h-3.5 w-3.5" />
              <span>Official Packing Manifest · School in A Bag Partnership</span>
            </div>
            <h2 className="display-md text-ink">
              What Every School Bag Contains
            </h2>
            <p className="lede mt-4 text-ink/75 max-w-2xl">
              Without books or stationery, vulnerable children in Pakistan are routinely turned away from classrooms. Each sponsored School in A Bag rucksack is packed with these exact 12 essential provisions—spanning 35+ items—ensuring academic readiness, daily nourishment, and personal hygiene for a full school year.
            </p>
          </div>

          {/* Quick Metrics Pillar Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
            <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">12</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Core Provisions</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">35+</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Total Items</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">1 Year</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Class Readiness</span>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-background/80 dark:bg-background/90 p-4 text-center shadow-xs">
              <span className="block font-display text-2xl sm:text-3xl font-black text-clay">100%</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/60">Free to Child</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs & View Toggle Bar */}
        <div className="my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-clay text-cream shadow-xs"
                    : "border border-ink/10 bg-background/70 text-ink/70 hover:border-clay/40 hover:text-ink hover:bg-background"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                  selectedCategory === cat.key
                    ? "bg-white/20 text-cream"
                    : "bg-ink/10 text-ink/60"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Cards vs Official Table */}
          <div className="flex items-center gap-1 self-start sm:self-center rounded-xl border border-ink/10 bg-background/80 p-1 shadow-xs">
            <button
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "cards"
                  ? "bg-clay text-cream shadow-xs"
                  : "text-ink/60 hover:text-ink"
              }`}
              title="Show Visual Cards Grid"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Visual Cards</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-clay text-cream shadow-xs"
                  : "text-ink/60 hover:text-ink"
              }`}
              title="Show Official Packing Manifest Table"
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Official Table</span>
            </button>
          </div>
        </div>

        {/* ── VIEW 1: VISUAL CARDS GRID ── */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isNutrition = item.category === "nutrition";
              const isHygiene = item.category === "hygiene";

              return (
                <div
                  key={item.srNo}
                  className="group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-md hover:-translate-y-1"
                >
                  <div>
                    {/* Card Top: Serial Badge & Icon */}
                    <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black tracking-wider text-ink/40 group-hover:text-clay transition-colors">
                          #{String(item.srNo).padStart(2, "0")}
                        </span>
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          isNutrition
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            : isHygiene
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-clay/10 text-clay"
                        }`}>
                          {item.categoryLabel}
                        </span>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-sand/40 dark:bg-card text-clay transition-transform duration-300 group-hover:scale-110 group-hover:border-clay/30">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Item Name & Quantity Badge */}
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-display text-lg font-bold text-ink group-hover:text-clay transition-colors">
                          {item.contents}
                        </h3>
                        <span className="inline-flex shrink-0 items-center rounded-lg border border-clay/30 bg-clay/10 px-2.5 py-1 font-mono text-xs font-bold text-clay">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink/70">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Unit breakdown */}
                  <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between text-[11px] font-medium text-ink/50">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-clay shrink-0" />
                      <span>{item.unitNote}</span>
                    </span>
                    <span className="font-mono text-[10px] text-ink/40 uppercase tracking-wider">
                      Standard Issue
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── VIEW 2: OFFICIAL INVENTORY TABLE (Exact Manifest) ── */}
        {viewMode === "table" && (
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-sand/50 dark:bg-card/80 text-xs font-bold uppercase tracking-wider text-ink/75">
                    <th scope="col" className="py-4 px-5 sm:px-6 w-20 text-center">Serial #</th>
                    <th scope="col" className="py-4 px-5 sm:px-6">Contents</th>
                    <th scope="col" className="py-4 px-5 sm:px-6 w-36 text-center">Quantity</th>
                    <th scope="col" className="py-4 px-5 sm:px-6 hidden md:table-cell">Category</th>
                    <th scope="col" className="py-4 px-5 sm:px-6 hidden lg:table-cell">Classroom Purpose &amp; Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-sm">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isNutrition = item.category === "nutrition";
                    const isHygiene = item.category === "hygiene";

                    return (
                      <tr
                        key={item.srNo}
                        className="transition-colors hover:bg-sand/20 dark:hover:bg-card/40"
                      >
                        <td className="py-4 px-5 sm:px-6 text-center font-mono font-bold text-ink/60">
                          {item.srNo}
                        </td>
                        <td className="py-4 px-5 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-sand/30 dark:bg-card text-clay">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-semibold text-ink block sm:inline">
                                {item.contents}
                              </span>
                              <span className="text-xs text-ink/50 md:hidden block">
                                {item.categoryLabel}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-5 sm:px-6 text-center">
                          <span className="inline-flex items-center justify-center rounded-lg border border-clay/30 bg-clay/10 px-3 py-1 font-mono text-xs font-bold text-clay">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-4 px-5 sm:px-6 hidden md:table-cell">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                            isNutrition
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              : isHygiene
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "bg-clay/10 text-clay"
                          }`}>
                            {item.categoryLabel}
                          </span>
                        </td>
                        <td className="py-4 px-5 sm:px-6 hidden lg:table-cell text-xs leading-relaxed text-ink/75">
                          {item.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer info */}
            <div className="border-t border-ink/10 bg-sand/20 dark:bg-card/50 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/60">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-clay" />
                <span>Standardized inventory approved under the School in A Bag worldwide charter.</span>
              </span>
              <span className="font-mono text-[11px] font-bold text-ink/40">
                12 MANIFEST ROWS VERIFIED
              </span>
            </div>
          </div>
        )}

        {/* Bottom Partnership Callout & Direct Tracker Action */}
        <div className="mt-12 rounded-2xl border border-clay/20 bg-background/80 dark:bg-background/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-clay/20 bg-clay/10 p-2 shadow-inner">
                <img
                  src="/school-in-a-bag-logo-red.png"
                  alt="School in A bag"
                  className="h-full w-full object-contain drop-shadow-xs"
                />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-ink">
                  Every Bag Is Individually Serial-Numbered and Traceable
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-ink/75 max-w-3xl">
                  Each rucksack containing these 12 provisions is stamped with an individual barcode serial. When you sponsor a bag, your receipt carries that ID—allowing you to track packing, transport, and delivery directly to the named child who received it.
                </p>
              </div>
            </div>
            <a
              href="#bag-tracker"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-clay bg-clay px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-cream shadow-xs transition-all hover:bg-clay/90 hover:scale-105 active:scale-95 self-start md:self-center cursor-pointer"
            >
              <span>Track A Bag Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
