import { Bot, CalendarClock, CircleHelp, MessagesSquare, PhoneCall, UserRoundCheck } from 'lucide-react'

const upgrades = [
  [PhoneCall, 'AI receptionist', 'Answer routine calls and collect useful details when a person is unavailable.'],
  [Bot, 'AI phone agent', 'Handle defined call flows with clear boundaries and escalation rules.'],
  [MessagesSquare, 'AI SMS assistant', 'Continue simple conversations and help leads reach the next step.'],
  [CalendarClock, 'Appointment scheduling', 'Offer available times during a call or message conversation.'],
  [CircleHelp, 'FAQ automation', 'Answer common service, area, and process questions consistently.'],
  [UserRoundCheck, 'Human handoff', 'Route nuanced, urgent, or high-value conversations to a person.'],
] as const

export default function AiReceptionSection() {
  return (
    <section className="upgrade-section section" aria-labelledby="ai-heading">
      <div className="site-container">
        <div className="upgrade-heading"><p className="section-label">Premium upgrade</p><h2 id="ai-heading">AI reception and customer communication—when the use case is right.</h2><p>These tools can extend coverage and response speed. I treat them as a tailored upgrade with human handoff, not a replacement for good service or a blanket promise.</p></div>
        <div className="upgrade-grid">{upgrades.map(([Icon, title, text]) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>
  )
}
