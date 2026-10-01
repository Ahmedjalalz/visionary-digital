import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export const WIDOWS_HERO_IMAGES = Array.from({ length: 28 }, (_, i) => ({
  src: `/images/widows/hero/${i + 1}.jpg`,
  alt: `ELF Widows Welfare & Family Liberation Program — Field Photograph ${i + 1}`,
}));

export function WidowsHeroCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 32,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay timer with pause on hover/interaction
  useEffect(() => {
    if (!emblaApi || isHovered || isAutoplayPaused) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4200);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered, isAutoplayPaused]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div
      className="relative w-full overflow-hidden select-none py-6 sm:py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* ── Carousel Viewport Stage ── */}
      <div className="relative mx-auto max-w-[1700px] px-3 sm:px-6">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex -ml-4 sm:-ml-6 lg:-ml-8 items-center">
            {WIDOWS_HERO_IMAGES.map((img, index) => {
              const isCenter = index === selectedIndex;

              return (
                <div
                  key={img.src}
                  onClick={() => {
                    if (!isCenter) scrollTo(index);
                  }}
                  className={`relative flex-[0_0_86%] sm:flex-[0_0_80%] lg:flex-[0_0_76%] max-w-[1240px] pl-4 sm:pl-6 lg:pl-8 shrink-0 ${
                    isCenter ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isCenter
                        ? "scale-100 opacity-100 shadow-[0_25px_60px_-15px_rgba(13,57,135,0.28)] ring-1 ring-ink/10"
                        : "scale-[0.91] opacity-40 hover:opacity-70 blur-[0.4px] brightness-95"
                    }`}
                  >
                    {/* Aspect Ratio Box (cinematic 16:9 / responsive height) */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[580px] min-h-[260px] sm:min-h-[420px] bg-sand">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading={index < 4 ? "eager" : "lazy"}
                        className="h-full w-full object-cover object-[center_18%] transition-transform duration-1000 ease-out"
                      />

                      {/* Ambient gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent opacity-60" />

                      {/* Center active photo indicator stamp */}
                      {isCenter && (
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 rounded-full border border-white/30 bg-ink/40 px-3.5 py-1.5 backdrop-blur-md text-white shadow-lg">
                          <span className="h-2 w-2 rounded-full bg-clay-bright shadow-[0_0_8px_#62B7FF] animate-pulse" />
                          <span className="text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.18em]">
                            Field Archive · {String(index + 1).padStart(2, "0")} of 28
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Floating Frosted Navigation Arrows ── */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous photograph"
          className="absolute left-5 sm:left-10 lg:left-14 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/60 bg-white/75 sm:bg-white/85 backdrop-blur-md text-ink shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-clay active:scale-95 focus:outline-none focus:ring-2 focus:ring-clay dark:border-white/15 dark:bg-card/85 dark:hover:bg-card dark:text-foreground"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next photograph"
          className="absolute right-5 sm:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/60 bg-white/75 sm:bg-white/85 backdrop-blur-md text-ink shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-clay active:scale-95 focus:outline-none focus:ring-2 focus:ring-clay dark:border-white/15 dark:bg-card/85 dark:hover:bg-card dark:text-foreground"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
        </button>
      </div>

      {/* ── Interactive Pagination Dots & Controls Beneath ── */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          {/* Pause / Play toggle for user comfort */}
          <button
            type="button"
            onClick={() => setIsAutoplayPaused((p) => !p)}
            aria-label={isAutoplayPaused ? "Resume slideshow" : "Pause slideshow"}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-clay hover:text-clay"
            title={isAutoplayPaused ? "Resume auto-play" : "Pause auto-play"}
          >
            {isAutoplayPaused ? (
              <Play className="h-3 w-3 fill-current ml-0.5" />
            ) : (
              <Pause className="h-3 w-3 fill-current" />
            )}
          </button>

          {/* Dots row */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full border border-ink/10 bg-sand/50 backdrop-blur-xs max-w-[92vw] overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Carousel pagination"
          >
            {WIDOWS_HERO_IMAGES.map((_, i) => {
              const isActive = i === selectedIndex;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Jump to photograph ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={`rounded-full transition-all duration-300 ease-out focus:outline-none ${
                    isActive
                      ? "h-2.5 w-6 sm:w-7 bg-clay shadow-[0_0_8px_rgba(13,57,135,0.4)]"
                      : "h-2 w-2 bg-ink/20 hover:bg-ink/45 hover:scale-125"
                  }`}
                />
              );
            })}
          </div>

          {/* Numeric index display */}
          <div className="font-mono text-xs font-semibold text-ink/60 tabular-nums">
            <span className="text-clay font-bold">{String(selectedIndex + 1).padStart(2, "0")}</span>
            <span className="text-ink/30 mx-1">/</span>
            <span>28</span>
          </div>
        </div>

        <p className="text-[0.68rem] tracking-wider uppercase text-ink/45 font-medium">
          Drag or click arrows to explore field documentation
        </p>
      </div>
    </div>
  );
}
