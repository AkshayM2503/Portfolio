import type { ComponentType } from "react";
import { WeatherDemo } from "./WeatherDemo";
import { F1Demo } from "./F1Demo";
import { SyntheticDataDemo } from "./SyntheticDataDemo";
import { FraudDemo } from "./FraudDemo";
import { MedConnectDemo } from "./MedConnectDemo";

const demosBySlug: Record<string, ComponentType> = {
  "weather-forecast-accuracy-analytics": WeatherDemo,
  "formula-1-analytics-driver-prediction": F1Demo,
  "synthetic-data-generator": SyntheticDataDemo,
  "fraud-detection-system": FraudDemo,
  "smart-medicine-dispensing-atm": MedConnectDemo,
};

export function ProjectDemo({ slug }: { slug: string }) {
  const Demo = demosBySlug[slug];
  return Demo ? <Demo /> : null;
}
