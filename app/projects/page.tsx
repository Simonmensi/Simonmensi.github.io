/**
 * @file app/projects/page.tsx
 * @description Projects page — renders a grid of {@link ProjectCard} components
 * from the typed {@link PROJECTS} data array.
 */

import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { OWNER_NAME, SITE_URL, ROUTES } from "@/constants";

export const metadata: Metadata = {
  title: `Projects — ${OWNER_NAME}`,
  description:
    "BIM pipelines, data tools, and web applications built by Simon Lei.",
  alternates: { canonical: `${SITE_URL}${ROUTES.projects}/` },
  openGraph: {
    title: `Projects — ${OWNER_NAME}`,
    description:
      "BIM pipelines, data tools, and web applications built by Simon Lei.",
    url: `${SITE_URL}${ROUTES.projects}/`,
    type: "website",
  },
};

/**
 * Projects page — static grid of project cards sourced from `data/projects.ts`.
 *
 * @returns A `<main>` element containing a responsive project grid.
 */
export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Page heading */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-900">Projects</h1>
        <p className="mt-4 text-blue-900/60">
          A selection of BIM pipelines, data tools, and web work.
        </p>
      </header>

      {/* Project grid */}
      <ul
        className="grid gap-6 sm:grid-cols-2"
        aria-label="Project list"
      >
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </main>
  );
}
