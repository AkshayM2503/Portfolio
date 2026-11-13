## Goal

Restructure the portfolio Projects section into concise overview cards and dedicated detail pages, preserving the current visual identity and unrelated sections.

## Approach

- Move all five requested projects into a structured data file with slugs, concise summaries, configurable repository URLs, dashboard embed URLs, and gallery image lists. Include only details supported by existing portfolio data.
- Update homepage cards to show each title, a short overview, selected technologies, and a clear “View Project” link. Do not put full resume descriptions on the homepage.
- Add a reusable project detail template and direct-loadable `/projects/$slug` pages with project introduction, overview, documented features and implementation, results, Back to Projects navigation, and unique metadata.
- Build a large responsive dashboard/application viewer that supports an interactive embed URL or multiple supplied images, preserves image proportions, and allows image enlargement. Never show stock imagery or fabricated dashboard visuals.
- Show GitHub buttons only when a valid repository URL is configured; omit live demos. Do not invent technical details, metrics, or achievements.
- Screenshots, embed URLs, and project-specific repository URLs are not available yet. Leave configurable fields empty and use a transparent text-only preview state until actual materials are supplied.
- Keep the existing root portfolio route and all non-project sections unchanged.

## Technical details

- Use TanStack file-based routing and existing React, Tailwind, Framer Motion, and icon patterns.
- Keep project content in `src/data/projects.ts`; add a reusable detail template and `/projects/$slug` route with not-found handling, direct URL support, and unique SEO metadata.
- Configure each project with optional embed URL, image list, and GitHub URL; preserve image aspect ratios and provide accessible image enlargement/gallery navigation when assets exist.
- Use the five requested projects: Weather Forecast Accuracy Analytics, Formula 1 Analytics and Driver Prediction, Synthetic Data Generator, Fraud Detection System, and Smart Medicine Dispensing ATM.
