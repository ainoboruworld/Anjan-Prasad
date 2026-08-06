import { blogPost } from "./blogPost";
import { author } from "./author";
import { category } from "./category";
import { seo } from "./seo";
import { blockContent } from "./blockContent";
import { contentSchemaTypes } from "./content";

export const schemaTypes = [
  blogPost,
  author,
  category,
  seo,
  blockContent,
  ...contentSchemaTypes,
];
