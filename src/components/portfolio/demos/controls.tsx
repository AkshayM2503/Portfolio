import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground/80">{hint}</p>}
    </div>
  );
}

export function Stat({
  label,
  value,
  testId,
  accent,
}: {
  label: string;
  value: ReactNode;
  testId: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-border bg-background/60 px-3 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        data-testid={testId}
        className={cn("mt-1 font-display text-xl font-semibold", accent && "text-secondary")}
      >
        {value}
      </p>
    </div>
  );
}

export function StepLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-secondary">{children}</p>
  );
}
