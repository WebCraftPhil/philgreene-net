import { BarChart3, Magnet, MessageCircleReply, Repeat2 } from 'lucide-react'

const outcomes = [
  {
    icon: Magnet,
    name: 'Attract',
    text: 'A clear, professional website or landing page built to generate calls and estimate requests.',
  },
  {
    icon: MessageCircleReply,
    name: 'Respond',
    text: 'Immediate confirmations, missed-call text-back, lead notifications, and appointment options.',
  },
  {
    icon: Repeat2,
    name: 'Follow up',
    text: 'Automated but natural SMS and email follow-up for inquiries, estimates, and unresponsive leads.',
  },
  {
    icon: BarChart3,
    name: 'Measure',
    text: 'A simple CRM pipeline and reporting that shows where leads came from and what happened to them.',
  },
]

export default function SolutionSection() {
  return (
    <section className="solution-section section" aria-labelledby="solution-heading">
      <div className="site-container">
        <div className="section-heading section-heading-wide">
          <h2 id="solution-heading">One system that helps you capture, follow up with, and convert more leads.</h2>
        </div>
        <div className="outcome-rail">
          {outcomes.map(({ icon: Icon, name, text }, index) => (
            <article key={name}>
              <div className="outcome-index">0{index + 1}</div>
              <Icon aria-hidden="true" />
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

