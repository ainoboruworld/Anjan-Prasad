import { defineField, defineType } from "sanity";

/**
 * Blog post — the CMS document editors manage.
 *
 * Supports: featured image, one or more categories, scheduled publishing
 * (publishedAt in the future hides the post until due), author reference,
 * reading time, SEO metadata, and a featured flag for the front-page spread.
 * The website reads these fields via the projection in src/lib/sanity.ts.
 */
export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTimeMins",
      title: "Reading time (minutes)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      description:
        "Set in the future to schedule — the post stays hidden until this time.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Publish date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "publishedAt" },
    prepare: ({ title, media, date }) => ({
      title,
      media,
      subtitle: date ? new Date(date).toLocaleDateString() : "Unscheduled",
    }),
  },
});
