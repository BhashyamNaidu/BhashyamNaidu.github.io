# Bhashyam Naidu — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. Fully static (SSG).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build
```

## Live site — GitHub Pages

Every push to `main` builds a static export (`STATIC_EXPORT=1` → `out/`) and deploys it via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) to **https://bhashyamnaidu.github.io**.

## Alternative: deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → Import** the repository. The framework (Next.js), build
   command and output are detected automatically — no `vercel.json` is needed.
3. Optional: if you add a custom domain, set the environment variable
   `NEXT_PUBLIC_SITE_URL=https://your-domain` (Production) and redeploy. Without it, the
   canonical URL, sitemap and Open Graph tags use Vercel's production domain automatically.

Node.js ≥ 20.9 is required (`engines` in `package.json`).

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts). Every value marked **`MISSING`** is
`null` and is **hidden on the page** until you fill it in — nothing is invented.

| Missing item | Field in `lib/content.ts` |
| --- | --- |
| Resume | add `public/resume.pdf`, then set `links.resume = "/resume.pdf"` |
| Mbanq internship dates | `timeline[0].period` |

Project descriptions, features, diagrams and design decisions were checked against the
public repositories (`InsightQuery`, `CloudOrderEngine`, `shopeasy`) and their READMEs.

Architecture diagrams are data-driven (`project.diagram` nodes/edges), rendered by
[`components/diagrams/ArchitectureDiagram.tsx`](components/diagrams/ArchitectureDiagram.tsx),
and labelled on the page as conceptual/illustrative.

## Structure

```
app/            layout (fonts, SEO, JSON-LD), page, globals.css, robots, sitemap, icon, OG image
components/     Nav, Hero, RequestTrace, About, Projects, ProjectCard, Skills, Experience, Contact, Footer
components/ui/  Button, Tag, Icons, Reveal, SectionHeading
components/diagrams/ArchitectureDiagram.tsx
lib/content.ts  all portfolio content
```
