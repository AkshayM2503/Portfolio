import { useState } from "react";
import { AlertTriangle, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SUSPICIOUS_THRESHOLD,
  evaluateTransaction,
  samplePresets,
  transactionTypes,
  type SampleTransaction,
  type TransactionType,
} from "@/data/demos/fraud";
import { DemoShell, SimulatedNotice } from "./DemoShell";
import { Field, StepLabel, fieldClass } from "./controls";

type NumericKey = "amount" | "balanceBefore" | "hour" | "recentCount";
const limits: Record<NumericKey, [number, number]> = {
  amount: [0, 10_000_000],
  balanceBefore: [0, 10_000_000],
  hour: [0, 23],
  recentCount: [0, 50],
};

export function FraudDemo() {
  const [tx, setTx] = useState<SampleTransaction>(samplePresets[0].tx);
  const [presetIndex, setPresetIndex] = useState<number | null>(0);
  const [inputs, setInputs] = useState<Record<NumericKey, string>>(toInputs(samplePresets[0].tx));
  const result = evaluateTransaction(tx);
  const invalid = (Object.keys(inputs) as NumericKey[]).filter((k) => !isValid(k, inputs[k]));

  function loadPreset(preset: SampleTransaction, index: number) {
    setPresetIndex(index);
    setTx(preset);
    setInputs(toInputs(preset));
  }

  function updateNumber(key: NumericKey, value: string) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    if (isValid(key, value)) setTx((prev) => ({ ...prev, [key]: Number(value) }));
  }

  return (
    <DemoShell
      title="Rule-based transaction check"
      intro="Load a sample transaction or edit its attributes. The classification and the rules behind it update instantly."
    >
      <SimulatedNotice>
        This is a <strong>simulated demonstration</strong> using simple, transparent rules and
        sample transactions. It is not the project's Random Forest, XGBoost or SVM models and does
        not process real financial data.
      </SimulatedNotice>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Sample transactions">
        {samplePresets.map((p, i) => (
          <Button
            key={p.label}
            size="sm"
            variant="outline"
            data-testid={`fraud-preset-${i}`}
            onClick={() => loadPreset(p.tx, i)}
            aria-pressed={presetIndex === i}
            className={presetIndex === i ? "border-primary bg-primary/15" : undefined}
          >
            {p.label}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div
          className="grid content-start gap-4 sm:grid-cols-2"
          onChange={() => setPresetIndex(null)}
        >
          <Field label="Transaction type" htmlFor="fraud-type">
            <select
              id="fraud-type"
              data-testid="fraud-type-select"
              className={fieldClass}
              value={tx.type}
              onChange={(e) => setTx({ ...tx, type: e.target.value as TransactionType })}
            >
              {transactionTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <NumberField
            id="amount"
            label="Amount (sample units)"
            value={inputs.amount}
            onChange={updateNumber}
            invalid={invalid.includes("amount")}
          />
          <NumberField
            id="balanceBefore"
            label="Balance before"
            value={inputs.balanceBefore}
            onChange={updateNumber}
            invalid={invalid.includes("balanceBefore")}
          />
          <NumberField
            id="hour"
            label="Hour of day (0–23)"
            value={inputs.hour}
            onChange={updateNumber}
            invalid={invalid.includes("hour")}
          />
          <NumberField
            id="recentCount"
            label="Transactions in past hour"
            value={inputs.recentCount}
            onChange={updateNumber}
            invalid={invalid.includes("recentCount")}
          />
          <label className="flex items-center gap-2 self-end pb-2 text-sm">
            <input
              type="checkbox"
              data-testid="fraud-new-device-checkbox"
              className="size-4 accent-[#8B5CF6]"
              checked={tx.newDevice}
              onChange={(e) => setTx({ ...tx, newDevice: e.target.checked })}
            />
            New device
          </label>
          {invalid.length > 0 && (
            <p
              role="alert"
              data-testid="fraud-input-error"
              className="text-sm text-destructive sm:col-span-2"
            >
              Some values are empty or out of range; the result uses the last valid value.
            </p>
          )}
        </div>

        <div>
          <div
            data-testid="fraud-result"
            className={`flex items-center gap-3 rounded-md border px-4 py-4 ${
              result.suspicious
                ? "border-destructive/50 bg-destructive/10"
                : "border-secondary/40 bg-secondary/10"
            }`}
          >
            {result.suspicious ? (
              <AlertTriangle aria-hidden="true" className="size-6 text-destructive" />
            ) : (
              <CheckCircle2 aria-hidden="true" className="size-6 text-secondary" />
            )}
            <div>
              <p className="font-display text-lg font-semibold" data-testid="fraud-result-label">
                {result.suspicious ? "Potentially suspicious" : "Normal"}
              </p>
              <p className="text-xs text-muted-foreground" data-testid="fraud-risk-score">
                Risk points: {result.score} (flagged at {SUSPICIOUS_THRESHOLD}+)
              </p>
            </div>
          </div>
          <div className="mt-5">
            <StepLabel>Rules evaluated</StepLabel>
            <ul className="space-y-2" data-testid="fraud-rules-list">
              {result.rules.map((r) => (
                <li
                  key={r.id}
                  data-testid={`fraud-rule-${r.id}`}
                  data-triggered={r.triggered}
                  className={`flex items-start gap-2 text-sm ${r.triggered ? "text-foreground" : "text-muted-foreground/70"}`}
                >
                  {r.triggered ? (
                    <AlertTriangle
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-destructive"
                    />
                  ) : (
                    <Circle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  )}
                  <span className="flex-1">{r.label}</span>
                  <span className="font-mono text-xs">+{r.points}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  invalid,
}: {
  id: NumericKey;
  label: string;
  value: string;
  onChange: (k: NumericKey, v: string) => void;
  invalid: boolean;
}) {
  return (
    <Field label={label} htmlFor={`fraud-${id}`}>
      <input
        id={`fraud-${id}`}
        data-testid={`fraud-${id}-input`}
        type="number"
        min={limits[id][0]}
        max={limits[id][1]}
        className={`${fieldClass} ${invalid ? "border-destructive" : ""}`}
        aria-invalid={invalid}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </Field>
  );
}

function isValid(key: NumericKey, value: string) {
  if (value.trim() === "") return false;
  const n = Number(value);
  const [min, max] = limits[key];
  return (
    Number.isFinite(n) &&
    n >= min &&
    n <= max &&
    (key === "amount" || key === "balanceBefore" || Number.isInteger(n))
  );
}

function toInputs(tx: SampleTransaction): Record<NumericKey, string> {
  return {
    amount: String(tx.amount),
    balanceBefore: String(tx.balanceBefore),
    hour: String(tx.hour),
    recentCount: String(tx.recentCount),
  };
}
