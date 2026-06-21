import { Resend } from "resend";

type AppointmentPayload = {
  fullName?: string;
  email?: string;
  mobile?: string;
  meetingType?: string;
  preferredDate?: string;
  preferredTime?: string;
  subject?: string;
  organisation?: string;
  opposingParty?: string;
  contactMethod?: string;
  description?: string;
  consent?: boolean;
};

const allowedMeetingTypes = new Set(["Office Meeting", "Video Meeting", "Telephone Meeting"]);
const allowedContactMethods = new Set(["Email", "Telephone, after firm confirmation"]);

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}

function text(value: unknown, maxLength = 1000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getIstDateTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23"
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";
  const hour = Number(value("hour"));
  const minute = Number(value("minute"));

  return {
    date: `${value("year")}-${value("month")}-${value("day")}`,
    minutes: hour * 60 + minute
  };
}

function addDaysToIsoDate(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day + days));
  return value.toISOString().slice(0, 10);
}

function minutesToTime(minutes: number) {
  const hour = Math.floor(minutes / 60).toString().padStart(2, "0");
  const minute = (minutes % 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

function getMinimumIstSelection() {
  const now = getIstDateTime();
  const roundedMinutes = Math.ceil(now.minutes / 15) * 15;

  if (roundedMinutes >= 24 * 60) {
    return {
      date: addDaysToIsoDate(now.date, 1),
      time: "00:00"
    };
  }

  return {
    date: now.date,
    time: minutesToTime(roundedMinutes)
  };
}

function isBeforeMinimumIstSelection(date: string, time: string) {
  const minimum = getMinimumIstSelection();

  if (date < minimum.date) {
    return true;
  }

  return date === minimum.date && time < minimum.time;
}

function validatePayload(payload: AppointmentPayload) {
  const values = {
    fullName: text(payload.fullName, 120),
    email: text(payload.email, 160),
    mobile: text(payload.mobile, 40),
    meetingType: text(payload.meetingType, 40),
    preferredDate: text(payload.preferredDate, 20),
    preferredTime: text(payload.preferredTime, 10),
    subject: text(payload.subject, 180),
    organisation: text(payload.organisation, 160),
    opposingParty: text(payload.opposingParty, 160),
    contactMethod: text(payload.contactMethod, 60),
    description: text(payload.description, 4000),
    consent: payload.consent === true
  };

  if (!values.fullName || !values.email || !values.mobile || !values.subject || !values.description) {
    return { error: "Please complete all required fields.", values };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return { error: "Please enter a valid email address.", values };
  }

  if (!allowedMeetingTypes.has(values.meetingType)) {
    return { error: "Please select a valid meeting type.", values };
  }

  if (!allowedContactMethods.has(values.contactMethod)) {
    return { error: "Please select a valid contact method.", values };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate) || !/^\d{2}:\d{2}$/.test(values.preferredTime)) {
    return { error: "Please select a valid preferred date and time.", values };
  }

  if (isBeforeMinimumIstSelection(values.preferredDate, values.preferredTime)) {
    return { error: "Please select a current or future date and time in India Standard Time.", values };
  }

  if (!values.consent) {
    return { error: "Please accept the appointment request consent.", values };
  }

  return { values };
}

function buildEmailHtml(values: ReturnType<typeof validatePayload>["values"]) {
  const rows = [
    ["Full Name", values.fullName],
    ["Mobile Number", values.mobile],
    ["Email Address", values.email],
    ["Preferred Meeting Type", values.meetingType],
    ["Preferred Date and Time", `${values.preferredDate} at ${values.preferredTime} IST`],
    ["Subject", values.subject],
    ["Organisation", values.organisation || "Not provided"],
    ["Known Opposing Party / Organisation", values.opposingParty || "Not provided"],
    ["Preferred Contact Method", values.contactMethod],
    ["Description", values.description]
  ];

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #1f2933; line-height: 1.55;">
      <h1 style="color: #102a43; font-size: 22px;">New Appointment Request</h1>
      <p>This appointment request was submitted through the LANAX Legal Chambers website.</p>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th align="left" style="border: 1px solid #e5e7eb; padding: 10px; width: 220px; background: #f8f6f2; color: #102a43;">${escapeHtml(label)}</th>
                <td style="border: 1px solid #e5e7eb; padding: 10px; white-space: pre-wrap;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p style="margin-top: 18px; color: #64707c;">Do not treat this request as a confirmed appointment until firm review is complete.</p>
    </div>
  `;
}

function buildEmailText(values: ReturnType<typeof validatePayload>["values"]) {
  return [
    "New Appointment Request",
    "",
    "This appointment request was submitted through the LANAX Legal Chambers website.",
    "",
    `Full Name: ${values.fullName}`,
    `Mobile Number: ${values.mobile}`,
    `Email Address: ${values.email}`,
    `Preferred Meeting Type: ${values.meetingType}`,
    `Preferred Date and Time: ${values.preferredDate} at ${values.preferredTime} IST`,
    `Subject: ${values.subject}`,
    `Organisation: ${values.organisation || "Not provided"}`,
    `Known Opposing Party / Organisation: ${values.opposingParty || "Not provided"}`,
    `Preferred Contact Method: ${values.contactMethod}`,
    "",
    "Brief Non-Confidential Description:",
    values.description,
    "",
    "Do not treat this request as a confirmed appointment until firm review is complete."
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.APPOINTMENT_FROM_EMAIL;
  const recipients = (process.env.APPOINTMENT_TO_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (!apiKey || !from || !recipients.length) {
    return json(503, {
      error: "Appointment email delivery is not configured."
    });
  }

  let payload: AppointmentPayload;

  try {
    payload = (await request.json()) as AppointmentPayload;
  } catch {
    return json(400, {
      error: "Invalid request body."
    });
  }

  const validation = validatePayload(payload);

  if (validation.error) {
    return json(400, {
      error: validation.error
    });
  }

  const values = validation.values;
  const resend = new Resend(apiKey);
  const subject = `LANAX appointment request - ${values.subject}`;

  const { error } = await resend.emails.send({
    from,
    to: recipients,
    replyTo: values.email,
    subject,
    html: buildEmailHtml(values),
    text: buildEmailText(values)
  });

  if (error) {
    console.error("Resend appointment email error", error);
    return json(502, {
      error: "Could not send appointment request email."
    });
  }

  return json(200, {
    ok: true
  });
}

export function GET() {
  return json(405, {
    error: "Method not allowed."
  });
}
