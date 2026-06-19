import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Briefcase } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={<>Shipping in <span className="text-gradient">production</span>.</>}
      subtitle="Internships building data pipelines, ML workflows, and developer tooling for real teams."
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent md:left-1/2" />
        <ul className="space-y-12">
          {portfolio.experience.map((exp, i) => (
            <li
              key={exp.company}
              className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
              }`}
            >
              <span className="absolute left-4 top-2 grid size-3 -translate-x-1/2 place-items-center rounded-full bg-primary shadow-[0_0_0_6px_rgba(139,92,246,0.15)] md:left-1/2" />

              <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <Reveal direction={i % 2 === 0 ? "right" : "left"}>
                  <div className="text-sm text-muted-foreground">{exp.period}</div>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{exp.role}</h3>
                  <div className="mt-1 inline-flex items-center gap-2 text-secondary">
                    <Briefcase className="size-4" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                </Reveal>
              </div>

              <div className={`pl-10 md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12"}`}>
                <Reveal direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="glass rounded-2xl p-6">
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-secondary" />
                          <span className="text-foreground/85">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
