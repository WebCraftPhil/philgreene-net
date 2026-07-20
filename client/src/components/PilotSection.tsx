import { ArrowRight, Check } from 'lucide-react'
import type { PackageId } from '@/types/audit'

const packages: { id: PackageId; name: string; eyebrow: string; description: string; items: string[]; featured?: boolean }[] = [
  { id: 'website', name: 'High-Converting Website', eyebrow: 'Strong foundation', description: 'For a local business that needs a clearer, faster website built to generate action.', items: ['Conversion-focused pages', 'Mobile-first design', 'Quote and contact forms', 'Calls and booking paths', 'Local SEO foundations', 'Analytics setup'] },
  { id: 'website-lead-capture', name: 'Website + Lead Capture', eyebrow: 'Most common starting point', description: 'For a business that wants the website and the first layer of response automation working together.', featured: true, items: ['Everything in Website', 'Guided or live chat setup', 'Missed-call text-back', 'Simple CRM pipeline', 'Appointment booking', 'Follow-up sequence'] },
  { id: 'lead-recovery-system', name: 'Complete Lead Recovery System', eyebrow: 'Tailored complete system', description: 'For a business ready to connect the full customer journey and close more revenue leaks.', items: ['Everything in Lead Capture', 'Tailored AI reception options', 'Advanced follow-up workflows', 'Review-request system', 'Reactivation campaigns', 'Ongoing optimization options'] },
]

export default function PilotSection({ onSelectPackage }: { onSelectPackage: (id: PackageId) => void }) {
  return (
    <section id="packages" className="pilot-section section" aria-labelledby="packages-heading">
      <div className="site-container">
        <div className="packages-heading"><p className="section-label">Three ways to start</p><h2 id="packages-heading">Choose the scope that fits the problem.</h2><p>No generic software bundle and no public pricing guesswork. I will recommend the smallest useful scope after reviewing your current website and lead flow.</p></div>
        <div className="package-grid">{packages.map((item) => <article key={item.id} className={item.featured ? 'package-featured' : ''}><span>{item.eyebrow}</span><h3>{item.name}</h3><p>{item.description}</p><ul>{item.items.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><button className={item.featured ? 'button button-primary' : 'button button-outline'} type="button" onClick={() => onSelectPackage(item.id)}>Ask about this package <ArrowRight aria-hidden="true" /></button></article>)}</div>
        <p className="package-note">AI reception and retention tools can be added individually or included in a tailored Complete Lead Recovery System.</p>
      </div>
    </section>
  )
}
