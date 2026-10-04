import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Globe, Loader2, Search } from "lucide-react";
import { ParallaxImage } from "@/components/site/motion-primitives";
import { fetchLiveBagDetails } from "@/lib/bag-tracker-service";
import fallbackPhoto from "@/assets/project-education.jpg";

export const Route = createFileRoute("/bag/$trackingId")({
  head: () => ({
    meta: [
      { title: "School bag tracking — Education and Life Foundation" },
      { name: "description", content: "Follow a sponsored ELF school bag from packing to the child who receives it." },
      { property: "og:title", content: "School bag tracking — ELF" },
      { property: "og:description", content: "This isn't a tracking number. It's a real child." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BagDetails,
});

const stages = ["Packed", "In Transit", "Delivered"];

function SchoolInABagBanner() {
  return (
    <aside
      aria-label="Implementing Partnership Announcement"
      className="border-b border-ink/10 bg-sand/65 dark:bg-card/75 py-4 sm:py-5 px-5 sm:px-8"
    >
      <div className="mx-auto max-w-[1600px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-clay/20 bg-background/80 dark:bg-background/90 p-2 shadow-xs">
            <img
              src="/school-in-a-bag-logo-red.png"
              alt="School in a Bag"
              className="h-full w-full object-contain drop-shadow-xs"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center rounded-full bg-clay/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-clay">
                On-Ground Implementing Partner
              </span>
              <span className="text-[0.65rem] text-ink/40 hidden sm:inline">•</span>
              <span className="text-[0.68rem] font-medium text-ink/60 hidden sm:inline">
                UK Registered Charity No. 1186311
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-ink/80 max-w-4xl">
              <span className="font-semibold text-ink">School In A Bag</span> is a charity registered in England and Wales that delivers rucksacks filled with stationery, learning resources, eating utensils and a hygiene kit to disadvantaged, disaster-affected and displaced children globally. <span className="font-semibold text-ink">Education and Life Foundation</span> is the on ground project implementing partner of School In A Bag organization.
            </p>
          </div>
        </div>
        <Link
          to="/projects/$slug"
          params={{ slug: "school-bags" }}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-clay/40 bg-clay/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-clay hover:bg-clay hover:text-cream transition-all self-start md:self-center"
        >
          <span>School Bags Project</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  );
}

function BagDetails() {
  const { trackingId } = Route.useParams();
  const navigate = useNavigate();
  const [showQuickTrack, setShowQuickTrack] = useState(false);
  const [anotherId, setAnotherId] = useState("");
  const [quickTrackError, setQuickTrackError] = useState<string | null>(null);

  const [showErrorTrackForm, setShowErrorTrackForm] = useState(false);
  const [errorTrackId, setErrorTrackId] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["school-bag", trackingId],
    queryFn: async () => {
      return await fetchLiveBagDetails({ data: trackingId });
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleTrackAnother = (e: React.FormEvent) => {
    e.preventDefault();
    const id = anotherId.trim();
    if (!id) {
      setQuickTrackError("Please enter a valid bag ID.");
      return;
    }
    setQuickTrackError(null);
    setShowQuickTrack(false);
    setAnotherId("");
    navigate({ to: "/bag/$trackingId", params: { trackingId: id } });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-clay" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-ink">
        <SchoolInABagBanner />
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-clay/10 p-3.5 shadow-inner">
            <img
              src="/school-in-a-bag-logo-red.png"
              alt="School in a Bag"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="display-md max-w-[16ch] text-ink">We couldn't find that bag.</h1>
          <p className="max-w-md text-sm leading-relaxed text-ink/65">
            The tracking ID <span className="font-bold text-clay">{trackingId}</span> isn't in our live records.
            Check the number on your sponsorship receipt, or try tracking another bag.
          </p>

          {/* Immediate-attention buttons in error state */}
          <div className="mt-2 flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowErrorTrackForm((prev) => !prev)}
              className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-clay px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-xs transition-all hover:bg-clay-deep active:scale-[0.98] cursor-pointer"
            >
              <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Track Another Bag</span>
            </button>
            <Link
              to="/"
              className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream shadow-xs transition-all hover:bg-ink/85 active:scale-[0.98] cursor-pointer"
            >
              <Globe className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>Back to Website</span>
            </Link>
          </div>

          {showErrorTrackForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const id = errorTrackId.trim();
                if (id) {
                  navigate({ to: "/bag/$trackingId", params: { trackingId: id } });
                }
              }}
              className="w-full max-w-md rounded-2xl border border-ink/15 bg-sand/70 p-5 text-left shadow-xs"
            >
              <label
                htmlFor="error-track-input"
                className="block text-[0.66rem] font-bold uppercase tracking-[0.18em] text-ink/60"
              >
                Enter Bag ID
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="error-track-input"
                  type="text"
                  value={errorTrackId}
                  onChange={(e) => setErrorTrackId(e.target.value)}
                  placeholder="e.g. 143492 or ELF-2026-0001"
                  autoFocus
                  className="flex-1 rounded-xl border border-ink/20 bg-background px-3.5 py-2.5 text-sm text-ink focus:border-clay focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-clay px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-clay-deep transition-colors shadow-xs cursor-pointer"
                >
                  Track
                </button>
              </div>
            </form>
          )}

          <Link
            to="/projects/$slug"
            params={{ slug: "school-bags" }}
            className="link-underline mt-4 text-xs uppercase tracking-[0.18em] text-ink/50"
          >
            Return to School Bag Distribution Program →
          </Link>
        </div>
      </div>
    );
  }

  const stageIndex = Math.max(stages.indexOf(data.status), 0);

  const facts: [string, string | null][] = [
    ["Destination", data.destination],
    ["School", data.school],
    ["Class", data.class_name],
    ["Student", data.student_name],
    ["Funded by", data.funded_by],
    ["Packed by", data.packed_by],
  ];

  return (
    <article className="bg-background text-ink">
      <SchoolInABagBanner />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* information side */}
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 sm:py-20">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-sand/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/75 transition-all hover:border-ink hover:bg-ink hover:text-cream"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Website</span>
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: "school-bags" }}
              className="link-underline text-xs uppercase tracking-[0.18em] text-ink/50"
            >
              School Bags Project →
            </Link>
          </div>

          <span className="eyebrow">Bag ID</span>
          <h1 className="numeral mt-3 text-[10vw] leading-[0.85] text-ink sm:text-5xl">
            {data.tracking_id}
          </h1>

          {/* status as a journey, not a card */}
          <div className="mt-12">
            <div className="flex items-center">
              {stages.map((s, i) => (
                <div key={s} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${i <= stageIndex ? "bg-clay" : "bg-ink/20"}`}
                    />
                    <span
                      className={`text-[0.65rem] uppercase tracking-[0.16em] ${
                        i <= stageIndex ? "text-ink" : "text-ink/40"
                      }`}
                    >
                      {s}
                    </span>
                  </div>
                  {i < stages.length - 1 && (
                    <span
                      className={`mx-3 mb-6 h-px flex-1 ${i < stageIndex ? "bg-clay" : "bg-ink/15"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <dl className="mt-14">
            {facts.map(([label, value]) =>
              value ? (
                <div
                  key={label}
                  className="grid grid-cols-1 sm:grid-cols-[8.5rem_1fr] items-baseline gap-1.5 sm:gap-4 border-t border-ink/10 py-4 sm:py-5"
                >
                  <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-ink/45">{label}</dt>
                  <dd className="font-display text-lg sm:text-xl font-bold leading-tight tracking-tight text-ink">
                    {value}
                  </dd>
                </div>
              ) : null,
            )}
            {(data.dispatched_on || data.delivered_on) && (
              <div className="grid grid-cols-1 sm:grid-cols-[8.5rem_1fr] items-baseline gap-1.5 sm:gap-4 border-y border-ink/10 py-4 sm:py-5">
                <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-ink/45">Dates</dt>
                <dd className="text-sm text-ink/70">
                  {data.dispatched_on && <>Dispatched {data.dispatched_on}. </>}
                  {data.delivered_on && <>Delivered {data.delivered_on}.</>}
                </dd>
              </div>
            )}
          </dl>

          {/* ── High Attention Action Buttons ── */}
          <div className="mt-12 overflow-hidden rounded-2xl border-2 border-clay/30 bg-sand/90 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay/10 p-2">
                <img
                  src="/school-in-a-bag-logo-red.png"
                  alt="School in a Bag"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="eyebrow text-clay">Track & Explore</span>
                <h3 className="font-display text-xl font-bold text-ink">
                  Where would you like to go next?
                </h3>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Track another sponsored bag using its receipt number, or return to explore the Education and Life Foundation website.
            </p>

            {/* The two immediate attention buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => setShowQuickTrack((prev) => !prev)}
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-clay px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-xs hover:bg-clay-deep transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Track Another Bag</span>
              </button>

              <Link
                to="/"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream shadow-xs hover:bg-ink/85 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Globe className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Back to Website</span>
              </Link>
            </div>

            {/* Quick Track Input form */}
            {showQuickTrack && (
              <form onSubmit={handleTrackAnother} className="mt-6 border-t border-ink/10 pt-5">
                <label
                  htmlFor="another-bag-id"
                  className="block text-[0.68rem] uppercase tracking-[0.2em] text-ink/60 font-semibold"
                >
                  Enter Another Bag ID
                </label>
                <div className="mt-2 flex flex-col sm:flex-row gap-2">
                  <input
                    id="another-bag-id"
                    type="text"
                    value={anotherId}
                    onChange={(e) => {
                      setAnotherId(e.target.value);
                      setQuickTrackError(null);
                    }}
                    placeholder="e.g. 193444 or ELF-2026-0001"
                    autoFocus
                    className="flex-1 rounded-xl border border-ink/20 bg-background px-4 py-3 font-display text-base text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-clay px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground hover:bg-clay-deep transition-colors shadow-xs cursor-pointer"
                  >
                    Track Now
                  </button>
                </div>
                {quickTrackError && (
                  <p className="mt-2 text-xs text-destructive font-medium">{quickTrackError}</p>
                )}
                <div className="mt-3 flex items-center justify-between text-xs text-ink/50">
                  <span>Try: 143492 or ELF-2026-0001</span>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: "school-bags" }}
                    className="link-underline text-clay font-medium"
                  >
                    View School Bags Program →
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* visual side */}
        <div className="relative min-h-[70svh] lg:min-h-screen">
          <ParallaxImage
            src={data.photo_url ?? fallbackPhoto}
            alt={
              data.student_name
                ? `${data.student_name} with the school bag delivered by ELF`
                : "A student with an ELF school bag"
            }
            className="absolute inset-0"
            strength={50}
            scaleFrom={1.12}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
            <p className="font-serif text-3xl italic leading-tight !text-cream drop-shadow-md sm:text-5xl">
              This isn't a tracking number.
              <br />
              It's {data.student_name ?? "a real child"}.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
