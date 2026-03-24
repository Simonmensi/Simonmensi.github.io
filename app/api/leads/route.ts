import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://simonmensi.github.io",
  "http://localhost:3000",
  process.env.ALLOWED_ORIGIN,
].filter(Boolean);

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  phone: z.string().min(1, "Phone number is required.").max(30),
});

export type ApiResponse =
  | { success: true }
  | { success: false; errors: { name?: string; phone?: string } };

function getCorsHeaders(origin: string | null): HeadersInit {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  
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
      return NextResponse.json(response, {
        status: 400,
        headers: getCorsHeaders(origin),
      });
    }

    await db.lead.create({
      data: {
        name: result.data.name.trim(),
        phone: result.data.phone.trim(),
      },
    });

    const response: ApiResponse = { success: true };
    return NextResponse.json(response, {
      status: 201,
      headers: getCorsHeaders(origin),
    });
  } catch {
    const response: ApiResponse = {
      success: false,
      errors: { name: "Something went wrong. Please try again." },
    };
    return NextResponse.json(response, {
      status: 500,
      headers: getCorsHeaders(origin),
    });
  }
}
