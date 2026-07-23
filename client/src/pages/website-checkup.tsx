import { useCallback, useMemo, useRef, useState, type FormEvent, type CSSProperties } from 'react'
import { AlertCircle, ArrowRight, Check, CheckCircle2, ClipboardCheck, Globe2, LoaderCircle, LockKeyhole, Mail, PhoneCall, Search, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import SeoHead from '@/components/SeoHead'
import TurnstileWidget from '@/components/TurnstileWidget'
import { apiRequest } from '@/lib/queryClient'
import { trackEvent } from '@/lib/analytics'
import type { ReportResponse, ScanFinding, ScanResponse, WebsiteScanReport } from '@shared/scanner'
import type { AuditPrefill } from '@/types/audit'

type OperationalAnswers = { missedCalls: string; responseTime: string; estimateFollowup: string; reviewRequests: string }
const initialOperational: OperationalAnswers = { missedCalls: '', responseTime: '', estimateFollowup: '', reviewRequests: '' }

function readError(error: unknown, fallback: string) {
  if (!(error instanceof Error)) return fallback
  try { return (JSON.parse(error.message.replace(/^\d+:\s*/, '')) as { error?: string }).error || fallback } catch { return fallback }
}

function scoreTone(score: number | null) { return score === null ? 'limited' : score >= 80 ? 'strong' : score >= 60 ? 'developing' : 'priority' }
function scoreLabel(score: number | null) { return score === null ? 'Limited scan: rendered review needed' : score >= 80 ? 'Strong foundation' : score >= 60 ? 'Good foundation with clear opportunities' : 'Important lead-path gaps found' }

export default function WebsiteCheckupPage() {
  const [url, setUrl] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileReset, setTurnstileReset] = useState(0)
  const [preview, setPreview] = useState<ScanResponse['preview']>()
  const [reportToken, setReportToken] = useState('')
  const [report, setReport] = useState<WebsiteScanReport>()
  const [isScanning, setIsScanning] = useState(false)
  const [scanError, setScanError] = useState('')
  const [gate, setGate] = useState({ name: '', email: '', businessName: '', businessType: '', companyWebsite: '' })
  const [gateError, setGateError] = useState('')
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [operational, setOperational] = useState(initialOperational)
  const [gateTurnstileToken, setGateTurnstileToken] = useState('')
  const [gateTurnstileReset, setGateTurnstileReset] = useState(0)
  const gateTokenHandler = useCallback((token: string) => setGateTurnstileToken(token), [])
  const gateStarted = useRef(false)
  const tokenHandler = useCallback((token: string) => setTurnstileToken(token), [])

  const runScan = async (event: FormEvent) => {
    event.preventDefault()
    setScanError('')
    if (!turnstileToken) { setScanError('Complete the quick website verification first.'); return }
    setIsScanning(true)
    setPreview(undefined)
    setReport(undefined)
    trackEvent('scan_started')
    try {
      const response = await apiRequest('POST', '/api/scan', { url, turnstileToken })
      const result = await response.json() as ScanResponse
      setPreview(result.preview)
      setReportToken(result.reportToken)
      trackEvent('scan_succeeded', { score: result.preview.score.overall ?? 'limited' })
      window.setTimeout(() => document.querySelector('#scan-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
    } catch (error) {
      setScanError(readError(error, 'The scan could not be completed. Check the address and try again.'))
      trackEvent('scan_failed')
      setTurnstileToken('')
      setTurnstileReset((value) => value + 1)
    } finally { setIsScanning(false) }
  }

  const unlockReport = async (event: FormEvent) => {
    event.preventDefault()
    setGateError('')
    if (!gateTurnstileToken) { setGateError('Complete the verification to unlock the report.'); setIsUnlocking(false); return }
    setIsUnlocking(true)
    trackEvent('report_requested')
    try {
      const response = await apiRequest('POST', '/api/scan-report', { reportToken, turnstileToken: gateTurnstileToken, ...gate })
      const result = await response.json() as ReportResponse
      setReport(result.report)
      setEmailSent(result.emailSent)
      trackEvent('full_report_viewed', { score: result.report.score.overall ?? 'limited' })
    } catch (error) { 
      setGateError(readError(error, 'The full report could not be opened. Please try again.'))
      setGateTurnstileToken('')
      setGateTurnstileReset((value) => value + 1)
    }
    finally { setIsUnlocking(false) }
  }

  const auditProblem = useMemo(() => {
    if (!report) return ''
    const findings = report.topFindings.map((item) => item.title).join('; ')
    const ownerNotes = Object.entries(operational).filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`).join('; ')
    return `Website checkup score: ${report.score.overall === null ? 'Not assigned because the site is client-rendered' : `${report.score.overall}/100`}. Automated priorities: ${findings}.${ownerNotes ? ` Owner-reported process: ${ownerNotes}.` : ''}`
  }, [operational, report])

  const requestAudit = () => {
    if (!report) return
    const prefill: AuditPrefill = { websiteUrl: report.scannedUrl, businessType: gate.businessType, problem: auditProblem, selectedPackage: 'website-lead-capture' }
    sessionStorage.setItem('phil-audit-prefill', JSON.stringify(prefill))
    trackEvent('scanner_audit_clicked', { score: report.score.overall ?? 'limited' })
    window.location.href = '/#audit'
  }

  return (
    <main id="main-content" className="scanner-page">
      <SeoHead title="Free Website Lead Checkup | Phil Greene" description="Scan your local service business website for lead-capture, trust, local SEO, and technical gaps. Get practical priorities in minutes." canonicalPath="/website-checkup" />
      <section className="scanner-hero">
        <div className="site-container scanner-hero-grid">
          <div>
            <p className="section-label">Free website lead checkup</p>
            <h1>Find out where your website may be losing good leads.</h1>
            <p className="scanner-lede">Enter your homepage and get a focused review of the paths that help local customers call, request an estimate, book, and trust your business.</p>
            <ul className="scanner-promises">
              <li><Check aria-hidden="true" />Your score and top three priorities appear immediately</li>
              <li><Check aria-hidden="true" />The full report includes practical fixes, not generic jargon</li>
              <li><Check aria-hidden="true" />No fake revenue claims and no automatic sales call</li>
            </ul>
          </div>
          <div className="scanner-entry-card">
            <div className="scanner-entry-heading"><Search aria-hidden="true" /><div><span>Quick homepage scan</span><h2>Check my website</h2></div></div>
            <form onSubmit={runScan}>
              <label htmlFor="scanner-url">Website address</label>
              <div className="scanner-url-field"><Globe2 aria-hidden="true" /><input id="scanner-url" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" placeholder="yourbusiness.com" value={url} onChange={(event) => setUrl(event.target.value)} required maxLength={500} /></div>
              <TurnstileWidget onToken={tokenHandler} resetKey={turnstileReset} />
              {scanError && <div className="scanner-error" role="alert"><AlertCircle aria-hidden="true" /><span>{scanError}</span></div>}
              <button className="button button-primary scanner-submit" type="submit" disabled={isScanning || !url.trim() || !turnstileToken}>{isScanning ? <><LoaderCircle className="scanner-spinner" aria-hidden="true" />Scanning the lead path...</> : <>Scan My Website<ArrowRight aria-hidden="true" /></>}</button>
            </form>
            <p className="scanner-privacy"><ShieldCheck aria-hidden="true" />Protected by Cloudflare Turnstile. The scanner reads public homepage HTML and never submits forms.</p>
          </div>
        </div>
      </section>

      {!preview && <HowScannerWorks />}

      {preview && <section id="scan-results" className="scanner-results section" aria-live="polite">
        <div className="site-container">
          <div className="scanner-results-head">
            <div><p className="section-label">Your initial result</p><h2>{scoreLabel(preview.score.overall)}</h2><a href={preview.scannedUrl} target="_blank" rel="noreferrer">{preview.scannedUrl}</a></div>
            <ScoreRing score={preview.score.overall} />
          </div>
          <div className="score-breakdown">
            <ScoreBar label="Lead capture" score={preview.score.leadCapture} />
            <ScoreBar label="Trust and local relevance" score={preview.score.trustLocal} />
            <ScoreBar label="Technical essentials" score={preview.score.technical} />
          </div>
          <div className="scanner-findings-heading"><div><p className="section-label">Fix these first</p><h2>Your highest-priority opportunities</h2></div><span>Automated checks and review flags</span></div>
          <div className="top-findings">{preview.topFindings.map((item, index) => <FindingCard key={item.id} finding={item} index={index + 1} preview />)}</div>

          {!report ? <div className="report-gate">
            <div className="report-gate-copy"><LockKeyhole aria-hidden="true" /><p className="section-label">Unlock the full checkup</p><h2>Get every finding and the recommended fix.</h2><p>The full report shows the complete priority list, what the scanner found, what to change, and which parts already support conversion. I will also email you a copy.</p><ul><li><CheckCircle2 aria-hidden="true" />Complete findings and strengths</li><li><CheckCircle2 aria-hidden="true" />Impact and effort labels</li><li><CheckCircle2 aria-hidden="true" />Audit-ready summary you can act on</li></ul></div>
            <form onSubmit={unlockReport} onFocus={() => { if (!gateStarted.current) { gateStarted.current = true; trackEvent('report_gate_started') } }}>
              <label><span>Name *</span><input autoComplete="name" value={gate.name} onChange={(e) => setGate({ ...gate, name: e.target.value })} required /></label>
              <label><span>Email *</span><input type="email" autoComplete="email" value={gate.email} onChange={(e) => setGate({ ...gate, email: e.target.value })} required /></label>
              <label><span>Business name</span><input autoComplete="organization" value={gate.businessName} onChange={(e) => setGate({ ...gate, businessName: e.target.value })} /></label>
              <label><span>Type of business</span><input placeholder="Plumbing, roofing, cleaning..." value={gate.businessType} onChange={(e) => setGate({ ...gate, businessType: e.target.value })} /></label>
              <label className="honeypot" aria-hidden="true">Company website<input tabIndex={-1} autoComplete="off" value={gate.companyWebsite} onChange={(e) => setGate({ ...gate, companyWebsite: e.target.value })} /></label>
              <TurnstileWidget onToken={gateTokenHandler} resetKey={gateTurnstileReset} action="report_unlock" />
              {gateError && <div className="scanner-error" role="alert"><AlertCircle aria-hidden="true" /><span>{gateError}</span></div>}
              <button className="button button-primary" disabled={isUnlocking}>{isUnlocking ? 'Opening report...' : 'Show My Full Report'}{!isUnlocking && <ArrowRight aria-hidden="true" />}</button>
              <p>By continuing, you agree that I may email this report and follow up about your website. See the <a href="/privacy-policy">Privacy Policy</a>.</p>
            </form>
          </div> : <FullReport report={report} emailSent={emailSent} operational={operational} setOperational={setOperational} onAudit={requestAudit} />}
        </div>
      </section>}

      <section className="scanner-no-site"><div className="site-container"><div><p className="section-label">No website yet?</p><h2>You can still find your best next step.</h2><p>Tell me what kind of business you run and how leads reach you now. I can review the customer journey without a website.</p></div><button className="button button-secondary" onClick={() => { sessionStorage.setItem('phil-audit-prefill', JSON.stringify({ websiteUrl: '', businessType: '', problem: 'I do not have a website yet and want help planning a lead-capture system.' })); trackEvent('no_website_selected'); window.location.href = '/#audit' }}>Start Without a Website<ArrowRight aria-hidden="true" /></button></div></section>
    </main>
  )
}

function HowScannerWorks() { return <section className="scanner-method section"><div className="site-container"><div className="section-heading"><p className="section-label">What the checkup reviews</p><h2>A practical look at the path from visitor to inquiry.</h2><p>This is not a giant technical audit. It focuses on the signals most likely to affect whether a local customer understands, trusts, and contacts the business.</p></div><div className="scanner-method-grid"><article><PhoneCall aria-hidden="true" /><span>01</span><h3>Lead capture</h3><p>Tap-to-call links, estimate forms, booking paths, CTA language, and above-the-fold clarity.</p></article><article><Sparkles aria-hidden="true" /><span>02</span><h3>Trust and local relevance</h3><p>Reviews, credentials, service-area language, contact details, and local business markup.</p></article><article><Wrench aria-hidden="true" /><span>03</span><h3>Technical essentials</h3><p>Page titles, descriptions, headings, mobile viewport, HTTPS, indexability, and initial response.</p></article></div></div></section> }

function ScoreRing({ score }: { score: number | null }) { return <div className={`score-ring score-${scoreTone(score)}`} style={{ '--score': `${(score ?? 0) * 3.6}deg` } as CSSProperties}><div><strong>{score ?? 'N/A'}</strong><span>{score === null ? 'manual review' : 'out of 100'}</span></div></div> }
function ScoreBar({ label, score }: { label: string; score: number | null }) { return <div><div><span>{label}</span><strong>{score === null ? 'Review needed' : `${score}/100`}</strong></div><div className="score-track"><span className={score === null ? 'is-limited' : ''} style={{ width: `${score ?? 100}%` }} /></div></div> }

function FindingCard({ finding, index, preview = false }: { finding: ScanFinding; index: number; preview?: boolean }) { return <article className="finding-card"><div className="finding-index">{String(index).padStart(2, '0')}</div><div className="finding-body"><div className="finding-tags"><span>{finding.impact} impact</span><span>{finding.effort} effort</span><span>{finding.source}</span></div><h3>{finding.title}</h3><p>{finding.summary}</p>{!preview && <><div className="finding-detail"><strong>What the scan found</strong><p>{finding.evidence}</p></div><div className="finding-fix"><Wrench aria-hidden="true" /><div><strong>Recommended fix</strong><p>{finding.recommendation}</p></div></div></>}</div></article> }

function FullReport({ report, emailSent, operational, setOperational, onAudit }: { report: WebsiteScanReport; emailSent: boolean; operational: OperationalAnswers; setOperational: (value: OperationalAnswers) => void; onAudit: () => void }) {
  return <div className="full-report">
    <div className="report-opened"><Mail aria-hidden="true" /><div><strong>Full report unlocked</strong><p>{emailSent ? 'A copy is on its way to your inbox.' : 'The report is open below. Email delivery was unavailable, so save this page or request a manual audit.'}</p></div></div>
    <div className="full-report-heading"><div><p className="section-label">Complete automated findings</p><h2>What to improve next</h2></div><span>{report.findings.length} opportunities found</span></div>
    <div className="all-findings">{report.findings.map((item, index) => <FindingCard key={item.id} finding={item} index={index + 1} />)}</div>
    <div className="strengths"><div><p className="section-label">What is already helping</p><h2>Strengths to preserve</h2></div><div>{report.strengths.map((item) => <article key={item.id}><CheckCircle2 aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.evidence}</p></div></article>)}</div></div>
    <div className="operational-check"><div><ClipboardCheck aria-hidden="true" /><p className="section-label">Reality check</p><h2>The website is only part of the lead journey.</h2><p>These answers are owner-reported and are not included in the automated score. They help identify what may happen after someone calls or submits a form.</p></div><div className="operational-grid"><OperationalField label="What happens to missed calls?" value={operational.missedCalls} onChange={(value) => setOperational({ ...operational, missedCalls: value })} options={['They get an automatic text', 'We call back manually', 'It varies', 'I am not sure']} /><OperationalField label="How quickly are web leads answered?" value={operational.responseTime} onChange={(value) => setOperational({ ...operational, responseTime: value })} options={['Within 5 minutes', 'Within an hour', 'Same day', 'It varies or I am not sure']} /><OperationalField label="Are unclosed estimates followed up?" value={operational.estimateFollowup} onChange={(value) => setOperational({ ...operational, estimateFollowup: value })} options={['Yes, consistently', 'Sometimes', 'Rarely', 'I am not sure']} /><OperationalField label="Are happy customers asked for reviews?" value={operational.reviewRequests} onChange={(value) => setOperational({ ...operational, reviewRequests: value })} options={['Yes, consistently', 'Sometimes', 'Rarely', 'I am not sure']} /></div></div>
    <div className="report-cta"><div><p className="section-label">Want a human review?</p><h2>Turn the report into a prioritized action plan.</h2><p>I will review the website and follow-up process in context, confirm the biggest leaks, and tell you what I would fix first.</p></div><button className="button button-primary" onClick={onAudit}>Request My Free Audit<ArrowRight aria-hidden="true" /></button></div>
    <div className="scanner-caveats"><strong>What this scan can and cannot verify</strong><ul>{report.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}</ul></div>
  </div>
}

function OperationalField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <label><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">Choose one</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label> }
