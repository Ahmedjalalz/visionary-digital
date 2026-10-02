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
    { stat: "100%", label: "Trackable by Sponsor" },
    { stat: "Full Year", label: "Supplies & Notebooks" },
    { stat: "Named", label: "Direct Handover" },
    { stat: "Zero", label: "Dropout Risk" },
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
    <div
      className="relative mt-4 w-full overflow-hidden rounded-xl border border-ink/8 bg-sand/40 py-2.5 transition-colors dark:border-white/8 dark:bg-white/[0.03]"
      aria-label={`${project.name} highlights ticker`}
    >
      {/* Constantly moving marquee track wrapper with smooth CSS mask fade (no clipped boxes) */}
      <div
        className="group/highlight-ticker overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)",
        }}
      >
        <div className="flex w-max">
          {/* Primary Track */}
          <div
            className="marquee-track-seamless flex shrink-0 items-center gap-2.5 pr-2.5 group-hover/highlight-ticker:[animation-play-state:paused]"
            style={{ animationDuration: `${speed}s` }}
          >
            {baseItems.map((item, idx) => (
              <div
                key={`h1-${item.stat}-${idx}`}
                className="group/card flex h-[54px] shrink-0 flex-col justify-center rounded-xl border border-ink/12 bg-white px-4 py-2 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-ink/40 hover:shadow-xs dark:border-white/15 dark:bg-card/90"
              >
                <span className="font-display text-sm sm:text-[0.92rem] font-black tracking-tight text-ink dark:text-white leading-none">
                  {item.stat}
                </span>
                <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-ink/75 dark:text-cream/80 leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Duplicate Track for 100% seamless infinite loop */}
          <div
            className="marquee-track-seamless flex shrink-0 items-center gap-2.5 pr-2.5 group-hover/highlight-ticker:[animation-play-state:paused]"
            style={{ animationDuration: `${speed}s` }}
            aria-hidden="true"
          >
            {baseItems.map((item, idx) => (
              <div
                key={`h2-${item.stat}-${idx}`}
                className="group/card flex h-[54px] shrink-0 flex-col justify-center rounded-xl border border-ink/12 bg-white px-4 py-2 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-ink/40 hover:shadow-xs dark:border-white/15 dark:bg-card/90"
              >
                <span className="font-display text-sm sm:text-[0.92rem] font-black tracking-tight text-ink dark:text-white leading-none">
                  {item.stat}
                </span>
                <span className="mt-1.5 text-[11px] sm:text-xs font-semibold text-ink/75 dark:text-cream/80 leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
