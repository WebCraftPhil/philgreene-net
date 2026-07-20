export type PackageId = 'website' | 'website-lead-capture' | 'lead-recovery-system'

export type AuditPrefill = {
  websiteUrl: string
  businessType: string
  problem: string
  selectedPackage?: PackageId
}

