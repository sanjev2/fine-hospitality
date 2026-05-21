// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import type { ContactFormData } from "@/types/contact";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactFormData;

    if (!body.name || !body.phone || !body.course || !body.message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const expressApiUrl = process.env.EXPRESS_API_URL;

    if (!expressApiUrl) {
      return NextResponse.json(
        { success: false, message: "EXPRESS_API_URL is missing" },
        { status: 500 }
      );
    }

    const response = await fetch(`${expressApiUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXPRESS_API_KEY || "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Express API failed");
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}