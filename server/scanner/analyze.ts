import * as cheerio from 'cheerio'
import type { ScanFinding, ScanScore, WebsiteScanReport } from '../../shared/scanner'

type FindingInput = Omit<ScanFinding, 'source'>

const actionWords = /call|quote|estimate|book|schedule|appointment|contact|get started|request|free audit/i
const bookingWords = /calendly|acuity|book|schedule|appointment/i
const trustWords = /licensed|insured|certified|guarantee|warranty|years of experience|locally owned|family owned|award/i
const localWords = /service area|serving|near me|new hampshire|\bnh\b|manchester|city|county/i
const reviewWords = /review|testimonial|google rating|customer stories/i

function finding(input: FindingInput): ScanFinding {
  return { ...input, source: 'automated' }
}

function scoreCategory(findings: ScanFinding[], category: ScanFinding['category']) {
  const relevant = findings.filter((item) => item.category === category)
  const available = relevant.reduce((sum, item) => sum + item.pointsLost, 0)
  const lost = relevant.filter((item) => !item.passed).reduce((sum, item) => sum + item.pointsLost, 0)
  return Math.max(0, Math.round(100 - (lost / Math.max(available, 1)) * 100))
}

function rank(findings: ScanFinding[]) {
  const impact = { high: 3, medium: 2, low: 1 }
  const effort = { quick: 3, moderate: 2, project: 1 }
  return [...findings].sort((a, b) =>
    (impact[b.impact] * 10 + effort[b.effort] + b.pointsLost) - (impact[a.impact] * 10 + effort[a.effort] + a.pointsLost),
  )
}

