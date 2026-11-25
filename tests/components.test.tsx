import assert from 'node:assert/strict'
import test from 'node:test'
import { auditRequestSchema, createAuditEmail, personalInquirySchema } from '../shared/contact'
import { getProjectBySlug, projects } from '../client/src/data/projects'
import { articles, getArticleBySlug } from '../client/src/data/writing'

const validPersonalInquiry = {
  name: 'Jordan Rivera',
  email: 'jordan@example.com',
  topic: 'Data Analytics / Engineering',
  message: 'Enjoyed reading your notes on the Raspberry Pi 5 and Hailo-10H local AI lab.',
  companyWebsite: '',
}

const validLegacyAuditRequest = {
  name: 'Jordan Rivera',
  businessName: 'Rivera Digital Marketing',
  email: 'jordan@example.com',
  phone: '+1 (555) 123-4567',
  websiteUrl: 'https://www.riveradigital.example',
  businessType: 'Marketing agency',
  problem: 'The contact form on our website is not delivering inquiries.',
  preferredContact: 'Email',
  companyWebsite: '',
}

test('accepts a valid personal inquiry submission', () => {
  const result = personalInquirySchema.safeParse(validPersonalInquiry)
  assert.equal(result.success, true)
})

test('accepts a complete legacy audit request through auditRequestSchema', () => {
  const result = auditRequestSchema.safeParse(validLegacyAuditRequest)
  assert.equal(result.success, true)
})

test('rejects spam honeypot submissions', () => {
  const result = auditRequestSchema.safeParse({
    ...validPersonalInquiry,
    companyWebsite: 'spam.example',
  })
  assert.equal(result.success, false)
})

test('escapes user content in inquiry email HTML', () => {
  const parsed = auditRequestSchema.parse({
    ...validPersonalInquiry,
    message: '<script>alert("xss")</script> Hello from the portfolio test.',
  })
  const email = createAuditEmail(parsed)
  assert.equal(email.html.includes('<script>'), false)
  assert.equal(email.html.includes('&lt;script&gt;'), true)
})

test('includes all five initial featured projects and resolves them by slug', () => {
  assert.equal(projects.length, 5)
  for (const slug of [
    'tableau-superstore-sales-analysis',
    'python-stock-screener',
    'ai-agent-n8n-automation-workflows',
    'raspberry-pi-5-hailo-10h-local-ai-lab',
    'iron-and-ink-systems',
  ]) {
    const found = getProjectBySlug(slug)
    assert.ok(found, `Expected project ${slug} to exist`)
    assert.equal(found?.featuredOnHome, true)
  }
})

test('resolves all writing articles by slug', () => {
  assert.ok(articles.length >= 3)
  for (const article of articles) {
    const found = getArticleBySlug(article.slug)
    assert.ok(found, `Expected article with slug ${article.slug} to resolve`)
    assert.strictEqual(found, article)
  }
})
