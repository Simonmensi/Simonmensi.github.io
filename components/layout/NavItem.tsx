/**
 * @file NavItem.tsx
 * @description Single navigation item renderer — CTA button, external link,
 * or internal Next.js Link with active styling.
 *
 * Extracted from Navigation.tsx to keep both files under the 150-line limit.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { NavLink } from "@/constants";

/**
 * Props for the {@link NavItem} component.
 */
export interface Props {
  /** The {@link NavLink} descriptor to render. */
  link: NavLink;
  /** Current route pathname from `usePathname()`, used for active styling. */
  pathname: string;
  /**
   * Optional handler called after the link is activated.
   * Used to close the mobile menu.
   */
  onClick?: () => void;
}

/**
 * Renders a single navigation item.
 *
 * Renders one of three variants based on the link descriptor:
 * - `cta: true`      → primary {@link Button}
 * - `external: true` → plain `<a>` opening in a new tab with an icon
 * - default          → Next.js `<Link>` with active underline styling
 *
 * @param props - {@link Props}
 * @returns A styled nav item element.
 *
 * @example
 * <NavItem link={{ label: "Contact", href: "/contact", cta: true }} pathname="/" />
 */
export function NavItem({ link, pathname, onClick }: Props) {
  const isActive = !link.external && pathname === link.href;

  if (link.cta) {
    return (
      <Button href={link.href} variant="primary" size="sm">
        {link.label}
      </Button>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-blue-900/70 transition-colors hover:text-blue-900"
        onClick={onClick}
      >
        {link.label}
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-3 opacity-60"
        >
          <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
          <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
        </svg>
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onClick}
      className={[
        "text-sm font-medium transition-colors hover:text-blue-900",
        isActive
          ? "text-blue-900 underline underline-offset-4 decoration-blue-900/40"
          : "text-blue-900/70",
      ].join(" ")}
    >
      {link.label}
    </Link>
  );
}
