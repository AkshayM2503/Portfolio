# Project memory

## Product intent & audience

- Personal portfolio website built with Vite + React + TypeScript.
- Showcases projects (descriptions, galleries, architecture diagrams, interactive demos), resume functionality, and a contact section.
- Audience: recruiters, potential employers, collaborators.

## Brand personality & voice

- Professional, modern, polished presentation.
- Contact section copy is helpful and transparent (e.g., setup notice when EmailJS unconfigured, no fake success states).

## Visual design & UX direction

- Glassmorphism aesthetic throughout the portfolio; new UI must match existing styling.
- Subtle hover effects and transitions; polished, modern feel.
- Fully responsive: desktop, tablet, mobile.
- Accessibility: keyboard navigation, appropriate focus states, inline validation errors.
- Contact section patterns:
  - Required fields with inline validation (Name, Email w/ format check, Subject, Message).
  - Loading state on submit button; duplicate submission prevention.
  - Success banner only after real confirmation; form clears on success.
  - Red error banner on failure.
  - Copy-to-clipboard button for email address; existing LinkedIn/GitHub links.

## Decisions, constraints & rationale

- EmailJS chosen for contact form delivery (client-side only, no backend/database).
- EmailJS config via Vite env vars: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
- Public Key is public-safe (not a secret); still env-based for easy config.
- `.env` is git-ignored; `.env.example` provided as template.
- If EmailJS config missing, show a setup notice instead of a fake success — never invent credentials or simulate sends.
- Portfolio contact info (email, LinkedIn, GitHub, location) sourced from existing portfolio data; do not invent contact details.
- Preserve all existing sections, styling, navigation, and functionality; only modify contact section and strictly necessary files.
- Do not commit or push changes unless explicitly requested.

## Open questions & assumptions

- Portfolio data location for contact info assumed centralized/already present (not modified this turn).
- EmailJS credentials not yet provided by user; setup notice shown until `.env` is created.
- Template variable names expected: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`.