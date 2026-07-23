import { analyzeWebsite } from './analyze.js'
import { decryptReport, encryptReport } from './report-token.js'
import { safeFetchHtml } from './safe-fetch.js'
import { verifyTurnstile } from './turnstile.js'
import { reportRequestSchema, scanRequestSchema } from '../../shared/scanner.js'
import { createOwnerLeadEmail, createVisitorReportEmail } from './emails.js'
import { sendEmail } from '../email.js'

export async function runWebsiteScan(body: unknown, remoteIp?: string) {
  const parsed = scanRequestSchema.safeParse(body)
  if (!parsed.success) throw new ScannerRequestError(parsed.error.issues[0]?.message ?? 'Check the website address and try again.', 400)
  await verifyTurnstile(parsed.data.turnstileToken, remoteIp)
  const fetched = await safeFetchHtml(parsed.data.url)
  const report = analyzeWebsite({ requestedUrl: fetched.requestedUrl, finalUrl: fetched.finalUrl, html: fetched.html, loadTimeMs: fetched.loadTimeMs })
  return {
    ok: true as const,
    reportToken: encryptReport(report),
    preview: { requestedUrl: report.requestedUrl, scannedUrl: report.scannedUrl, scannedAt: report.scannedAt, score: report.score, topFindings: report.topFindings, caveats: report.caveats },
  }
}

export async function unlockWebsiteReport(body: unknown, remoteIp?: string) {
  const parsed = reportRequestSchema.safeParse(body)
  if (!parsed.success) throw new ScannerRequestError(parsed.error.issues[0]?.message ?? 'Check your details and try again.', 400)
  if (parsed.data.companyWebsite) return { ok: true as const, report: decryptReport(parsed.data.reportToken), emailSent: true }
  await verifyTurnstile(parsed.data.turnstileToken, remoteIp, 'report_unlock')
  const report = decryptReport(parsed.data.reportToken)
  const from = process.env.MAILTRAP_FROM_EMAIL ?? ''
  const visitorEmail = createVisitorReportEmail(report, parsed.data.name)
  const ownerEmail = createOwnerLeadEmail(report, parsed.data)
  const [visitorSent] = await Promise.all([
    sendEmail({ to: parsed.data.email, from, replyTo: 'me@philgreene.net', ...visitorEmail, category: 'website-checkup' }),
    sendEmail({ to: 'me@philgreene.net', from, replyTo: parsed.data.email, ...ownerEmail, category: 'scanner-lead' }),
  ])
  return { ok: true as const, report, emailSent: visitorSent }
}

export class ScannerRequestError extends Error {
  constructor(message: string, public status = 422) { super(message) }
}
