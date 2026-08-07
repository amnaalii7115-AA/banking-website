import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ApplicantInformation = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  identityNumber?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  businessName?: string;
  registrationNumber?: string;
  businessType?: string;
};

type ApplicationPayload = {
  accountCategory?: string;
  selectedAccount?: string;
  isBusinessAccount?: boolean;
  information?: ApplicantInformation;
};

const allowedDocumentTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const documentFields = [
  "identityDocument",
  "addressProof",
  "incomeProof",
  "businessDocument",
  "taxDocument",
] as const;

const documentLabels: Record<
  (typeof documentFields)[number],
  string
> = {
  identityDocument: "Identity Document",
  addressProof: "Address Proof",
  incomeProof: "Income Proof",
  businessDocument: "Business Registration",
  taxDocument: "Tax Document",
};

const businessTypeLabels: Record<string, string> = {
  "sole-proprietorship": "Sole Proprietorship",
  partnership: "Partnership",
  "private-limited": "Private Limited Company",
  "public-limited": "Public Limited Company",
  "non-profit": "Non-profit Organization",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cleanText(
  value: unknown,
  maximumLength: number,
) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maximumLength);
}

function createSafeFilename(filename: string) {
  return filename
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .slice(0, 100);
}

function createApplicationReference() {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const randomValue = crypto.randomUUID()
    .replaceAll("-", "")
    .slice(0, 8)
    .toUpperCase();

  return `YB-${date}-${randomValue}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const rawApplicationData =
      formData.get("applicationData");

    if (
      typeof rawApplicationData !== "string"
    ) {
      return NextResponse.json(
        {
          message:
            "Account application data is missing.",
        },
        {
          status: 400,
        },
      );
    }

    let payload: ApplicationPayload;

    try {
      payload = JSON.parse(
        rawApplicationData,
      ) as ApplicationPayload;
    } catch {
      return NextResponse.json(
        {
          message:
            "Account application data is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const accountCategory = cleanText(
      payload.accountCategory,
      50,
    );

    const selectedAccount = cleanText(
      payload.selectedAccount,
      100,
    );

    const information = payload.information;

    if (!information) {
      return NextResponse.json(
        {
          message:
            "Applicant information is missing.",
        },
        {
          status: 400,
        },
      );
    }

    const firstName = cleanText(
      information.firstName,
      50,
    );

    const lastName = cleanText(
      information.lastName,
      50,
    );

    const email = cleanText(
      information.email,
      254,
    );

    const phone = cleanText(
      information.phone,
      25,
    );

    const dateOfBirth = cleanText(
      information.dateOfBirth,
      20,
    );

    const nationality = cleanText(
      information.nationality,
      50,
    );

    const identityNumber = cleanText(
      information.identityNumber,
      30,
    );

    const address = cleanText(
      information.address,
      300,
    );

    const city = cleanText(
      information.city,
      70,
    );

    const postalCode = cleanText(
      information.postalCode,
      15,
    );

    const businessName = cleanText(
      information.businessName,
      120,
    );

    const registrationNumber = cleanText(
      information.registrationNumber,
      50,
    );

    const businessType = cleanText(
      information.businessType,
      50,
    );

    if (
      !accountCategory ||
      !selectedAccount ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !nationality ||
      !identityNumber ||
      !address ||
      !city ||
      !postalCode
    ) {
      return NextResponse.json(
        {
          message:
            "Please complete all required application fields.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(
        firstName,
      ) ||
      !/^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(
        lastName,
      )
    ) {
      return NextResponse.json(
        {
          message:
            "Applicant name contains invalid characters.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
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

    const phoneDigits = phone.replace(/\D/g, "");

    if (
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      return NextResponse.json(
        {
          message:
            "Phone number must contain between 7 and 15 digits.",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedIdentity =
      identityNumber.replace(/\s/g, "");

    const validCnic =
      /^\d{5}-?\d{7}-?\d$/.test(
        normalizedIdentity,
      );

    const validPassport =
      /^[A-Za-z0-9]{6,12}$/.test(
        normalizedIdentity,
      );

    if (!validCnic && !validPassport) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid CNIC or passport number.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      payload.isBusinessAccount &&
      (!businessName ||
        !registrationNumber ||
        !businessType)
    ) {
      return NextResponse.json(
        {
          message:
            "Please complete all required business fields.",
        },
        {
          status: 400,
        },
      );
    }

    const uploadedFiles: Array<{
      field: (typeof documentFields)[number];
      file: File;
    }> = [];

    for (const field of documentFields) {
      const formValue = formData.get(field);

      if (
        formValue instanceof File &&
        formValue.size > 0
      ) {
        if (
          !allowedDocumentTypes.includes(
            formValue.type,
          )
        ) {
          return NextResponse.json(
            {
              message: `${documentLabels[field]} has an unsupported file type.`,
            },
            {
              status: 400,
            },
          );
        }

        uploadedFiles.push({
          field,
          file: formValue,
        });
      }
    }

    const identityDocument =
      uploadedFiles.find(
        ({ field }) =>
          field === "identityDocument",
      );

    const addressProof =
      uploadedFiles.find(
        ({ field }) =>
          field === "addressProof",
      );

    const businessDocument =
      uploadedFiles.find(
        ({ field }) =>
          field === "businessDocument",
      );

    if (!identityDocument || !addressProof) {
      return NextResponse.json(
        {
          message:
            "Identity document and address proof are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      payload.isBusinessAccount &&
      !businessDocument
    ) {
      return NextResponse.json(
        {
          message:
            "Business registration document is required.",
        },
        {
          status: 400,
        },
      );
    }

    const totalFileSize = uploadedFiles.reduce(
      (total, item) =>
        total + item.file.size,
      0,
    );

    const maximumCombinedSize =
      3 * 1024 * 1024;

    if (totalFileSize > maximumCombinedSize) {
      return NextResponse.json(
        {
          message:
            "The combined size of all documents must be 3 MB or less.",
        },
        {
          status: 400,
        },
      );
    }

    const apiKey =
      process.env.RESEND_API_KEY;

    const applicationEmail =
      process.env.ACCOUNT_APPLICATION_EMAIL ??
      process.env.CONTACT_EMAIL;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ??
      "YourBank <onboarding@resend.dev>";

    if (!apiKey || !applicationEmail) {
      return NextResponse.json(
        {
          message:
            "Account application email service is not configured.",
        },
        {
          status: 503,
        },
      );
    }

    const applicationReference =
      createApplicationReference();

    const attachments = await Promise.all(
      uploadedFiles.map(async ({ field, file }) => ({
        filename: `${documentLabels[field].replaceAll(
          " ",
          "_",
        )}-${createSafeFilename(file.name)}`,

        content: Buffer.from(
          await file.arrayBuffer(),
        ),
      })),
    );

    const resend = new Resend(apiKey);

    const documentText = uploadedFiles
      .map(
        ({ field, file }) =>
          `${documentLabels[field]}: ${file.name}`,
      )
      .join("\n");

    const businessText =
      payload.isBusinessAccount
        ? `
Business Name: ${businessName}
Registration Number: ${registrationNumber}
Business Type: ${
            businessTypeLabels[businessType] ??
            businessType
          }
`
        : "";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: applicationEmail,
      replyTo: email,

      subject: `YourBank Account Application — ${applicationReference}`,

      text: `
New YourBank Account Application

Application Reference: ${applicationReference}

ACCOUNT DETAILS
Account Category: ${accountCategory}
Selected Account: ${selectedAccount}

APPLICANT INFORMATION
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Date of Birth: ${dateOfBirth}
Nationality: ${nationality}
CNIC/Passport: ${identityNumber}
Address: ${address}
City: ${city}
Postal Code: ${postalCode}
${businessText}
UPLOADED DOCUMENTS
${documentText}
      `.trim(),

      html: `
        <div
          style="
            max-width: 680px;
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
              margin: 0 0 10px;
              color: #caff33;
              font-size: 26px;
            "
          >
            New Account Application
          </h1>

          <p style="margin: 0 0 28px; color: #b3b3b3;">
            Reference:
            <strong style="color: #ffffff;">
              ${escapeHtml(applicationReference)}
            </strong>
          </p>

          <div
            style="
              margin-bottom: 18px;
              padding: 20px;
              background: #222222;
              border: 1px solid #333333;
              border-radius: 12px;
            "
          >
            <h2 style="margin: 0 0 16px; color: #caff33;">
              Account Details
            </h2>

            <p>
              <strong>Category:</strong>
              ${escapeHtml(accountCategory)}
            </p>

            <p>
              <strong>Selected Account:</strong>
              ${escapeHtml(selectedAccount)}
            </p>
          </div>

          <div
            style="
              margin-bottom: 18px;
              padding: 20px;
              background: #222222;
              border: 1px solid #333333;
              border-radius: 12px;
            "
          >
            <h2 style="margin: 0 0 16px; color: #caff33;">
              Applicant Information
            </h2>

            <p><strong>Name:</strong> ${escapeHtml(
              `${firstName} ${lastName}`,
            )}</p>

            <p><strong>Email:</strong> ${escapeHtml(
              email,
            )}</p>

            <p><strong>Phone:</strong> ${escapeHtml(
              phone,
            )}</p>

            <p><strong>Date of Birth:</strong> ${escapeHtml(
              dateOfBirth,
            )}</p>

            <p><strong>Nationality:</strong> ${escapeHtml(
              nationality,
            )}</p>

            <p><strong>CNIC/Passport:</strong> ${escapeHtml(
              identityNumber,
            )}</p>

            <p><strong>Address:</strong> ${escapeHtml(
              address,
            )}</p>

            <p><strong>City:</strong> ${escapeHtml(
              city,
            )}</p>

            <p><strong>Postal Code:</strong> ${escapeHtml(
              postalCode,
            )}</p>
          </div>

          ${
            payload.isBusinessAccount
              ? `
                <div
                  style="
                    margin-bottom: 18px;
                    padding: 20px;
                    background: #222222;
                    border: 1px solid #333333;
                    border-radius: 12px;
                  "
                >
                  <h2
                    style="
                      margin: 0 0 16px;
                      color: #caff33;
                    "
                  >
                    Business Information
                  </h2>

                  <p>
                    <strong>Business Name:</strong>
                    ${escapeHtml(businessName)}
                  </p>

                  <p>
                    <strong>Registration Number:</strong>
                    ${escapeHtml(registrationNumber)}
                  </p>

                  <p>
                    <strong>Business Type:</strong>
                    ${escapeHtml(
                      businessTypeLabels[
                        businessType
                      ] ?? businessType,
                    )}
                  </p>
                </div>
              `
              : ""
          }

          <div
            style="
              padding: 20px;
              background: #222222;
              border: 1px solid #333333;
              border-radius: 12px;
            "
          >
            <h2 style="margin: 0 0 16px; color: #caff33;">
              Documents
            </h2>

            <ul style="margin: 0; padding-left: 20px;">
              ${uploadedFiles
                .map(
                  ({ field, file }) => `
                    <li style="margin-bottom: 8px;">
                      ${escapeHtml(
                        documentLabels[field],
                      )}:
                      ${escapeHtml(file.name)}
                    </li>
                  `,
                )
                .join("")}
            </ul>
          </div>
        </div>
      `,

      attachments,
    });

    if (error) {
      console.error(
        "Account application email error:",
        error,
      );

      return NextResponse.json(
        {
          message:
            error.message ||
            "Application email could not be sent.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      message:
        "Account application submitted successfully.",
      applicationReference,
    });
  } catch (error) {
    console.error(
      "Account application error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Application could not be submitted. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}