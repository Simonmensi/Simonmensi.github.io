/**
 * @file components/contact/QrPanel.tsx
 * @description Collapsible QR code panel for the contact page.
 * Lets Simon display the QR on his screen so a visitor can scan it.
 */

"use client";

import { useState } from "react";
import { QrCode } from "@/components/ui/QrCode";
import { CONTACT_URL } from "@/constants";

/**
 * Props for the {@link QrPanel} component.
 */
export interface Props {
  /**
   * Override the URL encoded in the QR code.
   * @defaultValue {@link CONTACT_URL}
   */
  url?: string;
}

/**
 * Collapsible panel containing a scannable QR code.
 *
 * Hidden by default behind a toggle button so it does not distract visitors
 * who arrived by scanning. Simon can expand it to share the page URL in person.
 *
 * @param props - {@link Props}
 * @returns A collapsible `<div>` with a toggle button and a {@link QrCode}.
 *
 * @example
 * // Default — encodes the live /contact/ URL
 * <QrPanel />
 *
 * @example
 * // Override for local testing
 * <QrPanel url="http://localhost:3000/contact/" />
 */
export function QrPanel({ url = CONTACT_URL }: Props) {
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="mb-6 flex flex-col items-center">
      <button
        type="button"
        onClick={() => setShowQr((prev) => !prev)}
        className="text-sm font-medium text-blue-900/50 dark:text-blue-300/50 underline underline-offset-2 transition-colors hover:text-blue-900 dark:hover:text-blue-300"
        aria-expanded={showQr}
        aria-controls="qr-panel"
      >
        {showQr ? "Hide QR code" : "Show QR code to share this page"}
      </button>

      {showQr && (
        <div id="qr-panel" className="mt-4 flex flex-col items-center gap-2">
          <QrCode
            value={url}
            size={200}
            label="Scan to open Simon's contact exchange form"
            className="shadow-md"
          />
          <p className="text-xs text-blue-900/40 dark:text-blue-300/40">
            Scan to open this page on your phone
          </p>
        </div>
      )}
    </div>
  );
}
