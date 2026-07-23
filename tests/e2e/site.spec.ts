import { test, expect } from '@playwright/test'
import type { FindingCategory, FindingSource, ScanFinding, WebsiteScanReport, ScanScore, PageFacts } from '../../shared/scanner'

const baseURL = 'http://127.0.0.1:4173'

test('desktop conversion path has no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(baseURL)
  await expect(page.getByRole('heading', { level: 1, name: 'Better Websites. More Calls. More Booked Jobs.' })).toBeVisible()
  await expect(page).toHaveTitle('Local Business Websites & Automation | Phil Greene')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://philgreene.net/')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://philgreene.net/og-image.png')
  const schema = await page.locator('script[data-dynamic-schema]').textContent()
  expect(schema).toContain('Google review request systems')
  await page.getByRole('link', { name: 'See Where Leads Get Lost' }).click()
  await expect(page.getByRole('heading', { name: /Every avoidable dead end/ })).toBeInViewport()
  for (const id of ['websites', 'how-it-works', 'automation', 'packages', 'work', 'about', 'audit']) await expect(page.locator(`#${id}`)).toBeAttached()
  expect(errors).toEqual([])
})

test('mobile menu opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
})

test('audit form sends the intended fields and shows success', async ({ page }) => {
  let body: Record<string, string> | undefined
  await page.route('**/api/contact', async (route) => {
    body = route.request().postDataJSON() as Record<string, string>
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.goto(`${baseURL}/#audit`)
  await page.getByLabel('Name *', { exact: true }).fill('Sam Owner')
  await page.getByLabel('Business name *', { exact: true }).fill('Sam Service Co')
  await page.getByLabel('Email *', { exact: true }).fill('sam@example.com')
  await page.getByLabel('Phone *', { exact: true }).fill('603-555-0123')
  await page.getByLabel('Website URL', { exact: true }).fill('https://example.com')
  await page.locator('select[name="businessType"]').selectOption('Plumbing')
  await page.getByLabel('Biggest website, lead-capture, or follow-up problem *', { exact: true }).fill('Calls get missed while the team is on a job site.')
  await page.locator('select[name="preferredContact"]').selectOption('Email')
  await page.getByRole('button', { name: 'Get My Free Website Audit' }).click()
  await expect(page.getByRole('heading', { name: 'Your audit request is in.' })).toBeVisible()
  expect(body?.businessName).toBe('Sam Service Co')
  expect(body?.preferredContact).toBe('Email')
})

test('work and demonstrations route renders', async ({ page }) => {
  await page.goto(`${baseURL}/projects`)
  await expect(page.getByRole('heading', { level: 1, name: 'Practical examples of websites, automation, and customer journeys.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Analytics and reporting' })).toBeVisible()
})

const topFinding: ScanFinding = {
  id: 'lead-form', category: 'lead-capture' as FindingCategory, outcomeCategory: 'Get More Leads', source: 'automated' as FindingSource, title: 'Make it easy to request a quote or book',
  summary: 'Some good prospects will not call, especially after hours. A short form or booking path gives them another way in.', evidence: 'No form was found.',
  recommendation: 'Add a short estimate form with an immediate confirmation.', technicalLabel: 'Lead form or booking path', implementationFit: 'Phil can implement', impact: 'high', effort: 'moderate', pointsLost: 18, passed: false,
}

const scanReportFacts: PageFacts = {
  title: 'Roofer', description: '', h1: ['Roofing'], phoneLinks: 1, emailLinks: 0, forms: 0, bookingLinks: 0, primaryCtas: ['Call'], reviewMentions: 1, trustMentions: 1, localMentions: 1, hasLocalBusinessSchema: false, hasViewport: true, hasHttps: true, hasRobotsMetaBlock: false, hasSitemap: null, hasRobotsTxt: null, fetchedUrl: 'https://roofer.example/', loadTimeMs: 300, clientRendered: false,
}

const scanReportScore: ScanScore = { overall: 62, leadCapture: 48, trustLocal: 65, technical: 88 }

const scanReport: WebsiteScanReport = {
  version: 1,
  requestedUrl: 'https://roofer.example/',
  scannedUrl: 'https://roofer.example/',
  scannedAt: '2026-07-21T12:00:00.000Z',
  score: scanReportScore,
  facts: scanReportFacts,
  factsSummary: [
    { label: 'Phone call path', value: '1 tap-to-call link', status: 'good' },
    { label: 'Quote or contact form', value: '0 forms', status: 'warning' },
  ],
  quickWins: [topFinding],
  leadPathSummary: 'The homepage points visitors toward tap-to-call, but customer trust proof may be missing.',
  topFindings: [topFinding],
  findings: [topFinding],
  strengths: [{
    id: 'phone',
    category: 'lead-capture' as FindingCategory,
    outcomeCategory: 'Get More Leads',
    source: 'automated' as FindingSource,
    title: 'Visitors can tap to call from a phone',
    summary: '',
    evidence: '',
    recommendation: '',
    implementationFit: 'Phil can implement',
    impact: 'low',
    effort: 'quick',
    pointsLost: 0,
    passed: true,
  }],
  caveats: ['This automated check does not submit forms.'],
}

async function mockScanner(page: import('@playwright/test').Page) {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: `window.turnstile={render:function(el,o){setTimeout(function(){o.callback('test-token')},0);return'test-widget'},remove:function(){},reset:function(){}}`,
  }))
  await page.route('**/api/scan', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, reportToken: 'test-report-token-that-is-long-enough', preview: { requestedUrl: scanReport.requestedUrl, scannedUrl: scanReport.scannedUrl, scannedAt: scanReport.scannedAt, score: scanReport.score, factsSummary: scanReport.factsSummary, quickWins: scanReport.quickWins, leadPathSummary: scanReport.leadPathSummary, topFindings: scanReport.topFindings, caveats: scanReport.caveats } }) }))
  await page.route('**/api/scan-report', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, report: scanReport, emailSent: true }) }))
}

