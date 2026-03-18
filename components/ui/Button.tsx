/**
 * @file Button.tsx
 * @description Reusable Button atom. Renders as an `<a>` when `href` is
 * provided, or a `<button>` otherwise. Supports three visual variants,
 * three sizes, and an optional loading state.
 */

import React from "react";

/**
 * Props for the {@link Button} component.
 */
export interface Props {
  /**
   * Visual style of the button.
   * - `primary`  — filled blue-900, white text (default)
   * - `outline`  — transparent background, blue-900 border and text
   * - `ghost`    — no background or border, blue-900 text
   * @defaultValue `"primary"`
   */
  variant?: "primary" | "outline" | "ghost";
  /**
   * Size of the button.
   * - `sm` — `px-4 py-2 text-sm`
   * - `md` — `px-8 py-3 text-base` (default)
   * - `lg` — `px-10 py-4 text-lg`
   * @defaultValue `"md"`
   */
  size?: "sm" | "md" | "lg";
  /**
   * When provided the component renders as an `<a>` tag with this href.
   * Omit to render a `<button>` element.
   */
  href?: string;
  /** Button label or inner content. */
  children: React.ReactNode;
  /** Additional Tailwind classes merged onto the root element. */
  className?: string;
  /**
   * Disables the button and prevents interaction.
   * @defaultValue `false`
   */
  disabled?: boolean;
  /**
   * When `true` the button is disabled and a spinning indicator replaces
   * the label area to signal an in-progress operation.
   * @defaultValue `false`
   */
  isLoading?: boolean;
  /**
   * The `type` attribute forwarded to the underlying `<button>` element.
   * Use `"submit"` when the button is inside a `<form>` that should be
   * submitted on click.
   * @defaultValue `"button"`
   */
  type?: "button" | "submit" | "reset";
  /** Click handler — only applied when rendering as a `<button>`. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/** Tailwind classes shared by every variant and size. */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const VARIANT_CLASSES: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-blue-900 text-white shadow-md hover:bg-blue-800 focus-visible:ring-blue-900 focus-visible:ring-offset-white disabled:bg-blue-900/50",
  outline:
    "border-2 border-blue-900 text-blue-900 bg-transparent hover:bg-blue-50 focus-visible:ring-blue-900 disabled:border-blue-900/40 disabled:text-blue-900/40",
  ghost:
    "text-blue-900 bg-transparent hover:bg-blue-50 focus-visible:ring-blue-900 disabled:text-blue-900/40",
};

const SIZE_CLASSES: Record<NonNullable<Props["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-4 text-lg",
};

/**
 * Inline SVG spinner shown when `isLoading` is `true`.
 * Sized to match the current text size via `1em` dimensions.
 */
function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/**
 * Reusable Button atom component.
 *
 * Renders as an `<a>` element when `href` is supplied, otherwise as a
 * `<button>`. Combines `variant`, `size`, `disabled`, and `isLoading`
 * props to produce consistent, accessible buttons across the site.
 *
 * @param props - {@link Props}
 * @returns A styled `<button>` or `<a>` element.
 *
 * @example
 * // Primary CTA (renders as a link)
 * <Button href="#projects" size="md" variant="primary">
 *   Explore My Work
 * </Button>
 *
 * @example
 * // Outline button in loading state
 * <Button variant="outline" isLoading>
 *   Saving…
 * </Button>
 *
 * @example
 * // Small ghost button with click handler
 * <Button variant="ghost" size="sm" onClick={handleClose}>
 *   Dismiss
 * </Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  disabled = false,
  isLoading = false,
  type = "button",
  onClick,
}: Props) {
  const isDisabled = disabled || isLoading;

  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {isLoading && <Spinner />}
      <span className={isLoading ? "opacity-60" : undefined}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
