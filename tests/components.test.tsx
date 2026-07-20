import assert from 'node:assert/strict'
import test from 'node:test'
import { auditRequestSchema, createAuditEmail } from '../shared/contact'
import { buildAssistantPrefill, recommendPackage } from '../client/src/lib/assistant'

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

test('recommends the website package for a website-only problem', () => {
  assert.equal(recommendPackage({ businessType: 'Plumbing', websiteUrl: '', primaryGoal: 'calls', problem: 'website' }), 'website')
})

test('recommends lead capture for booking and follow-up gaps', () => {
  assert.equal(recommendPackage({ businessType: 'HVAC', websiteUrl: '', primaryGoal: 'appointments', problem: 'capture' }), 'website-lead-capture')
})

test('recommends the complete system for missed calls and includes it in prefill context', () => {
  const prefill = buildAssistantPrefill({ businessType: 'Roofing', websiteUrl: 'https://roofer.example', primaryGoal: 'calls', problem: 'missed-calls' })
  assert.equal(prefill.selectedPackage, 'lead-recovery-system')
  assert.match(prefill.problem, /Complete Lead Recovery System/)
})
