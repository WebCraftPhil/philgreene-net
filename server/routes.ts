import type { Express } from 'express'
import { createServer, type Server } from 'http'
import { auditRequestSchema, createAuditEmail } from '../shared/contact'
import { sendEmail } from './email'
import { runWebsiteScan, unlockWebsiteReport } from './scanner/service'

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/scan', async (req, res) => {
    try {
      return res.json(await runWebsiteScan(req.body, req.ip))
    } catch (error) {
      const status = error instanceof Error && 'status' in error ? Number(error.status) || 422 : 422
      return res.status(status).json({ ok: false, error: error instanceof Error ? error.message : 'The scan could not be completed.' })
    }
  })

  app.post('/api/scan-report', async (req, res) => {
    try {
      return res.json(await unlockWebsiteReport(req.body))
    } catch (error) {
      return res.status(422).json({ ok: false, error: error instanceof Error ? error.message : 'The report could not be opened.' })
    }
  })

  app.post('/api/contact', async (req, res) => {
    if (typeof req.body?.companyWebsite === 'string' && req.body.companyWebsite.length > 0) {
      return res.json({ ok: true })
    }

    const parsed = auditRequestSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: parsed.error.issues[0]?.message ?? 'Please check the form and try again',
      })
    }

    const email = createAuditEmail(parsed.data)
    const sent = await sendEmail({
      to: 'me@philgreene.net',
      from: process.env.MAILTRAP_FROM_EMAIL ?? '',
      replyTo: parsed.data.email,
      ...email,
    })

    if (!sent) {
      return res.status(503).json({
        ok: false,
        error: 'Email delivery is not configured right now.',
      })
    }

    return res.json({ ok: true })
  })

  return createServer(app)
}
