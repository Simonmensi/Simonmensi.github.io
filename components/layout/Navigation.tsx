/**
 * @file Navigation.tsx
 * @description Sticky site-wide navigation header with frosted-glass effect,
 * active link detection, mobile hamburger menu, and a prominent Contact CTA.
 *
 * Renders as an `<a target="_blank">` for external/PDF links and as a
 * Next.js `<Link>` for internal routes — basePath is handled automatically
 * by Next.js at build time.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

/** A single navigation link descriptor. */
interface NavLink {
  /** Display label shown in the nav bar. */
  label: string;
  /**
   * Destination href.
   * - Internal routes: `/`, `/projects`, `/guidelines`, `/contact`
   * - External / asset links: `/simon-mensi-cv.pdf`
   */
  href: string;
  /**
   * When `true` the link opens in a new tab and renders as `<a>` instead
   * of Next.js `<Link>`. Use for PDFs and off-site URLs.
   * @defaultValue `false`
   */
  external?: boolean;
  /**
   * When `true` the link renders as a primary {@link Button} CTA rather
   * than a plain text link. Use for the highest-priority action.
   * @defaultValue `false`
   */
  cta?: boolean;
}

/**
 * Props for the {@link Navigation} component.
 */
export interface Props {
  /**
   * Override the default set of navigation links.
   * Useful for testing or embedding Navigation in other layouts.
   * Defaults to: Home, Projects, Guidelines, CV (PDF), Contact.
   */
  links?: NavLink[];
}

/** Default navigation links for the Simon Mensi portfolio. */
const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Guidelines", href: "/guidelines" },
  { label: "CV", href: "/simon-mensi-cv.pdf", external: true },
  { label: "Contact", href: "/contact", cta: true },
];

/**
 * Renders a single nav item — either a CTA Button, an external `<a>`,
 * or an internal Next.js `<Link>` with active styling.
 *
 * @param link      - The {@link NavLink} descriptor to render.
 * @param pathname  - Current route pathname from `usePathname()`.
 * @param onClick   - Optional handler called after the link is activated
 *                    (used to close the mobile menu).
 * @returns A styled nav item element.
 */
function NavItem({
  link,
  pathname,
  onClick,
}: {
  link: NavLink;
  pathname: string;
  onClick?: () => void;
}) {
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

/**
 * Sticky site-wide navigation header.
 *
 * Features:
 * - Frosted-glass background (`bg-white/80 backdrop-blur-md`) over page content
 * - Active link highlighting via `usePathname()`
 * - Responsive: horizontal link bar on `md+`, hamburger dropdown on mobile
 * - CV link opens the PDF in a new tab directly from `public/`
 * - Contact link renders as a primary Button CTA — prominent on mobile for
 *   QR-code-scanning customers
 * - Next.js `<Link>` for all internal routes so `basePath` is applied
 *   automatically at build time
 *
 * @param props - {@link Props}
 * @returns A sticky `<header>` element containing the navigation.
 *
 * @example
 * // Default usage inside LayoutShell
 * <Navigation />
 *
 * @example
 * // Custom links override
 * <Navigation links={[{ label: "Home", href: "/" }]} />
 */
export function Navigation({ links = DEFAULT_LINKS }: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/10 bg-white/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-lg font-bold tracking-tight text-blue-900 transition-colors hover:text-blue-800"
        >
          Simon Mensi
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <NavItem link={link} pathname={pathname} />
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-blue-900 transition-colors hover:bg-blue-50 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-blue-900/10 bg-white/95 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-5 px-6 py-4" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <NavItem link={link} pathname={pathname} onClick={closeMenu} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
