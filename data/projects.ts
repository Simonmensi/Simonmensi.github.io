/**
 * @file data/projects.ts
 * @description Typed project entries for the Projects page.
 *
 * Add new projects to the {@link PROJECTS} array. The Projects page grid
 * iterates this array and renders a `ProjectCard` for each entry.
 */

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

/**
 * Status of a project.
 * - `"active"`    — currently in development or deployed
 * - `"completed"` — finished and stable
 * - `"archived"`  — no longer maintained
 */
export type ProjectStatus = "active" | "completed" | "archived";

/**
 * Classification of the project's ownership/collaboration model.
 * - `"personal"` — built independently
 * - `"group"`    — collaborative team project
 */
export type ProjectType = "personal" | "group";

/**
 * A single project entry rendered as a card on the Projects page.
 */
export interface ProjectEntry {
  /**
   * Short unique identifier used as the React list key and URL slug.
   * Use kebab-case, e.g. `"bim-dashboard"`.
   */
  id: string;
  /** Display title of the project. */
  title: string;
  /** One or two sentence description of what the project does. */
  description: string;
  /**
   * Technology / tool labels displayed as {@link Tag} chips.
   * Keep to 4–6 tags maximum for visual clarity.
   */
  stack: string[];
  /** Current lifecycle status of the project. */
  status: ProjectStatus;
  /**
   * Whether this was a solo or collaborative effort.
   * Rendered as a "Personal Project" or "Group Project" badge on the card.
   */
  projectType: ProjectType;
  /** Optional URL to the live deployment. */
  liveUrl?: string;
  /** Optional URL to the source code repository. */
  repoUrl?: string;
  /**
   * ISO 8601 completion or last-updated date string.
   * @example `"2024-03"`
   */
  date: string;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

/**
 * All projects listed on the Projects page, most recent first.
 *
 * @example
 * ```ts
 * import { PROJECTS } from "@/data/projects";
 * const active = PROJECTS.filter(p => p.status === "active");
 * ```
 */
export const PROJECTS: ProjectEntry[] = [
  {
    id: "portfolio-site",
    title: "Personal Portfolio",
    description:
      "This site — a fully static Next.js 16 portfolio deployed to GitHub Pages. " +
      "Features a QR-code-driven contact exchange flow and a lead capture system " +
      "that stores visitor details in localStorage.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Pages"],
    status: "active",
    projectType: "personal",
    liveUrl: "https://simonmensi.github.io",
    repoUrl: "https://github.com/Simonmensi/Simonmensi.github.io",
    date: "2026-03",
  },
  {
    id: "menmen-golden-house",
    title: "Menmen's Golden House",
    description:
      "A comprehensive personal website serving as a digital portfolio and knowledge hub, " +
      "featuring personal notes and highlight photographs. Currently in active development " +
      "with plans to expand beyond its initial HTML foundation.",
    stack: ["HTML", "CSS", "JavaScript"],
    status: "active",
    projectType: "personal",
    repoUrl: "https://github.com/Simonmensi/menmen-golden-house-website",
    date: "2024-09",
  },
  {
    id: "aori-ecommerce",
    title: "AORI E-commerce",
    description:
      "A full-stack Japanese fast-fashion e-commerce platform developed as a group project, " +
      "focusing on user experience and scalable architecture with a Spring Boot backend " +
      "and a React storefront backed by PostgreSQL.",
    stack: ["Spring Boot", "Java", "React", "PostgreSQL"],
    status: "completed",
    projectType: "group",
    date: "2024-05",
  },
  {
    id: "smartsuschef",
    title: "SmartSusChef",
    description:
      "A smart demand forecasting tool designed to help F&B operators prepare the right " +
      "amount of food every day, reducing waste and optimising supply chains. " +
      "Built as a group Applied Design (AD) project using machine learning and a FastAPI backend.",
    stack: ["Python", "Machine Learning", "FastAPI", "Data Visualization"],
    status: "completed",
    projectType: "group",
    repoUrl: "https://github.com/Fubuki233/SmartSusChef",
    date: "2025-02",
  },
];
