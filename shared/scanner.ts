import { z } from 'zod'

export const scanRequestSchema = z.object({
  url: z.string().trim().min(3).max(500),
  turnstileToken: z.string().trim().min(1).max(2048),
})

export const reportRequestSchema = z.object({
  reportToken: z.string().trim().min(20).max(100_000),
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('A valid email is required').max(180),
  businessName: z.string().trim().max(120).optional().default(''),
  businessType: z.string().trim().max(100).optional().default(''),
  companyWebsite: z.string().max(0).optional().default(''),
  turnstileToken: z.string().trim().min(1).max(2048),
})

export type FindingCategory = 'lead-capture' | 'trust-local' | 'technical'
export type FindingSource = 'automated' | 'owner-reported' | 'manual-review'

export type ScanFinding = {
  id: string
  category: FindingCategory
  source: FindingSource
  title: string
  summary: string
  evidence: string
  recommendation: string
  impact: 'high' | 'medium' | 'low'
  effort: 'quick' | 'moderate' | 'project'
  pointsLost: number
  passed: boolean
}

export type ScanScore = {
  overall: number | null
  leadCapture: number | null
  trustLocal: number | null
  technical: number
}

export type PageFacts = {
  title: string
  description: string
  h1: string[]
  phoneLinks: number
  emailLinks: number
  forms: number
  bookingLinks: number
  primaryCtas: string[]
  reviewMentions: number
  trustMentions: number
  localMentions: number
  hasLocalBusinessSchema: boolean
  hasViewport: boolean
  hasHttps: boolean
  hasRobotsMetaBlock: boolean
  hasSitemap: boolean | null
  hasRobotsTxt: boolean | null
  fetchedUrl: string
  loadTimeMs: number
  clientRendered: boolean
}

export type FactSummaryItem = {
  label: string
  value: string
  status: 'good' | 'warning' | 'neutral'
}

export type WebsiteScanReport = {
  version: 1
  requestedUrl: string
  scannedUrl: string
  scannedAt: string
  score: ScanScore
  facts: PageFacts
  factsSummary: FactSummaryItem[]
  quickWins: ScanFinding[]
  leadPathSummary: string
  topFindings: ScanFinding[]
  findings: ScanFinding[]
  strengths: ScanFinding[]
  caveats: string[]
}

export type ScanResponse = {
  ok: true
  reportToken: string
  preview: Pick<WebsiteScanReport, 'requestedUrl' | 'scannedUrl' | 'scannedAt' | 'score' | 'factsSummary' | 'quickWins' | 'leadPathSummary' | 'topFindings' | 'caveats'>
}

export type ReportResponse = {
  ok: true
  report: WebsiteScanReport
  emailSent: boolean
}

export function scannerErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The scan could not be completed.'
}
