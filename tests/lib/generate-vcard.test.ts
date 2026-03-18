import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildVCardString, downloadVCard, saveLead } from "@/lib/generate-vcard";
import type { ContactData } from "@/lib/vcard-data";

const mockData: ContactData = {
  fullName: "Simon Lei",
  lastName: "Lei",
  firstName: "Simon",
  title: "System Analyst",
  org: "NUS-ISS",
  phone: "+6580385655",
  email: "test@example.com",
  website: "https://example.com",
  linkedin: "https://linkedin.com/in/test",
};

describe("buildVCardString()", () => {
  it("produces a valid vCard 3.0 structure", () => {
    const result = buildVCardString(mockData);
    expect(result).toContain("BEGIN:VCARD");
    expect(result).toContain("VERSION:3.0");
    expect(result).toContain("END:VCARD");
  });

  it("includes all contact fields", () => {
    const result = buildVCardString(mockData);
    expect(result).toContain("FN:Simon Lei");
    expect(result).toContain("N:Lei;Simon;;;");
    expect(result).toContain("TITLE:System Analyst");
    expect(result).toContain("ORG:NUS-ISS");
    expect(result).toContain("TEL;TYPE=CELL:+6580385655");
    expect(result).toContain("EMAIL;TYPE=INTERNET:test@example.com");
    expect(result).toContain("URL:https://example.com");
    expect(result).toContain("X-SOCIALPROFILE;TYPE=linkedin:https://linkedin.com/in/test");
  });

  it("preserves Unicode characters in fields", () => {
    const unicodeData: ContactData = {
      ...mockData,
      fullName: "雷诺臻",
      org: "新加坡国立大学",
    };
    const result = buildVCardString(unicodeData);
    expect(result).toContain("FN:雷诺臻");
    expect(result).toContain("ORG:新加坡国立大学");
  });

  it("uses CRLF line endings", () => {
    const result = buildVCardString(mockData);
    const lines = result.split("\r\n");
    expect(lines.length).toBeGreaterThan(1);
    expect(result).not.toContain("\n\r");
  });

  it("does not have trailing newline after END:VCARD", () => {
    const result = buildVCardString(mockData);
    expect(result.endsWith("END:VCARD")).toBe(true);
  });
});

describe("downloadVCard()", () => {
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let appendChildSpy: ReturnType<typeof vi.spyOn>;
  let removeChildSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    createObjectURLSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:fake-url");
    revokeObjectURLSpy = vi.spyOn(URL, "revokeObjectURL");
    appendChildSpy = vi.spyOn(document.body, "appendChild");
    removeChildSpy = vi.spyOn(document.body, "removeChild");
  });

  it("creates a Blob with the correct MIME type and triggers download", () => {
    const vcf = "BEGIN:VCARD\r\nEND:VCARD";
    const clickSpy = vi.fn();

    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "a") {
        const anchor = originalCreateElement("a") as HTMLAnchorElement;
        anchor.click = clickSpy;
        return anchor;
      }
      return originalCreateElement(tag);
    });

    downloadVCard(vcf, "test.vcf");

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    const blobArg = createObjectURLSpy.mock.calls[0][0] as Blob;
    expect(blobArg.type).toBe("text/vcard;charset=utf-8");

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:fake-url");
  });

  it("sets the download attribute to the provided filename", () => {
    let capturedAnchor: HTMLAnchorElement;
    const nativeCreateElement = (tag: string) => {
      return document.implementation.createHTMLDocument("test").createElement(tag);
    };
    vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "a") {
        const anchor = nativeCreateElement("a") as HTMLAnchorElement;
        anchor.click = vi.fn();
        capturedAnchor = anchor;
        return anchor;
      }
      return nativeCreateElement(tag);
    });

    downloadVCard("BEGIN:VCARD\r\nEND:VCARD", "simon-lei.vcf");

    expect(capturedAnchor!.download).toBe("simon-lei.vcf");
  });
});

describe("saveLead()", () => {
  beforeEach(() => {
    (window.localStorage.clear as ReturnType<typeof vi.fn>)();
    vi.clearAllMocks();
  });

  it("creates a new array when localStorage is empty", () => {
    saveLead({ name: "Alice", phone: "+65 1234", submittedAt: "2026-03-18T00:00:00Z" });

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    const stored = JSON.parse((window.localStorage.setItem as ReturnType<typeof vi.fn>).mock.calls[0][1]);
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("Alice");
  });

  it("appends to existing leads", () => {
    (window.localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify([{ name: "Bob", phone: "+65 0000", submittedAt: "2026-01-01T00:00:00Z" }]),
    );

    saveLead({ name: "Alice", phone: "+65 1234", submittedAt: "2026-03-18T00:00:00Z" });

    const stored = JSON.parse((window.localStorage.setItem as ReturnType<typeof vi.fn>).mock.calls[0][1]);
    expect(stored).toHaveLength(2);
    expect(stored[1].name).toBe("Alice");
  });

  it("uses the correct localStorage key", () => {
    saveLead({ name: "Alice", phone: "+65 1234", submittedAt: "2026-03-18T00:00:00Z" });
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "simonmensi_leads",
      expect.any(String),
    );
  });
});