async function installAnalyticsSpy(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    Object.assign(window, {
      __analyticsEvents: [],
      plausible: (event: string, options?: { props?: Record<string, string | number | boolean> }) => {
        const store = (window as unknown as { __analyticsEvents: { event: string; props?: Record<string, string | number | boolean> }[] }).__analyticsEvents
        store.push({ event, props: options?.props })
      },
    })
  })
}

async function installShareMocks(page: import('@playwright/test').Page, mode: 'success' | 'cancel' | 'failure' | 'clipboard' | 'clipboard-failure' | 'unsupported') {
  await page.addInitScript((shareMode) => {
    Object.assign(window, { __shareCalls: [], __clipboardWrites: [] })
    const win = window as unknown as { __shareCalls: ShareData[]; __clipboardWrites: string[] }

    if (shareMode === 'success') {
      Object.defineProperty(navigator, 'share', { configurable: true, value: async (data: ShareData) => { win.__shareCalls.push(data) } })
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value: string) => { win.__clipboardWrites.push(value) } } })
      return
    }

    if (shareMode === 'cancel') {
      Object.defineProperty(navigator, 'share', { configurable: true, value: async (data: ShareData) => { win.__shareCalls.push(data); throw new DOMException('cancelled', 'AbortError') } })
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value: string) => { win.__clipboardWrites.push(value) } } })
      return
    }

    if (shareMode === 'failure') {
      Object.defineProperty(navigator, 'share', { configurable: true, value: async (data: ShareData) => { win.__shareCalls.push(data); throw new Error('share unavailable') } })
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value: string) => { win.__clipboardWrites.push(value) } } })
      return
    }

    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined })
    if (shareMode === 'clipboard' || shareMode === 'clipboard-failure') {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (value: string) => {
            if (shareMode === 'clipboard-failure') throw new Error('copy unavailable')
            win.__clipboardWrites.push(value)
          },
        },
      })
      return
    }

    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined })
  }, mode)
}

async function runMockedScanner(page: import('@playwright/test').Page) {
  await mockScanner(page)
  await page.goto(`${baseURL}/website-checkup`)
  await page.getByLabel('Website address').fill('roofer.example')
  const scanButton = page.getByRole('button', { name: 'Scan My Website' })
  await expect(scanButton).toBeEnabled()
  await scanButton.click()
  await expect(page.getByRole('heading', { name: 'Know someone whose website could be getting more leads?' })).toBeVisible()
}

