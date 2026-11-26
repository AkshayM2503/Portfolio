// Skill taxonomy and skill-to-project resolution for the interactive Skills section.
//
// The skill lists themselves live in `portfolio.skills` (single source of truth).
// Project associations are resolved from each project's own `technologies` list in
// src/data/projects.ts — no technology mapping is duplicated here. The only extra
// mappings are curated associations that are explicitly documented in a project's
// description but not named in its `technologies` list:
//   - Fraud Detection System: "Reusable preprocessing, feature engineering, and
//     model evaluation workflows."
//   - Formula 1 Analytics and Driver Prediction: configurable driver-ranking model
//     with "Prediction Model" and "Race Prediction" dashboards.
// Skills without any documented project association resolve to an empty list and
// are shown an empty state — associations are never invented.

import { portfolio } from "./portfolio";
import { projects, type ProjectDefinition } from "./projects";

export type SkillWithProjects = {
  name: string;
  projects: ProjectDefinition[];
};

export type SkillGroup = {
  slug: string;
  name: string;
  icon: string;
  skills: SkillWithProjects[];
};

const curatedProjectSlugs: Record<string, string[]> = {
  "Feature Engineering": ["fraud-detection-system"],
  "Model Evaluation": ["fraud-detection-system"],
  "Predictive Analytics": ["formula-1-analytics-driver-prediction"],
};

const categorySlugs: Record<string, string> = {
  Programming: "programming",
  "Data Analysis & Visualization": "data-analysis-visualization",
  "Machine Learning": "machine-learning",
  "Databases & Tools": "databases-tools",
};

export function getProjectsForSkill(skill: string): ProjectDefinition[] {
  const curated = curatedProjectSlugs[skill] ?? [];
  return projects.filter(
    (project) =>
      project.technologies.includes(skill) || curated.includes(project.slug),
  );
}

export function skillSlug(skill: string): string {
  return skill
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const skillGroups: SkillGroup[] = portfolio.skills.map((group) => ({
  slug:
    categorySlugs[group.category] ??
    group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name: group.category,
  icon: group.icon,
  skills: group.items.map((skill) => ({
    name: skill,
    projects: getProjectsForSkill(skill),
  })),
}));

// "Programming" is the first group in portfolio.skills and the required default.
export const defaultSkillGroupSlug = skillGroups[0]?.slug ?? "programming";
