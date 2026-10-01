import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { partners } from "@/data/partners";

interface PartnerTickerProps {
  className?: string;
  showTitle?: boolean;
  speed?: number; // duration in seconds (lower is faster)
}

export function PartnerTicker({ className = "", showTitle = true, speed = 14 }: PartnerTickerProps) {
  // Duplicate list twice for seamless infinite marquee loop
  const marqueeItems = [...partners, ...partners];

  return (
    <div
      className={`relative overflow-hidden border-y border-ink/10 bg-sand/35 py-7 sm:py-9 transition-colors ${className}`}
      aria-label="Global Partners and Sponsors"
    >
      {/* Left/Right Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent" />

      <div className="mx-auto flex max-w-[1600px] items-center px-4 sm:px-6">
        {showTitle && (
          <div className="hidden shrink-0 items-center gap-3 border-r border-ink/15 pr-8 lg:flex">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-clay" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/75 whitespace-nowrap">
              Global Partners &amp; Sponsors
            </span>
            <Link
              to="/impact"
              className="ml-1 text-xs font-bold uppercase tracking-[0.14em] text-clay hover:underline"
            >
              (Impact)
            </Link>
          </div>
        )}

        {/* The continuously moving track */}
        <div className="overflow-hidden w-full flex-1">
          <div
            className="marquee-track flex items-center gap-10 sm:gap-16 hover:[animation-play-state:paused]"
            style={{ animationDuration: `${speed}s` }}
          >
            {marqueeItems.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="group flex shrink-0 items-center gap-4 transition-transform hover:scale-105"
                title={`${partner.name} (${partner.country}) — ${partner.role}`}
              >
                <div className="flex h-16 sm:h-20 items-center justify-center rounded-2xl bg-white/95 px-5 py-2.5 shadow-sm border border-ink/10 transition-all duration-300 group-hover:shadow-md dark:bg-card/90 dark:border-white/10">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-12 sm:max-h-15 max-w-[160px] sm:max-w-[210px] object-contain opacity-90 contrast-110 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                  />
                </div>
                <div className="hidden flex-col md:flex">
                  <span className="font-display text-sm sm:text-base font-bold leading-tight text-ink/85 group-hover:text-clay transition-colors whitespace-nowrap">
                    {partner.name}
                  </span>
                  <span className="text-[0.7rem] sm:text-xs font-semibold tracking-wider text-ink/50 uppercase whitespace-nowrap">
                    {partner.country}
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
