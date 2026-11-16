import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  MonitorPlay,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { isValidDashboardEmbedUrl, type ProjectDefinition } from "@/data/projects";

const zoomClasses = ["scale-100", "scale-125", "scale-150", "scale-200"];

export function DashboardViewer({ project }: { project: ProjectDefinition }) {
  const images = project.dashboardImages;
  const embedUrl = isValidDashboardEmbedUrl(project.dashboardEmbedUrl)
    ? project.dashboardEmbedUrl
    : "";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showImages, setShowImages] = useState(!embedUrl);
  const [enlarged, setEnlarged] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const selectedImage = images[selectedIndex];
  const showEmbed = Boolean(embedUrl && (!images.length || !showImages));

  function selectImage(index: number) {
    setSelectedIndex(index);
    setZoomLevel(0);
  }

  function moveImage(direction: -1 | 1) {
    setSelectedIndex((current) => (current + direction + images.length) % images.length);
    setZoomLevel(0);
  }

  return (
    <section aria-labelledby="dashboard-heading" className="border-y border-border py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-secondary">Project gallery</p>
          <h2 id="dashboard-heading" className="mt-2 font-display text-2xl font-semibold">
            Dashboard Preview
          </h2>
        </div>
        {images.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEnlarged(true)}
            aria-label="Open dashboard screenshot in full-screen view"
          >
            <Expand aria-hidden="true" /> View full screen
          </Button>
        )}
      </div>

      {embedUrl && images.length > 0 && (
        <div className="mb-4 flex gap-2" aria-label="Dashboard viewing options">
          <Button
            variant={showImages ? "outline" : "secondary"}
            size="sm"
            onClick={() => setShowImages(false)}
            aria-pressed={!showImages}
          >
            Interactive dashboard
          </Button>
          <Button
            variant={showImages ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowImages(true)}
            aria-pressed={showImages}
          >
            Screenshots
          </Button>
        </div>
      )}

      {showEmbed ? (
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
          <Button
            variant="outline"
            className="group relative h-auto w-full overflow-hidden whitespace-normal p-2"
            onClick={() => setEnlarged(true)}
            aria-label={`Open ${selectedImage.label ?? selectedImage.alt} screenshot in full-screen view`}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="h-auto max-h-[78vh] w-full object-contain"
            />
            <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-md border border-border bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand aria-hidden="true" className="size-4" />
            </span>
          </Button>
          {selectedImage.label && (
            <p className="mt-3 text-sm font-medium text-muted-foreground">{selectedImage.label}</p>
          )}

          {images.length > 1 && (
            <div className="mt-8">
              <h3 className="mb-4 font-display text-lg font-semibold">All dashboard pages</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <Button
                    variant="outline"
                    className={`h-auto min-w-0 flex-col items-stretch whitespace-normal p-2 text-left ${
                      index === selectedIndex ? "border-primary" : "border-border"
                    }`}
                    key={`${image.src}-${index}`}
                    onClick={() => {
                      selectImage(index);
                      setEnlarged(true);
                    }}
                    aria-label={`Open ${image.label ?? image.alt} screenshot`}
                    aria-current={index === selectedIndex ? "true" : undefined}
                  >
                    <img
                      src={image.src}
                      alt=""
                      loading="lazy"
                      className="h-auto w-full object-contain"
                    />
                    {image.label && (
                      <span className="block px-2 pb-1 pt-3 text-sm font-medium text-foreground">
                        {image.label}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
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
          <DialogContent
            className="max-h-[96vh] max-w-[min(98vw,1600px)] overflow-auto border-border bg-background p-3 sm:p-5"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" && images.length > 1) {
                event.preventDefault();
                moveImage(-1);
              } else if (event.key === "ArrowRight" && images.length > 1) {
                event.preventDefault();
                moveImage(1);
              }
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
              <DialogTitle className="text-left">
                {selectedImage.label ?? project.title}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoomLevel((level) => Math.max(0, level - 1))}
                  disabled={zoomLevel === 0}
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <ZoomOut aria-hidden="true" />
                </Button>
                <span className="min-w-12 text-center text-sm text-muted-foreground">
                  {100 + zoomLevel * 25}%
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoomLevel((level) => Math.min(zoomClasses.length - 1, level + 1))}
                  disabled={zoomLevel === zoomClasses.length - 1}
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <ZoomIn aria-hidden="true" />
                </Button>
              </div>
            </div>
            <DialogDescription className="sr-only">Enlarged project screenshot</DialogDescription>
            <div className="relative flex max-h-[78vh] min-h-0 items-center justify-center overflow-auto">
              {images.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="sticky left-2 z-10 shrink-0"
                  onClick={() => moveImage(-1)}
                  aria-label="Previous image"
                >
                  <ChevronLeft aria-hidden="true" />
                </Button>
              )}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={`h-auto max-h-[75vh] w-full shrink-0 object-contain transition-transform ${zoomClasses[zoomLevel]}`}
              />
              {images.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="sticky right-2 z-10 shrink-0"
                  onClick={() => moveImage(1)}
                  aria-label="Next image"
                >
                  <ChevronRight aria-hidden="true" />
                </Button>
              )}
            </div>
            {images.length > 1 && (
              <p className="text-center text-sm text-muted-foreground">
                {selectedIndex + 1} of {images.length} · Use the arrow keys to navigate
              </p>
            )}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
