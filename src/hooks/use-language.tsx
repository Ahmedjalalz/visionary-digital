import React, { createContext, useContext, useEffect, useState, useTransition, useCallback } from "react";
import translationsEs from "@/data/translations_es.json";

export type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isSpanish: boolean;
  t: (key: string) => string;
}

const STORAGE_KEY = "elf-language";
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Typed dictionary
const esDict = translationsEs as Record<string, string>;

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") {
      return saved;
    }
  } catch (e) {
    // ignore
  }
  return "en";
}

/**
 * Robust in-memory translation lookup.
 * 1. Checks exact match
 * 2. Checks trimmed match
 * 3. Normalizes whitespace
 */
export function translateText(text: string, lang: Language): string {
  if (lang === "en" || !text) return text;
  
  // Exact match
  if (esDict[text]) return esDict[text];

  const trimmed = text.trim();
  if (esDict[trimmed]) {
    // Preserve leading and trailing whitespace
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    return leading + esDict[trimmed] + trailing;
  }

  // Normalized whitespace
  const normalized = trimmed.replace(/\s+/g, " ");
  if (esDict[normalized]) {
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    return leading + esDict[normalized] + trailing;
  }

  return text;
}

/**
 * Client DOM text-node translator that traverses only visible text nodes.
 * Preserves original English in data attributes and replaces nodeValue.
 */
function applyDomTranslations(lang: Language) {
  if (typeof document === "undefined") return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        const val = node.nodeValue.trim();
        // Skip purely numeric or punctuation values (e.g. counters, percentages, coordinates)
        if (!val || /^[0-9\s.,\/#!$%\^&\*;:{}=\-_`~()•|+]+$/.test(val)) {
          return NodeFilter.FILTER_REJECT;
        }

        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tagName = parent.tagName;
        if (
          tagName === "SCRIPT" ||
          tagName === "STYLE" ||
          tagName === "NOSCRIPT" ||
          tagName === "CODE" ||
          tagName === "PRE" ||
          parent.getAttribute("translate") === "no" ||
          parent.classList.contains("notranslate") ||
          parent.classList.contains("numeral") ||
          parent.closest(".notranslate, [data-no-translate]")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  for (const node of nodes) {
    const current = node.nodeValue || "";
    const original = (node as unknown as { __originalEnText?: string }).__originalEnText ?? current;
    if (!(node as unknown as { __originalEnText?: string }).__originalEnText) {
      (node as unknown as { __originalEnText?: string }).__originalEnText = original;
    }

    if (lang === "es") {
      const translated = translateText(original, "es");
      if (translated !== current) {
        node.nodeValue = translated;
      }
    } else {
      if (current !== original) {
        node.nodeValue = original;
      }
    }
  }

  // Also translate input placeholders and titles
  const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[placeholder], textarea[placeholder]");
  inputs.forEach((el) => {
    const orig = el.getAttribute("data-orig-ph") || el.placeholder;
    if (!el.getAttribute("data-orig-ph")) {
      el.setAttribute("data-orig-ph", orig);
    }
    if (lang === "es") {
      el.placeholder = translateText(orig, "es");
    } else {
      el.placeholder = orig;
    }
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [, startTransition] = useTransition();

  const t = useCallback(
    (key: string): string => {
      return translateText(key, language);
    },
    [language]
  );

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {
      // ignore
    }

    // Apply translations across DOM
    applyDomTranslations(language);

    // Set up a MutationObserver with requestIdleCallback/requestAnimationFrame debouncing
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver((mutations) => {
      if (language !== "es") return;

      // Only trigger if added nodes contain element nodes (ignore pure characterData ticks)
      const hasAddedElements = mutations.some(
        (m) => m.type === "childList" && m.addedNodes.length > 0
      );

      if (hasAddedElements) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          applyDomTranslations("es");
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      // Do NOT observe characterData so animation timers/counters are never interrupted
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [language]);

  const setLanguage = (newLang: Language) => {
    startTransition(() => {
      setLanguageState(newLang);
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isSpanish: language === "es",
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en",
      setLanguage: () => {},
      toggleLanguage: () => {},
      isSpanish: false,
      t: (k: string) => k,
    };
  }
  return context;
}
