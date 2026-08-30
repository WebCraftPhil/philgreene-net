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

function extractIpv4FromIpv6(address: string): string | null {
  const normalized = address.toLowerCase()

  // Handle NAT64 prefix: 64:ff9b::/96 (RFC 6052)
  // The NAT64 prefix is 64:ff9b::/96, meaning first 96 bits are 0x64ff9b00000000000000
  // The remaining 32 bits encode an IPv4 address
  // Match addresses like 64:ff9b::192.0.2.1 (dotted-decimal) or 64:ff9b::c000:201 (hex groups)
  const nat64Match = normalized.match(/^64:ff9b::/)
  if (nat64Match) {
    // Extract everything after 64:ff9b::
    const remainder = normalized.slice(nat64Match[0].length)

    // Check for dotted-decimal IPv4
    const dottedMatch = remainder.match(/^((?:[0-9]{1,3}\.){3}[0-9]{1,3})$/)
    if (dottedMatch) {
      return dottedMatch[1]
    }

    // Check for hex groups representing the last 32 bits
    const hexGroups = remainder.split(':')
    if (hexGroups.length === 1 || hexGroups.length === 2) {
      if (!hexGroups.every((group) => /^[0-9a-f]{1,4}$/.test(group))) {
        return null
      }

      const high = hexGroups.length === 2 ? parseInt(hexGroups[0], 16) : 0
      const low = parseInt(hexGroups[hexGroups.length - 1], 16)
      const value = (high * 0x10000) + low

      if (Number.isSafeInteger(value) && value >= 0 && value <= 0xffffffff) {
        const part1 = (value >>> 24) & 0xff
        const part2 = (value >>> 16) & 0xff
        const part3 = (value >>> 8) & 0xff
        const part4 = value & 0xff
        return `${part1}.${part2}.${part3}.${part4}`
      }
    }
  }

  // Handle IPv4-mapped: ::ffff:a.b.c.d or ::ffff:0:a.b.c.d (RFC 4291, Section 2.5.5.2)
  // Match the IPv4 part in dotted-decimal format
  const ipv4MappedMatch = normalized.match(/^::ffff:(?:0:)?((?:[0-9]{1,3}\.){3}[0-9]{1,3})$/)
  if (ipv4MappedMatch) {
    return ipv4MappedMatch[1]
  }

  // Handle IPv4-compatible: ::a.b.c.d (deprecated, RFC 4291, Section 2.5.5.1)
  const ipv4CompatibleMatch = normalized.match(/^::((?:[0-9]{1,3}\.){3}[0-9]{1,3})$/)
  if (ipv4CompatibleMatch) {
    return ipv4CompatibleMatch[1]
  }

  return null
}

function isIpv6PrivateOrReserved(address: string): boolean {
  const normalized = address.toLowerCase()

  // Unspecified address (RFC 4291, Section 2.5.2)
  if (normalized === '::') return true

  // Loopback address (RFC 4291, Section 2.5.3)
  if (normalized === '::1') return true

  // Link-local addresses (RFC 4291, Section 2.5.6)
  // Check first 10 bits (fe80 through febf)
  if (normalized.startsWith('fe8') || normalized.startsWith('fe9') || 
      normalized.startsWith('fea') || normalized.startsWith('feb')) return true

  // Unique local addresses (RFC 4193)
  if (normalized.startsWith('fc00:') || normalized.startsWith('fd00:')) return true

  // Documentation prefix (RFC 3849)
  if (normalized.startsWith('2001:db8:')) return true

  // Multicast addresses (RFC 4291, Section 2.7)
  if (normalized.startsWith('ff00:')) return true

  return false
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
    // Check for IPv4-mapped or IPv4-compatible addresses
    const extractedIpv4 = extractIpv4FromIpv6(address)
    if (extractedIpv4) {
      // Validate the extracted IPv4 against IPv4 private/reserved rules
      return isPublicIp(extractedIpv4)
    }
    
    // Check against IPv6 private/reserved ranges
    return !isIpv6PrivateOrReserved(address)
  }
  return false
}

async function resolvePublicTarget(url: URL, dnsCache?: Map<string, LookupAddress>) {
  if (!['http:', 'https:'].includes(url.protocol)) throw new SafeFetchError('Only http and https websites can be scanned.')
  if (url.username || url.password) throw new SafeFetchError('Website addresses cannot include a username or password.')
  if (url.port && !['80', '443'].includes(url.port)) throw new SafeFetchError('That website uses a port the scanner cannot access.')
  const hostname = url.hostname.toLowerCase().replace(/\.$/, '')
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || net.isIP(hostname)) {
    throw new SafeFetchError('Private network and direct IP addresses cannot be scanned.')
  }
  const cached = dnsCache?.get(hostname)
  if (cached) {
    return cached
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
  const target = approved[0]
  dnsCache?.set(hostname, target)
  return target
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
  const dnsCache = new Map<string, LookupAddress>()

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    const target = await resolvePublicTarget(url, dnsCache)
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
