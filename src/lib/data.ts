/**
 * Central content layer for AP.com — India's Business Growth Ecosystem.
 *
 * Every page reads from here so copy, programs, and proof can be retuned
 * in one place. Entries marked "representative" are placeholder narratives
 * awaiting real client stories and assets.
 */

/* ────────────────────────────── Navigation ────────────────────────────── */

export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const NAV: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      {
        label: "Demo Session",
        href: "/courses#demo",
        description: "Every Saturday · 3 hours live · ₹199 registration fee.",
      },
      {
        label: "Live Course",
        href: "/courses#live",
        description: "The flagship live learning program — projects, AI, mentorship.",
      },
    ],
  },
  { label: "Business Advisory", href: "/business-advisory" },
  {
    label: "Insights",
    href: "/knowledge-hub",
    children: [
      {
        label: "Knowledge Hub",
        href: "/knowledge-hub",
        description: "Playbooks, frameworks, and field notes on building businesses.",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Business transformations, told end to end.",
      },
      {
        label: "Media & Recognition",
        href: "/media",
        description: "Talks, podcasts, faculty work, and press.",
      },
      {
        label: "Testimonials",
        href: "/testimonials",
        description: "Founders and students, in their own words.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* ─────────────────────────── Core positioning ─────────────────────────── */

export const TAGLINE = "India's Business Growth Ecosystem";

export const PHILOSOPHY_SCENES = [
  {
    kicker: "The difference",
    line: "Most consultants advise.",
  },
  {
    kicker: "The practice",
    line: "Anjan operates.",
  },
  {
    kicker: "The commitment",
    line: "He works with businesses — not just on them.",
  },
] as const;

/* ────────────────────── Contact & social presence ─────────────────────── */

export const CONTACT_EMAIL = "performance@noboruworld.com";
/** Set when the official number is confirmed — the UI hides the row if empty. */
export const CONTACT_PHONE: string = "";

export const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/anjanpr/?hl=en" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/anjanprasad/" },
  /** Official channel link pending — icon stays visible per brand direction. */
  { name: "YouTube", href: "#" },
] as const;

/* ─────────────────────────────── Journey ──────────────────────────────── */

export type JourneyChapter = {
  index: string;
  era: string;
  title: string;
  copy: string;
  marks: string[]; // organisations that define the chapter
  detail: string;
};

export const JOURNEY: JourneyChapter[] = [
  {
    index: "01",
    era: "Corporate Foundation",
    title: "Learning how large businesses run",
    copy: "Growth mandates inside global agencies and consultancies — where discipline is not optional.",
    marks: ["Mindshare · GroupM", "IPG Mediabrands", "Accenture"],
    detail:
      "Years inside the engine rooms of global brands: planning cycles, P&L reviews, and the systems that keep billion-dollar businesses accountable.",
  },
  {
    index: "02",
    era: "Enterprise Leadership",
    title: "Owning growth at enterprise altitude",
    copy: "Marketing technology and travel commerce at scale — where one percent moves millions.",
    marks: ["Zeta Global", "Fareportal"],
    detail:
      "Owning outcomes across markets and channels, and learning that scale is an operations problem long before it is a marketing problem.",
  },
  {
    index: "03",
    era: "Building Businesses",
    title: "Starting companies from zero",
    copy: "Founding businesses across growth, consumer, and compliance — bootstrapped and profitable.",
    marks: ["Noboru World", "Lushful", "Filing Buddy"],
    detail:
      "Three companies started from a blank page. Payroll made, margins defended, systems written by hand — the education no classroom sells.",
  },
  {
    index: "04",
    era: "Scaling Ventures",
    title: "Turning products into companies",
    copy: "Recurring revenue, real teams, defensible margins — growth made repeatable.",
    marks: ["Enterprise clients", "Thousands of SMEs"],
    detail:
      "The ventures grew past their founder: enterprise product lines, recurring-revenue bases, and leadership benches that run the week without him.",
  },
  {
    index: "05",
    era: "Business Transformation",
    title: "Rebuilding businesses from the inside",
    copy: "Advisory done in the client's operating rhythm — not in a slide deck.",
    marks: ["Founders", "SMEs", "Enterprises"],
    detail:
      "Revenue engines redesigned, back offices rebuilt, leadership benches formed. Transformation measured in margin, not in meetings.",
  },
  {
    index: "06",
    era: "Founder Mentor",
    title: "Teaching what building takes",
    copy: "Courses, mentorship, and a growing community of people who want businesses that outlast them.",
    marks: ["AP.com", "IIFT", "IMT Ghaziabad"],
    detail:
      "The playbooks earned across two decades — taught live, lectured at institutes, and translated into programs anyone ambitious can start with.",
  },
];

/* ──────────────────────────── Organisations ───────────────────────────── */

export type Organisation = {
  name: string;
  role: string;
  contribution: string;
  impact: string;
  kind: "built" | "career" | "advised";
};

export const COMPANIES_BUILT: Organisation[] = [
  {
    name: "Noboru World",
    role: "Founder & CEO",
    contribution: "A brand-and-growth company building marketing products and operating systems.",
    impact: "Bootstrapped to profitability with an enterprise product line.",
    kind: "built",
  },
  {
    name: "Lushful",
    role: "Founder",
    contribution: "A consumer brand engineered around retention and unit economics.",
    impact: "A category position built on sustainable, profitable margins.",
    kind: "built",
  },
  {
    name: "Filing Buddy",
    role: "Co-Founder",
    contribution: "A compliance and finance-operations platform for founders and SMEs.",
    impact: "A recurring-revenue base serving thousands of businesses.",
    kind: "built",
  },
];

export const CAREER_MARKS: Organisation[] = [
  {
    name: "Mindshare (GroupM)",
    role: "Media & Growth",
    contribution: "Planning and growth for global consumer brands.",
    impact: "The discipline of accountable media investment.",
    kind: "career",
  },
  {
    name: "IPG Mediabrands",
    role: "Strategy",
    contribution: "Integrated strategy across categories and markets.",
    impact: "Systems thinking applied to brand growth.",
    kind: "career",
  },
  {
    name: "Accenture",
    role: "Consulting",
    contribution: "Transformation programs for enterprise clients.",
    impact: "Rigor of enterprise-grade delivery.",
    kind: "career",
  },
  {
    name: "Zeta Global",
    role: "Marketing Technology",
    contribution: "Data-driven growth at platform scale.",
    impact: "Where growth met engineering.",
    kind: "career",
  },
  {
    name: "Fareportal",
    role: "Travel Commerce",
    contribution: "Revenue operations in high-velocity e-commerce.",
    impact: "Operating at transaction-per-second altitude.",
    kind: "career",
  },
];

/** Brands touched across agency and consulting years. */
export const BRANDS_ADVISED: string[] = [
  "Google",
  "Motorola",
  "Sony",
  "American Express",
  "Tommy Hilfiger",
  "Dabur",
  "Pizza Hut",
  "KFC",
  "Snapdeal",
  "PwC",
  "DLF",
  "Tata Housing",
  "Cairn India",
  "Aditya Birla Capital",
  "Digit General Insurance",
  "NIIT",
  "Black & Decker",
  "Safilo",
  "CheapOair",
  "OneTravel",
  "Neustar",
  "Urban Kisaan",
  "Akounto",
];

/* ─────────────────────────── Who we help paths ────────────────────────── */

export type Persona = {
  id: string;
  label: string;
  headline: string;
  pain: string[];
  goals: string[];
  path: { label: string; href: string; note: string }[];
};

export const PERSONAS: Persona[] = [
  {
    id: "student",
    label: "A Student",
    headline: "Build career capital before your first job.",
    pain: [
      "Degrees teach theory; hiring managers test practice.",
      "No map from classroom to income.",
    ],
    goals: [
      "Real business and AI skills, demonstrated through projects.",
      "A network that opens the first door.",
    ],
    path: [
      { label: "Demo Session", href: "/courses#demo", note: "See how businesses are actually built." },
      { label: "Live Course", href: "/courses#live", note: "Projects, mentorship, and community." },
      { label: "Knowledge Hub", href: "/knowledge-hub", note: "Free playbooks to start today." },
    ],
  },
  {
    id: "professional",
    label: "A Working Professional",
    headline: "Turn experience into leverage — or into a business.",
    pain: [
      "Ten years in, growth has flattened.",
      "The itch to build something of your own, without a runway to gamble.",
    ],
    goals: [
      "Modern business systems and AI fluency.",
      "A tested path from salary to ownership.",
    ],
    path: [
      { label: "Demo Session", href: "/courses#demo", note: "A working preview of the playbook." },
      { label: "Live Course", href: "/courses#live", note: "Build a venture alongside your job." },
      { label: "Case Studies", href: "/case-studies", note: "Proof it works for people like you." },
    ],
  },
  {
    id: "founder",
    label: "A Founder",
    headline: "From firefighting to a business that runs on systems.",
    pain: [
      "Everything routes through you.",
      "Growth is happening, but margins and sanity are not.",
    ],
    goals: [
      "An operating system: cadence, metrics, accountability.",
      "A growth engine that is repeatable, not heroic.",
    ],
    path: [
      { label: "Business Advisory", href: "/business-advisory", note: "Hands-on transformation, inside your business." },
      { label: "Case Studies", href: "/case-studies", note: "How other founders rebuilt." },
      { label: "Live Course", href: "/courses#live", note: "The playbook, self-driven." },
    ],
  },
  {
    id: "owner",
    label: "A Business Owner",
    headline: "Modernise a business that already works.",
    pain: [
      "Revenue is real, but the model is ageing.",
      "Digital, AI, and new competition are moving faster than the org.",
    ],
    goals: [
      "Digital and AI transformation without breaking what works.",
      "A second growth curve.",
    ],
    path: [
      { label: "Business Advisory", href: "/business-advisory", note: "Growth, RevOps, and transformation." },
      { label: "Case Studies", href: "/case-studies", note: "Transformations like yours." },
      { label: "Contact", href: "/contact", note: "Start with a conversation." },
    ],
  },
  {
    id: "woman-entrepreneur",
    label: "A Woman Entrepreneur",
    headline: "Build on your terms, with structure and backing.",
    pain: [
      "Advice networks that don't reflect your context.",
      "Capital and confidence gaps that compound each other.",
    ],
    goals: [
      "A rigorous, judgement-free operating playbook.",
      "Community and mentorship that shows up.",
    ],
    path: [
      { label: "Demo Session", href: "/courses#demo", note: "Start small, see the method." },
      { label: "Live Course", href: "/courses#live", note: "Mentorship and community included." },
      { label: "Testimonials", href: "/testimonials", note: "Women who built with AP.com." },
    ],
  },
  {
    id: "enterprise",
    label: "An Enterprise Leader",
    headline: "Transform the organisation, not just the org chart.",
    pain: [
      "Transformation programs that end at the slide deck.",
      "Teams that need AI and modern operating skills yesterday.",
    ],
    goals: [
      "Execution-grade transformation partners.",
      "Leadership and workforce capability that sticks.",
    ],
    path: [
      { label: "Business Advisory", href: "/business-advisory", note: "Transformation, training, and fractional leadership." },
      { label: "Media & Recognition", href: "/media", note: "Why organisations trust AP.com." },
      { label: "Contact", href: "/contact", note: "Design an engagement." },
    ],
  },
];

/* ─────────────────────────── Business advisory ────────────────────────── */

export type ConsultingOutcome = {
  id: string;
  title: string;
  challenge: string;
  approach: string;
  execution: string;
  outcome: string;
  proof: string;
};

export const CONSULTING_OUTCOMES: ConsultingOutcome[] = [
  {
    id: "growth",
    title: "Business Growth",
    challenge: "Revenue depends on effort, not on a system. Every quarter starts from zero.",
    approach: "Diagnose the full revenue engine — positioning, pipeline, pricing, retention — before touching tactics.",
    execution: "A growth operating system installed inside your team: cadence, metrics, experiments, ownership.",
    outcome: "Repeatable, forecastable growth with defended margins.",
    proof: "Built and scaled three bootstrapped companies on exactly this system.",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    challenge: "The business runs on habits and spreadsheets while the market moves to platforms and AI.",
    approach: "Map the value chain, then digitise the constraints — not everything at once.",
    execution: "Tooling, automation, and AI workflows deployed with the people who will run them.",
    outcome: "A modern operating stack the team actually uses.",
    proof: "Transformation delivery honed at Accenture and applied across SME engagements.",
  },
  {
    id: "revops",
    title: "Revenue Operations",
    challenge: "Marketing, sales, and service optimise their own silos while revenue leaks between them.",
    approach: "One revenue architecture: shared funnel, shared data, shared accountability.",
    execution: "CRM discipline, pipeline hygiene, forecasting rhythm, and enablement built in-house.",
    outcome: "A single, truthful view of revenue — and the levers that move it.",
    proof: "RevOps practice built operating high-velocity commerce at enterprise scale.",
  },
  {
    id: "fractional-cxo",
    title: "Fractional CXO",
    challenge: "You need senior operating leadership before you can afford it full-time.",
    approach: "A defined mandate with owned outcomes — not advisory hours.",
    execution: "Inside your leadership rhythm weekly: decisions made, teams led, systems installed.",
    outcome: "Executive-grade leadership at a fraction of the cost and risk.",
    proof: "Two decades operating businesses from startup to enterprise.",
  },
  {
    id: "hr",
    title: "People & Organisation",
    challenge: "Hiring is reactive, roles are blurry, and culture depends on proximity to the founder.",
    approach: "Design the organisation the strategy needs, then staff it deliberately.",
    execution: "Org design, hiring systems, performance rhythm, and leadership development.",
    outcome: "A team that scales culture and performance together.",
    proof: "Leadership benches built across three founded companies and client engagements.",
  },
  {
    id: "finance",
    title: "Finance & Cash Flow",
    challenge: "Growth is eating cash and nobody can say precisely where.",
    approach: "Unit economics first: know what a customer costs, earns, and deserves.",
    execution: "Margin architecture, pricing, cash-flow rhythm, and finance dashboards founders can read.",
    outcome: "Financial discipline behind durable profitability.",
    proof: "Co-founded a finance-operations platform serving thousands of SMEs.",
  },
  {
    id: "leadership",
    title: "Leadership Development",
    challenge: "The business has outgrown the leadership habits that built it.",
    approach: "Develop leaders inside real decisions, not offsite workshops.",
    execution: "Operating cadence coaching, decision frameworks, and succession-minded delegation.",
    outcome: "A leadership bench the founder can actually hand things to.",
    proof: "Mentored founders and executives across startups and enterprises.",
  },
  {
    id: "operations",
    title: "Operations & Systems",
    challenge: "Every process lives in someone's head. Scale multiplies the chaos.",
    approach: "Document, simplify, automate — in that order.",
    execution: "SOPs, tooling, and a management operating system with weekly rhythm.",
    outcome: "A business that runs without the founder in every room.",
    proof: "The exact system that let three bootstrapped companies run profitably.",
  },
  {
    id: "technology",
    title: "Technology & AI",
    challenge: "AI is a headline in the boardroom and a rumour on the floor.",
    approach: "Start from workflows and economics, not from tools.",
    execution: "AI-assisted operations, automation pilots, and team capability building.",
    outcome: "Compounding productivity — measured, not promised.",
    proof: "AI-first operating systems built and shipped at Noboru World.",
  },
  {
    id: "corporate-training",
    title: "Corporate Training",
    challenge: "Teams need leadership, AI, and modern operating skills — and workshops alone don't stick.",
    approach: "Design capability programs from your workflows, your data, your constraints.",
    execution: "Cohorts anchored to live work: leadership, AI for business teams, transformation, upskilling.",
    outcome: "Measured capability across the whole floor — baseline before, evidence after.",
    proof: "Programs taught by an operator who has run the functions being trained.",
  },
];

export const ADVISORY_PROBLEMS = [
  "Growth has plateaued and every quarter starts from zero",
  "The founder is the bottleneck for every decision",
  "Margins are shrinking while revenue grows",
  "Marketing, sales, and operations pull in different directions",
  "Digital and AI feel urgent but nobody owns them",
  "Teams need modern skills faster than hiring can deliver",
] as const;

export const ADVISORY_PROCESS = [
  {
    step: "01",
    title: "Enquiry & fit",
    copy: "You share where the business is. We tell you honestly whether advisory will move it.",
  },
  {
    step: "02",
    title: "Diagnostic",
    copy: "Two weeks inside your numbers and your rooms before any recommendation exists.",
  },
  {
    step: "03",
    title: "Mandate",
    copy: "One named outcome, one metric, one operating rhythm — agreed before work begins.",
  },
  {
    step: "04",
    title: "Execution",
    copy: "Systems installed with your team, inside your week — capability transfers, dependency doesn't.",
  },
  {
    step: "05",
    title: "Handover",
    copy: "The engagement ends with your team running the system and the metric on the board.",
  },
] as const;

export const ADVISORY_OUTCOMES = [
  "A growth engine that forecasts instead of hopes",
  "Margins defended by pricing and purchasing discipline",
  "An operating cadence the leadership team runs without you",
  "AI and automation working in real workflows",
  "A leadership bench you can actually hand things to",
] as const;

export const ADVISORY_FAQS = [
  {
    q: "How is this different from hiring a consulting firm?",
    a: "Firms deliver recommendations; this engagement delivers installed systems. Anjan works inside your operating rhythm — in the weekly reviews, in the numbers, alongside the team — until the outcome is running without him.",
  },
  {
    q: "What size of business is this for?",
    a: "Founders and SMEs with real revenue, and enterprises with a specific transformation or capability mandate. If a Demo Session or the Live Course is the better starting point for your stage, we'll say so.",
  },
  {
    q: "How long does an engagement run?",
    a: "The diagnostic takes two weeks. Mandates typically run one to two quarters — long enough to install a system, short enough to stay accountable to the metric.",
  },
  {
    q: "Does advisory include corporate training?",
    a: "Yes. Capability programs — leadership, AI for business teams, transformation, upskilling — run as part of an advisory mandate or standalone for organisations.",
  },
  {
    q: "What does it cost?",
    a: "Engagements are scoped to the mandate after the diagnostic. Every engagement names its metric on day one, so the investment is always measured against a stated outcome.",
  },
  {
    q: "What happens after I send the enquiry?",
    a: "A human reply within one working day, and a working conversation about your business — not a pitch about ours.",
  },
] as const;

/* ─────────────────────────────── Courses ──────────────────────────────── */

export const DEMO_SESSION = {
  id: "demo",
  badge: "Start here",
  name: "Demo Session",
  fee: "₹199",
  feeLabel: "Registration Fee",
  schedule: "Every Saturday",
  format: "3 Hours Live",
  promise: "See how profitable businesses are actually built — in one Saturday.",
  description:
    "Not a webinar. A live working session where Anjan walks through the operating playbook on real business models — how ideas are validated, how margins are designed, and where most businesses quietly fail.",
  hours: [
    {
      hour: "Hour 1",
      title: "Discussion & Business Assessment",
      copy: "Where you are, what you're building, and an honest read of the gaps.",
    },
    {
      hour: "Hour 2",
      title: "Practical Learning",
      copy: "The 0 → 1 → Scale framework applied live on real business models.",
    },
    {
      hour: "Hour 3",
      title: "Interactive Q&A",
      copy: "Your questions, your business, answered in the room.",
    },
  ],
  audience: [
    "Students building career capital before the first job",
    "Professionals planning the move from salary to ownership",
    "Founders who want systems instead of firefighting",
    "Business owners modernising a running company",
  ],
  outcomes: [
    "Understand the anatomy of a profitable business",
    "See the validation method before you spend a rupee",
    "Know your exact next step — this month",
  ],
  cta: "Register for Saturday",
} as const;

export const LIVE_COURSE = {
  id: "live",
  badge: "Flagship",
  name: "Live Course",
  altName: "Live Learning Program",
  price: "₹9,000",
  priceNote: "Cohort program · projects, mentorship & community",
  promise: "Build a real business system — not a certificate.",
  description:
    "A structured live program that takes you from idea to operating business: validation, positioning, sales, finance, AI-assisted systems, and the discipline that keeps it all profitable. Taught by an operator who has done it three times.",
  pillars: [
    { title: "Implementation-first", copy: "Every module ends with something built, not something watched." },
    { title: "AI-native", copy: "Modern AI workflows woven through marketing, ops, and finance." },
    { title: "Mentorship", copy: "Direct review of your work — the feedback loop most courses skip." },
    { title: "Community", copy: "A network of builders that outlives the cohort." },
  ],
  outcomes: [
    "A validated business model with real unit economics",
    "A working sales and marketing engine",
    "AI-assisted operating systems you run yourself",
    "A community and mentors invested in your progress",
  ],
  cta: "Apply for the next cohort",
} as const;

/* ───────────────────────────── Knowledge hub ──────────────────────────── */

export const HUB_CATEGORIES = [
  "Start a Business",
  "Business Ideas",
  "Validate Your Idea",
  "Branding & Positioning",
  "Sales & Marketing",
  "AI for Business",
  "Finance & Cash Flow",
  "Team & Leadership",
  "Business Systems",
  "Scaling & Growth",
  "Founder Mindset",
  "Industry Reports",
  "Playbooks & Frameworks",
] as const;

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: (typeof HUB_CATEGORIES)[number];
  readingTime: string;
  featured?: boolean;
  editorsPick?: boolean;
};

