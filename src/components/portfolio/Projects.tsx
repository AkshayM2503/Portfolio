import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title={
        <>
          Work that <span className="text-gradient">moves the needle</span>.
        </>
      }
      subtitle="Selected work across forecasting, motorsport analytics, synthetic data, machine learning, and health technology."
    >
      <Stagger className="grid gap-x-8 md:grid-cols-2" stagger={0.08}>
        {projects.map((project, index) => (
          <motion.article
            key={project.slug}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="group flex min-w-0 flex-col border-t border-border py-7 sm:py-8"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-xs text-secondary">0{index + 1}</p>
              <p className="text-right text-xs text-muted-foreground">{project.category}</p>
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold leading-snug">
              {project.title}
            </h3>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
              {project.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((technology) => (
                <span
                  key={technology}
                  className="rounded-sm border border-border bg-surface px-2 py-1 text-[11px] text-muted-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="link" asChild className="h-auto px-0 text-foreground">
                <Link to="/projects/$slug" params={{ slug: project.slug }}>
                  View Project <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </motion.article>
        ))}
      </Stagger>
    </Section>
  );
}
