import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Stethoscope, TrendingUp, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const icons: Record<string, LucideIcon> = {
  ShieldCheck,
  Stethoscope,
  TrendingUp,
};

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={<>Work that <span className="text-gradient">moves the needle</span>.</>}
      subtitle="Selected projects spanning fraud analytics, healthcare automation, and market forecasting."
    >
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {portfolio.projects.map((p) => {
          const Icon = icons[p.icon] ?? ShieldCheck;
          return (
            <motion.article
              key={p.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="glass group relative flex flex-col overflow-hidden rounded-3xl"
            >
              {/* Visual */}
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.accent}`}>
                <div className="bg-grid absolute inset-0 opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Icon className="absolute right-4 top-4 size-7 text-white/80" />
                <div className="absolute bottom-3 left-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
                  {p.tag}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-5 top-5 hidden rounded-full bg-white/10 p-1.5 backdrop-blur transition-opacity group-hover:opacity-100">
                <ArrowUpRight className="size-4 text-white" />
              </div>
            </motion.article>
          );
        })}
      </Stagger>
    </Section>
  );
}
