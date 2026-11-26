// Fictional sample drivers and results for the Formula 1 demo. Not real race data.
export const f1Circuits = [
  "Circuit A (high-speed)",
  "Circuit B (street)",
  "Circuit C (technical)",
] as const;
export type F1Circuit = (typeof f1Circuits)[number];

export type SampleDriver = {
  id: string;
  name: string;
  team: string;
  recentFinishes: number[];
  recentPoints: number[];
  avgQualifying: number;
  avgPositionsGained: number;
  avgPitStopSeconds: number;
  circuitAvgFinish: Record<F1Circuit, number>;
};

export const sampleDrivers: SampleDriver[] = [
  {
    id: "d1",
    name: "Driver Alpha",
    team: "Sample Team Red",
    recentFinishes: [1, 2, 1, 3, 1],
    recentPoints: [25, 18, 25, 15, 25],
    avgQualifying: 1.8,
    avgPositionsGained: 0.6,
    avgPitStopSeconds: 2.4,
    circuitAvgFinish: {
      "Circuit A (high-speed)": 1.5,
      "Circuit B (street)": 3.2,
      "Circuit C (technical)": 2.1,
    },
  },
  {
    id: "d2",
    name: "Driver Bravo",
    team: "Sample Team Silver",
    recentFinishes: [3, 1, 4, 2, 5],
    recentPoints: [15, 25, 12, 18, 10],
    avgQualifying: 3.4,
    avgPositionsGained: 1.4,
    avgPitStopSeconds: 2.6,
    circuitAvgFinish: {
      "Circuit A (high-speed)": 3.0,
      "Circuit B (street)": 2.4,
      "Circuit C (technical)": 3.8,
    },
  },
  {
    id: "d3",
    name: "Driver Charlie",
    team: "Sample Team Orange",
    recentFinishes: [2, 4, 2, 1, 3],
    recentPoints: [18, 12, 18, 25, 15],
    avgQualifying: 2.6,
    avgPositionsGained: 0.9,
    avgPitStopSeconds: 2.3,
    circuitAvgFinish: {
      "Circuit A (high-speed)": 2.8,
      "Circuit B (street)": 4.1,
      "Circuit C (technical)": 1.9,
    },
  },
  {
    id: "d4",
    name: "Driver Delta",
    team: "Sample Team Green",
    recentFinishes: [6, 5, 7, 4, 6],
    recentPoints: [8, 10, 6, 12, 8],
    avgQualifying: 7.2,
    avgPositionsGained: 2.8,
    avgPitStopSeconds: 2.9,
    circuitAvgFinish: {
      "Circuit A (high-speed)": 6.4,
      "Circuit B (street)": 5.2,
      "Circuit C (technical)": 6.9,
    },
  },
  {
    id: "d5",
    name: "Driver Echo",
    team: "Sample Team Blue",
    recentFinishes: [9, 8, 12, 7, 10],
    recentPoints: [2, 4, 0, 6, 1],
    avgQualifying: 10.5,
    avgPositionsGained: 1.9,
    avgPitStopSeconds: 3.1,
    circuitAvgFinish: {
      "Circuit A (high-speed)": 9.8,
      "Circuit B (street)": 8.1,
      "Circuit C (technical)": 10.4,
    },
  },
  {
    id: "d6",
    name: "Driver Foxtrot",
    team: "Sample Team White",
    recentFinishes: [11, 14, 9, 13, 12],
    recentPoints: [0, 0, 2, 0, 0],
    avgQualifying: 13.1,
    avgPositionsGained: -0.4,
    avgPitStopSeconds: 3.4,
    circuitAvgFinish: {
      "Circuit A (high-speed)": 12.6,
      "Circuit B (street)": 13.5,
      "Circuit C (technical)": 11.8,
    },
  },
];

// Weights mirror the documented configurable ranking factors of the project.
export const predictionWeights = [
  { key: "circuit", label: "Circuit performance", weight: 0.3 },
  { key: "form", label: "Recent form", weight: 0.3 },
  { key: "qualifying", label: "Qualifying", weight: 0.15 },
  { key: "racecraft", label: "Racecraft", weight: 0.15 },
  { key: "strategy", label: "Strategy", weight: 0.1 },
] as const;

export type FactorKey = (typeof predictionWeights)[number]["key"];

const clamp = (value: number) => Math.max(0, Math.min(100, value));
const positionScore = (position: number) => clamp(((20 - position) / 19) * 100);

export function getFactorScores(
  driver: SampleDriver,
  circuit: F1Circuit,
): Record<FactorKey, number> {
  const points = driver.recentPoints.reduce((a, b) => a + b, 0);
  return {
    circuit: positionScore(driver.circuitAvgFinish[circuit]),
    form: clamp((points / (25 * driver.recentPoints.length)) * 100),
    qualifying: positionScore(driver.avgQualifying),
    racecraft: clamp(((driver.avgPositionsGained + 3) / 6) * 100),
    strategy: clamp(((4 - driver.avgPitStopSeconds) / 2) * 100),
  };
}

export function getPredictionScore(driver: SampleDriver, circuit: F1Circuit) {
  const scores = getFactorScores(driver, circuit);
  return predictionWeights.reduce((sum, f) => sum + scores[f.key] * f.weight, 0);
}

export function rankDrivers(circuit: F1Circuit) {
  return sampleDrivers
    .map((driver) => ({ driver, score: getPredictionScore(driver, circuit) }))
    .sort((a, b) => b.score - a.score);
}

export function getDriverStats(driver: SampleDriver) {
  const n = driver.recentFinishes.length;
  return {
    wins: driver.recentFinishes.filter((p) => p === 1).length,
    podiums: driver.recentFinishes.filter((p) => p <= 3).length,
    points: driver.recentPoints.reduce((a, b) => a + b, 0),
    avgFinish: +(driver.recentFinishes.reduce((a, b) => a + b, 0) / n).toFixed(1),
  };
}
