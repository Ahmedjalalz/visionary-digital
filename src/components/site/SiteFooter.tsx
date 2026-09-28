import { Link } from "@tanstack/react-router";
import { ShieldCheck, FileCheck, Award, BadgeCheck } from "lucide-react";
import { projects } from "@/data/projects";
import logo from "@/assets/official-local/efl-logo.png";
import { siteSocials } from "@/components/icons/SocialIcons";

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
    <footer className="relative overflow-hidden border-t border-ink/10 bg-sand pt-20 text-ink">
      <div className="mx-auto max-w-[1600px] px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={logo} alt="Education and Life Foundation" className="h-24 w-24 object-contain" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              Education and Life Foundation is a non-governmental organisation working with deprived
              communities across Pakistan — education, healthcare, water, and support for families
              carrying more than they should.
            </p>
            <p className="mt-6 font-serif text-2xl leading-snug text-ink/90">
              “To build a better life for the community, and to aid those who cannot help themselves.”
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow">Navigate</h3>
            <ul className="mt-5 space-y-2.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-sm text-ink/70 transition-colors hover:text-clay">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow">Projects</h3>
            <ul className="mt-5 space-y-2.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="text-sm leading-snug text-ink/70 transition-colors hover:text-clay"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow">Contact</h3>
            <a
              href="mailto:info@educationandlifefoundation.org"
               className="mt-5 block text-sm text-ink/80 transition-colors hover:text-clay"
            >
              info@educationandlifefoundation.org
            </a>
            <ul className="mt-6 space-y-4">
              {branches.map((b) => (
                <li key={b.country}>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-clay">
                    {b.country}
                  </div>
                   <div className="mt-1 text-sm leading-snug text-ink/60">{b.address}</div>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              {siteSocials.map(({ href, label, title, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                  aria-label={label}
                  title={title}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all hover:border-clay hover:text-clay hover:shadow-xs"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Official Government & Regulatory Registrations Strip */}
      <div className="border-t border-ink/10 bg-sand/65 py-8 sm:py-10">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay" />
                </span>
                <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-clay">
                  Legal Status &amp; Registrations
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink/70">
                Education And Life Foundation (ELF) is an accredited non-profit organization operating in full compliance with federal and provincial regulatory bodies in Pakistan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 flex-1 lg:max-w-4xl">
              {/* Reg 1: Societies Act */}
              <div className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white/85 p-3.5 shadow-2xs backdrop-blur-xs transition-all hover:border-clay/40 hover:bg-white hover:shadow-xs">
                <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <div className="min-w-0">
                  <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-ink/50">
                    Govt. Registration
                  </span>
                  <span className="block font-mono text-xs font-bold text-ink sm:text-[0.82rem] tracking-tight">
                    RP/11181-L/S/18/728
                  </span>
                  <span className="block text-[0.65rem] text-ink/65">
                    Societies Registration Act
                  </span>
                </div>
              </div>

              {/* Reg 2: Charity Commission */}
              <div className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white/85 p-3.5 shadow-2xs backdrop-blur-xs transition-all hover:border-clay/40 hover:bg-white hover:shadow-xs">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <div className="min-w-0">
                  <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-ink/50">
                    Charity Number
                  </span>
                  <span className="block font-mono text-xs font-bold text-ink sm:text-[0.82rem] tracking-tight truncate" title="PB-2194002019418135">
                    PB-2194002019418135
                  </span>
                  <span className="block text-[0.65rem] text-ink/65">
                    Punjab Charity Commission
                  </span>
                </div>
              </div>

              {/* Reg 3: PCP */}
              <div className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white/85 p-3.5 shadow-2xs backdrop-blur-xs transition-all hover:border-clay/40 hover:bg-white hover:shadow-xs">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <div className="min-w-0">
                  <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-ink/50">
                    PCP Registered ID
                  </span>
                  <span className="block font-mono text-xs font-bold text-ink sm:text-[0.82rem] tracking-tight">
                    PCP/2022/1056
                  </span>
                  <span className="block text-[0.65rem] text-ink/65">
                    Pakistan Centre for Philanthropy
                  </span>
                </div>
              </div>

              {/* Reg 4: Tax Exemption */}
              <div className="flex items-start gap-3 rounded-xl border border-ink/10 bg-white/85 p-3.5 shadow-2xs backdrop-blur-xs transition-all hover:border-clay/40 hover:bg-white hover:shadow-xs">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                <div className="min-w-0">
                  <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-ink/50">
                    Tax Exemption
                  </span>
                  <span className="block font-mono text-xs font-bold text-ink sm:text-[0.82rem] tracking-tight">
                    Section 2(36)2
                  </span>
                  <span className="block text-[0.65rem] text-ink/65">
                    Income Tax Ordinance · FBR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/20 bg-ink text-cream">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-[0.7rem] uppercase tracking-[0.16em] text-cream/80 font-medium sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {new Date().getFullYear()} Education and Life Foundation</span>
            <span className="hidden text-cream/40 sm:inline">|</span>
            <span className="text-cream/65 lowercase text-[0.68rem] tracking-normal">Registered Non-Profit (RP/11181-L/S/18/728)</span>
          </div>
          <span className="text-cream/65">Lahore · Auckland · Toronto · Berlin</span>
        </div>
      </div>
    </footer>
  );
}
