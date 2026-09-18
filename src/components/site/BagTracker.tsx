import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { fetchLiveBagDetails } from "@/lib/bag-tracker-service";

export function BagTracker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = value.trim();
    if (!id) {
      setError("Enter the tracking ID printed on your sponsorship receipt.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const data = await fetchLiveBagDetails({ data: id });
      setLoading(false);

      if (!data) {
        setError(`No bag found for “${id}”. Check the ID and try again.`);
        return;
      }

      setOpen(false);
      navigate({ to: "/bag/$trackingId", params: { trackingId: data.tracking_id } });
    } catch (err) {
      setLoading(false);
      setError("We couldn't reach the tracking service. Please try again.");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 py-4">
        <button
          onClick={() => setOpen(true)}
          className="group relative flex flex-col items-center gap-4"
          aria-label="Track a school bag"
        >
          <span className="relative flex h-44 w-44 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-clay/15 blur-2xl transition-all duration-500 group-hover:bg-clay/30 group-hover:scale-110" />
            <span className="pulse-ring absolute inset-5 rounded-full border border-clay/40" />
            <span className="relative flex h-28 w-28 items-center justify-center">
              <img
                src="/school-in-a-bag-logo-red.png"
                alt="School in a Bag"
                className="float-slow h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_8px_20px_rgba(179,40,36,0.24)]"
              />
            </span>
          </span>
          <span className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-clay">
            Track the bag
          </span>
          <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" /> Tap to open
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/45 px-5 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Track a school bag"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-ink/15 bg-sand/95 p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-5 top-5 text-ink/50 transition-colors hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/10 p-2">
                <img
                  src="/school-in-a-bag-logo-red.png"
                  alt="School in a Bag"
                  className="h-full w-full object-contain drop-shadow-xs"
                />
              </div>
               <h2 className="mt-5 font-display text-3xl font-bold text-ink">
                Track a school bag
              </h2>
               <p className="mt-2 text-sm text-ink/60">
                Every sponsored bag carries an ID from the moment it is packed.
              </p>

              <form onSubmit={submit} className="mt-7">
                <label
                  htmlFor="tracking-id"
                   className="block text-[0.68rem] uppercase tracking-[0.2em] text-ink/50"
                >
                  Enter tracking ID
                </label>
                <input
                  id="tracking-id"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError(null);
                  }}
                  placeholder="EFL-2026-0001"
                  autoComplete="off"
                  aria-invalid={!!error}
                  aria-describedby={error ? "tracking-error" : undefined}
                   className="mt-3 w-full border-b border-ink/25 bg-transparent pb-3 font-display text-2xl text-ink placeholder:text-ink/25 focus:border-clay focus:outline-none"
                />
                {error && (
                  <p id="tracking-error" role="alert" className="mt-3 text-sm text-destructive">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                   className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-clay-deep disabled:opacity-60 shadow-xs cursor-pointer"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Looking up" : "Find this bag"}
                </button>
                 <p className="mt-4 text-center text-xs text-ink/40">
                  Try EFL-2026-0001 to see a delivered bag.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
