import { describe, it, expect } from "vitest";
import {
  OWNER_NAME,
  OWNER_TITLE,
  OWNER_ORG,
  SITE_URL,
  CONTACT_URL,
  LINKEDIN_URL,
  CV_PDF_PATH,
  VCARD_FILENAME,
  ROUTES,
  NAV_LINKS,
  SITE_TITLE,
  SITE_DESCRIPTION,
} from "@/constants";

describe("Owner constants", () => {
  it("are non-empty strings", () => {
    expect(OWNER_NAME).toBeTruthy();
    expect(OWNER_TITLE).toBeTruthy();
    expect(OWNER_ORG).toBeTruthy();
  });
});

describe("URL constants", () => {
  it("SITE_URL is a valid https URL", () => {
    expect(SITE_URL).toMatch(/^https:\/\//);
  });

  it("CONTACT_URL starts with SITE_URL and ends with /contact/", () => {
    expect(CONTACT_URL.startsWith(SITE_URL)).toBe(true);
    expect(CONTACT_URL.endsWith("/contact/")).toBe(true);
  });

  it("LINKEDIN_URL points to linkedin.com", () => {
    expect(LINKEDIN_URL).toMatch(/^https:\/\/www\.linkedin\.com/);
  });
});

describe("Asset constants", () => {
  it("CV_PDF_PATH starts with / and ends with .pdf", () => {
    expect(CV_PDF_PATH.startsWith("/")).toBe(true);
    expect(CV_PDF_PATH.endsWith(".pdf")).toBe(true);
  });

  it("VCARD_FILENAME ends with .vcf", () => {
    expect(VCARD_FILENAME.endsWith(".vcf")).toBe(true);
  });
});

describe("ROUTES", () => {
  const expectedKeys = ["home", "projects", "cv", "contact"] as const;

  it("has all expected route keys", () => {
    for (const key of expectedKeys) {
      expect(ROUTES).toHaveProperty(key);
    }
  });

  it("each route value starts with /", () => {
    for (const value of Object.values(ROUTES)) {
      expect(value.startsWith("/")).toBe(true);
    }
  });
});

describe("NAV_LINKS", () => {
  it("has exactly 4 entries", () => {
    expect(NAV_LINKS).toHaveLength(4);
  });

  it("Contact entry has cta: true", () => {
    const contactLink = NAV_LINKS.find((l) => l.href === ROUTES.contact);
    expect(contactLink).toBeDefined();
    expect(contactLink!.cta).toBe(true);
  });

  it("has no duplicate href values", () => {
    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("Metadata constants", () => {
  it("SITE_TITLE contains OWNER_NAME and OWNER_TITLE", () => {
    expect(SITE_TITLE).toContain(OWNER_NAME);
    expect(SITE_TITLE).toContain(OWNER_TITLE);
  });

  it("SITE_DESCRIPTION contains OWNER_NAME, OWNER_TITLE, and OWNER_ORG", () => {
    expect(SITE_DESCRIPTION).toContain(OWNER_NAME);
    expect(SITE_DESCRIPTION).toContain(OWNER_TITLE);
    expect(SITE_DESCRIPTION).toContain(OWNER_ORG);
  });
});
