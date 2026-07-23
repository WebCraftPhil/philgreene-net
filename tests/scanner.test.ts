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
  assert.match(report.leadPathSummary, /tap-to-call/)
  assert.match(report.leadPathSummary, /contact form/)
  assert.ok(report.factsSummary.some((item) => item.label === 'Phone call path' && item.status === 'good'))
  assert.ok(report.strengths.length > 0)
  assert.ok(report.strengths.every((finding) => finding.outcomeCategory && finding.implementationFit))
})

test('prioritizes missing contact and trust paths on a thin homepage', () => {
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 300 })
  assert.ok(report.score.overall < 50)
  assert.equal(report.topFindings.length, 3)
  assert.deepEqual(report.topFindings.map((finding) => finding.id), ['clear-offer', 'local-relevance', 'lead-form'])
  assert.ok(report.findings.some((finding) => finding.id === 'lead-form'))
  assert.ok(report.findings.some((finding) => finding.id === 'reviews'))
  assert.match(report.leadPathSummary, /No clear way to call/)
  assert.ok(report.quickWins.some((finding) => finding.id === 'phone-link'))
  assert.ok(report.factsSummary.some((item) => item.label === 'Quote or contact form' && item.status === 'warning'))
})

test('uses plain-English recommendation titles with secondary technical labels', () => {
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 300 })
  const phone = report.findings.find((finding) => finding.id === 'phone-link')
  const schema = report.findings.find((finding) => finding.id === 'local-schema')
  const cta = report.findings.find((finding) => finding.id === 'cta-language')

  assert.equal(phone?.title, 'Make it easy to call from a phone')
  assert.match(phone?.summary ?? '', /local customers/)
  assert.equal(phone?.technicalLabel, 'Tap-to-call link')
  assert.equal(schema?.title, 'Help Google understand your business')
  assert.match(schema?.summary ?? '', /services, location, and service area/)
  assert.equal(schema?.technicalLabel, 'LocalBusiness schema')
  assert.equal(cta?.title, 'Use buttons that say what happens next')
  assert.doesNotMatch(cta?.summary ?? '', /\bCTA\b/)
})

test('assigns recommendations to business-outcome categories', () => {
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 300 })
  const slowReport = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 6000 })
  const categories = new Set(report.findings.map((finding) => finding.outcomeCategory))
  const slowCategories = new Set(slowReport.findings.map((finding) => finding.outcomeCategory))

  assert.ok(categories.has('Get More Leads'))
  assert.ok(categories.has('Improve Google Visibility'))
  assert.ok(categories.has('Build Customer Trust'))
  assert.ok(categories.has('Make the Website Easier to Use'))
  assert.ok(slowCategories.has('Improve Website Performance'))
  assert.equal(report.findings.find((finding) => finding.id === 'local-schema')?.outcomeCategory, 'Improve Google Visibility')
  assert.equal(report.findings.find((finding) => finding.id === 'reviews')?.outcomeCategory, 'Build Customer Trust')
  assert.equal(report.findings.find((finding) => finding.id === 'phone-link')?.outcomeCategory, 'Get More Leads')
})

test('keeps impact, effort, and implementation labels on visible findings', () => {
  const report = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 300 })
  const slowReport = analyzeWebsite({ requestedUrl: 'https://example.com/', finalUrl: 'https://example.com/', html: '<html><head><title>Home</title></head><body><h1>Welcome</h1></body></html>', loadTimeMs: 6000 })

  assert.equal(report.findings.find((finding) => finding.id === 'phone-link')?.impact, 'high')
  assert.equal(report.findings.find((finding) => finding.id === 'phone-link')?.effort, 'quick')
  assert.equal(report.findings.find((finding) => finding.id === 'phone-link')?.implementationFit, 'Phil can implement')
  assert.equal(slowReport.findings.find((finding) => finding.id === 'response-time')?.implementationFit, 'Needs manual review')
})

test('summarizes a form-only lead path without overstating call options', () => {
  const report = analyzeWebsite({
    requestedUrl: 'https://example.com/',
    finalUrl: 'https://example.com/',
    html: '<html><head><title>Manchester Junk Removal Estimates</title><meta name="description" content="Junk removal estimates for Manchester NH homeowners and businesses."><meta name="viewport" content="width=device-width"></head><body><main><section><h1>Request a junk removal estimate</h1><p>Serving Manchester NH with simple junk pickup estimates.</p><form><input name="name"></form></section></main></body></html>',
    loadTimeMs: 500,
  })

  assert.match(report.leadPathSummary, /contact form/)
  assert.doesNotMatch(report.leadPathSummary, /tap-to-call/)
  assert.ok(report.quickWins.some((finding) => finding.id === 'phone-link'))
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
  assert.equal(report.topFindings[0]?.title, 'Review the real page visitors see')
  assert.equal(report.topFindings[0]?.outcomeCategory, 'Get More Leads')
  assert.match(report.leadPathSummary, /manual review/)
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
