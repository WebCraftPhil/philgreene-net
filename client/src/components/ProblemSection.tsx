import { ClipboardX, FileWarning, MessagesSquare, PhoneOff, SearchX, StarOff } from 'lucide-react'

const leaks = [
  { icon: PhoneOff, title: 'Calls go unanswered', text: 'The crew is working, driving, or already helping a customer.' },
  { icon: FileWarning, title: 'Contact forms sit unread', text: 'A good lead waits in an inbox while the day keeps moving.' },
  { icon: ClipboardX, title: 'Estimates get no follow-up', text: 'The quote goes out, but no simple process keeps the conversation alive.' },
  { icon: MessagesSquare, title: 'Leads are scattered', text: 'Calls, texts, emails, and notes live in different places.' },
  { icon: StarOff, title: 'Reviews are never requested', text: 'Happy customers move on without an easy reminder to share their experience.' },
  { icon: SearchX, title: 'Lead sources stay unclear', text: 'It is hard to know which marketing actually produces booked work.' },
]

export default function ProblemSection() {
  return (
    <section className="problem-section section" aria-labelledby="problem-heading">
      <div className="site-container">
        <div className="section-heading problem-heading">
          <h2 id="problem-heading">Your marketing may already be generating leads. The problem is what happens next.</h2>
          <p>
            Most lead loss is not intentional. It happens when a busy day leaves no clear system for
            responding, following up, and keeping opportunities organized.
          </p>
        </div>
        <div className="leak-map">
          {leaks.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className={`leak-item leak-item-${index + 1}`}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

