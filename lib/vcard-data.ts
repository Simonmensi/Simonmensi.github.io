/**
 * @file vcard-data.ts
 * @description Single source of truth for Simon Lei's contact details.
 * Update this file whenever contact information changes — all vCard
 * generation pulls from here automatically.
 */

/**
 * Shape of a person's contact data used for vCard generation.
 */
export interface ContactData {
  /** Full display name (FN field in vCard). */
  fullName: string;
  /** Family name / last name (N field). */
  lastName: string;
  /** Given name / first name (N field). */
  firstName: string;
  /** Job title (TITLE field). */
  title: string;
  /** Organisation or company name (ORG field). */
  org: string;
  /** Mobile phone number in international format (TEL field). */
  phone: string;
  /** Email address (EMAIL field). */
  email: string;
  /** Personal website URL (URL field). */
  website: string;
  /** LinkedIn profile URL (X-SOCIALPROFILE or URL field). */
  linkedin: string;
}

/**
 * Simon Lei's contact details.
 *
 * This constant is imported by {@link generateVCard} to produce the `.vcf`
 * file that is downloaded by visitors on the Contact page.
 *
 * @example
 * ```ts
 * import { SIMON_VCARD_DATA } from "@/lib/vcard-data";
 * console.log(SIMON_VCARD_DATA.phone); // "+6580385655"
 * ```
 */
export const SIMON_VCARD_DATA: ContactData = {
  fullName: "Simon Lei",
  lastName: "Lei",
  firstName: "Simon",
  title: "System Analyst",
  org: "NUS-ISS",
  phone: "+6580385655",
  email: "Simon68562776@outlook.com",
  website: "https://simonmensi.github.io",
  linkedin: "https://www.linkedin.com/in/诺臻-雷-4aa88039b",
};
