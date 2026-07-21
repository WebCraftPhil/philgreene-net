import dns from 'node:dns/promises'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'
import type { LookupAddress } from 'node:dns'

const MAX_BYTES = 2 * 1024 * 1024
const MAX_REDIRECTS = 3
const TIMEOUT_MS = 8_000

export class SafeFetchError extends Error {
  constructor(message: string, public status = 422) {
    super(message)
  }
}

export function normalizeWebsiteUrl(input: string) {
  const value = input.trim()
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  let url: URL
  try {
    url = new URL(withProtocol)
  } catch {
    throw new SafeFetchError('Enter a valid website address, such as yourbusiness.com.')
  }
  url.hash = ''
  return url
}

function ipv4ToNumber(address: string) {
  return address.split('.').reduce((value, part) => (value << 8) + Number(part), 0) >>> 0
}

function inIpv4Range(address: string, base: string, prefix: number) {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  return (ipv4ToNumber(address) & mask) === (ipv4ToNumber(base) & mask)
}

export function isPublicIp(address: string) {
  const family = net.isIP(address)
  if (family === 4) {
    const blocked: Array<[string, number]> = [
      ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
      ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24],
      ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24],
      ['224.0.0.0', 4], ['240.0.0.0', 4],
    ]
    return !blocked.some(([base, prefix]) => inIpv4Range(address, base, prefix))
  }
  if (family === 6) {
    const compact = address.toLowerCase()
    return !(
      compact === '::' || compact === '::1' || compact.startsWith('fc') || compact.startsWith('fd') ||
      compact.startsWith('fe8') || compact.startsWith('fe9') || compact.startsWith('fea') || compact.startsWith('feb') ||
      compact.startsWith('ff') || compact.startsWith('2001:db8:') || compact.startsWith('::ffff:')
    )
  }
  return false
}

async function resolvePublicTarget(url: URL) {
  if (!['http:', 'https:'].includes(url.protocol)) throw new SafeFetchError('Only http and https websites can be scanned.')
  if (url.username || url.password) throw new SafeFetchError('Website addresses cannot include a username or password.')
  if (url.port && !['80', '443'].includes(url.port)) throw new SafeFetchError('That website uses a port the scanner cannot access.')
  const hostname = url.hostname.toLowerCase().replace(/\.$/, '')
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || net.isIP(hostname)) {
    throw new SafeFetchError('Private network and direct IP addresses cannot be scanned.')
  }
  let addresses: LookupAddress[]
  try {
    addresses = await dns.lookup(hostname, { all: true, verbatim: true })
  } catch {
    throw new SafeFetchError('That website could not be found. Check the address and try again.')
  }
  const approved = addresses.filter(({ address }) => isPublicIp(address))
  if (!approved.length || approved.length !== addresses.length) {
    throw new SafeFetchError('Private or reserved network addresses cannot be scanned.')
  }
  return approved[0]
}

function requestHtml(url: URL, target: LookupAddress): Promise<{ status: number; headers: http.IncomingHttpHeaders; body: string }> {
  return new Promise((resolve, reject) => {
    const transport = url.protocol === 'https:' ? https : http
    const request = transport.request(url, {
      method: 'GET',
      headers: {
        'user-agent': 'PhilGreene-WebsiteCheckup/1.0 (+https://philgreene.net/website-checkup)',
        accept: 'text/html,application/xhtml+xml;q=0.9',
        'accept-encoding': 'identity',
      },
      lookup: (_hostname, options, callback) => {
        if (typeof options === 'object' && options.all) {
          callback(null, [target])
          return
        }
        callback(null, target.address, target.family)
      },
      servername: url.hostname,
    }, (response) => {
      const chunks: Buffer[] = []
      let bytes = 0
      response.on('data', (chunk: Buffer) => {
        bytes += chunk.length
        if (bytes > MAX_BYTES) {
          request.destroy(new SafeFetchError('This page is too large for the quick scan.'))
          return
        }
        chunks.push(chunk)
      })
      response.on('end', () => resolve({
        status: response.statusCode ?? 0,
        headers: response.headers,
        body: Buffer.concat(chunks).toString('utf8'),
      }))
    })
    request.setTimeout(TIMEOUT_MS, () => request.destroy(new SafeFetchError('The website took too long to respond. Please try again.')))
    request.on('error', (error) => reject(error instanceof SafeFetchError ? error : new SafeFetchError('The website did not return a readable page.')))
    request.end()
  })
}

export async function safeFetchHtml(input: string) {
  const startedAt = Date.now()
  let url = normalizeWebsiteUrl(input)
  const requestedUrl = url.toString()

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    const target = await resolvePublicTarget(url)
    const response = await requestHtml(url, target)
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.location
      if (!location || redirect === MAX_REDIRECTS) throw new SafeFetchError('The website redirected too many times.')
      url = new URL(location, url)
      continue
    }
    if (response.status < 200 || response.status >= 400) {
      throw new SafeFetchError(`The website returned an error (${response.status}).`)
    }
    const contentType = String(response.headers['content-type'] ?? '').toLowerCase()
    if (!contentType.includes('text/html') && !contentType.includes('application/xhtml+xml')) {
      throw new SafeFetchError('That address did not return a web page the scanner can read.')
    }
    return { requestedUrl, finalUrl: url.toString(), html: response.body, loadTimeMs: Date.now() - startedAt }
  }
  throw new SafeFetchError('The website redirected too many times.')
}
