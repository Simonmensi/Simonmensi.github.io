/**
 * @file components/contact/ThankYouMessage.tsx
 * @description Confirmation message displayed after successful contact form submission.
 */

"use client";

import { VCARD_FILENAME, OWNER_NAME } from "@/constants";
import { buildVCardString, downloadVCard } from "@/lib/generate-vcard";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";

/**
 * Props for the {@link ThankYouMessage} component.
 */
export interface Props {
  /** The visitor's name as entered in the form, used for personalisation. */
  visitorName: string;
}

/**
 * Thank-you confirmation shown after a successful form submission.
 *
 * Displays a green checkmark, a personalised heading, and a fallback
 * "Download again" button in case the browser blocked the auto-download.
 *
 * @param props - {@link Props}
 * @returns A centred confirmation message element.
 *
 * @example
 * <ThankYouMessage visitorName="Jane" />
 */
export function ThankYouMessage({ visitorName }: Props) {
  function handleRetry() {
    const vcf = buildVCardString(SIMON_VCARD_DATA);
    downloadVCard(vcf, VCARD_FILENAME);
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Checkmark icon */}
      <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-8 text-green-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300">
        Thanks, {visitorName.trim()}!
      </h2>
      <p className="max-w-sm text-blue-900/60 dark:text-blue-300/60">
        {OWNER_NAME}&apos;s contact card (<strong>{VCARD_FILENAME}</strong>) is
        downloading now. Open it to add {OWNER_NAME} directly to your contacts.
      </p>

      <p className="mt-2 text-xs text-blue-900/40 dark:text-blue-300/40">
        Didn&apos;t receive the download?{" "}
        <button
          type="button"
          className="underline underline-offset-2 transition-colors hover:text-blue-900 dark:hover:text-blue-300"
          onClick={handleRetry}
        >
          Download again
        </button>
      </p>
    </div>
  );
}
