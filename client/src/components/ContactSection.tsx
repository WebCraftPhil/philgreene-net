import { useRef, useState } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import { apiRequest } from '@/lib/queryClient'
import { trackEvent } from '@/lib/analytics'
import type { AuditPrefill } from '@/types/audit'
import { packageNames } from '@/lib/assistant'

type FormState = {
  name: string
  businessName: string
  email: string
  phone: string
  websiteUrl: string
  businessType: string
  problem: string
  preferredContact: string
  companyWebsite: string
}

const initialFormState: FormState = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  websiteUrl: '',
  businessType: '',
  problem: '',
  preferredContact: '',
  companyWebsite: '',
}

const businessTypes = [
  'Roofing', 'Junk removal', 'Landscaping', 'Painting', 'Remodeling', 'Cleaning',
  'Auto repair', 'Electrical', 'Plumbing', 'HVAC', 'Other local service business',
]

function parseSubmissionError(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Your request could not be sent. Please email me directly instead.'
  }

  const responseBody = error.message.replace(/^\d+:\s*/, '')
  try {
    const parsed = JSON.parse(responseBody) as { error?: unknown }
    if (typeof parsed.error === 'string' && parsed.error.trim()) {
      return parsed.error
    }
  } catch {
    // The server did not return structured JSON.
  }

  return 'Your request could not be sent. Please email me directly instead.'
}

export default function ContactSection({ prefill }: { prefill?: AuditPrefill }) {
  const [formData, setFormData] = useState<FormState>(() => ({
    ...initialFormState,
    websiteUrl: prefill?.websiteUrl ?? '',
    businessType: prefill?.businessType ?? '',
    problem: prefill?.problem ?? '',
  }))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [appliedPrefill, setAppliedPrefill] = useState(prefill)
  const [selectedPackage, setSelectedPackage] = useState(prefill?.selectedPackage)
  const hasStarted = useRef(false)

  if (prefill && prefill !== appliedPrefill) {
    setAppliedPrefill(prefill)
    setSelectedPackage(prefill.selectedPackage)
    setFormData((current) => ({
      ...current,
      websiteUrl: current.websiteUrl.trim() ? current.websiteUrl : prefill.websiteUrl,
      businessType: current.businessType.trim() ? current.businessType : prefill.businessType,
      problem: current.problem.trim() ? current.problem : prefill.problem,
    }))
  }

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const markStarted = () => {
    if (!hasStarted.current) {
      hasStarted.current = true
      trackEvent('audit_form_started')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const problem = selectedPackage && !formData.problem.includes(packageNames[selectedPackage])
        ? `${formData.problem}\n\nSelected package: ${packageNames[selectedPackage]}.`
        : formData.problem
      await apiRequest('POST', '/api/contact', { ...formData, problem })
      setIsSubmitted(true)
      setFormData(initialFormState)
      trackEvent('audit_form_submitted', { business_type: formData.businessType })
      trackEvent('audit_submitted', { business_type: formData.businessType })
    } catch (error) {
      setErrorMessage(parseSubmissionError(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="audit" className="audit-section section" aria-labelledby="audit-heading">
      <div className="site-container audit-grid">
        <div className="audit-copy">
          <p className="section-label">Free website audit</p>
          <h2 id="audit-heading">Find the clearest path to more calls and booked work.</h2>
          <p>
            I will review your website, messaging, mobile experience, lead capture, and follow-up
            process—then show you the most useful improvements to make first.
          </p>
          <ul>
            <li><CheckCircle2 aria-hidden="true" />A practical review of your website and customer journey</li>
            <li><CheckCircle2 aria-hidden="true" />Clear priorities, without a high-pressure sales call</li>
            <li><CheckCircle2 aria-hidden="true" />A direct recommendation on what to fix first</li>
          </ul>
          <div className="direct-contact">
            <Mail aria-hidden="true" />
            <div>
              <span>Prefer email?</span>
              <a href="mailto:me@philgreene.net" onClick={() => trackEvent('email_link_clicked', { placement: 'audit' })}>
                me@philgreene.net
              </a>
            </div>
          </div>
        </div>

        <div className="audit-form-wrap">
          {isSubmitted ? (
            <div className="success-state" role="status">
              <CheckCircle2 aria-hidden="true" />
              <h3>Your audit request is in.</h3>
              <p>Thanks for the context. I will review it and follow up using your preferred contact method.</p>
              <button className="text-link" type="button" onClick={() => setIsSubmitted(false)}>
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onFocus={markStarted} noValidate={false}>
              <div className="form-heading">
                <h3>Tell me a little about your business</h3>
                <p>Fields marked with an asterisk are required.</p>
              </div>

              <div className="form-grid">
                <label>
                  <span>Name *</span>
                  <input name="name" autoComplete="name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} required maxLength={100} />
                </label>
                <label>
                  <span>Business name *</span>
                  <input name="businessName" autoComplete="organization" value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} required maxLength={120} />
                </label>
                <label>
                  <span>Email *</span>
                  <input name="email" type="email" autoComplete="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required maxLength={180} />
                </label>
                <label>
                  <span>Phone *</span>
                  <input name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} required maxLength={30} />
                </label>
                <label>
                  <span>Website URL</span>
                  <input name="websiteUrl" type="url" inputMode="url" placeholder="https://" value={formData.websiteUrl} onChange={(e) => updateField('websiteUrl', e.target.value)} maxLength={300} />
                </label>
                <label>
                  <span>Type of business *</span>
                  <select name="businessType" value={formData.businessType} onChange={(e) => updateField('businessType', e.target.value)} required>
                    <option value="">Select one</option>
                    {businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>
                <label className="form-span-2">
                  <span>Biggest website, lead-capture, or follow-up problem *</span>
                  <textarea name="problem" rows={4} value={formData.problem} onChange={(e) => updateField('problem', e.target.value)} required minLength={10} maxLength={1500} />
                </label>
                <label className="form-span-2">
                  <span>Preferred contact method *</span>
                  <select name="preferredContact" value={formData.preferredContact} onChange={(e) => updateField('preferredContact', e.target.value)} required>
                    <option value="">Select one</option>
                    <option value="Email">Email</option>
                    <option value="Phone call">Phone call</option>
                    <option value="Text message">Text message</option>
                  </select>
                </label>
              </div>

              <label className="honeypot" aria-hidden="true">
                Company website confirmation
                <input name="companyWebsite" tabIndex={-1} autoComplete="off" value={formData.companyWebsite} onChange={(e) => updateField('companyWebsite', e.target.value)} />
              </label>

              {errorMessage && (
                <div className="form-error" role="alert">
                  <AlertCircle aria-hidden="true" />
                  <p>{errorMessage} <a href="mailto:me@philgreene.net">Email me directly.</a></p>
                </div>
              )}

              <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending request...' : 'Get My Free Website Audit'}
                {!isSubmitting && <ArrowRight aria-hidden="true" />}
              </button>
              <p className="form-privacy">By submitting, you agree that I may contact you about this request. See the <a href="/privacy-policy">Privacy Policy</a>.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
