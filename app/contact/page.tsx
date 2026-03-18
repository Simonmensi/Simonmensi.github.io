/**
 * @file contact/page.tsx
 * @description Lead generation contact page.
 *
 * Flow:
 * 1. Visitor scans Simon's QR code → lands here on mobile
 * 2. Fills in their Name and Phone Number
 * 3. On submit: lead saved to localStorage, Simon's vCard downloaded
 * 4. Thank-you confirmation shown
 *
 * Fully client-side — no server required, SSG-compatible.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { buildVCardString, downloadVCard, saveLead } from "@/lib/generate-vcard";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";

/**
 * Shape of the contact form's field values.
 */
interface FormValues {
  /** Visitor's full name. */
  name: string;
  /** Visitor's phone number. */
  phone: string;
}

/**
 * Shape of per-field validation error messages.
 * `undefined` means the field is valid.
 */
interface FormErrors {
  /** Validation message for the name field. */
  name?: string;
  /** Validation message for the phone field. */
  phone?: string;
}

/**
 * Validates the contact form values.
 *
 * @param values - The current {@link FormValues} to validate.
 * @returns A {@link FormErrors} object — empty if all fields are valid.
 *
 * @example
 * ```ts
 * const errors = validate({ name: "", phone: "" });
 * // errors.name === "Name is required"
 * ```
 */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  return errors;
}

/**
 * Thank-you confirmation shown after a successful form submission.
 *
 * @param props.visitorName - The name entered by the visitor, used for personalisation.
 * @returns A confirmation message element.
 */
function ThankYouMessage({ visitorName }: { visitorName: string }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Checkmark icon */}
      <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-8 text-green-700"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-blue-900">
        Thanks, {visitorName.trim()}!
      </h2>
      <p className="max-w-sm text-blue-900/60">
        Simon&apos;s contact card (<strong>simon-mensi.vcf</strong>) is downloading now.
        Open it to add Simon directly to your contacts.
      </p>

      <p className="mt-2 text-xs text-blue-900/40">
        Didn&apos;t receive the download?{" "}
        <button
          type="button"
          className="underline underline-offset-2 hover:text-blue-900 transition-colors"
          onClick={() => {
            const vcf = buildVCardString(SIMON_VCARD_DATA);
            downloadVCard(vcf, "simon-mensi.vcf");
          }}
        >
          Download again
        </button>
      </p>
    </div>
  );
}

/**
 * Contact page — lead generation form with client-side vCard download.
 *
 * On submission the visitor's details are persisted to `localStorage`
 * under the key `simonmensi_leads` and Simon's `.vcf` contact card is
 * immediately downloaded in the browser — no server call required.
 *
 * @returns The contact page element.
 */
export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({ name: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form field changes and clears the error for the changed field.
   *
   * @param e - The native input change event.
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  /**
   * Handles form submission:
   * 1. Validates fields
   * 2. Saves lead to localStorage
   * 3. Triggers vCard download
   * 4. Shows thank-you state
   *
   * @param e - The native form submit event.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Save lead to localStorage
    saveLead({
      name: values.name.trim(),
      phone: values.phone.trim(),
      submittedAt: new Date().toISOString(),
    });

    // Generate and download Simon's vCard
    const vcf = buildVCardString(SIMON_VCARD_DATA);
    downloadVCard(vcf, "simon-mensi.vcf");

    setIsLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        {submitted ? (
          <ThankYouMessage visitorName={values.name} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
                Exchange Contacts
              </h1>
              <p className="mt-3 text-base text-blue-900/60">
                Enter your details and you&apos;ll instantly receive Simon&apos;s
                contact card.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-blue-900"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Jane Smith"
                  value={values.name}
                  onChange={handleChange}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={!!errors.name}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-base text-blue-900 outline-none",
                    "placeholder:text-blue-900/30 transition-colors",
                    "focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20",
                    errors.name
                      ? "border-red-400 bg-red-50"
                      : "border-blue-900/20 bg-white hover:border-blue-900/40",
                  ].join(" ")}
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-blue-900"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. +65 9123 4567"
                  value={values.phone}
                  onChange={handleChange}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  aria-invalid={!!errors.phone}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-base text-blue-900 outline-none",
                    "placeholder:text-blue-900/30 transition-colors",
                    "focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20",
                    errors.phone
                      ? "border-red-400 bg-red-50"
                      : "border-blue-900/20 bg-white hover:border-blue-900/40",
                  ].join(" ")}
                />
                {errors.phone && (
                  <p id="phone-error" role="alert" className="text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="mt-2 w-full justify-center"
              >
                Get Simon&apos;s Contact
              </Button>
            </form>

            {/* Privacy note */}
            <p className="mt-6 text-center text-xs text-blue-900/40">
              Your details are stored locally on this device only.
              No data is sent to any server.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
