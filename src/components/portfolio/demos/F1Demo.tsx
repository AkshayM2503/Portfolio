import { useMemo, useState } from "react";
import {
  f1Circuits,
  getDriverStats,
  getFactorScores,
  predictionWeights,
  rankDrivers,
  sampleDrivers,
  type F1Circuit,
} from "@/data/demos/f1";
import { DemoShell, SimulatedNotice } from "./DemoShell";
import { Field, Stat, StepLabel, fieldClass } from "./controls";

export function F1Demo() {
  const [driverId, setDriverId] = useState(sampleDrivers[0].id);
  const [circuit, setCircuit] = useState<F1Circuit>(f1Circuits[0]);
  const driver = sampleDrivers.find((d) => d.id === driverId) ?? sampleDrivers[0];
  const stats = getDriverStats(driver);
  const factors = getFactorScores(driver, circuit);
  const ranking = useMemo(() => rankDrivers(circuit), [circuit]);
  const rank = ranking.findIndex((r) => r.driver.id === driver.id) + 1;
  const score = ranking.find((r) => r.driver.id === driver.id)?.score ?? 0;

  return (
    <DemoShell
      title="Driver stats & weighted ranking"
      intro="Choose a sample driver and circuit type to view recent stats and a transparent weighted prediction score."
    >
      <SimulatedNotice>
        Drivers, teams, circuits and results are <strong>fictional sample data</strong>. The score
        below is a simple illustration using the project's documented factor weights. It is not the
        actual trained model or a live race prediction.
      </SimulatedNotice>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Driver" htmlFor="f1-driver">
          <select
            id="f1-driver"
            data-testid="f1-driver-select"
            className={fieldClass}
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          >
            {sampleDrivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} · {d.team}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Circuit type" htmlFor="f1-circuit">
          <select
            id="f1-circuit"
            data-testid="f1-circuit-select"
            className={fieldClass}
            value={circuit}
            onChange={(e) => setCircuit(e.target.value as F1Circuit)}
          >
            {f1Circuits.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <StepLabel>Last 5 sample races</StepLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Wins" value={stats.wins} testId="f1-stat-wins" />
          <Stat label="Podiums" value={stats.podiums} testId="f1-stat-podiums" />
          <Stat label="Points" value={stats.points} testId="f1-stat-points" />
          <Stat label="Avg finish" value={`P${stats.avgFinish}`} testId="f1-stat-avg-finish" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground" data-testid="f1-recent-finishes">
          Finishes: {driver.recentFinishes.map((p) => `P${p}`).join(" → ")} · Avg qualifying P
          {driver.avgQualifying}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <StepLabel>Weighted score breakdown</StepLabel>
          <ul className="space-y-3">
            {predictionWeights.map((f) => (
              <li key={f.key} data-testid={`f1-factor-${f.key}`}>
                <div className="flex justify-between text-xs">
                  <span>
                    {f.label} <span className="text-muted-foreground">({f.weight * 100}%)</span>
                  </span>
                  <span className="text-muted-foreground">{factors[f.key].toFixed(0)} / 100</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${factors[f.key]}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            Score{" "}
            <span
              data-testid="f1-prediction-score"
              className="font-display text-lg font-semibold text-secondary"
            >
              {score.toFixed(1)}
            </span>
            <span className="text-muted-foreground"> · sample rank </span>
            <span data-testid="f1-prediction-rank" className="font-semibold">
              #{rank}
            </span>
          </p>
        </div>

        <div>
          <StepLabel>Illustrative ranking for {circuit}</StepLabel>
          <ol className="space-y-1.5" data-testid="f1-ranking-list">
            {ranking.map((r, i) => (
              <li
                key={r.driver.id}
                className={`flex items-center justify-between rounded-md border px-3 py-2 text-sm ${
                  r.driver.id === driver.id ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <span>
                  <span className="mr-2 font-mono text-xs text-muted-foreground">{i + 1}</span>
                  {r.driver.name}
                </span>
                <span className="font-mono text-xs">{r.score.toFixed(1)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-6 text-xs leading-6 text-muted-foreground">
        How it works: each factor is scaled to 0–100 from the sample stats (e.g. average finish at
        the circuit, points in the last 5 races, positions gained, pit-stop time), then combined
        using the weights shown.
      </p>
    </DemoShell>
  );
}
