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

---

## 8. Active Skills

The following 5 skills from the team's shared template are active on this project.
The agent must consult the relevant skill before performing the task it covers.

---

### Skill 1 — `nextjs-complete-setup`

**Scope:** Project scaffolding, component architecture, and TSDoc documentation standards.

| Rule | Detail |
|------|--------|
| **Named exports only** | All custom components must use named exports (`export const Foo = ...`). No default exports. |
| **TSDoc on every component** | Every exported function and component must have a TSDoc block with `@param`, `@returns`, and at least one `@example`. |
| **Props interfaces** | Props types must be explicitly named (e.g., `NavigationProps`) — not inline or anonymous. |
| **Index barrel files** | Each `components/` subdirectory must have an `index.ts` that re-exports all members for clean import paths. |
| **Utility functions** | Shared helpers go in `lib/utils.ts`. Use `cn()` (clsx + tailwind-merge) for all Tailwind class composition. |
| **TypeScript strict mode** | `tsconfig.json` keeps `"strict": true`. No `any` without an explicit suppression comment. |

---

### Skill 2 — `nextjs-pr-workflow`

**Scope:** Quality gates before every pull request.

| Rule | Detail |
|------|--------|
| **Lint before PR** | `npm run lint` must pass with zero errors before a PR is created. Auto-fix with `--fix` first. |
| **Build before PR** | `npm run build` must complete successfully (static `/out` produced). |
| **Tests before PR** | `npm run test` must pass. This is a **blocking** requirement — PRs must not be created with failing tests. |
| **Semantic PR titles** | PR titles must follow Conventional Commits format (see Skill 5). |
| **Semantic version labels** | After PR creation, apply the correct label: `feat` → `minor`, `fix` → `patch`, `feat!` → `major`. |
| **Coverage badge** | Update the README coverage badge using `coverage-readme-workflow` before the PR is merged. |

---

### Skill 3 — `nextjs-unit-test-creator`

**Scope:** Test generation for all Next.js components, hooks, and utilities.

| Rule | Detail |
|------|--------|
| **Test every component** | Every component in `components/` must have a co-located `*.test.tsx` file. |
| **Vitest preferred** | Use Vitest for unit tests (faster, ESM-native). Jest is acceptable if already configured. |
| **Accessibility tests** | All UI components must include an `axe` accessibility test (`jest-axe` or `vitest-axe`). |
| **Snapshot tests** | Include at least one snapshot test per component to guard against unintended UI regressions. |
| **Server vs client distinction** | Server components must be tested with `render(await ServerComponent())`. Client components use standard `render(<Component />)`. |
| **All tests must pass** | `npm run test` must be green before any commit that modifies a component or utility. |

---

### Skill 4 — `typescript-dry-principle`

**Scope:** Eliminating code duplication across the TypeScript codebase.

| Rule | Detail |
|------|--------|
| **Single source of truth for types** | Shared interfaces and types live in `data/` (domain types) or `app/types/` (UI types). Never duplicate a type definition across files. |
| **Extract repeated logic** | If the same logic appears in two or more places, extract it into `lib/utils.ts` or a dedicated utility module before the second copy is written. |
| **Generic components** | When two components share the same structure with different data shapes, create a generic component using TypeScript generics rather than duplicating JSX. |
| **Constants, not literals** | String and number literals used more than once must be extracted to `constants/`. No scattered magic strings. |
| **Barrel re-exports** | Use `index.ts` barrel files to expose module APIs. Consumers import from the barrel, not from internal file paths. |
| **Verify after refactor** | After any DRY refactor, run `npx tsc --noEmit && npm run lint && npm run build` to confirm nothing broke. |

---

### Skill 5 — `git-semantic-commits`

**Scope:** Commit message formatting for all commits to this repository.

**Format:** `<type>(<scope>): <subject>`

| Type | When to use | Version impact |
|------|-------------|---------------|
| `feat` | New page, component, or user-visible feature | MINOR |
| `fix` | Bug fix | PATCH |
| `docs` | Changes to `plan.md`, `rules.md`, `README.md` | None |
| `style` | Formatting, Tailwind class reordering, Prettier | None |
| `refactor` | DRY refactor, code restructure, no behaviour change | None |
| `test` | Adding or fixing tests | None |
| `ci` | GitHub Actions workflow changes | None |
| `chore` | Dependency updates, config changes | None |
| `perf` | Performance optimisation | PATCH/MINOR |

**Rules:**
- Subject must be in imperative mood: "add navigation" not "added navigation".
- Subject must be under 72 characters. No trailing period.
- Breaking changes: append `!` after type/scope (`feat(nav)!:`) **and** add a `BREAKING CHANGE:` footer.
- Reference closed issues in footer: `Closes #12`.
- One logical change per commit. Do not batch unrelated changes.
