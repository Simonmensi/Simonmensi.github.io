/**
 * @file components/contact/QrPanel.tsx
 * @description Collapsible QR code panel for the contact page.
 * Lets Simon display the QR on his screen so a visitor can scan it.
 */

"use client";

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
  /** Whether the QR code is currently visible. Controlled by the parent. */
  showQr: boolean;
  /** Called when the toggle button is clicked. */
  onToggle: () => void;
}

/**
 * QR code panel with a toggle button.
 *
 * Visibility is controlled externally via `showQr` / `onToggle` so the
 * parent page can also hide/show the form when the QR is toggled.
 *
 * @param props - {@link Props}
 * @returns A `<div>` with a toggle button and, when open, a {@link QrCode}.
 *
 * @example
 * const [showQr, setShowQr] = useState(false);
 * <QrPanel showQr={showQr} onToggle={() => setShowQr(v => !v)} />
 */
export function QrPanel({ url = CONTACT_URL, showQr, onToggle }: Props) {
  return (
    <div className="mb-6 flex flex-col items-center">
      <button
        type="button"
        onClick={onToggle}
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
