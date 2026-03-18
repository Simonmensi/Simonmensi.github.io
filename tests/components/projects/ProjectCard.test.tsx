import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { ProjectEntry } from "@/data/projects";

vi.mock("@/components/ui/Button", () => ({
  Button: ({ href, children, variant, size }: { href?: string; children: React.ReactNode; variant?: string; size?: string }) => (
    <a href={href} data-variant={variant} data-size={size}>{children}</a>
  ),
}));

vi.mock("@/components/ui/Tag", () => ({
  Tag: ({ variant, children }: { variant: string; children: React.ReactNode }) => (
    <span data-variant={variant}>{children}</span>
  ),
}));

const baseProject: ProjectEntry = {
  id: "test-project",
  title: "Test Project",
  description: "A test project description.",
  stack: ["React", "TypeScript"],
  status: "active",
  projectType: "personal",
  date: "2026-03",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/test/repo",
};

describe("ProjectCard", () => {
  it("renders the title in an h2", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Test Project");
  });

  it("renders the description", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("A test project description.")).toBeTruthy();
  });

  it("renders the date", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("2026-03")).toBeTruthy();
  });

  it("renders a Tag for each stack item", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("React")).toBeTruthy();
    expect(screen.getByText("TypeScript")).toBeTruthy();
  });

  it("renders status and type badges", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Active")).toBeTruthy();
    expect(screen.getByText("Personal Project")).toBeTruthy();
  });

  it("renders Live and Source buttons when URLs are present", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("Live")).toHaveAttribute("href", "https://example.com");
    expect(screen.getByText("Source")).toHaveAttribute("href", "https://github.com/test/repo");
  });

  it("hides Live button when liveUrl is absent", () => {
    render(<ProjectCard project={{ ...baseProject, liveUrl: undefined }} />);
    expect(screen.queryByText("Live")).toBeNull();
    expect(screen.getByText("Source")).toBeTruthy();
  });

  it("hides Source button when repoUrl is absent", () => {
    render(<ProjectCard project={{ ...baseProject, repoUrl: undefined }} />);
    expect(screen.getByText("Live")).toBeTruthy();
    expect(screen.queryByText("Source")).toBeNull();
  });

  it("hides the button row when both URLs are absent", () => {
    render(<ProjectCard project={{ ...baseProject, liveUrl: undefined, repoUrl: undefined }} />);
    expect(screen.queryByText("Live")).toBeNull();
    expect(screen.queryByText("Source")).toBeNull();
  });
});
