import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runWebsiteScan, ScannerRequestError } from '../server/scanner/service.js'

function clientIp(req: VercelRequest) {
  const forwarded = req.headers['x-forwarded-for']
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'Method not allowed' }) }
  try {
    return res.json(await runWebsiteScan(req.body, clientIp(req)))
  } catch (error) {
    const status = error instanceof ScannerRequestError ? error.status : error instanceof Error && 'status' in error ? Number(error.status) || 422 : 500
    const message = error instanceof Error ? error.message : 'The scan could not be completed.'
    return res.status(status).json({ ok: false, error: status >= 500 ? 'The scanner is temporarily unavailable. Please try again.' : message })
  }
}
