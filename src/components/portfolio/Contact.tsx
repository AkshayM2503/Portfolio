import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { AlertCircle, CheckCircle2, Copy, Github, Linkedin, Loader2, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { portfolio } from "@/data/portfolio";
import { emailjsConfig, isEmailjsConfigured } from "@/lib/emailjs-config";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  subject: z.string().trim().min(3, "Add a short subject").max(120),
  message: z.string().trim().min(10, "Add a bit more detail").max(1200),
});

const SETTLE_MS = 3000;

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const configured = isEmailjsConfigured();

  const onCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy it manually.");
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[issue.path[0] as string] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setSubmitting(true);

    try {
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: parsed.data.name,
          reply_to: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
        },
        { publicKey: emailjsConfig.publicKey },
      );
      if (result.status !== 200) throw new Error(`EmailJS responded with status ${result.status}`);
      setSent(true);
      setSubmitting(false);
      toast.success("Message sent", { description: "Thanks for reaching out — I'll reply soon!" });
      e.currentTarget.reset();
      setTimeout(() => setSent(false), SETTLE_MS);
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setSubmitting(false);
      setSubmitError(
        "Your message couldn't be sent right now. Please try again in a moment, or reach me directly by email.",
      );
    }
  };

  const socials = [
    { icon: Mail, label: "Email", value: portfolio.email, href: `mailto:${portfolio.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "akshay-m", href: portfolio.linkedin },
    { icon: Github, label: "GitHub", value: "AkshayM2503", href: portfolio.github },
    { icon: MapPin, label: "Location", value: portfolio.location, href: null },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Let's build something <span className="text-gradient">together</span>.</>}
      subtitle="Interested in Data Analyst and Business Intelligence opportunities."
    >
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <Reveal direction="left">
          {!configured ? (
            <SetupNotice />
          ) : (
            <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 sm:p-8" noValidate>
              {sent && <SuccessBanner />}
              {submitError && <ErrorBanner message={submitError} />}
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" type="text" error={errors.name} placeholder="Your full name" />
                <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@example.com" />
              </div>
              <Field label="Subject" name="subject" type="text" error={errors.subject} placeholder="What's this about?" />
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.8)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal direction="right">
          <ul className="grid gap-3">
            {socials.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-primary/40">
                  <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-white/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                    <div className="truncate text-sm font-medium">{value}</div>
                  </div>
                  {label === "Email" && (
                    <button
                      type="button"
                      onClick={onCopyEmail}
                      aria-label="Copy email address to clipboard"
                      className="ml-auto rounded-md border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                    >
                      {copied ? (
                        <CheckCircle2 className="size-4 text-primary" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  )}
                </div>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function SetupNotice() {
  return (
    <div className="glass rounded-3xl border-amber-400/30 p-6 sm:p-8" role="note">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-white/10">
          <AlertCircle className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-medium">Contact form is being set up</h3>
          <p className="text-xs text-muted-foreground">Direct messaging will be available here shortly.</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        In the meantime, the fastest way to reach me is by email at{" "}
        <a
          href={`mailto:${portfolio.email}`}
          className="text-primary underline-offset-4 transition-colors hover:underline"
        >
          {portfolio.email}
        </a>{" "}
        or through{" "}
        <a
          href={portfolio.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 transition-colors hover:underline"
        >
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}

function SuccessBanner() {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
    >
      <CheckCircle2 className="size-5 shrink-0" />
      <p>Message sent successfully. Thanks for reaching out!</p>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
