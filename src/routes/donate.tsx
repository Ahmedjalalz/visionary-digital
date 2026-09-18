import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Loader2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "@/integrations/supabase/client";
import { projects } from "@/data/projects";
import { MaskLines, ParallaxImage } from "@/components/site/motion-primitives";
import { foundationMedia } from "@/data/foundationMedia";
import heroImg from "@/assets/project-education.jpg";

type DonateSearch = { project?: string | undefined };

export const Route = createFileRoute("/donate")({
  validateSearch: (search: Record<string, unknown>): DonateSearch => ({
    project: typeof search['project'] === "string" ? (search['project'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Direct Field Support — Education And Life Foundation" },
      {
        name: "description",
        content: "Fund school fees, medical camps, safe water and widow support. 100% direct flow to field with zero platform cuts.",
      },
      { property: "og:title", content: "Support Education And Life Foundation" },
      { property: "og:description", content: "Every pledge is tied directly to a verified programme and community." },
    ],
  }),
  component: Donate,
});

const amounts = [25, 50, 100, 250];
const impact: Record<number, string> = {
  25: "A complete school bag packed with stationery and tracked to a named child.",
  50: "A month of tuition, books, uniform and supplies for one enrolled student.",
  100: "Essential medicines and diagnostic supplies for a rural medical camp morning.",
  250: "A widow-headed family supported with food rations and dignity for a full month.",
};

const INTERNATIONAL_WIRE_DOSSIER = `--- EDUCATION AND LIFE FOUNDATION ---
INTERNATIONAL WIRE TRANSFER INSTRUCTIONS

1. CORRESPONDENT / INTERMEDIARY BANK:
   Bank Name: Standard Chartered Bank
   City / Country: New York, USA
   SWIFT / BIC: SCBLUS33
   ABA Routing: 026001591
   Account No: 3582-059673-001

2. BENEFICIARY BANK:
   Bank Name: Faysal Bank Limited
   City / Country: Karachi, Pakistan
   SWIFT / BIC: FAYSPKKA

3. FINAL BENEFICIARY / ACCOUNT HOLDER:
   Account Title: EDUCATION AND LIFE FOUNDATION
   IBAN: PK11FAYS0464007900224713
   Account Number: 0464007900224713
   Branch: Usman Block, Awami Complex — Garden Town, Lahore, Pakistan`;

const DOMESTIC_WIRE_DOSSIER = `--- EDUCATION AND LIFE FOUNDATION ---
DOMESTIC PAKISTAN BANK TRANSFER

Bank Name: Faysal Bank Limited
Account Title: EDUCATION AND LIFE FOUNDATION
IBAN: PK11FAYS0464007900224713
Account Number: 0464007900224713
Branch: Usman Block, Awami Complex — Garden Town, Lahore, Pakistan
Transfer Method: Raast / IBFT / 1Link`;

function Donate() {
  const { project: preset } = Route.useSearch();
  const [activeTab, setActiveTab] = useState<"bank" | "pledge" | "trust">("bank");
  const [amount, setAmount] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [projectSlug, setProjectSlug] = useState(preset ?? "");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const value = amount ?? Number(custom || 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value || value <= 0) return;
    const fd = new FormData(e.currentTarget);
    setSending(true);
    const { error } = await supabase.from("donation_pledges").insert({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || null,
      message: String(fd.get("message") ?? "") || null,
      amount: value,
      currency: "USD",
      is_monthly: monthly,
      project_slug: projectSlug || null,
    });
    setSending(false);
    if (error) {
      toast.error("We couldn't record your pledge. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <section className="flex min-h-screen items-center bg-background px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Check className="h-10 w-10 text-clay" strokeWidth={1.3} />
          <h1 className="display-lg mt-6 max-w-[14ch] text-ink">Thank you. Genuinely.</h1>
          <p className="lede mt-6 max-w-xl">
            Your pledge of ${value} {monthly ? "per month " : ""}is recorded. A member of the team will
            email you the transfer details and, once it clears, tell you exactly where it went.
          </p>
          <Link
            to="/projects"
            className="mt-10 inline-block rounded-full border border-ink/30 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink hover:border-ink shadow-xs transition-colors"
          >
            See the programmes
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[50svh] sm:min-h-[56svh] w-full flex flex-col justify-center overflow-hidden pt-16 pb-14 sm:pt-20 sm:pb-16">
        <ParallaxImage src={foundationMedia.schoolStudents} alt="A classroom of students in Punjab supported by EFL" className="absolute inset-0" strength={60} priority />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div>
            <span className="eyebrow text-clay font-bold">Direct Impact · Verified Foundation</span>
            <h1 className="display-xl mt-3 max-w-[14ch] text-ink">
              <MaskLines lines={["Money here", "becomes a", "morning."]} />
            </h1>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DONATION TABS ── */}
      <section className="sticky top-[74px] sm:top-[82px] z-30 border-y border-ink/10 bg-background/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex items-center justify-between gap-3 overflow-x-auto py-3.5 scrollbar-none">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("bank")}
                className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                  activeTab === "bank"
                    ? "bg-clay text-primary-foreground shadow-xs"
                    : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>Bank Transfer</span>
                <span className="hidden rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[0.6rem] font-bold sm:inline">
                  Direct Wire
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pledge")}
                className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                  activeTab === "pledge"
                    ? "bg-clay text-primary-foreground shadow-xs"
                    : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Make a Pledge</span>
                <span className="hidden rounded-full bg-clay/15 px-2 py-0.5 text-[0.6rem] font-bold text-clay sm:inline">
                  Custom
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("trust")}
                className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                  activeTab === "trust"
                    ? "bg-clay text-primary-foreground shadow-xs"
                    : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>100% Policy</span>
              </button>
            </div>

            <a
              href="https://wa.me/923009475513?text=Hello%20EFL%20team%2C%20I%20would%20like%20to%20confirm%20my%20donation."
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 text-xs font-medium text-ink/65 transition-colors hover:text-clay md:flex"
            >
              <MessageCircle className="h-4 w-4 text-clay" />
              <span>Questions? WhatsApp Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── TAB CONTENT: BANK TRANSFER ── */}
      {activeTab === "bank" && (
        <section className="bg-background py-14 sm:py-20">
          <BankDetails onSwitchToPledge={() => setActiveTab("pledge")} />
        </section>
      )}

      {/* ── TAB CONTENT: ONLINE PLEDGE ── */}
      {activeTab === "pledge" && (
        <section className="bg-background py-14 sm:py-20">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <div className="mb-12 max-w-2xl">
              <span className="eyebrow">Direct Programme Support</span>
              <h2 className="display-md mt-3 text-ink">
                Prefer to pledge and receive transfer coordinates?
              </h2>
              <p className="lede mt-3">
                Let us know what you would like to fund. Our finance secretary will send transfer
                details, project updates, and an official receipt.
              </p>
            </div>

            <form onSubmit={submit} className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <span className="eyebrow">Choose an amount — USD</span>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {amounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        setAmount(a);
                        setCustom("");
                      }}
                      aria-pressed={amount === a}
                      className={`rounded-xl border p-6 text-left transition-all cursor-pointer shadow-xs hover:border-clay/40 hover:shadow-md ${
                        amount === a
                          ? "border-clay bg-clay text-primary-foreground shadow-md"
                          : "border-ink/15 bg-sand/50 text-ink hover:border-clay hover:bg-sand"
                      }`}
                    >
                      <span className="numeral text-3xl font-bold">${a}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <label htmlFor="custom" className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
                    Or specify another amount ($)
                  </label>
                  <input
                    id="custom"
                    inputMode="numeric"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value.replace(/[^0-9]/g, ""));
                      setAmount(null);
                    }}
                    placeholder="Enter custom amount"
                    className="mt-3 w-full border-b border-ink/20 bg-transparent pb-3 font-display text-3xl text-ink placeholder:text-ink/25 focus:border-clay focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setMonthly(!monthly)}
                  aria-pressed={monthly}
                  className={`mt-8 inline-flex items-center gap-3 rounded-full border px-5 py-3 text-xs uppercase tracking-[0.16em] transition-all cursor-pointer shadow-xs ${
                    monthly ? "border-clay bg-clay/10 text-clay font-bold" : "border-ink/20 text-ink/70 hover:border-ink"
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${monthly ? "bg-clay ring-2 ring-clay/30" : "bg-ink/25"}`} />
                  Make this a monthly recurring pledge
                </button>

                {amount && (
                  <div className="mt-10 rounded-2xl border border-clay/20 bg-clay/5 p-6 shadow-xs">
                    <span className="eyebrow text-clay">Direct Community Impact</span>
                    <p className="mt-2 font-serif text-2xl italic leading-snug text-ink">
                      "{impact[amount]}"
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div>
                  <label htmlFor="project" className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
                    Allocate to a specific project
                  </label>
                  <select
                    id="project"
                    value={projectSlug}
                    onChange={(e) => setProjectSlug(e.target.value)}
                    className="mt-3 w-full border-b border-ink/20 bg-transparent pb-3 text-lg text-ink focus:border-clay focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-background text-ink">
                      Wherever it's needed most (General Welfare)
                    </option>
                    {projects.map((p) => (
                      <option key={p.slug} value={p.slug} className="bg-background text-ink">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-8 grid gap-7">
                  <DonorField label="Your full name" name="name" required />
                  <DonorField label="Email address (for receipt)" name="email" type="email" required />
                  <DonorField label="Phone number (WhatsApp optional)" name="phone" />
                  <div>
                    <label htmlFor="message" className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
                      Dedication or message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="In honour of, specific instructions, or notes..."
                      className="mt-3 w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-lg text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending || !value}
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-clay-deep disabled:opacity-40 cursor-pointer shadow-xs"
                >
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Confirm Pledge: ${value || 0} {monthly ? "/ Month" : "One-Time"}
                </button>
                <p className="mt-4 text-xs leading-relaxed text-ink/50">
                  This records your intention. No payment card is charged automatically. Our treasurer
                  emails the matching bank coordinate and confirmation immediately.
                </p>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* ── TAB CONTENT: 100% POLICY & TRUST ── */}
      {activeTab === "trust" && (
        <section className="bg-background py-14 sm:py-20">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <span className="eyebrow">Institutional Transparency</span>
              <h2 className="display-md mt-3 text-ink">
                How every rupee and dollar is audited and delivered.
              </h2>
              <p className="lede mt-3">
                Education and Life Foundation is structured so that public donations are not eroded by
                operational overheads.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-ink/10 bg-sand/40 p-8 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <ShieldCheck className="h-8 w-8 text-clay" />
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">100% Direct Model</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  All administrative salaries, rent, and overheads are underwritten separately by our
                  founding trustees. 100% of external donations go directly to schooling, healthcare camps,
                  widow stipends, and water infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-sand/40 p-8 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <BadgeCheck className="h-8 w-8 text-clay" />
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">Tax Exemption &amp; Receipts</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  EFL is an officially registered non-profit organization under the Laws of Pakistan. We
                  issue formal stamped donation receipts for all bank wires and local transfers, eligible
                  for tax reporting and audit purposes.
                </p>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-sand/40 p-8 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CheckCircle2 className="h-8 w-8 text-clay" />
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">Traceable Projects</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  Whether funding school bags through our QR tag program or supporting a specific medical camp,
                  sponsors receive photographic confirmation and field records directly from the field teams.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-clay/20 bg-sand/60 p-8 shadow-xs">
              <div>
                <h4 className="font-display text-xl font-bold text-ink">Need to discuss a corporate endowment or grant?</h4>
                <p className="mt-1 text-sm text-ink/65">
                  Our chairperson and finance coordinator are available for direct review meetings.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/book"
                  className="rounded-full bg-clay px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-clay-deep shadow-xs transition-colors"
                >
                  Schedule a call
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveTab("bank")}
                  className="rounded-full border border-ink/20 bg-background px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:border-ink cursor-pointer shadow-xs transition-colors"
                >
                  View Wire Details
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ─────────────────────  RICH BANK DETAILS COMPONENT  ───────────────────── */

function CopyBadge({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    toast.success(`${label ?? "Detail"} copied to clipboard`);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label ?? text}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-background px-3 py-1 text-[0.68rem] font-medium text-ink/75 transition-all hover:border-clay hover:text-clay cursor-pointer active:scale-95 shadow-2xs"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-emerald-600" />
          <span className="text-emerald-700 font-semibold">Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

function BankDetails({ onSwitchToPledge }: { onSwitchToPledge?: () => void }) {
  const [method, setMethod] = useState<"international" | "domestic">("international");

  const copyDossier = (type: "international" | "domestic") => {
    const text = type === "international" ? INTERNATIONAL_WIRE_DOSSIER : DOMESTIC_WIRE_DOSSIER;
    navigator.clipboard?.writeText(text);
    toast.success("Complete banking dossier copied to clipboard!", {
      description: "Paste directly into your online banking or wire transfer portal.",
    });
  };

  return (
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
      {/* Header and Currency Pill Switcher */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">Bank Wire Transfers</span>
          <h2 className="display-md mt-2 text-ink">
            Direct institutional wire &amp; settlement.
          </h2>
          <p className="lede mt-3">
            Send funds directly to the foundation's audited account with zero third-party platform cuts.
            Select your origin below for the exact routing sequence.
          </p>
        </div>

        {/* Currency / Region pill */}
        <div className="inline-flex rounded-full border border-ink/15 bg-sand/60 p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setMethod("international")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
              method === "international"
                ? "bg-ink text-cream shadow-xs"
                : "text-ink/65 hover:text-ink"
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>International (USD / GBP / EUR)</span>
          </button>
          <button
            type="button"
            onClick={() => setMethod("domestic")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
              method === "domestic"
                ? "bg-ink text-cream shadow-xs"
                : "text-ink/65 hover:text-ink"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Pakistan (PKR / Raast / IBAN)</span>
          </button>
        </div>
      </div>

      {/* ── EMBOSSED OFFICIAL FOUNDATION BANK VOUCHER CARD ── */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/20 bg-gradient-to-br from-ink via-ink/95 to-clay/40 text-cream p-7 sm:p-10 shadow-xl relative">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-96 w-96 -translate-y-12 translate-x-20 rounded-full bg-clay/20 blur-3xl"
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/15 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/10 border border-cream/20">
                <CreditCard className="h-6 w-6 text-cream" />
              </div>
              <div>
                <div className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-cream/60">
                  Official Account Holder
                </div>
                <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-cream">
                  EDUCATION AND LIFE FOUNDATION
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 text-clay" />
                Verified Non-Profit
              </span>
              <button
                type="button"
                onClick={() => copyDossier(method)}
                className="inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-clay-deep cursor-pointer shadow-xs"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Full Wire File</span>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/55">Official IBAN</div>
              <div className="mt-1.5 font-mono text-lg sm:text-xl font-bold tracking-wider text-cream flex items-center gap-2">
                <span>PK11 FAYS 0464 0079 0022 4713</span>
              </div>
              <div className="mt-2">
                <CopyBadge text="PK11FAYS0464007900224713" label="IBAN" />
              </div>
            </div>

            <div>
              <div className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/55">Account Number</div>
              <div className="mt-1.5 font-mono text-lg sm:text-xl font-bold tracking-wider text-cream">
                0464007900224713
              </div>
              <div className="mt-2">
                <CopyBadge text="0464007900224713" label="Account Number" />
              </div>
            </div>

            <div>
              <div className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/55">Beneficiary Bank</div>
              <div className="mt-1.5 font-display text-lg font-bold text-cream">
                Faysal Bank Limited
              </div>
              <div className="mt-1 text-xs text-cream/65">
                SWIFT: <span className="font-mono font-bold text-cream">FAYSPKKA</span>
              </div>
              <div className="mt-2">
                <CopyBadge text="FAYSPKKA" label="SWIFT Code" />
              </div>
            </div>

            <div>
              <div className="text-[0.62rem] uppercase tracking-[0.2em] text-cream/55">Branch Details</div>
              <div className="mt-1.5 text-sm leading-snug text-cream/90 font-medium">
                Usman Block, Awami Complex, Garden Town, Lahore
              </div>
              <div className="mt-1 text-xs text-cream/60">Lahore, Punjab, Pakistan</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONDITIONAL SUB-TAB: INTERNATIONAL WIRE SEQUENCE ── */}
      {method === "international" && (
        <div className="mt-12 space-y-10">
          {/* Visual Wire Routing Pathway */}
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow">Wire Routing Sequence</span>
              <span className="h-px flex-1 bg-ink/10" />
            </div>
            <p className="mt-1 text-xs text-ink/55">
              Cross-border foreign currency wires (USD / EUR / GBP) settle through the New York correspondent gateway into Pakistan:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {/* Hop 1: Intermediary Bank */}
              <div className="relative rounded-2xl border border-ink/15 bg-sand/30 p-6 sm:p-7 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-clay/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-clay">
                    Step 1 · Intermediary Bank
                  </span>
                  <Globe className="h-4 w-4 text-ink/40" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-ink">
                  Standard Chartered Bank
                </h4>
                <p className="text-xs text-ink/60">New York, USA</p>

                <div className="mt-5 space-y-3 border-t border-ink/10 pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">SWIFT / BIC</span>
                    <span className="font-mono font-bold text-ink flex items-center gap-1.5">
                      SCBLUS33 <CopyBadge text="SCBLUS33" label="SWIFT" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">ABA Routing</span>
                    <span className="font-mono font-bold text-ink flex items-center gap-1.5">
                      026001591 <CopyBadge text="026001591" label="ABA Routing" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">SCB Account</span>
                    <span className="font-mono font-bold text-ink flex items-center gap-1.5">
                      3582-059673-001 <CopyBadge text="3582-059673-001" label="Account No" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Hop 2: Beneficiary Clearing Bank */}
              <div className="relative rounded-2xl border border-ink/15 bg-sand/30 p-6 sm:p-7 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-clay/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-clay">
                    Step 2 · Beneficiary Bank
                  </span>
                  <Building2 className="h-4 w-4 text-ink/40" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-ink">
                  Faysal Bank Limited
                </h4>
                <p className="text-xs text-ink/60">Karachi, Pakistan</p>

                <div className="mt-5 space-y-3 border-t border-ink/10 pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">SWIFT / BIC</span>
                    <span className="font-mono font-bold text-ink flex items-center gap-1.5">
                      FAYSPKKA <CopyBadge text="FAYSPKKA" label="SWIFT Code" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">Clearing Hub</span>
                    <span className="font-medium text-ink">Central Clearing PK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">Transfer Currency</span>
                    <span className="font-medium text-ink">USD, GBP, EUR, CAD, AUD</span>
                  </div>
                </div>
              </div>

              {/* Hop 3: Final Beneficiary Account */}
              <div className="relative rounded-2xl border-2 border-clay/40 bg-clay/5 p-6 sm:p-7 shadow-xs hover:border-clay hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-clay px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                    Step 3 · Final Beneficiary
                  </span>
                  <BadgeCheck className="h-4 w-4 text-clay" />
                </div>
                <h4 className="mt-4 font-display text-lg font-bold text-ink">
                  Education and Life Foundation
                </h4>
                <p className="text-xs text-ink/60">Garden Town, Lahore, Pakistan</p>

                <div className="mt-5 space-y-3 border-t border-clay/15 pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">Official IBAN</span>
                    <span className="font-mono font-bold text-ink flex items-center gap-1.5">
                      ...4713 <CopyBadge text="PK11FAYS0464007900224713" label="Full IBAN" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">Account No</span>
                    <span className="font-mono font-bold text-ink flex items-center gap-1.5">
                      0464007900224713 <CopyBadge text="0464007900224713" label="Account No" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ink/55">Account Title</span>
                    <span className="font-bold text-clay">EDUCATION AND LIFE...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONDITIONAL SUB-TAB: DOMESTIC PAKISTAN TRANSFER ── */}
      {method === "domestic" && (
        <div className="mt-12 space-y-8">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="rounded-2xl border border-ink/15 bg-sand/30 p-8 md:col-span-7 shadow-xs">
              <span className="eyebrow text-clay">Instant Domestic Transfer</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Send via Raast, Mobile Banking, or ATM
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Support is accepted from all Pakistani commercial banks, microfinance banks, and digital wallets.
                Choose "Faysal Bank Limited" and enter the details below:
              </p>

              <dl className="mt-6 space-y-4 border-t border-ink/10 pt-6 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <dt className="text-xs uppercase tracking-wider text-ink/50">Bank Name</dt>
                  <dd className="font-bold text-ink">Faysal Bank Limited</dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/5 pt-3">
                  <dt className="text-xs uppercase tracking-wider text-ink/50">Account Title</dt>
                  <dd className="font-bold text-clay flex items-center gap-2">
                    <span>EDUCATION AND LIFE FOUNDATION</span>
                    <CopyBadge text="EDUCATION AND LIFE FOUNDATION" label="Account Title" />
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/5 pt-3">
                  <dt className="text-xs uppercase tracking-wider text-ink/50">IBAN</dt>
                  <dd className="font-mono font-bold text-ink flex items-center gap-2">
                    <span>PK11FAYS0464007900224713</span>
                    <CopyBadge text="PK11FAYS0464007900224713" label="IBAN" />
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/5 pt-3">
                  <dt className="text-xs uppercase tracking-wider text-ink/50">Account Number</dt>
                  <dd className="font-mono font-bold text-ink flex items-center gap-2">
                    <span>0464007900224713</span>
                    <CopyBadge text="0464007900224713" label="Account Number" />
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/5 pt-3">
                  <dt className="text-xs uppercase tracking-wider text-ink/50">Branch</dt>
                  <dd className="text-ink/80 text-right">Usman Block, Awami Complex — Garden Town, Lahore</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-ink/15 bg-background p-8 md:col-span-5 shadow-xs">
              <div>
                <span className="eyebrow">Compatible Platforms</span>
                <h4 className="mt-2 font-display text-xl font-bold text-ink">Works seamlessly with</h4>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {["Raast ID", "SadaPay", "NayaPay", "Easypaisa", "JazzCash", "Meezan", "HBL Mobile", "Faysal Digi", "Alfalah Orbit", "Standard Chartered"].map((app) => (
                    <span key={app} className="rounded-full border border-ink/10 bg-sand/60 px-3 py-1.5 font-medium text-ink/75 shadow-2xs">
                      {app}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-clay/5 p-4 border border-clay/15 text-xs leading-relaxed text-ink/75">
                  <strong className="text-clay block mb-1">Transfer Note / Reference:</strong>
                  Enter your name or the project name (e.g. "School Bags", "Medical Camp") in the payment description so our finance desk can record your dedication.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => copyDossier("domestic")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-cream hover:bg-clay cursor-pointer transition-colors shadow-xs"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Pakistan Bank Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VERIFICATION & ACKNOWLEDGEMENT BAR ── */}
      <div className="mt-12 rounded-2xl border border-ink/10 bg-sand/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay/10 text-clay mt-0.5">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-ink">Transferred? Send Screenshot for Official Receipt</h4>
            <p className="text-xs text-ink/65 mt-0.5">
              WhatsApp your transfer receipt to <strong className="text-ink">+92 300 9475513</strong> or email <strong className="text-ink">info@educationandlifefoundation.org</strong> with your transaction reference.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <a
            href="https://wa.me/923009475513?text=Hello%20EFL%20team%2C%20I%20have%20transferred%20a%20donation%20and%20attached%20the%20receipt%20for%20confirmation."
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-emerald-800 transition-colors cursor-pointer w-full sm:w-auto shadow-xs"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp Receipt</span>
          </a>
          <button
            type="button"
            onClick={onSwitchToPledge}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 bg-background px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:border-ink transition-colors cursor-pointer w-full sm:w-auto shadow-xs"
          >
            <span>Or Pledge Online</span>
            <ArrowRight className="h-3.5 w-3.5 text-clay" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DonorField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
        {label}
        {required && <span className="text-clay"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2.5 w-full border-b border-ink/20 bg-transparent pb-2.5 text-lg text-ink focus:border-clay focus:outline-none"
      />
    </div>
  );
}
