import f1DashboardAsset from "@/assets/F1_Analytics_Dashboard.pbix.asset.json";
import weatherDashboardAsset from "@/assets/Weather_analytics.pbix.asset.json";
import f1Overview from "@/assets/projects/formula-1/01-overview.png.asset.json";
import f1DriverAnalytics from "@/assets/projects/formula-1/02-driver-analytics.png.asset.json";
import f1ConstructorAnalytics from "@/assets/projects/formula-1/03-constructor-analytics.png.asset.json";
import f1CircuitInsights from "@/assets/projects/formula-1/04-circuit-insights.png.asset.json";
import f1RaceStrategy from "@/assets/projects/formula-1/05-race-strategy.png.asset.json";
import f1RecentForm from "@/assets/projects/formula-1/06-recent-form.png.asset.json";
import f1PredictionModel from "@/assets/projects/formula-1/07-prediction-model.png.asset.json";
import f1RacePrediction from "@/assets/projects/formula-1/08-race-prediction.png.asset.json";

export type ProjectImage = {
  src: string;
  alt: string;
  label?: string;
};

export type ProjectDefinition = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  overview: string;
  objectives: string[];
  features: string[];
  implementation: string[];
  technologies: string[];
  results: string[];
  repositoryUrl: string;
  dashboardEmbedUrl: string;
  dashboardImages: ProjectImage[];
  dashboardDownload: { url: string; filename: string } | null;
};

