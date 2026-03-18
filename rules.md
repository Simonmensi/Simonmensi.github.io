# Development Rules & Constraints

## 1. Language & Framework

| Rule | Detail |
|------|--------|
| **TypeScript only** | All files must use `.ts` or `.tsx`. No plain `.js` files in `app/` or `components/`. |
| **App Router** | Use the Next.js 15 `app/` directory exclusively. No `pages/` directory. |
| **Strict TypeScript** | `tsconfig.json` must keep `"strict": true`. No `any` types without an explicit comment justifying the exception. |

---

## 2. Static Site Generation (SSG)

| Rule | Detail |
|------|--------|
| **`output: 'export'`** | `next.config.ts` must always have `output: 'export'`. Never remove it. |
| **No server runtime** | Do not use `getServerSideProps`, Route Handlers that require a Node.js server, or any API that is unavailable at build time. |
| **No dynamic routes without `generateStaticParams`** | Every dynamic segment (`[slug]`) must export `generateStaticParams` so all paths are known at build time. |
| **No `next/image` optimisation** | `images.unoptimized: true` must remain in `next.config.ts`. Use `<img>` with explicit `width`/`height` or the unoptimised `next/image`. |
| **No cookies / sessions** | Static exports cannot set cookies. Authentication, if ever needed, must be handled client-side (e.g., OAuth redirect). |

---

## 3. Styling

| Rule | Detail |
|------|--------|
| **Tailwind CSS only** | No inline styles and no external CSS-in-JS libraries. Use Tailwind utility classes. |
| **No `!important`** | Overrides must be achieved through Tailwind's `@layer` or component composition, never `!important`. |
| **Responsive-first** | Every component must be designed mobile-first: base styles → `sm:` → `md:` → `lg:` breakpoints. |
| **Dark mode** | Use Tailwind `dark:` variant. Dark/light preference is toggled via `next-themes` and stored in `localStorage`. |

---

## 4. Code Quality

| Rule | Detail |
|------|--------|
| **Modular components** | Each component lives in its own file. Max file length: 150 lines. If a component exceeds this, extract sub-components. |
| **Meaningful names** | No single-letter variables outside of short loops (`i`, `j`). Component names are PascalCase. Functions and variables are camelCase. |
| **No magic numbers** | Constants must be named and exported from a `constants/` file or co-located at the top of the module. |
| **Props interfaces** | Every component must have an explicitly named `Props` interface (e.g., `ProjectCardProps`). No inline or anonymous prop types. |
| **No unused imports** | ESLint rule `no-unused-vars` is enforced. Remove all dead imports before committing. |

---

## 5. File & Folder Structure

```
Simonmensi.github.io/
├── app/                   # App Router pages and layouts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home / Hero
│   ├── projects/
│   │   └── page.tsx
│   └── cv/
│       └── page.tsx
├── components/
│   ├── layout/            # Navigation, LayoutShell, Footer
│   └── ui/                # Button, Tag, Card, etc.
├── data/                  # Typed static data (cv.ts, projects.ts)
├── constants/             # Shared constants (routes, metadata, etc.)
├── public/                # Static assets, .nojekyll, robots.txt, sitemap.xml
├── plan.md                # Phase roadmap (read before every task)
├── rules.md               # This file
└── .agent/
    └── instructions.md    # Agent behaviour and workflow
```

---

## 6. Git & Deployment

| Rule | Detail |
|------|--------|
| **Branch strategy** | `main` → source code. `gh-pages` → static `/out` output (via `gh-pages` npm package). |
| **No secrets in repo** | No API keys, tokens, or credentials committed. Use `.env.local` (git-ignored) for any build-time variables. |
| **`.nojekyll`** | `public/.nojekyll` must always exist to prevent GitHub Pages from running Jekyll. |
| **Deploy command** | `npm run deploy` must run `next build && gh-pages -d out`. |

---

## 7. Accessibility

- All interactive elements must be keyboard-navigable.
- Images must have descriptive `alt` attributes (or `alt=""` if purely decorative).
- Colour contrast must meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text).
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).


