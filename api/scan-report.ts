import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ScannerRequestError, unlockWebsiteReport } from '../server/scanner/service.js'

function clientIp(req: VercelRequest) {
  const forwarded = req.headers['x-forwarded-for']
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Method not allowed' }) }
  try {
    return res.json(await unlockWebsiteReport(req.body, clientIp(req)))
  } catch (error) {
    const status = error instanceof ScannerRequestError ? error.status : 500
    const message = error instanceof ScannerRequestError ? error.message : 'The report could not be opened.'
    return res.status(status).json({ ok: false, error: message })
  }
}
