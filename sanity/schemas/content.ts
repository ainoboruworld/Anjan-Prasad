import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Content model for the whole marketing site. Singletons (siteSettings,
 * seoSettings, homePage, aboutPage, navbar, footer) hold one document each;
 * servicePage/testimonial/faq/caseStudy/featuredMedia/clientLogo are
 * collections. Reusable objects (stat, ctaButton, imageWithAlt, socialLink,
 * navLink) keep field shapes consistent.
 *
 * The website reads these via src/lib/sanity.ts and falls back to the built-in
 * content when a document doesn't exist yet — so the UI never breaks.
 */

/* ── Reusable objects ─────────────────────────────────────────────────── */

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
});

export const ctaButton = defineType({
  name: "ctaButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "variant",
      type: "string",
      options: { list: ["primary", "ghost"] },
      initialValue: "primary",
    }),
  ],
});

export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", description: "e.g. 16+, 250+, Fortune 500" }),
    defineField({ name: "label", type: "string" }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "href", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "href" } },
});

export const navLink = defineType({
  name: "navLink",
  title: "Nav link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({ name: "href", type: "string" }),
    defineField({ name: "description", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

const seoObjectFields = [
  defineField({ name: "title", type: "string" }),
  defineField({ name: "description", type: "text", rows: 3 }),
  defineField({ name: "ogImage", title: "Social share image", type: "image" }),
];

/* ── SEO / site settings singletons ───────────────────────────────────── */

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO (global defaults)",
  type: "document",
  fields: [
    ...seoObjectFields,
    defineField({ name: "keywords", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "favicon", type: "image" }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", initialValue: "Anjan Prasad" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "logo", title: "Navbar logo", type: "image" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({ name: "officeLocation", type: "string" }),
    defineField({ name: "copyright", type: "string" }),
    defineField({ name: "socials", type: "array", of: [{ type: "socialLink" }] }),
  ],
});

/* ── Navbar & footer singletons ───────────────────────────────────────── */

export const navbar = defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
            defineField({ name: "children", type: "array", of: [{ type: "navLink" }] }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
});

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "links", type: "array", of: [{ type: "navLink" }] }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
  ],
});

/* ── Page singletons ──────────────────────────────────────────────────── */

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heroHeadline", type: "string", description: "Main headline text." }),
    defineField({ name: "heroHeadlineAccent", type: "string", description: "Trailing phrase shown in the accent colour." }),
    defineField({ name: "heroSubhead", type: "text", rows: 3 }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "primaryCta", type: "ctaButton" }),
    defineField({ name: "secondaryCta", type: "ctaButton" }),
    defineField({ name: "trustIndicators", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "stats", title: "Trust & Experience stats", type: "array", of: [{ type: "stat" }] }),
    defineField({ name: "seo", type: "object", fields: seoObjectFields }),
  ],
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "titleAccent", type: "string", description: "Trailing phrase in the accent colour." }),
    defineField({ name: "lead", type: "text", rows: 3 }),
    defineField({ name: "story", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "arc", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "expertise", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "stats", type: "array", of: [{ type: "stat" }] }),
    defineField({ name: "portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "seo", type: "object", fields: seoObjectFields }),
  ],
});

export const servicePage = defineType({
  name: "servicePage",
  title: "Service page",
  type: "document",
  description: "Business Advisory, Demo Session, Monthly Advisory, Consultation.",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubhead", type: "text", rows: 3 }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "primaryCta", type: "ctaButton" }),
    defineField({ name: "stats", type: "array", of: [{ type: "stat" }] }),
    defineField({ name: "seo", type: "object", fields: seoObjectFields }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

/* ── Collections ──────────────────────────────────────────────────────── */

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Role / company", type: "string" }),
    defineField({
      name: "kind",
      type: "string",
      options: { list: ["Founder", "Student", "Enterprise"] },
    }),
    defineField({
      name: "categories",
      description: "Which pages this testimonial appears on.",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["Business Advisory", "Consultation", "Courses"] },
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "title" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "page",
      description: "Which page this FAQ belongs to.",
      type: "string",
      options: { list: ["Business Advisory", "Consultation", "Home", "General"] },
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "page" } },
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "sector", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "problem", type: "text", rows: 3 }),
    defineField({ name: "approach", type: "text", rows: 3 }),
    defineField({ name: "result", type: "text", rows: 3 }),
    defineField({ name: "metrics", type: "array", of: [{ type: "stat" }] }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "client" } },
});

export const featuredMedia = defineType({
  name: "featuredMedia",
  title: "Featured media",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "outlet", type: "string" }),
    defineField({ name: "type", type: "string", options: { list: ["Video", "Article", "Podcast", "Talk"] } }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "outlet" } },
});

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Brand / client logo",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "group",
      description: "Which wall this logo belongs to.",
      type: "string",
      options: {
        list: [
          "Ventures Built",
          "Companies Advised",
          "Career Experience",
          "Startups Mentored",
        ],
      },
    }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "group" } },
});

export const contentSchemaTypes = [
  // objects
  imageWithAlt,
  ctaButton,
  stat,
  socialLink,
  navLink,
  // singletons
  siteSettings,
  seoSettings,
  navbar,
  footer,
  homePage,
  aboutPage,
  servicePage,
  // collections
  testimonial,
  faq,
  caseStudy,
  featuredMedia,
  clientLogo,
];
