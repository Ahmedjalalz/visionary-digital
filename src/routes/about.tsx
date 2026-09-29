import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useReducedMotion } from "motion/react";

// heroImg unused
// educationImg unused
// healthImg unused
// washImg removed
// widowsImg unused
// digitalImg unused
import skillsImg from "@/assets/official-local/skills.jpg";
import { foundationMedia } from "@/data/foundationMedia";

import { MaskLines, ParallaxImage, Rise, motion } from "@/components/site/motion-primitives";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Education And Life Foundation" },
      {
        name: "description",
        content:
          "Who ELF is, our origins, and how a Lahore-based NGO serves marginalized communities across Punjab.",
      },
      { property: "og:title", content: "About Education And Life Foundation" },
      {
        property: "og:description",
        content: "To uplift the deprived community in Pakistan — the mission, the work, the people.",
      },
    ],
  }),
  component: About,
});

interface BoardMember {
  name: string;
  role: string;
  credentials?: string;
  badge?: string;
  img: string;
  detail: string;
  position?: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Mr. Tasneem Najam",
    role: "Chairman",
    credentials: "M.A. Economics (FCCU)",
    badge: "Executive Board",
    img: "/images/board/tasneem-najam.png",
    position: "object-[center_18%]",
    detail:
      "Brings over three decades of distinguished leadership in Pakistan's education sector as an educator, school owner, and institutional administrator. Former Owner and Principal of Saint Matthew's Cambridge School (1986–2016), Head & Hostel Superintendent at Christian Vocational Training Center Narowal, and Vice Chairman of Assemblies of God Church overseeing nine community schools across suburban Punjab.",
  },
  {
    name: "Ms. Anita Qaiser",
    role: "Vice Chairperson",
    credentials: "BA (Hons) Biblical & Applied Theology (Mattersey Hall, UK)",
    badge: "Executive Board",
    img: "/images/board/anita-qaiser.png",
    position: "object-[center_18%]",
    detail:
      "Dedicated community and ministry leader serving since 1986 across Pakistan's four provinces, Gilgit-Baltistan, and Parachinar. Specializes in youth empowerment, family counseling, and leadership development, bringing extensive pastoral governance and community care to ELF's humanitarian programs.",
  },
  {
    name: "Rev. Zeeshan Hameed",
    role: "Founder & International Director",
    credentials: "BS (Hons) Educational Science (FCCU) · Univ. of Auckland",
    badge: "Executive Board",
    img: "/images/board/zeeshan-hameed.jpg",
    position: "object-[center_15%]",
    detail:
      "Founder and International Director of Education and Life Foundation. Leading non-profit initiatives since 2017, he spearheads ELF's international donor relations, strategic project planning, institutional capacity building, and cross-border partnerships connecting global resources directly to grassroots Pakistani communities.",
  },
  {
    name: "Dr. Sana Rafaqat",
    role: "General Secretary",
    credentials: "Ph.D. Biotechnology (Molecular Human Genetics)",
    badge: "Executive Board",
    img: "/images/board/sana-rafaqat.jpg",
    position: "object-[center_18%]",
    detail:
      "Accomplished scientist and researcher with over 40 peer-reviewed scientific publications in international journals. With over six years of experience in quality assurance, clinical research management, and university teaching, she oversees ELF's institutional governance, statutory compliance, and healthcare initiatives.",
  },
  {
    name: "Mr. Ejaz Pervaz",
    role: "Chief Financial Officer",
    badge: "Executive Board",
    img: "/images/board/ejaz-pervaz.png",
    position: "object-[center_18%]",
    detail:
      "Chief Financial Officer of Education and Life Foundation. Oversees financial governance, budgeting, external audits, and fiscal stewardship, ensuring that all donor contributions and institutional funds are deployed with rigorous transparency and maximum direct impact.",
  },
  {
    name: "Mr. Sohail Hameed",
    role: "Finance Secretary",
    credentials: "B.Com (Hailey College of Commerce)",
    badge: "Executive Board",
    img: "/images/board/sohail-hameed.png",
    position: "object-[center_18%]",
    detail:
      "Businessman with over 11 years of voluntary church financial administration. Holds a Bachelor of Commerce from Hailey College of Commerce and manages ELF's daily accounting, fiscal allocations, disbursement verification, and transparent reporting systems.",
  },
  {
    name: "Prof. Kamran Rehmat",
    role: "Office Secretary",
    credentials: "MPhil Economics (NCBA&E) · MSc Economics (FCCU)",
    badge: "Executive Board",
    img: "/images/board/kamran-rehmat.png",
    position: "object-[center_18%]",
    detail:
      "Economics Professor in the Punjab government sector (Government Associate College for Boys, Lahore) and former Human Rights Defender with the National Commission for Justice and Peace (NCJP). Directs official administration, secretarial documentation, and minority welfare advocacy for ELF.",
  },
  {
    name: "Rev. Samuel Bhatti",
    role: "Program Lead — Azadi Freedom",
    credentials: "Master in Theology",
    badge: "Programs Leadership",
    img: "/images/board/samuel-bhatti.png",
    position: "object-[center_18%]",
    detail:
      "Founder and Program Lead of Azadi Freedom under ELF. With a background directing a German non-profit in Pakistan, he advances UN Sustainable Development Goals through vocational skills training, micro-business grants, and rights-based social inclusion for marginalized communities.",
  },
  {
    name: "Rev. Javed Mukhtar",
    role: "Press Secretary",
    credentials: "Motivational Speaker & Consultant",
    badge: "Communications",
    img: "/images/board/javed-mukhtar.jpg",
    position: "object-[center_18%]",
    detail:
      "Press Secretary of Education and Life Foundation. Renowned motivational speaker and community consultant steering ELF's public communication, media outreach, and storytelling to highlight grassroots needs and rally community support.",
  },
  {
    name: "Prof. Dr. Christy Munir",
    role: "Former Chairman",
    credentials: "Ph.D. Chemistry (Wayne State, USA) · Professor Emeritus (FCCU)",
    badge: "Professor Emeritus",
    img: "/images/board/christy-munir.png",
    position: "object-[center_18%]",
    detail:
      "Former Chairman of ELF and Professor Emeritus of Inorganic Chemistry at Forman Christian College (A Chartered University). Over 40 years of academic and institutional leadership, including Vice Principal and Principal of FCCU, with 50+ published scientific papers guiding ELF's founding vision.",
  },
  {
    name: "Prof. Rev. Aslam Yuhanna",
    role: "Former Chairman",
    credentials: "M.Sc. Economics (Colorado State, USA) · Professor Emeritus (FCCU)",
    badge: "Professor Emeritus",
    img: "/images/board/aslam-yuhanna.png",
    position: "object-[center_18%]",
    detail:
      "Former Chairman of ELF and Professor Emeritus of Economics at Forman Christian College (1970–2007). Former Chairman of the Pakistan Assemblies of God and current Chairman of Assemblies of God Church, Lahore, providing lifelong spiritual wisdom, educational leadership, and ethical stewardship.",
  },
];

