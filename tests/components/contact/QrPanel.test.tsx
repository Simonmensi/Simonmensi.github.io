import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QrPanel } from "@/components/contact/QrPanel";

vi.mock("@/components/ui/QrCode", () => ({
  QrCode: ({ value, label }: { value: string; label: string }) => (
    <div data-testid="qr-code" data-value={value} data-label={label} />
  ),
}));

describe("QrPanel", () => {
  it("shows 'Show QR code' text when QR is hidden", () => {
    render(<QrPanel showQr={false} onToggle={vi.fn()} />);
    expect(screen.getByText(/Show QR code to share this page/)).toBeTruthy();
  });

  it("calls onToggle when toggle button is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<QrPanel showQr={false} onToggle={onToggle} />);

    await user.click(screen.getByRole("button", { expanded: false }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows 'Hide QR code' text when QR is visible", () => {
    render(<QrPanel showQr={true} onToggle={vi.fn()} />);
    expect(screen.getByText(/Hide QR code/)).toBeTruthy();
  });

  it("renders QrCode with correct value and label when shown", () => {
    render(<QrPanel showQr={true} onToggle={vi.fn()} url="https://custom.com" />);
    const qr = screen.getByTestId("qr-code");
    expect(qr).toHaveAttribute("data-value", "https://custom.com");
    expect(qr).toHaveAttribute("data-label", "Scan to open Simon's contact exchange form");
  });

  it("hides QrCode when showQr is false", () => {
    render(<QrPanel showQr={false} onToggle={vi.fn()} />);
    expect(screen.queryByTestId("qr-code")).toBeNull();
  });
});
