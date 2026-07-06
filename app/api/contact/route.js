import { Resend } from "resend";

export const runtime = "nodejs";

const FROM_EMAIL = "Your Gardens by Design Website <forms@nicholasegner.com>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT_EMAIL = "bfenton@usinternet.com";

function cleanSingleLine(value) {
  return String(value ?? "")
    .trim()
    .replace(/[\r\n]+/g, " ");
}

function cleanMultiline(value) {
  return String(value ?? "")
    .trim()
    .replace(/\r\n/g, "\n");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_YGBD_API_KEY;
    const recipient = RECIPIENT_EMAIL;

    if (!apiKey) {
      console.error(
        "Contact form configuration is missing RESEND_YGBD_API_KEY",
      );

      return Response.json(
        {
          success: false,
          message:
            "The contact form is temporarily unavailable. Please try again later.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();

    const name = cleanSingleLine(body.name);
    const email = cleanSingleLine(body.email).toLowerCase();
    const phone = cleanSingleLine(body.phone);
    const location = cleanSingleLine(body.location);
    const description = cleanMultiline(body.description);

    // Hidden honeypot field. Real visitors should never fill this out.
    const website = cleanSingleLine(body.website);

    // Return a normal-looking success response so bots do not learn
    // that the honeypot caught them.
    if (website) {
      return Response.json({
        success: true,
        message: "Thank you. Your inquiry has been received.",
      });
    }

    if (!name || !email || !description) {
      return Response.json(
        {
          success: false,
          message:
            "Please provide your name, email address, and project description.",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      phone.length > 50 ||
      location.length > 150 ||
      description.length > 5000
    ) {
      return Response.json(
        {
          success: false,
          message:
            "One or more fields are too long. Please shorten your response and try again.",
        },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeLocation = escapeHtml(location || "Not provided");
    const safeDescription = escapeHtml(description).replaceAll("\n", "<br />");

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: recipient,
      replyTo: email,
      subject: `[YGBD] New Project Inquiry from ${name}`,
      text: `
New Your Gardens by Design Website Inquiry

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Location: ${location || "Not provided"}

Project Details:
${description}
      `.trim(),
      html: `
        <div
          style="
            margin: 0;
            padding: 32px;
            background-color: #f8f3f5;
            color: #2b2528;
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
          "
        >
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              overflow: hidden;
              background-color: #ffffff;
              border: 1px solid #eadde3;
              border-radius: 20px;
            "
          >
            <div
              style="
                padding: 28px 32px;
                background-color: #252020;
                color: #ffffff;
              "
            >
              <p
                style="
                  margin: 0 0 8px;
                  color: #f795be;
                  font-size: 12px;
                  font-weight: 700;
                  letter-spacing: 0.12em;
                  text-transform: uppercase;
                "
              >
                Your Gardens by Design
              </p>

              <h1
                style="
                  margin: 0;
                  font-size: 26px;
                  line-height: 1.25;
                "
              >
                New Project Inquiry
              </h1>
            </div>

            <div style="padding: 32px;">
              <table
                role="presentation"
                style="
                  width: 100%;
                  margin: 0 0 28px;
                  border-collapse: collapse;
                "
              >
                <tr>
                  <td
                    style="
                      width: 145px;
                      padding: 10px 12px 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      color: #765f69;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Name
                  </td>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      vertical-align: top;
                    "
                  >
                    ${safeName}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 12px 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      color: #765f69;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Email
                  </td>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      vertical-align: top;
                    "
                  >
                    <a
                      href="mailto:${safeEmail}"
                      style="color: #a23f69;"
                    >
                      ${safeEmail}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 12px 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      color: #765f69;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Phone
                  </td>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      vertical-align: top;
                    "
                  >
                    ${safePhone}
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 10px 12px 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      color: #765f69;
                      font-weight: 700;
                      vertical-align: top;
                    "
                  >
                    Project Location
                  </td>
                  <td
                    style="
                      padding: 10px 0;
                      border-bottom: 1px solid #eee4e8;
                      vertical-align: top;
                    "
                  >
                    ${safeLocation}
                  </td>
                </tr>
              </table>

              <h2
                style="
                  margin: 0 0 12px;
                  font-size: 18px;
                  line-height: 1.3;
                "
              >
                Project Details
              </h2>

              <div
                style="
                  padding: 20px;
                  background-color: #fff7fa;
                  border-left: 4px solid #f795be;
                  border-radius: 8px;
                "
              >
                ${safeDescription}
              </div>

              <p
                style="
                  margin: 28px 0 0;
                  color: #765f69;
                  font-size: 13px;
                "
              >
                Replying to this email will send your response directly to
                ${safeName} at ${safeEmail}.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend contact form error:", error);

      return Response.json(
        {
          success: false,
          message:
            "We could not send your inquiry. Please try again in a moment.",
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Thank you. Your inquiry has been sent.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact form route error:", error);

    return Response.json(
      {
        success: false,
        message:
          "We could not send your inquiry. Please check the form and try again.",
      },
      { status: 500 },
    );
  }
}
