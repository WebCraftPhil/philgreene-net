# philgreene.net

Client-acquisition website for Phil Greene's local business growth services. The primary offer is a Local Lead Recovery System that combines conversion-focused pages, lead capture, follow-up, CRM organization, review requests, and reporting.

## Stack

- Vite 5, React 18, and TypeScript
- Wouter client-side routing
- Tailwind CSS 3 plus project-specific CSS design tokens
- Express for local development and self-hosted production serving
- Vercel static deployment plus TypeScript serverless functions in `api/`
- Mailtrap for audit-request email delivery
- Cloudflare Turnstile for website-scanner abuse protection
- Optional Plausible analytics

## Routes

- `/` focused Lead Recovery System landing page
- `/projects` selected technical work organized by capability
- `/website-checkup` automated local-service website lead checkup
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

## Forms and website-checkup configuration

Copy `.env.example` to the environment used by the deployment and configure:

- `MAILTRAP_API_KEY`: required for production email delivery
- `MAILTRAP_FROM_EMAIL`: required and must use a verified Mailtrap sending domain
- `VITE_TURNSTILE_SITE_KEY`: public key for a managed Turnstile widget allowing `philgreene.net` and `www.philgreene.net`
- `TURNSTILE_SECRET_KEY`: matching private Turnstile secret, used only by server functions
- `SCAN_REPORT_SECRET`: random value of at least 32 characters used to encrypt 30-minute report tokens
- `VITE_PLAUSIBLE_DOMAIN`: optional; when present, the client loads Plausible for this domain

Audit requests are sent to `me@philgreene.net`. The form includes browser validation, server-side Zod validation, escaped email output, a honeypot field, explicit success and error states, and a direct email fallback. Missing Mailtrap configuration returns an error rather than a false success.

The website checkup fetches one public homepage with an 8-second timeout and 2 MB response limit. It blocks credentials, IP literals, private/reserved addresses, unusual ports, unsafe DNS results, and unsafe redirects. The free preview is returned immediately; the complete report is held in a short-lived encrypted token rather than stored in a database. Client-rendered application shells are labeled as limited scans and are not given a misleading conversion score.

## Analytics events

When Plausible is configured, the site emits:

- `hero_cta_clicked`
- `audit_form_started`
- `audit_form_submitted`
- `pilot_cta_clicked`
- `email_link_clicked`
- `services_viewed`
- `workflow_viewed`
- `scanner_opened`
- `scan_started`, `scan_succeeded`, `scan_failed`
- `report_gate_started`, `report_requested`, `full_report_viewed`
- `scanner_audit_clicked`, `no_website_selected`

`phone_link_clicked` is defined in the typed event catalog but is not emitted because no public business phone number is configured. Add it only when a verified phone number is available.

## Deployment

`vercel.json` keeps the existing Vercel shape:

- build command: `npm run build`
- static output: `dist/public`
- API functions: `/api/contact`, `/api/scan`, and `/api/scan-report`
- SPA fallback: all non-API routes rewrite to `/index.html`

For self-hosting, run `npm run build` followed by `npm start` and provide the same server-side variables. Local development automatically uses Cloudflare's official passing test keys when production Turnstile keys are absent, but production never falls back to test credentials.

## Design references

The coordinated concept images used for implementation and visual QA live in `docs/design/`.
