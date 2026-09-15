import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Globe, Loader2, Search } from "lucide-react";
import fallbackPhoto from "@/assets/project-education.jpg";
import { ParallaxImage } from "@/components/site/motion-primitives";
import { fetchLiveBagDetails } from "@/lib/bag-tracker-service";

export const Route = createFileRoute("/bag/$trackingId")({
  head: () => ({
    meta: [
      { title: "School bag tracking — Education and Life Foundation" },
      { name: "description", content: "Follow a sponsored EFL school bag from packing to the child who receives it." },
      { property: "og:title", content: "School bag tracking — EFL" },
      { property: "og:description", content: "This isn't a tracking number. It's a real child." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BagDetails,
});

const stages = ["Packed", "In Transit", "Delivered"];

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
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-clay/10 p-3.5 shadow-inner">
          <img
            src="/school-in-a-bag-logo-blue.png"
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
            className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-sm bg-clay px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg transition-all hover:bg-clay-deep hover:shadow-clay/25 active:scale-[0.98]"
          >
            <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>Track Another Bag</span>
          </button>
          <Link
            to="/"
            className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-sm bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream shadow-md transition-all hover:bg-ink/85 active:scale-[0.98]"
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
            className="w-full max-w-md rounded-sm border border-ink/15 bg-sand/70 p-4 text-left shadow-sm"
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
                placeholder="e.g. 143492 or EFL-2026-0001"
                autoFocus
                className="flex-1 rounded-sm border border-ink/20 bg-background px-3.5 py-2.5 text-sm text-ink focus:border-clay focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-sm bg-clay px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-clay-deep transition-colors"
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
                  className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-t border-ink/10 py-5"
                >
                  <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-ink/45">{label}</dt>
                  <dd className="font-display text-xl font-bold leading-tight tracking-tight text-ink">
                    {value}
                  </dd>
                </div>
              ) : null,
            )}
            {(data.dispatched_on || data.delivered_on) && (
              <div className="grid grid-cols-[9rem_1fr] items-baseline gap-4 border-y border-ink/10 py-5">
                <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-ink/45">Dates</dt>
                <dd className="text-sm text-ink/70">
                  {data.dispatched_on && <>Dispatched {data.dispatched_on}. </>}
                  {data.delivered_on && <>Delivered {data.delivered_on}.</>}
                </dd>
              </div>
            )}
          </dl>

          {/* ── High Attention Action Buttons ── */}
          <div className="mt-12 overflow-hidden rounded-sm border-2 border-clay/30 bg-sand/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay/10 p-2">
                <img
                  src="/school-in-a-bag-logo-blue.png"
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
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-sm bg-clay px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg hover:bg-clay-deep hover:shadow-clay/30 transition-all duration-200 active:scale-[0.98]"
              >
                <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span>Track Another Bag</span>
              </button>

              <Link
                to="/"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-sm bg-ink px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-cream shadow-md hover:bg-ink/85 transition-all duration-200 active:scale-[0.98]"
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
                    placeholder="e.g. 193444 or EFL-2026-0001"
                    autoFocus
                    className="flex-1 rounded-sm border border-ink/20 bg-background px-4 py-3 font-display text-base text-ink placeholder:text-ink/30 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground hover:bg-clay-deep transition-colors"
                  >
                    Track Now
                  </button>
                </div>
                {quickTrackError && (
                  <p className="mt-2 text-xs text-destructive font-medium">{quickTrackError}</p>
                )}
                <div className="mt-3 flex items-center justify-between text-xs text-ink/50">
                  <span>Try: 143492 or EFL-2026-0001</span>
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
                ? `${data.student_name} with the school bag delivered by EFL`
                : "A student with an EFL school bag"
            }
            className="absolute inset-0"
            strength={50}
            scaleFrom={1.12}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
            <p className="font-serif text-3xl italic leading-tight text-cream sm:text-5xl">
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
