import { createFileRoute } from "@tanstack/react-router";
import { foundationMedia } from "@/data/foundationMedia";
import { MaskLines } from "@/components/site/motion-primitives";

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

const posts = [
  {
    kicker: "Education · Lahore",
    date: "October 2025",
    title: "1,200 New School Bags, Uniforms, and Stationery Kits Distributed at Raza Block School",
    body: "Enrolment opens with complete educational kits provided in full — eliminating the three financial hurdles that most often prevent impoverished children from continuing their schooling.",
    img: foundationMedia.bagsCeremony,
    size: "lg" as const,
  },
  {
    kicker: "Arts & Education · Opus 1 Foundation",
    date: "September 2025",
    title: "Music of the Heart: Classical String Repertoire Introduced in Community Classrooms",
    body: "In strategic collaboration with Opus 1 Foundation and advised by Dr. Jonathan Addleton, violins and cellos arrive to enrich student learning, boosting attendance likelihood by 78%.",
    img: foundationMedia.musicClassViolins,
    size: "sm" as const,
  },
  {
    kicker: "Healthcare · Rural Field Unit",
    date: "August 2025",
    title: "Mobile Medical Camp Reaches 640 Patients in Sheikhupura and Surrounding Villages",
    body: "Free diagnostic consultations, blood testing, and essential prescription medications provided directly to families who would otherwise have to journey over 40 kilometers for clinical care.",
    img: foundationMedia.healthCampDoctor,
    size: "sm" as const,
  },
  {
    kicker: "Livelihoods · Women Empowerment",
    date: "July 2025",
    title: "80 Industrial Sewing Machines Handed Over to Graduating Vocational Trainees",
    body: "Turning short-term relief into lifelong dignity. Graduating women receive commercial-grade machinery and tailoring contracts, establishing independent household incomes.",
    img: foundationMedia.skillsSewingMachine,
    size: "sm" as const,
  },
  {
    kicker: "Family Welfare · Lahore & Kasur",
    date: "June 2025",
    title: "Monthly Nutrition & Rations Cycle Reaches 250 Widow-Headed Families",
    body: "Flour, pulses, cooking oil, and urgent medicine delivered without humiliating public queues — upholding dignity for mothers bearing the sole responsibility of household survival.",
    img: foundationMedia.widowsFoodRations,
    size: "sm" as const,
  },
  {
    kicker: "Classroom Quality · Punjab",
    date: "May 2025",
    title: "Upgraded Desks, Whiteboards, and Ventilation Installed Across Partner Classrooms",
    body: "Children deserve learning environments that honor their potential. Physical infrastructure overhauls ensure safe, well-lit spaces where students can focus on math and literacy.",
    img: foundationMedia.classroomDesks,
    size: "sm" as const,
  },
];

function News() {
  return (
    <>
      <section className="bg-sand px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-2.5 text-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            <span className="eyebrow text-clay">Field Dispatches</span>
          </div>
          <h1 className="display-lg mt-4 max-w-[14ch] text-ink">
            <MaskLines lines={["From the", "districts."]} />
          </h1>
          <p className="lede mt-6 max-w-2xl text-ink/75">
            Direct reports, operational milestones, and real stories from the field across Punjab. Documented by the ground teams delivering each programme.
          </p>
        </div>
      </section>

      <section className="bg-background px-5 pb-24 pt-8 sm:px-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          {posts.map((p) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-sm ${
                p.size === "lg" ? "h-[65svh] min-h-[420px]" : "h-[45svh] min-h-[320px]"
              }`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 max-w-4xl p-6 sm:p-10">
                <div className="flex items-center gap-3">
                  <span className="eyebrow text-clay">{p.kicker}</span>
                  <span className="text-[0.68rem] uppercase tracking-widest text-cream/50">· {p.date}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-cream sm:text-3xl lg:text-4xl">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
