import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { Project } from "@/data/projects";
import { PROJECT_HIGHLIGHTS, ProjectHighlight } from "./ProjectHighlightCards";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

const SWATCH_COLORS = [
  "rgba(77,163,255,.45)",
  "rgba(52,211,153,.45)",
  "rgba(251,191,36,.5)",
  "rgba(167,139,250,.45)",
  "rgba(244,114,182,.45)",
  "rgba(45,212,191,.45)",
];

const PROJECT_FOOTER_LABELS: Record<string, string> = {
  "education-for-all": "Every Child",
  "school-bags": "Every Bag",
  "midwifery-program": "Safe Births",
  "music-of-the-heart": "Arts & Joy",
  "health-wash-community-wellbeing": "Clean Water",
  "hope-and-freedom-for-widows-headed-families": "Generational Freedom",
  "community-skills-development": "Vocational Trades",
  "digital-skills-development": "IT & Freelance",
  "community-digital-skills-developments": "Livelihoods",
  "capacity-building": "Governance",
  "faith-hope-love-for-every-child": "Child Protection",
};

export function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const highlights: ProjectHighlight[] =
    PROJECT_HIGHLIGHTS[project.slug] || [
      { stat: project.problem?.figure || "Direct", label: project.problem?.unit || "Field Impact" },
      ...(project.outcomes?.slice(0, 3).map((o) => ({
        stat: o.value,
        label: o.label,
      })) || []),
    ];

  const leftLabel =
    PROJECT_FOOTER_LABELS[project.slug] ||
    project.outcomes?.[0]?.value ||
    "Field Program";

  const badgeNumber = String(index + 1).padStart(2, "0");

  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className={`project-card ${className}`}
    >
      <div className="media">
        <span className="badge">{badgeNumber}</span>
        <picture className="contents">
          {project.image.startsWith("/") && (
            <source srcSet={project.image.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
          )}
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            decoding="async"
            className={project.heroPosition}
            style={
              project.heroPosition?.includes("[")
                ? {
                    objectPosition: project.heroPosition
                      .replace("object-[", "")
                      .replace("]", "")
                      .replace(/_/g, " "),
                  }
                : undefined
            }
          />
        </picture>
      </div>

      <div className="body">
        <h3>{project.name}</h3>
        <p>{project.short}</p>

        <div className="ticker-head">
          <span className="tag">Field highlights</span>
          <span className="live">Live data</span>
        </div>

        <div className="band">
          <div className="ticker" aria-label={`${project.name} highlights`}>
            <div className="track">
              {/* Group 1 */}
              <div className="group">
                {highlights.map((item, i) => (
                  <Fragment key={`g1-${item.stat}-${i}`}>
                    <div
                      className="item"
                      style={
                        {
                          "--i": i,
                          "--sw": SWATCH_COLORS[i % SWATCH_COLORS.length],
                        } as React.CSSProperties
                      }
                    >
                      <b>{item.stat}</b>
                      <span>{item.label}</span>
                    </div>
                    <i className="sep" />
                  </Fragment>
                ))}
              </div>

              {/* Group 2 (duplicate for seamless infinite scroll) */}
              <div className="group" aria-hidden="true">
                {highlights.map((item, i) => (
                  <Fragment key={`g2-${item.stat}-${i}`}>
                    <div
                      className="item"
                      style={
                        {
                          "--i": i,
                          "--sw": SWATCH_COLORS[i % SWATCH_COLORS.length],
                        } as React.CSSProperties
                      }
                    >
                      <b>{item.stat}</b>
                      <span>{item.label}</span>
                    </div>
                    <i className="sep" />
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="foot">
        <span className="left" title={leftLabel}>{leftLabel}</span>
        <span className="explore">
          Explore
          <span className="arr">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}
