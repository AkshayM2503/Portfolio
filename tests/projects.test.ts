import { describe, expect, test } from "bun:test";
import {
  isValidDashboardEmbedUrl,
  isValidGitHubRepositoryUrl,
  projects,
} from "../src/data/projects";

describe("project data and optional media links", () => {
  test("contains the five requested projects", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "weather-forecast-accuracy-analytics",
      "formula-1-analytics-driver-prediction",
      "synthetic-data-generator",
      "fraud-detection-system",
      "smart-medicine-dispensing-atm",
    ]);
  });

  test("does not show repository links until valid repository URLs are supplied", () => {
    expect(projects.every((project) => project.repositoryUrl === "")).toBe(true);
    expect(isValidGitHubRepositoryUrl("https://github.com/owner/project")).toBe(true);
    expect(isValidGitHubRepositoryUrl("https://github.com/owner")).toBe(false);
    expect(isValidGitHubRepositoryUrl("javascript:alert(1)")).toBe(false);
  });

  test("provides the original Power BI downloads only for the matching projects", () => {
    expect(
      projects.find((project) => project.slug === "weather-forecast-accuracy-analytics")
        ?.dashboardDownload?.filename,
    ).toBe("Weather_analytics.pbix");
    expect(
      projects.find((project) => project.slug === "formula-1-analytics-driver-prediction")
        ?.dashboardDownload?.filename,
    ).toBe("F1_Analytics_Dashboard.pbix");
    expect(
      projects
        .filter((project) => !["weather-forecast-accuracy-analytics", "formula-1-analytics-driver-prediction"].includes(project.slug))
        .every((project) => project.dashboardDownload === null),
    ).toBe(true);
  });

  test("accepts secure dashboard embeds and rejects non-HTTPS URLs", () => {
    expect(isValidDashboardEmbedUrl("https://app.powerbi.com/view?r=example")).toBe(true);
    expect(isValidDashboardEmbedUrl("http://example.com/dashboard")).toBe(false);
    expect(isValidDashboardEmbedUrl("not-a-url")).toBe(false);
  });
});
