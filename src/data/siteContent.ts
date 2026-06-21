export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  relevantFor: string[];
  scope: string[];
  documents: string[];
  enabled: boolean;
};

export type TeamProfile = {
  name: string;
  designation: string;
  image?: string;
  biography: string;
  qualifications: string[];
  barCouncilDetails?: string;
  practiceAreas: string[];
  languages: string[];
  memberships: string[];
  profileLink?: string;
  contact?: string;
};

export const firm = {
  name: "LANAX Legal Chambers LLP",
  entityType: "Limited Liability Partnership",
  llpin: "ACJ-9140",
  registrar: "Registrar of Companies, Hyderabad",
  registrarShort: "ROC Hyderabad",
  incorporationDate: "14 October 2024",
  publicStatus: "Active",
  publicEmail: "veerayya@hotmail.com",
  cityLine: "Hyderabad, Telangana, India",
  registeredOffice: [
    "B-104, 8-3-979/1, 2, 4, 5, 6/B",
    "Yallareddy Guda",
    "Srinagar Colony",
    "Khairatabad",
    "Hyderabad",
    "Telangana - 500073",
    "India"
  ],
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=B-104%2C%208-3-979%2F1%2C%202%2C%204%2C%205%2C%206%2FB%2C%20Yallareddy%20Guda%2C%20Srinagar%20Colony%2C%20Khairatabad%2C%20Hyderabad%2C%20Telangana%20500073%2C%20India",
  homepageTrustLine: "Registered LLP | ROC Hyderabad | Hyderabad, Telangana",
  footerTrustLine: "LLPIN: ACJ-9140 | Registered with ROC Hyderabad",
  footerLocationLine: "Hyderabad, Telangana, India",
  footerDisclaimer:
    "This website is intended for general information only and does not constitute legal advice or solicitation."
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About the Firm", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Our Team", href: "/team" },
  { label: "Request an Appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" }
];

