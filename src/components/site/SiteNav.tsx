import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
const logo = "/images/official/efl-logo.png";
import { siteSocials } from "@/components/icons/SocialIcons";
import { ThemeToggle } from "@/hooks/use-theme";
import { LanguageToggle } from "@/components/site/LanguageToggle";

const primary = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/impact", label: "Impact" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProjectsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setProjectsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-background/95 backdrop-blur-xl transition-all duration-500">
        <div className="border-b border-white/10 bg-ink text-cream">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 px-3 py-[3px] text-[0.6rem] tracking-[0.1em] text-cream/70 sm:gap-3 sm:px-8 sm:tracking-[0.12em]">
            <a
              href="https://www.google.com/maps?q=31.507582468159587,74.2878023190929"
              target="_blank"
              rel="noreferrer noopener"
              title="ELF Head Office — 181 Raza Block, Allama Iqbal Town, Lahore"
              className="flex items-center gap-1.5 transition-colors hover:text-cream text-cream/80 truncate"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay-bright opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay-bright" />
              </span>
              <span className="tabular-nums font-medium truncate">31.508, 74.288</span>
            </a>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5">
                {siteSocials.map(({ href, label, title, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                    aria-label={label}
                    title={title}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <a
                href="tel:+923009475513"
                className="hidden transition-colors hover:text-cream text-cream/80 sm:inline"
              >
                +92 300 9475513
              </a>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-3 sm:px-8 transition-all duration-500 ${scrolled || open ? "py-2" : "py-2.5 sm:py-3"}`}
        >
          <Link
            to="/"
            className="group flex items-center gap-2 sm:gap-3.5 min-w-0"
            aria-label="Education And Life Foundation — home"
          >
            <picture className="contents">
              <source srcSet="/images/official/efl-logo.webp" type="image/webp" />
              <img
                src={logo}
                alt="ELF Logo"
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
              />
            </picture>
            <div className="flex flex-col min-w-0">
              <span className="font-display text-[0.72rem] min-[360px]:text-[0.8rem] sm:text-[0.95rem] font-bold uppercase tracking-tight sm:tracking-wide text-ink leading-tight truncate group-hover:text-clay transition-colors">
                Education And Life Foundation
              </span>
              <span className="hidden min-[360px]:block text-[0.54rem] sm:text-[0.68rem] font-medium tracking-[0.08em] sm:tracking-[0.12em] text-clay uppercase leading-tight mt-0.5 truncate">
                Uplifting the Lives of Communities
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Primary">
            {primary.map((item) => {
              if (item.to === "/projects") {
                const isProjectsActive = pathname.startsWith("/projects");
                return (
                  <div
                    key={item.to}
                    className="relative py-2"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to="/projects"
                      className={`link-underline flex items-center gap-1.5 text-[0.78rem] font-medium uppercase transition-colors hover:text-clay ${
                        isProjectsActive ? "text-clay font-semibold" : "text-ink/70"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={projectsDropdownOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          projectsDropdownOpen ? "rotate-180 text-clay" : "opacity-60"
                        }`}
                      />
                    </Link>

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {projectsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.985 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.985 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 top-full z-50 w-[min(740px,calc(100vw-3rem))] -translate-x-1/2 pt-2"
                        >
                          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-background/98 p-6 shadow-2xl backdrop-blur-2xl">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                              <div>
                                <span className="eyebrow text-[0.65rem] tracking-[0.2em] text-clay font-semibold uppercase">
                                  Portfolio &amp; Initiatives
                                </span>
                                <h3 className="font-display text-base font-bold text-ink">
                                  Active Programmes Directory
                                </h3>
                              </div>
                              <Link
                                to="/projects"
                                onClick={() => setProjectsDropdownOpen(false)}
                                className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-clay transition-colors hover:text-clay-deep"
                              >
                                <span>View All Projects</span>
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </div>

                            {/* Project list follows the editorial portfolio order. */}
                            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
                              {projects.map((p, idx) => {
                                const isActive = pathname === `/projects/${p.slug}`;
                                return (
                                  <Link
                                    key={p.slug}
                                    to="/projects/$slug"
                                    params={{ slug: p.slug }}
                                    onClick={() => setProjectsDropdownOpen(false)}
                                    className={`group flex items-start gap-2.5 rounded-xl px-3 py-2 transition-colors ${
                                      isActive ? "bg-clay/10" : "hover:bg-sand/70"
                                    }`}
                                  >
                                    <span
                                      className={`numeral shrink-0 pt-0.5 text-xs font-semibold tabular-nums ${
                                        isActive ? "text-clay" : "text-clay/80"
                                      }`}
                                    >
                                      {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <div className="min-w-0">
                                      <div
                                        className={`font-display text-[13px] leading-snug tracking-tight transition-colors ${
                                          isActive
                                            ? "font-bold text-clay"
                                            : "font-medium text-ink group-hover:text-clay"
                                        }`}
                                      >
                                        {p.name}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="link-underline text-[0.78rem] font-medium uppercase text-ink/70 transition-colors hover:text-clay"
                  activeProps={{ className: "text-clay" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              to="/donate"
              className="hidden rounded-full border border-clay px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-clay transition-all hover:bg-clay hover:text-cream shadow-xs sm:inline-block"
            >
              Donate
            </Link>
            <Link
              to="/book"
              className="hidden rounded-full bg-clay px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-clay-deep shadow-xs xl:inline-block"
            >
              Book a meeting
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/20 text-ink transition-colors hover:border-clay hover:text-clay lg:hidden cursor-pointer"
            >
              <span
                className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-background pt-20 pb-24 sm:pt-24 sm:pb-16"
          >
            <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 pt-3 border-b border-ink/10 mb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <picture className="contents">
                    <source srcSet="/images/official/efl-logo.webp" type="image/webp" />
                    <img
                      src={logo}
                      alt="ELF Logo"
                      className="h-10 sm:h-11 w-auto object-contain shrink-0"
                    />
                  </picture>
                  <div className="min-w-0">
                    <span className="font-display text-xs min-[360px]:text-sm font-bold uppercase tracking-wide text-ink block truncate">
                      Education And Life Foundation
                    </span>
                    <span className="text-[0.58rem] min-[360px]:text-[0.62rem] font-medium tracking-[0.1em] sm:tracking-[0.12em] text-clay uppercase block truncate">
                      Uplifting the Lives of Communities
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <LanguageToggle />
                  <ThemeToggle showLabel className="shrink-0" />
                </div>
              </div>
              <ul className="border-t border-ink/10">
                {primary.map((item, i) => {
                  if (item.to === "/projects") {
                    return (
                      <motion.li
                        key={item.to}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}
                        className="border-b border-ink/10"
                      >
                        <div className="flex items-center justify-between py-4 sm:py-5">
                          <Link
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className="font-display text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-bold text-ink"
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileProjectsOpen((v) => !v)}
                            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-clay"
                            aria-label="Toggle projects submenu"
                            aria-expanded={mobileProjectsOpen}
                          >
                            <ChevronDown
                              className={`h-5 w-5 transition-transform duration-200 ${
                                mobileProjectsOpen ? "rotate-180 text-clay" : ""
                              }`}
                            />
                          </button>
                        </div>

                        {mobileProjectsOpen && (
                          <div className="pb-5 pl-2">
                            <Link
                              to="/projects"
                              onClick={() => setOpen(false)}
                              className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-clay hover:underline"
                            >
                              <span>View All Projects Directory</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                            <div className="grid grid-cols-1 gap-1 border-l-2 border-clay/20 pl-3">
                              {projects.map((p, idx) => (
                                <Link
                                   key={p.slug}
                                  to="/projects/$slug"
                                  params={{ slug: p.slug }}
                                  onClick={() => setOpen(false)}
                                  className="flex items-baseline gap-2.5 py-1.5 text-sm text-ink/75 transition-colors hover:text-clay"
                                >
                                  <span className="numeral text-xs text-clay">
                                    {String(idx + 1).padStart(2, "0")}
                                  </span>
                                  <span>{p.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={item.to}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}
                      className="border-b border-ink/10"
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="block py-3.5 sm:py-5 font-display text-xl min-[400px]:text-2xl sm:text-3xl md:text-4xl font-bold text-ink"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                <Link
                  to="/donate"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-clay px-5 py-3 sm:px-7 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-clay transition-all hover:bg-clay hover:text-cream shadow-xs text-center flex-1 sm:flex-initial"
                >
                  Donate
                </Link>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full bg-clay px-5 py-3 sm:px-7 sm:py-3.5 text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-primary-foreground transition-all hover:bg-clay-deep shadow-xs text-center flex-1 sm:flex-initial"
                >
                  Book a meeting
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3 pt-6 border-t border-ink/10">
                {siteSocials.map(({ href, label, title, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                    aria-label={label}
                    title={title}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-clay hover:text-clay"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
