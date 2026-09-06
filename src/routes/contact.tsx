import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { branches } from "@/components/site/SiteFooter";
import { MapEmbed } from "@/components/site/MapEmbed";
import { MaskLines } from "@/components/site/motion-primitives";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Education and Life Foundation" },
      {
        name: "description",
        content:
          "Reach EFL in Lahore, Auckland, Toronto or Berlin. Address, phone, email and a direct message form.",
      },
      { property: "og:title", content: "Contact EFL" },
      { property: "og:description", content: "Four locations, one foundation. Write, call or visit." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [active, setActive] = useState(0);
  const [sending, setSending] = useState(false);
  const branch = branches[active]!;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    setSending(false);
    if (error) {
      toast.error("Your message didn't send. Please try again.");
      return;
    }
    toast.success("Message received. We'll be in touch.");
    form.reset();
  }

  return (
    <>
      {/* geographic opening */}
       <section className="relative bg-sand px-5 pb-10 pt-40 sm:px-8 sm:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow">Four places, one foundation</span>
           <h1 className="display-lg mt-6 max-w-[13ch] text-ink">
            <MaskLines lines={["Lahore. Auckland.", "Toronto. Berlin."]} />
          </h1>
        </div>
      </section>

      {/* branch switcher over a live map */}
      <section className="relative">
        <div className="relative h-[70svh] min-h-[460px]">
          <MapEmbed
            key={branch.query}
            query={branch.query}
            title={`Map showing EFL presence in ${branch.city}`}
            className="absolute inset-0"
            zoom={branch.country === "Pakistan" ? 15 : 11}
          />
        </div>

        <div className="mx-auto -mt-24 max-w-[1600px] px-5 sm:px-8">
           <div className="grid gap-px border border-ink/10 bg-ink/10 shadow-lg shadow-clay/5 md:grid-cols-4">
            {branches.map((b, i) => {
              const isActive = i === active;
              return (
                <button
                  key={b.country}
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  className={`p-7 text-left transition-colors ${
                     isActive ? "bg-clay text-primary-foreground" : "bg-background text-ink hover:bg-secondary"
                  }`}
                >
                  <div className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] opacity-70">
                    {b.country}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold tracking-tight">{b.city}</div>
                  <div className="mt-3 text-sm leading-snug opacity-75">{b.address}</div>
                  {b.phone && <div className="mt-3 text-sm opacity-90">{b.phone}</div>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* write to us */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
           <h2 className="display-md max-w-[14ch] text-ink">We would love to hear from you.</h2>
            <div className="mt-10 space-y-5 text-sm">
              <div>
                 <div className="text-[0.66rem] uppercase tracking-[0.2em] text-ink/45">Email</div>
                <a
                  href="mailto:info@educationandlifefoundation.org"
                   className="link-underline mt-1 inline-block break-all text-ink"
                >
                  info@educationandlifefoundation.org
                </a>
              </div>
              <div>
                 <div className="text-[0.66rem] uppercase tracking-[0.2em] text-ink/45">Phone</div>
                 <a href="tel:+923009475513" className="link-underline mt-1 inline-block text-ink">
                  +92 300 9475513
                </a>
              </div>
              <div>
                 <div className="text-[0.66rem] uppercase tracking-[0.2em] text-ink/45">Head office</div>
                 <p className="mt-1 max-w-xs text-ink/75">
                  181 Raza Block, Allama Iqbal Town, Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Your email" name="email" type="email" required />
            </div>
            <div className="mt-8">
              <Field label="Subject" name="subject" />
            </div>
            <div className="mt-8">
               <label htmlFor="message" className="block text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                 className="mt-3 w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-lg text-ink placeholder:text-ink/25 focus:border-clay focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
               className="mt-10 inline-flex items-center gap-2 bg-clay px-8 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-clay-deep disabled:opacity-60"
            >
              {sending && <Loader2 className="h-4 w-4 animate-spin" />}
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
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
         className="mt-3 w-full border-b border-ink/20 bg-transparent pb-3 text-lg text-ink placeholder:text-ink/25 focus:border-clay focus:outline-none"
      />
    </div>
  );
}