test('Website Checkup scans, unlocks the report, and prefills the audit', async ({ page }) => {
  await mockScanner(page)
  await page.goto(`${baseURL}/website-checkup`)
  await expect(page).toHaveTitle('Free Website Lead Checkup | Phil Greene')
  await page.getByLabel('Website address').fill('roofer.example')
  const scanButton = page.getByRole('button', { name: 'Scan My Website' })
  await expect(scanButton).toBeEnabled()
  await scanButton.click()
  await expect(page.getByText('62')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Make it easy to request a quote or book' }).first()).toBeVisible()
  await expect(page.getByText('Get More Leads').first()).toBeVisible()
  await expect(page.getByText('Phil can implement').first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Know someone whose website could be getting more leads?' })).toBeVisible()
  await expect(page.getByText('https://philgreene.net/website-checkup')).toBeVisible()
  await page.getByLabel('Name *').fill('Sam Owner')
  await page.getByLabel('Email *').fill('sam@example.com')
  await page.getByLabel('Business name').fill('Sam Roofing')
  await page.getByLabel('Type of business').fill('Roofing')
  await page.getByRole('button', { name: 'Show My Full Report' }).click()
  await expect(page.getByText('A copy is on its way to your inbox.')).toBeVisible()
  await page.getByRole('button', { name: 'Request My Free Audit' }).click()
  await expect(page).toHaveURL(`${baseURL}/#audit`)
  await expect(page.getByLabel('Website URL', { exact: true })).toHaveValue('https://roofer.example/')
  await expect(page.locator('select[name="businessType"]')).toHaveValue('Roofing')
  await expect(page.locator('textarea[name="problem"]')).toHaveValue(/Website checkup score: 62\/100/)
})

test('Website Checkup has no mobile overflow and shows useful scan errors', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', (route) => route.fulfill({ contentType: 'application/javascript', body: `window.turnstile={render:function(el,o){setTimeout(function(){o.callback('test-token')},0);return'test-widget'},remove:function(){},reset:function(){}}` }))
  await page.route('**/api/scan', (route) => route.fulfill({ status: 422, contentType: 'application/json', body: '{"error":"That website could not be found. Check the address and try again."}' }))
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${baseURL}/website-checkup`)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
  await page.getByLabel('Website address').fill('missing.example')
  const scanButton = page.getByRole('button', { name: 'Scan My Website' })
  await expect(scanButton).toBeEnabled()
  await scanButton.click()
  await expect(page.getByRole('alert')).toContainText('That website could not be found')
})

test('Website Checkup shares the public scanner URL with Web Share API', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'success')
  await runMockedScanner(page)
  await page.getByRole('button', { name: 'Share this free checkup' }).click()
  await expect(page.getByRole('status')).toContainText('Nothing from your scan was included.')

  const state = await page.evaluate(() => ({
    shareCalls: (window as unknown as { __shareCalls: ShareData[] }).__shareCalls,
    events: (window as unknown as { __analyticsEvents: { event: string; props?: Record<string, string | number | boolean> }[] }).__analyticsEvents,
  }))

  expect(state.shareCalls).toHaveLength(1)
  expect(state.shareCalls[0]).toEqual({
    title: 'Free Website Checkup',
    text: 'I found this free website checkup that shows where a business website may be losing leads. Try yours here:',
    url: 'https://philgreene.net/website-checkup',
  })
  expect(JSON.stringify(state.shareCalls)).not.toContain('roofer.example')
  expect(JSON.stringify(state.shareCalls)).not.toContain('62')
  expect(state.events.map((item) => item.event)).toContain('scanner_share_clicked')
  expect(state.events.map((item) => item.event)).toContain('scanner_share_completed')
  expect(state.events.find((item) => item.event === 'scanner_share_clicked')?.props).toMatchObject({ share_method: 'web_share', report_state: 'preview', page_location: '/website-checkup', web_share_supported: true })
})

test('Website Checkup treats Web Share cancellation as non-alarming', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'cancel')
  await runMockedScanner(page)
  await page.getByRole('button', { name: 'Share this free checkup' }).click()
  await expect(page.getByRole('status')).toContainText('Share cancelled. Nothing was sent.')

  const events = await page.evaluate(() => (window as unknown as { __analyticsEvents: { event: string }[] }).__analyticsEvents.map((item) => item.event))
  expect(events).toContain('scanner_share_cancelled')
  expect(events).not.toContain('scanner_share_failed')
})

test('Website Checkup falls back to clipboard after Web Share failure', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'failure')
  await runMockedScanner(page)
  await page.getByRole('button', { name: 'Share this free checkup' }).click()
  await expect(page.getByRole('status')).toContainText('Link copied. You can send it anywhere.')

  const state = await page.evaluate(() => ({
    clipboardWrites: (window as unknown as { __clipboardWrites: string[] }).__clipboardWrites,
    events: (window as unknown as { __analyticsEvents: { event: string }[] }).__analyticsEvents.map((item) => item.event),
  }))
  expect(state.clipboardWrites).toEqual(['https://philgreene.net/website-checkup'])
  expect(state.events).toContain('scanner_share_failed')
  expect(state.events).toContain('scanner_link_copied')
})

test('Website Checkup copies the public link when Web Share is unavailable', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'clipboard')
  await runMockedScanner(page)
  await page.getByRole('button', { name: 'Share this free checkup' }).click()
  await expect(page.getByRole('status')).toContainText('Link copied. You can send it anywhere.')

  const state = await page.evaluate(() => ({
    clipboardWrites: (window as unknown as { __clipboardWrites: string[] }).__clipboardWrites,
    events: (window as unknown as { __analyticsEvents: { event: string; props?: Record<string, string | number | boolean> }[] }).__analyticsEvents,
  }))
  expect(state.clipboardWrites).toEqual(['https://philgreene.net/website-checkup'])
  expect(state.events.find((item) => item.event === 'scanner_share_clicked')?.props).toMatchObject({ share_method: 'clipboard', clipboard_supported: true, web_share_supported: false })
  expect(state.events.map((item) => item.event)).toContain('scanner_link_copied')
})

test('Website Checkup handles clipboard failure with a manual link fallback', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'clipboard-failure')
  await runMockedScanner(page)
  await page.getByRole('button', { name: 'Copy checkup link' }).click()
  await expect(page.getByRole('status')).toContainText('I could not copy it automatically.')
  await expect(page.getByRole('link', { name: 'https://philgreene.net/website-checkup' })).toBeVisible()

  const events = await page.evaluate(() => (window as unknown as { __analyticsEvents: { event: string }[] }).__analyticsEvents.map((item) => item.event))
  expect(events).toContain('scanner_link_copy_failed')
})

test('Website Checkup handles browsers without share or clipboard support', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'unsupported')
  await runMockedScanner(page)
  await page.getByRole('button', { name: 'Share this free checkup' }).click()
  await expect(page.getByRole('status')).toContainText('Copying is not available here.')
  await expect(page.getByRole('link', { name: 'https://philgreene.net/website-checkup' })).toBeVisible()

  const event = await page.evaluate(() => (window as unknown as { __analyticsEvents: { event: string; props?: Record<string, string | number | boolean> }[] }).__analyticsEvents.find((item) => item.event === 'scanner_link_copy_failed'))
  expect(event?.props).toMatchObject({ share_method: 'manual', clipboard_supported: false, web_share_supported: false })
})

test('Website Checkup website-manager email action shares no private result data', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'clipboard')
  await runMockedScanner(page)
  const link = page.getByRole('link', { name: 'Send this to the person who manages my website' })
  const href = decodeURIComponent(await link.getAttribute('href') ?? '')

  expect(href).toContain('mailto:?subject=Free website checkup&body=')
  expect(href).toContain('https://philgreene.net/website-checkup')
  expect(href).not.toContain('roofer.example')
  expect(href).not.toContain('62')
  expect(href).not.toContain('Sam Owner')
  await link.click()
  const events = await page.evaluate(() => (window as unknown as { __analyticsEvents: { event: string }[] }).__analyticsEvents.map((item) => item.event))
  expect(events).toContain('scanner_email_forward_clicked')
})

test('Website Checkup share section works by keyboard and fits on mobile', async ({ page }) => {
  await installAnalyticsSpy(page)
  await installShareMocks(page, 'clipboard')
  await page.setViewportSize({ width: 390, height: 844 })
  await runMockedScanner(page)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)

  await page.getByRole('button', { name: 'Share this free checkup' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toContainText('Link copied. You can send it anywhere.')
})
