import type { Express } from 'express'
import { createServer, type Server } from 'http'
import { auditRequestSchema, createAuditEmail } from '../shared/contact'
import { sendEmail } from './sendgrid'

export async function registerRoutes(app: Express): Promise<Server> {
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
      from: process.env.SENDGRID_FROM_EMAIL ?? '',
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
