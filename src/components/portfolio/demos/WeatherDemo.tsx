import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getErrorMetrics,
  getWeatherSamples,
  weatherCities,
  weatherLeadTimes,
  type LeadTime,
  type WeatherCity,
} from "@/data/demos/weather";
import { DemoShell, SimulatedNotice } from "./DemoShell";
import { Field, Stat, fieldClass } from "./controls";
import { useTheme } from "@/lib/theme";

export function WeatherDemo() {
  const [city, setCity] = useState<WeatherCity>("Delhi");
  const [leadTime, setLeadTime] = useState<LeadTime>(1);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const samples = useMemo(() => getWeatherSamples(city, leadTime), [city, leadTime]);
  const metrics = getErrorMetrics(samples);

  return (
    <DemoShell
      title="Forecast accuracy explorer"
      intro="Pick a city and forecast lead time to see how the forecast compares with observed temperatures, and how the error is measured."
    >
      <SimulatedNotice>
        All temperatures here are <strong>simulated sample values</strong> for illustration. They
        are not Open-Meteo forecasts or real observations from the project pipeline.
      </SimulatedNotice>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="City" htmlFor="weather-city">
          <select
            id="weather-city"
            data-testid="weather-city-select"
            className={fieldClass}
            value={city}
            onChange={(e) => setCity(e.target.value as WeatherCity)}
          >
            {weatherCities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Forecast lead time" htmlFor="weather-lead">
          <div id="weather-lead" role="radiogroup" className="flex gap-2">
            {weatherLeadTimes.map((lt) => (
              <button
                key={lt}
                type="button"
                role="radio"
                aria-checked={lt === leadTime}
                data-testid={`weather-lead-${lt}`}
                onClick={() => setLeadTime(lt)}
                className={`h-9 flex-1 rounded-md border text-sm transition-colors ${
                  lt === leadTime
                    ? "border-primary bg-primary/15 text-foreground"
                    : "border-input text-muted-foreground hover:bg-surface"
                }`}
              >
                {lt} day{lt > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="MAE" value={`${metrics.mae} °C`} testId="weather-mae" accent />
        <Stat label="RMSE" value={`${metrics.rmse} °C`} testId="weather-rmse" />
        <Stat
          label="Mean bias"
          value={`${metrics.bias > 0 ? "+" : ""}${metrics.bias} °C`}
          testId="weather-bias"
        />
      </div>

      <div className="mt-6 h-64 w-full" data-testid="weather-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={samples} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.1)"} />
            <XAxis dataKey="date" tick={{ fill: isDark ? "#94A3B8" : "#64748B", fontSize: 12 }} />
            <YAxis
              domain={[(min: number) => Math.floor(min - 2), (max: number) => Math.ceil(max + 2)]}
              allowDecimals={false}
              tick={{ fill: isDark ? "#94A3B8" : "#64748B", fontSize: 12 }}
              unit="°"
            />
            <Tooltip
              contentStyle={{
                background: isDark ? "#111827" : "#ffffff",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(15,23,42,0.1)",
                borderRadius: 8,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="observed"
              name="Observed (sample)"
              stroke="#06B6D4"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast (sample)"
              stroke="#8B5CF6"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm" data-testid="weather-table">
          <thead className="text-xs text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-2 font-medium">Sample day</th>
              <th className="py-2 font-medium">Forecast</th>
              <th className="py-2 font-medium">Observed</th>
              <th className="py-2 font-medium">Error</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((s) => (
              <tr key={s.date} className="border-b border-border/60">
                <td className="py-2">{s.date}</td>
                <td className="py-2">{s.forecast} °C</td>
                <td className="py-2">{s.observed} °C</td>
                <td
                  className={`py-2 ${Math.abs(s.error) >= 2 ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {s.error > 0 ? "+" : ""}
                  {s.error} °C
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">
        MAE is the average size of the forecast errors; RMSE gives extra weight to large misses. In
        this sample, error is set to grow with lead time, mirroring the trend the project's
        dashboard examines.
      </p>
    </DemoShell>
  );
}
