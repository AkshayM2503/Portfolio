import resumeAsset from "@/assets/Akshay_Murali_CV_final.pdf.asset.json";

export const portfolio = {
  name: "Akshay Murali",
  shortName: "Akshay M",
  initials: "AM",
  role: "M.Sc. Computer Science Student · Data Analyst · BI",
  location: "Kaiserslautern, Germany",
  email: "25akshay.m@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshay-m-009a7b257",
  github: "https://github.com/AkshayM2503",
  resume: resumeAsset.url,
  tagline:
    "Data-focused Computer Science graduate and M.Sc. student turning complex datasets into useful analysis, dashboards, and actionable insights.",
  typingRoles: [
    "Data Analyst",
    "Business Intelligence Analyst",
    "Computer Science Student",
    "Python Developer",
  ],
  about: [
    "I’m a Computer Science graduate and M.Sc. Computer Science student at Rheinland-Pfälzische Technische Universität (RPTU) in Kaiserslautern, Germany.",
    "My experience spans data analysis, Python development, machine learning, and AI-powered applications. I build data pipelines, analyze large datasets, and develop dashboards that turn findings into actionable insights.",
    "I’m interested in Data Analyst and Business Intelligence opportunities.",
  ],
  stats: [
    { value: 1.26, suffix: "M+", label: "F1 Records Analyzed" },
    { value: 6, suffix: "M+", label: "Transactions Analyzed" },
    { value: 92, suffix: "%", label: "Fraud Model Recall" },
    { value: 60, suffix: "%", label: "Less Manual Data Preparation" },
  ],
  skills: [
    {
      category: "Programming",
      icon: "Code2",
      items: ["Python", "SQL", "C", "C++"],
    },
    {
      category: "Data Analysis & Visualization",
      icon: "BarChart3",
      items: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Plotly", "Data Cleaning"],
    },
    {
      category: "Machine Learning",
      icon: "Brain",
      items: ["Scikit-learn", "Random Forest", "XGBoost", "SVM", "Feature Engineering", "Model Evaluation", "Predictive Analytics"],
    },
    {
      category: "Databases & Tools",
      icon: "Terminal",
      items: ["PostgreSQL", "Git", "Streamlit", "REST APIs"],
    },
  ],
  experience: [
    {
      company: "Viral Trade",
      role: "Software Development Intern",
      period: "Aug 2025 — Jan 2026",
      startDate: "2025-08",
      endDate: "2026-01",
      bullets: [
        "Developed REST APIs and data pipelines for efficient backend–frontend integration.",
        "Improved data manipulation and visualization through enhanced backend systems.",
        "Applied modular coding practices and version control to improve workflows and collaboration.",
      ],
      stack: ["REST APIs", "Data Pipelines", "Git"],
    },
    {
      company: "Altimetrik",
      role: "Data Science Intern",
      period: "Sep 2024 — Feb 2025",
      startDate: "2024-09",
      endDate: "2025-02",
      bullets: [
        "Developed a GPT-4-powered Streamlit synthetic data generator, reducing manual data preparation time by 60%.",
        "Cleaned, engineered, and analyzed unstructured datasets to identify trends and improve models.",
        "Built dashboards and automated data pipelines with data engineers and business analysts.",
      ],
      stack: ["Python", "Streamlit", "GPT-4", "Data Pipelines", "Dashboards"],
    },
  ],
  projects: [
    {
      title: "Formula 1 Data Analytics Dashboard",
      tag: "Data Analytics · Power BI",
      description:
        "Built an end-to-end dashboard with Python, Pandas, PostgreSQL, SQL, and Power BI to analyze 1.26M+ historical records across 14 relational tables. Designed 18 SQL views using joins, aggregations, CTEs, and window functions, plus a configurable driver-ranking model weighted across circuit performance (30%), recent form (30%), qualifying (15%), racecraft (15%), and strategy (10%).",
      tech: ["Python", "Pandas", "PostgreSQL", "SQL", "Power BI"],
      accent: "from-violet-500 via-fuchsia-500 to-cyan-400",
      icon: "TrendingUp",
      featured: true,
    },
    {
      title: "Weather Forecast Accuracy Analytics",
      tag: "Data Pipeline · Forecast Analytics",
      description:
        "Created a Python and Open-Meteo ingestion pipeline backed by PostgreSQL for 10 Indian cities. Automated storage and MAE/RMSE calculations across forecast lead times, then built an interactive Streamlit dashboard with Plotly to compare city-level accuracy and monitor data quality.",
      tech: ["Python", "Open-Meteo API", "PostgreSQL", "Streamlit", "Plotly"],
      accent: "from-cyan-400 via-sky-500 to-violet-500",
      icon: "CloudSun",
      featured: true,
    },
    {
      title: "Fraud Detection Model",
      tag: "Machine Learning · Data Pipeline",
      description:
        "Built a Pandas and SQL pipeline for more than 6 million financial transactions. Optimized Random Forest, XGBoost, and SVM models to achieve 92% recall, with reusable preprocessing, feature engineering, and evaluation workflows.",
      tech: ["Python", "Pandas", "SQL", "Random Forest", "XGBoost", "SVM"],
      accent: "from-emerald-400 via-cyan-400 to-violet-500",
      icon: "ShieldCheck",
      featured: true,
    },
  ],
  achievements: [
    {
      title: "Patent Holder",
      detail: "MedConnect — An Automated Drug Dispensing Machine.",
      icon: "Award",
    },
    {
      title: "Best Project Award",
      detail: "MedConnect, recognized for innovation and technical implementation.",
      icon: "Trophy",
    },
    {
      title: "Ideation Manager · eDC",
      detail: "Led Ideathons, Shark Tank JIT, and innovation events.",
      icon: "Lightbulb",
    },
  ],
  education: [
    {
      school: "Rheinland-Pfälzische Technische Universität (RPTU)",
      degree: "M.Sc. Computer Science (Informatik)",
      location: "Kaiserslautern, Germany",
    },
    {
      school: "Jyothy Institute of Technology",
      degree: "B.E. Computer Science and Engineering",
      cgpa: "8.18/10",
      location: "Bengaluru, India",
    },
  ],
  languages: ["English", "German (A1)"],
};

export type Portfolio = typeof portfolio;