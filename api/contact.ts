import type { VercelRequest, VercelResponse } from '@vercel/node'
import { auditRequestSchema, createAuditEmail } from '../shared/contact'
import { sendEmail } from '../server/email'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

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
}
