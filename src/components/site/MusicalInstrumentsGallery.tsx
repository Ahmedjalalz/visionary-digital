export const instrumentImages = [
  { id: "tabla", src: "/images/instruments/tabla.jpg", alt: "Tabla & Bayan" },
  { id: "harmonium", src: "/images/instruments/harmonium.jpg", alt: "Harmonium" },
  { id: "sitar", src: "/images/instruments/sitar.jpg", alt: "Classical Sitar" },
  { id: "rubab", src: "/images/instruments/rubab.jpg", alt: "Folk Rubab" },
  { id: "bansuri", src: "/images/instruments/bansuri.jpg", alt: "Bamboo Bansuri" },
  { id: "violin", src: "/images/instruments/violin.jpg", alt: "Acoustic Violin" },
  { id: "guitar", src: "/images/instruments/guitar.jpg", alt: "Acoustic Guitar" },
  { id: "piano", src: "/images/instruments/piano.jpg", alt: "Concert Piano" },
];

export function MusicalInstrumentsGallery() {
  return (
    <section className="relative overflow-hidden bg-sand/30 px-5 py-16 sm:px-8 sm:py-20 border-b border-ink/10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow text-clay">Curriculum Instruments</span>
          <h2 className="display-md mt-2 text-ink">Musical Instruments</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {instrumentImages.map((inst) => (
            <div
              key={inst.id}
              className="group aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 shadow-xs"
            >
              <img
                src={inst.src}
                alt={inst.alt}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
