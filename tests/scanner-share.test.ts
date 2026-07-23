import assert from 'node:assert/strict'
import test from 'node:test'
import {
  PUBLIC_SCANNER_URL,
  SCANNER_FORWARD_BODY,
  buildScannerForwardMailto,
  buildScannerShareData,
  buildScannerShareEventProps,
  isShareCancellation,
} from '../client/src/lib/scanner-share'

const privateValues = [
  'https://private-business.example/report?id=secret',
  '62/100',
  'Sam Owner',
  'sam@example.com',
  'test-report-token-that-is-long-enough',
  'Make it easy to request a quote or book',
]

test('scanner share uses the canonical public scanner URL', () => {
  assert.equal(PUBLIC_SCANNER_URL, 'https://philgreene.net/website-checkup')
  assert.equal(buildScannerShareData().url, PUBLIC_SCANNER_URL)
})

test('share payload does not include private scan or report data', () => {
  const payload = JSON.stringify(buildScannerShareData())

  for (const value of privateValues) {
    assert.equal(payload.includes(value), false, value)
  }
})

test('website-manager email payload does not include private scan or report data', () => {
  const href = buildScannerForwardMailto()
  const decoded = decodeURIComponent(href)

  assert.match(decoded, /^mailto:\?subject=Free website checkup&body=/)
  assert.ok(decoded.includes(PUBLIC_SCANNER_URL))
  assert.equal(SCANNER_FORWARD_BODY.includes(PUBLIC_SCANNER_URL), true)
  for (const value of privateValues) {
    assert.equal(decoded.includes(value), false, value)
  }
})

test('share analytics props are limited to safe non-identifying values', () => {
  const props = buildScannerShareEventProps({
    shareMethod: 'web_share',
    pageLocation: '/website-checkup',
    reportState: 'preview',
    webShareSupported: true,
    clipboardSupported: false,
  })

  assert.deepEqual(Object.keys(props).sort(), ['clipboard_supported', 'page_location', 'report_state', 'share_method', 'web_share_supported'])
  assert.equal(JSON.stringify(props).includes('roofer.example'), false)
  assert.equal(JSON.stringify(props).includes('62/100'), false)
})

test('only AbortError is treated as a cancelled Web Share action', () => {
  assert.equal(isShareCancellation(new DOMException('cancelled', 'AbortError')), true)
  assert.equal(isShareCancellation(new DOMException('not allowed', 'NotAllowedError')), false)
  assert.equal(isShareCancellation(new Error('failed')), false)
})
