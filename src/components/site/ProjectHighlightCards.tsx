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

export function ProjectHighlightCards({ project, speed = 10 }: ProjectHighlightCardsProps) {
  // Get tailored highlights or synthesize from project data
  const highlights: ProjectHighlight[] =
    PROJECT_HIGHLIGHTS[project.slug] || [
      { stat: project.problem?.figure || "Direct", label: project.problem?.unit || "Field Impact" },
      ...(project.outcomes?.slice(0, 3).map((o) => ({
        stat: o.value,
        label: o.label,
      })) || []),
    ];

  // Duplicate identically for seamless -50% infinite marquee loop
  const baseItems = highlights.length < 5 ? [...highlights, ...highlights] : highlights;
  const loopItems = [...baseItems, ...baseItems];

  return (
    <div
      className="relative mt-4 w-full overflow-hidden rounded-xl border border-ink/8 bg-sand/30 py-2.5 transition-colors"
      aria-label={`${project.name} highlights ticker`}
    >
      {/* Edge Fades for smooth entry/exit */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-background via-background/70 to-transparent" />

      {/* Constantly moving marquee track */}
      <div className="overflow-hidden w-full">
        <div
          className="marquee-track flex items-center gap-2.5 hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {loopItems.map((item, idx) => (
            <div
              key={`${item.stat}-${idx}`}
              className="group/card flex h-[76px] w-[86px] sm:h-[82px] sm:w-[92px] shrink-0 flex-col items-center justify-center rounded-lg border border-ink/10 bg-white/90 p-2 text-center shadow-2xs transition-all duration-200 group-hover/card:border-clay/40 group-hover/card:bg-white group-hover/card:shadow-xs"
            >
              <span className="font-display text-xs sm:text-[0.82rem] font-extrabold tracking-tight text-clay leading-tight line-clamp-1">
                {item.stat}
              </span>
              <span className="mt-1 text-[0.60rem] sm:text-[0.64rem] font-semibold leading-tight text-ink/75 line-clamp-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