/** Representative editorial slate — replace with the real publication feed. */
export const ARTICLES: Article[] = [
  {
    slug: "anatomy-of-a-profitable-business",
    title: "The Anatomy of a Profitable Business",
    dek: "Nine systems every durable business runs on — and the order to build them in.",
    category: "Playbooks & Frameworks",
    readingTime: "12 min",
    featured: true,
  },
  {
    slug: "validate-before-you-build",
    title: "Validate Before You Build",
    dek: "A ₹0 validation method that kills bad ideas in two weeks instead of two years.",
    category: "Validate Your Idea",
    readingTime: "9 min",
    editorsPick: true,
  },
  {
    slug: "ai-operating-system-for-smes",
    title: "An AI Operating System for Small Businesses",
    dek: "Where AI actually pays back in an SME — and the three places it quietly doesn't.",
    category: "AI for Business",
    readingTime: "11 min",
    editorsPick: true,
  },
  {
    slug: "pricing-is-positioning",
    title: "Pricing Is Positioning",
    dek: "Why underpricing is the most expensive branding decision Indian founders make.",
    category: "Branding & Positioning",
    readingTime: "7 min",
  },
  {
    slug: "cash-flow-rhythm",
    title: "The Cash-Flow Rhythm",
    dek: "A weekly 30-minute finance ritual that has saved more businesses than any funding round.",
    category: "Finance & Cash Flow",
    readingTime: "8 min",
    editorsPick: true,
  },
  {
    slug: "first-ten-customers",
    title: "Your First Ten Customers",
    dek: "Sales before marketing: the founder-led motion that de-risks everything after it.",
    category: "Sales & Marketing",
    readingTime: "10 min",
  },
  {
    slug: "hiring-your-first-leader",
    title: "Hiring Your First Real Leader",
    dek: "When to stop hiring hands and start hiring judgement — and how to test for it.",
    category: "Team & Leadership",
    readingTime: "9 min",
  },
  {
    slug: "systems-before-scale",
    title: "Systems Before Scale",
    dek: "The operating checklist to complete before you pour fuel on the fire.",
    category: "Business Systems",
    readingTime: "13 min",
  },
  {
    slug: "founder-mindset-traps",
    title: "Five Founder Mindset Traps",
    dek: "The psychological patterns that cap growth — observed across hundreds of founder conversations.",
    category: "Founder Mindset",
    readingTime: "6 min",
  },
  {
    slug: "business-ideas-2026",
    title: "Where the Opportunities Are: India 2026",
    dek: "Sectors where structural change is outrunning incumbents — a field report.",
    category: "Industry Reports",
    readingTime: "15 min",
  },
  {
    slug: "zero-to-first-lakh",
    title: "Zero to Your First Lakh",
    dek: "A step-by-step path from idea to first revenue, without quitting your job.",
    category: "Start a Business",
    readingTime: "14 min",
  },
  {
    slug: "second-growth-curve",
    title: "Finding the Second Growth Curve",
    dek: "What to do when a working business stops growing — before it starts shrinking.",
    category: "Scaling & Growth",
    readingTime: "10 min",
  },
];

