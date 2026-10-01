import React, { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "elf-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    // Check if the HTML element already has the dark class (set by the head script)
    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch (e) {
    // ignore
  }
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Sync DOM with state
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  // Listen to external changes (e.g. other tabs or system preferences if not manually set)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setThemeState(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if used outside ThemeProvider
    const isDark =
      typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    return {
      theme: isDark ? "dark" : "light",
      isDark,
      setTheme: (t) => {
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", t === "dark");
          localStorage.setItem(STORAGE_KEY, t);
        }
      },
      toggleTheme: () => {
        if (typeof document !== "undefined") {
          const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
          document.documentElement.classList.toggle("dark", next === "dark");
          localStorage.setItem(STORAGE_KEY, next);
        }
      },
    };
  }
  return context;
}

export function ThemeToggle({
  className = "",
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, toggleTheme, isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex items-center gap-2 rounded-full border border-ink/15 bg-background/80 p-2 text-ink backdrop-blur-md transition-all duration-300 hover:border-clay hover:text-clay hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay cursor-pointer ${
        showLabel ? "px-3.5 py-1.5" : "h-9 w-9 justify-center"
      } ${className}`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {/* Sun icon for dark mode */}
        <Sun
          className={`h-4 w-4 transition-all duration-300 ${
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-400 group-hover:text-amber-300"
              : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
        {/* Moon icon for light mode */}
        <Moon
          className={`h-4 w-4 transition-all duration-300 ${
            !mounted || !isDark
              ? "rotate-0 scale-100 opacity-100 text-ink/75 group-hover:text-clay"
              : "rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors">
          {mounted && isDark ? "Light mode" : "Dark mode"}
        </span>
      )}
    </button>
  );
}
