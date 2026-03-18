import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "@/components/ui/Spinner";

describe("Spinner", () => {
  it("renders an svg with aria-hidden=true", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("does not have a role attribute", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("role")).toBeNull();
  });

  it("applies className prop", () => {
    const { container } = render(<Spinner className="text-white" />);
    const svg = container.querySelector("svg");
    expect(svg?.className.baseVal ?? svg?.getAttribute("class")).toContain("text-white");
  });

  it("has animate-spin class by default", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg");
    const classes = svg?.className.baseVal ?? svg?.getAttribute("class") ?? "";
    expect(classes).toContain("animate-spin");
  });
});
