# philgreene-net

Personal portfolio site for Phil Greene — data analyst and full‑stack developer. Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4. It showcases projects, a blog, an about page, and a contact form with polished UI and subtle motion effects.

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript + ESLint (Flat config via `eslint.config.mjs`)
- Tailwind CSS v4 (design tokens via CSS variables in `app/globals.css`)
- Framer Motion (hero animations)
- shadcn/ui configuration scaffold (`components.json`), not actively used for components

## Features

- Portfolio pages: `Home`, `Projects`, `Blog`, `About`, `Contact`
- Animated hero with Framer Motion and gradient visuals
- Projects grid backed by typed data models and helpers
- Consistent design system using CSS variables and Tailwind utilities
- Basic SEO metadata via `export const metadata`
- Responsive layout with sticky header and mobile nav

## Project Structure

- `philgreene-net-fresh/app/layout.tsx`: Root layout, global metadata, header injection
- `philgreene-net-fresh/app/globals.css`: Tailwind v4 setup, CSS variables, utilities, components
- `philgreene-net-fresh/app/page.tsx`: Home page (Hero + Featured Projects + Services + CTA)
- `philgreene-net-fresh/app/projects/page.tsx`: Projects listing (grid + category counts)
- `philgreene-net-fresh/app/blog/page.tsx`: Blog listing (static sample posts)
- `philgreene-net-fresh/app/about/page.tsx`: About/skills/resume download card
- `philgreene-net-fresh/app/contact/page.tsx`: Client‑side contact form (no backend yet)
- `philgreene-net-fresh/components/Header.tsx`: Sticky responsive nav
- `philgreene-net-fresh/components/HeroSection.tsx`: Animated hero section
- `philgreene-net-fresh/components/ProjectCard.tsx`: Card used in project grids
- `philgreene-net-fresh/lib/projects.ts`: Project data + helpers (e.g., `getFeaturedProjects`)
- `philgreene-net-fresh/types/projects.ts`: Type definitions for projects/case studies/blog posts
- `philgreene-net-fresh/next.config.ts`: Next.js config (defaults)
- `philgreene-net-fresh/package.json`: Scripts and dependencies

Note: The repository root also contains an `app/` and `components/` directory separate from `philgreene-net-fresh/`. This README documents the app under `philgreene-net-fresh/`.

## Getting Started

Prerequisites:

- Node.js 18.18+ (or 20+ recommended)
- npm (repo includes `package-lock.json`)

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
# ➜ http://localhost:3000
```

Build and start:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## Configuration

- Environment variables: none required for local development.
- Tailwind: Tailwind v4 is imported in `app/globals.css` with a custom design token system (CSS variables for colors, radii, shadows, etc.). Dark mode uses the `.dark` variant (`@custom-variant dark`).
- ESLint: Flat config extends `next/core-web-vitals` and `next/typescript`.

## Content & Data

- Projects are defined in `philgreene-net-fresh/lib/projects.ts#L1` using the `Project` and `CaseStudy` types from `philgreene-net-fresh/types/projects.ts#L1`.
- `getFeaturedProjects()` filters featured items for the home page; `projects` is used for the projects grid.
- Screenshots referenced under `/projects/*.svg` assume assets exist in `public/projects/`. Add files there or update paths.

### Adding a Project

1) Add a new object to `projects` in `philgreene-net-fresh/lib/projects.ts#L1`.
2) Provide a unique `id` and `slug`, `title`, `description`, `role`, `stack`, `outcomes`, `category`, `featured`, and `screenshot` path.
3) Optionally add a case study entry in `caseStudies` if you want deeper details.

## Pages Overview

- `Home` (`philgreene-net-fresh/app/page.tsx`): hero with typed typing effect, featured projects, services, and CTA.
- `Projects` (`philgreene-net-fresh/app/projects/page.tsx`): projects grid and category cards.
- `Blog` (`philgreene-net-fresh/app/blog/page.tsx`): static list of draft posts/categories for structure.
- `About` (`philgreene-net-fresh/app/about/page.tsx`): skills matrices and resume download CTA (`/resume-phil-greene.pdf`).
- `Contact` (`philgreene-net-fresh/app/contact/page.tsx`): client‑only form with simulated submission (console log); wire up to an API route to make it functional.

## Deployment

Recommended: Vercel

- Framework preset: Next.js
- Build command: `next build` (uses Turbopack flag in package script)
- Install command: `npm install`
- Output: `.next` (default)

No special `next.config.ts` options are required for a basic deployment.

## Scripts

- `dev`: `next dev --turbopack`
- `build`: `next build --turbopack`
- `start`: `next start`
- `lint`: `eslint`

## Roadmap / Todos

- Implement `/api/contact` (or external email service) and connect the contact form
- Add case study routes (`/projects/[slug]`) using data from `caseStudies`
- Replace static blog placeholder with content source (MDX, CMS, or file‑based)
- Add missing images to `public/projects/` (or update references)
- Consider enabling TypeScript strict mode for tighter type safety
- Add tests for data utilities and basic rendering checks

## License

MIT — see `philgreene-net-fresh/LICENSE`.
