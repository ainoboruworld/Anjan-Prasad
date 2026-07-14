/**
 * Central content layer for AP.com.
 * Keeping copy and lists here keeps pages declarative and easy to retune.
 */

export type NavChild = { label: string; href: string; description: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "Courses",
    href: "/courses",
    children: [
      {
        label: "Demo Session",
        href: "/courses#demo",
        description: "A working introduction to the operating playbook.",
      },
      {
        label: "Premium Course",
        href: "/courses#premium",
        description: "Executive education for founders who mean to scale.",
      },
    ],
  },
  { label: "Business Advisory", href: "/business-advisory" },
  { label: "Counselling", href: "/counselling" },
  {
    label: "Resources",
    href: "/resources/blogs",
    children: [
      {
        label: "Blogs",
        href: "/resources/blogs",
        description: "Field notes on building profitable businesses.",
      },
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        description: "How real businesses were rebuilt to grow.",
      },
      {
        label: "Featured Media",
        href: "/resources/featured-media",
        description: "Talks, interviews, podcasts, and press.",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

export const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years building businesses" },
  { value: 3, suffix: "", label: "Profitable companies founded" },
  { value: 23, suffix: "+", label: "Global brands advised" },
  { value: 10, suffix: "X", label: "Business growth delivered" },
  { value: 500, prefix: "$", suffix: "M+", label: "Enterprise value influenced" },
  { value: 5, suffix: "", label: "Fortune 500 engagements" },
];

export type Company = {
  name: string;
  role: string;
  description: string;
  impact: string;
};

export const COMPANIES: Company[] = [
  {
    name: "Noboru World",
    role: "Founder & CEO",
    description:
      "A modern brand-and-growth company building marketing products and operating systems for ambitious businesses.",
    impact: "Bootstrapped to profitability with an enterprise product line.",
  },
  {
    name: "Lushful",
    role: "Founder",
    description:
      "A consumer brand engineered around retention, unit economics, and a repeatable growth engine.",
    impact: "Built a category position with sustainable, profitable margins.",
  },
  {
    name: "Filing Buddy",
    role: "Co-Founder",
    description:
      "A compliance and finance-operations platform simplifying the back office for founders and SMEs.",
    impact: "Scaled a recurring-revenue base across thousands of businesses.",
  },
];

/** Brands worked with — logo wall. */
export const BRANDS: string[] = [
  "Google",
  "Motorola",
  "Dabur",
  "Sony",
  "Tommy Hilfiger",
  "Pizza Hut",
  "KFC",
  "Snapdeal",
  "American Express",
  "NIIT",
  "Neustar",
  "Black & Decker",
  "DLF",
  "Tata Housing",
  "CheapOair",
  "Safilo",
  "Cairn India",
  "PwC",
  "OneTravel",
  "Digit General Insurance",
  "Akounto",
  "Urban Kisaan",
  "Aditya Birla Capital",
];

/** Previous employers — career experience. */
export const CAREER: string[] = [
  "Mindshare (GroupM)",
  "IPG Mediabrands",
  "Accenture",
  "Zeta Global",
  "Fareportal",
];

export type Expertise = {
  title: string;
  description: string;
};

export const EXPERTISE: Expertise[] = [
  {
    title: "Business Advisory",
    description:
      "Board-level counsel on strategy, capital, and the decisions that define a company's trajectory.",
  },
  {
    title: "Business Operations",
    description:
      "Operating systems, cadence, and controls that let a business run without the founder in every room.",
  },
  {
    title: "Startup Strategy",
    description:
      "From first principles to product-market fit and a defensible, repeatable growth model.",
  },
  {
    title: "Finance Consulting",
    description:
      "Unit economics, margin architecture, and the financial discipline behind durable profitability.",
  },
  {
    title: "HR Consulting",
    description:
      "Org design and talent systems that scale culture and performance together.",
  },
  {
    title: "Brand Strategy",
    description:
      "Positioning and narrative that command premium and compound over time.",
  },
  {
    title: "Growth Consulting",
    description:
      "Channel strategy and experimentation engineered for sustainable, profitable growth.",
  },
  {
    title: "Team Building",
    description:
      "Building leadership benches and high-trust teams that execute at pace.",
  },
];

export type Testimonial = { quote: string; name: string; title: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Anjan rebuilt our operating model in a quarter. The business now runs on systems, not on any single person being available at 11pm.",
    name: "Rhea Malhotra",
    title: "Founder & CEO, Meridian Foods",
  },
  {
    quote:
      "He is the rare advisor equally at home in the boardroom and in a process map. Our margins moved because of it.",
    name: "Daniel Okafor",
    title: "Managing Director, Northwind Logistics",
  },
  {
    quote:
      "We went from firefighting to forecasting. The clarity Anjan brought made our next funding round almost straightforward.",
    name: "Ananya Verma",
    title: "Co-founder, Aperture Health",
  },
  {
    quote:
      "Fifteen years of operating instinct in every conversation. He builds businesses — you feel it in the first meeting.",
    name: "Marcus Feld",
    title: "Partner, Cavalt Capital",
  },
];

export const APPLY_ADVISORY_URL = "https://forms.gle/placeholder-advisory";
export const BOOK_COUNSELLING_URL = "https://forms.gle/placeholder-counselling";
