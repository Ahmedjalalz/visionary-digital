import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Globe,
  Calendar,
  Search,
  Printer,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Scale,
  FileText,
  AlertCircle,
  HelpCircle,
  BadgeAlert,
  CreditCard,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { LegalDocument, ELF_LEGAL_CONTACT } from "@/data/legalPolicies";

interface Props {
  doc: LegalDocument;
  highlightSectionId?: string;
}

const POLICY_TABS = [
  { id: "privacy-policy", href: "/privacy-policy", label: "Privacy Policy" },
  { id: "terms-and-conditions", href: "/terms-and-conditions", label: "Terms & Conditions" },
  { id: "refund-policy", href: "/refund-policy", label: "Refund Policy" },
  { id: "chargeback-policy", href: "/chargeback-policy", label: "Chargeback Policy" },
] as const;

export function LegalDocumentViewer({ doc, highlightSectionId }: Props) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Policy link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Filter sections based on search query
  const filteredSections = useMemo(() => {
    if (!search.trim()) return doc.sections;
    const query = search.toLowerCase();

    return doc.sections.filter((sec) => {
      const matchTitle = sec.title.toLowerCase().includes(query);
      const matchNumber = sec.number.includes(query);
      const matchContent = sec.content.some((p) => p.toLowerCase().includes(query));
      const matchSub = sec.subsections?.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.content.some((p) => p.toLowerCase().includes(query)),
      );
      return matchTitle || matchNumber || matchContent || matchSub;
    });
  }, [doc.sections, search]);

  return (
    <div className="bg-sand/30 min-h-screen text-ink pb-24">
      {/* Top Breadcrumb & Accreditation Banner */}
      <div className="border-b border-ink/10 bg-sand/60 px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-ink/70">
            <Link to="/" className="hover:text-clay transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink font-medium">Compliance &amp; Legal Policies</span>
            <span>/</span>
            <span className="text-clay font-semibold">{doc.shortTitle}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-ink/70">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">
              Govt. Reg: RP/11181-L/S/18/728 · Punjab Charity: PB-2194002019418135
            </span>
            <span className="sm:hidden">Reg: RP/11181-L</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="relative bg-sand border-b border-ink/10 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              <Scale className="h-3.5 w-3.5" />
              Official Foundation Policy
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {doc.title}
            </h1>

            <p className="mt-3 font-serif text-lg italic text-ink/80 sm:text-xl">{doc.subtitle}</p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/75 sm:text-base">
              {doc.summary}
            </p>
          </div>

          {/* Quick Legal Dossier Grid */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 pt-6 border-t border-ink/10">
            <div className="rounded-xl border border-ink/10 bg-background/80 p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                <Calendar className="h-3.5 w-3.5 text-clay" />
                Effective Date
              </div>
              <div className="mt-1 font-mono text-sm font-bold text-ink">{doc.effectiveDate}</div>
              <div className="mt-0.5 text-[11px] text-ink/60">Subject to annual review</div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-background/80 p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                <Building2 className="h-3.5 w-3.5 text-clay" />
                Head Office
              </div>
              <div
                className="mt-1 text-xs font-medium text-ink line-clamp-2"
                title={doc.headOffice}
              >
                {doc.headOffice}
              </div>
              <div className="mt-0.5 text-[11px] text-ink/60">Registered in Pakistan</div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-background/80 p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                <Mail className="h-3.5 w-3.5 text-clay" />
                Enquiries &amp; Disputes
              </div>
              <a
                href={`mailto:${doc.email}`}
                className="mt-1 block text-xs font-bold text-clay hover:underline truncate"
              >
                {doc.email}
              </a>
              <div className="mt-0.5 text-[11px] text-ink/60">Phone: {doc.phone}</div>
            </div>

            <div className="rounded-xl border border-ink/10 bg-background/80 p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
                <Globe className="h-3.5 w-3.5 text-clay" />
                Governing Law
              </div>
              <div className="mt-1 text-xs font-bold text-ink">Laws of Pakistan</div>
              <div className="mt-0.5 text-[11px] text-ink/60">Courts of Lahore Jurisdiction</div>
            </div>
          </div>
        </div>
      </header>

      {/* Policy Navigation Tabs */}
      <nav
        aria-label="Legal documents"
        className="sticky top-[58px] z-30 border-b border-ink/10 bg-background/95 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between overflow-x-auto px-4 py-2 sm:px-8">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {POLICY_TABS.map((tab) => {
              const isActive = doc.id === tab.id;
              return (
                <Link
                  key={tab.id}
                  to={tab.href}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-clay text-primary-foreground shadow-xs"
                      : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-background px-3 py-1.5 text-xs font-medium text-ink/80 hover:bg-ink/5 transition-colors"
              title="Copy shareable link"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-background px-3 py-1.5 text-xs font-medium text-ink/80 hover:bg-ink/5 transition-colors"
              title="Print document"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Specific Featured Callout for Chargeback or Refund pages */}
      {doc.id === "chargeback-policy" && (
        <div className="mx-auto mt-6 max-w-[1600px] px-4 sm:px-8">
          <div className="rounded-2xl border-2 border-clay/30 bg-clay/5 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-clay text-white">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-ink sm:text-lg">
                    Notice to Donors &amp; Banking Partners Concerning Chargebacks
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-ink/75 leading-relaxed max-w-3xl">
                    ELF complies with international and domestic merchant banking guidelines. Before
                    initiating an unnecessary banking chargeback, donors are encouraged to reach out
                    to us at{" "}
                    <a
                      href="mailto:info@educationandlifefoundation.org"
                      className="font-semibold text-clay underline"
                    >
                      info@educationandlifefoundation.org
                    </a>
                    . Genuine errors, duplicate transfers, or clerical discrepancies are resolved
                    promptly and amicably without administrative penalties.
                  </p>
                </div>
              </div>
              <a
                href="#sec-9"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-clay px-4 py-2.5 text-xs font-semibold text-white hover:bg-clay-deep transition-colors"
              >
                Jump to Section 9 (Chargebacks)
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {doc.id === "refund-policy" && (
        <div className="mx-auto mt-6 max-w-[1600px] px-4 sm:px-8">
          <div className="rounded-2xl border border-ink/15 bg-sand/80 p-5 sm:p-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                    14-Day Notice Window
                  </h3>
                  <p className="mt-1 text-xs text-ink/70">
                    Donors identifying unintended or duplicate transfers are encouraged to notify
                    ELF within 14 calendar days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                    Verified Return
                  </h3>
                  <p className="mt-1 text-xs text-ink/70">
                    Approved refunds are credited directly back to the original funding account to
                    prevent fraud or diversion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                    Dedicated Support
                  </h3>
                  <p className="mt-1 text-xs text-ink/70">
                    Email{" "}
                    <span className="font-semibold text-ink">
                      info@educationandlifefoundation.org
                    </span>{" "}
                    with your transaction reference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="mx-auto mt-8 max-w-[1600px] px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-[120px] rounded-2xl border border-ink/10 bg-background/80 p-5 backdrop-blur-xs shadow-xs">
              {/* Search bar inside TOC */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink/40" />
                <input
                  type="text"
                  placeholder="Filter sections..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-ink/15 bg-sand/40 pl-8 pr-3 py-1.5 text-xs text-ink placeholder:text-ink/40 focus:border-clay focus:outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-ink/40 hover:text-ink"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-ink/10">
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-clay">
                  Table of Contents
                </span>
                <span className="text-[11px] font-mono text-ink/50">
                  {filteredSections.length} Sections
                </span>
              </div>

              <nav className="mt-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 space-y-1 text-xs">
                {filteredSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block rounded-md px-2 py-1.5 text-ink/75 hover:bg-clay/10 hover:text-clay transition-colors leading-snug truncate"
                  >
                    <span className="font-mono font-semibold text-ink/50 mr-1.5">
                      {sec.number}.
                    </span>
                    {sec.title}
                  </a>
                ))}
              </nav>

              {/* Local Contact details quick badge in sidebar */}
              <div className="mt-5 pt-4 border-t border-ink/10 text-xs">
                <span className="font-bold text-ink block text-[11px] uppercase tracking-wider">
                  Official Head Office
                </span>
                <p className="mt-1 text-[11.5px] text-ink/70 leading-relaxed">
                  181 Raza Block, Allama Iqbal Town, Lahore, Pakistan
                </p>
                <a
                  href="tel:+923009475513"
                  className="mt-1 block font-mono text-[11.5px] font-bold text-clay hover:underline"
                >
                  +92 300 9475513
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Body Document */}
          <main className="lg:col-span-8 xl:col-span-9">
            <article className="rounded-2xl border border-ink/10 bg-background p-6 sm:p-10 lg:p-12 shadow-xs">
              {filteredSections.length === 0 ? (
                <div className="py-12 text-center text-ink/60">
                  <p className="text-base font-semibold">
                    No sections matching &ldquo;{search}&rdquo;
                  </p>
                  <button
                    onClick={() => setSearch("")}
                    className="mt-3 text-xs text-clay underline font-medium"
                  >
                    Clear search filter
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {filteredSections.map((sec) => {
                    const isHighlighted =
                      highlightSectionId === sec.id ||
                      (doc.id === "chargeback-policy" && sec.id === "sec-9");

                    return (
                      <section
                        key={sec.id}
                        id={sec.id}
                        className={`scroll-mt-36 transition-all duration-300 rounded-xl p-2 sm:p-4 ${
                          isHighlighted ? "bg-clay/5 border-l-4 border-clay" : ""
                        }`}
                      >
                        <div className="flex items-baseline gap-3 border-b border-ink/10 pb-2.5">
                          <span className="font-mono text-base font-bold text-clay sm:text-lg">
                            {sec.number}.
                          </span>
                          <h2 className="font-display text-lg font-bold text-ink sm:text-xl lg:text-2xl">
                            {sec.title}
                          </h2>
                        </div>

                        <div className="mt-4 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-ink/80">
                          {sec.content.map((p, idx) => {
                            const isBullet = p.startsWith("•");
                            const isEmail = p.includes("@");
                            return (
                              <p
                                key={idx}
                                className={
                                  isBullet ? "pl-4 text-ink/85 border-l-2 border-clay/30" : ""
                                }
                              >
                                {isEmail
                                  ? p
                                      .split("info@educationandlifefoundation.org")
                                      .map((part, i, arr) => (
                                        <span key={i}>
                                          {part}
                                          {i < arr.length - 1 && (
                                            <a
                                              href="mailto:info@educationandlifefoundation.org"
                                              className="font-semibold text-clay underline"
                                            >
                                              info@educationandlifefoundation.org
                                            </a>
                                          )}
                                        </span>
                                      ))
                                  : p}
                              </p>
                            );
                          })}
                        </div>

                        {/* Subsections if present */}
                        {sec.subsections && sec.subsections.length > 0 && (
                          <div className="mt-6 space-y-5 pl-2 sm:pl-4 border-l border-ink/10">
                            {sec.subsections.map((sub) => (
                              <div key={sub.id} id={sub.id} className="scroll-mt-36">
                                <h3 className="font-display text-sm sm:text-base font-bold text-ink flex items-baseline gap-2">
                                  <span className="font-mono text-clay">{sub.number}</span>
                                  <span>{sub.title}</span>
                                </h3>
                                <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink/80">
                                  {sub.content.map((subP, subIdx) => {
                                    const isSubBullet = subP.startsWith("•");
                                    return (
                                      <p
                                        key={subIdx}
                                        className={
                                          isSubBullet
                                            ? "pl-4 text-ink/85 border-l border-clay/30"
                                            : ""
                                        }
                                      >
                                        {subP}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              )}

              {/* Official Document Footer Notice */}
              <div className="mt-16 rounded-xl border border-ink/10 bg-sand/50 p-6 text-xs text-ink/75">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-bold text-ink block uppercase tracking-wider text-[11px]">
                      Education and Life Foundation (ELF)
                    </span>
                    <span className="text-[11px] text-ink/65 block mt-0.5">
                      Head Office: 181 Raza Block, Allama Iqbal Town, Lahore, Pakistan · Tel: +92
                      300 9475513
                    </span>
                    <span className="text-[10px] text-ink/50 block mt-1">
                      © {new Date().getFullYear()} Education and Life Foundation. All rights
                      reserved.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-clay px-3.5 py-2 text-xs font-semibold text-white hover:bg-clay-deep transition-colors"
                    >
                      Contact Compliance
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
