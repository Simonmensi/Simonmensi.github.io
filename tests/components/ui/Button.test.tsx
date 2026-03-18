import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders as a <button> by default with type=button", () => {
    render(<Button>Click</Button>);
    const btn = screen.getByRole("button", { name: "Click" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("renders as an <a> when href is provided", () => {
    render(<Button href="https://example.com">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("forwards the type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders as a <button type=reset> when type=reset", () => {
    render(<Button type="reset">Reset</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });

  it("applies primary variant classes by default", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole("button").className).toContain("bg-blue-900");
  });

  it("applies outline variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button").className).toContain("border-2");
    expect(screen.getByRole("button").className).toContain("border-blue-900");
  });

  it("applies ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const classes = screen.getByRole("button").className;
    expect(classes).toContain("text-blue-900");
    expect(classes).not.toContain("bg-blue-900");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Button size="sm">Sm</Button>);
    expect(screen.getByRole("button").className).toContain("px-4 py-2 text-sm");

    rerender(<Button size="md">Md</Button>);
    expect(screen.getByRole("button").className).toContain("px-8 py-3 text-base");

    rerender(<Button size="lg">Lg</Button>);
    expect(screen.getByRole("button").className).toContain("px-10 py-4 text-lg");
  });

  it("shows Spinner and disables when isLoading", () => {
    render(<Button isLoading>Loading</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    const svg = btn.querySelector("svg");
    expect(svg).toBeTruthy();
    const span = btn.querySelector("span");
    expect(span?.className).toContain("opacity-60");
  });

  it("disables without Spinner when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.querySelector("svg")).toBeFalsy();
  });

  it("sets aria-disabled and tabIndex=-1 on <a> when isLoading with href", () => {
    render(<Button href="#" isLoading>Link</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("calls onClick when clicked as a <button>", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("merges className prop", () => {
    render(<Button className="extra-class">Test</Button>);
    expect(screen.getByRole("button").className).toContain("extra-class");
  });
});
