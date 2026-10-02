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
      className="relative mt-4 w-full overflow-hidden rounded-xl border border-clay/15 bg-gradient-to-r from-sand/70 via-sand/30 to-sand/70 py-2.5 transition-colors dark:border-clay/25 dark:bg-card/40"
      aria-label={`${project.name} highlights ticker`}
    >
      {/* Constantly moving marquee track wrapper with smooth CSS mask fade (no clipped boxes) */}
      <div
        className="group/highlight-ticker overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 24px, black calc(100% - 24px), transparent 100%)",
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
                className="group/card relative flex h-[52px] shrink-0 items-center rounded-xl border border-clay/20 bg-gradient-to-r from-white via-white to-clay/[0.07] pl-3 pr-4 py-1.5 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:border-clay/50 hover:shadow-xs dark:border-clay/30 dark:from-card/95 dark:via-card/90 dark:to-clay/15 dark:hover:border-clay-bright"
              >
                {/* Theme color gradient accent pill */}
                <div className="mr-2.5 flex h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-clay to-clay/40 transition-transform duration-200 group-hover/card:scale-y-110 dark:from-clay-bright dark:to-clay/50" />
                <div className="flex flex-col justify-center">
                  <span className="font-display text-xs sm:text-[0.82rem] font-black tracking-tight text-clay leading-none dark:text-clay-bright">
                    {item.stat}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold text-ink/85 dark:text-cream/90 leading-none whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
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
                className="group/card relative flex h-[52px] shrink-0 items-center rounded-xl border border-clay/20 bg-gradient-to-r from-white via-white to-clay/[0.07] pl-3 pr-4 py-1.5 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:border-clay/50 hover:shadow-xs dark:border-clay/30 dark:from-card/95 dark:via-card/90 dark:to-clay/15 dark:hover:border-clay-bright"
              >
                {/* Theme color gradient accent pill */}
                <div className="mr-2.5 flex h-6 w-1 shrink-0 rounded-full bg-gradient-to-b from-clay to-clay/40 transition-transform duration-200 group-hover/card:scale-y-110 dark:from-clay-bright dark:to-clay/50" />
                <div className="flex flex-col justify-center">
                  <span className="font-display text-xs sm:text-[0.82rem] font-black tracking-tight text-clay leading-none dark:text-clay-bright">
                    {item.stat}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold text-ink/85 dark:text-cream/90 leading-none whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
