import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { projects } from "@/data/projects";
import { MaskLines, ParallaxImage } from "@/components/site/motion-primitives";
import heroImg from "@/assets/project-education.jpg";

type DonateSearch = { project?: string };

export const Route = createFileRoute("/donate")({
  validateSearch: (search: Record<string, unknown>): DonateSearch => ({
    project: typeof search.project === "string" ? search.project : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Support the work — Education and Life Foundation" },
      {
        name: "description",
        content: "Fund school fees, medical camps, safe water and widow support. Give once or monthly.",
      },
      { property: "og:title", content: "Support EFL" },
      { property: "og:description", content: "Every pledge is tied to a programme and a place." },
    ],
  }),
  component: Donate;
});

const amounts = [25, 50, 100, 250];
const impact: Record<number, string> = {
  25: "A school bag, packed and tracked to a named child.",
  50: "A month of books, uniform and stationery for one student.",
  100: "Medicine for a rural medical camp morning.",
  250: "A widow-headed household supported for a full month.",
};

function Donate() {
  const { project: preset } = Route.useSearch();
  const [amount, setAmount] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [projectSlug, setProjectSlug] = useState(preset ?? "");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const value = amount ?? Number(custom || 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value || value <= 0) return;
    const fd = new FormData(e.currentTarget);
    setSending(true);
    const { error } = await supabase.from("donation_pledges").insert({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? "") || null,
      message: String(fd.get("message") ?? "") || null,
      amount: value,
      currency: "USD",
      is_monthly: monthly,
      project_slug: projectSlug || null,
    });
    setSending(false);
    if (error) {
      alert("We couldn't record your pledge. Please try again.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <section className="flex min-h-screen items-center bg-ink px-5 sm:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Check className="h-10 w-10 text-clay" strokeWidth={1.3} />
          <h1 className="display-lg mt-6 max-w-[14ch] text-cream">Thank you. Genuinely.</h1>
          <p className="lede mt-6 max-w-xl">
            Your pledge of ${value} {monthly ? "per month " : ""}is recorded. A member of the team will
            email you the transfer details and, once it clears, tell you exactly where it went.
          </p>
          <Link
            to="/projects"
            className="mt-10 inline-block border border-cream/30 px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-cream hover:border-cream"
          >
            See the programmes
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative h-[70svh] min-h-[440px] overflow-hidden">
        <ParallaxImage src={heroImg} alt="A classroom of students in Punjab" className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 mx-auto flex max-w-[1600px] items-end px-5 pb-14 sm:px-8">
          <h1 className="display-xl max-w-[12ch] text-cream">
            <MaskLines lines={["Money here", "becomes a", "morning."]} />
          </h1>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 sm:px-8">
        <form onSubmit={submit} className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="eyebrow">Choose an amount — USD</span>
            <div className="mt-6 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => {
                    setAmount(a);
                    setCustom("");
                  }}
                  aria-pressed={amount === a}
                  className={`p-6 text-left transition-colors ${
                    amount === a ? "bg-clay text-ink" : "bg-ink text-cream hover:bg-secondary"
                  }`}
                >
                  <span className="numeral text-4xl">${a}</span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <label htmlFor="custom" className="block text-[0.66rem] uppercase tracking-[0.2em] text-cream/45">
                Or another amount
              </label>
              <input
                id="custom"
                inputMode="numeric"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value.replace(/[^0-9]/g, ""));
                  setAmount(null);
                }}
                placeholder="0"
                className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 font-display text-3xl text-cream placeholder:text-cream/20 focus:border-clay focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setMonthly(!monthly)}
              aria-pressed={monthly}
              className={`mt-8 inline-flex items-center gap-3 border px-5 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
                monthly ? "border-clay text-clay" : "border-white/20 text-cream/70"
              }`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${monthly ? "bg-clay" : "bg-cream/25"}`} />
              Give monthly
            </button>

            {amount && (
              <p className="mt-10 max-w-md font-serif text-2xl italic leading-snug text-cream/85">
                {impact[amount]}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div>
              <label htmlFor="project" className="block text-[0.66rem] uppercase tracking-[0.2em] text-cream/45">
                Direct it to
              </label>
              <select
                id="project"
                value={projectSlug}
                onChange={(e) => setProjectSlug(e.target.value)}
                className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-lg text-cream focus:border-clay focus:outline-none"
              >
                <option value="" className="bg-ink">
                  Wherever it's needed most
                </option>
                {projects.map((p) => (
                  <option key={p.slug} value={p.slug} className="bg-ink">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 grid gap-8">
              <DonorField label="Your name" name="name" required />
              <DonorField label="Email" name="email" type="email" required />
              <DonorField label="Phone (optional)" name="phone" />
              <div>
                <label htmlFor="message" className="block text-[0.66rem] uppercase tracking-[0.2em] text-cream/45">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="mt-3 w-full resize-none border-b border-white/20 bg-transparent pb-3 text-lg text-cream focus:border-clay focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending || !value}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-cream disabled:opacity-40"
            >
              {sending && <Loader2 className="h-4 w-4 animate-spin" />}
              Pledge ${value || 0}
              {monthly ? " / month" : ""}
            </button>
            <p className="mt-4 text-xs leading-relaxed text-cream/40">
              This records a pledge — no card is charged here. The team emails transfer details and a
              receipt.
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

function DonorField({
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
      <label htmlFor={name} className="block text-[0.66rem] uppercase tracking-[0.2em] text-cream/45">
        {label}
        {required && <span className="text-clay"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-lg text-cream focus:border-clay focus:outline-none"
      />
    </div>
  );
}
