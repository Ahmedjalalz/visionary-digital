import { useState } from "react";
import { Music, Sparkles, Volume2 } from "lucide-react";

export interface MusicalInstrument {
  id: string;
  name: string;
  urduName?: string;
  category: "desi" | "popular";
  tag: string;
  soundType: string;
  image: string;
  description: string;
  curriculumRole: string;
}

export const musicalInstruments: MusicalInstrument[] = [
  // Desi & Regional Instruments
  {
    id: "tabla",
    name: "Tabla & Bayan",
    urduName: "طبلہ",
    category: "desi",
    tag: "Desi Classical",
    soundType: "Percussion · Taal & Rhythm",
    image: "/images/instruments/tabla.jpg",
    description:
      "The foundational twin hand-drums of South Asian classical music. Crafted from polished sheesham wood and resonant brass/copper with black iron-paste syahi tuning rings.",
    curriculumRole: "Teaches rhythmic division, metric cycles (matras), and hand-eye tactile coordination.",
  },
  {
    id: "harmonium",
    name: "Harmonium",
    urduName: "ہارمونیم",
    category: "desi",
    tag: "Desi Classical",
    soundType: "Reed Organ · Melodic Sustained Tone",
    image: "/images/instruments/harmonium.jpg",
    description:
      "Hand-pumped multi-reed keyboard instrument built from seasoned Burma teak wood. Features brass octave couplers, multi-fold bellows, and rich acoustic warmth.",
    curriculumRole: "Serves as the harmonic center for vocal pitch training, scale practice (thaat), and chorus singing.",
  },
  {
    id: "sitar",
    name: "Classical Sitar",
    urduName: "ستار",
    category: "desi",
    tag: "Desi Classical",
    soundType: "Plucked Strings · Microtonal Ragas",
    image: "/images/instruments/sitar.jpg",
    description:
      "Majestic stringed instrument with a hollowed gourd resonator (tumba), arched curved brass frets, and sympathetic resonance strings (tarabdar) creating ethereal shimmer.",
    curriculumRole: "Introduces advanced students to raga ornamentation, string bending (meend), and microtonality.",
  },
  {
    id: "rubab",
    name: "Folk Rubab",
    urduName: "رباب",
    category: "desi",
    tag: "Eastern Folk",
    soundType: "Plucked Lute · Percussive Attack",
    image: "/images/instruments/rubab.jpg",
    description:
      "Ancient traditional lute chiseled from single-block mulberry wood with a stretched goat-parchment face and intricate mother-of-pearl geometric inlays.",
    curriculumRole: "Connects students with regional Pakistani and Afghan folk traditions, rhythmic picking, and cultural heritage.",
  },
  {
    id: "bansuri",
    name: "Bamboo Bansuri",
    urduName: "بانسری",
    category: "desi",
    tag: "Desi Classical",
    soundType: "Woodwind · Natural Resonance",
    image: "/images/instruments/bansuri.jpg",
    description:
      "Handcrafted bamboo transverse flute with precisely placed fingerholes, bound with silk threading to prevent seasonal wood splitting.",
    curriculumRole: "Develops pulmonary breath control, embouchure precision, and meditative phrasing.",
  },

  // Popular & Western Instruments
  {
    id: "violin",
    name: "Acoustic Violin & Bow",
    urduName: "وائلن",
    category: "popular",
    tag: "Orchestral Strings",
    soundType: "Bowed Strings · Expressive Tone",
    image: "/images/instruments/violin.jpg",
    description:
      "Handcrafted spruce and flamed maple concert violin paired with a genuine horsehair Brazilwood bow. Donated in partnership with Opus 1 Foundation and Hungry for Music USA.",
    curriculumRole: "Core instrument of our classroom orchestra curriculum, building neuroplasticity and emotional resilience.",
  },
  {
    id: "guitar",
    name: "Acoustic Guitar",
    urduName: "گٹار",
    category: "popular",
    tag: "Popular Acoustic",
    soundType: "Fretted Strings · Chordal Harmony",
    image: "/images/instruments/guitar.jpg",
    description:
      "Six-string dreadnought acoustic guitar featuring a solid spruce soundboard, rosewood fretboard, and warm balanced resonance.",
    curriculumRole: "Teaches modern chord progressions, fingerpicking agility, and collaborative ensemble accompaniment.",
  },
  {
    id: "piano",
    name: "Concert Piano & Keyboard",
    urduName: "پیانو",
    category: "popular",
    tag: "Keyboard Classical",
    soundType: "Acoustic Keys · Polyphonic Range",
    image: "/images/instruments/piano.jpg",
    description:
      "Full 88-key weighted acoustic concert piano keyboard. The universal standard for teaching pitch intervals, harmony, and counterpoint.",
    curriculumRole: "Grounds students in universal music theory, sight-reading, and polyphonic compositional fundamentals.",
  },
];

