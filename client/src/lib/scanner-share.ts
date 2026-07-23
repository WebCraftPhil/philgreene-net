export const PUBLIC_SCANNER_URL = 'https://philgreene.net/website-checkup'

export const SCANNER_SHARE_TITLE = 'Free Website Checkup'
export const SCANNER_SHARE_TEXT = 'I found this free website checkup that shows where a business website may be losing leads. Try yours here:'
export const SCANNER_FORWARD_SUBJECT = 'Free website checkup'
export const SCANNER_FORWARD_BODY = `I found this free website checkup that may help us identify where the website is losing leads. You can run it here: ${PUBLIC_SCANNER_URL}`

export type ScannerReportState = 'preview' | 'unlocked'
export type ScannerShareMethod = 'web_share' | 'clipboard' | 'manual' | 'mailto'

export function buildScannerShareData(): ShareData {
  return {
    title: SCANNER_SHARE_TITLE,
    text: SCANNER_SHARE_TEXT,
    url: PUBLIC_SCANNER_URL,
  }
}

export function buildScannerForwardMailto() {
  const subject = encodeURIComponent(SCANNER_FORWARD_SUBJECT)
  const body = encodeURIComponent(SCANNER_FORWARD_BODY)
  return `mailto:?subject=${subject}&body=${body}`
}

export function buildScannerShareEventProps(input: {
  shareMethod: ScannerShareMethod
  pageLocation: string
  reportState: ScannerReportState
  webShareSupported: boolean
  clipboardSupported: boolean
}) {
  return {
    share_method: input.shareMethod,
    page_location: input.pageLocation,
    report_state: input.reportState,
    web_share_supported: input.webShareSupported,
    clipboard_supported: input.clipboardSupported,
  }
}

export function isShareCancellation(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}
