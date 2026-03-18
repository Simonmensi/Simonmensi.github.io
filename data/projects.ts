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
    liveUrl: "https://simonmensi.github.io",
    repoUrl: "https://github.com/Simonmensi/Simonmensi.github.io",
    date: "2026-03",
  },
  {
    id: "bim-clash-dashboard",
    title: "BIM Clash Detection Dashboard",
    description:
      "A Python + Dynamo pipeline that extracts Navisworks clash data into a " +
      "structured JSON report and visualises clash hotspots per discipline " +
      "on an interactive web dashboard.",
    stack: ["Python", "Dynamo", "Navisworks", "Chart.js"],
    status: "completed",
    date: "2024-08",
  },
  {
    id: "ifc-pipeline",
    title: "IFC Data Pipeline",
    description:
      "An automated ETL pipeline that parses IFC 4.x files, validates element " +
      "properties against ISO 19650 naming conventions, and exports a COBie-compatible " +
      "Excel handover package.",
    stack: ["Python", "IfcOpenShell", "Pandas", "Azure DevOps"],
    status: "completed",
    date: "2023-11",
  },
  {
    id: "cde-onboarding",
    title: "CDE Onboarding Toolkit",
    description:
      "A self-service onboarding guide and configuration checklist for teams " +
      "adopting Autodesk Construction Cloud (ACC). Includes role-based permission " +
      "templates and a folder structure generator.",
    stack: ["TypeScript", "React", "Autodesk ACC API"],
    status: "archived",
    date: "2022-05",
  },
];
