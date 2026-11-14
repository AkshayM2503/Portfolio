import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import { getProjectBySlug } from "@/data/projects";

function ProjectError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <div className="max-w-md">
        <h1 className="font-display text-2xl font-semibold">This project page didn’t load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Please try again or return to the projects list."}
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link to="/" hash="projects">
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProjectNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <div className="max-w-md">
        <p className="font-mono text-sm text-secondary">404</p>
        <h1 className="mt-3 font-display text-2xl font-semibold">Project not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This project page isn’t available.</p>
        <Button variant="outline" asChild className="mt-6">
          <Link to="/" hash="projects">
            Back to Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  component: ProjectPage,
  errorComponent: ProjectError,
  notFoundComponent: ProjectNotFound,
  head: ({ params, loaderData }) => {
    const project = loaderData ?? getProjectBySlug(params.slug);
    const title = project
      ? `${project.title} — Akshay Murali`
      : "Project unavailable — Akshay Murali";
    const description = project?.description ?? "Project details from Akshay Murali’s portfolio.";
    const pageUrl = `https://akshay-creative-hub.lovable.app/projects/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
    };
  },
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return <ProjectDetail project={project} />;
}
