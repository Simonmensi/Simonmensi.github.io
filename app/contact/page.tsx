/**
 * @file contact/page.tsx
 * @description Contact page — shows a QR code for scanning and a direct
 * download button for Simon's vCard.
 *
 * Flow (mobile, via QR scan):
 * 1. Visitor scans the QR code → lands here
 * 2. Taps "Save to Contacts" → vCard downloads, phone prompts to add contact
 *
 * Flow (desktop, Simon showing his screen):
 * 1. Simon opens this page and shows the QR code
 * 2. Visitor scans with their phone
 */

"use client";

import { QrPanel } from "@/components/contact/QrPanel";
import { Button } from "@/components/ui/Button";
import { VCARD_FILENAME, OWNER_NAME } from "@/constants";
import { buildVCardString, downloadVCard } from "@/lib/generate-vcard";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";

/**
 * Contact page.
 *
 * @returns The contact page element.
 */
export default function ContactPage() {
  function handleDownload() {
    const vcf = buildVCardString(SIMON_VCARD_DATA);
    downloadVCard(vcf, VCARD_FILENAME);
  }

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-300 sm:text-4xl">
            Add Simon&apos;s Contact
          </h1>
          <p className="mt-3 text-base text-blue-900/60 dark:text-blue-300/60">
            Scan the code below to add Simon&apos;s card to your contacts.
          </p>
        </div>

        {/* QR code */}
        <div className="mb-10">
          <QrPanel />
        </div>

        {/* Manual download — useful after scanning on mobile */}
        <Button
          variant="primary"
          size="md"
          onClick={handleDownload}
          className="w-full justify-center"
        >
          Save {OWNER_NAME} to Contacts
        </Button>

      </div>
    </main>
  );
}
