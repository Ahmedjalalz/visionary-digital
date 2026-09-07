import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import logoAsset from "@/assets/official/efl-logo.png.asset.json";

const primary = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
  { to: "/donate", label: "Donate" },
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-background/95 backdrop-blur-xl transition-all duration-500"
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
          <Link to="/" className="group flex items-center gap-3" aria-label="Education and Life Foundation — home">
            <img src={logoAsset.url} alt="" className="h-12 w-12 object-contain" />
            <span className="hidden text-[0.62rem] font-semibold uppercase text-ink/65 sm:block">
              Education&nbsp;&amp;&nbsp;Life Foundation
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {primary.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="link-underline text-[0.78rem] font-medium uppercase text-ink/70 transition-colors hover:text-clay"
                activeProps={{ className: "text-clay" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/book"
              className="hidden bg-clay px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-clay-deep sm:inline-block"
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
              <ul className="border-t border-ink/10">
                {primary.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.5 }}
                    className="border-b border-ink/10"
                  >
                    <Link to={item.to} className="block py-5 font-display text-4xl font-bold text-ink">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                to="/book"
                className="mt-8 inline-block bg-clay px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground"
              >
                Book a meeting
              </Link>
              <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {projects.map((p) => (
                  <Link
                    key={p.slug}
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="py-2 text-sm text-ink/55 transition-colors hover:text-clay"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
