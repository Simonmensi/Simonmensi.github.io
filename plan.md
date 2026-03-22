# Project Roadmap: Personal Portfolio

## Overview

A personal portfolio site built with Next.js (App Router), TypeScript, and Tailwind CSS.
Server-side rendering with Server Actions for form handling and PostgreSQL for data persistence.

---

## Phase 1 — Core Setup & SSR Configuration

**Goal:** Establish a working, deployable SSR skeleton.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 1.1 | Initialize Next.js project (TypeScript, App Router, Tailwind) | `npm run dev` starts without errors |
| 1.2 | Configure `next.config.ts` for SSR (no `output: 'export'`) | `npm run build` produces server-side build |
| 1.3 | Set up `tailwind.config.ts` with custom design tokens | Tailwind classes resolve in all components |
| 1.4 | Create root `app/layout.tsx` with `<html>` and `<body>` shell | Build passes; layout renders |

**Phase 1 Gate:** `npm run build` completes successfully.

---

## Phase 2 — Atomic Component Design

**Goal:** Build a reusable, responsive component library.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 2.1 | Create `components/layout/Navigation.tsx` | Renders on all breakpoints |
| 2.2 | Create `components/layout/LayoutShell.tsx` | All pages share consistent layout |
| 2.3 | Create `components/layout/Footer.tsx` | Responsive; accessible |
| 2.4 | Create `components/ui/Button.tsx` | Variants visually distinct |
| 2.5 | Create `components/ui/Tag.tsx` | Reusable across components |
| 2.6 | Apply dark-mode via Tailwind `dark:` classes and `next-themes` | Toggle persists |
| 2.7 | Run build and Lighthouse audit | Performance >= 90, Accessibility >= 90 |

**Phase 2 Gate:** All components render; dark mode works; build passes.

---

## Phase 3 — Content Integration & SEO

**Goal:** Populate with CV data, projects; optimise for search engines.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 3.1 | Create `data/cv.ts` — typed CV data | TypeScript types defined |
| 3.2 | Create `data/projects.ts` — typed project entries | TypeScript types defined |
| 3.3 | Build `app/page.tsx` — Hero section | Renders name, title, CTA |
| 3.4 | Build `app/projects/page.tsx` — Project grid | All projects render |
| 3.5 | Build `app/cv/page.tsx` — Timeline-style CV | Sections render |
| 3.6 | Add `generateMetadata` for SEO | `<meta>` tags present |
| 3.7 | Create `public/sitemap.xml` and `public/robots.txt` | Files present |

**Phase 3 Gate:** Site live, pages indexed, Lighthouse >= 90.

---

## Phase 4 — Lead Capture & Database (SSR)

**Goal:** Server-side lead persistence via PostgreSQL.

### Tasks

| # | Task | Acceptance Criteria |
|---|------|---------------------|
| 4.1 | Set up Prisma with PostgreSQL adapter | `prisma generate` succeeds |
| 4.2 | Create `lib/db.ts` singleton Prisma client | Lambda-safe singleton pattern |
| 4.3 | Create Server Action `app/contact/_actions.ts` | Lead validated and persisted |
| 4.4 | Update `VCardForm` to call Server Action | Form submits via server action |
| 4.5 | Create `/admin/leads` route with Basic Auth middleware | Protected data endpoint |
| 4.6 | Remove `output: 'export'` and localStorage lead saving | No client-side persistence |

**Phase 4 Gate:** Form saves leads to DB; admin route returns data behind auth.

---

## Guiding Principles

- No UI code is written before Phase 1 is complete and confirmed.
- Each phase requires explicit user confirmation before proceeding.
- The agent checks this file before starting every task.
