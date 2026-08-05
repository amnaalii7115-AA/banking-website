import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  botcheck?: string;
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Honeypot spam protection
    if (body.botcheck) {
      return NextResponse.json({
        message: "Message received.",
      });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    // Required fields validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          message: "Please complete all contact form fields.",
        },
        {
          status: 400,
        },
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    // Input length validation
    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        {
          message: "One or more fields are too long.",
        },
        {
          status: 400,
        },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ??
      "YourBank <onboarding@resend.dev>";

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        {
          message: "Email service is not configured yet.",
        },
        {
          status: 503,
        },
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      replyTo: email,
      subject: `YourBank Contact: ${subject}`,

      text: `
New YourBank Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),

      html: `
        <div
          style="
            max-width: 620px;
            margin: 0 auto;
            padding: 32px;
            background: #191919;
            color: #ffffff;
            border-radius: 16px;
            font-family: Arial, sans-serif;
          "
        >
          <h1
            style="
              margin: 0 0 24px;
              color: #caff33;
              font-size: 26px;
            "
          >
            New YourBank Contact Message
          </h1>

          <p>
            <strong style="color: #caff33;">Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong style="color: #caff33;">Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong style="color: #caff33;">Subject:</strong>
            ${escapeHtml(subject)}
          </p>

          <div
            style="
              margin-top: 24px;
              padding: 20px;
              background: #222222;
              border: 1px solid #333333;
              border-radius: 12px;
            "
          >
            <strong style="color: #caff33;">Message:</strong>

            <p
              style="
                margin: 12px 0 0;
                color: #e4e4e7;
                line-height: 1.6;
              "
            >
              ${escapeHtml(message).replaceAll("\n", "<br />")}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          message:
            error.message ||
            "Email service could not send the message.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        message:
          "Email service is temporarily unavailable. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}