import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThankYouMessage } from "@/components/contact/ThankYouMessage";

vi.mock("@/lib/generate-vcard", () => ({
  buildVCardString: vi.fn(() => "BEGIN:VCARD\r\nEND:VCARD"),
  downloadVCard: vi.fn(),
}));

vi.mock("@/lib/vcard-data", () => ({
  SIMON_VCARD_DATA: { fullName: "Simon Lei" },
}));

import { downloadVCard } from "@/lib/generate-vcard";
import { VCARD_FILENAME } from "@/constants";

const mockDownloadVCard = vi.mocked(downloadVCard);

describe("ThankYouMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the visitor name in the heading", () => {
    render(<ThankYouMessage visitorName="  Alice  " />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Thanks, Alice!");
  });

  it("shows the vCard filename in the body copy", () => {
    render(<ThankYouMessage visitorName="Alice" />);
    expect(screen.getByText(new RegExp(VCARD_FILENAME.replace(".", "\\.")))).toBeTruthy();
  });

  it("shows the owner name in the body copy", () => {
    render(<ThankYouMessage visitorName="Alice" />);
    expect(screen.getByText(/Simon Lei/)).toBeTruthy();
  });

  it("renders a Download again button", () => {
    render(<ThankYouMessage visitorName="Alice" />);
    expect(screen.getByRole("button", { name: /Download again/ })).toBeTruthy();
  });

  it("calls downloadVCard when Download again is clicked", async () => {
    const user = userEvent.setup();
    render(<ThankYouMessage visitorName="Alice" />);

    await user.click(screen.getByRole("button", { name: /Download again/ }));

    expect(mockDownloadVCard).toHaveBeenCalledWith(
      "BEGIN:VCARD\r\nEND:VCARD",
      VCARD_FILENAME,
    );
  });
});
