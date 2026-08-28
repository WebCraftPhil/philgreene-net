import type { AuditPrefill, PackageId } from '@/types/audit'

export type AssistantAnswers = {
  businessType: string
  websiteUrl: string
  primaryGoal: string
  problem: string
}

export const packageNames: Record<PackageId, string> = {
  website: 'High-Converting Website',
  'website-lead-capture': 'Website + Lead Capture',
  'lead-recovery-system': 'Complete Lead Recovery System',
}

export function recommendPackage(answers: AssistantAnswers): PackageId {
  if (['missed-calls', 'reviews-retention', 'multiple'].includes(answers.problem)) {
    return 'lead-recovery-system'
  }

  if (
    ['capture', 'slow-follow-up'].includes(answers.problem)
    || ['appointments', 'follow-up'].includes(answers.primaryGoal)
  ) {
    return 'website-lead-capture'
  }

  return 'website'
}

export function buildAssistantPrefill(answers: AssistantAnswers): AuditPrefill {
  const selectedPackage = recommendPackage(answers)
  const problemLabels: Record<string, string> = {
    website: 'My website feels unclear, dated, or difficult to use on mobile.',
    capture: 'Website visitors are not consistently turning into calls or form submissions.',
    'missed-calls': 'Calls or messages go unanswered when the business is busy.',
    'slow-follow-up': 'New leads and open estimates are not followed up with quickly enough.',
    'reviews-retention': 'Review requests and past-customer follow-up are inconsistent.',
    multiple: 'There are multiple gaps across the website, lead response, and follow-up process.',
  }

  return {
    websiteUrl: answers.websiteUrl,
    businessType: answers.businessType,
    problem: `${problemLabels[answers.problem] ?? answers.problem}\n\nWebsite Checkup recommendation: ${packageNames[selectedPackage]}.`,
    selectedPackage,
  }
}

