import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'
import type { WebsiteScanReport } from '../../shared/scanner'

const TOKEN_LIFETIME_MS = 30 * 60 * 1000

function tokenKey() {
  const secret = process.env.SCAN_REPORT_SECRET
  if (!secret || secret.length < 32) throw new Error('The scanner report secret is not configured.')
  return createHash('sha256').update(secret).digest()
}

export function encryptReport(report: WebsiteScanReport) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', tokenKey(), iv)
  const payload = Buffer.from(JSON.stringify({ report, expiresAt: Date.now() + TOKEN_LIFETIME_MS }))
  const encrypted = Buffer.concat([cipher.update(payload), cipher.final()])
  return [iv, cipher.getAuthTag(), encrypted].map((part) => part.toString('base64url')).join('.')
}

export function decryptReport(token: string): WebsiteScanReport {
  try {
    const [ivPart, tagPart, dataPart, extra] = token.split('.')
    if (!ivPart || !tagPart || !dataPart || extra) throw new Error('invalid')
    const decipher = createDecipheriv('aes-256-gcm', tokenKey(), Buffer.from(ivPart, 'base64url'))
    decipher.setAuthTag(Buffer.from(tagPart, 'base64url'))
    const decoded = JSON.parse(Buffer.concat([
      decipher.update(Buffer.from(dataPart, 'base64url')),
      decipher.final(),
    ]).toString('utf8')) as { report?: WebsiteScanReport; expiresAt?: number }
    if (!decoded.report || !decoded.expiresAt || decoded.expiresAt < Date.now()) throw new Error('expired')
    return decoded.report
  } catch {
    throw new Error('This report link has expired. Run a fresh scan to continue.')
  }
}
