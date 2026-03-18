import { describe, it, expect } from "vitest";
import { validate } from "@/components/contact/VCardForm";

describe("validate()", () => {
  it("returns both errors when both fields are empty", () => {
    const errors = validate({ name: "", phone: "" });
    expect(errors.name).toBe("Name is required.");
    expect(errors.phone).toBe("Phone number is required.");
  });

  it("returns name too short and phone required", () => {
    const errors = validate({ name: "A", phone: "" });
    expect(errors.name).toBe("Name must be at least 2 characters.");
    expect(errors.phone).toBe("Phone number is required.");
  });

  it("returns only phone error when name is valid", () => {
    const errors = validate({ name: "Bob", phone: "" });
    expect(errors.name).toBeUndefined();
    expect(errors.phone).toBe("Phone number is required.");
  });

  it("returns only name error when phone is valid", () => {
    const errors = validate({ name: "", phone: "+65 9123 4567" });
    expect(errors.name).toBe("Name is required.");
    expect(errors.phone).toBeUndefined();
  });

  it("returns empty errors for valid input", () => {
    const errors = validate({ name: "Bob", phone: "+65 9123 4567" });
    expect(errors).toEqual({});
  });

  it("trims whitespace when checking name length", () => {
    const errors = validate({ name: "  Bob  ", phone: "+65 9123 4567" });
    expect(errors.name).toBeUndefined();
  });
});
