# Project Roadmap: Personal Portfolio / Blog

## Overview

A high-performance personal portfolio and blog deployed as a fully static site
via GitHub Pages. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

---

## Phase 1 — Core Setup & SSG Configuration

**Goal:** Establish a working, deployable skeleton with zero runtime dependencies.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 1.1 | Initialize Next.js project (TypeScript, App Router, Tailwind) | `npm run dev` starts without errors |
| 1.2 | Configure `next.config.ts` with `output: 'export'`, `basePath`, `assetPrefix`, `trailingSlash` | `npm run build` produces `/out` directory |
| 1.3 | Configure `package.json` with `deploy` script using `gh-pages` | `npm run deploy` pushes `/out` to `gh-pages` branch |
| 1.4 | Set up `tailwind.config.ts` with custom design tokens (colors, fonts, spacing) | Tailwind classes resolve in all components |
| 1.5 | Create root `app/layout.tsx` with `<html>` and `<body>` shell (no content yet) | Build passes; layout renders |
| 1.6 | Add `.nojekyll` file to `public/` to disable GitHub Pages Jekyll processing | File present in `/out` after build |
| 1.7 | Verify Phase 1 build test: `npm run build` | `/out` directory generated, no errors |

**Phase 1 Gate:** `npm run build` completes successfully and `/out` contains a valid static export.

---

## Phase 2 — Atomic Component Design

**Goal:** Build a reusable, responsive component library following atomic design principles.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 2.1 | Create `components/layout/Navigation.tsx` — responsive nav with mobile hamburger | Renders on all breakpoints; no hydration errors |
| 2.2 | Create `components/layout/LayoutShell.tsx` — wraps all pages with nav + footer | All pages share consistent layout |
| 2.3 | Create `components/layout/Footer.tsx` — links, social icons, copyright | Responsive; accessible |
| 2.4 | Create `components/ui/Button.tsx` — primary / secondary / ghost variants | Variants visually distinct; keyboard accessible |
| 2.5 | Create `components/ui/Tag.tsx` — small label chip for skills/technologies | Reusable across Project and CV components |
| 2.6 | Apply dark-mode support via Tailwind `dark:` classes and `next-themes` | Toggle persists across page refreshes |
| 2.7 | Run build and Lighthouse audit on static output | Performance ≥ 90, Accessibility ≥ 90 |

**Phase 2 Gate:** All atomic components render correctly; dark mode works; build passes.

---

## Phase 3 — Content Integration & SEO

**Goal:** Populate the site with real CV data, project cards, and blog posts; optimise for search engines.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 3.1 | Create `data/cv.ts` — typed CV data (experience, education, skills) | TypeScript types defined; data exported cleanly |
| 3.2 | Create `data/projects.ts` — typed project entries (title, stack, links, description) | TypeScript types defined |
| 3.3 | Build `app/page.tsx` — Hero section using CV data | Renders name, title, CTA |
| 3.4 | Build `app/projects/page.tsx` — Project grid using `ProjectCard` component | All projects render; links functional |
| 3.5 | Build `app/cv/page.tsx` — Timeline-style CV page | Experience + education sections render |
| 3.6 | Add `generateMetadata` to each page for SEO (title, description, OG tags) | `<meta>` tags present in static HTML output |
| 3.7 | Create `public/sitemap.xml` and `public/robots.txt` | Files present in `/out` after build |
| 3.8 | Final production build + deploy to GitHub Pages | Site live at `https://simonmensi.github.io` |
| ~~3.x~~ | ~~Build `app/guidelines/page.tsx` — BIM ISO 19650 compliance checklist~~ | **DEPRECATED / REMOVED** — Feature removed per content cleanup (Mar 2026) |

**Phase 3 Gate:** Site is live, all pages indexed, Lighthouse scores ≥ 90 across all categories.

---

## Guiding Principles

- No UI code is written before Phase 1 is complete and confirmed.
- Each phase requires explicit user confirmation before proceeding.
- The agent checks this file before starting every task.
