## Goal

Build a recruiter-focused, production-ready personal portfolio for Akshay Murali on the project's existing TanStack Start + React + TypeScript stack. Design quality targets Linear / Stripe / Framer / Apple: dark theme, glassmorphism, smooth motion, strong typography.

The resume PDF is the source of truth. I'll parse it first and reconcile any conflicts with the brief (dates, role titles, project details, skills) before writing content.

## Stack & Architecture

- TanStack Start (existing scaffold) — keep `src/routes/__root.tsx` and replace `src/routes/index.tsx` with the portfolio.
- Tailwind v4 tokens in `src/styles.css`; add semantic tokens for the dark theme below.
- Framer Motion for entrance, scroll-reveal, stagger, hover micro-interactions.
- `react-intersection-observer` for counters + reveals.
- All content lives in `src/data/portfolio.ts`; every section renders from it.
- No backend, no auth, no Lovable Cloud — pure frontend.

## Design System (added to `src/styles.css`)

- Background `#0B1120`, foreground `#FFFFFF`, muted `#94A3B8`
- Primary `#8B5CF6`, secondary `#06B6D4`, accent `#A855F7`
- Surface `rgba(255,255,255,0.05)`, border `rgba(255,255,255,0.08)`
- Gradient + glow tokens: `--gradient-primary`, `--gradient-hero`, `--shadow-glow`, `--shadow-elegant`
- Fonts via `@fontsource`: Outfit (display) + Inter (body)
- Glass utility class using standard `backdrop-filter` only (per Tailwind v4 guidance)

## Sections (single-page, anchored nav)

1. **Sticky Navbar** — glass blur, section links, resume CTA, mobile sheet.
2. **Hero** — name, animated typing cycle (Data Scientist → ML Enthusiast → Python Developer → Software Engineer → Data Analyst), tagline, CTAs (View Projects / Download Resume / Contact). Particle canvas + floating gradient blobs + scroll indicator + subtle parallax. Profile avatar (initials monogram in a gradient ring — no profile photo uploaded).
3. **About** — bio + 4 animated counters (6M+ transactions, 92% recall, 60% prep-time reduction, 30+ students).
4. **Skills** — grouped glass cards (Programming, Data Science, Analytics & BI, Development, Soft Skills) with icons and reveal stagger.
5. **Experience** — vertical timeline (Viral Trade, Altimetrik) with scroll-anchored entries.
6. **Featured Projects** — Fraud Detection, MedConnect, Stock Market Analysis. Gradient/glass visual placeholders (no images uploaded) with tech badges and hover lift.
7. **Achievements** — Patent, Best Project Award, Teaching Assistant, Ideation Manager — animated cards.
8. **Education** — Jyothy Institute of Technology, B.E. CSE, CGPA 8.18, timeline card.
9. **Certifications** — three certification cards with hover sheen.
10. **Contact** — glass form (Name / Email / Message) with Zod validation + toast on submit (mailto fallback since no backend); social links (Email, LinkedIn, GitHub, Location).
11. **Footer** — copyright, quick links, back-to-top.

## Animations

Framer Motion variants for fade-up / fade-left / fade-right / scale-in, IntersectionObserver gating, stagger children, counter ease-out, typing effect, particle canvas, floating blob loops, hover micro-interactions, smooth `scroll-behavior`.

## Files Created / Modified

```text
src/routes/index.tsx                 (replace placeholder)
src/data/portfolio.ts                (all content)
src/components/portfolio/
  Navbar.tsx
  Hero.tsx
  Particles.tsx
  TypingText.tsx
  About.tsx
  Counter.tsx
  Skills.tsx
  Experience.tsx
  Projects.tsx
  Achievements.tsx
  Education.tsx
  Certifications.tsx
  Contact.tsx
  Footer.tsx
  Reveal.tsx                         (IO + motion wrapper)
  Section.tsx                        (shared section shell)
src/styles.css                       (dark tokens, gradients, glass utility, fonts)
src/routes/__root.tsx                (SEO meta: title, description, OG, Twitter)
public/resume.pdf                    (copied from upload)
```

New deps: `framer-motion`, `react-intersection-observer`, `lucide-react` (already present if shadcn installed — verify), `zod`, `@fontsource/outfit`, `@fontsource/inter`.

## Resume Handling

- Parse the uploaded PDF, extract verified facts, and seed `portfolio.ts` from it (reconciling against the brief where they diverge).
- Copy the PDF to `public/resume.pdf` so the Download Resume button serves it.

## SEO & A11y

- Unique `<title>`, meta description, canonical, OG + Twitter tags in the root head.
- Single `<h1>` in Hero, semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`), `aria-label`s on icon buttons, focus-visible rings, reduced-motion fallback for Framer animations.
- JSON-LD `Person` schema with name, role, location, sameAs (LinkedIn, GitHub), email.

## Responsive Breakpoints

Tailwind defaults tuned for 480 / 768 / 1024 / 1440. Hero scales typography with `clamp()`. Timeline collapses to single column under `md`. Mobile nav uses shadcn Sheet.

## Out of Scope

- No real project screenshots (using gradient/glass placeholders per your choice).
- No backend submit for the contact form (Zod validation + mailto handoff). I can wire Lovable Cloud + an email function later if you want real delivery.
