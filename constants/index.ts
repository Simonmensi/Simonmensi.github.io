/**
 * @file constants/index.ts
 * @description Single source of truth for all site-wide magic strings.
 *
 * Every hardcoded URL, name, path, and navigation entry in the codebase
 * must reference a constant from this file. No component or page should
 * declare its own copy of these values.
 *
 * Update here → the whole site updates automatically.
 */

// ─────────────────────────────────────────────────────────────
// Owner
// ─────────────────────────────────────────────────────────────

/** Full legal name shown in the nav brand, footer copyright, and vCard. */
export const OWNER_NAME = "Simon Lei" as const;

/** Professional job title shown in metadata and the hero section. */
export const OWNER_TITLE = "System Analyst" as const;

/** Current employer / institution shown in metadata and the vCard ORG field. */
export const OWNER_ORG = "NUS-ISS" as const;

// ─────────────────────────────────────────────────────────────
// URLs
// ─────────────────────────────────────────────────────────────

/** Root URL of the deployed GitHub Pages site (no trailing slash). */
export const SITE_URL = "https://simonmensi.github.io" as const;

/**
 * Absolute URL of the contact / lead-gen page.
 * Used as the QR code target so the scanned URL is always correct.
 */
export const CONTACT_URL = `${SITE_URL}/contact/` as const;

/** LinkedIn profile URL for the owner. */
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/诺臻-雷-4aa88039b" as const;

// ─────────────────────────────────────────────────────────────
// Assets
// ─────────────────────────────────────────────────────────────

/**
 * Public-directory path to the CV PDF.
 * Served directly by GitHub Pages; opened in a new tab from the nav and footer.
 */
export const CV_PDF_PATH = "/simon-mensi-cv.pdf" as const;

/**
 * Filename used when the vCard is downloaded by the visitor's browser.
 * Matches the owner's real name so it appears correctly in Contacts apps.
 */
export const VCARD_FILENAME = "simon-lei.vcf" as const;

// ─────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────

/**
 * Typed map of every internal route in the application.
 * Use these instead of bare string literals in `<Link href>` or redirects.
 */
export const ROUTES = {
  home: "/",
  projects: "/projects",
  cv: "/cv",
  contact: "/contact",
} as const;

// ─────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────

/**
 * Descriptor for a single navigation link.
 * Exported here so both `constants/index.ts` (data) and
 * `components/layout/Navigation.tsx` (rendering) share the same type.
 */
export interface NavLink {
  /** Display label shown in the nav bar. */
  label: string;
  /**
   * Destination href.
   * - Internal routes: use values from {@link ROUTES}
   * - External / asset links: use {@link CV_PDF_PATH} or a full URL
   */
  href: string;
  /**
   * When `true` the link opens in a new tab and renders as `<a>` instead
   * of Next.js `<Link>`. Use for PDFs and off-site URLs.
   * @defaultValue `false`
   */
  external?: boolean;
  /**
   * When `true` the link renders as a primary Button CTA rather than a
   * plain text link. Use for the highest-priority single action.
   * @defaultValue `false`
   */
  cta?: boolean;
}

/**
 * Default navigation links for the portfolio.
 * Consumed by `Navigation.tsx`; override via the `links` prop for testing.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Home",     href: ROUTES.home },
  { label: "Projects", href: ROUTES.projects },
  { label: "CV",       href: ROUTES.cv },
  { label: "Contact",  href: ROUTES.contact, cta: true },
];

// ─────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────

/** Default `<title>` tag used in the root layout. */
export const SITE_TITLE = `${OWNER_NAME} — ${OWNER_TITLE}` as const;

/** Default `<meta name="description">` used in the root layout. */
export const SITE_DESCRIPTION =
  `Personal portfolio of ${OWNER_NAME}, ${OWNER_TITLE} at ${OWNER_ORG}. ` +
  `Projects, CV, and contact.`;
