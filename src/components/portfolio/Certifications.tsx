import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Continuous learning.">
      <Stagger className="grid gap-5 md:grid-cols-3" stagger={0.08}>
        {portfolio.certifications.map((c) => (
          <motion.div
            key={c.title}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass group relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary opacity-60" />
            <BadgeCheck className="size-7 text-secondary" />
            <h3 className="mt-4 font-display text-base font-semibold leading-snug">{c.title}</h3>
            <div className="mt-2 text-sm text-muted-foreground">
              {c.issuer} · {c.year}
            </div>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
