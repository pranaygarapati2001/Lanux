# LANAX Legal Chambers LLP CMS Notes

Public website content is currently edited in `src/data/siteContent.ts`.

Before launch, replace this with a protected CMS or admin backend. The public site must not expose
private profile fields, calendar credentials, email-provider credentials, phone numbers or WhatsApp
contact options until the firm approves them.

Recommended editable collections:

- Firm details
- Practice areas, with `enabled` and approval status
- Team profiles
- Appointment request settings and notification recipients
- Contact placeholders
- Legal policy copy

Sensitive profile seed data that should remain admin-only is kept in `cms/admin-seed.json` and is
not imported into the public frontend bundle.
