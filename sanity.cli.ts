import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

/** Sanity CLI config — enables `npx sanity dev` and `npx sanity deploy`. */
export default defineCliConfig({ api: { projectId, dataset } });
