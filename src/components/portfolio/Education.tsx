import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { GraduationCap, MapPin } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Foundations.">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative divide-y divide-tint-strong">
            {portfolio.education.map((e) => (
              <div key={e.school} className="grid gap-5 py-6 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr_auto] md:items-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_30px_-6px_rgba(139,92,246,0.7)]">
                  <GraduationCap className="size-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{e.school}</h3>
                  <p className="mt-1 text-muted-foreground">{e.degree}</p>
                  <div className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" /> {e.location}
                  </div>
                </div>
                {e.cgpa && (
                  <div className="rounded-2xl border border-tint-strong bg-tint p-4 text-center md:min-w-[140px]">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">CGPA</div>
                    <div className="font-display text-3xl font-bold text-gradient">{e.cgpa}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
