import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { partners } from "@/data/partners";

interface PartnerTickerProps {
  className?: string;
  showTitle?: boolean;
  speed?: number; // duration in seconds (lower is faster)
}

export function PartnerTicker({ className = "", showTitle = true, speed = 22 }: PartnerTickerProps) {
  // Duplicate list twice for seamless infinite marquee loop
  const marqueeItems = [...partners, ...partners];

  return (
    <div
      className={`relative overflow-hidden border-y border-ink/10 bg-sand/35 py-3 transition-colors ${className}`}
      aria-label="Global Partners and Sponsors"
    >
      {/* Left/Right Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-background via-background/80 to-transparent" />

      <div className="mx-auto flex max-w-[1600px] items-center px-4 sm:px-6">
        {showTitle && (
          <div className="hidden shrink-0 items-center gap-2 border-r border-ink/15 pr-6 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/70 whitespace-nowrap">
              Global Partners &amp; Sponsors
            </span>
            <Link
              to="/impact"
              className="ml-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-clay hover:underline"
            >
              (Impact)
            </Link>
          </div>
        )}

        {/* The continuously moving track */}
        <div className="overflow-hidden w-full flex-1">
          <div
            className="marquee-track flex items-center gap-8 sm:gap-14 hover:[animation-play-state:paused]"
            style={{ animationDuration: `${speed}s` }}
          >
            {marqueeItems.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="group flex shrink-0 items-center gap-3 transition-transform hover:scale-105"
                title={`${partner.name} (${partner.country}) — ${partner.role}`}
              >
                <div className="flex h-8 sm:h-9 items-center justify-center rounded-xl bg-white/90 px-2.5 py-1 shadow-xs border border-ink/8">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    className="max-h-6 sm:max-h-7 max-w-[110px] sm:max-w-[130px] object-contain opacity-75 grayscale contrast-125 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
                <div className="hidden flex-col md:flex">
                  <span className="font-display text-xs font-semibold leading-tight text-ink/85 group-hover:text-clay transition-colors whitespace-nowrap">
                    {partner.name}
                  </span>
                  <span className="text-[0.62rem] font-medium tracking-wider text-ink/50 uppercase whitespace-nowrap">
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
