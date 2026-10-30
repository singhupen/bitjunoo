/**
 * services/resend.service.ts
 * Service for sending transactional emails via Resend.
 */

import { getResendClient, RESEND_CONFIG } from "@/lib/resend/config";
import { guessCountryByPartialPhoneNumber } from "react-international-phone";

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
}

/**
 * Formats phone number into international dial-code format e.g. +91-9175425157
 */
export function formatPhoneNumber(phone?: string): string {
  if (!phone || typeof phone !== "string") return "Not provided";
  const trimmed = phone.trim();
  if (!trimmed || trimmed === "+" || /^\+\d{1,4}\s*$/.test(trimmed)) {
    return "Not provided";
  }

  const guessed = guessCountryByPartialPhoneNumber({ phone: trimmed });
  if (guessed && guessed.country && guessed.country.dialCode) {
    const dialCode = guessed.country.dialCode;
    let remaining = trimmed.replace(/^\+/, "");
    if (remaining.startsWith(dialCode)) {
      remaining = remaining.slice(dialCode.length);
    }
    const cleanDigits = remaining.replace(/[\s-]/g, "");
    if (!cleanDigits) return "Not provided";
    return `+${dialCode}-${cleanDigits}`;
  }

  // Fallback: match general +<dialCode> <nationalNumber>
  const genericMatch = trimmed.match(/^(\+\d{1,4})[\s-]*(.+)$/);
  if (genericMatch) {
    const dialCode = genericMatch[1];
    const nationalNumber = genericMatch[2].replace(/[\s-]+/g, "");
    if (nationalNumber) {
      return `${dialCode}-${nationalNumber}`;
    }
  }

  return trimmed;
}

/**
 * Builds HTML template for the admin discovery request notification.
 */
function buildAdminEmailHtml(data: ContactSubmission): string {
  const { name, email, company, phone, service, message } = data;
  const formattedPhone = formatPhoneNumber(phone);
  const submissionDate = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Technical Discovery Request</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f1f5f9;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
        }
        .container {
          max-width: 600px;
          margin: 30px auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }
        .header {
          background: linear-gradient(135deg, #007AFF 0%, #00D4FF 100%);
          padding: 32px 28px;
          color: #ffffff;
        }
        .header h1 {
          margin: 0 0 6px 0;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .header p {
          margin: 0;
          font-size: 13px;
          opacity: 0.9;
        }
        .content {
          padding: 28px;
        }
        .section-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 12px;
        }
        .table-info {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        .table-info td {
          padding: 10px 12px;
          font-size: 14px;
          border-bottom: 1px solid #f1f5f9;
        }
        .table-info td.label {
          color: #64748b;
          font-weight: 600;
          width: 32%;
        }
        .table-info td.value {
          color: #0f172a;
          font-weight: 500;
        }
        .badge {
          display: inline-block;
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 700;
        }
        .message-box {
          background: #f8fafc;
          border-left: 4px solid #007AFF;
          border-radius: 8px;
          padding: 16px;
          font-size: 14px;
          line-height: 1.6;
          color: #1e293b;
          white-space: pre-wrap;
        }
        .footer {
          padding: 20px 28px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
          color: #64748b;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Discovery Request</h1>
          <p>Submitted via BitJunoo Architecture Consultation Form</p>
        </div>
        <div class="content">
          <div class="section-title">Client Details</div>
          <table class="table-info">
            <tr>
              <td class="label">Full Name</td>
              <td class="value"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td class="value"><a href="mailto:${email}" style="color: #007AFF; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td class="label">Company</td>
              <td class="value">${company || "Not provided"}</td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td class="value">${formattedPhone}</td>
            </tr>
            <tr>
              <td class="label">Service Required</td>
              <td class="value"><span class="badge">${service}</span></td>
            </tr>
          </table>

          <div class="section-title">Project Details & Requirements</div>
          <div class="message-box">${message}</div>
        </div>
        <div class="footer">
          Received on ${submissionDate} UTC • SLA Target: 2 Working Days
        </div>
      </div>
    </body>
  </html>
  `;
}

/**
 * Builds plain-text fallback for the admin notification email.
 */
function buildAdminEmailText(data: ContactSubmission): string {
  const formattedPhone = formatPhoneNumber(data.phone);
  return `
NEW TECHNICAL DISCOVERY REQUEST - BITJUNOO
==========================================

Client Details:
- Name: ${data.name}
- Email: ${data.email}
- Company: ${data.company || "Not provided"}
- Phone: ${formattedPhone}
- Service Need: ${data.service}

Project Requirements:
${data.message}

--
Received via BitJunoo Contact Form
Response SLA: 2 Working Days
`.trim();
}

/**
 * Sends discovery inquiry email using Resend.
 */
export async function sendContactEmail(data: ContactSubmission) {
  const resendClient = getResendClient();

  const recipient = RESEND_CONFIG.toEmail;
  const sender = RESEND_CONFIG.fromEmail;

  // 1. Send inquiry notification to admin / engineering team
  const adminResult = await resendClient.emails.send({
    from: sender,
    to: recipient,
    replyTo: data.email,
    subject: `Discovery Request: ${data.name} (${data.company || "Individual"}) - ${data.service}`,
    html: buildAdminEmailHtml(data),
    text: buildAdminEmailText(data),
  });

  if (adminResult.error) {
    throw new Error(`Resend Error: ${adminResult.error.message}`);
  }

  return {
    success: true,
    emailId: adminResult.data?.id,
  };
}
