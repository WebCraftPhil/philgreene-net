import { test, expect } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173'

test('home page renders personal brand and navigates without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', (error) => errors.push(error.message))

  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto(baseURL)

  await expect(
    page.getByRole('heading', { level: 1, name: /Curious by nature\./ })
  ).toBeVisible()
  await expect(page).toHaveTitle(/Phil Greene/)

  for (const linkText of ['About', 'Projects', 'Writing', 'Now', 'Résumé', 'Contact']) {
    await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: linkText })).toBeVisible()
  }

  expect(errors).toEqual([])
})

test('theme toggle switches between light and dark mode and persists', async ({ page }) => {
  await page.goto(baseURL)
  const toggle = page.getByRole('button', { name: /Switch to (light|dark) theme/ })
  await expect(toggle).toBeVisible()

  const initialDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  await toggle.click()
  const afterClickDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  expect(afterClickDark).toBe(!initialDark)

  await page.reload()
  const afterReloadDark = await page.evaluate(() => document.documentElement.classList.contains('dark'))
  expect(afterReloadDark).toBe(afterClickDark)
})

test('mobile menu opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
})

test('projects filter and case study detail route render', async ({ page }) => {
  await page.goto(`${baseURL}/projects`)
  await expect(page.getByRole('heading', { level: 1, name: 'Selected Projects' })).toBeVisible()

  await page.getByRole('button', { name: 'Hardware & Lab' }).click()
  await expect(page.getByRole('heading', { name: 'Raspberry Pi 5 & Hailo-10H Local AI Lab' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Tableau Superstore Sales Analysis' })).toBeHidden()

  await page.getByRole('link', { name: 'Raspberry Pi 5 & Hailo-10H Local AI Lab' }).click()
  await expect(page).toHaveURL(/\/projects\/raspberry-pi-5-hailo-10h-local-ai-lab/)
  await expect(page.getByRole('heading', { level: 1, name: 'Raspberry Pi 5 & Hailo-10H Local AI Lab' })).toBeVisible()
})

test('writing, now, and resume routes render', async ({ page }) => {
  await page.goto(`${baseURL}/writing`)
  await expect(page.getByRole('heading', { level: 1, name: 'Essays & Field Notes' })).toBeVisible()

  await page.goto(`${baseURL}/now`)
  await expect(page.getByRole('heading', { level: 1, name: 'Current Focus' })).toBeVisible()

  await page.goto(`${baseURL}/resume`)
  await expect(page.getByRole('heading', { level: 1, name: 'Phillip Greene' })).toBeVisible()
})

test('legacy /website-checkup redirects to Iron & Ink Systems case study', async ({ page }) => {
  await page.goto(`${baseURL}/website-checkup`)
  await expect(page).toHaveURL(/\/projects\/iron-and-ink-systems/)
  await expect(page.getByRole('heading', { level: 1, name: 'Iron & Ink Systems' })).toBeVisible()
})

test('contact form submits personal inquiry and shows confirmation', async ({ page }) => {
  let body: Record<string, string> | undefined
  await page.route('**/api/contact', async (route) => {
    body = route.request().postDataJSON() as Record<string, string>
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })

  await page.goto(`${baseURL}/contact`)
  await page.getByLabel('Name *').fill('Alex Morgan')
  await page.getByLabel('Email *').fill('alex@example.com')
  await page.getByLabel('Topic').selectOption('AI & Automation')
  await page.getByLabel('Message *').fill('Would love to chat about your n8n and local AI workflows.')
  await page.getByRole('button', { name: 'Send Message' }).click()

  await expect(page.getByRole('heading', { name: 'Message received.' })).toBeVisible()
  expect(body?.name).toBe('Alex Morgan')
  expect(body?.topic).toBe('AI & Automation')
})
