/**
 * @file page.tsx
 * @description Home page — tri-layer hero section for Simon Lei's portfolio.
 */

import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { OWNER_NAME, OWNER_TITLE, SITE_URL, SITE_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${OWNER_NAME} — ${OWNER_TITLE}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: `${OWNER_NAME} — ${OWNER_TITLE}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    type: "website",
  },
};

/**
 * Props for the HeroSection component.
 */
interface HeroSectionProps {
  /** Primary heading displayed in the hero. */
  title: string;
  /** Secondary line displayed below the title. */
  subtitle: string;
  /** Label text for the call-to-action button. */
  ctaLabel: string;
  /** href target for the call-to-action button. */
  ctaHref: string;
}

/**
 * Tri-layer hero section.
 *
 * The background is split into three horizontal bands:
 * - Top 40 %   — solid `blue-900`
 * - Middle 20 % — vertical gradient `blue-900 → white`
 * - Bottom 40 % — solid `white`
 *
 * All three bands are absolutely positioned behind a `z-10` foreground.
 *
 * @param props - {@link HeroSectionProps}
 * @returns A full-viewport-height hero section element.
 *
 * @example
 * ```tsx
 * <HeroSection
 *   title="Simon's Personal Portfolio"
 *   subtitle="System Analyst"
 *   ctaLabel="Explore My Work"
 *   ctaHref="#projects"
 * />
 * ```
 */
function HeroSection({ title, subtitle, ctaLabel, ctaHref }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background layer 1 — solid blue-900 (top 40%) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[40%] bg-blue-900"
      />

      {/* Background layer 2 — gradient blue-900 → white (middle 20%) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[40%] h-[20%] bg-gradient-to-b from-blue-900 to-white"
      />

      {/* Background layer 3 — solid white (bottom 40%) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[40%] bg-white"
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center sm:px-12 md:px-24">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="text-lg font-medium text-blue-100 sm:text-xl md:text-2xl">
          {subtitle}
        </p>
        <Button
          href={ctaHref}
          variant="outline"
          size="md"
          className="mt-4 border-white text-white hover:bg-white hover:text-blue-900 focus-visible:ring-white focus-visible:ring-offset-blue-900"
        >
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}

/**
 * Home page — renders the Hero section.
 *
 * @returns The root home page element.
 */
export default function HomePage() {
  return (
    <main>
      <HeroSection
        title={`${OWNER_NAME}'s Portfolio`}
        subtitle={OWNER_TITLE}
        ctaLabel="Explore My Work"
        ctaHref="/projects"
      />
    </main>
  );
}
