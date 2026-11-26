import { useId, useState, type ReactNode } from "react";
import { FlaskConical, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SimulatedNotice({ children }: { children: ReactNode }) {
  return (
    <p
      data-testid="demo-simulated-notice"
      className="flex gap-2 rounded-md border border-secondary/30 bg-secondary/10 px-3 py-2 text-xs leading-6 text-muted-foreground sm:text-sm"
    >
      <FlaskConical aria-hidden="true" className="mt-1 size-4 shrink-0 text-secondary" />
      <span>{children}</span>
    </p>
  );
}

export function DemoShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      aria-labelledby={`${panelId}-heading`}
      data-testid="interactive-demo-section"
      className="border-b border-border py-12 sm:py-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-secondary">Interactive Demo</p>
          <h2 id={`${panelId}-heading`} className="mt-2 font-display text-2xl font-semibold">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{intro}</p>
        </div>
        <Button
          data-testid={open ? "hide-demo-button" : "launch-demo-button"}
          variant={open ? "outline" : "default"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Play aria-hidden="true" />}
          {open ? "Hide Demo" : "Launch Demo"}
        </Button>
      </div>

      {open && (
        <div
          id={panelId}
          data-testid="demo-panel"
          className="mt-8 rounded-lg border border-border bg-surface p-4 animate-in fade-in slide-in-from-top-2 duration-300 sm:p-6"
        >
          {children}
        </div>
      )}
    </section>
  );
}
