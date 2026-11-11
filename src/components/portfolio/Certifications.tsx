import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Certifications() {
  return (
    <Section id="languages" eyebrow="Languages" title="Communication across contexts.">
      <Stagger className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
        {portfolio.languages.map((language) => (
          <motion.div
            key={language}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="glass group relative flex items-center gap-4 overflow-hidden rounded-2xl p-6"
          >
            <Languages className="size-7 shrink-0 text-secondary" />
            <h3 className="font-display text-base font-semibold leading-snug">{language}</h3>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
