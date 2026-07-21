const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TEST_SECRET = '1x0000000000000000000000000000000AA'

type SiteverifyResponse = {
  success: boolean
  hostname?: string
  action?: string
  'error-codes'?: string[]
}

export async function verifyTurnstile(token: string, remoteIp?: string) {
  const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_ENV === 'production')
  const secret = process.env.TURNSTILE_SECRET_KEY || (!isProduction ? TEST_SECRET : '')
  if (!secret) throw new Error('Website verification is not configured.')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8_000)
  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, response: token, ...(remoteIp ? { remoteip: remoteIp } : {}) }),
      signal: controller.signal,
    })
    const result = await response.json() as SiteverifyResponse
    if (!result.success) throw new Error('Website verification failed. Refresh the check and try again.')
    if (result.action && result.action !== 'website_scan') throw new Error('Website verification did not match this request.')
    if (isProduction && result.hostname && !['philgreene.net', 'www.philgreene.net'].includes(result.hostname)) {
      throw new Error('Website verification came from an unexpected host.')
    }
    return true
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('Website verification timed out. Please try again.')
    throw error
  } finally {
    clearTimeout(timeout)
  }
}
