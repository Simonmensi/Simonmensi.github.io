/**
 * @file generate-vcard.ts
 * @description Pure utility function that converts a {@link ContactData}
 * object into a standards-compliant vCard 3.0 string and triggers a
 * browser file download. No server or Node.js APIs used — fully SSG-safe.
 */

import type { ContactData } from "@/lib/vcard-data";

/**
 * Builds a vCard 3.0 formatted string from the supplied contact data.
 *
 * The output follows the RFC 2426 vCard 3.0 specification which has the
 * broadest compatibility across iOS Contacts, Android, and Outlook.
 * Unicode characters (e.g. Chinese) are preserved as-is — modern vCard
 * readers handle UTF-8 correctly.
 *
 * @param data - The {@link ContactData} object to serialise.
 * @returns A complete vCard 3.0 string ready to be written to a `.vcf` file.
 *
 * @example
 * ```ts
 * import { buildVCardString } from "@/lib/generate-vcard";
 * import { SIMON_VCARD_DATA } from "@/lib/vcard-data";
 *
 * const vcf = buildVCardString(SIMON_VCARD_DATA);
 * console.log(vcf);
 * // BEGIN:VCARD
 * // VERSION:3.0
 * // ...
 * // END:VCARD
 * ```
 */
export function buildVCardString(data: ContactData): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${data.fullName}`,
    // N field: LastName;FirstName;MiddleName;Prefix;Suffix
    `N:${data.lastName};${data.firstName};;;`,
    `TITLE:${data.title}`,
    `ORG:${data.org}`,
    `TEL;TYPE=CELL:${data.phone}`,
    `EMAIL;TYPE=INTERNET:${data.email}`,
    `URL:${data.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${data.linkedin}`,
    "END:VCARD",
  ];

  return lines.join("\r\n");
}

/**
 * Triggers a browser download of the supplied vCard string as a `.vcf` file.
 *
 * Creates an in-memory `Blob`, attaches it to a temporary `<a>` element,
 * programmatically clicks it, then immediately revokes the object URL to
 * free memory. Works in all modern browsers including iOS Safari and
 * Android Chrome — no server or Node.js required.
 *
 * **Must be called from a user interaction handler** (e.g. form submit)
 * to avoid browser pop-up blockers.
 *
 * @param vcfString  - The vCard content to download (from {@link buildVCardString}).
 * @param filename   - The suggested filename for the downloaded file.
 *                     Should end in `.vcf`.
 * @returns `void`
 *
 * @example
 * ```ts
 * import { buildVCardString, downloadVCard } from "@/lib/generate-vcard";
 * import { SIMON_VCARD_DATA } from "@/lib/vcard-data";
 *
 * function handleSubmit() {
 *   const vcf = buildVCardString(SIMON_VCARD_DATA);
 *   downloadVCard(vcf, "simon-mensi.vcf");
 * }
 * ```
 */
export function downloadVCard(vcfString: string, filename: string): void {
  const blob = new Blob([vcfString], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  // Append, click, remove — required for Firefox compatibility
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Release the object URL to free memory
  URL.revokeObjectURL(url);
}

/**
 * Lead record saved to `localStorage` when a visitor submits the contact form.
 */
export interface LeadRecord {
  /** The visitor's name as entered in the form. */
  name: string;
  /** The visitor's phone number as entered in the form. */
  phone: string;
  /** ISO 8601 timestamp of when the form was submitted. */
  submittedAt: string;
}

/** localStorage key used to persist the leads array. */
const LEADS_STORAGE_KEY = "simonmensi_leads";

/**
 * Appends a new {@link LeadRecord} to the `localStorage` leads array.
 *
 * Reads the existing array, pushes the new record, and writes back.
 * Safe to call on first use (no existing key) — initialises with an
 * empty array automatically.
 *
 * @param lead - The {@link LeadRecord} to persist.
 * @returns `void`
 *
 * @example
 * ```ts
 * import { saveLead } from "@/lib/generate-vcard";
 *
 * saveLead({ name: "Alice", phone: "+1234567890", submittedAt: new Date().toISOString() });
 * ```
 */
export function saveLead(lead: LeadRecord): void {
  const existing = localStorage.getItem(LEADS_STORAGE_KEY);
  const leads: LeadRecord[] = existing ? (JSON.parse(existing) as LeadRecord[]) : [];
  leads.push(lead);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}
