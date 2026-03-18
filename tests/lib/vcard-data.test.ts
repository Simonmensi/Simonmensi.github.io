import { describe, it, expect } from "vitest";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";
import { OWNER_NAME, OWNER_TITLE, OWNER_ORG, SITE_URL, LINKEDIN_URL } from "@/constants";

describe("SIMON_VCARD_DATA", () => {
  it("has all required fields as non-empty strings", () => {
    const fields = [
      "fullName",
      "lastName",
      "firstName",
      "title",
      "org",
      "phone",
      "email",
      "website",
      "linkedin",
    ] as const;

    for (const field of fields) {
      expect(typeof SIMON_VCARD_DATA[field]).toBe("string");
      expect(SIMON_VCARD_DATA[field].length).toBeGreaterThan(0);
    }
  });

  it("matches constants for derived fields", () => {
    expect(SIMON_VCARD_DATA.fullName).toBe(OWNER_NAME);
    expect(SIMON_VCARD_DATA.title).toBe(OWNER_TITLE);
    expect(SIMON_VCARD_DATA.org).toBe(OWNER_ORG);
    expect(SIMON_VCARD_DATA.website).toBe(SITE_URL);
    expect(SIMON_VCARD_DATA.linkedin).toBe(LINKEDIN_URL);
  });

  it("has the expected name parts", () => {
    expect(SIMON_VCARD_DATA.firstName).toBe("Simon");
    expect(SIMON_VCARD_DATA.lastName).toBe("Lei");
  });
});
