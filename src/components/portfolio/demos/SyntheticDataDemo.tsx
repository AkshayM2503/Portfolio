import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SYNTHETIC_MAX_RECORDS,
  generateRecords,
  parseRecordCount,
  syntheticTemplates,
  type SyntheticRecord,
} from "@/data/demos/synthetic";
import { DemoShell, SimulatedNotice } from "./DemoShell";
import { Field, fieldClass } from "./controls";

export function SyntheticDataDemo() {
  const [templateId, setTemplateId] = useState(syntheticTemplates[0].id);
  const [countInput, setCountInput] = useState("10");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    columns: string[];
    rows: SyntheticRecord[];
    label: string;
  } | null>(null);
  const template = syntheticTemplates.find((t) => t.id === templateId) ?? syntheticTemplates[0];

  function generate() {
    const parsed = parseRecordCount(countInput);
    if ("error" in parsed) {
      setError(parsed.error);
      return;
    }
    setError("");
    const seed = Math.floor(Math.random() * 1_000_000);
    setResult({
      columns: template.columns,
      rows: generateRecords(template, parsed.count, seed),
      label: template.label,
    });
  }

  return (
    <DemoShell
      title="Sample data generator"
      intro="Choose a dataset type and record count, then generate a fresh synthetic table in your browser."
    >
      <SimulatedNotice>
        This lightweight demo uses <strong>simple rule-based templates</strong> to create fictional
        records. It does not use GPT-4 and does not reproduce the full original generator; the
        dataset types here are illustrative examples.
      </SimulatedNotice>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_10rem_auto] sm:items-end">
        <Field label="Dataset type" htmlFor="synthetic-type">
          <select
            id="synthetic-type"
            data-testid="synthetic-type-select"
            className={fieldClass}
            value={templateId}
            onChange={(e) => {
              setTemplateId(e.target.value);
              setResult(null);
            }}
          >
            {syntheticTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={`Records (1–${SYNTHETIC_MAX_RECORDS})`} htmlFor="synthetic-count">
          <input
            id="synthetic-count"
            data-testid="synthetic-count-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={SYNTHETIC_MAX_RECORDS}
            className={fieldClass}
            value={countInput}
            aria-invalid={Boolean(error)}
            onChange={(e) => setCountInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
          />
        </Field>
        <Button data-testid="synthetic-generate-button" onClick={generate}>
          {result ? <RefreshCw aria-hidden="true" /> : <Sparkles aria-hidden="true" />}
          {result ? "Regenerate" : "Generate"}
        </Button>
      </div>
      {error && (
        <p role="alert" data-testid="synthetic-error" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {result ? (
        <div className="mt-6">
          <p className="mb-2 text-xs text-muted-foreground" data-testid="synthetic-result-summary">
            {result.rows.length} synthetic {result.label.toLowerCase()} generated
          </p>
          <div className="max-h-96 overflow-auto rounded-md border border-border">
            <table
              className="w-full min-w-[560px] text-left text-xs sm:text-sm"
              data-testid="synthetic-table"
            >
              <thead className="sticky top-0 bg-card text-muted-foreground">
                <tr>
                  {result.columns.map((c) => (
                    <th key={c} className="whitespace-nowrap px-3 py-2 font-mono font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} className="border-t border-border/60">
                    {result.columns.map((c) => (
                      <td key={c} className="whitespace-nowrap px-3 py-1.5">
                        {row[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p
          className="mt-6 rounded-md border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground"
          data-testid="synthetic-empty-state"
        >
          Generated records will appear here.
        </p>
      )}
    </DemoShell>
  );
}
