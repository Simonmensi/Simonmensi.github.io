/**
 * @file LayoutShell.tsx
 * @description Top-level layout shell that composes Navigation, page content,
 * and Footer into a consistent full-page structure.
 */

import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

/**
 * Props for the {@link LayoutShell} component.
 */
export interface Props {
  /** Page content rendered between the Navigation and Footer. */
  children: React.ReactNode;
}

/**
 * Top-level layout shell.
 *
 * Wraps every page with the sticky {@link Navigation} header and the
 * site-wide {@link Footer}. The `children` slot receives the page's
 * `<main>` content directly from the App Router page component.
 *
 * Usage: import and render inside `app/layout.tsx` so every route
 * automatically inherits the header and footer.
 *
 * @param props - {@link Props}
 * @returns A full-height flex column containing nav, content, and footer.
 *
 * @example
 * // app/layout.tsx
 * import { LayoutShell } from "@/components/layout/LayoutShell";
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <LayoutShell>{children}</LayoutShell>
 *       </body>
 *     </html>
 *   );
 * }
 */
export function LayoutShell({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
