import { createServerFn } from "@tanstack/react-start";

function getAdminEmail(): string {
  const metaEnv = typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env as Record<string, string | undefined>) : undefined;
  return (
    process.env["ADMIN_EMAIL"] ||
    metaEnv?.["ADMIN_EMAIL"] ||
    process.env["VITE_ADMIN_EMAIL"] ||
    metaEnv?.["VITE_ADMIN_EMAIL"] ||
    "info@educationandlifefoundation.org"
  );
}

function getFromEmail(): string {
  const metaEnv = typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env as Record<string, string | undefined>) : undefined;
  return (
    process.env["RESEND_FROM_EMAIL"] ||
    metaEnv?.["RESEND_FROM_EMAIL"] ||
    process.env["VITE_RESEND_FROM_EMAIL"] ||
    metaEnv?.["VITE_RESEND_FROM_EMAIL"] ||
    "Education and Life Foundation <info@educationandlifefoundation.org>"
  );
}

function getApiKey(): string | null {
  const metaEnv = typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env as Record<string, string | undefined>) : undefined;
  const key =
    process.env["RESEND_API_KEY"] ||
    metaEnv?.["RESEND_API_KEY"] ||
    process.env["VITE_RESEND_API_KEY"] ||
    metaEnv?.["VITE_RESEND_API_KEY"];

  if (!key || key.startsWith("re_placeholder")) {
    return null;
  }
  return key;
}

interface SendEmailParams {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
}

async function sendViaResend({ to, replyTo, subject, html }: SendEmailParams) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[Resend Email Service] Skipping email delivery: RESEND_API_KEY is not configured or is a placeholder.");
    return { success: false, reason: "missing_api_key" };
  }

  const fromEmail = getFromEmail();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        reply_to: replyTo,
        subject,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("[Resend Email Service] Delivery Error:", data);
      return { success: false, error: data };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error("[Resend Email Service] Network/Dispatch Error:", err);
    return { success: false, error: String(err) };
  }
}