export const footerNavigation = [
  { label: "Firm Details", href: "/about" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Contact", href: "/contact" }
];

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial-matters",
    title: "Corporate & Commercial Matters",
    summary:
      "Professional assistance in matters relating to commercial arrangements, corporate documentation, business transactions and governance.",
    overview:
      "Support for commercial and corporate legal matters, subject to the scope of engagement and the facts of the matter.",
    relevantFor: [
      "Businesses seeking review of commercial arrangements",
      "Founders and institutions requiring corporate documentation support",
      "Parties reviewing governance or transaction documents"
    ],
    scope: [
      "Commercial documentation review",
      "Corporate records and governance support",
      "Transaction documentation assistance",
      "Legal risk observations within the agreed engagement"
    ],
    documents: [
      "Commercial agreements",
      "Board and partner documentation",
      "Notices and replies",
      "Transaction papers"
    ],
    enabled: true
  },
  {
    slug: "arbitration-dispute-resolution",
    title: "Arbitration & Dispute Resolution",
    summary:
      "Professional assistance in dispute-resolution matters, including negotiation, mediation, arbitration and related proceedings.",
    overview:
      "Structured dispute-resolution support for civil, commercial and contractual matters, subject to the scope of engagement.",
    relevantFor: [
      "Parties reviewing pre-dispute or post-dispute options",
      "Businesses considering negotiation, mediation or arbitration",
      "Individuals requiring structured dispute communication"
    ],
    scope: [
      "Dispute notice and reply assistance",
      "Negotiation and mediation support",
      "Arbitration-related documentation",
      "Representation support where applicable"
    ],
    documents: [
      "Dispute notices",
      "Reply notices",
      "Settlement drafts",
      "Arbitration pleadings and records"
    ],
    enabled: true
  },
  {
    slug: "insolvency-bankruptcy-matters",
    title: "Insolvency & Bankruptcy Matters",
    summary:
      "Professional support in insolvency and bankruptcy-related matters, subject to the facts, documents and scope of engagement.",
    overview:
      "Assistance with insolvency and bankruptcy matters where the facts and documentation support a defined engagement.",
    relevantFor: [
      "Creditors reviewing insolvency-related options",
      "Businesses handling insolvency-related notices or records",
      "Parties reviewing creditor-debtor documentation"
    ],
    scope: [
      "Documentation review",
      "Notice and reply support",
      "Proceeding-related coordination",
      "Legal advisory within the agreed scope"
    ],
    documents: [
      "Demand notices",
      "Loan and credit documents",
      "Invoices and account statements",
      "Insolvency records"
    ],
    enabled: true
  },
  {
    slug: "debt-recovery-tribunal-matters",
    title: "Debt Recovery Tribunal Matters",
    summary:
      "Professional support in debt-recovery and creditor-debtor matters, including related documentation and proceedings.",
    overview:
      "Support for debt-recovery matters, including review of records, correspondence and proceeding-related documentation.",
    relevantFor: [
      "Creditors reviewing recovery documentation",
      "Borrowers or guarantors reviewing notices and records",
      "Businesses coordinating debt-recovery proceedings"
    ],
    scope: [
      "Debt-recovery documentation review",
      "Notice and reply assistance",
      "Proceeding-related document support",
      "Legal advisory subject to engagement"
    ],
    documents: [
      "Demand notices",
      "Loan documents",
      "Security and guarantee records",
      "Statements of account"
    ],
    enabled: true
  },
  {
    slug: "civil-commercial-litigation",
    title: "Civil & Commercial Litigation",
    summary:
      "Professional support in civil, contractual, commercial and property-related matters.",
    overview:
      "Professional legal support for civil and commercial disputes, with the exact scope determined after review.",
    relevantFor: [
      "Individuals or businesses involved in civil disputes",
      "Parties dealing with contractual disagreements",
      "Stakeholders reviewing property-related documentation"
    ],
    scope: [
      "Case-document organization",
      "Drafting and reply support",
      "Representation support subject to engagement",
      "Communication and matter-status coordination"
    ],
    documents: [
      "Contracts",
      "Legal notices",
      "Property documents",
      "Correspondence and pleadings"
    ],
    enabled: true
  },
  {
    slug: "contracts-legal-documentation",
    title: "Contracts & Legal Documentation",
    summary:
      "Drafting, review and support relating to agreements, notices, replies, legal opinions and legal documentation.",
    overview:
      "Documentation assistance for legal instruments and correspondence, subject to verification of the matter and instructions.",
    relevantFor: [
      "Individuals needing document review",
      "Businesses preparing commercial agreements",
      "Parties responding to legal correspondence"
    ],
    scope: [
      "Agreement drafting and review",
      "Notices and replies",
      "Legal documentation support",
      "Matter-specific legal observations"
    ],
    documents: [
      "Agreements",
      "Notices",
      "Replies",
      "Legal opinions and memoranda"
    ],
    enabled: true
  },
  {
    slug: "infrastructure-project-legal-matters",
    title: "Infrastructure & Project-Related Legal Matters",
    summary:
      "Professional support for infrastructure and project-related legal documentation, coordination and dispute considerations.",
    overview:
      "Assistance with project-related legal matters, including documentation, commercial coordination and dispute-related support, subject to engagement.",
    relevantFor: [
      "Businesses involved in project documentation",
      "Institutions reviewing infrastructure-related agreements",
      "Parties coordinating commercial or dispute-related project records"
    ],
    scope: [
      "Project documentation review",
      "Commercial agreement support",
      "Dispute-related document coordination",
      "Legal risk observations within the agreed scope"
    ],
    documents: [
      "Project agreements",
      "Commercial correspondence",
      "Notices and replies",
      "Project records"
    ],
    enabled: true
  },
  {
    slug: "criminal-matters",
    title: "Criminal Matters",
    summary:
      "Professional legal support in criminal matters, subject to review of the facts, documents and applicable professional requirements.",
    overview:
      "Support in criminal matters may be considered after review of the facts, available documents and the applicable scope of engagement.",
    relevantFor: [
      "Individuals seeking review of criminal-law related notices or records",
      "Businesses reviewing complaint-related documentation",
      "Parties requiring structured legal communication"
    ],
    scope: [
      "Document and notice review",
      "Reply and representation support where applicable",
      "Matter-record organization",
      "Legal advisory subject to engagement"
    ],
    documents: [
      "Complaints",
      "Notices",
      "Correspondence",
      "Proceeding records"
    ],
    enabled: true
  }
];

