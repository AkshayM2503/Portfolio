export const portfolio = {
  name: "Akshay Murali",
  shortName: "Akshay M",
  initials: "AM",
  role: "Data Scientist · Machine Learning · Python Developer",
  location: "Bangalore, India",
  email: "25akshay.m@gmail.com",
  phone: "+91 99014 04592",
  linkedin: "https://www.linkedin.com/in/akshay-m-009a7b257",
  github: "https://github.com/AkshayM2503",
  resume: "/Akshay_Murali_Resume.pdf",
  tagline:
    "Transforming complex data into intelligent solutions through analytics, machine learning, and software engineering.",
  typingRoles: [
    "Data Scientist",
    "Machine Learning Enthusiast",
    "Python Developer",
    "Software Engineer",
    "Data Analyst",
  ],
  about: [
    "Data-driven Computer Science graduate with hands-on experience in analyzing large datasets, building predictive models, and developing AI-powered applications.",
    "Proven ability to extract insights, automate workflows, and improve decision-making through Python, SQL, and machine learning.",
    "Experienced in delivering scalable solutions — from fraud detection pipelines to intelligent IoT systems — that enhance efficiency and solve real-world problems.",
  ],
  stats: [
    { value: 6, suffix: "M+", label: "Transactions Analyzed" },
    { value: 92, suffix: "%", label: "Fraud Detection Recall" },
    { value: 60, suffix: "%", label: "Reduction in Data Prep Time" },
    { value: 30, suffix: "+", label: "Students Mentored" },
  ],
  skills: [
    {
      category: "Programming",
      icon: "Code2",
      items: ["Python", "SQL"],
    },
    {
      category: "Data Science & ML",
      icon: "Brain",
      items: [
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "Machine Learning",
        "Feature Engineering",
        "Data Analysis",
      ],
    },
    {
      category: "Analytics & BI",
      icon: "BarChart3",
      items: ["Power BI", "Matplotlib", "Data Visualization", "Dashboard Design", "Reporting"],
    },
    {
      category: "Development",
      icon: "Terminal",
      items: ["Git", "GitHub", "REST APIs", "Streamlit"],
    },
    {
      category: "Soft Skills",
      icon: "Users",
      items: ["Problem Solving", "Leadership", "Teamwork", "Communication"],
    },
  ],
  experience: [
    {
      company: "Viral Trade",
      role: "Software Development Intern",
      period: "Aug 2025 — Present",
      bullets: [
        "Developing REST APIs and data pipelines to streamline backend–frontend integration and elevate data visualization workflows.",
        "Optimizing performance and data handling using modular coding practices and version control for smoother team collaboration.",
      ],
      stack: ["Python", "REST APIs", "Git", "Data Pipelines"],
    },
    {
      company: "Altimetrik",
      role: "Data Science Intern",
      period: "Sep 2024 — Feb 2025",
      bullets: [
        "Automated dataset creation by developing a GPT-4-powered Streamlit tool, cutting manual data preparation time by 60%.",
        "Cleaned, engineered, and analyzed large unstructured datasets to surface performance trends and improve model accuracy.",
        "Collaborated with data engineers and analysts to design end-to-end data workflows for visualization and predictive modeling.",
        "Built dashboards and reports translating analytical findings into actionable cross-functional insights.",
      ],
      stack: ["Python", "Streamlit", "GPT-4", "Pandas", "Power BI"],
    },
  ],
  projects: [
    {
      title: "Fraud Detection System",
      tag: "Machine Learning · Data Pipeline",
      description:
        "Scalable fraud-detection pipeline processing 6M+ financial transactions. Trained Random Forest, XGBoost, and SVM models reaching 92% recall, with modular preprocessing, feature engineering, and evaluation for reproducible experimentation.",
      tech: ["Python", "Pandas", "SQL", "XGBoost", "Random Forest", "SVM", "Scikit-learn"],
      accent: "from-violet-500 via-fuchsia-500 to-cyan-400",
      icon: "ShieldCheck",
      featured: true,
    },
    {
      title: "MedConnect — Automated Drug Dispensing Machine",
      tag: "IoT · Patent · Award",
      description:
        "Smart medical dispensing system with QR authentication and intelligent motor control, reducing manual medication errors by 80%. Published patent and Best Project Award for innovation and technical implementation.",
      tech: ["Python", "IoT", "Embedded Systems", "Automation"],
      accent: "from-cyan-400 via-sky-500 to-violet-500",
      icon: "Stethoscope",
      featured: true,
    },
    {
      title: "Stock Market Analysis",
      tag: "Forecasting · Visualization",
      description:
        "Regression-based forecasting models predicting short-term price movements with strong correlation to actuals. Visualizations communicate volatility zones and sector-wise performance for investment insight.",
      tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
      accent: "from-emerald-400 via-cyan-400 to-violet-500",
      icon: "TrendingUp",
      featured: true,
    },
  ],
  achievements: [
    {
      title: "Patent Holder",
      detail: "Published patent for MedConnect — Automated Drug Dispensing Machine.",
      icon: "Award",
    },
    {
      title: "Best Project Award",
      detail: "Recognized for innovation and technical implementation on MedConnect.",
      icon: "Trophy",
    },
    {
      title: "Teaching Assistant",
      detail: "Conducted Python workshops mentoring 30+ peers.",
      icon: "GraduationCap",
    },
    {
      title: "Ideation Manager · eDC",
      detail: "Led Shark Tank JIT, Ideathons, and campus innovation events.",
      icon: "Lightbulb",
    },
  ],
  education: {
    school: "Jyothy Institute of Technology",
    degree: "Bachelor of Engineering",
    specialization: "Computer Science Engineering",
    period: "2021 — 2025",
    cgpa: "8.18",
    location: "Bangalore, India",
  },
  certifications: [
    {
      title: "100 Days of Code — The Complete Python Pro Bootcamp",
      issuer: "Udemy",
      year: "2023",
    },
    {
      title: "Team Software Engineering with AI",
      issuer: "Coursera",
      year: "2024",
    },
    {
      title: "Software Engineering Virtual Experience",
      issuer: "Forage",
      year: "2024",
    },
  ],
};

export type Portfolio = typeof portfolio;
