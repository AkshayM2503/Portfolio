// Imports
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

// Types
export type ProjectImage = {
  src: string;
  alt: string;
  label?: string;
  description?: string;
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
  architectureImage?: ProjectImage;
  dashboardDownload: { url: string; filename: string } | null;
};

// Project data
export const projects: ProjectDefinition[] = [
  // Weather Forecast Accuracy Analytics
  {
    slug: "weather-forecast-accuracy-analytics",
    title: "Weather Forecast Accuracy Analytics",
    category: "Data Pipeline · Forecast Analytics",
    summary: "A forecasting analytics workflow comparing accuracy across 10 Indian cities and multiple forecast lead times.",
    description: "A Python and Open-Meteo pipeline with PostgreSQL storage and an interactive dashboard for comparing forecast accuracy.",
    overview: "The project ingests weather forecasts for 10 Indian cities, stores the data in PostgreSQL, and calculates MAE and RMSE across forecast lead times. A Streamlit dashboard with Plotly compares city-level accuracy and monitors data quality.",
    objectives: [
      "Compare forecast accuracy across 10 Indian cities and forecast lead times.",
      "Monitor data quality alongside forecast accuracy."
    ],
    features: [
      "Python and Open-Meteo forecast ingestion pipeline.",
      "PostgreSQL-backed forecast storage.",
      "Automated MAE and RMSE calculations across forecast lead times.",
      "Interactive Streamlit and Plotly dashboard for city-level comparisons and data-quality monitoring."
    ],
    implementation: [
      "Python handles ingestion and accuracy calculations, with PostgreSQL for data storage.",
      "MAE and RMSE are calculated across forecast lead times; Streamlit and Plotly present the comparisons."
    ],
    technologies: ["Python", "Open-Meteo API", "PostgreSQL", "Streamlit", "Plotly"],
    results: [],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [
      {
        src: "/projects/weather/Page_1.PNG",
        label: "Overview",
        description: "Weather Forecast Accuracy dashboard overview summarizing overall Mean Absolute Error (MAE) and Root Mean Square Error (RMSE) across 10 Indian cities, highlighting that forecast error increases with longer prediction lead times.",
        alt: "Weather Forecast Accuracy dashboard overview."
      },
      {
        src: "/projects/weather/Page_2.PNG",
        label: "Forecast Accuracy Analysis",
        description: "Forecast Accuracy Analysis dashboard view comparing 7‑day rolling forecast errors across individual cities, prediction horizons, and verification dates alongside 30‑day rolling averages.",
        alt: "Forecast accuracy analysis dashboard."
      },
      {
        src: "/projects/weather/Page_3.PNG",
        label: "Forecast Monitoring & Data Quality",
        alt: "Forecast Monitoring & Data Quality dashboard tracking pipeline ingestion health, run statuses, error logs, and the distribution of forecast records across various API and historical sources."
      },
      {
        src: "/projects/weather/Page_4.PNG",
        label: "City‑Wise Data Quality",
        description: "City‑Wise Data Quality dashboard presenting city‑level breakdowns of forecast versus observation record counts, Mean Absolute Error, lead‑time accuracy, and total verified forecasts.",
        alt: "City‑wise data quality dashboard."
      },
      {
        src: "/projects/weather/automated_pipeline.PNG",
        description: "Windows Task Scheduler interface showing four scheduled automated tasks for hourly weather forecast ingestion, verification, observation ingestion, and Power BI refreshing, all with successful completion statuses.",
        label: "Automated Pipeline",
        alt: "Windows Task Scheduler interface showing four scheduled automated tasks for hourly weather forecast ingestion, verification, observation ingestion, and Power BI refreshing, all with successful completion statuses."
      },
      {
        src: "/projects/weather/postgresql_database.PNG",
        label: "PostgreSQL Database Schema",
        alt: "PostgreSQL database schema tree for weather_analytics illustrating the underlying dimensional and fact tables alongside analytical views used to structure the weather data."
      },
      {
        src: "/projects/weather/Weather Forecast Data Pipeline Architecture.png",
        label: "Python Pipeline Execution",
        alt: "Terminal log snippet showing successful execution of an automated Python verification script that inserted 1,416 new verification records by comparing Open‑Meteo forecasts against ERA5 reanalysis observations."
      }
    ],
    dashboardDownload: {
      url: weatherDashboardAsset.url,
      filename: weatherDashboardAsset.original_filename
    }
    // No architectureImage for Weather project
  },
  // Formula 1 Analytics and Driver Prediction
  {
    slug: "formula-1-analytics-driver-prediction",
    title: "Formula 1 Analytics and Driver Prediction",
    category: "Data Analytics · Power BI",
    summary: "An analytics dashboard for 1.26M+ historical Formula 1 records, with a configurable driver-ranking model.",
    description: "An end-to-end Formula 1 analytics project combining relational data, SQL analysis, Power BI, and configurable driver rankings.",
    overview: "The dashboard analyzes more than 1.26 million historical records across 14 relational tables. Eighteen SQL views support analysis, and a configurable driver-ranking model weights circuit performance, recent form, qualifying, racecraft, and strategy.",
    objectives: [
      "Analyze historical Formula 1 data through a Power BI dashboard.",
      "Rank drivers using configurable weights across the documented performance factors."
    ],
    features: [
      "Analysis of 1.26M+ historical records across 14 relational tables.",
      "18 SQL views using joins, aggregations, CTEs, and window functions.",
      "Configurable driver-ranking weights: circuit performance (30%), recent form (30%), qualifying (15%), racecraft (15%), and strategy (10%)."
    ],
    implementation: [
      "Python and Pandas work with PostgreSQL and SQL to prepare and analyze the historical data.",
      "Power BI presents the analysis; SQL views use joins, aggregations, CTEs, and window functions.",
      "The driver-ranking model uses configurable weights across five documented factors."
    ],
    technologies: ["Python", "Pandas", "PostgreSQL", "SQL", "Power BI"],
    results: [
      "Analyzed more than 1.26 million historical records across 14 relational tables.",
      "Designed 18 SQL views for the analytics workflow."
    ],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [
      {
        src: "/projects/f1/media_1795358999340_00c93e7c.jpg",
        label: "Overview",
        description: "Explore the main Formula 1 dashboard with season and circuit filters, key performance indicators, grid-versus-finish position analysis, driver performance and historical race trends.",
        alt: "Main Formula 1 analytics dashboard."
      },
      {
        src: "/projects/f1/media_1795358999500_a1eb0b1f.jpg",
        label: "Driver Analytics",
        description: "Compare driver performance through race starts, wins, podiums, average finishing positions, qualifying positions and position gains.",
        alt: "Formula 1 driver performance analytics."
      },
      {
        src: "/projects/f1/media_1795358999492_e9ad6d00.jpg",
        label: "Constructor Analytics",
        description: "Analyse constructor performance through team comparisons, championship points, race wins and podium finishes.",
        alt: "Formula 1 constructor analytics dashboard."
      },
      {
        src: "/projects/f1/media_1795358999477_45f14d31.jpg",
        label: "Circuit Insights",
        description: "Explore constructor wins, driver position gains and average qualifying positions across different Formula 1 circuits.",
        alt: "Formula 1 circuit insights dashboard."
      },
      {
        src: "/projects/f1/media_1795358999476_4df3c521.jpg",
        label: "Race Strategy",
        description: "Examine pit stop frequency, pit stop distribution and average finishing positions based on the number of pit stops.",
        alt: "Formula 1 race strategy and pit stop analytics."
      },
      {
        src: "/projects/f1/media_1795358999450_3d9457c7.jpg",
        label: "Recent Form",
        description: "Track drivers' performances across their latest five races, including recent points, wins, finishing trends and performance classifications.",
        alt: "Formula 1 recent driver performance dashboard."
      },
      {
        src: "/projects/f1/media_1795358999456_6745e3ca.jpg",
        label: "Prediction Model",
        description: "Understand driver prediction scores using circuit performance, recent form and weighted prediction factors.",
        alt: "Formula 1 driver prediction model dashboard."
      },
      {
        src: "/projects/f1/media_1795358999420_51961b74.png",
        label: "Race Prediction",
        description: "View predicted driver rankings, the predicted race winner, overall prediction scores and contributing performance factors.",
        alt: "Formula 1 race prediction dashboard."
      }
    ],
    dashboardDownload: {
      url: f1DashboardAsset.url,
      filename: f1DashboardAsset.original_filename
    },
    architectureImage: {
      src: "/projects/f1/media_1795358999479_3315a32b.jpg",
      label: "System Architecture",
      alt: "Formula 1 analytics pipeline covering historical data processing, PostgreSQL storage, SQL analytics, driver prediction and Power BI visualisation."
    }
  },
  // Synthetic Data Generator
  {
    slug: "synthetic-data-generator",
    title: "Synthetic Data Generator",
    category: "Data Science · Application",
    summary: "A GPT-4-powered Streamlit application developed to reduce manual data preparation time.",
    description: "A synthetic data generator built with GPT-4 and Streamlit during a data science internship.",
    overview: "Developed at Altimetrik, this GPT-4-powered Streamlit synthetic data generator was created to reduce manual data preparation time. The documented outcome was a 60% reduction in manual preparation time.",
    objectives: ["Reduce manual data preparation time with a synthetic data generator."],
    features: ["GPT-4-powered synthetic data generation.", "Streamlit application interface."],
    implementation: ["The documented implementation uses GPT-4 and Streamlit."],
    technologies: ["Python", "Streamlit", "GPT-4"],
    results: ["Reduced manual data preparation time by 60%."],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [
    {
      src: "/projects/synthetic-data/Gemini_Generated_Image_7t5a8t7t5a8t7t5a.png",
      label: "Overview",
      description: "Gemini-generated preview image showcasing the Synthetic Data Generator dashboard.",
      alt: "Synthetic Data Generator dashboard preview"
    }
  ],
    dashboardDownload: null
  },
  // Fraud Detection System
  {
    slug: "fraud-detection-system",
    title: "Fraud Detection System",
    category: "Machine Learning · Data Pipeline",
    summary: "A transaction-analysis pipeline using machine-learning models to detect fraud across more than 6 million transactions.",
    description: "A reusable data and model-evaluation workflow applying Random Forest, XGBoost, and SVM to financial transactions.",
    overview: "The project built a Pandas and SQL pipeline for more than 6 million financial transactions. Random Forest, XGBoost, and SVM models were optimized with reusable preprocessing, feature engineering, and evaluation workflows.",
    objectives: ["Analyze more than 6 million financial transactions for fraud detection.", "Evaluate machine-learning models using reusable preprocessing and feature-engineering workflows."],
    features: ["Pandas and SQL transaction-analysis pipeline.", "Random Forest, XGBoost, and SVM model optimization.", "Reusable preprocessing, feature engineering, and model evaluation workflows."],
    implementation: ["Pandas and SQL support the transaction pipeline.", "Random Forest, XGBoost, and SVM models were optimized and evaluated using reusable workflows."],
    technologies: ["Python", "Pandas", "SQL", "Random Forest", "XGBoost", "SVM"],
    results: ["Analyzed more than 6 million transactions.", "Achieved 92% fraud-model recall."],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [
    {
      src: "/projects/fraud-detection/Gemini_Generated_Image_8lpm58lpm58lpm58.png",
      label: "Overview",
      description: "Gemini-generated preview image showcasing the Synthetic Data Generator dashboard.",
      alt: "Synthetic Data Generator dashboard preview"
    }
  ],
    dashboardDownload: null
  },
  // Smart Medicine Dispensing ATM
  {
    slug: "smart-medicine-dispensing-atm",
    title: "Smart Medicine Dispensing ATM",
    category: "Patent · Award-winning Project",
    summary: "MedConnect, an automated drug dispensing machine project recognized with a patent and Best Project Award.",
    description: "An automated drug dispensing machine project documented as MedConnect.",
    overview: "The available portfolio information identifies MedConnect as an automated drug dispensing machine. It is documented as a patented project and received a Best Project Award.",
    objectives: ["Develop an automated drug dispensing machine."],
    features: [],
    implementation: [],
    technologies: [],
    results: [
      "Patent holder for MedConnect — An Automated Drug Dispensing Machine.",
      "Best Project Award for MedConnect, recognized for innovation and technical implementation."
    ],
    repositoryUrl: "",
    dashboardEmbedUrl: "",
    dashboardImages: [
    {
      src: "/projects/fraud-detection/Gemini_Generated_Image_8lpm58lpm58lpm58.png",
      label: "Overview",
      description: "Gemini-generated preview image showcasing the Synthetic Data Generator dashboard.",
      alt: "Synthetic Data Generator dashboard preview"
    }
  ],
    dashboardDownload: null
  }
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
    const url = new URL(value);
    return url.protocol === "https:" && !!url.host;
  } catch {
    return false;
  }
}