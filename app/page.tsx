/**
 * @file page.tsx
 * @description Home page — hero section for Simon Lei's portfolio.
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
 * Hero section with a content-hugging gradient background.
 *
 * A single `absolute inset-0` gradient div tracks the section height
 * automatically, so the button always stays within the blue zone at
 * any browser zoom level (80 %–200 %). Vertical padding (`py-32
 * sm:py-40`) is zoom-invariant and determines the coloured area —
 * no viewport-percentage tricks that break on zoom.
 *
 * Gradient stops: solid blue-900 → short fade → white, replicating
 * the original tri-layer look.
 *
 * @param props - {@link HeroSectionProps}
 * @returns A content-height hero `<section>` element.
 *
 * @example
 * ```tsx
 * <HeroSection
 *   title="Simon Lei's Portfolio"
 *   subtitle="System Analyst"
 *   ctaLabel="Explore My Work"
 *   ctaHref="/projects"
 * />
 * ```
 */
function HeroSection({ title, subtitle, ctaLabel, ctaHref }: HeroSectionProps) {
  return (
    <section className="relative w-full">
      {/* Single gradient background — hugs content height automatically */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-blue-900 from-60% via-blue-900/80 via-80% to-white dark:to-gray-950"
      />

      {/* Foreground content — py-* controls the coloured area at any zoom */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-32 text-center sm:px-12 sm:py-40 md:px-24">
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="text-xl font-medium text-blue-100 sm:text-2xl md:text-3xl">
          {subtitle}
        </p>
        <Button
          href={ctaHref}
          variant="outline"
          size="lg"
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
