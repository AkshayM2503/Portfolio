## Goal

Restructure the portfolio Projects section into concise overview cards and dedicated detail pages, preserving the current visual identity and unrelated sections.

## Approach

- Move all five requested projects into a structured project-data file with slugs, concise summaries, documented technologies, and only verified overview, implementation, and results content.
- Update the homepage cards to show a project preview when supplied, title, short summary, selected technologies, and a clear “View Project” link.
- Add a reusable project detail template and direct-loadable `/projects/$slug` pages with consistent sections, a Back to Projects link, image gallery support, and project-specific metadata.
- Include GitHub buttons only for verified project repository URLs; omit live demos. Do not invent project images, implementations, metrics, or awards.
- The project folder currently has no screenshots or project-specific repository URLs. Add them when supplied; leave those optional fields empty until then.
- Keep the existing root portfolio route and all non-project sections unchanged.

## Technical details

- Use TanStack file-based routing and the existing React, Tailwind, Framer Motion, and icon patterns.
- Keep shared project content in `src/data/projects.ts`; add a detail template and `/projects/$slug` route with not-found handling and unique SEO metadata.
- Preserve image aspect ratios and provide an accessible, responsive gallery that can enlarge supplied images.
- Use the five requested projects: Weather Forecast Accuracy Analytics, Formula 1 Analytics and Driver Prediction, Synthetic Data Generator, Fraud Detection System, and Smart Medicine Dispensing ATM.
