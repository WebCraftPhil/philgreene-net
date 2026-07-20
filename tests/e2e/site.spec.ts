import { test, expect } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173'

test('desktop conversion path has no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(baseURL)
  await expect(page.getByRole('heading', { level: 1, name: 'Stop Losing Good Leads to Slow Follow-Up' })).toBeVisible()
  await page.getByRole('link', { name: 'See How It Works' }).click()
  await expect(page.getByRole('heading', { name: 'How the Lead Recovery System comes together' })).toBeInViewport()
  for (const id of ['services', 'who-its-for', 'about', 'audit']) await expect(page.locator(`#${id}`)).toBeAttached()
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
  await page.getByLabel('Biggest lead-generation or follow-up problem *', { exact: true }).fill('Calls get missed while the team is on a job site.')
  await page.locator('select[name="preferredContact"]').selectOption('Email')
  await page.getByRole('button', { name: 'Request My Free Audit' }).click()
  await expect(page.getByRole('heading', { name: 'Your audit request is in.' })).toBeVisible()
  expect(body?.businessName).toBe('Sam Service Co')
  expect(body?.preferredContact).toBe('Email')
})

test('technical work route renders', async ({ page }) => {
  await page.goto(`${baseURL}/projects`)
  await expect(page.getByRole('heading', { level: 1, name: 'Technical work organized around business capability' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Analytics and reporting' })).toBeVisible()
})
