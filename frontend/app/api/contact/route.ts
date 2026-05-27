// src/app/api/contact/route.ts

import { NextResponse } from "next/server";
import type { ContactFormData } from "@/types/contact";

export async function POST(request: Request) {
  try {
    // -----------------------------
    // GET BODY
    // -----------------------------
    const body = (await request.json()) as ContactFormData;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    if (
      !body.name ||
      !body.phone ||
      !body.course ||
      !body.message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // ENV CHECK
    // -----------------------------
    const expressApiUrl =
      process.env.EXPRESS_API_URL;

    if (!expressApiUrl) {
      console.error(
        "EXPRESS_API_URL is missing"
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Server configuration error",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // SEND TO EXPRESS BACKEND
    // -----------------------------
    const response = await fetch(
      `${expressApiUrl}/api/contact`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // -----------------------------
    // HANDLE EXPRESS ERRORS
    // -----------------------------
    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Express API Error:",
        response.status,
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Backend failed to process request",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // SUCCESS
    // -----------------------------
    return NextResponse.json({
      success: true,
      message:
        "Contact form submitted successfully",
    });
  } catch (error) {
    console.error(
      "Contact API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit contact form",
      },
      { status: 500 }
    );
  }
}