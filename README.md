# Portfolio

A dark, cinematic developer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion for React.
The centrepiece is a draggable project slider that opens into animated, data-driven case studies.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Make it yours

All content lives in `src/data/`. You should not need to touch components for normal edits.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, title, description, email, GitHub, LinkedIn, location (used for SEO and the contact section) |
| `projects.ts` | Every project and case study. Add a project by adding one object |
| `about.ts` | About copy and principles |
| `skills.ts` | Skill groups (remove anything you cannot demonstrate) |
| `experience.ts` | Timeline entries |
| `process.ts` | The five development-process steps |

Anything marked `[Placeholder]` is a stand-in. Replace it before deploying.

### Adding project screenshots

1. Put images in `public/projects/<slug>/` (for example `public/projects/my-app/home.png`).
2. In `projects.ts`, set `image` (the main preview) and `gallery` for that project:

```ts
image: { src: "/projects/my-app/home.png", alt: "Dashboard showing ...", width: 1600, height: 1000 },
gallery: [{ src: "/projects/my-app/detail.png", alt: "...", width: 1600, height: 1000 }],
links: {
  live: { label: "Live demo", href: "https://..." },
  source: { label: "Source code", href: "https://github.com/..." },
},
```

Use real width/height so the page does not shift while loading, and write meaningful `alt` text.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your final domain, e.g. `https://yourname.dev`. Drives canonical URLs, sitemap, social previews and structured data |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Free key from [web3forms.com](https://web3forms.com). Without it the contact form is replaced by a notice and your links |

The Web3Forms key is public by design. It only routes messages to the email you registered.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New > Project**, import the repository, and keep the defaults.
3. Under **Environment Variables** add the two variables above, then deploy.
4. If you add a custom domain later, update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Pre-deploy checklist

- [ ] `src/data/site.ts`: real name, title, description, email, GitHub, LinkedIn
- [ ] `src/data/projects.ts`: real projects, no `[Placeholder]` left (placeholder projects are `noindex` and left out of the sitemap until replaced)
- [ ] `src/data/experience.ts`: real roles, or remove the section's entries you cannot fill
- [ ] `about.ts` and `skills.ts`: read them once and make sure every claim is true
- [ ] Project screenshots added with accurate `alt` text
- [ ] `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_KEY` set in Vercel
- [ ] Send one real test message through the contact form
- [ ] Add a `favicon` by replacing `src/app/favicon.ico` (optional: add `src/app/icon.png`)
- [ ] `npm run lint && npm run typecheck && npm run build` all pass

## SEO after launch

1. Open [Google Search Console](https://search.google.com/search-console) and add your domain.
2. Submit `https://your-domain/sitemap.xml`.
3. Optionally paste your verification token into `verification` in `src/app/layout.tsx`.
4. Check a shared link in a social preview tool to confirm the generated image appears.
5. Link to the portfolio from your GitHub profile, LinkedIn and CV. Inbound links help ranking more than any tag.

What is already built in: unique title and description per page, canonical URLs, Open Graph and Twitter cards with generated images, `robots.txt`, `sitemap.xml`, Person, WebSite, CreativeWork and breadcrumb structured data, one `<h1>` per page, server-rendered content, and each case study on its own URL.

## How it is put together

- `src/app/` routes: `/` (home), `/projects/[slug]` (full case study page), and `@modal/(.)projects/[slug]` (the same case study shown as an overlay when opened from the home page).
- `src/components/projects/ProjectDetail.tsx` renders a case study. It is shared by the page and the overlay, so the two never diverge.
- `src/lib/motion.ts` holds the shared easing and durations. Animation features load lazily through `MotionProvider`.
- Reduced-motion preferences are respected both in CSS and in Motion.

## Known limits

- Tested in Chromium (layout, interactions, accessibility, Lighthouse). Check on a real iPhone and Android phone before sharing widely.
- There is no database. The contact form uses Web3Forms, and all other content is local TypeScript data.
