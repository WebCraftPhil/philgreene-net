# philgreene.net

Client-acquisition website for Phil Greene's local business growth services. The primary offer is a Local Lead Recovery System that combines conversion-focused pages, lead capture, follow-up, CRM organization, review requests, and reporting.

## Stack

- Vite 5, React 18, and TypeScript
- Wouter client-side routing
- Tailwind CSS 3 plus project-specific CSS design tokens
- Express for local development and self-hosted production serving
- Vercel static deployment plus `api/contact.ts` serverless function
- SendGrid for audit-request email delivery
- Optional Plausible analytics

## Routes

- `/` focused Lead Recovery System landing page
- `/projects` selected technical work organized by capability
- `/contact` lead-loss audit form
- `/privacy-policy`, `/terms`, `/cookie-policy`, `/refund-policy`, `/disclaimer`, `/accessibility`

Legacy URL aliases are preserved in the client router and Express server.

## Local development

```bash
npm ci
npm run dev
```

The Express development server listens on `PORT`, defaulting to `5000`.

## Verification

```bash
npm run lint
npm run check
npm test
npm run test:e2e
npm run build
```

The production client output is written to `dist/public`. The Express bundle is written to `dist/index.js`.

## Audit form configuration

Copy `.env.example` to the environment used by the deployment and configure:

- `SENDGRID_API_KEY`: required for email delivery
- `SENDGRID_FROM_EMAIL`: required and must be a verified SendGrid sender
- `VITE_PLAUSIBLE_DOMAIN`: optional; when present, the client loads Plausible for this domain

Audit requests are sent to `me@philgreene.net`. The form includes browser validation, server-side Zod validation, escaped email output, a honeypot field, explicit success and error states, and a direct email fallback. Missing SendGrid configuration returns an error rather than a false success.

## Analytics events

When Plausible is configured, the site emits:

- `hero_cta_clicked`
- `audit_form_started`
- `audit_form_submitted`
- `pilot_cta_clicked`
- `email_link_clicked`
- `services_viewed`
- `workflow_viewed`

`phone_link_clicked` is defined in the typed event catalog but is not emitted because no public business phone number is configured. Add it only when a verified phone number is available.

## Deployment

`vercel.json` keeps the existing Vercel shape:

- build command: `npm run build`
- static output: `dist/public`
- API function: `/api/contact`
- SPA fallback: all non-API routes rewrite to `/index.html`

For self-hosting, run `npm run build` followed by `npm start` and provide `PORT`, `SENDGRID_API_KEY`, and `SENDGRID_FROM_EMAIL`.

## Design references

The coordinated concept images used for implementation and visual QA live in `docs/design/`.
