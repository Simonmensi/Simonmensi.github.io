import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VCardForm, validate } from "@/components/contact/VCardForm";

vi.mock("@/lib/generate-vcard", () => ({
  buildVCardString: vi.fn(() => "BEGIN:VCARD\r\nEND:VCARD"),
  downloadVCard: vi.fn(),
}));

vi.mock("@/lib/vcard-data", () => ({
  SIMON_VCARD_DATA: { fullName: "Test" },
}));

// Mock global fetch so the form does not make real HTTP calls in tests
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("VCardForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      json: async () => ({ success: true }),
    });
  });

  it("shows both error messages on empty submit", async () => {
    const user = userEvent.setup();
    render(<VCardForm onSuccess={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /Get.*Contact/i }));

    expect(screen.getByText("Name is required.")).toBeTruthy();
    expect(screen.getByText("Phone number is required.")).toBeTruthy();
  });

  it("validate() rejects name shorter than 2 characters", () => {
    const errors = validate({ name: "A", phone: "123" });
    expect(errors.name).toBe("Name must be at least 2 characters.");
    expect(errors.phone).toBeUndefined();
  });

  it("clears field error when user types", async () => {
    const user = userEvent.setup();
    render(<VCardForm onSuccess={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /Get.*Contact/i }));
    expect(screen.getByText("Name is required.")).toBeTruthy();

    await user.type(screen.getByLabelText("Your Name"), "A");
    expect(screen.queryByText("Name is required.")).toBeNull();
  });
});
