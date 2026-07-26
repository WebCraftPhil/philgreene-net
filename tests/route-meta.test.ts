import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { applyRouteMeta, findRouteMeta } from '../server/route-meta'

test('website-checkup route metadata is crawler-visible in the HTML shell', () => {
  const meta = findRouteMeta('/website-checkup')
  assert.ok(meta)

  const html = fs.readFileSync(path.resolve(process.cwd(), 'client', 'index.html'), 'utf-8')
  const routeHtml = applyRouteMeta(html, meta)

  assert.match(routeHtml, /<title>Free Website Lead Checkup \| Phil Greene<\/title>/)
  assert.match(routeHtml, /<link rel="canonical" href="https:\/\/philgreene\.net\/website-checkup" \/>/)
  assert.match(routeHtml, /<meta property="og:url" content="https:\/\/philgreene\.net\/website-checkup" \/>/)
  assert.match(routeHtml, /<meta property="og:title" content="Free Website Lead Checkup \| Phil Greene" \/>/)
  assert.match(routeHtml, /<meta name="twitter:title" content="Free Website Lead Checkup \| Phil Greene" \/>/)
  assert.match(routeHtml, /<meta name="twitter:url" content="https:\/\/philgreene\.net\/website-checkup" \/>/)
  assert.match(routeHtml, /<meta property="og:image" content="https:\/\/philgreene\.net\/og-image\.png" \/>/)
  assert.doesNotMatch(routeHtml, /<meta property="og:url" content="https:\/\/philgreene\.net\/" \/>/)
})
