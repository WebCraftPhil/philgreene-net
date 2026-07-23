import * as cheerio from 'cheerio'
import type { BusinessOutcomeCategory, FactSummaryItem, ImplementationFit, PageFacts, ScanFinding, ScanScore, WebsiteScanReport } from '../../shared/scanner.js'

type FindingInput = Omit<ScanFinding, 'source'>
type RecommendationCopy = {
  outcomeCategory: BusinessOutcomeCategory
  implementationFit: ImplementationFit
  technicalLabel?: string
  passTitle: string
  failTitle: string
  passSummary: string
  failSummary: string
  passRecommendation: string
  failRecommendation: string
}

const actionWords = /call|quote|estimate|book|schedule|appointment|contact|get started|request|free audit/i
const bookingWords = /calendly|acuity|book|schedule|appointment/i
const trustWords = /licensed|insured|certified|guarantee|warranty|years of experience|locally owned|family owned|award/i
const localWords = /service area|serving|near me|new hampshire|\bnh\b|manchester|city|county/i
const reviewWords = /review|testimonial|google rating|customer stories/i

function finding(input: FindingInput): ScanFinding {
  return { ...input, source: 'automated' }
}

const recommendationCopy = {
  'clear-offer': {
    outcomeCategory: 'Get More Leads',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Above-the-fold offer clarity',
    passTitle: 'Visitors can quickly understand the offer',
    failTitle: 'Make the next step obvious',
    passSummary: 'The opening section gives visitors a clear reason to act.',
    failSummary: 'A busy prospect should quickly understand what you do, who you help, and what to do next.',
    passRecommendation: 'Keep the headline, supporting copy, and main action focused on the customer’s next step.',
    failRecommendation: 'Use one clear headline, one short supporting sentence, and one primary call or quote button near the top.',
  },
  'phone-link': {
    outcomeCategory: 'Get More Leads',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Tap-to-call link',
    passTitle: 'Visitors can tap to call from a phone',
    failTitle: 'Make it easy to call from a phone',
    passSummary: 'Mobile visitors have a direct way to start a call.',
    failSummary: 'Many local customers are on their phones. A tap-to-call button reduces friction when they are ready to talk.',
    passRecommendation: 'Keep the call option visible in the header and near high-intent sections.',
    failRecommendation: 'Put a clearly labeled Call button in the header and repeat it near high-intent sections.',
  },
  'lead-form': {
    outcomeCategory: 'Get More Leads',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Lead form or booking path',
    passTitle: 'Visitors have a way to request help without calling',
    failTitle: 'Make it easy to request a quote or book',
    passSummary: 'The page gives prospects an option when they cannot or do not want to call.',
    failSummary: 'Some good prospects will not call, especially after hours. A short form or booking path gives them another way in.',
    passRecommendation: 'Keep the form short, mobile-friendly, and connected to a clear response process.',
    failRecommendation: 'Add a short estimate or appointment form with an immediate confirmation and clear response expectation.',
  },
  'cta-language': {
    outcomeCategory: 'Make the Website Easier to Use',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Call-to-action wording',
    passTitle: 'Buttons tell visitors what happens next',
    failTitle: 'Use buttons that say what happens next',
    passSummary: 'Action-oriented button and link text helps visitors move forward confidently.',
    failSummary: 'Vague button text can make ready-to-buy visitors hesitate or miss the contact path.',
    passRecommendation: 'Keep button labels specific to the action the customer wants to take.',
    failRecommendation: 'Use labels such as Request an Estimate, Book an Appointment, or Call Now.',
  },
  'contact-options': {
    outcomeCategory: 'Get More Leads',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Contact path coverage',
    passTitle: 'Visitors have a clear way to reach you',
    failTitle: 'Give customers more than one way to reach you',
    passSummary: 'The page includes at least one detectable contact option.',
    failSummary: 'A service website needs a low-friction way to start a conversation before the visitor leaves.',
    passRecommendation: 'Keep the contact option easy to find on mobile and desktop.',
    failRecommendation: 'Offer two complementary options, usually tap-to-call plus a short form.',
  },
  reviews: {
    outcomeCategory: 'Build Customer Trust',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Review or testimonial mentions',
    passTitle: 'Visitors can see proof from customers',
    failTitle: 'Show proof from real customers',
    passSummary: 'The page references reviews, testimonials, or customer stories.',
    failSummary: 'Local buyers often look for reassurance before contacting a company they do not know.',
    passRecommendation: 'Keep reviews honest, specific, and easy to verify when possible.',
    failRecommendation: 'Feature real reviews with names or source attribution. Do not use anonymous or invented testimonials.',
  },
  credentials: {
    outcomeCategory: 'Build Customer Trust',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Credential and reassurance signals',
    passTitle: 'Visitors can see reasons to trust the business',
    failTitle: 'Give visitors a reason to trust you',
    passSummary: 'The page includes at least one credential or reassurance signal.',
    failSummary: 'Accurate credentials and practical assurances can reduce hesitation before someone calls or requests a quote.',
    passRecommendation: 'Keep trust signals accurate and close to the contact path.',
    failRecommendation: 'Add only accurate credentials, guarantees, years of experience, and photos of real work.',
  },
  'local-relevance': {
    outcomeCategory: 'Improve Google Visibility',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Service-area language',
    passTitle: 'Customers can tell where you work',
    failTitle: 'Show customers where you work',
    passSummary: 'Local or service-area language appears on the page.',
    failSummary: 'Visitors and search engines need to understand the cities or region the business serves.',
    passRecommendation: 'Keep the service area visible in natural page copy, not only buried in the footer.',
    failRecommendation: 'Name the primary city or region naturally in the headline, service copy, footer, and contact details.',
  },
  'local-schema': {
    outcomeCategory: 'Improve Google Visibility',
    implementationFit: 'Phil can implement',
    technicalLabel: 'LocalBusiness schema',
    passTitle: 'Google can read key business details',
    failTitle: 'Help Google understand your business',
    passSummary: 'The page includes behind-the-scenes business details that search engines can read.',
    failSummary: 'Clear business details may help search engines understand your services, location, and service area.',
    passRecommendation: 'Keep this information accurate and avoid adding ratings, hours, or addresses that are not true.',
    failRecommendation: 'Add accurate LocalBusiness code behind the scenes. Do not invent ratings, hours, or addresses.',
  },
  'page-title': {
    outcomeCategory: 'Improve Google Visibility',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Page title',
    passTitle: 'The search title is clear',
    failTitle: 'Make your search result easier to understand',
    passSummary: 'The page title is a useful length for search results and browser tabs.',
    failSummary: 'A clear title helps people understand the page before they click from search results.',
    passRecommendation: 'Keep the title specific to the service, location, and business name.',
    failRecommendation: 'Use a unique 35 to 60 character title combining the core service, location, and business name naturally.',
  },
  'meta-description': {
    outcomeCategory: 'Improve Google Visibility',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Meta description',
    passTitle: 'The search description gives useful context',
    failTitle: 'Give searchers a reason to click',
    passSummary: 'The page has a search description in a useful range.',
    failSummary: 'A clear search description can explain the service, area, and next step before someone visits the site.',
    passRecommendation: 'Keep the description focused on the customer’s problem, service area, and next step.',
    failRecommendation: 'Summarize the service, service area, and next step in roughly 120 to 160 characters.',
  },
  heading: {
    outcomeCategory: 'Make the Website Easier to Use',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Primary H1 heading',
    passTitle: 'The page has one clear main heading',
    failTitle: 'Make the page easier to scan',
    passSummary: 'The page has one primary heading for the main topic.',
    failSummary: 'A clear heading structure helps visitors and search engines understand the page faster.',
    passRecommendation: 'Keep one main heading and organize the rest of the page with clear section headings.',
    failRecommendation: 'Use one descriptive main heading for the offer, then organize sections with supporting headings.',
  },
  viewport: {
    outcomeCategory: 'Make the Website Easier to Use',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Mobile viewport',
    passTitle: 'The page is set up for mobile screens',
    failTitle: 'Make the site work properly on phones',
    passSummary: 'The page includes the basic mobile setup browsers expect.',
    failSummary: 'A missing mobile setup can make pages hard to read or use on a phone.',
    passRecommendation: 'Keep mobile sizing intact and test the main call and form paths on a real phone.',
    failRecommendation: 'Add the standard mobile viewport setting so the page scales correctly on phones.',
  },
  https: {
    outcomeCategory: 'Build Customer Trust',
    implementationFit: 'Phil can implement',
    technicalLabel: 'HTTPS',
    passTitle: 'The website loads securely',
    failTitle: 'Make the website feel safe to use',
    passSummary: 'The scanned page loaded over a secure connection.',
    failSummary: 'Visitors should not be asked to share contact details on an unsecured page.',
    passRecommendation: 'Keep secure redirects in place so visitors always reach the safe version.',
    failRecommendation: 'Enable HTTPS and redirect all regular HTTP visits to the secure version.',
  },
  indexability: {
    outcomeCategory: 'Improve Google Visibility',
    implementationFit: 'Phil can implement',
    technicalLabel: 'Robots index setting',
    passTitle: 'The page is not blocking search engines',
    failTitle: 'Make sure Google is allowed to show the page',
    passSummary: 'The homepage is not explicitly telling search engines to stay away.',
    failSummary: 'If this block is accidental, the page may be much harder for customers to find in search.',
    passRecommendation: 'Keep search blocking off for public pages that should bring in leads.',
    failRecommendation: 'Remove the search-engine block from the public homepage unless it is intentional.',
  },
  'response-time': {
    outcomeCategory: 'Improve Website Performance',
    implementationFit: 'Needs manual review',
    technicalLabel: 'Initial server response',
    passTitle: 'The page responded quickly',
    failTitle: 'Help the page load before visitors give up',
    passSummary: 'The scanner received the page in a reasonable time.',
    failSummary: 'A slow first load can cause impatient mobile visitors to leave before they see the phone number or form.',
    passRecommendation: 'Keep monitoring page speed, especially on mobile connections.',
    failRecommendation: 'Review hosting, redirects, caching, and server work. Confirm with field data before making major performance changes.',
  },
  'rendered-review': {
    outcomeCategory: 'Get More Leads',
    implementationFit: 'Needs manual review',
    technicalLabel: 'Rendered customer journey',
    passTitle: 'Rendered page review complete',
    failTitle: 'Review the real page visitors see',
    passSummary: 'The visible page can be reviewed after scripts run.',
    failSummary: 'This site loads most visible content after scripts run, so the quick scan cannot honestly grade calls, forms, or trust proof.',
    passRecommendation: 'Keep testing the real customer journey from a phone.',
    failRecommendation: 'Review the rendered mobile page and test every call, form, confirmation, notification, and booking path manually.',
  },
} satisfies Record<string, RecommendationCopy>

