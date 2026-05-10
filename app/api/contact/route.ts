import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const imageFile = formData.get("image") as File | null;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer; content_type: string }[] = [];

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    attachments.push({
      filename: imageFile.name,
      content: buffer,
      content_type: imageFile.type || "application/octet-stream",
    });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5efe6;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#0D1B2A;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#0098B8;font-size:12px;letter-spacing:3px;text-transform:uppercase;">El Miedo a Volar</p>
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:normal;">New Commission Request</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px;">

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:24px;border-bottom:1px solid #f0ebe4;">
                  <p style="margin:0 0 4px;font-size:11px;color:#0098B8;letter-spacing:2px;text-transform:uppercase;">From</p>
                  <p style="margin:0;font-size:18px;color:#0D1B2A;">${name}</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#888;">${email}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-top:24px;">
                  <p style="margin:0 0 12px;font-size:11px;color:#0098B8;letter-spacing:2px;text-transform:uppercase;">Message</p>
                  <p style="margin:0;font-size:15px;color:#333;line-height:1.7;white-space:pre-wrap;">${message}</p>
                </td>
              </tr>
              ${attachments.length > 0 ? `
              <tr>
                <td style="padding-top:24px;">
                  <p style="margin:0 0 12px;font-size:11px;color:#0098B8;letter-spacing:2px;text-transform:uppercase;">Reference Image</p>
                  <p style="margin:0;font-size:13px;color:#888;">📎 ${attachments[0].filename} — see attachment</p>
                </td>
              </tr>` : ""}
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0D1B2A;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#0098B8;">elmiedoavolar.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: "El Miedo a Volar <contact@elmiedoavolar.com>",
    to: "elmiedosepierde@gmail.com",
    replyTo: email,
    subject: `New commission request from ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
    html,
    attachments,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  console.log("Email sent:", data);
  return NextResponse.json({ success: true });
}