export function analyzeWebsite(input: { requestedUrl: string; finalUrl: string; html: string; loadTimeMs: number }): WebsiteScanReport {
  const $ = cheerio.load(input.html)
  const externalScripts = $('script[src]').length
  $('script:not([type="application/ld+json"]), style, noscript, template, svg').remove()
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
  const clientRendered = bodyText.length < 120 && externalScripts > 0
  const title = $('title').first().text().trim()
  const description = $('meta[name="description"]').attr('content')?.trim() ?? ''
  const h1 = $('h1').map((_, element) => $(element).text().replace(/\s+/g, ' ').trim()).get().filter(Boolean)
  const anchorTexts = $('a, button').map((_, element) => $(element).text().replace(/\s+/g, ' ').trim()).get().filter(Boolean)
  const primaryCtas = anchorTexts.filter((text) => actionWords.test(text)).slice(0, 8)
  const phoneLinks = $('a[href^="tel:"]').length
  const emailLinks = $('a[href^="mailto:"]').length
  const forms = $('form').length
  const bookingLinks = $('a[href]').filter((_, element) => bookingWords.test($(element).attr('href') ?? '') || bookingWords.test($(element).text())).length
  const jsonLd = $('script[type="application/ld+json"]').map((_, element) => $(element).text()).get().join(' ')
  const hasLocalBusinessSchema = /LocalBusiness|ProfessionalService|HomeAndConstructionBusiness/i.test(jsonLd)
  const hasViewport = Boolean($('meta[name="viewport"]').attr('content'))
  const hasRobotsMetaBlock = /noindex|nofollow/i.test($('meta[name="robots"]').attr('content') ?? '')
  const heroText = $('main section, header + section, body').first().text().replace(/\s+/g, ' ').trim().slice(0, 900)
  const clearOffer = actionWords.test(heroText) && heroText.length >= 80
  const hasServiceForm = forms > 0 || bookingLinks > 0
  const hasContactPath = phoneLinks > 0 || emailLinks > 0 || hasServiceForm
  const reviewMentions = (bodyText.match(new RegExp(reviewWords, 'gi')) ?? []).length
  const trustMentions = (bodyText.match(new RegExp(trustWords, 'gi')) ?? []).length
  const localMentions = (bodyText.match(new RegExp(localWords, 'gi')) ?? []).length

  const findings: ScanFinding[] = [
    finding({ id: 'clear-offer', category: 'lead-capture', title: clearOffer ? 'The opening message points toward action' : 'Clarify the offer and next step above the fold', summary: clearOffer ? 'Visitors see an offer and an action-oriented path early.' : 'A busy prospect should understand what you do, who you serve, and what to do next within a few seconds.', evidence: clearOffer ? 'The opening content includes service and action language.' : 'The first major content block did not combine a clear service message with an action.', recommendation: 'Use one plain-language headline, one short supporting paragraph, and one primary call or estimate button near the top.', impact: 'high', effort: 'quick', pointsLost: 18, passed: clearOffer }),
    finding({ id: 'phone-link', category: 'lead-capture', title: phoneLinks ? 'Visitors can tap to call' : 'Add a tap-to-call path', summary: phoneLinks ? 'At least one direct phone link is present.' : 'Mobile visitors should not need to copy and paste a phone number.', evidence: phoneLinks ? `${phoneLinks} tap-to-call link${phoneLinks === 1 ? '' : 's'} found.` : 'No tel: link was found in the page HTML.', recommendation: 'Put a clearly labeled Call button in the header and repeat it near high-intent sections.', impact: 'high', effort: 'quick', pointsLost: 14, passed: phoneLinks > 0 }),
    finding({ id: 'lead-form', category: 'lead-capture', title: hasServiceForm ? 'A form or booking path is available' : 'Give visitors a form or booking option', summary: hasServiceForm ? 'The page provides an alternative to calling.' : 'Some good prospects will not call, especially after hours.', evidence: hasServiceForm ? `${forms} form${forms === 1 ? '' : 's'} and ${bookingLinks} booking link${bookingLinks === 1 ? '' : 's'} found.` : 'No form or recognizable booking link was found.', recommendation: 'Add a short estimate or appointment form with an immediate confirmation and clear response expectation.', impact: 'high', effort: 'moderate', pointsLost: 18, passed: hasServiceForm }),
    finding({ id: 'cta-language', category: 'lead-capture', title: primaryCtas.length ? 'Calls to action use specific language' : 'Replace vague links with specific calls to action', summary: primaryCtas.length ? 'Action-oriented link or button text was found.' : 'Specific CTA language helps visitors confidently take the next step.', evidence: primaryCtas.length ? `Examples found: ${primaryCtas.slice(0, 3).join(', ')}.` : 'No recognizable call, quote, estimate, booking, or contact CTA text was found.', recommendation: 'Use labels such as Request an Estimate, Book an Appointment, or Call Now.', impact: 'medium', effort: 'quick', pointsLost: 10, passed: primaryCtas.length > 0 }),
    finding({ id: 'contact-options', category: 'lead-capture', title: hasContactPath ? 'At least one contact path is visible' : 'Create an obvious contact path', summary: hasContactPath ? 'The page offers a detectable way to make contact.' : 'A service website needs at least one low-friction way to start a conversation.', evidence: `${phoneLinks} phone, ${emailLinks} email, ${forms} form, and ${bookingLinks} booking paths found.`, recommendation: 'Offer two complementary options, usually tap-to-call plus a short form.', impact: 'high', effort: 'quick', pointsLost: 10, passed: hasContactPath }),
    finding({ id: 'reviews', category: 'trust-local', title: reviewMentions ? 'Customer proof is referenced' : 'Add honest customer proof', summary: reviewMentions ? 'The page references reviews, testimonials, or customer stories.' : 'Local buyers often look for reassurance before calling an unfamiliar company.', evidence: reviewMentions ? `${reviewMentions} review or testimonial reference${reviewMentions === 1 ? '' : 's'} found.` : 'No review, testimonial, rating, or customer-story language was detected.', recommendation: 'Feature real reviews with names or source attribution. Do not use anonymous or invented testimonials.', impact: 'high', effort: 'moderate', pointsLost: 18, passed: reviewMentions > 0 }),
    finding({ id: 'credentials', category: 'trust-local', title: trustMentions ? 'Business credibility signals are present' : 'Show the trust signals customers verify', summary: trustMentions ? 'The page includes at least one credential or reassurance signal.' : 'Credentials and practical assurances reduce the risk of reaching out.', evidence: trustMentions ? `${trustMentions} trust-signal phrase${trustMentions === 1 ? '' : 's'} found.` : 'No detectable licensed, insured, certified, guarantee, warranty, or experience language was found.', recommendation: 'Add only accurate credentials, guarantees, years of experience, and photos of real work.', impact: 'medium', effort: 'quick', pointsLost: 14, passed: trustMentions > 0 }),
    finding({ id: 'local-relevance', category: 'trust-local', title: localMentions ? 'The page signals a local service area' : 'Make the service area unmistakable', summary: localMentions ? 'Local or service-area language appears in the page.' : 'Visitors and search engines need to know where the business works.', evidence: localMentions ? `${localMentions} local or service-area reference${localMentions === 1 ? '' : 's'} found.` : 'No recognizable local or service-area language was detected.', recommendation: 'Name the primary city or region naturally in the headline, service copy, footer, and contact details.', impact: 'high', effort: 'quick', pointsLost: 18, passed: localMentions > 0 }),
    finding({ id: 'local-schema', category: 'trust-local', title: hasLocalBusinessSchema ? 'Local business structured data is present' : 'Add local business structured data', summary: hasLocalBusinessSchema ? 'A relevant Schema.org business type was detected.' : 'Structured data helps search engines interpret the business and service area.', evidence: hasLocalBusinessSchema ? 'LocalBusiness, ProfessionalService, or a related type was found in JSON-LD.' : 'No relevant LocalBusiness JSON-LD type was found.', recommendation: 'Add accurate LocalBusiness or ProfessionalService JSON-LD without invented ratings, hours, or addresses.', impact: 'medium', effort: 'quick', pointsLost: 12, passed: hasLocalBusinessSchema }),
    finding({ id: 'page-title', category: 'technical', title: title.length >= 20 && title.length <= 65 ? 'The page title is useful and scannable' : 'Improve the page title', summary: title ? 'The title exists but may be too short or long.' : 'The page needs a descriptive title for search results and browser tabs.', evidence: title ? `Title is ${title.length} characters: “${title.slice(0, 100)}”.` : 'No page title was found.', recommendation: 'Use a unique 35 to 60 character title combining the core service, location, and business name naturally.', impact: 'medium', effort: 'quick', pointsLost: 14, passed: title.length >= 20 && title.length <= 65 }),
    finding({ id: 'meta-description', category: 'technical', title: description.length >= 70 && description.length <= 170 ? 'The search description is in a useful range' : 'Write a stronger search description', summary: description ? 'A meta description exists but may not communicate enough.' : 'A clear description can improve how the page appears in search.', evidence: description ? `Description is ${description.length} characters.` : 'No meta description was found.', recommendation: 'Summarize the service, service area, and next step in roughly 120 to 160 characters.', impact: 'medium', effort: 'quick', pointsLost: 10, passed: description.length >= 70 && description.length <= 170 }),
    finding({ id: 'heading', category: 'technical', title: h1.length === 1 ? 'The page has one primary heading' : 'Use one clear primary heading', summary: h1.length === 1 ? 'The HTML has a single H1.' : 'A clean heading structure makes the page easier to scan and interpret.', evidence: `${h1.length} H1 heading${h1.length === 1 ? '' : 's'} found.`, recommendation: 'Use one descriptive H1 for the main offer, then organize sections with H2 headings.', impact: 'medium', effort: 'quick', pointsLost: 10, passed: h1.length === 1 }),
    finding({ id: 'viewport', category: 'technical', title: hasViewport ? 'Mobile viewport configuration is present' : 'Add mobile viewport configuration', summary: hasViewport ? 'The page declares a mobile viewport.' : 'Missing viewport configuration can make pages unusable on phones.', evidence: hasViewport ? 'A viewport meta tag was found.' : 'No viewport meta tag was found.', recommendation: 'Add width=device-width, initial-scale=1 to the document head.', impact: 'high', effort: 'quick', pointsLost: 16, passed: hasViewport }),
    finding({ id: 'https', category: 'technical', title: input.finalUrl.startsWith('https:') ? 'The scanned page uses HTTPS' : 'Secure the website with HTTPS', summary: input.finalUrl.startsWith('https:') ? 'The final page loaded over HTTPS.' : 'Visitors should never submit lead information over an unsecured connection.', evidence: `Final address: ${input.finalUrl}`, recommendation: 'Enable HTTPS and redirect all HTTP requests to the secure version.', impact: 'high', effort: 'moderate', pointsLost: 18, passed: input.finalUrl.startsWith('https:') }),
    finding({ id: 'indexability', category: 'technical', title: !hasRobotsMetaBlock ? 'No page-level index block was detected' : 'Remove the search-engine index block if unintended', summary: !hasRobotsMetaBlock ? 'The homepage is not explicitly marked noindex or nofollow.' : 'The homepage tells search engines not to index or follow it.', evidence: hasRobotsMetaBlock ? 'A noindex or nofollow robots meta directive was found.' : 'No blocking robots meta directive was found.', recommendation: 'Remove noindex or nofollow from the public homepage unless the block is intentional.', impact: 'high', effort: 'quick', pointsLost: 16, passed: !hasRobotsMetaBlock }),
    finding({ id: 'response-time', category: 'technical', title: input.loadTimeMs < 2500 ? 'The server returned the page promptly' : 'Investigate slow initial response', summary: input.loadTimeMs < 2500 ? 'The quick scan received the HTML in a reasonable time.' : 'Slow server response can lose impatient mobile visitors.', evidence: `HTML response completed in about ${(input.loadTimeMs / 1000).toFixed(1)} seconds from the scanner.`, recommendation: 'Review hosting, redirects, caching, and server work. Confirm with field data before making major performance changes.', impact: input.loadTimeMs > 5000 ? 'high' : 'medium', effort: 'moderate', pointsLost: 16, passed: input.loadTimeMs < 2500 }),
  ]

  const leadCapture = clientRendered ? null : scoreCategory(findings, 'lead-capture')
  const trustLocal = clientRendered ? null : scoreCategory(findings, 'trust-local')
  const technical = scoreCategory(findings, 'technical')
  const score: ScanScore = { overall: clientRendered ? null : Math.round((leadCapture ?? 0) * 0.45 + (trustLocal ?? 0) * 0.35 + technical * 0.2), leadCapture, trustLocal, technical }
  const visibleFindings = clientRendered ? findings.filter((item) => item.category === 'technical' && item.id !== 'heading') : findings
  const failed = rank(visibleFindings.filter((item) => !item.passed))
  const manualFinding = finding({ id: 'rendered-review', category: 'lead-capture', title: 'Run a rendered customer-journey review', summary: 'This website loads most visible content after JavaScript runs, so the quick HTML scan cannot honestly grade its calls to action, forms, or trust signals.', evidence: 'The initial page HTML contains an application shell but very little visible content.', recommendation: 'Review the rendered mobile page and test every call, form, confirmation, notification, and booking path manually.', impact: 'high', effort: 'moderate', pointsLost: 0, passed: false })
  manualFinding.source = 'manual-review'
  const reportFindings = clientRendered ? [manualFinding, ...failed] : failed
  const strengths = rank(visibleFindings.filter((item) => item.passed)).slice(0, 5)

  return {
    version: 1,
    requestedUrl: input.requestedUrl,
    scannedUrl: input.finalUrl,
    scannedAt: new Date().toISOString(),
    score,
    facts: { title, description, h1, phoneLinks, emailLinks, forms, bookingLinks, primaryCtas, reviewMentions, trustMentions, localMentions, hasLocalBusinessSchema, hasViewport, hasHttps: input.finalUrl.startsWith('https:'), hasRobotsMetaBlock, hasSitemap: null, hasRobotsTxt: null, fetchedUrl: input.finalUrl, loadTimeMs: input.loadTimeMs, clientRendered },
    topFindings: reportFindings.slice(0, 3),
    findings: reportFindings,
    strengths,
    caveats: [
      'This automated check reads the homepage HTML. It does not submit forms, place calls, or verify that follow-up automations work.',
      clientRendered ? 'This site loads its visible content after JavaScript runs, so conversion and trust signals require a rendered manual review.' : 'Some content loaded only after JavaScript runs may not appear in this quick scan.',
      'Recommendations are starting points. A manual customer-journey review can confirm context and priority.',
    ],
  }
}
