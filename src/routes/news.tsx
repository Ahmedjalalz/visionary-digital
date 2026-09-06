import { createFileRoute } from "@tanstack/react-router";
import familyAsset from "@/assets/official/family.jpg.asset.json";
import educationAsset from "@/assets/official/education.jpg.asset.json";
import healthAsset from "@/assets/official/health.jpg.asset.json";
import { MaskLines } from "@/components/site/motion-primitives";

const heroImg = familyAsset.url;
const educationImg = educationAsset.url;
const healthImg = healthAsset.url;

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Education and Life Foundation" },
      { name: "description", content: "Field notes, programme updates and stories from EFL's work across Punjab." },
      { property: "og:title", content: "News — EFL" },
      { property: "og:description", content: "Field notes and programme updates from Education and Life Foundation." },
    ],
  }),
  component: News,
});

const posts = [
  {
    kicker: "Field note",
    title: "A new intake of students enrols at the Raza Block school",
    body: "Enrolment opens with books, uniforms and stationery covered in full — the three costs that most often end an education before it starts.",
    img: educationImg,
    size: "lg" as const,
  },
  {
    kicker: "Health",
    title: "Medical camp reaches families outside Sheikhupura",
    body: "Free consultation and medicine, with referrals arranged for patients needing hospital care.",
    img: healthImg,
    size: "sm" as const,
  },
  {
    kicker: "Community",
    title: "Monthly welfare cycle continues for widow-headed households",
    body: "Food and financial support delivered without conditions that shame the recipient.",
    img: heroImg,
    size: "sm" as const,
  },
];

function News() {
  return (
    <>
       <section className="bg-sand px-5 pb-14 pt-40 sm:px-8 sm:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Dispatches</span>
           <h1 className="display-lg mt-6 max-w-[12ch] text-ink">
            <MaskLines lines={["From the", "districts."]} />
          </h1>
          <p className="lede mt-8">
            Short updates from the programmes as they run. Written by the teams delivering them.
          </p>
        </div>
      </section>

       <section className="bg-background px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-[1600px] space-y-4">
          {posts.map((p, i) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden ${
                p.size === "lg" ? "h-[70svh] min-h-[420px]" : "h-[48svh] min-h-[320px]"
              } ${i === 2 ? "md:ml-[18%]" : ""}`}
            >
              <img
                src={p.img}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 max-w-3xl p-6 sm:p-10">
                <span className="eyebrow">{p.kicker}</span>
                <h2 className="mt-3 font-display text-3xl font-bold leading-[1.02] tracking-tight text-cream sm:text-5xl">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/65">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
