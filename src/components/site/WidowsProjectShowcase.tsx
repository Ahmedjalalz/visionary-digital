import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Home,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Briefcase,
  Play,
  ArrowRight,
  Quote,
  CheckCircle2,
  Lock,
} from "lucide-react";
import {
  sponsorshipPillars,
  measurableImpacts,
  widowsTestimonies,
  widowsFaqs,
  widowsGalleryImages,
  WidowTestimony,
} from "@/data/widowsProgramData";

export function WidowsProjectShowcase() {
  const [selectedTestimony, setSelectedTestimony] = useState<WidowTestimony>(widowsTestimonies[0]!);
  const [openFaq, setOpenFaq] = useState<string | null>(widowsFaqs[0]?.id ?? null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [showAllScrolling, setShowAllScrolling] = useState<boolean>(false);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ── 1. FEATURED CAMPAIGN VIDEO & SPONSORSHIP SPOTLIGHT ── */}
      <section className="relative px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="overflow-hidden rounded-3xl border border-ink/10 bg-sand/60 p-6 sm:p-10 lg:p-12 shadow-xs">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Video Embed */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-lg">
                  {!isVideoPlaying ? (
                    <div className="relative h-full w-full">
                      {/* Video Poster Image */}
                      <picture className="contents">
                        <source srcSet="/images/widows/bottom/1.webp" type="image/webp" />
                        <img
                          src="/images/widows/bottom/1.jpg"
                          alt="A Legacy of Hope Sponsorship"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-[center_20%] opacity-85 transition-transform duration-700 hover:scale-105"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <button
                          type="button"
                          onClick={() => setIsVideoPlaying(true)}
                          className="group flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-clay text-cream shadow-xl transition-all duration-300 hover:scale-110 hover:bg-clay-deep focus:outline-none focus:ring-4 focus:ring-clay/30"
                          aria-label="Play Campaign Video"
                        >
                          <Play className="h-8 w-8 fill-current ml-1 transition-transform group-hover:scale-110" />
                        </button>
                        <span className="mt-4 rounded-full bg-ink/70 px-4 py-1.5 text-xs font-semibold tracking-wider text-cream/90 backdrop-blur-xs">
                          Watch Field Documentary (4:12)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src="https://www.youtube.com/embed/1zPNMrAW3qo?autoplay=1&rel=0&modestbranding=1"
                      title="A Legacy of Hope Sponsorship - Education and Life Foundation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  )}
                </div>
              </div>

              {/* Video Accompanying Narrative */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-clay">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Featured Intervention</span>
                  </div>
                  <h2 className="display-sm mt-3 text-ink font-bold">
                    A Legacy of Hope Sponsorship
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-clay">
                    $1,850 Full Family Liberation & Sustainable Transformation Package
                  </p>
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ink/75">
                    When a husband passes away in a brick kiln community, his accumulated debt is forcibly
                    passed onto his widow and children. Without emergency intervention, mothers face physical
                    servitude and children are denied schooling to shovel coal and mold wet clay.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-ink/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-clay mt-0.5" />
                      <span><strong>Permanent debt liquidation</strong> with legally verified release documents.</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-ink/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-clay mt-0.5" />
                      <span><strong>6 months prepaid rent</strong> in safe urban housing + monthly food hampers.</span>
                    </div>
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-ink/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-clay mt-0.5" />
                      <span><strong>Income-generating tools</strong> (sewing machines, retail kiosks) for self-sufficiency.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ink/10 flex flex-wrap items-center gap-4">
                  <Link
                    to="/donate"
                    search={{ project: "hope-and-freedom-for-widows-headed-families" }}
                    className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-all hover:bg-clay-deep shadow-xs hover:shadow-md"
                  >
                    <span>Sponsor A Family ($1,850)</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-all hover:bg-sand"
                  >
                    Inquire for Field Report
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE 5 CORE INTERVENTION PILLARS ── */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <span className="eyebrow text-clay">Holistic Rehabilitation Model</span>
            <h2 className="display-md mt-3 text-ink">
              The Five Pillars of Liberation & Transformation
            </h2>
            <p className="lede mt-4 text-ink/75">
              Freedom is not merely paying off an exploitative debt; it is giving a family the physical,
              emotional, and economic foundation so they never face exploitation again. Each sponsored widow
              receives a structured 5-pillar pathway.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorshipPillars.map((pillar) => {
              const icons = [Lock, Home, Stethoscope, GraduationCap, Briefcase];
              const IconComponent = icons[parseInt(pillar.step, 10) - 1] || ShieldCheck;
              return (
                <div
                  key={pillar.step}
                  className="group flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-7 sm:p-8 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="numeral text-sm font-bold text-clay">{pillar.step}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clay/10 text-clay transition-colors group-hover:bg-clay group-hover:text-cream">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>
                    <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-clay">
                      {pillar.costDetail}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-ink/50">
                      {pillar.subtitle}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink/70">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-ink/10 pt-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60 block mb-2.5">
                      Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {pillar.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-ink/80">
                          <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* Direct Sponsorship CTA Card in Grid */}
            <div className="flex flex-col justify-between rounded-2xl border border-clay/30 bg-gradient-to-br from-clay/10 via-sand/50 to-background p-7 sm:p-8 shadow-xs">
              <div>
                <span className="numeral text-sm font-bold text-clay">COMPLETE</span>
                <span className="mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-clay">
                  All 5 Pillars Combined
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  Sponsor A Widow-Headed Family
                </h3>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-ink/75">
                  Your $1,850 gift liberates an entire family forever: discharging predatory debts, paying 6
                  months rent, enrolling kids in school, and providing an industrial sewing machine or grocery
                  business.
                </p>
                <div className="mt-5 rounded-xl border border-clay/20 bg-background/80 p-4">
                  <span className="text-2xl font-bold text-clay">$1,850</span>
                  <span className="text-xs text-ink/60 ml-2">one-time full sponsorship</span>
                  <p className="text-[11px] text-ink/60 mt-1">Or contribute $50/month to general widow welfare rations.</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/donate"
                  search={{ project: "hope-and-freedom-for-widows-headed-families" }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-all hover:bg-clay-deep shadow-xs"
                >
                  <span>Sponsor Full Package</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MEASURABLE IMPACT INDICATORS ── */}
      <section className="border-y border-ink/10 bg-sand/30 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow text-clay">The Power of Your Support</span>
              <h2 className="display-md mt-3 text-ink">
                Measurable Impact & Concrete Milestones
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-ink/70">
              Every dollar is tracked from the moment debt negotiation commences to the day the family records
              their first independent business income.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {measurableImpacts.map((impact, i) => (
              <div
                key={impact.title}
                className="group flex flex-col justify-between rounded-2xl border border-ink/10 bg-background p-6 shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="numeral text-xs font-bold text-clay">0{i + 1}</span>
                    <span className="rounded-full bg-clay/10 px-2.5 py-0.5 text-[10px] font-bold text-clay">
                      {impact.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">
                    {impact.title}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold text-clay">
                    {impact.subtitle}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink/70">
                    {impact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. REAL FIELD TESTIMONIES SHOWCASE (11 STORIES) ── */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="eyebrow text-clay">Voices From The Ground</span>
              <h2 className="display-md mt-3 text-ink">
                Field Testimonies & Restored Dignity
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-ink/70">
                Behind every statistic is a widowed mother who fought against bonded debt, exhaustion, and illness
                to protect her children. Read their firsthand experiences.
              </p>
            </div>
          </div>

          {/* Active Featured Testimony Spotlight */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-background p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border border-ink/10 bg-muted">
                  <picture className="contents">
                    {selectedTestimony.image.startsWith("/images/") && (
                      <source srcSet={selectedTestimony.image.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                    )}
                    <img
                      src={selectedTestimony.image}
                      alt={selectedTestimony.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[center_18%] transition-transform duration-700 hover:scale-105"
                    />
                  </picture>
                  <div className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-[10px] font-semibold tracking-wider text-cream backdrop-blur-xs">
                    {selectedTestimony.status}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-clay">
                  <Quote className="h-6 w-6 opacity-70" />
                  <span className="text-xs font-bold uppercase tracking-widest">Testimony Spotlight</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                  {selectedTestimony.name}
                </h3>
                <span className="inline-block text-xs font-semibold text-clay mt-1">
                  {selectedTestimony.role} • {selectedTestimony.debt}
                </span>

                <blockquote className="mt-4 rounded-2xl border-l-4 border-clay bg-sand/40 p-4 sm:p-5 italic text-ink/85 text-xs sm:text-sm leading-relaxed">
                  &ldquo;{selectedTestimony.quote}&rdquo;
                </blockquote>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ink/75">
                  {selectedTestimony.story}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to="/donate"
                    search={{ project: "hope-and-freedom-for-widows-headed-families" }}
                    className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cream transition-all hover:bg-clay-deep shadow-xs"
                  >
                    <span>Sponsor Families Like {selectedTestimony.name.split(" ")[0]}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonies Selector Carousel / Thumbnail Grid */}
          <div className="mt-8">
            <span className="text-xs font-bold uppercase tracking-wider text-ink/60 block mb-4">
              Select A Story Below (11 Documented Case Histories):
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5 sm:gap-3">
              {widowsTestimonies.map((t) => {
                const isSelected = selectedTestimony.id === t.id;
                const thumbSrc = t.image.replace(/\.(jpe?g|png)$/i, "-thumb.webp");
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTestimony(t)}
                    className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-200 focus:outline-none ${
                      isSelected
                        ? "border-clay ring-2 ring-clay/40 shadow-md scale-105"
                        : "border-ink/10 opacity-75 hover:opacity-100 hover:border-ink/30"
                    }`}
                  >
                    <div className="aspect-square w-full bg-muted overflow-hidden">
                      <img
                        src={thumbSrc}
                        alt={t.name}
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-[center_18%] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-1.5 text-center bg-background">
                      <span className="block truncate text-[10px] font-bold text-ink">
                        {t.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. AUTHENTIC FIELD GALLERY (D:\ELF\Widows Welfare Program) ── */}
      <section className="border-y border-ink/10 bg-sand/20 px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="eyebrow text-clay">Direct Photographic Record</span>
              <h2 className="display-md mt-3 text-ink">
                Rehabilitation & Community Welfare In Action
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-ink/70 max-w-2xl">
                Archival field documentation from the Widows Welfare Program showing emergency grocery distribution,
                vocational sewing workstations, family relocations, and new micro-enterprises.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-clay/10 px-3.5 py-1 text-xs font-bold text-clay">
                30 Field Photographs
              </span>
            </div>
          </div>

          {/* Primary Bottom Highlights Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {widowsGalleryImages.bottom.map((imgSrc, idx) => (
              <div
                key={imgSrc}
                className="group overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <picture className="contents">
                    {imgSrc.startsWith("/images/") && (
                      <source srcSet={imgSrc.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                    )}
                    <img
                      src={imgSrc}
                      alt={`Field Welfare Outreach ${idx + 1}`}
                      className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-clay">
                    Program Milestone {idx + 1}
                  </span>
                  <h4 className="font-display text-sm font-bold text-ink mt-1">
                    {idx === 0 && "Direct Staple Food Hampers & Monthly Rations"}
                    {idx === 1 && "Sewing Machine & Fabric Tailoring Workstation"}
                    {idx === 2 && "Home Relocation & Rental Shelter Support"}
                    {idx === 3 && "Health Diagnostic Outreach & Family Monitoring"}
                    {idx === 4 && "Micro-Enterprise Startup Capital Distribution"}
                    {idx === 5 && "Children's School Kits & Backpack Handover"}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Scrolling Gallery Strip */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60">
                Continuous Field Photo Stream (Scroll horizontally):
              </span>
              {!showAllScrolling && (
                <button
                  type="button"
                  onClick={() => setShowAllScrolling(true)}
                  className="text-xs font-bold uppercase tracking-wider text-clay hover:text-clay-deep underline cursor-pointer"
                >
                  View All 20 Photographs →
                </button>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-ink/20">
              {(showAllScrolling ? widowsGalleryImages.scrolling : widowsGalleryImages.scrolling.slice(0, 6)).map((imgSrc, idx) => (
                <div
                  key={imgSrc}
                  className="group relative shrink-0 w-64 sm:w-72 overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-md snap-start"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-muted">
                    <picture className="contents">
                      {imgSrc.startsWith("/images/") && (
                        <source srcSet={imgSrc.replace(/\.(jpe?g|png)$/i, ".webp")} type="image/webp" />
                      )}
                      <img
                        src={imgSrc}
                        alt={`Scrolling Record ${idx + 1}`}
                        className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="p-3 bg-background">
                    <span className="text-[10px] font-medium text-ink/60">
                      Record #{idx + 1} • Punjab Field Operations
                    </span>
                  </div>
                </div>
              ))}
              {!showAllScrolling && (
                <button
                  type="button"
                  onClick={() => setShowAllScrolling(true)}
                  className="group shrink-0 w-64 sm:w-72 aspect-[3/2] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-clay/40 bg-sand/50 p-6 text-center hover:bg-clay/10 transition-colors cursor-pointer"
                >
                  <span className="font-display text-base font-bold text-ink group-hover:text-clay">
                    +14 More Records
                  </span>
                  <span className="mt-1 text-[11px] text-ink/60">
                    Click to load full photostream
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. DIRECT ACTION SPONSORSHIP CALLOUT BANNER ── */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="overflow-hidden rounded-3xl border border-clay/30 bg-gradient-to-r from-clay via-clay-deep to-clay p-8 sm:p-12 lg:p-16 text-cream shadow-xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-cream">
                <HeartHandshake className="h-4 w-4" />
                <span>Immediate Field Action</span>
              </span>
              <h2 className="display-md mt-4 text-cream font-bold">
                You Can Break The Bondage For A Family Today
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-cream/90">
                A single contribution breaks the multi-generational hold of brick kiln debts. Whether through a
                full family liberation sponsorship ($1,850) or recurring monthly welfare aid ($50/month), you provide
                safety, food, schooling, and true human dignity.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/donate"
                  search={{ project: "hope-and-freedom-for-widows-headed-families" }}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-clay transition-all hover:bg-white hover:scale-105 shadow-md"
                >
                  <span>Donate to Widows Program</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-cream transition-all hover:bg-cream/10"
                >
                  Request Detailed Case File
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FREQUENTLY ASKED QUESTIONS (AZADI FREEDOM EXACT Q&A) ── */}
      <section id="faq" className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <span className="eyebrow text-clay">Clarity & Understanding</span>
            <h2 className="display-md mt-3 text-ink">
              Frequently Asked Questions
            </h2>
            <p className="lede mt-4 text-ink/75">
              Exact questions and answers regarding debt bondage, kiln operations, family release procedures,
              and post-liberation support.
            </p>
          </div>

          <div className="mt-12 max-w-4xl space-y-4">
            {widowsFaqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-clay/40 bg-sand/30 shadow-md"
                      : "border-ink/10 bg-background hover:border-ink/20 shadow-xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="numeral text-xs font-bold text-clay mt-0.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold text-ink">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-clay text-cream" : "bg-ink/5 text-ink/60"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-ink/10 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
                      <p className="text-xs sm:text-sm leading-relaxed text-ink/80 pl-7">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
