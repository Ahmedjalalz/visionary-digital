import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight, Calendar, Clock, MapPin, Newspaper, X } from "lucide-react";
import { foundationMedia } from "@/data/foundationMedia";
import { MaskLines, Rise } from "@/components/site/motion-primitives";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Dispatches & Field Notes — Education And Life Foundation" },
      { name: "description", content: "Authentic field updates, programme milestones and stories from EFL's work across Pakistan." },
      { property: "og:title", content: "Dispatches & News — EFL" },
      { property: "og:description", content: "Field reports and programme milestones from Education And Life Foundation." },
    ],
  }),
  component: News,
});

export interface DispatchPost {
  id: string;
  kicker: string;
  category: "Education" | "Healthcare" | "Livelihoods" | "Welfare" | "Infrastructure";
  location: string;
  date: string;
  readTime: string;
  title: string;
  body: string;
  fullStory: string[];
  img: string;
}

const posts: DispatchPost[] = [
  {
    id: "school-bags-distribution",
    kicker: "Education · Lahore",
    category: "Education",
    location: "Lahore, Punjab",
    date: "October 2025",
    readTime: "3 min read",
    title: "1,200 New School Bags, Uniforms, and Stationery Kits Distributed at Raza Block School",
    body: "Enrolment opens with complete educational kits provided in full — eliminating the three financial hurdles that most often prevent impoverished children from continuing their schooling.",
    fullStory: [
      "Every new academic term in Pakistan brings a silent crisis for low-income families: the compounded cost of brand-new school bags, mandatory uniforms, textbooks, and year-long stationery supplies.",
      "At EFL's flagship school campus in Raza Block, Allama Iqbal Town, Lahore, over 1,200 enrolled students received comprehensive academic kits in partnership with School in a Bag UK and local community donors.",
      "Each child received a weather-resistant satchel packed with notebooks, pens, pencils, geometry tins, water bottles, and hygiene essentials. By eliminating these direct expenses, EFL ensures zero students drop out due to economic strain."
    ],
    img: foundationMedia.bagsCeremony,
  },
  {
    id: "music-of-the-heart",
    kicker: "Arts & Education · Opus 1 Foundation",
    category: "Education",
    location: "Lahore & Islamabad",
    date: "September 2025",
    readTime: "4 min read",
    title: "Music of the Heart: Classical String Repertoire Introduced in Community Classrooms",
    body: "In strategic collaboration with Opus 1 Foundation and advised by Dr. Jonathan Addleton, violins and cellos arrive to enrich student learning, boosting attendance likelihood by 78%.",
    fullStory: [
      "Music education is virtually non-existent in underprivileged public and non-formal schools across Pakistan. The 'Music of the Heart' initiative, launched jointly with the Opus 1 Foundation, seeks to change that paradigm permanently.",
      "Guided by international advisory from former U.S. Ambassador Dr. Jonathan Addleton and backed by classical instrument pledges from George Mason University's Mason Community Arts Academy, string ensembles have been integrated into weekly schedules.",
      "Field observations confirm that participating children show elevated discipline, improved emotional wellbeing, and an extraordinary 78% increase in regular classroom attendance."
    ],
    img: foundationMedia.musicClassViolins,
  },
  {
    id: "mobile-medical-camp-sheikhupura",
    kicker: "Healthcare · Rural Field Unit",
    category: "Healthcare",
    location: "Sheikhupura District",
    date: "August 2025",
    readTime: "3 min read",
    title: "Mobile Medical Camp Reaches 640 Patients in Sheikhupura and Surrounding Villages",
    body: "Free diagnostic consultations, blood testing, and essential prescription medications provided directly to families who would otherwise have to journey over 40 kilometers for clinical care.",
    fullStory: [
      "For families living along the rural belt of Sheikhupura, accessing a qualified physician often requires hours of travel over dirt roads and prohibitive consultation fees.",
      "EFL's mobile clinical team—comprising general practitioners, pediatricians, ophthalmologists, and certified pharmacists—established a two-day camp providing complete primary care, diabetic screening, and free dispensary medication.",
      "Over 640 men, women, and children were examined, with critical cases referred to Lahore specialized tertiary hospitals with transportation and treatment fully subsidized by the foundation."
    ],
    img: foundationMedia.healthCampDoctor,
  },
  {
    id: "vocational-sewing-machines",
    kicker: "Livelihoods · Women Empowerment",
    category: "Livelihoods",
    location: "Kasur District",
    date: "July 2025",
    readTime: "3 min read",
    title: "80 Industrial Sewing Machines Handed Over to Graduating Vocational Trainees",
    body: "Turning short-term relief into lifelong dignity. Graduating women receive commercial-grade machinery and tailoring contracts, establishing independent household incomes.",
    fullStory: [
      "Charity provides immediate relief, but technical skills build generational resilience. EFL's 6-month certified vocational tailoring curriculum completed its latest training cohort this July.",
      "Eighty women—many of whom are sole providers or widows supporting young children—graduated after passing rigorous machine operation, garment cutting, and stitching examinations.",
      "Upon completion, each graduate was presented with an industrial-grade electric sewing machine, starting fabric stock, and local vendor production orders, securing guaranteed monthly income for their households."
    ],
    img: foundationMedia.skillsSewingMachine,
  },
  {
    id: "widows-rations-cycle",
    kicker: "Family Welfare · Lahore & Kasur",
    category: "Welfare",
    location: "Lahore & Kasur",
    date: "June 2025",
    readTime: "2 min read",
    title: "Monthly Nutrition & Rations Cycle Reaches 250 Widow-Headed Families",
    body: "Flour, pulses, cooking oil, and urgent medicine delivered without humiliating public queues — upholding dignity for mothers bearing the sole responsibility of household survival.",
    fullStory: [
      "Widows in impoverished communities carry an immense burden of stigma and economic destitution. EFL's monthly sustenance program replaces sporadic charity with guaranteed monthly nutrition boxes.",
      "Each 45kg parcel provides high-grade whole wheat flour, lentils, cooking oil, tea, sugar, and essential hygiene supplies, packed to feed a household of five for 30 full days.",
      "Deliveries are made discreetly to each recipient's doorstep, completely doing away with humiliating public queues and preserving the absolute dignity of every mother."
    ],
    img: foundationMedia.widowsFoodRations,
  },
  {
    id: "classroom-infrastructure-upgrades",
    kicker: "Classroom Quality · Punjab",
    category: "Infrastructure",
    location: "Punjab Villages",
    date: "May 2025",
    readTime: "3 min read",
    title: "Upgraded Desks, Whiteboards, and Ventilation Installed Across Partner Classrooms",
    body: "Children deserve learning environments that honor their potential. Physical infrastructure overhauls ensure safe, well-lit spaces where students can focus on math and literacy.",
    fullStory: [
      "A classroom without proper desks or ventilation drastically undermines student concentration, particularly during Punjab's extreme summer temperatures.",
      "EFL's school infrastructure team completed physical renovations across four village community school facilities, installing dual-seater ergonomic wooden benches, magnetic dry-erase boards, solar-powered ceiling fans, and LED fixtures.",
      "Teachers report that classroom engagement, posture, and written penmanship have markedly improved, transforming previously austere spaces into vibrant hubs of learning."
    ],
    img: foundationMedia.classroomDesks,
  },
];