function copyFor(id: keyof typeof recommendationCopy, passed: boolean) {
  const copy = recommendationCopy[id]
  return {
    outcomeCategory: copy.outcomeCategory,
    implementationFit: copy.implementationFit,
    technicalLabel: copy.technicalLabel,
    title: passed ? copy.passTitle : copy.failTitle,
    summary: passed ? copy.passSummary : copy.failSummary,
    recommendation: passed ? copy.passRecommendation : copy.failRecommendation,
  }
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

function countLabel(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

function buildLeadPathSummary(facts: PageFacts) {
  if (facts.clientRendered) return 'The visible page needs a manual review before the customer path can be scored.'

  const contactPaths: string[] = []
  if (facts.phoneLinks > 0) contactPaths.push('tap-to-call')
  if (facts.forms > 0) contactPaths.push('contact form')
  if (facts.bookingLinks > 0) contactPaths.push('booking path')
  if (!contactPaths.length && facts.emailLinks > 0) contactPaths.push('email link')

  if (!contactPaths.length) return 'No clear way to call, book, or send a request was found.'

  const trustGap = facts.reviewMentions === 0 && facts.trustMentions === 0 ? ', but customer trust proof may be missing' : ''
  return `The homepage points visitors toward ${contactPaths.join(' and ')}${trustGap}.`
}

function buildFactsSummary(facts: PageFacts): FactSummaryItem[] {
  return [
    { label: 'Phone call path', value: countLabel(facts.phoneLinks, 'tap-to-call link'), status: facts.phoneLinks > 0 ? 'good' : 'warning' },
    { label: 'Quote or contact form', value: countLabel(facts.forms, 'form'), status: facts.forms > 0 ? 'good' : 'warning' },
    { label: 'Booking option', value: countLabel(facts.bookingLinks, 'booking link'), status: facts.bookingLinks > 0 ? 'good' : 'neutral' },
    { label: 'Button text found', value: facts.primaryCtas.length ? facts.primaryCtas.slice(0, 2).join(', ') : 'None detected', status: facts.primaryCtas.length ? 'good' : 'warning' },
    { label: 'Review proof', value: String(facts.reviewMentions), status: facts.reviewMentions > 0 ? 'good' : 'warning' },
    { label: 'Trust proof', value: String(facts.trustMentions), status: facts.trustMentions > 0 ? 'good' : 'warning' },
    { label: 'Local service area', value: String(facts.localMentions), status: facts.localMentions > 0 ? 'good' : 'warning' },
    { label: 'Search title', value: facts.title ? `${facts.title.length} characters` : 'Missing', status: facts.title ? 'good' : 'warning' },
    { label: 'Search description', value: facts.description ? `${facts.description.length} characters` : 'Missing', status: facts.description ? 'good' : 'warning' },
    { label: 'Mobile setup', value: facts.hasViewport ? 'Present' : 'Missing', status: facts.hasViewport ? 'good' : 'warning' },
    { label: 'HTTPS', value: facts.hasHttps ? 'Yes' : 'No', status: facts.hasHttps ? 'good' : 'warning' },
    { label: 'Initial load', value: `${(facts.loadTimeMs / 1000).toFixed(1)}s`, status: facts.loadTimeMs < 2500 ? 'good' : 'warning' },
  ]
}

function selectQuickWins(findings: ScanFinding[]) {
  const priority = ['clear-offer', 'phone-link', 'contact-options', 'local-relevance', 'credentials', 'cta-language', 'local-schema', 'page-title', 'meta-description', 'heading', 'viewport', 'indexability']
  const candidates = findings.filter((item) => item.effort === 'quick' && ['high', 'medium'].includes(item.impact))
  return [...candidates]
    .sort((a, b) => {
      const aIndex = priority.indexOf(a.id)
      const bIndex = priority.indexOf(b.id)
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
    })
    .slice(0, 3)
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
    finding({ id: 'clear-offer', category: 'lead-capture', ...copyFor('clear-offer', clearOffer), evidence: clearOffer ? 'The opening content includes service and action language.' : 'The first major content block did not combine a clear service message with an action.', impact: 'high', effort: 'quick', pointsLost: 18, passed: clearOffer }),
    finding({ id: 'phone-link', category: 'lead-capture', ...copyFor('phone-link', phoneLinks > 0), evidence: phoneLinks ? `${phoneLinks} tap-to-call link${phoneLinks === 1 ? '' : 's'} found.` : 'No tap-to-call link was found in the page code.', impact: 'high', effort: 'quick', pointsLost: 14, passed: phoneLinks > 0 }),
    finding({ id: 'lead-form', category: 'lead-capture', ...copyFor('lead-form', hasServiceForm), evidence: hasServiceForm ? `${forms} form${forms === 1 ? '' : 's'} and ${bookingLinks} booking link${bookingLinks === 1 ? '' : 's'} found.` : 'No form or recognizable booking link was found.', impact: 'high', effort: 'moderate', pointsLost: 18, passed: hasServiceForm }),
    finding({ id: 'cta-language', category: 'lead-capture', ...copyFor('cta-language', primaryCtas.length > 0), evidence: primaryCtas.length ? `Examples found: ${primaryCtas.slice(0, 3).join(', ')}.` : 'No recognizable call, quote, estimate, booking, or contact button text was found.', impact: 'medium', effort: 'quick', pointsLost: 10, passed: primaryCtas.length > 0 }),
    finding({ id: 'contact-options', category: 'lead-capture', ...copyFor('contact-options', hasContactPath), evidence: `${phoneLinks} phone, ${emailLinks} email, ${forms} form, and ${bookingLinks} booking paths found.`, impact: 'high', effort: 'quick', pointsLost: 10, passed: hasContactPath }),
    finding({ id: 'reviews', category: 'trust-local', ...copyFor('reviews', reviewMentions > 0), evidence: reviewMentions ? `${reviewMentions} review or testimonial reference${reviewMentions === 1 ? '' : 's'} found.` : 'No review, testimonial, rating, or customer-story language was detected.', impact: 'high', effort: 'moderate', pointsLost: 18, passed: reviewMentions > 0 }),
    finding({ id: 'credentials', category: 'trust-local', ...copyFor('credentials', trustMentions > 0), evidence: trustMentions ? `${trustMentions} trust-signal phrase${trustMentions === 1 ? '' : 's'} found.` : 'No detectable licensed, insured, certified, guarantee, warranty, or experience language was found.', impact: 'medium', effort: 'quick', pointsLost: 14, passed: trustMentions > 0 }),
    finding({ id: 'local-relevance', category: 'trust-local', ...copyFor('local-relevance', localMentions > 0), evidence: localMentions ? `${localMentions} local or service-area reference${localMentions === 1 ? '' : 's'} found.` : 'No recognizable local or service-area language was detected.', impact: 'high', effort: 'quick', pointsLost: 18, passed: localMentions > 0 }),
    finding({ id: 'local-schema', category: 'trust-local', ...copyFor('local-schema', hasLocalBusinessSchema), evidence: hasLocalBusinessSchema ? 'LocalBusiness, ProfessionalService, or a related type was found in behind-the-scenes page code.' : 'No relevant LocalBusiness code was found.', impact: 'medium', effort: 'quick', pointsLost: 12, passed: hasLocalBusinessSchema }),
    finding({ id: 'page-title', category: 'technical', ...copyFor('page-title', title.length >= 20 && title.length <= 65), evidence: title ? `Title is ${title.length} characters: "${title.slice(0, 100)}".` : 'No page title was found.', impact: 'medium', effort: 'quick', pointsLost: 14, passed: title.length >= 20 && title.length <= 65 }),
    finding({ id: 'meta-description', category: 'technical', ...copyFor('meta-description', description.length >= 70 && description.length <= 170), evidence: description ? `Description is ${description.length} characters.` : 'No search description was found.', impact: 'medium', effort: 'quick', pointsLost: 10, passed: description.length >= 70 && description.length <= 170 }),
    finding({ id: 'heading', category: 'technical', ...copyFor('heading', h1.length === 1), evidence: `${h1.length} main heading${h1.length === 1 ? '' : 's'} found.`, impact: 'medium', effort: 'quick', pointsLost: 10, passed: h1.length === 1 }),
    finding({ id: 'viewport', category: 'technical', ...copyFor('viewport', hasViewport), evidence: hasViewport ? 'The standard mobile screen setting was found.' : 'The standard mobile screen setting was not found.', impact: 'high', effort: 'quick', pointsLost: 16, passed: hasViewport }),
    finding({ id: 'https', category: 'technical', ...copyFor('https', input.finalUrl.startsWith('https:')), evidence: `Final address: ${input.finalUrl}`, impact: 'high', effort: 'moderate', pointsLost: 18, passed: input.finalUrl.startsWith('https:') }),
    finding({ id: 'indexability', category: 'technical', ...copyFor('indexability', !hasRobotsMetaBlock), evidence: hasRobotsMetaBlock ? 'A page setting was found that can tell search engines not to show or follow the page.' : 'No page-level search blocking setting was found.', impact: 'high', effort: 'quick', pointsLost: 16, passed: !hasRobotsMetaBlock }),
    finding({ id: 'response-time', category: 'technical', ...copyFor('response-time', input.loadTimeMs < 2500), evidence: `Initial page response completed in about ${(input.loadTimeMs / 1000).toFixed(1)} seconds from the scanner.`, impact: input.loadTimeMs > 5000 ? 'high' : 'medium', effort: 'moderate', pointsLost: 16, passed: input.loadTimeMs < 2500 }),
  ]

  const leadCapture = clientRendered ? null : scoreCategory(findings, 'lead-capture')
  const trustLocal = clientRendered ? null : scoreCategory(findings, 'trust-local')
  const technical = scoreCategory(findings, 'technical')
  const score: ScanScore = { overall: clientRendered ? null : Math.round((leadCapture ?? 0) * 0.45 + (trustLocal ?? 0) * 0.35 + technical * 0.2), leadCapture, trustLocal, technical }
  const visibleFindings = clientRendered ? findings.filter((item) => item.category === 'technical' && item.id !== 'heading') : findings
  const failed = rank(visibleFindings.filter((item) => !item.passed))
  const manualFinding = finding({ id: 'rendered-review', category: 'lead-capture', ...copyFor('rendered-review', false), evidence: 'The initial page code contains an application shell but very little visible content.', impact: 'high', effort: 'moderate', pointsLost: 0, passed: false })
  manualFinding.source = 'manual-review'
  const reportFindings = clientRendered ? [manualFinding, ...failed] : failed
  const strengths = rank(visibleFindings.filter((item) => item.passed)).slice(0, 5)
  const facts: PageFacts = { title, description, h1, phoneLinks, emailLinks, forms, bookingLinks, primaryCtas, reviewMentions, trustMentions, localMentions, hasLocalBusinessSchema, hasViewport, hasHttps: input.finalUrl.startsWith('https:'), hasRobotsMetaBlock, hasSitemap: null, hasRobotsTxt: null, fetchedUrl: input.finalUrl, loadTimeMs: input.loadTimeMs, clientRendered }
  const quickWins = selectQuickWins(reportFindings)

  return {
    version: 1,
    requestedUrl: input.requestedUrl,
    scannedUrl: input.finalUrl,
    scannedAt: new Date().toISOString(),
    score,
    facts,
    factsSummary: buildFactsSummary(facts),
    quickWins,
    leadPathSummary: buildLeadPathSummary(facts),
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
