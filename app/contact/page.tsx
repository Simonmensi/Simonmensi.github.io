/**
 * @file contact/page.tsx
 * @description Lead generation contact page — thin orchestrator.
 *
 * Flow:
 * 1. Visitor scans Simon's QR code → lands here on mobile
 * 2. Fills in Name and Phone Number via {@link VCardForm}
 * 3. On submit: lead saved, Simon's vCard downloaded, thank-you shown
 *
 * All logic is delegated to sub-components in `components/contact/`.
 */

"use client";

import { useState } from "react";
import { QrPanel } from "@/components/contact/QrPanel";
import { VCardForm } from "@/components/contact/VCardForm";
import { ThankYouMessage } from "@/components/contact/ThankYouMessage";

/**
 * Contact page — composes {@link QrPanel}, {@link VCardForm}, and
 * {@link ThankYouMessage} into the lead-capture flow.
 *
 * When the QR panel is open the form is hidden, so Simon can show
 * the QR on his screen without the input fields visible.
 *
 * @returns The contact page element.
 */
export default function ContactPage() {
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {visitorName !== null ? (
          <ThankYouMessage visitorName={visitorName} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-300 sm:text-4xl">
                Exchange Contacts
              </h1>
              <p className="mt-3 text-base text-blue-900/60 dark:text-blue-300/60">
                Enter your details and you&apos;ll instantly receive Simon&apos;s
                contact card.
              </p>
            </div>

            <QrPanel showQr={showQr} onToggle={() => setShowQr((v) => !v)} />

            {!showQr && (
              <>
                <VCardForm onSuccess={setVisitorName} />

                {/* Privacy note */}
                <p className="mt-6 text-center text-xs text-blue-900/40 dark:text-blue-300/40">
                  Your details are stored locally on this device only.
                  No data is sent to any server.
                </p>
              </>
            )}
          </>
        )}

      </div>
    </main>
  );
}
