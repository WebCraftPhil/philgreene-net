import { ClipboardX, FileWarning, MessagesSquare, PhoneOff, Smartphone, StarOff } from 'lucide-react'

const leaks = [
  { icon: Smartphone, title: 'Weak mobile experience', text: 'Slow pages and awkward layouts make it hard to call, request a quote, or understand what you do.' },
  { icon: FileWarning, title: 'Unclear next steps', text: 'Visitors leave when the offer, service area, and calls to action are difficult to find.' },
  { icon: PhoneOff, title: 'Missed calls', text: 'The crew is working, driving, or already helping a customer when a valuable call comes in.' },
  { icon: ClipboardX, title: 'Abandoned forms', text: 'Long, generic forms lose people before they ever become an opportunity.' },
  { icon: MessagesSquare, title: 'Slow follow-up', text: 'A good lead waits while a faster competitor starts the conversation.' },
  { icon: StarOff, title: 'Missing review requests', text: 'Happy customers move on without an easy, well-timed reminder to share their experience.' },
]

export default function ProblemSection() {
  return (
    <section id="customer-loss" className="problem-section section" aria-labelledby="problem-heading">
      <div className="site-container">
        <div className="section-heading problem-heading">
          <p className="section-label">Where are you losing customers?</p>
          <h2 id="problem-heading">Every avoidable dead end gives a good customer another reason to choose a competitor.</h2>
          <p>It often starts on the website—but it continues through missed calls, unclear forms, delayed replies, and forgotten follow-up.</p>
        </div>
        <div className="leak-map">
          {leaks.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className={`leak-item leak-item-${index + 1}`}>
              <Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
        <p className="problem-transition">The fix is not more software for its own sake. It is a better website connected to a faster, clearer customer journey.</p>
      </div>
    </section>
  )
}
