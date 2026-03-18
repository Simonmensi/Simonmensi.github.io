/**
 * @file Spinner.tsx
 * @description Inline SVG loading spinner atom. Sized to `1em` so it scales
 * with the surrounding font size. Used by {@link Button} when `isLoading` is
 * `true` and can be used anywhere a contextual loading indicator is needed.
 */

/**
 * Props for the {@link Spinner} component.
 */
export interface Props {
  /** Additional Tailwind classes merged onto the root `<svg>`. */
  className?: string;
}

/**
 * Inline SVG spinner that animates via Tailwind's `animate-spin` class.
 *
 * @param props - {@link Props}
 * @returns An `<svg>` element with a circular indeterminate progress animation.
 *
 * @example
 * // Standalone usage
 * <Spinner />
 *
 * @example
 * // With extra classes
 * <Spinner className="text-white" />
 */
export function Spinner({ className = "" }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={["animate-spin", className].filter(Boolean).join(" ")}
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