/* ────────────────────────────── Case studies ──────────────────────────── */

export type CaseStudy = {
  slug: string;
  business: string;
  industry: string;
  stage: string;
  service: string;
  headline: string;
  challenge: string;
  strategy: string;
  execution: string[];
  results: { metric: string; label: string }[];
  timeline: string;
  quote: { text: string; name: string; title: string };
  lesson: string;
};

/** Representative transformations — real client stories to be swapped in. */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "meridian-foods",
    business: "Meridian Foods",
    industry: "Consumer / D2C",
    stage: "Growth stage",
    service: "Operations & Systems",
    headline: "From founder-dependent to system-run in one quarter",
    challenge:
      "A profitable D2C food brand where every decision — pricing, purchasing, people — routed through the founder. Growth had stalled at the ceiling of one person's attention.",
    strategy:
      "Install a management operating system: documented processes, a weekly metrics rhythm, and named owners for every revenue and cost line.",
    execution: [
      "Mapped and documented 40+ core processes in six weeks",
      "Built a weekly operating cadence with dashboards the team runs",
      "Promoted two internal leaders into owned P&L mandates",
    ],
    results: [
      { metric: "0", label: "decisions requiring the founder daily, down from ~30" },
      { metric: "+6 pts", label: "gross margin from purchasing and pricing discipline" },
      { metric: "1 qtr", label: "from diagnosis to a self-running operating rhythm" },
    ],
    timeline: "13 weeks",
    quote: {
      text: "The business now runs on systems, not on any single person being available at 11pm.",
      name: "Rhea Malhotra",
      title: "Founder & CEO, Meridian Foods",
    },
    lesson: "Founder freedom is an operations deliverable, not a lifestyle choice.",
  },
  {
    slug: "northwind-logistics",
    business: "Northwind Logistics",
    industry: "B2B Services",
    stage: "Established",
    service: "Revenue Operations",
    headline: "One revenue architecture across three feuding silos",
    challenge:
      "Sales, operations, and service each optimised their own numbers while contract margins quietly eroded. Nobody owned the customer economics end to end.",
    strategy:
      "Unify the revenue engine: one funnel, one data spine, one forecast — with margin accountability attached to every account.",
    execution: [
      "Rebuilt CRM and pipeline stages around customer economics",
      "Instituted a monthly account-margin review with named owners",
      "Repriced the bottom quartile of contracts with a retention playbook",
    ],
    results: [
      { metric: "+9 pts", label: "blended contract margin within two quarters" },
      { metric: "95%", label: "forecast accuracy after the new pipeline discipline" },
      { metric: "2×", label: "expansion revenue from existing accounts" },
    ],
    timeline: "2 quarters",
    quote: {
      text: "He is the rare advisor equally at home in the boardroom and in a process map. Our margins moved because of it.",
      name: "Daniel Okafor",
      title: "Managing Director, Northwind Logistics",
    },
    lesson: "Revenue leaks between departments, not inside them.",
  },
  {
    slug: "aperture-health",
    business: "Aperture Health",
    industry: "Health Tech",
    stage: "Early stage",
    service: "Business Growth",
    headline: "From firefighting to a fundable growth engine",
    challenge:
      "A promising health-tech startup with real users, chaotic execution, and no coherent growth story — six months of runway and an approaching raise.",
    strategy:
      "Sequence ruthlessly: fix retention economics first, then build one repeatable acquisition channel, then package the evidence for investors.",
    execution: [
      "Cut the roadmap to the two features driving retention",
      "Built one channel to predictable CAC before touching a second",
      "Rebuilt the metrics narrative around cohort economics",
    ],
    results: [
      { metric: "3×", label: "improvement in 90-day retention" },
      { metric: "1", label: "acquisition channel at target CAC — then a second" },
      { metric: "Closed", label: "the round, led by an investor citing the metrics discipline" },
    ],
    timeline: "5 months",
    quote: {
      text: "We went from firefighting to forecasting. The clarity made our next funding round almost straightforward.",
      name: "Ananya Verma",
      title: "Co-founder, Aperture Health",
    },
    lesson: "Investors fund evidence of a system, not enthusiasm for a story.",
  },
];

