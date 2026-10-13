import { cn } from "@/lib/utils";

interface EducationCrisisBadgeProps {
  className?: string;
}

export function EducationCrisisBadge({ className }: EducationCrisisBadgeProps) {
  return (
    <span
      className={cn(
        "animate-pulse-aggressive inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-red-500/35 bg-red-500/10 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-red-600 shadow-sm backdrop-blur-xs dark:border-red-400/40 dark:bg-red-500/15 dark:text-red-400",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-80" />
        <span className="relative inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-600 dark:bg-red-400" />
      </span>
      <span>Education Crisis in Pakistan</span>
    </span>
  );
}
