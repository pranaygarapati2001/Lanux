import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  X
} from "lucide-react";
import {
  appointmentSettings,
  firm,
  footerNavigation,
  launchChecklist,
  navigation,
  practiceAreas,
  teamProfiles
} from "./data/siteContent";

const siteUrl = "https://lanaxlegal.example";

function useRobots(content?: string) {
  useEffect(() => {
    let element = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", "robots");
      document.head.appendChild(element);
    }

    element.setAttribute("content", content ?? "index,follow");

    return () => {
      element?.setAttribute("content", "index,follow");
    };
  }, [content]);
}

function usePageMeta(title: string, description: string) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title.includes("LANAX Legal Chambers LLP")
      ? title
      : `${title} | LANAX Legal Chambers LLP`;
    document.title = fullTitle;

    const setMeta = (selector: string, attribute: "content", value: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        if (selector.includes("property=")) {
          element.setAttribute("property", selector.match(/"([^"]+)"/)?.[1] ?? "");
        } else {
          element.setAttribute("name", selector.match(/"([^"]+)"/)?.[1] ?? "");
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", `${siteUrl}${location.pathname}`);
  }, [description, location.pathname, title]);
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="LANAX Legal Chambers LLP home">
          <BrandWordmark />
        </Link>

        <button
          className="icon-button nav-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={open ? "nav nav-open" : "nav"} aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              end={item.href === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-wordmark compact" : "brand-wordmark"}>
      <span className="brand-title">LANAX</span>
      <span className="brand-subtitle">Legal Chambers LLP</span>
      <span className="brand-location">Hyderabad, Telangana</span>
    </span>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <BrandWordmark compact />
          </div>
          <p>{firm.footerTrustLine}</p>
          <p>{firm.footerLocationLine}</p>
          <p className="footer-disclaimer">{firm.footerDisclaimer}</p>
        </div>
        <div>
          <p className="eyebrow">Office</p>
          <address>
            {firm.registeredOffice.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>
        <nav aria-label="Footer navigation">
          <p className="eyebrow">Navigation</p>
          {footerNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function ButtonLink({
  to,
  children,
  variant = "primary"
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <Link className={`button ${variant}`} to={to}>
      <span>{children}</span>
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function HomePage() {
  usePageMeta(
    "LANAX Legal Chambers LLP | Hyderabad",
    "LANAX Legal Chambers LLP is a Hyderabad-based legal practice. Find firm details, practice areas, team profiles and appointment contact information."
  );

  const enabledPracticeAreas = practiceAreas.filter((area) => area.enabled);

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow">{firm.homepageTrustLine}</p>
          <h1>{firm.name}</h1>
          <p className="hero-copy">Professional legal advisory and representation support.</p>
          <p className="location-line">
            <MapPin size={18} aria-hidden="true" />
            {firm.cityLine}
          </p>
          <div className="hero-actions">
            <ButtonLink to="/appointment">Request an Appointment</ButtonLink>
            <ButtonLink to="/practice-areas" variant="secondary">
              View Practice Areas
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Trust information">
        <span>Registered LLP</span>
        <span>ROC Hyderabad</span>
        <span>Hyderabad, Telangana</span>
        <span>Professional Legal Services</span>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">About the Firm</p>
            <h2>About LANAX Legal Chambers</h2>
          </div>
          <div className="prose">
            <p>
              The firm is a Hyderabad-based Limited Liability Partnership registered with the
              Registrar of Companies, Hyderabad.
            </p>
            <p>
              The firm provides professional legal advisory, documentation, dispute-resolution
              and representation support, subject to the scope of engagement.
            </p>
            <ButtonLink to="/about" variant="ghost">
              Learn More About the Firm
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow="Practice Areas" title="Practice Areas" />
          <div className="card-grid three">
            {enabledPracticeAreas.map((area) => (
              <article className="practice-card" key={area.slug}>
                <Landmark size={24} aria-hidden="true" />
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
                <Link to={`/practice-areas/${area.slug}`}>Read overview</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Our Team"
              title="Our Team"
              copy="Our team is committed to providing responsible, clear and client-focused professional legal service."
            />
            <ButtonLink to="/team" variant="ghost">
              Meet Our Team
            </ButtonLink>
          </div>
          <div className="team-preview">
            {teamProfiles.map((profile) => (
              <article className="profile-mini" key={profile.name}>
                <div className="portrait-placeholder" aria-hidden="true">
                  {profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3>{profile.name}</h3>
                  <p>{profile.designation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section appointment-band">
        <div className="container band-inner">
          <div>
            <p className="eyebrow">Appointment</p>
            <h2>Request an Appointment</h2>
            <p>{appointmentSettings.requestText}</p>
          </div>
          <ButtonLink to="/appointment">Request an Appointment</ButtonLink>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Contact the Firm</h2>
          </div>
          <div className="prose">
            <p>
              For professional enquiries and appointment requests, please contact the firm.
            </p>
            <ButtonLink to="/contact" variant="ghost">
              Contact the Firm
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  usePageMeta(
    "About the Firm",
    "Firm details for LANAX Legal Chambers LLP, a Hyderabad-based Limited Liability Partnership registered with ROC Hyderabad."
  );

  return (
    <PageSection title="About the Firm">
      <div className="container split page-split">
        <div>
          <p className="eyebrow">About</p>
          <h1>About the Firm</h1>
          <div className="prose large">
            <p>
              LANAX Legal Chambers LLP is a Hyderabad-based Limited Liability Partnership
              registered with the Registrar of Companies, Hyderabad.
            </p>
            <p>
              The firm provides professional legal advisory, documentation, dispute-resolution
              and representation support for individuals, businesses and institutions.
            </p>
            <p>
              Our approach is founded on clear legal analysis, responsible professional service,
              confidentiality and structured communication.
            </p>
          </div>
        </div>
        <aside className="details-card" aria-label="Firm details">
          <h2>Firm Details</h2>
          <dl>
            <div>
              <dt>Legal Name</dt>
              <dd>{firm.name}</dd>
            </div>
            <div>
              <dt>LLPIN</dt>
              <dd>{firm.llpin}</dd>
            </div>
            <div>
              <dt>Entity Type</dt>
              <dd>{firm.entityType}</dd>
            </div>
            <div>
              <dt>Registrar</dt>
              <dd>{firm.registrarShort}</dd>
            </div>
            <div>
              <dt>Date of Incorporation</dt>
              <dd>{firm.incorporationDate}</dd>
            </div>
            <div>
              <dt>Public Status</dt>
              <dd>{firm.publicStatus}</dd>
            </div>
            <div>
              <dt>Registered Office</dt>
              <dd>
                {firm.registeredOffice.map((line) => (
                  <span className="address-line" key={line}>
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </PageSection>
  );
}

function PageSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="page" aria-label={title}>
      {children}
    </section>
  );
}

function PracticeAreasPage() {
  usePageMeta(
    "Practice Areas",
    "Practice area information for LANAX Legal Chambers, subject to scope of engagement."
  );

  const enabledPracticeAreas = practiceAreas.filter((area) => area.enabled);

  return (
    <PageSection title="Practice Areas">
      <div className="container page-header">
        <p className="eyebrow">Practice Areas</p>
        <h1>Practice Areas</h1>
        <p>
          Professional legal advisory, documentation, dispute-resolution and representation
          support, subject to the scope of engagement.
        </p>
      </div>
      <div className="container practice-list">
        {enabledPracticeAreas.map((area) => (
          <article className="practice-detail-card" key={area.slug}>
            <div>
              <p className="eyebrow">Overview</p>
              <h2>{area.title}</h2>
              <p>{area.overview}</p>
            </div>
            <div className="detail-columns">
              <InfoList title="Who it may be relevant for" items={area.relevantFor} />
              <InfoList title="General scope of assistance" items={area.scope} />
              <InfoList title="Common documents involved" items={area.documents} />
            </div>
            <div className="related-row">
              <div>
                <ButtonLink to="/contact" variant="ghost">
                  Contact the Firm
                </ButtonLink>
                <ButtonLink to="/appointment">Request an Appointment</ButtonLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

function PracticeAreaDetailPage() {
  const { slug } = useParams();
  const area = practiceAreas.find((item) => item.slug === slug && item.enabled);

  usePageMeta(
    area ? area.title : "Practice Area",
    area?.summary ?? "Practice area information for LANAX Legal Chambers."
  );

  if (!area) {
    return <NotFoundPage />;
  }

  return (
    <PageSection title={area.title}>
      <div className="container page-header narrow">
        <p className="eyebrow">Practice Area</p>
        <h1>{area.title}</h1>
        <p>{area.summary}</p>
      </div>
      <div className="container detail-layout">
        <article className="content-panel">
          <h2>Overview</h2>
          <p>{area.overview}</p>
          <div className="detail-columns single">
            <InfoList title="Who it may be relevant for" items={area.relevantFor} />
            <InfoList title="General scope of assistance" items={area.scope} />
            <InfoList title="Common documents involved" items={area.documents} />
          </div>
        </article>
        <aside className="side-panel">
          <h2>Contact the Firm</h2>
          <p>For enquiries about this area, contact the office or request an appointment.</p>
          <ButtonLink to="/appointment">Request an Appointment</ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact the Firm
          </ButtonLink>
        </aside>
      </div>
    </PageSection>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="info-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function TeamPage() {
  usePageMeta(
    "Our Team",
    "Team profiles for LANAX Legal Chambers with only verified public information displayed."
  );

  return (
    <PageSection title="Our Team">
      <div className="container page-header">
        <p className="eyebrow">Our Team</p>
        <h1>Our Team</h1>
        <p>
          Our team brings together legal professionals committed to responsible, clear and
          client-focused service.
        </p>
      </div>
      <div className="container card-grid two">
        {teamProfiles.map((profile) => (
          <article className="team-card" key={profile.name}>
            <div className="team-card-top">
              <div className="portrait-placeholder large" aria-hidden="true">
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h2>{profile.name}</h2>
                <p>{profile.designation}</p>
              </div>
            </div>
            {profile.biography.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <InfoList title="Qualifications" items={profile.qualifications} />
            <InfoList title="Bar Council Details" items={[profile.barCouncilDetails ?? "To be updated"]} />
            <InfoList title="Practice Areas" items={profile.practiceAreas} />
            <InfoList title="Languages" items={profile.languages} />
            <InfoList title="Professional Memberships" items={profile.memberships} />
            <Link to="/contact">Contact the Firm</Link>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

type AppointmentStatus =
  | "Pending firm review"
  | "Approved - confirmation pending dispatch"
  | "Reschedule requested"
  | "Rejected after review"
  | "Cancelled";

type StoredAppointment = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  meetingType: string;
  status: AppointmentStatus;
  subject?: string;
  organisation?: string;
  opposingParty?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredTiming?: string;
  contactMethod?: string;
  description?: string;
  consent?: boolean;
  createdAt?: string;
};

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

function timeToMinutes(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
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

function formatPreferredTiming(request: StoredAppointment) {
  if (request.preferredDate && request.preferredTime) {
    return `${request.preferredDate} at ${request.preferredTime} IST`;
  }

  return request.preferredTiming || "Timing to be coordinated";
}

function storeAppointmentRequest(record: StoredAppointment) {
  const existing = JSON.parse(localStorage.getItem("lanaxAppointmentRequests") ?? "[]");
  localStorage.setItem("lanaxAppointmentRequests", JSON.stringify([record, ...existing]));
}

async function submitAppointmentRequest(record: StoredAppointment) {
  const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const response = await fetch("/api/appointment-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(record)
  });
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    if (isLocalPreview) {
      return { localPreview: true };
    }

    throw new Error("Appointment request service is unavailable.");
  }

  const result = (await response.json()) as { error?: string; ok?: boolean };

  if (!response.ok) {
    throw new Error(result.error || "Could not submit the appointment request.");
  }

  return result;
}

function AppointmentPage() {
  usePageMeta(
    "Request an Appointment",
    "Request an office, video or telephone appointment with the firm, subject to firm confirmation."
  );

  const minimumIstSelection = getMinimumIstSelection();
  const [selectedDate, setSelectedDate] = useState(minimumIstSelection.date);
  const [selectedTime, setSelectedTime] = useState("");
  const [dateTimeError, setDateTimeError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const minimumTimeForSelectedDate = selectedDate === minimumIstSelection.date ? minimumIstSelection.time : undefined;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) {
      return;
    }

    if (isBeforeMinimumIstSelection(selectedDate, selectedTime)) {
      setDateTimeError("Please select a current or future date and time in India Standard Time.");
      setSubmitted(false);
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const record: StoredAppointment = {
      id: crypto.randomUUID(),
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      mobile: String(form.get("mobile") ?? ""),
      meetingType: String(form.get("meetingType") ?? ""),
      subject: String(form.get("subject") ?? ""),
      organisation: String(form.get("organisation") ?? ""),
      opposingParty: String(form.get("opposingParty") ?? ""),
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      contactMethod: String(form.get("contactMethod") ?? ""),
      description: String(form.get("description") ?? ""),
      consent: form.get("consent") === "on",
      createdAt: new Date().toISOString(),
      status: "Pending firm review"
    };

    setSubmitting(true);
    setSubmitted(false);
    setSubmissionError("");

    try {
      await submitAppointmentRequest(record);
      storeAppointmentRequest(record);
      setSubmitted(true);
      setDateTimeError("");
      setSelectedDate(getMinimumIstSelection().date);
      setSelectedTime("");
      formElement.reset();
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Could not submit the appointment request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageSection title="Request an Appointment">
      <div className="container page-header">
        <p className="eyebrow">Appointment Request</p>
        <h1>Request an Appointment</h1>
        <p>{appointmentSettings.requestText}</p>
      </div>
      <div className="container form-layout">
        <aside className="side-panel">
          <CalendarCheck size={30} aria-hidden="true" />
          <h2>How Requests Are Handled</h2>
          <p>Default time zone for any later meeting coordination: {appointmentSettings.timeZone}</p>
          <p>
            Visitors may request a preferred date and time, but a meeting is created only after firm
            review.
          </p>
          <div className="workflow-list">
            <span>Request submitted</span>
            <span>Email notification to firm recipients</span>
            <span>Conflict and availability review</span>
            <span>Meeting created after confirmation</span>
          </div>
        </aside>
        <form className="form-panel" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="form-result" role="status">
              <CheckCircle2 size={28} aria-hidden="true" />
              <p>{appointmentSettings.requestMessage}</p>
            </div>
          ) : null}

          <div className="field-grid">
            <label>
              Full Name
              <input name="fullName" autoComplete="name" required />
            </label>
            <label>
              Mobile Number
              <input name="mobile" type="tel" autoComplete="tel" required />
            </label>
            <label>
              Email Address
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Preferred Meeting Type
              <select name="meetingType" required>
                <option>Office Meeting</option>
                <option>Video Meeting</option>
                <option>Telephone Meeting</option>
              </select>
            </label>
            <label>
              Preferred Date (IST)
              <input
                name="preferredDate"
                type="date"
                min={minimumIstSelection.date}
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setDateTimeError("");
                }}
                required
              />
            </label>
            <label>
              Preferred Time (IST)
              <input
                name="preferredTime"
                type="time"
                min={minimumTimeForSelectedDate}
                step={900}
                value={selectedTime}
                onChange={(event) => {
                  setSelectedTime(event.target.value);
                  setDateTimeError("");
                }}
                required
              />
            </label>
            <label>
              Subject of Enquiry
              <input name="subject" required />
            </label>
            <label>
              Company / Organisation Name, optional
              <input name="organisation" autoComplete="organization" />
            </label>
            <label>
              Known Opposing Party / Organisation, optional
              <input name="opposingParty" />
            </label>
            <label>
              Preferred Contact Method
              <select name="contactMethod" required>
                <option>Email</option>
                <option>Telephone, after firm confirmation</option>
              </select>
            </label>
          </div>
          {dateTimeError ? (
            <p className="field-error" role="alert">
              {dateTimeError}
            </p>
          ) : null}
          {submissionError ? (
            <p className="field-error" role="alert">
              {submissionError}
            </p>
          ) : null}

          <p className="warning">
            Please do not submit confidential documents, sensitive case records or detailed facts
            through this form.
          </p>
          <label>
            Brief Non-Confidential Description
            <textarea name="description" rows={5} required />
          </label>
          <label className="consent-row">
            <input type="checkbox" name="consent" required />
            <span>{appointmentSettings.consentText}</span>
          </label>
          <label className="honeypot" aria-hidden="true">
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
          </label>
          <button className="button primary" type="submit" disabled={submitting} aria-busy={submitting}>
            <span>{submitting ? "Submitting Request" : "Submit Appointment Request"}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="privacy-note">
            Only basic contact and appointment information should be submitted through this form.
            Do not upload documents or detailed case records.
          </p>
        </form>
      </div>
    </PageSection>
  );
}

function AdminAppointmentsPage() {
  usePageMeta(
    "Appointment Requests Admin",
    "Admin review prototype for LANAX Legal Chambers LLP appointment requests."
  );
  useRobots("noindex,nofollow");

  const [requests, setRequests] = useState<StoredAppointment[]>([]);

  useEffect(() => {
    setRequests(JSON.parse(localStorage.getItem("lanaxAppointmentRequests") ?? "[]"));
  }, []);

  const updateStatus = (id: string, status: AppointmentStatus) => {
    const next = requests.map((request) => (request.id === id ? { ...request, status } : request));
    setRequests(next);
    localStorage.setItem("lanaxAppointmentRequests", JSON.stringify(next));
  };

  return (
    <PageSection title="Appointment Requests Admin">
      <div className="container page-header">
        <p className="eyebrow">Admin Prototype</p>
        <h1>Appointment Requests</h1>
        <p>
          Review pending requests, mark firm decisions and create meeting invites only after review.
          This screen must be protected behind authentication before launch.
        </p>
      </div>
      <div className="container admin-layout">
        <aside className="side-panel">
          <ShieldCheck size={30} aria-hidden="true" />
          <h2>Production Requirements</h2>
          <p>
            Configure email delivery to the firm's approved appointment recipients before public
            launch.
          </p>
          <div className="workflow-list">
            <span>Email notification on request</span>
            <span>Manual approval before visitor confirmation</span>
            <span>Video link only after confirmation</span>
            <span>Server-side spam protection and private storage</span>
          </div>
        </aside>
        <section className="admin-panel">
          {requests.length ? (
            requests.map((request) => (
              <article className="request-card" key={request.id}>
                <div>
                  <h2>{request.fullName || "Unnamed requester"}</h2>
                  <p>
                    {request.meetingType} | {formatPreferredTiming(request)}
                  </p>
                </div>
                <dl>
                  <div>
                    <dt>Email</dt>
                    <dd>{request.email}</dd>
                  </div>
                  <div>
                    <dt>Mobile</dt>
                    <dd>{request.mobile}</dd>
                  </div>
                  <div>
                    <dt>Subject</dt>
                    <dd>{request.subject || "Not provided"}</dd>
                  </div>
                  <div>
                    <dt>Preferred Contact</dt>
                    <dd>{request.contactMethod || "Not provided"}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{request.status}</dd>
                  </div>
                </dl>
                <div className="admin-actions">
                  <button
                    className="button ghost"
                    type="button"
                    onClick={() => updateStatus(request.id, "Approved - confirmation pending dispatch")}
                  >
                    Approve
                  </button>
                  <button
                    className="button ghost"
                    type="button"
                    onClick={() => updateStatus(request.id, "Reschedule requested")}
                  >
                    Request Reschedule
                  </button>
                  <button
                    className="button ghost"
                    type="button"
                    onClick={() => updateStatus(request.id, "Rejected after review")}
                  >
                    Reject
                  </button>
                  <button
                    className="button ghost"
                    type="button"
                    onClick={() => updateStatus(request.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <CalendarCheck size={30} aria-hidden="true" />
              <h2>No appointment requests are stored in this browser.</h2>
              <p>
                Submit a test request from the appointment page to review the pending-confirmation
                workflow here.
              </p>
              <ButtonLink to="/appointment">Open Appointment Form</ButtonLink>
            </div>
          )}
        </section>
      </div>
    </PageSection>
  );
}

function ContactPage() {
  usePageMeta(
    "Contact the Firm",
    "Email and registered office contact information for LANAX Legal Chambers in Hyderabad, Telangana."
  );

  return (
    <PageSection title="Contact the Firm">
      <div className="container page-header">
        <p className="eyebrow">Contact</p>
        <h1>Contact the Firm</h1>
        <p>For professional enquiries, use the public email or request an appointment.</p>
      </div>
      <div className="container contact-layout">
        <section className="contact-card">
          <h2>Registered Office</h2>
          <address>
            {firm.registeredOffice.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a className="contact-line" href={`mailto:${firm.publicEmail}`}>
            <Mail size={18} aria-hidden="true" />
            {firm.publicEmail}
          </a>
          <a className="contact-line" href={firm.googleMapsUrl} target="_blank" rel="noreferrer">
            <MapPin size={18} aria-hidden="true" />
            Open registered office address in Google Maps
          </a>
          <div className="placeholder-list">
            <p>
              <Phone size={17} aria-hidden="true" />
              Official firm phone number: Not provided
            </p>
            <p>
              <Phone size={17} aria-hidden="true" />
              Official WhatsApp number: Not provided
            </p>
            <p>
              <Mail size={17} aria-hidden="true" />
              Official domain email: Not provided
            </p>
            <p>
              <Clock size={17} aria-hidden="true" />
              Office hours: Not provided
            </p>
            <p>
              <Building2 size={17} aria-hidden="true" />
              Meeting directions and parking information: Not provided
            </p>
          </div>
        </section>

        <aside className="side-panel">
          <CalendarCheck size={30} aria-hidden="true" />
          <h2>Request an Appointment</h2>
          <p>
            Appointment requests are reviewed by the firm before any office, video or telephone
            meeting is created or confirmed.
          </p>
          <ButtonLink to="/appointment">Request an Appointment</ButtonLink>
          <ButtonLink to={`mailto:${firm.publicEmail}`} variant="secondary">
            Email the Firm
          </ButtonLink>
          <a className="button secondary" href={firm.googleMapsUrl} target="_blank" rel="noreferrer">
            <span>Open in Google Maps</span>
            <MapPin size={17} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </PageSection>
  );
}

function DisclaimerPage() {
  usePageMeta(
    "Disclaimer",
    "General website disclaimer for LANAX Legal Chambers LLP."
  );

  return (
    <PolicyPage title="Disclaimer">
      <p>
        The information available on this website is provided for general informational purposes
        only and does not constitute legal advice.
      </p>
      <p>
        Accessing this website or contacting LANAX Legal Chambers LLP through this website does
        not create an advocate-client relationship.
      </p>
      <p>
        Users should not act or refrain from acting on the basis of information available on this
        website without obtaining appropriate professional legal advice.
      </p>
      <p>
        LANAX Legal Chambers LLP does not guarantee that information on this website is complete,
        current or applicable to every situation.
      </p>
    </PolicyPage>
  );
}

function PrivacyPolicyPage() {
  usePageMeta(
    "Privacy Policy",
    "Privacy policy for LANAX Legal Chambers LLP website enquiries and appointment requests."
  );

  return (
    <PolicyPage title="Privacy Policy">
      <p>
        This website collects only basic contact and appointment information submitted through the
        enquiry and appointment request forms.
      </p>
      <p>
        Visitors should not submit confidential documents, sensitive case records or detailed facts
        through website forms. Appointment requests are reviewed before confirmation.
      </p>
      <p>
        Information submitted through this website may be used to respond to enquiries, review
        appointment availability, perform conflict checks and maintain communication records.
      </p>
      <p>
        Calendar integration, email notification and storage providers should be configured before
        public launch with access controls, spam protection and retention settings approved by the
        firm.
      </p>
      <p>Privacy-policy contact person: To be confirmed by the firm before launch.</p>
    </PolicyPage>
  );
}

function TermsPage() {
  usePageMeta(
    "Terms of Use",
    "Terms of use for the LANAX Legal Chambers LLP website."
  );

  return (
    <PolicyPage title="Terms of Use">
      <p>
        This website is provided for general informational purposes about LANAX Legal Chambers LLP,
        its public firm details, practice information, team profiles and contact options.
      </p>
      <p>
        Use of this website does not create an advocate-client relationship. Any professional
        engagement is subject to review, conflict requirements, confirmation and agreed terms.
      </p>
      <p>
        Website content should not be treated as advice on any specific matter. Users should obtain
        professional advice based on their own facts and documents.
      </p>
      <p>
        The firm may update website content, appointment availability, forms and policies from time
        to time.
      </p>
    </PolicyPage>
  );
}

function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PageSection title={title}>
      <article className="container policy-page">
        <p className="eyebrow">Legal</p>
        <h1>{title}</h1>
        <div className="prose large">{children}</div>
      </article>
    </PageSection>
  );
}

function LaunchChecklistPage() {
  usePageMeta(
    "Launch Checklist",
    "Content required from LANAX Legal Chambers LLP before website launch."
  );

  return (
    <PageSection title="Launch Checklist">
      <div className="container page-header">
        <p className="eyebrow">Before Launch</p>
        <h1>Content Required From the Firm</h1>
        <p>
          The following items should be verified and approved before public launch or expanded
          publication.
        </p>
      </div>
      <div className="container checklist">
        {launchChecklist.map((item) => (
          <span key={item}>
            <ShieldCheck size={17} aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </PageSection>
  );
}

function NotFoundPage() {
  usePageMeta("Page Not Found", "The requested LANAX Legal Chambers LLP page could not be found.");

  return (
    <PageSection title="Page Not Found">
      <div className="container page-header narrow">
        <p className="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p>The page you requested could not be found.</p>
        <ButtonLink to="/">Return Home</ButtonLink>
      </div>
    </PageSection>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/practice-areas" element={<PracticeAreasPage />} />
          <Route path="/practice-areas/:slug" element={<PracticeAreaDetailPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsPage />} />
          <Route path="/launch-checklist" element={<LaunchChecklistPage />} />
          <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