export const teamProfiles: TeamProfile[] = [
  {
    name: "Veerayya Maredy",
    designation: "Designated Partner",
    biography:
      "Veerayya Maredy is a Designated Partner of the firm.",
    qualifications: ["To be updated after approved details are provided"],
    barCouncilDetails: "Not published",
    practiceAreas: ["To be updated after approved details are provided"],
    languages: ["To be updated after approved details are provided"],
    memberships: ["To be updated after approved details are provided"]
  },
  {
    name: "Satyasadhan Chalamala",
    designation: "Designated Partner | Advocate",
    biography:
      "Satyasadhan Chalamala is an Advocate and Designated Partner with the firm. He is enrolled under Registration No. TS/2391/2018 and serves as Legal Expert on the Institutional Human Ethical Committee of Mamata Academy of Medical Sciences.",
    qualifications: ["To be updated after approved details are provided"],
    barCouncilDetails: "Enrolment No.: TS/2391/2018",
    practiceAreas: ["To be updated after approved details are provided"],
    languages: ["To be updated after approved details are provided"],
    memberships: [
      "Legal Expert, Institutional Human Ethical Committee of Mamata Academy of Medical Sciences, Hyderabad"
    ]
  },
  {
    name: "Surya Narayana Garapati",
    designation: "Designated Partner | Advocate",
    biography:
      "Surya Narayana Garapati is an Advocate associated with corporate, commercial, infrastructure and project-related legal matters. His practice focus includes arbitration and dispute resolution, insolvency and bankruptcy matters, debt recovery and related proceedings.\n\nHe holds an LL.M. from Kakatiya University, Warangal. He completed his LL.M. with Distinction and was recognised as a University Topper, receiving three Gold Medals for academic excellence.",
    qualifications: [
      "LL.M., Kakatiya University, Warangal - Distinction",
      "University Topper, Kakatiya University",
      "Recipient of Three Gold Medals at the 23rd Convocation"
    ],
    barCouncilDetails: "Enrolment number to be published only after confirmation",
    practiceAreas: [
      "Corporate and commercial matters",
      "Arbitration and dispute resolution",
      "Insolvency and Bankruptcy Code matters",
      "Debt Recovery Tribunal matters",
      "Criminal matters",
      "Infrastructure and project-related matters"
    ],
    languages: ["To be updated after approved details are provided"],
    memberships: ["To be updated after approved details are provided"]
  }
];

export const appointmentSettings = {
  timeZone: "India Standard Time (IST)",
  requestText:
    "To request an office, video or telephone meeting, please submit your contact details, preferred date and preferred time in India Standard Time. The firm will review the request before creating or confirming any meeting.",
  consentText:
    "I understand that submitting an appointment request does not create an advocate-client relationship. The appointment is subject to confirmation by LANAX Legal Chambers LLP.",
  requestMessage:
    "Thank you. Your appointment request has been received. The firm will review availability and conflict requirements before creating or confirming any meeting by email or telephone."
};

export const launchChecklist = [
  "Preferred domain name",
  "Official firm phone number",
  "Official WhatsApp number",
  "Office hours",
  "Appointment notification recipients",
  "Appointment review and meeting-creation process",
  "Domain-based email address",
  "Directions/visitor instructions",
  "Partner photographs",
  "Veerayya Maredy's approved professional biography",
  "Satyasadhan Chalamala's education and practice areas",
  "Surya Narayana Garapati's Bar Council enrolment number",
  "Approved partner biographies and qualifications",
  "Bar Council enrolment details, if applicable",
  "Confirmed current list of partners",
  "Confirmed firm-wide practice areas",
  "Approved service descriptions",
  "Appointment policy",
  "Official email for appointment notifications",
  "Privacy-policy contact person",
  "Professional memberships or recognitions",
  "Confirmation whether online/video meetings are available",
  "Confirmation whether office meetings require prior appointment",
  "Approval of final legal disclaimer and website copy"
];
