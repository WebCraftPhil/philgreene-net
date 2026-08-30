import { z } from 'zod'

const optionalWebsite = z
  .string()
  .trim()
  .max(300)
  .refine((value) => value === '' || /^https?:\/\//i.test(value), 'Website URL must start with http:// or https://')

export const auditRequestSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  businessName: z.string().trim().min(1, 'Business name is required').max(120),
  email: z.string().trim().email('A valid email is required').max(180),
  phone: z.string().trim().min(7, 'A valid phone number is required').max(30),
  websiteUrl: optionalWebsite.default(''),
  businessType: z.string().trim().min(1, 'Business type is required').max(100),
  problem: z.string().trim().min(10, 'Please share a little more about the website or lead problem').max(1500),
  preferredContact: z.enum(['Email', 'Phone call', 'Text message']),
  companyWebsite: z.string().max(0).optional().default(''),
})

export type AuditRequest = z.infer<typeof auditRequestSchema>

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function createAuditEmail(request: AuditRequest) {
  const submittedAt = new Date().toISOString()
  const website = request.websiteUrl || 'Not provided'

  return {
    subject: `Free audit request from ${request.businessName}`,
    text: [
      'New website audit request',
      '',
      `Name: ${request.name}`,
      `Business: ${request.businessName}`,
      `Email: ${request.email}`,
      `Phone: ${request.phone}`,
      `Website: ${website}`,
      `Business type: ${request.businessType}`,
      `Preferred contact: ${request.preferredContact}`,
      '',
      'Biggest website, lead-capture, or follow-up problem:',
      request.problem,
      '',
      `Submitted: ${submittedAt}`,
    ].join('\n'),
    html: `
      <h2>New website audit request</h2>
      <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
      <p><strong>Business:</strong> ${escapeHtml(request.businessName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(request.phone)}</p>
      <p><strong>Website:</strong> ${escapeHtml(website)}</p>
      <p><strong>Business type:</strong> ${escapeHtml(request.businessType)}</p>
      <p><strong>Preferred contact:</strong> ${escapeHtml(request.preferredContact)}</p>
      <h3>Biggest website, lead-capture, or follow-up problem</h3>
      <p>${escapeHtml(request.problem).replaceAll('\n', '<br>')}</p>
      <p><small>Submitted: ${submittedAt}</small></p>
    `,
  }
}
