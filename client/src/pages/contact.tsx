import { useState, type FormEvent } from 'react'
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Send, ShoppingBag } from 'lucide-react'
import SeoHead from '@/components/SeoHead'
import { profile } from '@/data/profile'
import { apiRequest } from '@/lib/queryClient'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('Collaboration / Opportunity')
  const [message, setMessage] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await apiRequest('POST', '/api/contact', {
        name,
        email,
        topic,
        message,
        companyWebsite,
      })
      setSubmitted(true)
    } catch (err) {
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message.replace(/^\d+:\s*/, '')) as { error?: string }
          setError(parsed.error || 'Could not send your message. Please email me directly.')
        } catch {
          setError('Could not send your message. Please email me directly.')
        }
      } else {
        setError('Could not send your message. Please email me directly.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SeoHead
        title="Contact | Phil Greene"
        description="Get in touch with Phillip Greene regarding data analytics roles, software & automation projects, or Iron & Ink Systems."
        canonicalPath="/contact"
      />
      <main id="main-content" className="section-pad">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow-mono">Contact</p>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Start a conversation
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
                Open to data analytics opportunities, technical collaborations, conversations about
                local AI / automation, or inquiries related to Iron &amp; Ink Systems.
              </p>

              <div className="mt-8 space-y-4 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                  <MapPin size={17} aria-hidden="true" className="text-[var(--accent-primary)]" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={17} aria-hidden="true" className="text-[var(--accent-primary)]" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)]"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary min-h-10 px-4 text-xs"
                  >
                    <Github size={15} aria-hidden="true" /> GitHub
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary min-h-10 px-4 text-xs"
                  >
                    <Linkedin size={15} aria-hidden="true" /> LinkedIn
                  </a>
                  <a
                    href={profile.gumroadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary min-h-10 px-4 text-xs"
                  >
                    <ShoppingBag size={15} aria-hidden="true" /> Gumroad Shop
                  </a>
                </div>
              </div>
            </div>

            <div className="surface-card p-7">
              {submitted ? (
                <div role="status" className="space-y-4 py-6">
                  <CheckCircle2
                    size={28}
                    aria-hidden="true"
                    className="text-[var(--status-success)]"
                  />
                  <h2 className="text-2xl font-bold">Message received.</h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    Thanks for reaching out. I&apos;ll reply to{' '}
                    <strong className="text-[var(--text-primary)]">{email}</strong> as soon as I
                    can.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => {
                      setSubmitted(false)
                      setMessage('')
                    }}
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="companyWebsite">Company Website</label>
                    <input
                      id="companyWebsite"
                      name="companyWebsite"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      disabled={submitting}
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="field-label">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      disabled={submitting}
                      className="field-input"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="field-label">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      disabled={submitting}
                      className="field-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="field-label">
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      name="topic"
                      disabled={submitting}
                      className="field-select"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      <option value="Collaboration / Opportunity">Collaboration / Opportunity</option>
                      <option value="Data Analytics / Engineering">Data Analytics / Engineering</option>
                      <option value="AI & Automation">AI &amp; Automation</option>
                      <option value="Iron & Ink Systems">Iron &amp; Ink Systems</option>
                      <option value="General Note">General Note</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="field-label">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      disabled={submitting}
                      className="field-textarea"
                      placeholder="What are you working on or looking to discuss?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-sm font-medium text-[var(--status-error)]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary w-full"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    <Send size={15} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
