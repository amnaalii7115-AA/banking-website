import {
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

import { Resend } from "resend";

type LocationDetails = {
  permission?: string;
  latitude?: number | null;
  longitude?: number | null;
};

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  botcheck?: string | null;
  privacyConsent?: boolean;
  location?: LocationDetails;
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const getHeader = (
  request: NextRequest,
  headerNames: string[],
) => {
  for (const headerName of headerNames) {
    const value =
      request.headers.get(headerName);

    if (value) {
      return value;
    }
  }

  return "";
};

const decodeHeader = (value: string) => {
  if (!value) {
    return "Not available";
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const getIpAddress = (
  request: NextRequest,
) => {
  const forwardedIp = getHeader(request, [
    "x-forwarded-for",
    "x-real-ip",
    "x-vercel-forwarded-for",
    "cf-connecting-ip",
  ]);

  if (!forwardedIp) {
    return "Not available";
  }

  return (
    forwardedIp.split(",")[0]?.trim() ||
    "Not available"
  );
};

const detailRow = (
  label: string,
  value: string,
) => {
  return `
    <tr>
      <td
        style="
          width: 160px;
          padding: 10px 12px;
          color: #caff33;
          border-bottom: 1px solid #333333;
          font-weight: 600;
          vertical-align: top;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding: 10px 12px;
          color: #e4e4e7;
          border-bottom: 1px solid #333333;
          word-break: break-word;
        "
      >
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
};

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      (await request.json()) as ContactPayload;

    if (body.botcheck) {
      return NextResponse.json({
        message: "Message received.",
      });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          message:
            "Please complete all contact form fields.",
        },
        {
          status: 400,
        },
      );
    }

    if (!body.privacyConsent) {
      return NextResponse.json(
        {
          message:
            "Please accept the privacy consent.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 3000
    ) {
      return NextResponse.json(
        {
          message:
            "One or more fields are too long.",
        },
        {
          status: 400,
        },
      );
    }

    const apiKey =
      process.env.RESEND_API_KEY;

    const contactEmail =
      process.env.CONTACT_EMAIL;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ??
      "YourBank <onboarding@resend.dev>";

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        {
          message:
            "Email service is not configured yet.",
        },
        {
          status: 503,
        },
      );
    }

    const agent = userAgent(request);

    const ipAddress = getIpAddress(request);

    const country = decodeHeader(
      getHeader(request, [
        "x-vercel-ip-country",
        "cf-ipcountry",
      ]),
    );

    const region = decodeHeader(
      getHeader(request, [
        "x-vercel-ip-country-region",
        "x-vercel-ip-region",
      ]),
    );

    const city = decodeHeader(
      getHeader(request, [
        "x-vercel-ip-city",
      ]),
    );

    const hasPreciseLocation =
      typeof body.location?.latitude ===
        "number" &&
      typeof body.location?.longitude ===
        "number";

    const location = hasPreciseLocation
      ? `${body.location?.latitude}, ${body.location?.longitude}`
      : [city, region, country]
          .filter(
            (value) =>
              value &&
              value !== "Not available",
          )
          .join(", ") || "Not available";

    const locationLink = hasPreciseLocation
      ? `https://www.google.com/maps?q=${body.location?.latitude},${body.location?.longitude}`
      : "";

    let deviceType = "Desktop / Laptop";

    if (agent.device.type === "mobile") {
      deviceType = "Mobile";
    } else if (
      agent.device.type === "tablet"
    ) {
      deviceType = "Tablet";
    }

    const deviceModel =
      [
        agent.device.vendor,
        agent.device.model,
      ]
        .filter(Boolean)
        .join(" ") || "Not available";

    const browserDetails =
      [
        agent.browser.name,
        agent.browser.version,
      ]
        .filter(Boolean)
        .join(" ") || "Not available";

    const detailsHtml = [
      detailRow("IP Address", ipAddress),
      detailRow("Location", location),
      detailRow("Device Type", deviceType),
      detailRow("Device Model", deviceModel),
      detailRow(
        "Browser Details",
        browserDetails,
      ),
    ].join("");

    const resend = new Resend(apiKey);

    const { error } =
      await resend.emails.send({
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

Visitor Details

IP Address: ${ipAddress}
Location: ${location}
Device Type: ${deviceType}
Device Model: ${deviceModel}
Browser Details: ${browserDetails}
        `.trim(),

        html: `
          <div
            style="
              max-width: 650px;
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
              <strong style="color:#caff33;">
                Name:
              </strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong style="color:#caff33;">
                Email:
              </strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong style="color:#caff33;">
                Subject:
              </strong>
              ${escapeHtml(subject)}
            </p>

            <div
              style="
                margin-top:24px;
                padding:20px;
                background:#222222;
                border:1px solid #333333;
                border-radius:12px;
              "
            >
              <strong style="color:#caff33;">
                Message:
              </strong>

              <p
                style="
                  margin:12px 0 0;
                  color:#e4e4e7;
                  line-height:1.6;
                "
              >
                ${escapeHtml(message).replaceAll(
                  "\n",
                  "<br />",
                )}
              </p>
            </div>

            <h2
              style="
                margin:30px 0 14px;
                color:#caff33;
                font-size:20px;
              "
            >
              Visitor Details
            </h2>

            ${
              locationLink
                ? `
                  <p style="margin:0 0 14px;">
                    <a
                      href="${escapeHtml(
                        locationLink,
                      )}"
                      style="color:#caff33;"
                    >
                      View shared location on Google Maps
                    </a>
                  </p>
                `
                : ""
            }

            <table
              style="
                width:100%;
                border-collapse:collapse;
                background:#222222;
                border:1px solid #333333;
              "
            >
              <tbody>
                ${detailsHtml}
              </tbody>
            </table>
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
    console.error(
      "Contact form error:",
      error,
    );

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