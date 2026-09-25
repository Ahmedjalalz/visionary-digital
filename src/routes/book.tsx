import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MaskLines } from "@/components/site/motion-primitives";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a meeting — Education and Life Foundation" },
      {
        name: "description",
        content:
          "Choose a date and time to speak with the ELF team about partnerships, sponsorship or volunteering.",
      },
      { property: "og:title", content: "Book a meeting with ELF" },
      { property: "og:description", content: "Pick a date, pick a time, tell us how to reach you." },
    ],
  }),
  component: Book,
});

const platforms = ["Google Meet", "Zoom", "Phone call", "WhatsApp", "In person — Lahore"];

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Book() {
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string>(platforms[0]!);
  const [sending, setSending] = useState(false);
  const [confirmed, setConfirmed] = useState<{ date: string; time: string; platform: string } | null>(
    null,
  );

  const { data: availability } = useQuery({
    queryKey: ["availability"],
    queryFn: async () => {
      const [avail, blocked] = await Promise.all([
        supabase.from("appointment_availability").select("weekday, slots, is_active"),
        supabase.from("appointment_blocked_dates").select("blocked_on"),
      ]);
      if (avail.error) throw avail.error;
      return {
        weekdays: avail.data ?? [],
        blocked: new Set((blocked.data ?? []).map((b) => b.blocked_on)),
      };
    },
  });

  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Monday-first
    const today = toISO(new Date());
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: total }, (_, i) => {
        const d = new Date(month.getFullYear(), month.getMonth(), i + 1);
        const iso = toISO(d);
        const row = availability?.weekdays.find((w) => w.weekday === d.getDay());
        const open =
          !!row?.is_active &&
          (row?.slots?.length ?? 0) > 0 &&
          !availability?.blocked.has(iso) &&
          iso >= today;
        return { iso, day: i + 1, open, weekday: d.getDay() };
      }),
    ];
  }, [month, availability]);

  const slots = useMemo(() => {
    if (!date || !availability) return [];
    const wd = new Date(`${date}T00:00:00`).getDay();
    return availability.weekdays.find((w) => w.weekday === wd)?.slots ?? [];
  }, [date, availability]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!date || !time) return;
    const fd = new FormData(e.currentTarget);
    setSending(true);
    const { error } = await supabase.from("appointments").insert({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || null,
      purpose: String(fd.get("purpose") ?? "") || null,
      platform,
      meeting_date: date,
      meeting_time: time,
    });
    setSending(false);
    if (error) {
      setConfirmed(null);
      alert("We couldn't save your booking. Please try again or email us directly.");
      return;
    }
    setConfirmed({ date, time, platform });
  }

  const monthLabel = month.toLocaleString("en-GB", { month: "long", year: "numeric" });

  return (
    <>
      <section className="bg-sand px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Book a meeting</span>
          <h1 className="display-lg mt-4 max-w-[14ch] text-ink">
            <MaskLines lines={["Thirty minutes,", "properly spent."]} />
          </h1>
          <p className="lede mt-6 max-w-2xl text-ink/75">
            Partnerships, sponsorship, volunteering or a question about a programme — pick a slot and we
            will meet you there.
          </p>
        </div>
      </section>

      <section className="bg-background px-5 pb-24 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
        <div className="mx-auto max-w-[1600px]">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-ink/10 pt-16"
              >
                <Check className="h-10 w-10 text-clay" strokeWidth={1.3} />
                <h2 className="display-md mt-6 max-w-[16ch] text-ink">Your meeting is booked.</h2>
                <dl className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                  {[
                    ["Date", new Date(`${confirmed.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })],
                    ["Time", `${confirmed.time} PKT`],
                    ["Platform", confirmed.platform],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl border border-ink/10 bg-sand/30 p-6 shadow-xs">
                      <dt className="text-[0.66rem] uppercase tracking-[0.2em] text-ink/45">{k}</dt>
                      <dd className="mt-2 font-display text-xl font-bold tracking-tight text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-8 max-w-xl text-sm text-ink/60">
                  The team has your request and will send joining details to the email address you gave.
                  Need to change it? Write to info@educationandlifefoundation.org.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }} className="grid gap-14 lg:grid-cols-12">
                {/* calendar */}
                <div className="lg:col-span-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold tracking-tight text-ink">
                      {monthLabel}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                        aria-label="Previous month"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink/70 hover:border-clay hover:text-clay cursor-pointer shadow-2xs transition-colors"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                        aria-label="Next month"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink/70 hover:border-clay hover:text-clay cursor-pointer shadow-2xs transition-colors"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-7 gap-1 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i} className="pb-2 text-[0.6rem] uppercase tracking-[0.16em] text-ink/40">
                        {d}
                      </span>
                    ))}
                    {days.map((d, i) =>
                      d === null ? (
                        <span key={`e${i}`} />
                      ) : (
                        <button
                          key={d.iso}
                          disabled={!d.open}
                          onClick={() => {
                            setDate(d.iso);
                            setTime(null);
                          }}
                          aria-pressed={date === d.iso}
                          className={`aspect-square rounded-full text-sm transition-all flex items-center justify-center ${
                            date === d.iso
                              ? "bg-clay font-bold text-primary-foreground shadow-xs"
                              : d.open
                                ? "text-ink hover:bg-clay/15 hover:text-clay font-medium"
                                : "text-ink/20 cursor-not-allowed"
                          }`}
                        >
                          {d.day}
                        </button>
                      ),
                    )}
                  </div>

                  {date && (
                    <div className="mt-10">
                      <span className="eyebrow">Available times — PKT</span>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {slots.map((s) => (
                          <button
                            key={s}
                            onClick={() => setTime(s)}
                            aria-pressed={time === s}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              time === s
                                ? "border-clay bg-clay text-primary-foreground shadow-xs"
                                : "border-ink/15 bg-background text-ink/75 hover:border-ink hover:text-ink"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                        {slots.length === 0 && (
                          <p className="text-sm text-ink/50">No times left on this date.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* details */}
                <form onSubmit={submit} className="lg:col-span-6 lg:col-start-7">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <BookField label="Your name" name="name" required />
                    <BookField label="Email" name="email" type="email" required />
                    <BookField label="Phone (optional)" name="phone" />
                    <div>
                      <label
                        htmlFor="platform"
                        className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55"
                      >
                        Platform
                      </label>
                      <select
                        id="platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="mt-3 w-full border-b border-ink/20 bg-transparent pb-3 text-lg text-ink focus:border-clay focus:outline-none"
                      >
                        {platforms.map((p) => (
                          <option key={p} value={p} className="bg-background text-ink">
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <label
                      htmlFor="purpose"
                      className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55"
                    >
                      What would you like to discuss?
                    </label>
                    <textarea
                      id="purpose"
                      name="purpose"
                      rows={4}
                      className="mt-3 w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-lg text-ink focus:border-clay focus:outline-none"
                    />
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      disabled={!date || !time || sending}
                      className="inline-flex items-center gap-2 rounded-full bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-clay-deep disabled:cursor-not-allowed disabled:opacity-40 shadow-xs cursor-pointer"
                    >
                      {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                      Confirm booking
                    </button>
                    <p className="text-sm text-ink/50">
                      {date && time
                        ? `${new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long" })} at ${time}`
                        : "Choose a date and time first."}
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function BookField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
        {label}
        {required && <span className="text-clay"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-ink/20 bg-transparent pb-3 text-lg text-ink focus:border-clay focus:outline-none"
      />
    </div>
  );
}
