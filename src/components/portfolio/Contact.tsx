import { useState, type FormEvent } from "react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { portfolio } from "@/data/portfolio";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  message: z.string().trim().min(10, "Add a bit more detail").max(1200),
});

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setSubmitting(true);
    const { name, email, message } = parsed.data;
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your mail app…", { description: "Thanks for reaching out!" });
    setTimeout(() => setSubmitting(false), 800);
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
          <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 sm:p-8" noValidate>
            <Field label="Name" name="name" type="text" error={errors.name} placeholder="Your full name" />
            <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@example.com" />
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(139,92,246,0.8)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Send className="size-4" /> Send Message
            </button>
          </form>
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
                </div>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
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