const history = [
  { year: "Origins", title: "A response, not a plan", body: "ELF begins as direct assistance to families in Lahore who had fallen out of every other net — food, fees, medicine.", img: "/images/widows/scrolling/5.jpg" },
  { year: "Schools", title: "Classrooms open", body: "Free schooling formalises: tuition, books, uniforms and stationery covered so cost stops deciding who learns.", img: "/images/wash/wash-s-2.jpg" },
  { year: "Health", title: "Camps go rural", body: "Medical camps move out of the city into districts where the nearest clinic is a journey rather than a walk.", img: "/images/pregnant/pregnant-9.jpg" },
  { year: "Water", title: "WASH added", body: "Safe water and sanitation become a programme in their own right after illness keeps emptying classrooms.", img: "/images/wash/wash-s-4.jpg" },
  { year: "Skills", title: "From aid to income", body: "Vocational and digital training launch so families exit assistance instead of depending on it.", img: skillsImg },
  { year: "Today", title: "Programmes across four countries", body: "Supporters in Pakistan, New Zealand, Canada and Germany fund work delivered by teams who live where it happens.", img: "/images/wash/wash-s-1.jpg" },
];

function HistoryRail() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [distance, setDistance] = useState(0);
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="relative hidden bg-sand lg:block"
        style={{ height: `${Math.max(160, 60 + history.length * 20)}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24 pb-8">
          <div className="mx-auto mb-8 w-full max-w-[1600px] px-8">
            <span className="eyebrow">The journey</span>
            <h2 className="display-md mt-3 max-w-[18ch] text-ink">
              How a room full of urgency became a portfolio of programmes.
            </h2>
          </div>
          <motion.ol ref={trackRef} style={reduce ? {} : { x }} className="flex items-stretch gap-8 pl-8 pr-8">
            {history.map((h, i) => (
              <li key={h.year} className="w-[440px] shrink-0">
                <div className="relative h-[240px] overflow-hidden rounded-2xl border border-ink/10 shadow-xs">
                  <img src={h.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover object-[center_30%]" />
                  <div className="absolute inset-0 bg-ink/45" />
                  <span className="numeral absolute bottom-4 left-5 text-5xl text-cream">{h.year}</span>
                </div>
                <div className="mt-5 border-t border-ink/15 pt-4">
                  <span className="numeral text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1.5 font-display text-2xl font-bold text-ink">{h.title}</h3>
                  <p className="mt-2.5 max-w-[42ch] text-sm leading-relaxed text-ink/60">{h.body}</p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="bg-sand px-5 py-14 lg:hidden">
        <span className="eyebrow">The journey</span>
        <h2 className="display-md mt-3 text-ink">How urgency became a portfolio of programmes.</h2>
        <ol className="mt-8 space-y-10">
          {history.map((h) => (
            <li key={h.year}>
              <div className="relative h-52 overflow-hidden rounded-2xl border border-ink/10 shadow-xs">
                <img src={h.img} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover object-[center_30%]" />
                <div className="absolute inset-0 bg-ink/45" />
                <span className="numeral absolute bottom-3 left-4 text-4xl text-cream">{h.year}</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{h.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      {/* hero — typographic, image behind */}
      <section className="relative flex min-h-[68svh] w-full flex-col justify-end overflow-hidden pb-14 pt-24 sm:min-h-[76svh] sm:pb-20">
        <ParallaxImage src="/images/wash/wash-b-1.jpg" alt="Children outside an ELF village school in Punjab" className="absolute inset-0" imgClassName="object-[50%_15%]" priority strength={45} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/65 to-ink/20" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay-bright block mb-3">Lahore, Pakistan</span>
            <h1 className="display-xl max-w-[12ch] !text-cream drop-shadow-md">
              <MaskLines lines={["To uplift", "the deprived", "community."]} />
            </h1>
          </div>
        </div>
      </section>

      {/* who we are */}
      <section className="paper py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Who we are</span>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              Education and Life Foundation is a non-governmental organisation working with deprived
              communities in Pakistan through sustainable development — free education, healthcare, food
              and financial support.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <p className="text-base leading-relaxed text-ink/70">
                We provide schooling and medical care where the state's reach thins out, and financial
                support to widows and low-income families holding households together alone.
              </p>
              <p className="text-base leading-relaxed text-ink/70">
                Our skill development programmes turn that support into self-reliance: practical training,
                employment, and a route out of dependence rather than a longer stay inside it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* vision / mission — split, oversized */}
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 bg-clay px-5 py-16 text-primary-foreground sm:px-10 sm:py-20">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] opacity-80">Vision</span>
          <p className="font-display text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            To uplift the deprived community in Pakistan.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-12 bg-sand px-5 py-16 text-ink sm:px-10 sm:py-20">
          <span className="eyebrow">Mission</span>
          <p className="font-display text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
            To build a better life for the community, and to aid those who cannot help themselves.
          </p>
        </div>
      </section>

      {/* services — rich visual card showcase */}
      <section className="border-b border-ink/10 bg-background px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Direct Provisions</span>
              <h2 className="display-md mt-3 text-ink">What the Foundation Provides</h2>
            </div>
            <p className="max-w-md text-sm text-ink/65 leading-relaxed">
              Every initiative is delivered directly into the hands of families with zero administrative intermediaries and verifiable community impact.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Free Education For Underprivileged",
                desc: "Tuition, uniforms, textbooks, and daily stationery for children across Punjab who would otherwise be out of school.",
                img: foundationMedia.projectEducation,
                badge: "Education",
              },
              {
                title: "Monthly Rations & Widow Support",
                desc: "Direct nutritional rations and living stipends delivered with dignity to households headed solely by widows.",
                img: "/images/widows/scrolling/16.jpg",
                badge: "Welfare",
              },
              {
                title: "Free Medical Care & Prescription",
                desc: "Mobile clinical camps, qualified volunteer doctors, diagnostic screening, and emergency medication in rural villages.",
                img: foundationMedia.healthCampDoctor,
                badge: "Healthcare",
              },
              {
                title: "Safe Water & Rural Hand Pumps",
                desc: "Clean drinking water wells and school sanitation infrastructure protecting children from waterborne illness.",
                img: "/images/wash/wash-b-6.jpg",
                badge: "WASH",
              },
              {
                title: "Vocational Skills & Micro-Enterprise",
                desc: "Industrial sewing machines and computer literacy cohorts turning immediate relief into lifelong self-reliance.",
                img: "/images/skills/community/community-skill-7.jpg",
                badge: "Livelihoods",
              },
              {
                title: "Emergency Relief & Orphan Support",
                desc: "Rapid flood and winter survival packages alongside marriage and educational grants for orphaned young women.",
                img: foundationMedia.emergencyRelief,
                badge: "Emergency Aid",
              },
            ].map((s, i) => (
              <Rise key={s.title} delay={i * 0.05}>
                <div className="group relative rounded-2xl border border-ink/10 bg-sand/35 p-6 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 w-full overflow-hidden rounded-xl bg-ink/10 shadow-2xs">
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-60" />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-cream backdrop-blur-xs shadow-xs">
                      {s.badge}
                    </span>
                    <span className="numeral absolute bottom-2.5 right-3 text-2xl font-black text-cream/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-xl font-bold leading-tight text-ink group-hover:text-clay transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Members — leadership & governance */}
      <section className="bg-background px-5 pb-16 sm:px-8 sm:pb-24 border-b border-ink/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">Governance & Stewardship</span>
              <h2 className="display-md mt-2 max-w-[16ch] text-ink">Board of Directors & Officers</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/65">
              Distinguished educators, researchers, and community leaders providing strategic oversight, financial accountability, and grassroots direction for Education and Life Foundation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {boardMembers.map((m, i) => (
              <Rise key={m.name} delay={i * 0.04}>
                <figure className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 shadow-xs hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role}`}
                    loading="lazy"
                    className={`h-full w-full object-cover ${m.position || "object-[center_20%]"} transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-transparent" />
                  
                  {m.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-ink/75 backdrop-blur-md border border-cream/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-cream/90 shadow-xs">
                        {m.badge}
                      </span>
                    </div>
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                    <div className="font-display text-lg sm:text-xl font-bold leading-tight tracking-tight text-cream">
                      {m.name}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] font-semibold text-clay-bright">{m.role}</div>
                    {m.credentials && (
                      <div className="mt-0.5 text-[11px] text-cream/65 line-clamp-1">{m.credentials}</div>
                    )}
                  </figcaption>

                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/95 to-ink/40 p-5 sm:p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-clay-bright">{m.role}</div>
                    <div className="mt-1 font-display text-lg sm:text-xl font-bold tracking-tight text-cream leading-snug">{m.name}</div>
                    {m.credentials && (
                      <div className="mt-1 text-[11px] font-medium text-cream/70 border-b border-cream/15 pb-2">{m.credentials}</div>
                    )}
                    <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-cream/85 overflow-y-auto max-h-[52%] pr-1">{m.detail}</p>
                  </div>
                  <p className="sr-only">{m.detail}</p>
                </figure>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <HistoryRail />

      <section className="paper px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-8">
          <h2 className="display-lg max-w-[14ch]">Come and see the work.</h2>
          <div className="flex flex-wrap gap-3.5">
            <Link to="/projects" className="rounded-full bg-clay px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-clay-deep shadow-md">
              The projects
            </Link>
            <Link to="/book" className="rounded-full border border-ink/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-all hover:border-ink hover:bg-sand/60 shadow-xs">
              Book a meeting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
