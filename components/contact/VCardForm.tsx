"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { VCARD_FILENAME, OWNER_NAME } from "@/constants";
import { buildVCardString, downloadVCard } from "@/lib/generate-vcard";
import { SIMON_VCARD_DATA } from "@/lib/vcard-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface FormValues {
  name: string;
  phone: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
}

export interface Props {
  onSuccess: (visitorName: string) => void;
}

export function validate(values: FormValues): FormErrors {
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

const INPUT_BASE =
  "w-full rounded-xl border px-4 py-3 text-base text-blue-900 dark:text-blue-200 outline-none " +
  "placeholder:text-blue-900/30 dark:placeholder:text-blue-300/30 transition-colors " +
  "focus:border-blue-900 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-900/20 dark:focus:ring-blue-400/20";

const INPUT_VALID = "border-blue-900/20 dark:border-blue-700/40 bg-white dark:bg-gray-900 hover:border-blue-900/40 dark:hover:border-blue-500/60";
const INPUT_ERROR = "border-red-400 bg-red-50 dark:bg-red-900/20";

export function VCardForm({ onSuccess }: Props) {
  const [values, setValues] = useState<FormValues>({ name: "", phone: "" });
  const [clientErrors, setClientErrors] = useState<FormErrors>({});
  const [serverErrors, setServerErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setClientErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setClientErrors(validationErrors);
      return;
    }
    setClientErrors({});
    setServerErrors({});
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        downloadVCard(buildVCardString(SIMON_VCARD_DATA), VCARD_FILENAME);
        onSuccess(values.name.trim());
      } else {
        setServerErrors(data.errors || { name: "Something went wrong." });
      }
    } catch {
      setServerErrors({ name: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  const errors = { ...clientErrors, ...serverErrors };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-blue-900 dark:text-blue-300">
          Your Name
        </label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          placeholder="e.g. Jane Smith" value={values.name}
          onChange={handleChange}
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
          className={`${INPUT_BASE} ${errors.name ? INPUT_ERROR : INPUT_VALID}`}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="text-xs text-red-600">{errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-blue-900 dark:text-blue-300">
          Phone Number
        </label>
        <input
          id="phone" name="phone" type="tel" autoComplete="tel"
          placeholder="e.g. +65 9123 4567" value={values.phone}
          onChange={handleChange}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          aria-invalid={!!errors.phone}
          className={`${INPUT_BASE} ${errors.phone ? INPUT_ERROR : INPUT_VALID}`}
        />
        {errors.phone && (
          <p id="phone-error" role="alert" className="text-xs text-red-600">{errors.phone}</p>
        )}
      </div>

      <Button variant="primary" size="md" type="submit" isLoading={isLoading} className="mt-2 w-full justify-center">
        Get {OWNER_NAME}&apos;s Contact
      </Button>
    </form>
  );
}
