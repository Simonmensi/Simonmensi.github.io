import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  phone: z.string().min(1, "Phone number is required.").max(30),
});

export type ApiResponse =
  | { success: true }
  | { success: false; errors: { name?: string; phone?: string } };

/**
 * Preflight handler.
 * SST/OpenNext injects CORS headers automatically (access-control-allow-origin: *).
 * We only need to return 204 so the browser proceeds with the actual request.
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const response: ApiResponse = {
        success: false,
        errors: {
          name: fieldErrors.name?.[0],
          phone: fieldErrors.phone?.[0],
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    await db.lead.create({
      data: {
        name: result.data.name.trim(),
        phone: result.data.phone.trim(),
      },
    });

    const response: ApiResponse = { success: true };
    return NextResponse.json(response, { status: 201 });
  } catch {
    const response: ApiResponse = {
      success: false,
      errors: { name: "Something went wrong. Please try again." },
    };
    return NextResponse.json(response, { status: 500 });
  }
}
