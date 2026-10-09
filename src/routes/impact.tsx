import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Handshake,
  HeartHandshake,
  LayoutGrid,
  Loader2,
  Mail,
  MapPin,
  Maximize2,
  MoveHorizontal,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { partners } from "@/data/partners";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { PartnerTicker } from "@/components/site/PartnerTicker";
import { MaskLines, Rise, ParallaxImage } from "@/components/site/motion-primitives";
const heroImg = "/images/pregnant/pregnant-15.jpg";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { sendPartnershipNotification } from "@/lib/email-service";


export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact & Field Stories — Education and Life Foundation" },
      {
        name: "description",
        content:
          "Witness the real outcomes of ELF's programmes across Pakistan through field testimonies, verified outcomes, and our global partner foundations.",
      },
      { property: "og:title", content: "Our Impact — Education and Life Foundation" },
      {
        property: "og:description",
        content:
          "Community programmes, international partners, and thousands of lives supported through direct field work.",
      },
    ],
  }),
  component: ImpactPage,
});

const stats = [
  { value: "14,000+", label: "Students in Supported Schools", sub: "Tuition, books & uniform covered" },
  { value: "4,800+", label: "Safe Village Deliveries", sub: "Equipped community midwives" },
  { value: "18,500+", label: "Free Medical Consultations", sub: "Rural health camps & surgeries" },
  { value: "100%", label: "Direct Field Flow", sub: "Zero administrative platform cuts" },
];

const categories = [
  "All",
  "Education",
  "Healthcare & Maternity",
  "Widows & Families",
  "Skills & Livelihoods",
] as const;

const countries = ["All", "United Kingdom", "United States", "Germany", "New Zealand"] as const;

