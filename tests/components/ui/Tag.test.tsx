import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tag } from "@/components/ui/Tag";

describe("Tag", () => {
  it("renders a span with role=status", () => {
    render(<Tag variant="success">Compliant</Tag>);
    const tag = screen.getByRole("status");
    expect(tag.tagName).toBe("SPAN");
    expect(tag).toHaveTextContent("Compliant");
  });

  it("sets correct aria-label for each variant", () => {
    const variants = [
      { variant: "success" as const, label: "success" },
      { variant: "error" as const, label: "error" },
      { variant: "warning" as const, label: "warning" },
      { variant: "info" as const, label: "info" },
    ];

    for (const { variant, label } of variants) {
      const { unmount } = render(<Tag variant={variant}>{label}</Tag>);
      expect(screen.getByRole("status")).toHaveAttribute("aria-label", label);
      unmount();
    }
  });

  it("applies the correct variant CSS classes", () => {
    const { unmount } = render(<Tag variant="success">Ok</Tag>);
    expect(screen.getByRole("status").className).toContain("bg-green-100");
    expect(screen.getByRole("status").className).toContain("text-green-800");
    unmount();

    const { unmount: u2 } = render(<Tag variant="error">Fail</Tag>);
    expect(screen.getByRole("status").className).toContain("bg-red-100");
    u2();

    const { unmount: u3 } = render(<Tag variant="warning">Warn</Tag>);
    expect(screen.getByRole("status").className).toContain("bg-amber-100");
    u3();

    const { unmount: u4 } = render(<Tag variant="info">Info</Tag>);
    expect(screen.getByRole("status").className).toContain("bg-blue-100");
    u4();
  });

  it("renders an icon before the label when provided", () => {
    render(<Tag variant="success" icon={<span data-testid="icon">✓</span>}>Compliant</Tag>);
    const icon = screen.getByTestId("icon");
    const wrapperSpan = icon.parentElement;
    expect(wrapperSpan).toHaveAttribute("aria-hidden", "true");
    const tag = screen.getByRole("status");
    expect(tag).toHaveTextContent("✓Compliant");
  });

  it("merges className prop onto root element", () => {
    render(<Tag variant="info" className="ml-2">Info</Tag>);
    expect(screen.getByRole("status").className).toContain("ml-2");
  });
});