export function MusicalInstrumentsGallery() {
  const [filter, setFilter] = useState<"all" | "desi" | "popular">("all");
  const [activeModal, setActiveModal] = useState<MusicalInstrument | null>(null);

  const filtered = musicalInstruments.filter((inst) => {
    if (filter === "all") return true;
    return inst.category === filter;
  });

  return (
    <section className="relative overflow-hidden bg-sand/30 px-5 py-24 sm:px-8 sm:py-28 border-b border-ink/10">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-clay/30 bg-clay/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-clay">
              <Music className="h-4 w-4" />
              Living Classroom Arsenal
            </div>
            <h2 className="display-md mt-4 text-ink">
              Instruments of the Curriculum: Desi Traditions &amp; Global Classics
            </h2>
            <p className="lede mt-4 text-ink/75">
              From the soulful ragas of the Sitar and Tabla to the symphonic discipline of the Violin and Piano, our music studios integrate heritage South Asian instruments alongside universal Western classics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 rounded-full border border-ink/15 bg-background p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-clay text-primary-foreground shadow-xs"
                  : "text-ink/65 hover:text-ink"
              }`}
            >
              All Instruments ({musicalInstruments.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("desi")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === "desi"
                  ? "bg-clay text-primary-foreground shadow-xs"
                  : "text-ink/65 hover:text-ink"
              }`}
            >
              Desi &amp; Regional (5)
            </button>
            <button
              type="button"
              onClick={() => setFilter("popular")}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === "popular"
                  ? "bg-clay text-primary-foreground shadow-xs"
                  : "text-ink/65 hover:text-ink"
              }`}
            >
              Popular &amp; Orchestral (3)
            </button>
          </div>
        </div>

        {/* Instruments Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((inst) => (
            <div
              key={inst.id}
              onClick={() => setActiveModal(inst)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-xs transition-all duration-300 hover:border-clay/40 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Image Container with Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink border border-ink/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                    <span>{inst.tag}</span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-cream drop-shadow-sm">
                        {inst.name}
                      </h3>
                      {inst.urduName && (
                        <span className="text-xs text-cream/75 font-serif">{inst.urduName}</span>
                      )}
                    </div>
                    <span className="rounded-full bg-cream/20 backdrop-blur-xs p-1.5 text-cream transition-colors group-hover:bg-clay group-hover:text-primary-foreground">
                      <Volume2 className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-clay font-medium uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span>{inst.soundType}</span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink/75 line-clamp-3">
                    {inst.description}
                  </p>
                </div>
              </div>

              {/* Classroom Role Footer */}
              <div className="border-t border-ink/10 bg-sand/30 p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 block">
                  Curriculum Focus:
                </span>
                <p className="mt-1 text-xs text-ink/80 font-medium line-clamp-2">
                  {inst.curriculumRole}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Dialog for Full Detail */}
        {activeModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-xs"
            onClick={() => setActiveModal(null)}
          >
            <div
              className="relative max-w-2xl w-full overflow-hidden rounded-3xl bg-background border border-ink/15 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/10">
                <img
                  src={activeModal.image}
                  alt={activeModal.name}
                  className="h-full w-full object-cover object-center"
                />
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 rounded-full bg-ink/80 text-cream p-2 hover:bg-ink transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="inline-block rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-clay mb-2">
                    {activeModal.tag}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                    {activeModal.name} {activeModal.urduName && `(${activeModal.urduName})`}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-clay">
                    Acoustic Profile: {activeModal.soundType}
                  </span>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink/80">
                    {activeModal.description}
                  </p>
                </div>

                <div className="rounded-xl border border-clay/20 bg-clay/5 p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-clay block">
                    Role in ELF Classroom Curriculum:
                  </span>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink/85">
                    {activeModal.curriculumRole}
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-full bg-ink px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-cream hover:bg-clay hover:text-ink transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
