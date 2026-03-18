/**
 * @file contact/page.tsx
 * @description Contact / Lead Generation page stub.
 * Full vCard flow (name + phone form → localStorage save → .vcf download)
 * implemented in Phase 3.
 */

/**
 * Contact page — placeholder for the lead generation vCard flow.
 *
 * Flow (Phase 3):
 * 1. Customer scans QR code → lands here on mobile
 * 2. Fills in name + phone number
 * 3. App saves contact to localStorage
 * 4. Browser triggers .vcf download (client-side, no server required)
 *
 * @returns A minimal placeholder page element.
 */
export default function ContactPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-blue-900">Contact</h1>
      <p className="mt-4 text-blue-900/60">
        Lead generation form — coming soon in Phase 3.
      </p>
    </main>
  );
}
