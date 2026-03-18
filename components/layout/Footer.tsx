/**
 * @file Footer.tsx
 * @description Site-wide footer with copyright notice and quick links.
 */

import Link from "next/link";
import { OWNER_NAME, ROUTES, CV_PDF_PATH } from "@/constants";

/**
 * Props for the {@link Footer} component.
 */
export interface Props {
  /**
   * Override the copyright name displayed in the footer.
   * @defaultValue {@link OWNER_NAME}
   */
  ownerName?: string;
}

/**
 * Site-wide footer component.
 *
 * Displays a copyright notice with the current year (computed at build time
 * for SSG) and a minimal set of quick links matching the main navigation.
 * Styled to complement the Hero Section's blue-900 / white palette.
 *
 * @param props - {@link Props}
 * @returns A `<footer>` element with copyright and quick links.
 *
 * @example
 * // Default usage inside LayoutShell
 * <Footer />
 *
 * @example
 * // Custom owner name
 * <Footer ownerName="Acme Corp" />
 */
export function Footer({ ownerName = OWNER_NAME }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-blue-900/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        {/* Copyright */}
        <p className="text-sm text-blue-900/50">
          &copy; {year} {ownerName}. All rights reserved.
        </p>

        {/* Quick links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-6" role="list">
            <li>
              <Link href={ROUTES.home} className="text-sm text-blue-900/50 transition-colors hover:text-blue-900">
                Home
              </Link>
            </li>
            <li>
              <Link href={ROUTES.projects} className="text-sm text-blue-900/50 transition-colors hover:text-blue-900">
                Projects
              </Link>
            </li>
            <li>
              <Link href={ROUTES.guidelines} className="text-sm text-blue-900/50 transition-colors hover:text-blue-900">
                Guidelines
              </Link>
            </li>
            <li>
              <a href={CV_PDF_PATH} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-900/50 transition-colors hover:text-blue-900">
                CV
              </a>
            </li>
            <li>
              <Link href={ROUTES.contact} className="text-sm text-blue-900/50 transition-colors hover:text-blue-900">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
