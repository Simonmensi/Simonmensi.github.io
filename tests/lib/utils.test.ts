import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("concatenates two plain class strings", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("filters falsy values via clsx", () => {
    expect(cn("px-4", false && "hidden", null, "py-2")).toBe("px-4 py-2");
  });

  it("merges conflicting Tailwind classes with twMerge", () => {
    expect(cn("bg-blue-900", "bg-red-500")).toBe("bg-red-500");
  });

  it("returns an empty string for no inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined className gracefully", () => {
    expect(cn(undefined)).toBe("");
  });
});
