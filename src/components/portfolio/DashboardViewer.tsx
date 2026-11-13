import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Github, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  isValidDashboardEmbedUrl,
  isValidGitHubRepositoryUrl,
  type ProjectDefinition,
} from "@/data/projects";

export function DashboardViewer({ project }: { project: ProjectDefinition }) {
  const images = project.dashboardImages;
  const embedUrl = isValidDashboardEmbedUrl(project.dashboardEmbedUrl)
    ? project.dashboardEmbedUrl
    : "";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const selectedImage = images[selectedIndex];

  function moveImage(direction: -1 | 1) {
    setSelectedIndex((current) => (current + direction + images.length) % images.length);
  }

  return (
    <section aria-labelledby="dashboard-heading" className="border-y border-border py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-secondary">Project media</p>
          <h2 id="dashboard-heading" className="mt-2 font-display text-2xl font-semibold">
            Dashboard / application
          </h2>
        </div>
        {images.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setEnlarged(true)}>
            <Expand aria-hidden="true" /> Enlarge image
          </Button>
        )}
      </div>

      {embedUrl ? (
        <div className="overflow-hidden rounded-md border border-border bg-surface">
          <iframe
            src={embedUrl}
            title={`${project.title} interactive dashboard`}
            className="aspect-video w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : images.length > 0 && selectedImage ? (
        <div>
          <button
            type="button"
            onClick={() => setEnlarged(true)}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-md border border-border bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Enlarge ${selectedImage.alt}`}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="mx-auto max-h-[75vh] w-full object-contain"
            />
            <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-md border border-border bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand aria-hidden="true" className="size-4" />
            </span>
          </button>
          {images.length > 1 && (
            <div className="mt-4 flex items-center justify-between gap-3">
              <Button variant="outline" size="icon" onClick={() => moveImage(-1)} aria-label="Previous image">
                <ChevronLeft aria-hidden="true" />
              </Button>
              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image.src}-${index}`}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Show ${image.label ?? image.alt}`}
                    aria-current={index === selectedIndex ? "true" : undefined}
                    className={`min-w-24 max-w-40 flex-1 overflow-hidden rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      index === selectedIndex ? "border-primary" : "border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={image.src} alt="" className="aspect-video w-full object-cover" />
                    {image.label && (
                      <span className="block truncate px-2 py-1 text-left text-xs text-muted-foreground">
                        {image.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={() => moveImage(1)} aria-label="Next image">
                <ChevronRight aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex min-h-56 items-center justify-center rounded-md border border-dashed border-border px-6 py-10 text-center">
          <div>
            <MonitorPlay aria-hidden="true" className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-3 font-medium">Dashboard preview will appear here</p>
            <p className="mt-1 text-sm text-muted-foreground">
              No dashboard embed or project screenshots have been added yet.
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <Dialog open={enlarged} onOpenChange={setEnlarged}>
          <DialogContent className="max-h-[95vh] max-w-[min(96vw,1400px)] overflow-auto border-border bg-background p-3 sm:p-5">
            <DialogTitle className="pr-8 text-left">{selectedImage.label ?? project.title}</DialogTitle>
            <DialogDescription className="sr-only">Enlarged project screenshot</DialogDescription>
            <div className="relative flex items-center justify-center">
              {images.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 z-10"
                  onClick={() => moveImage(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
              )}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[75vh] w-full object-contain"
              />
              {images.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 z-10"
                  onClick={() => moveImage(1)}
                  aria-label="Next image"
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              )}
            </div>
            {images.length > 1 && (
              <p className="text-center text-sm text-muted-foreground">
                {selectedIndex + 1} of {images.length}
              </p>
            )}
          </DialogContent>
        </Dialog>
      )}

      {isValidGitHubRepositoryUrl(project.repositoryUrl) && (
        <div className="mt-8 border-t border-border pt-6">
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            <Github aria-hidden="true" className="size-4" /> View GitHub repository
          </a>
        </div>
      )}
    </section>
  );
}