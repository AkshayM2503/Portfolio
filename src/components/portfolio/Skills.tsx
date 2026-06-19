import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { BarChart3, Brain, Code2, Terminal, Users, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const icons: Record<string, LucideIcon> = {
  Code2,
  Brain,
  BarChart3,
  Terminal,
  Users,
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A toolkit for the full <span className="text-gradient">data lifecycle</span>.</>}
      subtitle="From raw ingestion to insight delivery — built around Python, SQL, and modern ML tooling."
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {portfolio.skills.map((group) => {
          const Icon = icons[group.icon] ?? Code2;
          return (
            <motion.div
              key={group.category}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
              <div className="relative flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-white/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{group.category}</h3>
              </div>
              <ul className="relative mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </Stagger>
    </Section>
  );
}
