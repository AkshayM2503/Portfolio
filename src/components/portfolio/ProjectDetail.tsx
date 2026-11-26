import { ArrowLeft, ArrowUpRight, Download, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DashboardViewer } from "@/components/portfolio/DashboardViewer";
import { isValidGitHubRepositoryUrl, type ProjectDefinition } from "@/data/projects";

function DetailSection({
  number,
  title,
  items,
}: {
  number: string;
  title: string;
  items: string[];
}) {
  return (
    <section className="grid gap-4 border-b border-border py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-10">
      <p className="font-mono text-sm text-secondary">{number}</p>
      <div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        {items.length > 0 ? (
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {items.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-3 size-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Further project details have not been provided yet.
          </p>
        )}
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: { project: ProjectDefinition }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-8 sm:pb-28 sm:pt-12">
        <Button variant="ghost" asChild className="-ml-3 text-muted-foreground">
          <Link to="/" hash="projects">
            <ArrowLeft aria-hidden="true" /> Back to Projects
          </Link>
        </Button>

        <header className="border-b border-border pb-10 pt-14 sm:pb-14 sm:pt-20">
          <p className="text-sm font-medium text-secondary">{project.category}</p>
          <h1 className="mt-4 max-w-4xl text-balance font-display text-4xl font-bold leading-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            {project.description}
          </p>
          {project.technologies.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-sm border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}
          {isValidGitHubRepositoryUrl(project.repositoryUrl) && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              <Github aria-hidden="true" className="size-4" /> GitHub repository
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
        </header>

        <section className="grid gap-4 border-b border-border py-8 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:py-10">
          <p className="font-mono text-sm text-secondary">01</p>
          <div>
            <h2 className="font-display text-xl font-semibold">Project overview</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {project.overview}
            </p>
          </div>
        </section>

        <DetailSection number="02" title="Project objectives" items={project.objectives} />
        <DetailSection number="03" title="Key features" items={project.features} />
        <DetailSection
          number="04"
          title="Technical implementation"
          items={project.implementation}
        />
        <DetailSection number="05" title="Results and achievements" items={project.results} />

        {project.slug !== 'synthetic-data-generator' && project.slug !== 'fraud-detection-system' && project.slug !== 'smart-medicine-dispensing-atm' && (
        <DashboardViewer key={project.slug} project={project} />
      )}

        {project.dashboardDownload && (
          <div className="border-b border-border py-8">
            <Button asChild>
              <a
                href={project.dashboardDownload.url}
                download={project.dashboardDownload.filename}
              >
                <Download aria-hidden="true" /> Download Power BI Dashboard
              </a>
            </Button>
          </div>
        )}

        <div className="pt-8">
          <Button variant="outline" asChild>
            <Link to="/" hash="projects">
              <ArrowLeft aria-hidden="true" /> Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
