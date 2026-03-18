/**
 * @file components/projects/ProjectCard.tsx
 * @description Card component for a single project entry on the Projects page.
 * Displays title, description, tech stack tags, status badge, and optional
 * links to a live deployment and source repository.
 */

import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import type { ProjectEntry, ProjectStatus } from "@/data/projects";

/**
 * Props for the {@link ProjectCard} component.
 */
export interface Props {
  /** The project entry to render. */
  project: ProjectEntry;
}

/** Maps a {@link ProjectStatus} to a {@link Tag} variant. */
const STATUS_VARIANT: Record<ProjectStatus, "success" | "info" | "warning"> = {
  active: "success",
  completed: "info",
  archived: "warning",
};

/** Human-readable label for each {@link ProjectStatus}. */
const STATUS_LABEL: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

/**
 * Card UI for a single {@link ProjectEntry}.
 *
 * @param props - {@link Props}
 * @returns A `<article>` card element with project metadata.
 *
 * @example
 * <ProjectCard project={PROJECTS[0]} />
 */
export function ProjectCard({ project }: Props) {
  const { title, description, stack, status, liveUrl, repoUrl, date } =
    project;

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-blue-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-xl font-bold text-blue-900">{title}</h2>
        <Tag variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Tag>
      </div>

      {/* Date */}
      <p className="text-xs text-blue-900/50">{date}</p>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-blue-900/70">
        {description}
      </p>

      {/* Stack chips */}
      <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
        {stack.map((tech) => (
          <li key={tech}>
            <Tag variant="info">{tech}</Tag>
          </li>
        ))}
      </ul>

      {/* Links */}
      {(liveUrl ?? repoUrl) && (
        <div className="flex flex-wrap gap-3 pt-2">
          {liveUrl && (
            <Button href={liveUrl} variant="primary" size="sm">
              Live
            </Button>
          )}
          {repoUrl && (
            <Button href={repoUrl} variant="outline" size="sm">
              Source
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
