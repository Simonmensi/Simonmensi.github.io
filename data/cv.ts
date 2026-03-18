/**
 * @file data/cv.ts
 * @description Typed CV data for Simon Lei.
 *
 * This file is the single source of truth for all curriculum vitae content
 * rendered on the CV page. Update entries here; the UI picks up changes
 * automatically via the exported constants.
 */

import { OWNER_NAME, OWNER_TITLE, OWNER_ORG } from "@/constants";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

/**
 * A single work-experience entry.
 */
export interface ExperienceEntry {
  /** Job title held during this role. */
  role: string;
  /** Company or organisation name. */
  company: string;
  /** ISO 8601 start date string, e.g. `"2022-01"`. */
  startDate: string;
  /**
   * ISO 8601 end date string, or `"Present"` if currently active.
   * @example `"2023-06"` | `"Present"`
   */
  endDate: string;
  /** City / country where the role was based. */
  location: string;
  /** Bullet-point achievements or responsibilities. */
  bullets: string[];
}

/**
 * A single education entry.
 */
export interface EducationEntry {
  /** Degree or qualification awarded. */
  degree: string;
  /** Institution that awarded the qualification. */
  institution: string;
  /** ISO 8601 graduation / completion year, e.g. `"2024"`. */
  year: string;
  /** Optional short description, thesis title, or notable achievement. */
  description?: string;
}

/**
 * A skill category grouping related competencies.
 */
export interface SkillCategory {
  /** Category heading, e.g. `"BIM & CAD"`. */
  category: string;
  /** List of individual skill labels within this category. */
  skills: string[];
}

/**
 * The complete typed CV data structure.
 */
export interface CvData {
  /** Owner's full name. */
  name: string;
  /** Current professional title. */
  title: string;
  /** Brief professional summary (2–4 sentences). */
  summary: string;
  /** Work experience entries, most recent first. */
  experience: ExperienceEntry[];
  /** Education entries, most recent first. */
  education: EducationEntry[];
  /** Skill categories for the skills section. */
  skills: SkillCategory[];
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

/**
 * Simon Lei's complete CV data.
 *
 * @example
 * ```ts
 * import { CV } from "@/data/cv";
 * console.log(CV.name); // "Simon Lei"
 * ```
 */
export const CV: CvData = {
  name: OWNER_NAME,
  title: OWNER_TITLE,  summary:
    `${OWNER_NAME} is a ${OWNER_TITLE} at ${OWNER_ORG} specialising in ` +
    "Building Information Modelling (BIM), digital construction workflows, " +
    "and systems integration. Experienced in coordinating cross-disciplinary " +
    "teams and delivering data-driven project outcomes.",

  experience: [
    {
      role: "System Analyst",
      company: OWNER_ORG,
      startDate: "2022-01",
      endDate: "Present",
      location: "Singapore",
      bullets: [
        "Designed and maintained BIM standards and workflows for multi-disciplinary construction projects.",
        "Led integration of IFC-compliant data pipelines between design and facilities management systems.",
        "Delivered training programmes on BIM authoring tools for cross-functional teams.",
        "Conducted clash detection reviews reducing on-site rework by an estimated 30 %.",
      ],
    },
    {
      role: "BIM Coordinator",
      company: "CapitaLand Group",
      startDate: "2019-06",
      endDate: "2021-12",
      location: "Singapore",
      bullets: [
        "Coordinated BIM federated models across architectural, structural, and MEP disciplines.",
        "Established Common Data Environment (CDE) protocols using ACC / BIM 360.",
        "Produced 4D construction sequence simulations to support project scheduling.",
      ],
    },
  ],

  education: [
    {
      degree: "Graduate Diploma in Systems Analysis",
      institution: OWNER_ORG,
      year: "2022",
      description: "Focused on software systems design, databases, and enterprise architecture.",
    },
    {
      degree: "Bachelor of Engineering (Civil)",
      institution: "Nanyang Technological University",
      year: "2019",
      description: "Specialisation in structural engineering and construction management.",
    },
  ],

  skills: [
    { category: "BIM & CAD",        skills: ["Revit", "AutoCAD", "Navisworks", "ArchiCAD", "Civil 3D"] },
    { category: "Programming",      skills: ["TypeScript", "Python", "Dynamo", "C# (.NET)"] },
    { category: "Platforms & Tools", skills: ["Autodesk ACC", "BIM 360", "Procore", "Azure DevOps", "GitHub"] },
    { category: "Standards",        skills: ["ISO 19650", "IFC 4.x", "COBie", "Singapore BIM Guide v2"] },
  ],
};
