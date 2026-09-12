import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import logoAsset from "@/assets/official/efl-logo.png.asset.json";
import { assetUrl } from "@/lib/asset";

const primary = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

const topSocials = [
  { href: "http://instagram.com/educationandlifefoundation1", label: "Instagram", Icon: Instagram },
  { href: "http://facebook.com/profile.php?id=61582388637046", label: "Facebook", Icon: Facebook },
  { href: "https://wa.me/923009475513", label: "WhatsApp", Icon: MessageCircle },
  { href: "http://youtube.com/@EducationAndLifeFoundation", label: "YouTube", Icon: Youtube },
];

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
      <header
        className="sticky top-0 z-50 w-full border-b border-ink/10 bg-background/95 backdrop-blur-xl transition-all duration-500"
      >
        <div className="border-b border-ink/10 bg-sand/70">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-5 py-[3px] text-[0.6rem] tracking-[0.12em] text-ink/60 sm:px-8">
            <a
              href="https://www.google.com/maps?q=31.507582468159587,74.2878023190929"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 transition-colors hover:text-clay"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
              </span>
              <span className="tabular-nums">31.507582468159587, 74.2878023190929</span>
            </a>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                {topSocials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="text-ink/55 transition-colors hover:text-clay"
                  >
                    <Icon className="h-3 w-3" strokeWidth={1.6} />
                  </a>
                ))}
              </div>
              <a href="tel:+923009475513" className="hidden transition-colors hover:text-clay sm:inline">
                +92 300 9475513
              </a>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${scrolled || open ? "py-2" : "py-3"}`}
        >
          <Link
            to="/"
            className="group flex items-center gap-3 sm:gap-3.5"
            aria-label="Education And Life Foundation — home"
          >
            <img
              src={assetUrl(logoAsset.url)}
              alt="EFL Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-display text-[0.8rem] sm:text-[0.95rem] font-bold uppercase tracking-wide text-ink leading-tight group-hover:text-clay transition-colors">
                Education And Life Foundation
              </span>
              <span className="text-[0.58rem] sm:text-[0.68rem] font-medium tracking-[0.12em] text-clay uppercase leading-tight mt-0.5">
                Uplifting the Lives of Communities
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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
                          <div className="overflow-hidden rounded-sm border border-ink/12 bg-background/98 p-6 shadow-2xl backdrop-blur-2xl">
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
                                    className={`group flex items-start gap-2.5 rounded px-2.5 py-2 transition-colors ${
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

          <div className="flex items-center gap-2">
            <Link
              to="/donate"
              className="hidden border border-clay px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-clay transition-colors hover:bg-clay/10 sm:inline-block"
            >
              Donate
            </Link>
            <Link
              to="/book"
              className="hidden bg-clay px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-clay-deep sm:inline-block"
            >
              Book a meeting
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-ink/20 text-ink lg:hidden"
            >
              <span className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
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
            className="fixed inset-0 z-40 overflow-y-auto bg-background pt-24 pb-16"
          >
            <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
              <div className="flex items-center gap-3 pb-6 pt-4 border-b border-ink/10 mb-2">
                <img
                  src={assetUrl(logoAsset.url)}
                  alt="EFL Logo"
                  className="h-10 w-10 object-contain shrink-0"
                />
                <div>
                  <span className="font-display text-sm font-bold uppercase tracking-wide text-ink block">
                    Education And Life Foundation
                  </span>
                  <span className="text-[0.62rem] font-medium tracking-[0.12em] text-clay uppercase block">
                    Uplifting the Lives of Communities
                  </span>
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
                        <div className="flex items-center justify-between py-5">
                          <Link
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className="font-display text-4xl font-bold text-ink"
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setMobileProjectsOpen((v) => !v)}
                            className="flex h-11 w-11 items-center justify-center rounded border border-ink/15 text-ink"
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
                        className="block py-5 font-display text-4xl font-bold text-ink"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/donate"
                  onClick={() => setOpen(false)}
                  className="inline-block border border-clay px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-clay"
                >
                  Donate
                </Link>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="inline-block bg-clay px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
                >
                  Book a meeting
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
