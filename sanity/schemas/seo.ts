import { defineField, defineType } from "sanity";

/** Reusable SEO metadata object attached to blog posts. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
  ],
});
