import { Section } from "./Section";
import { Reveal, Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { portfolio } from "@/data/portfolio";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={<>Engineering insight from <span className="text-gradient">raw data</span>.</>}
    >
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <Reveal direction="up">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            {portfolio.about.map((p, i) => (
              <p key={i} className={i === 0 ? "text-foreground/90" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-4" stagger={0.1}>
          {portfolio.stats.map((s) => (
            <motion.div
              key={s.label}
              variants={itemVariants}
              className="glass relative overflow-hidden rounded-2xl p-5"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="font-display text-3xl font-bold sm:text-4xl">
                <span className="text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
