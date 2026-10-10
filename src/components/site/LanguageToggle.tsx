import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface LanguageToggleProps {
  className?: string;
  showFullLabel?: boolean;
}

export function LanguageToggle({
  className = "",
  showFullLabel = false,
}: LanguageToggleProps) {
  const { language, toggleLanguage, isSpanish } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isSpanish ? "Cambiar a inglés (Switch to English)" : "Cambiar a español (Switch to Spanish)"}
      title={isSpanish ? "Switch to English" : "Cambiar a Español"}
      className={`group relative flex items-center gap-1.5 rounded-full border border-ink/15 bg-background/80 px-2.5 py-1.5 text-ink backdrop-blur-md transition-all duration-300 hover:border-clay hover:text-clay hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay cursor-pointer ${className}`}
    >
      <Globe className="h-3.5 w-3.5 text-clay transition-transform duration-300 group-hover:rotate-12" />
      <div className="flex items-center text-[0.68rem] font-bold tracking-wider uppercase font-mono">
        <span
          className={`transition-colors duration-200 ${
            !isSpanish ? "text-clay font-extrabold" : "text-ink/40"
          }`}
        >
          EN
        </span>
        <span className="mx-0.5 text-ink/30">/</span>
        <span
          className={`transition-colors duration-200 ${
            isSpanish ? "text-clay font-extrabold" : "text-ink/40"
          }`}
        >
          ES
        </span>
      </div>

      {showFullLabel && (
        <span className="ml-1 text-[0.65rem] font-medium text-ink/65 uppercase tracking-wider">
          {isSpanish ? "Español" : "English"}
        </span>
      )}
    </button>
  );
}
