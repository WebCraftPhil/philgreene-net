import { useTrackedSection } from '@/hooks/use-tracked-section'

const steps = [
  {
    title: 'Find the leaks',
    text: 'Review the current website, calls, forms, response process, and follow-up gaps.',
  },
  {
    title: 'Build the system',
    text: 'Set up the necessary website pages, forms, CRM stages, automations, and booking tools.',
  },
  {
    title: 'Test the customer journey',
    text: 'Verify that calls, forms, texts, emails, notifications, and appointments work correctly.',
  },
  {
    title: 'Measure and improve',
    text: 'Review lead activity, bookings, response speed, and conversion outcomes.',
  },
]

export default function ProcessSection() {
  const sectionRef = useTrackedSection('workflow_viewed')

  return (
    <section ref={sectionRef} id="how-it-works" className="process-section section" aria-labelledby="process-heading">
      <div className="site-container process-grid">
        <div className="section-heading process-intro">
          <h2 id="process-heading">How the Lead Recovery System comes together</h2>
          <p>No giant software rollout. We focus on the leaks that matter, connect the right pieces, and test the full journey.</p>
        </div>
        <ol className="process-list">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="process-number">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

