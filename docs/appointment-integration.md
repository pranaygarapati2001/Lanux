# Appointment Integration Requirements

The current frontend implements the public appointment request workflow and pending-confirmation
language. On Vercel, appointment requests are posted to `/api/appointment-request`, which sends an
email to the configured firm recipients through Resend.

Required Vercel environment variables:

- `RESEND_API_KEY`
- `APPOINTMENT_FROM_EMAIL`
- `APPOINTMENT_TO_EMAILS`, as a comma-separated list for the three approved recipient addresses

The recipient email addresses and API key must stay in Vercel environment variables and must not be
placed in frontend source files.

Required production setup:

- Configure email notifications to the firm's approved appointment recipients.
- Store appointment requests in protected server-side storage.
- Do not expose public available slots unless the firm later approves a live scheduling system.
- Allow manual review, conflict checks, meeting creation, rescheduling, cancellation and rejection.
- Send admin notification when a request is made.
- Send visitor confirmation only after approval.
- Generate video links only after confirmation, if applicable.
- Keep requests visible in an authenticated admin dashboard.
- Allow the firm to create or export a calendar invite after approval, if needed.
- Include server-side spam protection.
- Keep document uploads disabled for the initial appointment form.
- Store only basic contact and appointment information.
- Add a clear privacy notice and retention policy.

Official phone, WhatsApp, online meeting and office meeting options should remain inactive until the
firm supplies and approves the relevant details.
