# Blogs via Sanity CMS

Blogs on the Knowledge Hub are managed in **Sanity**. The website reads them
through `src/lib/sanity.ts`, which fetches live content over Sanity's public
query API when configured and falls back to a local seed slate otherwise — so
the app builds and runs with or without a CMS connected.

## Frontend configuration

Set these in `.env.local` (and your host's env):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

With `NEXT_PUBLIC_SANITY_PROJECT_ID` set, the Blogs page (`/knowledge-hub/blogs`)
and detail pages render live Sanity documents. Newly **published** posts appear
automatically; **scheduled** posts (a future `publishedAt`) stay hidden until
due — the GROQ query filters on `publishedAt <= now()`.

Cover images are served from `cdn.sanity.io`, already allowed in
`next.config.ts` `images.remotePatterns` for optimised `<Image>`.

## The Studio

Studio config and schemas live at the repo root (`sanity.config.ts`,
`sanity/schemas/*`). They are **excluded from the Next build** (see tsconfig
and eslint ignores), so install the Studio deps separately:

```
npm i sanity @sanity/vision @sanity/structure
export SANITY_STUDIO_PROJECT_ID=xxxxxxx
export SANITY_STUDIO_DATASET=production
npx sanity dev        # local studio at http://localhost:3333
npx sanity deploy     # hosted studio
```

## Content model

- **blogPost** — title, slug, short description (excerpt), featured image,
  one or more category references, author reference, reading time, publish
  date (datetime, supports scheduling), featured flag, Portable Text body,
  and an SEO object (meta title/description).
- **category** — the six launch categories (Politics, Spirituality, Marketing,
  Business, Startup, Society); add more with no frontend change.
- **author** — name, role, avatar, bio.
- **seo** — meta title + description.
- **blockContent** — Portable Text body.

Editors can create, edit, delete, upload featured images, select one or
multiple categories, schedule publishing, and add SEO metadata.

## Rich body rendering (optional next step)

The detail page currently renders the excerpt plus a plain-text preview. To
render the full Portable Text `body`, install `@portabletext/react` and swap
the body block in `src/app/knowledge-hub/blogs/[slug]/page.tsx` for a
`<PortableText>` renderer, and add `body` to the projection in
`src/lib/sanity.ts`.
