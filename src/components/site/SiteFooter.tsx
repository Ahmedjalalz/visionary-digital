import { Link } from "@tanstack/react-router";
import { ShieldCheck, FileCheck, Award, BadgeCheck } from "lucide-react";
import { projects } from "@/data/projects";
import logo from "@/assets/official-local/efl-logo.png";
import { siteSocials } from "@/components/icons/SocialIcons";
import { ThemeToggle } from "@/hooks/use-theme";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/projects", label: "Projects" },
  { to: "/impact", label: "Impact" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact Us" },
  { to: "/donate", label: "Donation" },
  { to: "/book", label: "Book a Meeting" },
] as const;

export const branches = [
  {
    country: "Pakistan",
    city: "Lahore — Head Office",
    address: "181 Raza Block, Allama Iqbal Town, Lahore, Pakistan",
    phone: "+92 300 9475513",
    query: "181 Raza Block, Allama Iqbal Town, Lahore, Pakistan",
  },
  {
    country: "New Zealand",
    city: "Auckland",
    address: "Regional representation — Auckland, New Zealand",
    phone: null,
    query: "Auckland, New Zealand",
  },
  {
    country: "Canada",
    city: "Toronto",
    address: "Regional representation — Toronto, Ontario, Canada",
    phone: null,
    query: "Toronto, Ontario, Canada",
  },
  {
    country: "Germany",
    city: "Berlin",
    address: "Regional representation — Berlin, Germany",
    phone: null,
    query: "Berlin, Germany",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-sand pt-16 sm:pt-20 lg:pt-24 text-ink">
      <div className="mx-auto max-w-[1600px] px-6 pb-12 sm:px-8 sm:pb-16 lg:pb-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Education and Life Foundation"
                  className="h-14 w-14 sm:h-16 sm:w-16 object-contain rounded-xl p-1 transition-all bg-white/85 dark:bg-white/95 shadow-2xs shrink-0"
                />
                <div>
                  <span className="font-display text-base sm:text-lg font-bold tracking-tight text-ink block leading-snug">
                    Education and Life Foundation
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em] font-semibold text-clay block mt-0.5">
                    Established · Lahore, Pakistan
                  </span>
                </div>
              </div>
              <p className="mt-4 sm:mt-5 max-w-sm text-xs sm:text-[13px] leading-relaxed text-ink/75">
                A registered non-profit organization serving marginalized and vulnerable communities across
                Pakistan through education, healthcare, livelihoods, and humanitarian relief.
              </p>
            </div>
            <p className="mt-8 sm:mt-10 font-serif text-sm sm:text-base italic leading-relaxed text-ink/80 border-l-2 border-clay pl-3.5">
              “To build a better life for the community, and to aid those who cannot help themselves.”
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow tracking-[0.22em]">Navigate</h3>
            <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-3.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-xs sm:text-[13px] font-medium text-ink/75 transition-colors hover:text-clay"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects / Initiatives */}
          <div className="lg:col-span-4">
            <h3 className="eyebrow tracking-[0.22em]">Initiatives</h3>
            <ul className="mt-5 sm:mt-6 space-y-3 sm:space-y-3.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="text-xs sm:text-[13px] font-medium leading-relaxed text-ink/75 transition-colors hover:text-clay block"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Global Presence */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow tracking-[0.22em]">Contact &amp; Offices</h3>
            <a
              href="mailto:info@educationandlifefoundation.org"
              className="mt-5 sm:mt-6 block text-xs sm:text-[13px] font-medium text-ink/85 transition-colors hover:text-clay truncate"
            >
              info@educationandlifefoundation.org
            </a>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-3.5">
              {branches.map((b) => (
                <div key={b.country} className="text-xs">
                  <span className="font-semibold text-clay text-[0.66rem] uppercase tracking-wider block">
                    {b.city}
                  </span>
                  <span className="text-[11.5px] text-ink/70 leading-relaxed block mt-0.5">
                    {b.address}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2.5">
              {siteSocials.map(({ href, label, title, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                  aria-label={label}
                  title={title}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-clay hover:text-clay hover:bg-clay/10"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
              <ThemeToggle className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Darker Strip with Integrated Legal Registrations & Copyright */}
      <div className="border-t border-ink/20 bg-ink text-cream">
        <div className="mx-auto max-w-[1600px] px-6 py-6 sm:px-8 sm:py-7">
          {/* Legal Status & Registrations inside darker strip */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 sm:pb-5 border-b border-cream/15">
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay-bright opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay-bright" />
              </span>
              <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-clay-bright">
                Accredited Legal Status &amp; Registrations
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 flex-1 lg:max-w-4xl">
              {/* Reg 1: Societies Act */}
              <div className="flex items-center gap-2.5 rounded-lg border border-cream/10 bg-white/5 px-3 py-2 backdrop-blur-xs">
                <FileCheck className="h-3.5 w-3.5 shrink-0 text-clay-bright" />
                <div className="min-w-0">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-wider text-cream/50">
                    Govt. Reg
                  </span>
                  <span className="block font-mono text-[0.72rem] font-bold text-cream tracking-tight truncate">
                    RP/11181-L/S/18/728
                  </span>
                </div>
              </div>

              {/* Reg 2: Charity Commission */}
              <div className="flex items-center gap-2.5 rounded-lg border border-cream/10 bg-white/5 px-3 py-2 backdrop-blur-xs">
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-clay-bright" />
                <div className="min-w-0">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-wider text-cream/50">
                    Punjab Charity
                  </span>
                  <span
                    className="block font-mono text-[0.72rem] font-bold text-cream tracking-tight truncate"
                    title="PB-2194002019418135"
                  >
                    PB-2194002019418135
                  </span>
                </div>
              </div>

              {/* Reg 3: PCP */}
              <div className="flex items-center gap-2.5 rounded-lg border border-cream/10 bg-white/5 px-3 py-2 backdrop-blur-xs">
                <Award className="h-3.5 w-3.5 shrink-0 text-clay-bright" />
                <div className="min-w-0">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-wider text-cream/50">
                    PCP Certified
                  </span>
                  <span className="block font-mono text-[0.72rem] font-bold text-cream tracking-tight truncate">
                    PCP/2022/1056
                  </span>
                </div>
              </div>

              {/* Reg 4: Tax Exemption */}
              <div className="flex items-center gap-2.5 rounded-lg border border-cream/10 bg-white/5 px-3 py-2 backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-clay-bright" />
                <div className="min-w-0">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-wider text-cream/50">
                    FBR Tax Exempt
                  </span>
                  <span className="block font-mono text-[0.72rem] font-bold text-cream tracking-tight truncate">
                    Sec. 2(36)2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Global Presence */}
          <div className="flex flex-col gap-2 pt-3.5 sm:pt-4 text-[0.68rem] uppercase tracking-[0.15em] text-cream/75 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>© {new Date().getFullYear()} Education and Life Foundation</span>
              <span className="hidden text-cream/35 sm:inline">|</span>
              <span className="text-cream/60 lowercase tracking-normal text-[0.66rem]">
                Non-governmental organisation registered in Pakistan
              </span>
            </div>
            <span className="text-cream/60">Lahore · Auckland · Toronto · Berlin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
