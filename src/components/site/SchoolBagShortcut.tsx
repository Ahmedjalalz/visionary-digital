import { useEffect, useState } from "react";
import { ArrowDown, Search } from "lucide-react";

export function SchoolBagShortcut() {
  const [visible, setVisible] = useState(true);

  const handleScrollToTracker = () => {
    const trackerSection = document.getElementById("bag-tracker");
    if (trackerSection) {
      trackerSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const btn = trackerSection.querySelector<HTMLButtonElement>(
          "button[aria-label='Track a school bag']"
        );
        if (btn) btn.click();
      }, 500);
    }
  };

  return (
    <aside
      aria-label="Track sponsored school bag shortcut"
      className="fixed bottom-4 right-3 z-40 sm:bottom-8 sm:right-8"
    >
      <button
        onClick={handleScrollToTracker}
        className="group relative flex items-center gap-2.5 sm:gap-3.5 rounded-full border border-white/60 bg-white/75 sm:bg-white/60 py-2 sm:py-2.5 pl-2 sm:pl-3 pr-3 sm:pr-4.5 shadow-[0_8px_32px_rgba(179,40,36,0.12),inset_0_1px_1px_rgba(255,255,255,0.85)] ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/85 hover:border-clay/40 hover:shadow-[0_12px_40px_rgba(179,40,36,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)] active:scale-95 dark:bg-card/85 dark:border-white/15 dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)] dark:hover:bg-card"
        title="Jump to Bag Tracker"
      >
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-clay" />
        </span>

        {/* Official School in A bag original red logo */}
        <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-clay/20 bg-clay/10 p-1 sm:p-1.5 shadow-inner backdrop-blur-xs transition-transform duration-300 group-hover:scale-105">
          <img
            src="/school-in-a-bag-logo-red.png"
            alt="School in A bag"
            className="h-full w-full object-contain drop-shadow-[0_2px_4px_rgba(179,40,36,0.2)] transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Text tag */}
        <div className="text-left">
          <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-clay">
            <span>School in A bag</span>
          </div>
          <div className="font-display text-xs sm:text-sm md:text-base font-bold tracking-tight text-ink">
            Track My Bag
          </div>
        </div>

        <div className="ml-0.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-clay/20 bg-clay/10 text-clay transition-all duration-300 group-hover:border-transparent group-hover:bg-clay group-hover:text-cream">
          <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </div>
      </button>
    </aside>
  );
}
