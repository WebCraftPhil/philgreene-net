import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquareText, X } from 'lucide-react'
import { buildAssistantPrefill, packageNames, recommendPackage, type AssistantAnswers } from '@/lib/assistant'
import { trackEvent } from '@/lib/analytics'
import type { AuditPrefill } from '@/types/audit'

const initialAnswers: AssistantAnswers = {
  businessType: '',
  websiteUrl: '',
  primaryGoal: '',
  problem: '',
}

const businessTypes = ['Roofing', 'Plumbing', 'HVAC', 'Landscaping', 'Remodeling', 'Cleaning', 'Auto repair', 'Other local business']

type Props = {
  onComplete: (prefill: AuditPrefill) => void
}

export default function GuidedLeadAssistant({ onComplete }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const openAssistant = () => {
    setIsOpen(true)
    trackEvent('assistant_opened')
  }

  const closeAssistant = () => {
    setIsOpen(false)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAssistant()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]'))
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const reset = () => {
    setAnswers(initialAnswers)
    setStep(0)
  }

  const complete = () => {
    const prefill = buildAssistantPrefill(answers)
    trackEvent('assistant_completed', { recommended_package: prefill.selectedPackage ?? 'website' })
    onComplete(prefill)
    closeAssistant()
  }

  const canContinue = [answers.businessType, 'website', answers.primaryGoal, answers.problem][step]
  const recommendation = packageNames[recommendPackage(answers)]

  return (
    <>
      <button ref={triggerRef} className="checkup-trigger" type="button" onClick={openAssistant} aria-haspopup="dialog">
        <MessageSquareText aria-hidden="true" />
        <span><strong>Website Checkup</strong><small>Find your best next step</small></span>
      </button>

      {isOpen && (
        <div className="assistant-overlay" onMouseDown={(event) => event.target === event.currentTarget && closeAssistant()}>
          <div ref={dialogRef} className="assistant-dialog" role="dialog" aria-modal="true" aria-labelledby="assistant-title" aria-describedby="assistant-description">
            <div className="assistant-header">
              <div>
                <span>Free guided checkup</span>
                <h2 id="assistant-title">Where could your website work harder?</h2>
              </div>
              <button ref={closeRef} type="button" onClick={closeAssistant} aria-label="Close Website Checkup"><X aria-hidden="true" /></button>
            </div>
            <p id="assistant-description" className="assistant-privacy">Four quick questions. Your answers stay in this browser until you choose to submit the audit form.</p>
            <div className="assistant-progress" aria-label={`Step ${Math.min(step + 1, 5)} of 5`}><span style={{ width: `${((step + 1) / 5) * 100}%` }} /></div>

            <div className="assistant-body">
              {step === 0 && (
                <label className="assistant-field">
                  <span>What kind of business do you run?</span>
                  <select value={answers.businessType} onChange={(event) => setAnswers((current) => ({ ...current, businessType: event.target.value }))}>
                    <option value="">Choose a business type</option>
                    {businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>
              )}
              {step === 1 && (
                <label className="assistant-field">
                  <span>What is your website address?</span>
                  <input type="url" inputMode="url" placeholder="https://yourbusiness.com (optional)" value={answers.websiteUrl} onChange={(event) => setAnswers((current) => ({ ...current, websiteUrl: event.target.value }))} />
                  <small>No website yet? Leave this blank and continue.</small>
                </label>
              )}
              {step === 2 && <ChoiceQuestion legend="What would you most like to improve?" value={answers.primaryGoal} onChange={(primaryGoal) => setAnswers((current) => ({ ...current, primaryGoal }))} options={[
                ['calls', 'Get more phone calls'], ['quotes', 'Generate more quote requests'], ['appointments', 'Book more appointments'], ['follow-up', 'Improve lead follow-up'],
              ]} />}
              {step === 3 && <ChoiceQuestion legend="Where do you think customers are being lost?" value={answers.problem} onChange={(problem) => setAnswers((current) => ({ ...current, problem }))} options={[
                ['website', 'The website is unclear or outdated'], ['capture', 'Visitors are not becoming leads'], ['missed-calls', 'Calls or messages go unanswered'], ['slow-follow-up', 'Follow-up is too slow or inconsistent'], ['reviews-retention', 'Reviews and past-customer follow-up'], ['multiple', 'Several of these problems'],
              ]} />}
              {step === 4 && (
                <div className="assistant-result" role="status">
                  <CheckCircle2 aria-hidden="true" />
                  <p>Your recommended starting point</p>
                  <h3>{recommendation}</h3>
                  <p>{recommendation === packageNames.website
                    ? 'Start with a clearer, faster website built around calls, quotes, and bookings.'
                    : recommendation === packageNames['website-lead-capture']
                      ? 'Pair the website with guided lead capture, booking, and practical follow-up.'
                      : 'Connect the full journey—from the website and incoming calls through follow-up, booking, and review requests.'}</p>
                </div>
              )}
            </div>

            <div className="assistant-actions">
              {step > 0 && <button className="button button-secondary" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" />Back</button>}
              {step < 4 ? (
                <button className="button button-primary" type="button" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>Continue<ArrowRight aria-hidden="true" /></button>
              ) : (
                <button className="button button-primary" type="button" onClick={complete}>Get My Free Website Audit<ArrowRight aria-hidden="true" /></button>
              )}
            </div>
            <button className="assistant-reset" type="button" onClick={reset}>Start over</button>
          </div>
        </div>
      )}
    </>
  )
}

function ChoiceQuestion({ legend, value, onChange, options }: { legend: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return (
    <fieldset className="assistant-choices">
      <legend>{legend}</legend>
      {options.map(([optionValue, label]) => (
        <label key={optionValue} className={value === optionValue ? 'is-selected' : ''}>
          <input type="radio" name={legend} value={optionValue} checked={value === optionValue} onChange={() => onChange(optionValue)} />
          <span>{label}</span>
        </label>
      ))}
    </fieldset>
  )
}