// Add project screenshots under public/ and reference them from dashboardImages.
// Dashboard embeds and repositories remain blank until verified URLs are supplied.
export const projects: ProjectDefinition[] = [
  {
    slug: "weather-forecast-accuracy-analytics",
    title: "Weather Forecast Accuracy Analytics",
    category: "Data Pipeline · Forecast Analytics",
    summary:
      "A forecasting analytics workflow comparing accuracy across 10 Indian cities and multiple forecast lead times.",
    description:
      "A Python and Open-Meteo pipeline with PostgreSQL storage and an interactive dashboard for comparing forecast accuracy.",
    overview:
      "The project ingests weather forecasts for 10 Indian cities, stores the data in PostgreSQL, and calculates MAE and RMSE across forecast lead times. A Streamlit dashboard with Plotly compares city-level accuracy and monitors data quality.",
    objectives: [
      "Compare forecast accuracy across 10 Indian cities and forecast lead times.",
      "Monitor data quality alongside forecast accuracy.",
    ],
    features: [
      "Python and Open-Meteo forecast ingestion pipeline.",
      "PostgreSQL-backed forecast storage.",
      "Automated MAE and RMSE calculations across forecast lead times.",
      "Interactive Streamlit and Plotly dashboard for city-level comparisons and data-quality monitoring.",
    ],
    implementation: [
      "Python handles ingestion and accuracy calculations, with PostgreSQL for data storage.",
      "MAE and RMSE are calculated across forecast lead times; Streamlit and Plotly present the comparisons.",
    ],
    technologies: ["Python", "Open-Meteo API", "PostgreSQL", "Streamlit", "Plotly"],
    results: [],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [],
    dashboardDownload: {
      url: weatherDashboardAsset.url,
      filename: weatherDashboardAsset.original_filename,
    },
  },
  {
    slug: "formula-1-analytics-driver-prediction",
    title: "Formula 1 Analytics and Driver Prediction",
    category: "Data Analytics · Power BI",
    summary:
      "An analytics dashboard for 1.26M+ historical Formula 1 records, with a configurable driver-ranking model.",
    description:
      "An end-to-end Formula 1 analytics project combining relational data, SQL analysis, Power BI, and configurable driver rankings.",
    overview:
      "The dashboard analyzes more than 1.26 million historical records across 14 relational tables. Eighteen SQL views support analysis, and a configurable driver-ranking model weights circuit performance, recent form, qualifying, racecraft, and strategy.",
    objectives: [
      "Analyze historical Formula 1 data through a Power BI dashboard.",
      "Rank drivers using configurable weights across the documented performance factors.",
    ],
    features: [
      "Analysis of 1.26M+ historical records across 14 relational tables.",
      "18 SQL views using joins, aggregations, CTEs, and window functions.",
      "Configurable driver-ranking weights: circuit performance (30%), recent form (30%), qualifying (15%), racecraft (15%), and strategy (10%).",
    ],
    implementation: [
      "Python and Pandas work with PostgreSQL and SQL to prepare and analyze the historical data.",
      "Power BI presents the analysis; SQL views use joins, aggregations, CTEs, and window functions.",
      "The driver-ranking model uses configurable weights across five documented factors.",
    ],
    technologies: ["Python", "Pandas", "PostgreSQL", "SQL", "Power BI"],
    results: [
      "Analyzed more than 1.26 million historical records across 14 relational tables.",
      "Designed 18 SQL views for the analytics workflow.",
    ],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [
      { src: f1Overview.url, alt: "Formula 1 analytics dashboard overview", label: "Overview" },
      {
        src: f1DriverAnalytics.url,
        alt: "Formula 1 driver analytics dashboard with driver performance and qualifying comparisons",
        label: "Driver Analytics",
      },
      {
        src: f1ConstructorAnalytics.url,
        alt: "Formula 1 constructor analytics dashboard with constructor performance and wins",
        label: "Constructor Analytics",
      },
      {
        src: f1CircuitInsights.url,
        alt: "Formula 1 circuit insights dashboard with constructor wins and circuit position gain",
        label: "Circuit Insights",
      },
      {
        src: f1RaceStrategy.url,
        alt: "Formula 1 race strategy dashboard with pit stop analysis",
        label: "Race Strategy",
      },
      {
        src: f1RecentForm.url,
        alt: "Formula 1 recent form dashboard with recent driver results and trends",
        label: "Recent Form",
      },
      {
        src: f1PredictionModel.url,
        alt: "Formula 1 prediction model dashboard with prediction score breakdown and factor weights",
        label: "Prediction Model",
      },
      {
        src: f1RacePrediction.url,
        alt: "Formula 1 race prediction dashboard with predicted driver rankings",
        label: "Race Prediction",
      },
    ],
    dashboardDownload: {
      url: f1DashboardAsset.url,
      filename: f1DashboardAsset.original_filename,
    },
  },
  {
    slug: "synthetic-data-generator",
    title: "Synthetic Data Generator",
    category: "Data Science · Application",
    summary:
      "A GPT-4-powered Streamlit application developed to reduce manual data preparation time.",
    description:
      "A synthetic data generator built with GPT-4 and Streamlit during a data science internship.",
    overview:
      "Developed at Altimetrik, this GPT-4-powered Streamlit synthetic data generator was created to reduce manual data preparation time. The documented outcome was a 60% reduction in manual preparation time.",
    objectives: ["Reduce manual data preparation time with a synthetic data generator."],
    features: ["GPT-4-powered synthetic data generation.", "Streamlit application interface."],
    implementation: ["The documented implementation uses GPT-4 and Streamlit."],
    technologies: ["Python", "Streamlit", "GPT-4"],
    results: ["Reduced manual data preparation time by 60%."],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [],
    dashboardDownload: null,
  },
  {
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    category: "Machine Learning · Data Pipeline",
    summary:
      "A transaction-analysis pipeline using machine-learning models to detect fraud across more than 6 million transactions.",
    description:
      "A reusable data and model-evaluation workflow applying Random Forest, XGBoost, and SVM to financial transactions.",
    overview:
      "The project built a Pandas and SQL pipeline for more than 6 million financial transactions. Random Forest, XGBoost, and SVM models were optimized with reusable preprocessing, feature engineering, and evaluation workflows.",
    objectives: [
      "Analyze more than 6 million financial transactions for fraud detection.",
      "Evaluate machine-learning models using reusable preprocessing and feature-engineering workflows.",
    ],
    features: [
      "Pandas and SQL transaction-analysis pipeline.",
      "Random Forest, XGBoost, and SVM model optimization.",
      "Reusable preprocessing, feature engineering, and model evaluation workflows.",
    ],
    implementation: [
      "Pandas and SQL support the transaction pipeline.",
      "Random Forest, XGBoost, and SVM models were optimized and evaluated using reusable workflows.",
    ],
    technologies: ["Python", "Pandas", "SQL", "Random Forest", "XGBoost", "SVM"],
    results: ["Analyzed more than 6 million transactions.", "Achieved 92% fraud-model recall."],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [],
    dashboardDownload: null,
  },
  {
    slug: "smart-medicine-dispensing-atm",
    title: "Smart Medicine Dispensing ATM",
    category: "Patent · Award-winning Project",
    summary:
      "MedConnect, an automated drug dispensing machine project recognized with a patent and Best Project Award.",
    description: "An automated drug dispensing machine project documented as MedConnect.",
    overview:
      "The available portfolio information identifies MedConnect as an automated drug dispensing machine. It is documented as a patented project and received a Best Project Award.",
    objectives: ["Develop an automated drug dispensing machine."],
    features: [],
    implementation: [],
    technologies: [],
    results: [
      "Patent holder for MedConnect — An Automated Drug Dispensing Machine.",
      "Best Project Award for MedConnect, recognized for innovation and technical implementation.",
    ],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [],
    dashboardDownload: null,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function isValidGitHubRepositoryUrl(value: string) {
  try {
    const url = new URL(value);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    return (
      url.protocol === "https:" &&
      (url.hostname === "github.com" || url.hostname === "www.github.com") &&
      pathSegments.length >= 2
    );
  } catch {
    return false;
  }
}

export function isValidDashboardEmbedUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
