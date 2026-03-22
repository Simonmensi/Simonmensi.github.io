"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  phone: z.string().min(1, "Phone number is required.").max(30),
});

export type ActionResult =
  | { success: true }
  | { success: false; errors: { name?: string; phone?: string } };

export async function saveLead(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    name: (formData.get("name") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
  };

  const result = leadSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      errors: {
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
      },
    };
  }

  try {
    await db.lead.create({
      data: {
        name: result.data.name.trim(),
        phone: result.data.phone.trim(),
      },
    });
    return { success: true };
  } catch {
    return {
      success: false,
      errors: { name: "Something went wrong. Please try again." },
    };
  }
}
