import assert from 'node:assert/strict'
import test from 'node:test'
import { auditRequestSchema, createAuditEmail } from '../shared/contact'

const validRequest = {
  name: 'Sam Owner',
  businessName: 'Sam Service Co',
  email: 'sam@example.com',
  phone: '603-555-0123',
  websiteUrl: 'https://example.com',
  businessType: 'Plumbing',
  problem: 'Calls are missed when the team is on a job.',
  preferredContact: 'Email',
  companyWebsite: '',
}

test('accepts a complete lead-loss audit request', () => {
  const result = auditRequestSchema.safeParse(validRequest)
  assert.equal(result.success, true)
})

test('rejects spam honeypot submissions', () => {
  const result = auditRequestSchema.safeParse({ ...validRequest, companyWebsite: 'spam.example' })
  assert.equal(result.success, false)
})

test('escapes user content in the email HTML', () => {
  const parsed = auditRequestSchema.parse({
    ...validRequest,
    problem: '<script>alert("test")</script>',
  })
  const email = createAuditEmail(parsed)
  assert.equal(email.html.includes('<script>'), false)
  assert.equal(email.html.includes('&lt;script&gt;'), true)
})
