import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, Youtube } from "lucide-react";
import { projects } from "@/data/projects";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact Us" },
  { to: "/donate", label: "Donation" },
  { to: "/book", label: "Book a Meeting" },
] as const;

const socials = [
  { href: "http://instagram.com/educationandlifefoundation1", label: "Instagram", Icon: Instagram },
  { href: "http://facebook.com/profile.php?id=61582388637046", label: "Facebook", Icon: Facebook },
  { href: "https://wa.me/923009475513", label: "WhatsApp", Icon: MessageCircle },
  { href: "http://youtube.com/@EducationAndLifeFoundation", label: "YouTube", Icon: Youtube },
];

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
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pt-20 text-cream">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="font-display text-6xl font-extrabold tracking-[-0.07em]">EFL</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Education and Life Foundation is a non-governmental organisation working with deprived
              communities across Pakistan — education, healthcare, water, and support for families
              carrying more than they should.
            </p>
            <p className="mt-6 font-serif text-2xl leading-snug text-cream/90">
              “To build a better life for the community, and to aid those who cannot help themselves.”
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow">Navigate</h3>
            <ul className="mt-5 space-y-2.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-sm text-cream/70 transition-colors hover:text-clay">
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
                    className="text-sm leading-snug text-cream/70 transition-colors hover:text-clay"
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
              className="mt-5 block text-sm text-cream/80 transition-colors hover:text-clay"
            >
              info@educationandlifefoundation.org
            </a>
            <ul className="mt-6 space-y-4">
              {branches.map((b) => (
                <li key={b.country}>
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-clay">
                    {b.country}
                  </div>
                  <div className="mt-1 text-sm leading-snug text-cream/60">{b.address}</div>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-cream/70 transition-colors hover:border-clay hover:text-clay"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 py-8 text-[0.7rem] uppercase tracking-[0.18em] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Education and Life Foundation</span>
          <span>Lahore · Auckland · Toronto · Berlin</span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none px-2 pb-2 font-display text-[16vw] font-extrabold leading-[0.75] tracking-[-0.07em] text-cream/[0.05]"
      >
        UPLIFTING LIVES
      </div>
    </footer>
  );
}
