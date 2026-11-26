// Simulated sample data for the Weather Forecast Accuracy demo. Not real observations.
export const weatherCities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Kolkata",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
] as const;

export const weatherLeadTimes = [1, 3, 5, 7] as const;

export type WeatherCity = (typeof weatherCities)[number];
export type LeadTime = (typeof weatherLeadTimes)[number];

export type WeatherSample = {
  date: string;
  observed: number;
  forecast: number;
  error: number;
};

const sampleDates = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

// Base observed temperatures (°C) per city — illustrative values only.
const baseTemps: Record<WeatherCity, number[]> = {
  Delhi: [38.2, 39.1, 37.6, 36.8, 38.9, 40.2, 39.4],
  Mumbai: [31.4, 31.9, 30.8, 31.2, 32.0, 31.6, 30.9],
  Chennai: [35.6, 36.2, 35.1, 34.8, 36.4, 36.9, 35.7],
  Kolkata: [34.1, 33.6, 35.0, 34.4, 33.2, 34.8, 35.3],
  Bengaluru: [29.2, 28.6, 29.8, 30.1, 28.9, 29.4, 28.3],
  Hyderabad: [36.4, 37.1, 35.8, 36.9, 37.5, 36.2, 35.9],
  Ahmedabad: [39.0, 40.1, 39.6, 38.4, 40.6, 41.0, 39.8],
  Pune: [32.5, 33.1, 31.8, 32.9, 33.6, 32.2, 31.9],
  Jaipur: [38.8, 39.5, 40.2, 38.6, 39.9, 40.8, 39.1],
  Lucknow: [37.4, 38.2, 36.9, 37.8, 38.6, 39.0, 37.2],
};

// Deterministic pseudo-noise in [-1, 1] so the sample values stay stable between renders.
function noise(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

export function getWeatherSamples(city: WeatherCity, leadTime: LeadTime): WeatherSample[] {
  const cityIndex = weatherCities.indexOf(city);
  const spread = 0.5 + leadTime * 0.35;
  return baseTemps[city].map((observed, i) => {
    const forecast = +(observed + noise(cityIndex * 100 + leadTime * 10 + i) * spread).toFixed(1);
    return { date: sampleDates[i], observed, forecast, error: +(forecast - observed).toFixed(1) };
  });
}

export function getErrorMetrics(samples: WeatherSample[]) {
  if (samples.length === 0) return { mae: 0, rmse: 0, bias: 0 };
  const n = samples.length;
  const mae = samples.reduce((sum, s) => sum + Math.abs(s.error), 0) / n;
  const rmse = Math.sqrt(samples.reduce((sum, s) => sum + s.error ** 2, 0) / n);
  const bias = samples.reduce((sum, s) => sum + s.error, 0) / n;
  return { mae: +mae.toFixed(2), rmse: +rmse.toFixed(2), bias: +bias.toFixed(2) };
}
