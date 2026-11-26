import { useEffect, useState } from "react";
import { Check, Minus, PackageCheck, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MAX_QTY_PER_ITEM,
  demoCodes,
  demoInventory,
  medSteps,
  verifyDemoCode,
} from "@/data/demos/medconnect";
import { DemoShell, SimulatedNotice } from "./DemoShell";
import { Field, StepLabel, fieldClass } from "./controls";

export function MedConnectDemo() {
  return (
    <DemoShell
      title="Dispensing workflow walkthrough"
      intro="Step through a simulated session at the dispensing machine: verify with a demo code, choose items and confirm."
    >
      <SimulatedNotice>
        <strong>Simulation only.</strong> No hardware is connected, nothing is dispensed and no
        personal or health information is collected. Medicines and codes are fictional placeholders,
        and the steps are an illustrative flow rather than a full specification of the original
        machine.
      </SimulatedNotice>
      <MedConnectFlow />
    </DemoShell>
  );
}

function MedConnectFlow() {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [allowed, setAllowed] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [progress, setProgress] = useState(0);
  const items = demoInventory.filter((m) => allowed.includes(m.id));
  const selected = items.filter((m) => (cart[m.id] ?? 0) > 0);

  useEffect(() => {
    if (step !== 4 || progress >= 120) return;
    const t = setTimeout(() => setProgress((p) => p + 20), 350);
    return () => clearTimeout(t);
  }, [step, progress]);

  function verify() {
    const res = verifyDemoCode(code);
    if ("error" in res) return setCodeError(res.error ?? "");
    setCodeError("");
    setAllowed(res.allowed);
    setCart({});
    setStep(2);
  }

  function changeQty(id: string, delta: number, stock: number) {
    setCart((c) => ({
      ...c,
      [id]: Math.max(0, Math.min(stock, MAX_QTY_PER_ITEM, (c[id] ?? 0) + delta)),
    }));
  }

  function restart() {
    setStep(0);
    setCode("");
    setCodeError("");
    setAllowed([]);
    setCart({});
    setProgress(0);
  }

  return (
    <div className="mt-6">
      <ol className="mb-6 flex gap-1.5" aria-label="Workflow progress">
        {medSteps.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <div className={`h-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
            <p
              className={`mt-1.5 text-[11px] sm:text-xs ${i === step ? "text-foreground" : "text-muted-foreground"}`}
            >
              {s}
            </p>
          </li>
        ))}
      </ol>

      <div data-testid={`med-step-${medSteps[step].toLowerCase()}`} className="min-h-56">
        {step === 0 && (
          <div>
            <StepLabel>Welcome</StepLabel>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              The machine screen greets the user and asks them to verify before any items can be
              selected.
            </p>
            <Button className="mt-5" data-testid="med-start-button" onClick={() => setStep(1)}>
              Start session
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="max-w-md">
            <StepLabel>Simulated verification</StepLabel>
            <Field label="Demo prescription code" htmlFor="med-code">
              <input
                id="med-code"
                data-testid="med-code-input"
                className={fieldClass}
                value={code}
                placeholder="e.g. DEMO-1234"
                autoComplete="off"
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verify()}
              />
            </Field>
            {codeError && (
              <p
                role="alert"
                data-testid="med-code-error"
                className="mt-2 text-sm text-destructive"
              >
                {codeError}
              </p>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              Try a sample code:{" "}
              {Object.keys(demoCodes).map((c) => (
                <button
                  key={c}
                  type="button"
                  data-testid={`med-sample-code-${c}`}
                  onClick={() => setCode(c)}
                  className="mr-2 font-mono text-secondary underline-offset-4 hover:underline"
                >
                  {c}
                </button>
              ))}
            </p>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button data-testid="med-verify-button" onClick={verify}>
                Verify code
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <StepLabel>Select items · verified {code.trim().toUpperCase()} (simulated)</StepLabel>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map((m) => {
                const qty = cart[m.id] ?? 0;
                const out = m.stock === 0;
                return (
                  <li
                    key={m.id}
                    data-testid={`med-item-${m.id}`}
                    className={`rounded-md border px-4 py-3 ${qty > 0 ? "border-primary bg-primary/10" : "border-border"}`}
                  >
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.form} · {out ? "Out of stock" : `${m.stock} in sample stock`}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        aria-label={`Remove one ${m.name}`}
                        data-testid={`med-dec-${m.id}`}
                        disabled={qty === 0}
                        onClick={() => changeQty(m.id, -1, m.stock)}
                      >
                        <Minus />
                      </Button>
                      <span
                        className="w-4 text-center font-mono text-sm"
                        data-testid={`med-qty-${m.id}`}
                      >
                        {qty}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        aria-label={`Add one ${m.name}`}
                        data-testid={`med-inc-${m.id}`}
                        disabled={out || qty >= Math.min(m.stock, MAX_QTY_PER_ITEM)}
                        onClick={() => changeQty(m.id, 1, m.stock)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Up to {MAX_QTY_PER_ITEM} per item, limited by sample stock.
            </p>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" onClick={restart}>
                Cancel
              </Button>
              <Button
                data-testid="med-review-button"
                disabled={selected.length === 0}
                onClick={() => setStep(3)}
              >
                Review selection
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md">
            <StepLabel>Review</StepLabel>
            <ul
              className="divide-y divide-border rounded-md border border-border"
              data-testid="med-review-list"
            >
              {selected.map((m) => (
                <li key={m.id} className="flex justify-between px-4 py-2.5 text-sm">
                  <span>{m.name}</span>
                  <span className="font-mono">× {cart[m.id]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Edit
              </Button>
              <Button
                data-testid="med-confirm-button"
                onClick={() => {
                  setProgress(0);
                  setStep(4);
                }}
              >
                Confirm & dispense (simulated)
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-md">
            <StepLabel>{progress < 120 ? "Simulating dispensing…" : "Complete"}</StepLabel>
            <div
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={Math.min(progress, 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full bg-secondary transition-[width] duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            {progress >= 120 && (
              <div
                data-testid="med-confirmation"
                className="mt-5 rounded-md border border-secondary/40 bg-secondary/10 p-4"
              >
                <p className="flex items-center gap-2 font-display font-semibold">
                  <PackageCheck aria-hidden="true" className="size-5 text-secondary" /> Simulated
                  dispensing complete
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {selected.map((m) => (
                    <li key={m.id} className="flex items-center gap-2">
                      <Check aria-hidden="true" className="size-3.5" /> {m.name} × {cart[m.id]}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">
                  Nothing was actually dispensed — this is a demo.
                </p>
                <Button
                  className="mt-4"
                  variant="outline"
                  data-testid="med-restart-button"
                  onClick={restart}
                >
                  <RotateCcw aria-hidden="true" /> Start over
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
