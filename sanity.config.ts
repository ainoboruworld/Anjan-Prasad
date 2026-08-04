import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

/**
 * Sanity Studio for the AP.com Knowledge Hub.
 *
 * Run locally with `npx sanity dev` after installing the studio deps:
 *   npm i sanity @sanity/vision @sanity/structure
 * and setting SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET.
 *
 * This file is excluded from the Next.js build (see tsconfig "exclude") so
 * the website compiles without the Studio dependencies installed.
 */
export default defineConfig({
  name: "apcom-knowledge-hub",
  title: "AP.com — Knowledge Hub",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
