import { Project } from "@/data/projects";

export interface ProjectHighlight {
  stat: string;
  label: string;
}

export const PROJECT_HIGHLIGHTS: Record<string, ProjectHighlight[]> = {
  "education-for-all": [
    { stat: "14,000+", label: "Students Supported" },
    { stat: "100%", label: "Free Tuition & Books" },
    { stat: "35+", label: "Community Schools" },
    { stat: "Zero", label: "Cost to Families" },
    { stat: "26M", label: "Out-of-School Gap" },
  ],
  "school-bags": [
    { stat: "Direct", label: "Child Handover" },
    { stat: "Zero", label: "Dropout Risk" },
    { stat: "100%", label: "Trackable by Sponsor" },
    { stat: "Full Year", label: "Supplies & Notes" },
  ],
  "midwifery-program": [
    { stat: "4,800+", label: "Safe Village Births" },
    { stat: "100%", label: "Equipped Delivery Kits" },
    { stat: "24/7", label: "Community Midwives" },
    { stat: "155 / 100k", label: "Maternal Risk Tackled" },
  ],
  "music-of-the-heart": [
    { stat: "+78%", label: "Higher Attendance" },
    { stat: "+3 Mo.", label: "Academic Gain (EEF)" },
    { stat: "53,000", label: "10-Year Scaling Target" },
    { stat: "Daily", label: "Violin & Arts Training" },
  ],
  "health-wash-community-wellbeing": [
    { stat: "18,500+", label: "Free Consultations" },
    { stat: "0% Arsenic", label: "Lab-Tested Pure Water" },
    { stat: "100%", label: "Free Medicines" },
    { stat: "Maternal", label: "Antenatal & LHV Care" },
  ],
  "hope-and-freedom-for-widows-headed-families": [
    { stat: "100%", label: "Kiln Debt Discharged" },
    { stat: "6 Months", label: "Prepaid Safe Rent" },
    { stat: "Micro-Biz", label: "Sewing Machine Grants" },
    { stat: "Enrolled", label: "Children in School" },
  ],
  "community-digital-skills-developments": [
    { stat: "Dual-Track", label: "Digital & Stitching" },
    { stat: "Tech Lab", label: "Dedicated Workstations" },
    { stat: "Free Grant", label: "Tailoring Machines" },
    { stat: "100%", label: "Dignified Livelihoods" },
  ],
  "capacity-building": [
    { stat: "100%", label: "Transparent Ledgers" },
    { stat: "Audit-Ready", label: "Financial Governance" },
    { stat: "Grassroots", label: "Local Leaders Trained" },
    { stat: "Compliance", label: "Non-Profit Advisory" },
  ],
  "faith-hope-love-for-every-child": [
    { stat: "35 Girls", label: "Orphan Long-Term Care" },
    { stat: "500+", label: "Single-Parent Students" },
    { stat: "1,000+", label: "Freedom From Slavery" },
    { stat: "120 Kids", label: "Special Needs & Deaf/Blind" },
    { stat: "1,655+", label: "Total Children Protected" },
    { stat: "100%", label: "Education & Dignity" },
  ],
};

interface ProjectHighlightCardsProps {
  project: Project;
  speed?: number; // seconds
}

export function ProjectHighlightCards({ project, speed = 20 }: ProjectHighlightCardsProps) {
  // Get tailored highlights or synthesize from project data
  const rawHighlights: ProjectHighlight[] =
    PROJECT_HIGHLIGHTS[project.slug] || [
      { stat: project.problem?.figure || "Direct", label: project.problem?.unit || "Field Impact" },
      ...(project.outcomes?.slice(0, 3).map((o) => ({
        stat: o.value,
        label: o.label,
      })) || []),
    ];

  // Ensure each track has at least 6 items so Track 1 is always wider than any card container
  let baseItems = [...rawHighlights];
  while (baseItems.length < 6) {
    baseItems = [...baseItems, ...rawHighlights];
  }

  return (
    <div className="mt-4.5 border-t border-ink/8 pt-3.5 dark:border-white/8">
      {/* Structural header so the ticker is anchored and belongs to the card */}
      <div className="mb-2 flex items-center justify-between px-0.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink/55 dark:text-cream/55">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          Field Highlights
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-ink/40 dark:text-cream/40">
          Live Data
        </span>
      </div>

      {/* Premium frosted blue glass tray with specular top rim & ambient depth */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-ink/10 border-t-white/90 bg-gradient-to-b from-[#ebf3fe]/85 via-[#f0f6ff]/60 to-[#e2edfd]/50 p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_2px_8px_-2px_rgba(20,48,85,0.08)] backdrop-blur-md transition-all dark:border-white/12 dark:border-t-white/25 dark:bg-gradient-to-b dark:from-[#1d375f]/50 dark:via-[#142948]/35 dark:to-[#0f2038]/45 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.25)]"
        aria-label={`${project.name} highlights ticker`}
      >
        {/* Constantly moving marquee track wrapper with tight 12px mask fade for maximum card visibility */}
        <div
          className="group/highlight-ticker overflow-hidden w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12px, black calc(100% - 12px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12px, black calc(100% - 12px), transparent 100%)",
          }}
        >
          <div className="flex w-max">
            {/* Primary Track */}
            <div
              className="marquee-track-seamless flex shrink-0 items-center gap-2 pr-2 group-hover/highlight-ticker:[animation-play-state:paused]"
              style={{ animationDuration: `${speed}s` }}
            >
              {baseItems.map((item, idx) => (
                <div
                  key={`h1-${item.stat}-${idx}`}
                  className="group/chip flex h-[46px] shrink-0 flex-col justify-center rounded-lg bg-ink px-3 py-1 text-white shadow-[0_2px_6px_rgba(20,48,85,0.2)] border border-ink/30 transition-transform hover:scale-[1.02] dark:bg-[#132a4a] dark:border-white/20"
                >
                  <span className="font-display text-xs sm:text-[13px] font-black tracking-tight text-white leading-tight">
                    {item.stat}
                  </span>
                  <span className="mt-0.5 text-[10.5px] font-medium text-white/80 leading-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate Track for 100% seamless infinite loop */}
            <div
              className="marquee-track-seamless flex shrink-0 items-center gap-2 pr-2 group-hover/highlight-ticker:[animation-play-state:paused]"
              style={{ animationDuration: `${speed}s` }}
              aria-hidden="true"
            >
              {baseItems.map((item, idx) => (
                <div
                  key={`h2-${item.stat}-${idx}`}
                  className="group/chip flex h-[46px] shrink-0 flex-col justify-center rounded-lg bg-ink px-3 py-1 text-white shadow-[0_2px_6px_rgba(20,48,85,0.2)] border border-ink/30 transition-transform hover:scale-[1.02] dark:bg-[#132a4a] dark:border-white/20"
                >
                  <span className="font-display text-xs sm:text-[13px] font-black tracking-tight text-white leading-tight">
                    {item.stat}
                  </span>
                  <span className="mt-0.5 text-[10.5px] font-medium text-white/80 leading-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