const categories = ["All", "Education", "Healthcare", "Livelihoods", "Welfare", "Infrastructure"] as const;

function News() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [activeDispatch, setActiveDispatch] = useState<DispatchPost | null>(null);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-ink">
      {/* ── Header Section ── */}
      <section className="border-b border-ink/10 bg-sand px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            <span className="eyebrow text-clay">Field Dispatches</span>
          </div>
          <h1 className="display-lg mt-4 max-w-[16ch] text-ink">
            <MaskLines lines={["From the", "districts."]} />
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-ink/75">
            Direct field updates, operational milestones, and real stories from communities across Punjab. Documented by the ground teams delivering each programme.
          </p>

          {/* Filter Pill Row */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-ink/10 pt-5">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-ink/50">
              Filter By Area:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-clay text-cream shadow-xs"
                    : "border border-ink/15 bg-background text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Magazine Grid Layout ── */}
      <section className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1600px]">
          {selectedCategory === "All" ? (
            <div className="space-y-12 sm:space-y-16">
              {/* Row 1: Featured Story (Split Layout: Image on Left, Text on Right) */}
              {posts[0] && (
                <Rise delay={0.05}>
                  <article
                    onClick={() => setActiveDispatch(posts[0]!)}
                    className="group grid gap-8 lg:grid-cols-12 lg:items-center rounded-2xl sm:rounded-3xl border border-ink/10 bg-sand/35 p-6 sm:p-8 lg:p-10 shadow-xs hover:border-clay/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="lg:col-span-7">
                      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/10] bg-ink/10 shadow-sm">
                        <img
                          src={posts[0].img}
                          alt={posts[0].title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-clay px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream shadow-xs">
                            Featured Dispatch
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 lg:pl-4">
                      <div className="flex items-center gap-3 text-xs text-ink/55">
                        <span className="font-semibold uppercase tracking-wider text-clay">{posts[0].kicker}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium"><Calendar className="h-3 w-3" /> {posts[0].date}</span>
                      </div>

                      <h2 className="display-sm mt-4 font-bold text-ink group-hover:text-clay transition-colors">
                        {posts[0].title}
                      </h2>

                      <p className="mt-4 font-serif text-lg leading-relaxed text-ink/75 italic">
                        “{posts[0].body}”
                      </p>

                      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                        <span className="flex items-center gap-1.5 text-xs text-ink/50 font-medium">
                          <Clock className="h-3.5 w-3.5" /> {posts[0].readTime}
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-clay group-hover:text-clay-deep">
                          <span>Read Full Dispatch</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Rise>
              )}

              {/* Row 2: Two Equal Side-by-Side Cards */}
              <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                {([posts[1], posts[2]].filter(Boolean) as DispatchPost[]).map((p, idx) => (
                  <Rise key={p.id} delay={0.1 + idx * 0.05}>
                    <article
                      onClick={() => setActiveDispatch(p)}
                      className="group flex flex-col justify-between h-full rounded-2xl border border-ink/10 bg-background p-6 sm:p-8 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-ink/10 shadow-2xs">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute left-3 top-3">
                            <span className="rounded bg-background/90 backdrop-blur-xs px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-clay">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-xs text-ink/50">
                          <span className="font-semibold uppercase tracking-wider text-clay">{p.kicker}</span>
                          <span>{p.date}</span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug text-ink mt-3 group-hover:text-clay transition-colors line-clamp-2">
                          {p.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-ink/70 line-clamp-3">
                          {p.body}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-4">
                        <span className="flex items-center gap-1.5 text-xs text-ink/50">
                          <Clock className="h-3 w-3" /> {p.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-clay group-hover:text-clay-deep">
                          <span>Read Report</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Rise>
                ))}
              </div>

              {/* Row 3: Split Row in Reverse (Text on Left, Image on Right) */}
              {posts[3] && (
                <Rise delay={0.15}>
                  <article
                    onClick={() => setActiveDispatch(posts[3]!)}
                    className="group grid gap-8 lg:grid-cols-12 lg:items-center rounded-2xl sm:rounded-3xl border border-ink/10 bg-sand/35 p-6 sm:p-8 lg:p-10 shadow-xs hover:border-clay/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="lg:col-span-5 lg:order-1 lg:pr-4">
                      <div className="flex items-center gap-3 text-xs text-ink/55">
                        <span className="font-semibold uppercase tracking-wider text-clay">{posts[3].kicker}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium"><Calendar className="h-3 w-3" /> {posts[3].date}</span>
                      </div>

                      <h2 className="display-sm mt-4 font-bold text-ink group-hover:text-clay transition-colors">
                        {posts[3].title}
                      </h2>

                      <p className="mt-4 text-base leading-relaxed text-ink/75">
                        {posts[3].body}
                      </p>

                      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                        <span className="flex items-center gap-1.5 text-xs text-ink/50 font-medium">
                          <Clock className="h-3.5 w-3.5" /> {posts[3].readTime}
                        </span>
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-clay group-hover:text-clay-deep">
                          <span>Read Full Dispatch</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-7 lg:order-2">
                      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/10] bg-ink/10 shadow-sm">
                        <img
                          src={posts[3].img}
                          alt={posts[3].title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute right-4 top-4">
                          <span className="rounded-full bg-ink/80 backdrop-blur-xs px-3.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream shadow-xs">
                            {posts[3].category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Rise>
              )}

              {/* Row 4: Two Equal Side-by-Side Cards */}
              <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
                {([posts[4], posts[5]].filter(Boolean) as DispatchPost[]).map((p, idx) => (
                  <Rise key={p.id} delay={0.2 + idx * 0.05}>
                    <article
                      onClick={() => setActiveDispatch(p)}
                      className="group flex flex-col justify-between h-full rounded-2xl border border-ink/10 bg-background p-6 sm:p-8 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div>
                        <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-ink/10 shadow-2xs">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute left-3 top-3">
                            <span className="rounded bg-background/90 backdrop-blur-xs px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-clay">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-xs text-ink/50">
                          <span className="font-semibold uppercase tracking-wider text-clay">{p.kicker}</span>
                          <span>{p.date}</span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug text-ink mt-3 group-hover:text-clay transition-colors line-clamp-2">
                          {p.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-ink/70 line-clamp-3">
                          {p.body}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-4">
                        <span className="flex items-center gap-1.5 text-xs text-ink/50">
                          <Clock className="h-3 w-3" /> {p.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-clay group-hover:text-clay-deep">
                          <span>Read Report</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </article>
                  </Rise>
                ))}
              </div>
            </div>
          ) : (
            /* When a category is filtered, render an evenly balanced 2-column or 3-column grid */
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((p, idx) => (
                <Rise key={p.id} delay={idx * 0.06}>
                  <article
                    onClick={() => setActiveDispatch(p)}
                    className="group flex flex-col justify-between h-full rounded-2xl border border-ink/10 bg-background p-6 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div>
                      <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-ink/10 shadow-2xs">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3">
                          <span className="rounded bg-background/90 backdrop-blur-xs px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-clay">
                            {p.category}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-ink/50">
                        <span className="font-semibold uppercase tracking-wider text-clay">{p.kicker}</span>
                        <span>{p.date}</span>
                      </div>

                      <h3 className="font-display text-lg font-bold leading-snug text-ink mt-2.5 group-hover:text-clay transition-colors line-clamp-2">
                        {p.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-ink/70 line-clamp-3">
                        {p.body}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                      <span className="flex items-center gap-1.5 text-xs text-ink/50">
                        <Clock className="h-3 w-3" /> {p.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-clay group-hover:text-clay-deep">
                        <span>Read Report</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Rise>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Interactive Dispatch Reader Modal ── */}
      <Dialog open={!!activeDispatch} onOpenChange={(open) => !open && setActiveDispatch(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 border border-ink/15 bg-background shadow-2xl rounded-2xl">
          {activeDispatch && (
            <div>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-ink">
                <img
                  src={activeDispatch.img}
                  alt={activeDispatch.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-clay px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cream">
                      {activeDispatch.category}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-ink/60 backdrop-blur-xs px-3 py-1 text-[0.65rem] font-semibold text-cream/90">
                      <MapPin className="h-3 w-3 text-clay-bright" /> {activeDispatch.location}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-ink/60 backdrop-blur-xs px-3 py-1 text-[0.65rem] font-semibold text-cream/90">
                      <Calendar className="h-3 w-3 text-clay-bright" /> {activeDispatch.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 sm:pt-6 max-h-[60vh] overflow-y-auto">
                <DialogTitle className="font-display text-2xl sm:text-3xl font-bold leading-tight text-ink">
                  {activeDispatch.title}
                </DialogTitle>

                <p className="mt-4 font-serif text-lg italic text-ink/80 border-l-2 border-clay pl-4 py-1 bg-sand/30">
                  {activeDispatch.body}
                </p>

                <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-ink/80 border-t border-ink/10 pt-6">
                  {activeDispatch.fullStory.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
                  <span className="text-xs text-ink/50 font-medium">
                    Published by Education And Life Foundation Field Communications Unit
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveDispatch(null)}
                    className="rounded-full bg-sand px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
