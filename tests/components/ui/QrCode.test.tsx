import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { QrCode } from "@/components/ui/QrCode";

vi.mock("qrcode", () => ({
  default: {
    toString: vi.fn(),
  },
}));

import QRCode from "qrcode";

const mockToString = vi.mocked(QRCode.toString);

describe("QrCode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockToString.mockResolvedValue('<svg data-testid="qr-svg">test</svg>');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a skeleton placeholder initially", () => {
    render(<QrCode value="https://example.com" label="Test QR" />);
    const skeleton = screen.getByLabelText("Test QR");
    expect(skeleton.className).toContain("animate-pulse");
    expect(skeleton.className).toContain("rounded-xl");
  });

  it("renders the QR SVG after useEffect resolves", async () => {
    render(<QrCode value="https://example.com" label="Test QR" />);
    const qrImage = await screen.findByRole("img", { name: "Test QR" });
    expect(qrImage.className).toContain("overflow-hidden");
  });

  it("calls QRCode.toString with correct options", async () => {
    render(<QrCode value="https://example.com" label="Test QR" size={300} />);
    await screen.findByRole("img");

    expect(mockToString).toHaveBeenCalledWith("https://example.com", {
      type: "svg",
      width: 300,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#1e3a5f", light: "#ffffff" },
    });
  });

  it("shows skeleton when QRCode.toString rejects", async () => {
    mockToString.mockRejectedValue(new Error("fail"));
    render(<QrCode value="https://example.com" label="Test QR" />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(screen.getByLabelText("Test QR").className).toContain("animate-pulse");
  });

  it("applies className prop to the wrapper", async () => {
    render(<QrCode value="https://example.com" label="Test QR" className="shadow-md" />);
    const el = await screen.findByRole("img", { name: "Test QR" });
    expect(el.className).toContain("shadow-md");
  });
});
