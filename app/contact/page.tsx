/**
 * @file contact/page.tsx
 * @description Contact page — automatically downloads Simon's vCard when
 * the page loads. Intended to be reached by scanning the QR code.
 *
 * Flow:
 * 1. Visitor scans QR code → lands here on mobile
 * 2. vCard download is triggered immediately on mount
 * 3. Page shows a confirmation with a manual fallback download button
 */

"use client";

import { useEffect, useState } from "react";
import { QrPanel } from "@/components/contact/QrPanel";
import { Button } from "@/components/ui/Button";
import { VCARD_FILENAME, OWNER_NAME } from "@/constants";
import { buildVCardString, downloadVCard } from "@/lib/generate-vcard";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";

/**
 * Contact page — downloads Simon's vCard on mount and shows a QR code
 * for sharing in person.
 *
 * @returns The contact page element.
 */
export default function ContactPage() {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const vcf = buildVCardString(SIMON_VCARD_DATA);
    downloadVCard(vcf, VCARD_FILENAME);
    setDownloaded(true);
  }, []);

  function handleRetry() {
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
            {downloaded
              ? `${OWNER_NAME}'s card is downloading — open it to save the contact.`
              : "Preparing your download…"}
          </p>
        </div>

        {/* Fallback download button */}
        {downloaded && (
          <div className="mb-10">
            <Button
              variant="primary"
              size="md"
              onClick={handleRetry}
              className="w-full justify-center"
            >
              Download again
            </Button>
          </div>
        )}

        {/* QR for sharing in person */}
        <div className="border-t border-blue-900/10 dark:border-blue-300/10 pt-8">
          <p className="mb-6 text-sm text-blue-900/50 dark:text-blue-300/50">
            Scan the code to add Simon&apos;s card
          </p>
          <QrPanel />
        </div>

      </div>
    </main>
  );
}
