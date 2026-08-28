import { GraduationCap, MapPin } from 'lucide-react'
import profilePhoto from '../assets/profile-photo-optimized.jpg'

export default function AboutSection() {
  return (
    <section id="about" className="about-section section" aria-labelledby="about-heading">
      <div className="site-container about-grid">
        <div className="about-photo-wrap">
          <img
            src={profilePhoto}
            alt="Phil Greene, local business growth partner in Manchester, New Hampshire"
            className="about-photo"
            loading="lazy"
          />
          <div className="about-location"><MapPin aria-hidden="true" /> Manchester, New Hampshire</div>
        </div>
        <div className="section-heading about-copy">
          <p className="section-label">About Phil Greene</p>
          <h2 id="about-heading">A practical growth partner for local service businesses</h2>
          <p>
            I have worked across service, industrial, hospitality, e-commerce, and construction-adjacent
            environments. I understand that small-business owners usually do not need more software for
            its own sake. They need calls answered, estimates followed up, appointments booked, and results
            they can trace.
          </p>
          <p>
            I combine web development, automation, analytics, and practical business experience to build
            systems that help make that happen.
          </p>
          <div className="education-note">
            <GraduationCap aria-hidden="true" />
            <span>Pursuing a B.S. in Data Science at Southern New Hampshire University.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
