import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import fallbackPhoto from "@/assets/project-education.jpg";
import { ParallaxImage } from "@/components/site/motion-primitives";

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["school-bag", trackingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("school_bags")
        .select("*")
        .ilike("tracking_id", trackingId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-clay" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-5 text-center">
        <h1 className="display-md max-w-[16ch] text-ink">We couldn't find that bag.</h1>
        <p className="max-w-md text-sm text-ink/60">
          The tracking ID <span className="text-clay">{trackingId}</span> isn't in our records. Check the
          ID on your sponsorship receipt, or contact us and we'll trace it.
        </p>
        <Link
          to="/projects/$slug"
          params={{ slug: "school-bags" }}
          className="inline-flex items-center gap-2 border border-clay px-6 py-3.5 text-xs uppercase tracking-[0.18em] text-clay hover:bg-clay hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back to School Bags
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
        <div className="flex flex-col justify-center px-5 pb-20 pt-36 sm:px-10 lg:pt-40">
          <Link
            to="/projects/$slug"
            params={{ slug: "school-bags" }}
            className="link-underline mb-10 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/50"
          >
            <ArrowLeft className="h-4 w-4" /> School Bags
          </Link>

          <span className="eyebrow">Bag ID</span>
          <h1 className="numeral mt-3 text-[13vw] leading-[0.8] text-ink sm:text-7xl">
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