export const CASE_FILTERS = {
  Industry: ["Consumer / D2C", "B2B Services", "Health Tech"],
  Stage: ["Early stage", "Growth stage", "Established"],
  Service: ["Operations & Systems", "Revenue Operations", "Business Growth"],
} as const;

/* ──────────────────────────────── Media ───────────────────────────────── */

export type MediaItem = {
  kind: "Speaking" | "Podcast" | "Guest Lecture" | "Faculty" | "Press" | "Award";
  title: string;
  venue: string;
  year: string;
  note: string;
};

/** Representative appearances — replace with the verified media log. */
export const MEDIA_ITEMS: MediaItem[] = [
  {
    kind: "Speaking",
    title: "Building Profitable Businesses in the AI Decade",
    venue: "Industry growth summits",
    year: "2025",
    note: "Keynotes on operator-led transformation and AI-native business systems.",
  },
  {
    kind: "Podcast",
    title: "The Operator's Playbook",
    venue: "Founder & business podcasts",
    year: "2024–25",
    note: "Long-form conversations on bootstrapping, margins, and systems.",
  },
  {
    kind: "Guest Lecture",
    title: "Entrepreneurship in Practice",
    venue: "IIFT · IMT Ghaziabad · business schools",
    year: "Ongoing",
    note: "Guest sessions on validation, unit economics, and founder discipline.",
  },
  {
    kind: "Faculty",
    title: "Visiting Faculty — Business & Marketing",
    venue: "Management institutes",
    year: "Ongoing",
    note: "Structured teaching engagements with management cohorts.",
  },
  {
    kind: "Press",
    title: "Commentary on SME growth and digital transformation",
    venue: "Business media",
    year: "2023–25",
    note: "Quoted analysis on India's SME economy and AI adoption.",
  },
  {
    kind: "Award",
    title: "Recognition for entrepreneurship & marketing leadership",
    venue: "Industry bodies",
    year: "Various",
    note: "Honours across agency, enterprise, and founder chapters.",
  },
];

