/**
 * @file components/contact/QrPanel.tsx
 * @description Always-visible QR code panel for the contact page.
 * Displays Simon's contact page URL as a scannable QR code.
 */

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
 * Always-visible QR code panel.
 *
 * Renders a scannable QR code that opens Simon's contact page.
 * No toggle — the code is always displayed.
 *
 * @param props - {@link Props}
 * @returns A centred `<div>` containing a {@link QrCode}.
 *
 * @example
 * <QrPanel />
 */
export function QrPanel({ url = CONTACT_URL }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <QrCode
        value={url}
        size={220}
        label="Scan to add Simon's contact card"
        className="shadow-md"
      />
    </div>
  );
}