// Common email styling wrapper
function wrapEmailHtml(title: string, contentHtml: string): string {
  const adminEmail = getAdminEmail();
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #143055; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(20, 48, 85, 0.08); border: 1px solid #e2e8f0;">
          <!-- Header -->
          <tr>
            <td style="background-color: #143055; padding: 28px 32px; text-align: left;">
              <span style="display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #60a5fa; margin-bottom: 4px;">
                Education and Life Foundation
              </span>
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                ${title}
              </h1>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px; text-align: left; font-size: 15px; line-height: 1.6; color: #2d3748;">
              ${contentHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; text-align: center; font-size: 12px; color: #718096; line-height: 1.5;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #143055;">Education and Life Foundation (ELF)</p>
              <p style="margin: 0 0 4px 0;">Lahore, Pakistan · Auckland, NZ · Toronto, CA · Berlin, DE</p>
              <p style="margin: 0;">Official Inquiries: <a href="mailto:${adminEmail}" style="color: #2563eb; text-decoration: none;">${adminEmail}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// ─────────────────────────────────────────────────────────────
// 1. MEETING BOOKING EMAILS
// ─────────────────────────────────────────────────────────────
export interface BookingEmailData {
  name: string;
  email: string;
  phone?: string | null | undefined;
  platform: string;
  date: string;
  time: string;
  purpose?: string | null | undefined;
}

export const sendBookingNotification = createServerFn({ method: "POST" })
  .validator((data: BookingEmailData) => data)
  .handler(async ({ data }) => {
    const adminEmail = getAdminEmail();
    const formattedDate = new Date(`${data.date}T00:00:00`).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // 1. Admin Email
    const adminHtml = wrapEmailHtml(
      "New Meeting Scheduled",
      `
      <p style="margin-top: 0;">A visitor has scheduled a meeting through the website booking portal:</p>
      
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; border: 1px solid #edf2f7; border-radius: 8px; background-color: #f8fafc;">
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7; width: 140px;">Name:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #143055;">${data.name}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Phone:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.phone || "Not provided"}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Date:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: 600;">${formattedDate}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Time:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #2563eb;">${data.time}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Platform:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.platform}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568;">Discussion:</td><td style="padding: 10px 16px; color: #2d3748;">${data.purpose || "General discussion / inquiry"}</td></tr>
      </table>

      <p style="font-size: 13px; color: #718096; margin-bottom: 0;">
        You can reply directly to this email to contact <strong>${data.name}</strong>.
      </p>
      `
    );

    // 2. User Confirmation Email
    const userHtml = wrapEmailHtml(
      "Your Meeting is Confirmed",
      `
      <p style="margin-top: 0;">Dear <strong>${data.name}</strong>,</p>
      <p>Thank you for booking a meeting with the <strong>Education and Life Foundation</strong>. Your slot has been received by our coordination team.</p>

      <div style="margin: 24px 0; padding: 20px; background-color: #f0f7ff; border-left: 4px solid #2563eb; border-radius: 6px;">
        <p style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: #1e40af;">Meeting Details</p>
        <p style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #143055;">📅 ${formattedDate}</p>
        <p style="margin: 0 0 6px 0; font-size: 16px; font-weight: 700; color: #2563eb;">⏰ ${data.time}</p>
        <p style="margin: 0; font-size: 15px; color: #374151;">💻 Platform: <strong>${data.platform}</strong></p>
      </div>

      <p>A member of our team will send the exact video link or dial-in coordinates before the scheduled time.</p>
      <p style="font-size: 13px; color: #64748b;">
        Need to reschedule or have a question in advance? Simply reply directly to this email or write to <a href="mailto:${adminEmail}" style="color: #2563eb;">${adminEmail}</a>.
      </p>
      `
    );

    // Send both in parallel
    const [adminRes, userRes] = await Promise.all([
      sendViaResend({
        to: adminEmail,
        replyTo: data.email,
        subject: `[New Booking] ${data.name} — ${formattedDate} at ${data.time}`,
        html: adminHtml,
      }),
      sendViaResend({
        to: data.email,
        replyTo: adminEmail,
        subject: `Meeting Confirmation — Education and Life Foundation (${formattedDate})`,
        html: userHtml,
      }),
    ]);

    return { admin: adminRes, user: userRes };
  });

// ─────────────────────────────────────────────────────────────
// 2. PARTNERSHIP PROPOSAL EMAILS
// ─────────────────────────────────────────────────────────────
export interface PartnershipEmailData {
  orgName: string;
  contactName: string;
  title?: string | null | undefined;
  email: string;
  phone?: string | null | undefined;
  country?: string | null | undefined;
  orgType: string;
  collabType: string;
  focusAreas: string[];
  proposal: string;
}

export const sendPartnershipNotification = createServerFn({ method: "POST" })
  .validator((data: PartnershipEmailData) => data)
  .handler(async ({ data }) => {
    const adminEmail = getAdminEmail();
    // 1. Admin Email
    const adminHtml = wrapEmailHtml(
      `Partnership Application: ${data.orgName}`,
      `
      <p style="margin-top: 0;">An institutional partnership proposal has been submitted on the website:</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; border: 1px solid #edf2f7; border-radius: 8px; background-color: #f8fafc;">
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7; width: 160px;">Organization:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #143055;">${data.orgName}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Organization Type:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.orgType}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Contact Person:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: 600;">${data.contactName} ${data.title ? `(${data.title})` : ""}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Phone / WhatsApp:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.phone || "Not specified"}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Country / Jurisdiction:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.country || "Not specified"}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Collaboration Type:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: 600; color: #2563eb;">${data.collabType}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Focus Areas:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.focusAreas.length > 0 ? data.focusAreas.join(", ") : "General Program Coalition"}</td></tr>
      </table>

      <h3 style="font-size: 15px; margin: 20px 0 8px 0; color: #143055;">Proposal Narrative:</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.proposal || "No additional text provided."}</div>
      `
    );

    // 2. User Acknowledgment
    const userHtml = wrapEmailHtml(
      "Partnership Application Received",
      `
      <p style="margin-top: 0;">Dear <strong>${data.contactName}</strong>,</p>
      <p>Thank you for submitting a partnership proposal on behalf of <strong>${data.orgName}</strong> to the <strong>Education and Life Foundation</strong>.</p>
      <p>Our executive leadership team reviews institutional collaboration requests regularly. We evaluate each application for mission alignment, geographic synergy, and direct grassroots impact across Punjab and underserved districts.</p>

      <div style="margin: 20px 0; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;"><strong>Organization:</strong> ${data.orgName} (${data.orgType})</p>
        <p style="margin: 0; font-size: 13px; color: #64748b;"><strong>Proposed Collaboration:</strong> ${data.collabType}</p>
      </div>

      <p>A designated partnerships officer will follow up with you directly at this email address with next steps.</p>
      <p style="font-size: 13px; color: #64748b;">In the meantime, feel free to write to <a href="mailto:${adminEmail}" style="color: #2563eb;">${adminEmail}</a> with any supplemental dossiers or organizational documentation.</p>
      `
    );

    const [adminRes, userRes] = await Promise.all([
      sendViaResend({
        to: adminEmail,
        replyTo: data.email,
        subject: `[Partnership Proposal] ${data.orgName} (${data.country || "Global"})`,
        html: adminHtml,
      }),
      sendViaResend({
        to: data.email,
        replyTo: adminEmail,
        subject: `Partnership Acknowledgment — Education and Life Foundation`,
        html: userHtml,
      }),
    ]);

    return { admin: adminRes, user: userRes };
  });

// ─────────────────────────────────────────────────────────────
// 3. DONATION PLEDGE EMAILS
// ─────────────────────────────────────────────────────────────
export interface DonationPledgeEmailData {
  name: string;
  email: string;
  phone?: string | null | undefined;
  amount: number;
  currency: string;
  isMonthly: boolean;
  projectSlug?: string | null | undefined;
  message?: string | null | undefined;
}

export const sendDonationPledgeNotification = createServerFn({ method: "POST" })
  .validator((data: DonationPledgeEmailData) => data)
  .handler(async ({ data }) => {
    const adminEmail = getAdminEmail();
    const formattedAmount = `$${data.amount.toLocaleString()} ${data.currency} ${data.isMonthly ? "/ month" : "one-time"}`;

    // 1. User Receipt / Transfer Instructions Email
    const userHtml = wrapEmailHtml(
      "Donation Pledge Confirmation",
      `
      <p style="margin-top: 0;">Dear <strong>${data.name}</strong>,</p>
      <p>Thank you deeply for pledging support to the <strong>Education and Life Foundation</strong>. Your contribution directly funds verified, transparent field programs in Pakistan.</p>

      <div style="margin: 24px 0; padding: 20px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 6px;">
        <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #15803d; letter-spacing: 0.1em;">Pledge Summary</p>
        <p style="margin: 0 0 4px 0; font-size: 22px; font-weight: 800; color: #143055;">${formattedAmount}</p>
        ${data.projectSlug ? `<p style="margin: 0; font-size: 14px; color: #374151;">Designated Cause: <strong>${data.projectSlug.replace(/-/g, " ")}</strong></p>` : ""}
      </div>

      <h3 style="font-size: 16px; margin: 24px 0 12px 0; color: #143055;">Bank Transfer Details (Pakistan Audited Account):</h3>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc; font-size: 14px;">
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Bank Name:</td><td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #143055;">Faysal Bank Limited</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Account Title:</td><td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #143055;">EDUCATION AND LIFE FOUNDATION</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">IBAN:</td><td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 15px; font-weight: bold; color: #2563eb;">PK11FAYS0464007900224713</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Account Number:</td><td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">0464007900224713</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0;">Branch:</td><td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0;">Usman Block, Awami Complex — Garden Town, Lahore</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #64748b;">Transfer Methods:</td><td style="padding: 10px 16px;">Raast / IBFT / 1Link / Wire</td></tr>
      </table>

      <p style="font-size: 14px; color: #4b5563;">
        Once you transfer your pledged amount, please reply to this email with your transaction reference or receipt so our finance team can verify and issue an official acknowledgment.
      </p>
      `
    );

    // 2. Admin Notification
    const adminHtml = wrapEmailHtml(
      "New Donation Pledge Recorded",
      `
      <p style="margin-top: 0;">A supporter has recorded a new donation pledge:</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; border: 1px solid #edf2f7; border-radius: 8px; background-color: #f8fafc;">
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7; width: 140px;">Donor Name:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #143055;">${data.name}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Phone:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.phone || "Not specified"}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Pledge Amount:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-size: 18px; font-weight: 800; color: #16a34a;">${formattedAmount}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Designated Program:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;">${data.projectSlug || "General Fund"}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568;">Donor Message:</td><td style="padding: 10px 16px; color: #2d3748;">${data.message || "None provided"}</td></tr>
      </table>
      `
    );

    const [userRes, adminRes] = await Promise.all([
      sendViaResend({
        to: data.email,
        replyTo: adminEmail,
        subject: `Donation Pledge Confirmation — Education and Life Foundation`,
        html: userHtml,
      }),
      sendViaResend({
        to: adminEmail,
        replyTo: data.email,
        subject: `[New Pledge: ${formattedAmount}] from ${data.name}`,
        html: adminHtml,
      }),
    ]);

    return { user: userRes, admin: adminRes };
  });

// ─────────────────────────────────────────────────────────────
// 4. GENERAL CONTACT MESSAGE EMAILS
// ─────────────────────────────────────────────────────────────
export interface ContactMessageEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactMessageNotification = createServerFn({ method: "POST" })
  .validator((data: ContactMessageEmailData) => data)
  .handler(async ({ data }) => {
    const adminEmail = getAdminEmail();
    const adminHtml = wrapEmailHtml(
      `Contact Form Message: ${data.subject}`,
      `
      <p style="margin-top: 0;">A visitor sent a message through the website contact form:</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; border: 1px solid #edf2f7; border-radius: 8px; background-color: #f8fafc;">
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7; width: 120px;">From:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #143055;">${data.name}</td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td></tr>
        <tr><td style="padding: 10px 16px; font-weight: 600; color: #4a5568; border-bottom: 1px solid #edf2f7;">Subject:</td><td style="padding: 10px 16px; border-bottom: 1px solid #edf2f7; font-weight: 600;">${data.subject}</td></tr>
      </table>

      <h3 style="font-size: 15px; margin: 20px 0 8px 0; color: #143055;">Message Content:</h3>
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
      `
    );

    const userHtml = wrapEmailHtml(
      "We Have Received Your Message",
      `
      <p style="margin-top: 0;">Dear <strong>${data.name}</strong>,</p>
      <p>Thank you for reaching out to the <strong>Education and Life Foundation</strong>. We have received your inquiry regarding "<em>${data.subject}</em>".</p>
      <p>A member of our team across Lahore, Auckland, Toronto, or Berlin will review your message and reply as soon as possible.</p>
      <p style="font-size: 13px; color: #64748b;">If your inquiry is urgent, you can also write directly to <a href="mailto:${adminEmail}" style="color: #2563eb;">${adminEmail}</a>.</p>
      `
    );

    const [adminRes, userRes] = await Promise.all([
      sendViaResend({
        to: adminEmail,
        replyTo: data.email,
        subject: `[Contact Inquiry] ${data.subject} — from ${data.name}`,
        html: adminHtml,
      }),
      sendViaResend({
        to: data.email,
        replyTo: adminEmail,
        subject: `Message Received — Education and Life Foundation`,
        html: userHtml,
      }),
    ]);

    return { admin: adminRes, user: userRes };
  });
