import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VCardForm } from "@/components/contact/VCardForm";

vi.mock("@/lib/generate-vcard", () => ({
  buildVCardString: vi.fn(() => "BEGIN:VCARD\r\nEND:VCARD"),
  downloadVCard: vi.fn(),
}));

vi.mock("@/lib/vcard-data", () => ({
  SIMON_VCARD_DATA: { fullName: "Test" },
}));

vi.mock("@/app/contact/_actions", () => ({
  saveLead: vi.fn(),
}));

describe("VCardForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows both error messages on empty submit", async () => {
    const user = userEvent.setup();
    render(<VCardForm onSuccess={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /Get.*Contact/i }));

    expect(screen.getByText("Name is required.")).toBeTruthy();
    expect(screen.getByText("Phone number is required.")).toBeTruthy();
  });

  it("shows name too short error", async () => {
    const user = userEvent.setup();
    render(<VCardForm onSuccess={vi.fn()} />);

    await user.type(screen.getByLabelText("Your Name"), "A");
    await user.click(screen.getByRole("button", { name: /Get.*Contact/i }));

    expect(screen.getByText("Name must be at least 2 characters.")).toBeTruthy();
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
