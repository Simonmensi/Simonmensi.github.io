/**
 * @file Tag.tsx
 * @description Reusable Tag atom for displaying status labels and categorical
 * metadata. Designed for BIM guideline compliance indicators and general
 * informational badges.
 */

import React from "react";

/**
 * Visual style variants for the {@link Tag} component.
 *
 * - `success` — green tones; use for compliant or passing states
 * - `error`   — red tones; use for non-compliant or failing states
 * - `warning` — amber tones; use for pending review or caution states
 * - `info`    — blue tones; use for informational or in-progress states
 */
export type TagVariant = "success" | "error" | "warning" | "info";

/**
 * Props for the {@link Tag} component.
 */
export interface Props {
  /**
   * Visual style that communicates semantic meaning at a glance.
   * Maps to a colour family: green / red / amber / blue.
   */
  variant: TagVariant;
  /**
   * Label text or inner content rendered inside the pill.
   * Typically a short string such as "Compliant" or "Pending Review".
   */
  children: React.ReactNode;
  /**
   * Optional leading icon rendered to the left of the label.
   * Accepts any `React.ReactNode` — pass an SVG, an emoji, or a
   * component. Sized automatically via `text-xs` / `1em` scaling.
   *
   * @example
   * ```tsx
   * <Tag variant="success" icon={<CheckIcon />}>Compliant</Tag>
   * ```
   */
  icon?: React.ReactNode;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
}

/**
 * Tailwind class sets for each variant.
 * Background, text, and border are all in the same tint family so the
 * tag reads as a cohesive, low-contrast badge.
 */
const VARIANT_CLASSES: Record<TagVariant, string> = {
  success: "bg-green-100 text-green-800 border-green-200",
  error: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

/**
 * Human-readable ARIA role labels per variant, used as the accessible
 * status description when no icon alt-text is available.
 */
const VARIANT_LABELS: Record<TagVariant, string> = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

/**
 * Reusable Tag atom component.
 *
 * Renders a small, pill-shaped badge with a light tinted background and
 * dark matching text. Intended for status labels, compliance indicators,
 * and categorical metadata — not for interactive actions.
 *
 * Four semantic variants are provided:
 * - `success` (green)  — e.g. "Compliant"
 * - `error`   (red)    — e.g. "Non-Compliant"
 * - `warning` (amber)  — e.g. "Pending Review"
 * - `info`    (blue)   — e.g. "In Progress"
 *
 * @param props - {@link Props}
 * @returns A styled `<span>` element representing the tag.
 *
 * @example
 * // BIM compliance statuses
 * <Tag variant="success">Compliant</Tag>
 * <Tag variant="error">Non-Compliant</Tag>
 * <Tag variant="warning">Pending Review</Tag>
 * <Tag variant="info">In Progress</Tag>
 *
 * @example
 * // With a leading icon
 * <Tag variant="success" icon={<CheckCircleIcon className="size-3" />}>
 *   Compliant
 * </Tag>
 *
 * @example
 * // With extra classes for custom spacing
 * <Tag variant="info" className="ml-2">
 *   In Progress
 * </Tag>
 */
export function Tag({ variant, children, icon, className = "" }: Props) {
  return (
    <span
      role="status"
      aria-label={VARIANT_LABELS[variant]}
      className={[
        "inline-flex items-center gap-1 rounded-full border px-3 py-1",
        "text-xs font-semibold uppercase tracking-wide",
        VARIANT_CLASSES[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
