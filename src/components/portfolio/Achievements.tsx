import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { Award, GraduationCap, Lightbulb, Trophy, type LucideIcon } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const icons: Record<string, LucideIcon> = { Award, Trophy, GraduationCap, Lightbulb };

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={<>Recognition & <span className="text-gradient">impact</span>.</>}
    >
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {portfolio.achievements.map((a) => {
          const Icon = icons[a.icon] ?? Award;
          return (
            <motion.div
              key={a.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 ring-1 ring-white/10">
                <Icon className="size-5 text-secondary" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{a.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.detail}</p>
            </motion.div>
          );
        })}
      </Stagger>
    </Section>
  );
}
