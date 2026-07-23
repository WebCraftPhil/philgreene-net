import type { WebsiteScanReport } from '../../shared/scanner.js'

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

function scoreLabel(score: number | null) {
  if (score === null) return 'Limited automated scan. Rendered review required.'
  if (score >= 80) return 'Strong foundation'
  if (score >= 60) return 'Useful foundation with clear opportunities'
  return 'Important lead-path gaps to address'
}

export function createVisitorReportEmail(report: WebsiteScanReport, name: string) {
  const scoreText = report.score.overall === null ? 'Not scored' : `${report.score.overall}/100`
  const findingsText = report.findings.slice(0, 8).map((item, index) => `${index + 1}. ${item.title}\n${item.recommendation}`).join('\n\n')
  const findingsHtml = report.findings.slice(0, 8).map((item) => `<li style="margin-bottom:18px"><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.recommendation)}</li>`).join('')
  return {
    subject: `Your website lead checkup: ${scoreText}`,
    text: `Hi ${name},\n\nYour website checkup for ${report.scannedUrl}: ${scoreLabel(report.score.overall)}\n\nLead capture: ${report.score.leadCapture === null ? 'Manual review required' : `${report.score.leadCapture}/100`}\nTrust and local relevance: ${report.score.trustLocal === null ? 'Manual review required' : `${report.score.trustLocal}/100`}\nTechnical essentials: ${report.score.technical}/100\n\nFix these first:\n\n${findingsText}\n\nThis automated check reads homepage HTML and does not submit forms or verify follow-up systems. If you want a manual review, request a free audit at https://philgreene.net/#audit.\n\nPhil Greene\nme@philgreene.net`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#12212f;max-width:680px;margin:auto"><p>Hi ${escapeHtml(name)},</p><h1 style="font-size:26px">Your website lead checkup</h1><p><a href="${escapeHtml(report.scannedUrl)}">${escapeHtml(report.scannedUrl)}</a></p><div style="background:#f4f1ea;padding:22px;border-radius:14px"><strong style="font-size:34px;color:#b84d22">${scoreText}</strong><p style="margin-bottom:0">${scoreLabel(report.score.overall)}</p></div><p><strong>Lead capture:</strong> ${report.score.leadCapture === null ? 'Manual review required' : `${report.score.leadCapture}/100`}<br><strong>Trust and local relevance:</strong> ${report.score.trustLocal === null ? 'Manual review required' : `${report.score.trustLocal}/100`}<br><strong>Technical essentials:</strong> ${report.score.technical}/100</p><h2>Fix these first</h2><ol>${findingsHtml}</ol><p style="font-size:13px;color:#5f6b73">This automated check reads homepage HTML and does not submit forms or verify follow-up systems.</p><p><a href="https://philgreene.net/#audit">Request a free manual audit</a></p><p>Phil Greene<br><a href="mailto:me@philgreene.net">me@philgreene.net</a></p></div>`,
  }
}

export function createOwnerLeadEmail(report: WebsiteScanReport, input: { name: string; email: string; businessName: string; businessType: string }) {
  const scoreText = report.score.overall === null ? 'Not scored (client-rendered)' : `${report.score.overall}/100`
  const top = report.topFindings.map((item) => `- ${item.title}`).join('\n')
  return {
    subject: `Scanner lead: ${input.businessName || input.name} (${scoreText})`,
    text: `New website scanner lead\n\nName: ${input.name}\nEmail: ${input.email}\nBusiness: ${input.businessName || 'Not provided'}\nBusiness type: ${input.businessType || 'Not provided'}\nWebsite: ${report.scannedUrl}\nScore: ${scoreText}\n\nTop findings:\n${top}\n\nScanned: ${report.scannedAt}`,
    html: `<h2>New website scanner lead</h2><p><strong>Name:</strong> ${escapeHtml(input.name)}<br><strong>Email:</strong> ${escapeHtml(input.email)}<br><strong>Business:</strong> ${escapeHtml(input.businessName || 'Not provided')}<br><strong>Business type:</strong> ${escapeHtml(input.businessType || 'Not provided')}<br><strong>Website:</strong> <a href="${escapeHtml(report.scannedUrl)}">${escapeHtml(report.scannedUrl)}</a><br><strong>Score:</strong> ${scoreText}</p><h3>Top findings</h3><ul>${report.topFindings.map((item) => `<li>${escapeHtml(item.title)}</li>`).join('')}</ul><p><small>Scanned: ${escapeHtml(report.scannedAt)}</small></p>`,
  }
}