/* ───────────────────────────── Testimonials ───────────────────────────── */

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  kind: "Founder" | "Student" | "Enterprise";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Anjan rebuilt our operating model in a quarter. The business now runs on systems, not on any single person being available at 11pm.",
    name: "Rhea Malhotra",
    title: "Founder & CEO, Meridian Foods",
    kind: "Founder",
  },
  {
    quote:
      "He is the rare advisor equally at home in the boardroom and in a process map. Our margins moved because of it.",
    name: "Daniel Okafor",
    title: "Managing Director, Northwind Logistics",
    kind: "Enterprise",
  },
  {
    quote:
      "We went from firefighting to forecasting. The clarity Anjan brought made our next funding round almost straightforward.",
    name: "Ananya Verma",
    title: "Co-founder, Aperture Health",
    kind: "Founder",
  },
  {
    quote:
      "Fifteen years of operating instinct in every conversation. He builds businesses — you feel it in the first meeting.",
    name: "Marcus Feld",
    title: "Partner, Cavalt Capital",
    kind: "Enterprise",
  },
  {
    quote:
      "The Live Course made me build, not watch. I left with a validated model and my first paying customers.",
    name: "Sneha Iyer",
    title: "Live Course alum · D2C founder",
    kind: "Student",
  },
  {
    quote:
      "The best money I've spent on my career. The Demo Session alone reframed how I think about business.",
    name: "Arjun Nair",
    title: "Working professional · Demo Session attendee",
    kind: "Student",
  },
];
