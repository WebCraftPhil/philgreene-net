import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { applyRouteMeta, findRouteMeta } from '../server/route-meta'

test('projects and about route metadata are crawler-visible in the HTML shell', async () => {
  const indexHtml = await fs.readFile(path.resolve(process.cwd(), 'client', 'index.html'), 'utf-8')
  const projectsMeta = findRouteMeta('/projects')
  const aboutMeta = findRouteMeta('/about')

  assert.ok(projectsMeta)
  assert.ok(aboutMeta)

  const html = applyRouteMeta(indexHtml, projectsMeta)
  assert.match(html, /<title>Projects &amp; Case Studies \| Phil Greene<\/title>/)
  assert.match(html, /<link rel="canonical" href="https:\/\/philgreene\.net\/projects" \/>/)
})
