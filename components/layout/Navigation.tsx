/**
 * @file Navigation.tsx
 * @description Sticky site-wide navigation header with frosted-glass effect,
 * active link detection, mobile hamburger menu, and a prominent Contact CTA.
 *
 * Individual link rendering is delegated to {@link NavItem}.
 * Link data and the NavLink type are sourced from {@link constants}.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OWNER_NAME, NAV_LINKS } from "@/constants";
import type { NavLink } from "@/constants";
import { NavItem } from "./NavItem";

/**
 * Props for the {@link Navigation} component.
 */
export interface Props {
  /**
   * Override the default set of navigation links.
   * Useful for testing or embedding Navigation in other layouts.
   * Defaults to {@link NAV_LINKS}.
   */
  links?: NavLink[];
}

/**
 * Sticky site-wide navigation header.
 *
 * Features:
 * - Frosted-glass background (`bg-white/80 backdrop-blur-md`) over page content
 * - Active link highlighting via `usePathname()`
 * - Responsive: horizontal link bar on `md+`, hamburger dropdown on mobile
 * - CV link opens the PDF in a new tab directly from `public/`
 * - Contact link renders as a primary Button CTA
 * - Next.js `<Link>` for all internal routes so `basePath` is applied at build time
 *
 * @param props - {@link Props}
 * @returns A sticky `<header>` element containing the navigation.
 *
 * @example
 * // Default usage inside LayoutShell
 * <Navigation />
 *
 * @example
 * // Custom links override (e.g. for testing)
 * <Navigation links={[{ label: "Home", href: "/" }]} />
 */
export function Navigation({ links = NAV_LINKS }: Props) {
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
          {OWNER_NAME}
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
