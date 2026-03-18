/**
 * @file QrCode.tsx
 * @description Client-side QR code renderer using the `qrcode` library.
 * Generates an inline SVG on mount — SSG-safe (no server API required).
 */

"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/**
 * Props for the {@link QrCode} component.
 */
export interface Props {
  /**
   * The URL or text to encode into the QR code.
   */
  value: string;
  /**
   * Width and height of the rendered SVG in pixels.
   * @defaultValue `200`
   */
  size?: number;
  /**
   * Accessible label describing what the QR code links to.
   * Used as the `<img>` alt text equivalent for screen readers.
   */
  label: string;
  /** Additional Tailwind classes applied to the wrapping `<div>`. */
  className?: string;
}

/**
 * Inline SVG QR code component.
 *
 * Renders `null` on the server (SSG-compatible), then generates the QR
 * SVG on the client after hydration. The QR encodes `value` using
 * error-correction level M so it remains scannable at common print sizes.
 *
 * @param props - {@link Props}
 * @returns A `<div>` containing the QR SVG, or `null` before hydration.
 *
 * @example
 * ```tsx
 * <QrCode
 *   value="https://simonmensi.github.io/contact/"
 *   size={200}
 *   label="Scan to open Simon's contact form"
 * />
 * ```
 */
export function QrCode({ value, size = 200, label, className = "" }: Props) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toString(value, {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#1e3a5f", light: "#ffffff" },
    })
      .then((result: string) => {
        if (!cancelled) setSvg(result);
      })
      .catch(() => {
        // Silently fail — placeholder shown instead
      });

    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!svg) {
    // Skeleton placeholder while QR is generating
    return (
      <div
        aria-label={label}
        className={`animate-pulse rounded-xl bg-blue-900/10 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`overflow-hidden rounded-xl ${className}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
