import { test, expect } from '@playwright/test'

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

const topFinding = {
  id: 'lead-form', category: 'lead-capture', source: 'automated', title: 'Give visitors a form or booking option',
  summary: 'Some good prospects will not call, especially after hours.', evidence: 'No form was found.',
  recommendation: 'Add a short estimate form with an immediate confirmation.', impact: 'high', effort: 'moderate', pointsLost: 18, passed: false,
}

const scanReport = {
  version: 1, requestedUrl: 'https://roofer.example/', scannedUrl: 'https://roofer.example/', scannedAt: '2026-07-21T12:00:00.000Z',
  score: { overall: 62, leadCapture: 48, trustLocal: 65, technical: 88 },
  facts: { title: 'Roofer', description: '', h1: ['Roofing'], phoneLinks: 1, emailLinks: 0, forms: 0, bookingLinks: 0, primaryCtas: ['Call'], reviewMentions: 1, trustMentions: 1, localMentions: 1, hasLocalBusinessSchema: false, hasViewport: true, hasHttps: true, hasRobotsMetaBlock: false, hasSitemap: null, hasRobotsTxt: null, fetchedUrl: 'https://roofer.example/', loadTimeMs: 300, clientRendered: false },
  topFindings: [topFinding], findings: [topFinding], strengths: [{ ...topFinding, id: 'phone', title: 'Visitors can tap to call', passed: true }],
  caveats: ['This automated check does not submit forms.'],
}

async function mockScanner(page: import('@playwright/test').Page) {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', (route) => route.fulfill({
    contentType: 'application/javascript',
    body: `window.turnstile={render:function(el,o){setTimeout(function(){o.callback('test-token')},0);return'test-widget'},remove:function(){},reset:function(){}}`,
  }))
  await page.route('**/api/scan', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, reportToken: 'test-report-token-that-is-long-enough', preview: { requestedUrl: scanReport.requestedUrl, scannedUrl: scanReport.scannedUrl, scannedAt: scanReport.scannedAt, score: scanReport.score, topFindings: scanReport.topFindings, caveats: scanReport.caveats } }) }))
  await page.route('**/api/scan-report', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, report: scanReport, emailSent: true }) }))
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
  await expect(page.getByRole('heading', { name: 'Give visitors a form or booking option' })).toBeVisible()
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
