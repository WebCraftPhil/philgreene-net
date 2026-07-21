import assert from 'node:assert/strict'
import test from 'node:test'
import { analyzeWebsite } from '../server/scanner/analyze'
import { isPublicIp, normalizeWebsiteUrl } from '../server/scanner/safe-fetch'
import { decryptReport, encryptReport } from '../server/scanner/report-token'

const strongHtml = `<!doctype html><html><head><title>Manchester NH Plumbing and HVAC Services</title><meta name="description" content="Licensed and insured Manchester NH plumbers providing repairs, estimates, and appointments for homeowners across southern New Hampshire."><meta name="viewport" content="width=device-width, initial-scale=1"><script type="application/ld+json">{"@type":"LocalBusiness"}</script></head><body><main><section><h1>Local plumbing help when you need it</h1><p>Serving Manchester and nearby New Hampshire communities. Read our customer reviews and request a free estimate.</p><a href="tel:+16035550123">Call now</a><a href="/book">Book an appointment</a><form><input name="email"></form></section></main></body></html>`

test('normalizes a bare website hostname to https', () => {
  assert.equal(normalizeWebsiteUrl('example.com').toString(), 'https://example.com/')
})

test('blocks private, loopback, reserved, and documentation IP ranges', () => {
  for (const address of ['127.0.0.1', '10.1.2.3', '172.16.0.1', '192.168.1.10', '169.254.1.1', '192.0.2.1', '203.0.113.10', '::1', 'fd00::1', '2001:db8::1']) {
    assert.equal(isPublicIp(address), false, address)
  }
  assert.equal(isPublicIp('1.1.1.1'), true)
  assert.equal(isPublicIp('2606:4700:4700::1111'), true)
})

test('scores a conversion-ready local service homepage and preserves evidence', () => {
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: strongHtml, loadTimeMs: 420 })
  assert.ok(report.score.overall >= 75)
  assert.equal(report.facts.phoneLinks, 1)
  assert.equal(report.facts.hasLocalBusinessSchema, true)
  assert.ok(report.strengths.length > 0)
})

test('prioritizes missing contact and trust paths on a thin homepage', () => {
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 300 })
  assert.ok(report.score.overall < 50)
  assert.equal(report.topFindings.length, 3)
  assert.ok(report.findings.some((finding) => finding.id === 'lead-form'))
  assert.ok(report.findings.some((finding) => finding.id === 'reviews'))
})

test('does not fabricate a conversion score for a client-rendered app shell', () => {
  const report = analyzeWebsite({
    requestedUrl: 'https://example.com/',
    finalUrl: 'https://example.com/',
    html: '<html><head><title>Client App</title><meta name="viewport" content="width=device-width"></head><body><div id="root"></div><script src="/assets/app.js"></script></body></html>',
    loadTimeMs: 250,
  })
  assert.equal(report.score.overall, null)
  assert.equal(report.score.leadCapture, null)
  assert.equal(report.topFindings[0]?.source, 'manual-review')
  assert.match(report.topFindings[0]?.title ?? '', /rendered customer-journey review/)
})

test('encrypted scanner reports survive round-trip and reject tampering', () => {
  process.env.SCAN_REPORT_SECRET = 'test-secret-that-is-definitely-longer-than-thirty-two-characters'
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: strongHtml, loadTimeMs: 420 })
  const token = encryptReport(report)
  assert.equal(decryptReport(token).score.overall, report.score.overall)
  const [iv, tag, data] = token.split('.')
  const replacement = data[0] === 'a' ? 'b' : 'a'
  assert.throws(() => decryptReport(`${iv}.${tag}.${replacement}${data.slice(1)}`), /expired/)
})
