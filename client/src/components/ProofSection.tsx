import { CalendarCheck, Car, Hammer, House, Leaf, Paintbrush, Pipette, ThermometerSun } from 'lucide-react'

const industries = [
  { icon: House, label: 'Roofers' },
  { icon: Pipette, label: 'Plumbers' },
  { icon: ThermometerSun, label: 'HVAC' },
  { icon: Paintbrush, label: 'Painters' },
  { icon: Leaf, label: 'Landscapers' },
  { icon: Hammer, label: 'Remodelers' },
  { icon: Car, label: 'Auto repair' },
]

export default function ProofSection() {
  return (
    <>
      <section className="audience-section section" aria-labelledby="audience-heading">
        <div className="site-container audience-grid">
          <div className="section-heading">
            <h2 id="audience-heading">Best for businesses where one good lead matters</h2>
            <p>
              This system fits local service businesses that depend on calls, estimates, and appointments,
              especially when a qualified lead is financially meaningful.
            </p>
          </div>
          <ul className="industry-list" aria-label="Example service industries">
            {industries.map(({ icon: Icon, label }) => (
              <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>
            ))}
            <li className="industry-more">And other local service businesses</li>
          </ul>
        </div>
      </section>

      <section id="work" className="proof-section section" aria-labelledby="proof-heading">
        <div className="site-container">
          <div className="section-heading section-heading-wide proof-heading">
            <p className="section-label">Demonstrations &amp; sample systems</p>
            <h2 id="proof-heading">See how the pieces work before you trust them with your customers.</h2>
            <p>These are demonstrations and sample systems—not client case studies or claimed results. Measured case studies will replace them after successful pilots.</p>
          </div>
          <div className="demo-grid">
            <article>
              <span>Sample customer journey</span>
              <div className="journey-mini" aria-hidden="true">
                <b>Inquiry</b><i>1</i><b>Reply</b><i>2</i><b>Booking</b>
              </div>
              <p>See how a lead moves from first contact to a clear next step.</p>
            </article>
            <article>
              <span>Sample CRM pipeline</span>
              <div className="pipeline-mini" aria-hidden="true">
                {['New', 'Contacted', 'Scheduled', 'Closed'].map((label) => <b key={label}>{label}</b>)}
              </div>
              <p>See one place for status, notes, source, and follow-up.</p>
            </article>
            <article>
              <span>Example follow-up</span>
              <div className="followup-mini" aria-hidden="true">
                <p>Thanks for reaching out. What is the best time to connect?</p>
                <p>Tomorrow morning works.</p>
              </div>
              <p>See messages designed to sound helpful, direct, and human.</p>
            </article>
          </div>
          <div className="experience-strip">
            <CalendarCheck aria-hidden="true" />
            <p>
              <strong>Practical operating experience.</strong> I have run an Etsy business and worked
              across service, industrial, hospitality, and construction-adjacent environments.
            </p>
            <a href="/projects">View work &amp; demonstrations</a>
          </div>
        </div>
      </section>
    </>
  )
}
