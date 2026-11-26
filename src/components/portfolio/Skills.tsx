import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Binary,
  Boxes,
  Braces,
  Brain,
  ClipboardCheck,
  Code2,
  Database,
  FileCode2,
  FlaskConical,
  FolderGit2,
  Globe,
  GitBranch,
  HardDrive,
  LayoutDashboard,
  LineChart,
  PieChart,
  Sparkles,
  Table,
  Target,
  Terminal,
  TreePine,
  TrendingUp,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "./Section";
import { Stagger, itemVariants } from "./Reveal";
import {
  defaultSkillGroupSlug,
  skillGroups,
  skillSlug,
  type SkillGroup,
  type SkillWithProjects,
} from "@/data/skills";

const categoryIcons: Record<string, LucideIcon> = {
  Code2,
  Brain,
  BarChart3,
  Terminal,
  Users,
};

const skillIcons: Record<string, LucideIcon> = {
  Python: FileCode2,
  SQL: Database,
  C: Binary,
  "C++": Braces,
  Pandas: Table,
  NumPy: Boxes,
  Matplotlib: LineChart,
  "Power BI": PieChart,
  Plotly: Activity,
  "Data Cleaning": Sparkles,
  "Scikit-learn": FlaskConical,
  "Random Forest": TreePine,
  XGBoost: Zap,
  SVM: Target,
  "Feature Engineering": Wrench,
  "Model Evaluation": ClipboardCheck,
  "Predictive Analytics": TrendingUp,
  PostgreSQL: HardDrive,
  Git: GitBranch,
  Streamlit: LayoutDashboard,
  "REST APIs": Globe,
};

export function Skills() {
  const [activeSlug, setActiveSlug] = useState(defaultSkillGroupSlug);
  const [selectedSkill, setSelectedSkill] = useState<SkillWithProjects | null>(
    null,
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeGroup: SkillGroup =
    skillGroups.find((group) => group.slug === activeSlug) ?? skillGroups[0];

  const handleTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = skillGroups.findIndex((group) => group.slug === activeSlug);
    let next = -1;
    if (event.key === "ArrowRight") {
      next = (index + 1) % skillGroups.length;
    } else if (event.key === "ArrowLeft") {
      next = (index - 1 + skillGroups.length) % skillGroups.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = skillGroups.length - 1;
    }
    if (next < 0) return;
    event.preventDefault();
    setActiveSlug(skillGroups[next].slug);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A toolkit for the full <span className="text-gradient">data lifecycle</span>.</>}
      subtitle="Browse the toolkit by category — open any skill to see the projects it powers."
    >
      <div data-testid="skills-section">
        <Stagger className="space-y-8" stagger={0.08}>
          <motion.div variants={itemVariants}>
            <div
              role="tablist"
              aria-label="Skill categories"
              onKeyDown={handleTablistKeyDown}
              className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md"
            >
              {skillGroups.map((group, index) => {
                const Icon = categoryIcons[group.icon] ?? Code2;
                const isActive = group.slug === activeGroup.slug;
                return (
                  <button
                    key={group.slug}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${group.slug}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${group.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveSlug(group.slug)}
                    data-testid={`category-tab-${group.slug}`}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:text-sm ${
                      isActive
                        ? "border-primary/50 bg-primary/20 text-foreground shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                        : "border-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    }`}
                  >
                    <Icon
                      className={`size-4 shrink-0 ${isActive ? "text-primary" : undefined}`}
                      aria-hidden="true"
                    />
                    {group.name}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div
              role="tabpanel"
              id={`panel-${activeGroup.slug}`}
              aria-labelledby={`tab-${activeGroup.slug}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeGroup.slug}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
                >
                  {activeGroup.skills.map((skill) => {
                    const Icon = skillIcons[skill.name] ?? Sparkles;
                    const count = skill.projects.length;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        aria-haspopup="dialog"
                        data-testid={`skill-card-${skillSlug(skill.name)}`}
                        className="group flex h-full w-full cursor-pointer flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-md transition duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-white/10">
                            <Icon className="size-4 text-primary" aria-hidden="true" />
                          </span>
                          {count > 0 && (
                            <span
                              data-testid={`skill-project-count-${skillSlug(skill.name)}`}
                              className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary"
                            >
                              {count}
                            </span>
                          )}
                        </span>
                        <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-[15px]">
                          {skill.name}
                        </span>
                        <span className="mt-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          {count > 0
                            ? `${count} project${count === 1 ? "" : "s"}`
                            : "Core toolkit"}
                          <ArrowUpRight
                            className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </Stagger>
      </div>

      <Dialog
        open={selectedSkill !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedSkill(null);
        }}
      >
        <DialogContent
          data-testid="skill-projects-dialog"
          className="w-[calc(100vw-2rem)] gap-0 rounded-2xl border-white/10 p-6 sm:w-full"
        >
          {selectedSkill && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-white/10">
                    {(() => {
                      const Icon = skillIcons[selectedSkill.name] ?? Sparkles;
                      return <Icon className="size-5 text-primary" aria-hidden="true" />;
                    })()}
                  </span>
                  <div className="min-w-0">
                    <DialogTitle className="font-display text-lg">
                      {selectedSkill.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedSkill.projects.length > 0
                        ? `${activeGroup.name} · Used in ${selectedSkill.projects.length} project${selectedSkill.projects.length === 1 ? "" : "s"}`
                        : `${activeGroup.name} · Core toolkit skill`}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-5 max-h-[55vh] space-y-3 overflow-y-auto pr-1">
                {selectedSkill.projects.length > 0 ? (
                  selectedSkill.projects.map((project) => (
                    <div
                      key={project.slug}
                      data-testid={`dialog-project-item-${project.slug}`}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-base font-semibold leading-snug">
                          {project.title}
                        </h4>
                        <span className="shrink-0 rounded-md border border-slate-700/70 bg-slate-800/30 px-2 py-1 text-[11px] text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {project.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((technology) => (
                          <span
                            key={technology}
                            className="rounded-sm border border-border bg-surface px-2 py-1 text-[11px] text-muted-foreground"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        onClick={() => setSelectedSkill(null)}
                        data-testid={`dialog-project-link-${project.slug}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-foreground"
                      >
                        View project details
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div
                    data-testid="skill-empty-state"
                    className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center"
                  >
                    <span className="mx-auto grid size-10 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <FolderGit2 className="size-5 text-muted-foreground" aria-hidden="true" />
                    </span>
                    <p className="mt-3 font-display text-sm font-semibold">
                      Part of the core toolkit
                    </p>
                    <p className="mx-auto mt-1.5 max-w-xs text-sm leading-6 text-muted-foreground">
                      {selectedSkill.name} is part of the core toolkit — no featured
                      project case study is tied to it yet.
                    </p>
                    <Link
                      to="/"
                      hash="projects"
                      onClick={() => setSelectedSkill(null)}
                      data-testid="skill-empty-state-projects-link"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-foreground"
                    >
                      Explore all projects
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