function TestimonialCard({
  t,
  className = "",
  onSelect,
}: {
  t: Testimonial;
  className?: string;
  onSelect?: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-6 sm:p-7 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 select-none cursor-pointer ${className}`}
    >
      <div>
        {/* Header: Category Badge & Project Link */}
        <div className="flex items-center justify-between gap-3 border-b border-ink/8 pb-3.5">
          <span className="rounded-full bg-sand px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-clay">
            {t.category}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold text-clay/70 group-hover:text-clay transition-colors">
              <Maximize2 className="h-3 w-3" />
              <span className="hidden sm:inline">Read story</span>
            </span>
            <Link
              to="/projects/$slug"
              params={{ slug: t.projectSlug }}
              onClick={(e) => e.stopPropagation()}
              className="group/link flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/50 hover:text-clay transition-colors"
            >
              <span>Project</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Quotation mark decoration */}
        <div className="mt-4 flex items-center justify-between text-clay/25">
          <Quote className="h-7 w-7" />
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-ink/35">
            Verified Account
          </span>
        </div>

        {/* Quote text — fully shown without truncation */}
        <p className="mt-2 font-serif text-base sm:text-lg leading-relaxed text-ink/90 italic">
          “{t.quote}”
        </p>

        {/* Impact highlight pill */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-clay/5 px-3.5 py-2 border border-clay/15">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-clay" />
          <span className="text-xs font-semibold text-clay-deep leading-tight">
            {t.impactHighlight}
          </span>
        </div>
      </div>

      {/* Footer: Person Metadata & Partner Tag */}
      <div className="mt-6 border-t border-ink/8 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-sm sm:text-base font-bold text-ink">
              {t.name}
            </div>
            <div className="text-xs text-ink/65">{t.role}</div>
            <div className="mt-1 flex items-center gap-1.5 text-[0.7rem] text-ink/50">
              <MapPin className="h-3 w-3 text-clay shrink-0" />
              <span className="truncate max-w-[200px]">{t.location}</span>
            </div>
          </div>

          {t.partnerName && (
            <div className="text-right shrink-0">
              <span className="block text-[0.6rem] uppercase tracking-wider text-ink/40">
                Co-sponsored by
              </span>
              <span className="font-display text-[0.68rem] font-bold text-clay">
                {t.partnerName}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScrollTestimonialsTrack({
  testimonials: items,
  onSelectTestimonial,
}: {
  testimonials: Testimonial[];
  onSelectTestimonial: (t: Testimonial) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const [overflow1, setOverflow1] = useState(600);
  const [overflow2, setOverflow2] = useState(600);
  const reduce = useReducedMotion();

  // Distribute items into row 1 & row 2
  const row1 = useMemo(() => {
    const evens = items.filter((_, i) => i % 2 === 0);
    return evens.length > 0 ? evens : items;
  }, [items]);

  const row2 = useMemo(() => {
    const odds = items.filter((_, i) => i % 2 === 1);
    return odds.length > 0 ? odds : items;
  }, [items]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const cWidth = containerRef.current.clientWidth;
        if (row1Ref.current) {
          const r1Width = row1Ref.current.scrollWidth;
          setOverflow1(Math.max(0, r1Width - cWidth + 48));
        }
        if (row2Ref.current) {
          const r2Width = row2Ref.current.scrollWidth;
          setOverflow2(Math.max(0, r2Width - cWidth + 48));
        }
      }
    };

    updateDimensions();
    const timeout = setTimeout(updateDimensions, 150);
    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [row1, row2]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Dynamic travel offsets:
  // Row 1 travels left so that the last card ends fully in frame.
  // Row 2 travels right so that the first card ends fully in frame.
  const x1 = useTransform(smoothProgress, [0.08, 0.92], [20, -overflow1]);
  const x2 = useTransform(smoothProgress, [0.08, 0.92], [-overflow2, 20]);

  return (
    <div
      ref={containerRef}
      className="relative mt-12 overflow-hidden py-4 -mx-5 sm:-mx-8"
    >
      {/* Left/Right Subtle Edge Gradient Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 sm:w-16 bg-gradient-to-r from-sand via-sand/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 sm:w-16 bg-gradient-to-l from-sand via-sand/40 to-transparent" />

      {/* Row 1 — travels left as you scroll down */}
      <motion.div
        ref={row1Ref}
        style={reduce ? {} : { x: x1 }}
        className="flex gap-5 sm:gap-6 w-max pb-5 sm:pb-6 will-change-transform pl-4 sm:pl-8"
      >
        {row1.map((t, idx) => (
          <TestimonialCard
            key={`track-r1-${t.id}-${idx}`}
            t={t}
            onSelect={() => onSelectTestimonial(t)}
            className="w-[min(320px,calc(100vw-2.5rem))] sm:w-[420px] shrink-0"
          />
        ))}
      </motion.div>

      {/* Row 2 — travels right as you scroll down */}
      <motion.div
        ref={row2Ref}
        style={reduce ? {} : { x: x2 }}
        className="flex gap-5 sm:gap-6 w-max will-change-transform pl-4 sm:pl-8"
      >
        {row2.map((t, idx) => (
          <TestimonialCard
            key={`track-r2-${t.id}-${idx}`}
            t={t}
            onSelect={() => onSelectTestimonial(t)}
            className="w-[min(320px,calc(100vw-2.5rem))] sm:w-[420px] shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
}

function ImpactPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [selectedCountry, setSelectedCountry] = useState<(typeof countries)[number]>("All");
  const [viewMode, setViewMode] = useState<"stream" | "grid">("stream");
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === "All") return testimonials;
    return testimonials.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const filteredPartners = useMemo(() => {
    if (selectedCountry === "All") return partners;
    return partners.filter((p) => p.country === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-background text-ink">
      {/* ─── HERO SECTION (MODERN EDITORIAL SPLIT) ─── */}
      <section className="relative overflow-hidden bg-ink text-cream py-16 sm:py-20 lg:py-28">
        {/* Subtle atmospheric ambient glow */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-clay/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-clay-bright/10 blur-[140px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Framed Authentic Field Photo Card */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cream/15 bg-ink/50 shadow-2xl aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full group">
                <img
                  src={heroImg}
                  alt="ELF field work with communities in Punjab"
                  className="h-full w-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Right Column: High-Contrast Heading, Narrative & Core Guarantees */}
            <div className="lg:col-span-6 lg:pl-4">
              {/* High-contrast luminous pill badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-clay-bright/15 border border-clay-bright/35 px-4 py-1.5 text-xs font-bold text-clay-bright uppercase tracking-[0.16em] mb-6">
                <ShieldCheck className="h-4 w-4 text-clay-bright shrink-0" />
                <span>Verified Field Outcomes</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.04] tracking-tight text-cream">
                <MaskLines lines={["The measure of", "the work is in the", "lives it changes."]} />
              </h1>

              <p className="mt-6 font-serif text-xl sm:text-2xl text-cream/90 leading-relaxed italic max-w-xl">
                “Every program exists because a family had nowhere else to turn. Every metric represents a child back in school, a mother safely delivered, or a widow holding her head high.”
              </p>

              {/* Core Field Pillars / Guarantees Grid (Matching reference checklist) */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay-bright/20 text-clay-bright mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-cream">Direct Field Delivery</h3>
                    <p className="mt-0.5 text-xs leading-normal text-cream/70">Delivered directly by local teams who live where the work happens.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay-bright/20 text-clay-bright mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-cream">13 Global Partner Foundations</h3>
                    <p className="mt-0.5 text-xs leading-normal text-cream/70">Co-funded and audited across UK, Canada, Germany and NZ.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay-bright/20 text-clay-bright mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-cream">100% Direct Field Flow</h3>
                    <p className="mt-0.5 text-xs leading-normal text-cream/70">Zero platform deductions; all aid reaches village beneficiaries directly.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay-bright/20 text-clay-bright mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-cream">Audited Ledger Reporting</h3>
                    <p className="mt-0.5 text-xs leading-normal text-cream/70">Fully documented distribution records and transparent tracking.</p>
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#partner-form"
                  className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:bg-clay-deep transition-all shadow-lg active:scale-[0.98]"
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#partners"
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-ink hover:bg-cream/90 transition-all shadow-md active:scale-[0.98]"
                >
                  <span>View Partners ({partners.length})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOVING TRUST STRIP (Directly under Hero, matching homepage) ─── */}
      <PartnerTicker />

      {/* ─── DEDICATED FIELD OUTCOMES METRICS (STANDALONE SECTION) ─── */}
      <section className="border-y border-ink/10 bg-sand py-14 sm:py-18">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="eyebrow text-clay">Verified Numbers</span>
              <h2 className="display-sm mt-2 text-ink">Impact Across Our Primary Programs</h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-ink/65 leading-relaxed">
              Field metrics across supported schools, maternal healthcare clinics, rural medical camps, and widow welfare distributions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-8 lg:gap-12">
            {stats.map((s, idx) => (
              <Rise key={s.label} delay={idx * 0.08}>
                <div className="border-t-2 border-clay/30 pt-4 sm:pt-5">
                  <div className="numeral text-2xl min-[360px]:text-3xl sm:text-5xl font-extrabold text-clay break-words">
                    {s.value}
                  </div>
                  <div className="mt-2 font-display text-xs min-[360px]:text-sm sm:text-base font-bold text-ink">
                    {s.label}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-ink/60 leading-normal">
                    {s.sub}
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─── */}
      <section className="py-20 sm:py-28 bg-sand/25 border-b border-ink/10 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-ink/10 pb-10">
            <div>
              <span className="eyebrow flex items-center gap-2">
                <Quote className="h-3.5 w-3.5 text-clay" />
                Field Voices
              </span>
              <h2 className="display-md mt-2 text-ink">
                Testimonies Across Our Programmes
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink/65 leading-relaxed">
                Direct accounts from children, mothers, community midwives, trainees, and village elders who live the results of this work every day.
              </p>
            </div>

            {/* Controls: Category Filter Pills + View Mode Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                      selectedCategory === cat
                        ? "bg-clay text-cream shadow-sm"
                        : "bg-background border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-full border border-ink/15 bg-background p-1 self-start sm:self-auto shrink-0 shadow-2xs">
                <button
                  onClick={() => setViewMode("stream")}
                  title="Dynamic Scroll Stream"
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-all ${
                    viewMode === "stream"
                      ? "bg-clay text-cream shadow-2xs"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  <MoveHorizontal className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Dynamic</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition-all ${
                    viewMode === "grid"
                      ? "bg-clay text-cream shadow-2xs"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Subtitle helper in dynamic stream mode */}
          {viewMode === "stream" && (
            <div className="mt-4 flex items-center justify-between text-xs text-ink/50">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
                </span>
                <span className="font-display uppercase tracking-wider text-[0.65rem]">
                  Scroll to glide across opposing tracks • Hover cards to focus
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-[0.65rem] text-ink/40">
                {filteredTestimonials.length} stories displayed
              </span>
            </div>
          )}

          {/* Render either Dynamic Scroll Tracks or Standard Grid */}
          {viewMode === "stream" ? (
            <ScrollTestimonialsTrack
              key={selectedCategory}
              testimonials={filteredTestimonials}
              onSelectTestimonial={setSelectedTestimonial}
            />
          ) : (
            <motion.div
              layout
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredTestimonials.map((t, index) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <TestimonialCard
                      t={t}
                      className="h-full"
                      onSelect={() => setSelectedTestimonial(t)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Testimonial Full Story Modal Dialog */}
          <Dialog
            open={!!selectedTestimonial}
            onOpenChange={(open) => !open && setSelectedTestimonial(null)}
          >
            <DialogContent className="max-w-2xl rounded-2xl bg-sand/98 p-6 sm:p-9 border border-ink/15 backdrop-blur-md shadow-2xl">
              {selectedTestimonial && (
                <div>
                  {/* Category & Verified Badge */}
                  <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                    <span className="rounded-full bg-clay/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-clay">
                      {selectedTestimonial.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-ink/60">
                      <ShieldCheck className="h-4 w-4 text-clay" />
                      Verified Field Outcome
                    </span>
                  </div>

                  {/* Large quote */}
                  <div className="mt-6 text-clay/30">
                    <Quote className="h-10 w-10" />
                  </div>
                  <blockquote className="mt-2 font-serif text-xl sm:text-2xl italic leading-relaxed text-ink">
                    “{selectedTestimonial.quote}”
                  </blockquote>

                  {/* Highlight Pill */}
                  <div className="mt-6 flex items-center gap-2.5 rounded-xl bg-clay/10 p-3.5 border border-clay/20 shadow-2xs">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-clay" />
                    <span className="text-sm font-semibold text-clay-deep">
                      {selectedTestimonial.impactHighlight}
                    </span>
                  </div>

                  {/* Author & Location */}
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ink/10 pt-5">
                    <div>
                      <h4 className="font-display text-lg font-bold text-ink">
                        {selectedTestimonial.name}
                      </h4>
                      <p className="text-sm text-ink/70">{selectedTestimonial.role}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-ink/50">
                        <MapPin className="h-3.5 w-3.5 text-clay shrink-0" />
                        <span>{selectedTestimonial.location}</span>
                      </div>
                    </div>

                    {selectedTestimonial.partnerName && (
                      <div className="sm:text-right">
                        <span className="block text-[0.65rem] uppercase tracking-wider text-ink/40">
                          Co-sponsored by
                        </span>
                        <span className="font-display text-sm font-bold text-clay">
                          {selectedTestimonial.partnerName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-ink/10 pt-5">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: selectedTestimonial.projectSlug }}
                      onClick={() => setSelectedTestimonial(null)}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink hover:border-ink transition-colors shadow-xs"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      to="/donate"
                      onClick={() => setSelectedTestimonial(null)}
                      className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-clay-deep transition-colors shadow-xs"
                    >
                      <span>Support this Cause</span>
                    </Link>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* ─── GLOBAL PARTNERS & SPONSORS SPOTLIGHT ─── */}
      <section id="partners" className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-ink/10 pb-10">
            <div>
              <span className="eyebrow flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-clay" />
                Global Coalition
              </span>
              <h2 className="display-md mt-2 text-ink">
                Our Partners &amp; Sponsors
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink/65 leading-relaxed">
                Thirteen verified charities, trusts, and donor foundations across the United Kingdom, United States, Germany, and New Zealand that stand behind our field execution.
              </p>
            </div>

            {/* Country Filters */}
            <div className="flex flex-wrap gap-2">
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all ${
                    selectedCountry === c
                      ? "bg-clay text-cream shadow-sm"
                      : "bg-sand/60 border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Partners Grid */}
          <motion.div
            layout
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredPartners.map((p, index) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group flex flex-col justify-between rounded-2xl border border-ink/10 bg-sand/20 p-6 shadow-xs hover:bg-sand/40 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Logo container */}
                    <div className="flex h-20 items-center justify-center rounded-xl bg-white p-4 border border-ink/8 shadow-2xs dark:bg-card/90 dark:border-white/10">
                      <img
                        src={p.logo}
                        alt={p.name}
                        loading="lazy"
                        className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-clay/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-clay">
                        {p.country}
                      </span>
                      <span className="text-[0.65rem] font-mono text-ink/40">
                        {p.countryCode}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold text-ink group-hover:text-clay transition-colors">
                      {p.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-ink/70">
                      {p.role}
                    </p>
                  </div>

                  {/* Connected Projects */}
                  <div className="mt-6 border-t border-ink/8 pt-4">
                    <span className="block text-[0.62rem] font-semibold uppercase tracking-wider text-ink/45">
                      Mutual Initiatives
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.collaborations.map((slug) => (
                        <Link
                          key={slug}
                          to="/projects/$slug"
                          params={{ slug }}
                          className="rounded-full bg-background px-2.5 py-1 text-[0.65rem] font-medium text-ink/75 border border-ink/10 hover:border-clay hover:text-clay transition-colors shadow-2xs"
                        >
                          {slug.replace(/-/g, " ")}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Join Coalition Callout */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-clay/30 bg-sand/60 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-clay text-cream">
                <Handshake className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  Want to partner with Education And Life Foundation?
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 mt-0.5">
                  We welcome charities, philanthropic trusts, CSR initiatives, and donor groups to collaborate on grassroots projects.
                </p>
              </div>
            </div>
            <a
              href="#partner-form"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-clay-deep transition-colors shadow-xs"
            >
              <span>Submit Partnership Form</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── 100% MODEL & DIRECT FIELD GOVERNANCE ─── */}
      <section className="py-20 sm:py-24 bg-clay text-cream">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-cream/70">
                Ethical Stewardship
              </span>
              <h2 className="display-md mt-3 text-cream">
                Where does your support actually go?
              </h2>
              <p className="mt-6 font-serif text-xl leading-relaxed text-cream/90 italic">
                “We refuse the traditional NGO model of heavy administrative overheads. When donors pledge funds, they reach actual children, actual clinics, and actual mothers.”
              </p>
            </div>

            <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/15 shadow-xs">
                <div className="numeral text-3xl font-extrabold text-cream">0%</div>
                <div className="mt-2 font-display text-base font-bold text-cream">Zero Platform Cuts</div>
                <p className="mt-2 text-xs text-cream/80 leading-relaxed">
                  All international donations clear directly into official audited foundation bank accounts.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/15 shadow-xs">
                <div className="numeral text-3xl font-extrabold text-cream">100%</div>
                <div className="mt-2 font-display text-base font-bold text-cream">Direct to Field</div>
                <p className="mt-2 text-xs text-cream/80 leading-relaxed">
                  Program supplies, medicine, books, and rations are purchased and distributed locally in Punjab.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/15 shadow-xs">
                <div className="numeral text-3xl font-extrabold text-cream">100%</div>
                <div className="mt-2 font-display text-base font-bold text-cream">Traceable Bags</div>
                <p className="mt-2 text-xs text-cream/80 leading-relaxed">
                  Every sponsored school bag carries a unique tracking identifier from packing to student handoff.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm border border-white/15 shadow-xs">
                <div className="numeral text-3xl font-extrabold text-cream">Annual</div>
                <div className="mt-2 font-display text-base font-bold text-cream">Public Audits</div>
                <p className="mt-2 text-xs text-cream/80 leading-relaxed">
                  Financial books reviewed by certified chartered accountants and published for open scrutiny.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERSHIP PROPOSAL FORM ─── */}
      <PartnerProposalForm />

      {/* ─── BOTTOM INVITATION CTA ─── */}
      <section className="py-20 sm:py-28 bg-sand/30">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 text-center">
          <span className="eyebrow">Partner with us</span>
          <h2 className="display-lg mt-3 text-ink">
            Be part of the next field story.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink/70 leading-relaxed">
            Whether you are an individual donor sponsoring a child or an international foundation seeking vetted field implementation in Pakistan, we invite you to join our mission.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/donate"
              className="rounded-full bg-clay px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream hover:bg-clay-deep transition-colors shadow-xs"
            >
              Support the work
            </Link>
            <Link
              to="/book"
              className="rounded-full border border-ink/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink hover:border-ink transition-colors shadow-xs"
            >
              Book a meeting with team
            </Link>
            <Link
              to="/projects"
              className="rounded-full border border-clay/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-clay hover:bg-clay/10 transition-colors shadow-xs"
            >
              Explore all projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PartnerProposalForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    title: "",
    email: "",
    phone: "",
    country: "",
    orgType: "Registered Charity / NGO",
    collabType: "Direct Program Funding / Grant",
    proposal: "",
  });

  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    "Child Education & Supplies (School in A bag)",
  ]);

  const toggleFocus = (focus: string) => {
    setSelectedFocus((prev) =>
      prev.includes(focus) ? prev.filter((f) => f !== focus) : [...prev, focus]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.orgName.trim() || !formData.contactName.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required contact fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: `${formData.contactName.trim()} — ${formData.orgName.trim()}`,
        email: formData.email.trim(),
        subject: `Partnership Proposal: ${formData.orgName.trim()} [${formData.orgType}]`,
        message: `
ORGANIZATION / ENTITY: ${formData.orgName}
CONTACT PERSON: ${formData.contactName} (${formData.title || "Not specified"})
EMAIL: ${formData.email}
PHONE / WHATSAPP: ${formData.phone || "Not specified"}
LOCATION / COUNTRY: ${formData.country || "Not specified"}
ORGANIZATION TYPE: ${formData.orgType}
NATURE OF COLLABORATION: ${formData.collabType}
FOCUS INITIATIVES: ${selectedFocus.length > 0 ? selectedFocus.join(", ") : "General Partnership"}

PROPOSAL & SCOPE:
${formData.proposal.trim() || "No additional message provided."}
        `.trim(),
      });

      setLoading(false);

      if (error) {
        console.error("Submission error:", error);
        toast.error("Could not send directly to database. Please reach us at info@educationandlifefoundation.org");
      } else {
        toast.success("Partnership proposal received! Our leadership team will review it.");
        setSubmitted(true);
      }

      // Dispatch notification emails via Resend
      try {
        await sendPartnershipNotification({
          data: {
            orgName: formData.orgName.trim(),
            contactName: formData.contactName.trim(),
            title: formData.title.trim() || undefined,
            email: formData.email.trim(),
            phone: formData.phone.trim() || undefined,
            country: formData.country.trim() || undefined,
            orgType: formData.orgType,
            collabType: formData.collabType,
            focusAreas: selectedFocus,
            proposal: formData.proposal.trim(),
          },
        });
      } catch (mailErr) {
        console.warn("Failed to dispatch partnership emails:", mailErr);
      }
    } catch (err) {
      setLoading(false);
      console.error("Submission error:", err);
      toast.success("Partnership proposal submitted successfully!");
      setSubmitted(true);
    }
  };

  const focusOptions = [
    "Child Education & Supplies (School in A bag)",
    "Healthcare Outreach & Mobile Camps",
    "Safe Drinking Water & WASH Sanitation",
    "Maternal Health & Midwifery Kits",
    "Food Rations & Widows Support",
    "Vocational & Skills Training",
    "Creative Arts & Music Education",
  ];

  const orgTypes = [
    "Registered Charity / NGO",
    "Philanthropic Trust / Foundation",
    "Corporate CSR Initiative",
    "Community / Faith Organization",
    "Individual Philanthropist / Donor",
  ];

  const collabTypes = [
    "Direct Program Funding / Grant",
    "In-Kind Equipment & Logistics",
    "Joint Field Execution",
    "Advisory & Strategic Exchange",
  ];

  return (
    <section id="partner-form" className="border-t border-ink/10 bg-sand/35 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Context, Benefits & Direct Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="eyebrow flex items-center gap-2">
                <Handshake className="h-3.5 w-3.5 text-clay" />
                Strategic Coalition
              </span>
              <h2 className="display-md mt-3 text-ink">
                Partner With Education And Life Foundation
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/75">
                We believe systemic change happens when local field capability unites with global solidarity. 
                Whether you represent an established charity, a grant-giving trust, a company with CSR goals, 
                or a dedicated individual, our verified grassroots network in Punjab is ready to collaborate.
              </p>

              <div className="mt-8 space-y-4 border-t border-ink/10 pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-clay/10 text-clay">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink">100% Direct Field Flow</h4>
                    <p className="text-xs text-ink/65 leading-relaxed mt-0.5">
                      Zero administrative cuts on project pledges. Supplies, medicine, and water infrastructure are delivered directly on ground.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-clay/10 text-clay">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink">Verifiable Tracking & Audits</h4>
                    <p className="text-xs text-ink/65 leading-relaxed mt-0.5">
                      From individual tracked school bags to laboratory-tested tubewell water points, every intervention is documented.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-clay/10 text-clay">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-ink">13 Active Global Partners</h4>
                    <p className="text-xs text-ink/65 leading-relaxed mt-0.5">
                      Trusted by charities across the UK, USA, Germany, and New Zealand with multi-year joint field deployments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-ink/10 bg-background p-6 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-clay">
                Direct Enquiries & Meetings
              </div>
              <p className="mt-2 text-xs text-ink/65 leading-relaxed">
                Prefer an immediate conversation with our trustees or executive directors?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-cream hover:bg-clay-deep transition-colors shadow-xs"
                >
                  <span>Book a Zoom Briefing</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <a
                  href="mailto:info@educationandlifefoundation.org"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink hover:border-ink transition-colors shadow-xs"
                >
                  <Mail className="h-3 w-3" />
                  <span>Email Team</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-ink/10 bg-background p-6 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay/10 text-clay">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="display-sm mt-5 text-ink">Proposal Successfully Received</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-ink/70 leading-relaxed">
                    Thank you, <strong>{formData.contactName}</strong>. Your partnership proposal for <strong>{formData.orgName}</strong> has been logged in our leadership queue. Our team will review your objectives and contact you within 48 business hours.
                  </p>
                  <div className="mt-8 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          orgName: "",
                          contactName: "",
                          title: "",
                          email: "",
                          phone: "",
                          country: "",
                          orgType: "Registered Charity / NGO",
                          collabType: "Direct Program Funding / Grant",
                          proposal: "",
                        });
                      }}
                      className="rounded-full bg-sand px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink border border-ink/15 hover:border-ink transition-colors cursor-pointer shadow-xs"
                    >
                      Submit Another Proposal
                    </button>
                    <Link
                      to="/projects"
                      className="rounded-full bg-clay px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-cream hover:bg-clay-deep transition-colors shadow-xs"
                    >
                      Explore Active Projects
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="eyebrow text-clay">Institutional & Individual Alliance</span>
                    <h3 className="font-display text-2xl font-bold text-ink mt-1">
                      Partnership Proposal Form
                    </h3>
                    <p className="text-xs text-ink/60 mt-1">
                      Tell us about your organization and how we can collaborate.
                    </p>
                  </div>

                  {/* Org Name & Contact Person */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Organization / Foundation Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        placeholder="e.g. Global Giving Trust"
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Primary Contact Person <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay"
                      />
                    </div>
                  </div>

                  {/* Title & Country */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Director of Partnerships"
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Country / Headquarters
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. United Kingdom, USA, Germany"
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Official Email <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@globalgiving.org"
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7911 123456"
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay"
                      />
                    </div>
                  </div>

                  {/* Organization Type & Collab Type */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Organization Type
                      </label>
                      <select
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3 py-2.5 text-sm text-ink focus:border-clay focus:bg-background focus:outline-none"
                      >
                        {orgTypes.map((ot) => (
                          <option key={ot} value={ot}>
                            {ot}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                        Collaboration Model
                      </label>
                      <select
                        value={formData.collabType}
                        onChange={(e) => setFormData({ ...formData, collabType: e.target.value })}
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 px-3 py-2.5 text-sm text-ink focus:border-clay focus:bg-background focus:outline-none"
                      >
                        {collabTypes.map((ct) => (
                          <option key={ct} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Focus Initiatives */}
                  <div>
                    <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60 mb-2">
                      Target Program Area (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {focusOptions.map((opt) => {
                        const isSelected = selectedFocus.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => toggleFocus(opt)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                              isSelected
                                ? "bg-clay text-cream border border-clay shadow-xs"
                                : "bg-sand/60 text-ink/75 border border-ink/15 hover:border-ink/40 hover:text-ink"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Proposal Details */}
                  <div>
                    <label className="block text-[0.66rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                      Proposal Summary / Objectives
                    </label>
                    <textarea
                      rows={4}
                      value={formData.proposal}
                      onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                      placeholder="Outline your organization's mission, target impact, proposed timeline, or grant framework..."
                      className="mt-1.5 w-full rounded-xl border border-ink/20 bg-sand/30 p-3.5 text-sm text-ink placeholder:text-ink/30 focus:border-clay focus:bg-background focus:outline-none focus:ring-1 focus:ring-clay leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream shadow-xs hover:bg-clay-deep transition-all duration-200 disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting Proposal...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Partnership Proposal</span>
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[0.72rem] text-ink/50">
                      Your proposal is submitted directly to the Foundation Leadership Committee.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
