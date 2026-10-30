/**
 * app/api/resend/route.ts
 * POST /api/resend — Handle contact & discovery form submissions via Resend email service
 * GET  /api/resend — Status and configuration check
 */

import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, ContactSubmission } from "@/services/resend.service";
import { RESEND_CONFIG } from "@/app/api/resend/config";

// Regex for basic email format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * GET /api/resend
 * Health check endpoint for verifying Resend integration status.
 */
export async function GET() {
  const isConfigured = Boolean(process.env.RESEND_API_KEY);
  return NextResponse.json(
    {
      success: true,
      service: "resend",
      configured: isConfigured,
      message: isConfigured
        ? "Resend service is configured and ready."
        : "Resend service is not configured.",
      fromEmail: RESEND_CONFIG.fromEmail,
      toEmail: RESEND_CONFIG.toEmail,
    },
    { status: 200 }
  );
}

/**
 * POST /api/resend
 * Receives contact form submissions and triggers email dispatch.
 */
export async function POST(req: NextRequest) {
  try {
    let body: Partial<ContactSubmission>;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload. JSON format required.",
        },
        { status: 400 }
      );
    }

    const { name, email, company, phone, service, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required.",
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required.",
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project description / message is required.",
        },
        { status: 400 }
      );
    }

    // Verify environment variable setup
    if (!process.env.RESEND_API_KEY) {
      console.error(
        "[RESEND_CONFIG_ERROR] RESEND_API_KEY is not configured on the server."
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "Our inquiry service is temporarily unavailable. Please reach us directly at hello@bitjunoo.com or try again shortly.",
        },
        { status: 503 }
      );
    }

    // Send email through service
    const result = await sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim(),
      phone: phone?.trim(),
      service: service?.trim() || "Technical Inquiry",
      message: message.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Our team will contact you shortly.",
        data: result,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[RESEND_API_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send your inquiry at this moment. Please try again shortly or reach us directly at hello@bitjunoo.com.",
      },
      { status: 500 }
    );
  }
}
