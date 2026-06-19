import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { GraduationCap, MapPin } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Education() {
  const e = portfolio.education;
  return (
    <Section id="education" eyebrow="Education" title="Foundations.">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)]">
              <GraduationCap className="size-7 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground">{e.period}</div>
              <h3 className="mt-1 font-display text-2xl font-semibold">{e.school}</h3>
              <p className="mt-1 text-muted-foreground">
                {e.degree} · {e.specialization}
              </p>
              <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {e.location}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center md:min-w-[140px]">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">CGPA</div>
              <div className="font-display text-3xl font-bold text-gradient">{e.cgpa}</div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
