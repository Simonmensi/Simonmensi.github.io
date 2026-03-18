import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VCardForm } from "@/components/contact/VCardForm";
import { buildVCardString, downloadVCard, saveLead } from "@/lib/generate-vcard";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";
import { VCARD_FILENAME } from "@/constants";

vi.mock("@/lib/generate-vcard", () => ({
  buildVCardString: vi.fn(() => "BEGIN:VCARD\r\nEND:VCARD"),
  downloadVCard: vi.fn(),
  saveLead: vi.fn(),
}));

vi.mock("@/lib/vcard-data", () => ({
  SIMON_VCARD_DATA: { fullName: "Test" },
}));

const mockBuildVCardString = vi.mocked(buildVCardString);
const mockDownloadVCard = vi.mocked(downloadVCard);
const mockSaveLead = vi.mocked(saveLead);

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

  it("calls saveLead, downloadVCard, and onSuccess on valid submit", async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();
    render(<VCardForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText("Your Name"), "Alice");
    await user.type(screen.getByLabelText("Phone Number"), "+65 9999");
    await user.click(screen.getByRole("button", { name: /Get.*Contact/i }));

    expect(mockSaveLead).toHaveBeenCalledTimes(1);
    expect(mockSaveLead).toHaveBeenCalledWith({
      name: "Alice",
      phone: "+65 9999",
      submittedAt: expect.any(String),
    });

    expect(mockBuildVCardString).toHaveBeenCalledWith(SIMON_VCARD_DATA);
    expect(mockDownloadVCard).toHaveBeenCalledWith("BEGIN:VCARD\r\nEND:VCARD", VCARD_FILENAME);
    expect(onSuccess).toHaveBeenCalledWith("Alice");
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
