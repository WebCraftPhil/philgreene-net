import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Download, MapPin, Coffee } from 'lucide-react'
import profilePhoto from '../assets/profile-photo.jpg'

export default function AboutSection() {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'Tailwind CSS',
    'PostgreSQL', 'MongoDB', 'Data Visualization', 'Machine Learning',
    'API Development', 'AWS', 'Docker', 'Git'
  ]

  return (
    <section id="about" className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="w-20 h-20 border-4 border-primary/20">
                <AvatarImage 
                  src={profilePhoto} 
                  alt="Phillip Greene"
                  className="object-cover object-center"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  PG
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-card-foreground">Phillip Greene</h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Manchester, NH
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a full-stack developer and beginner data analyst who loves turning complex challenges into simple, intuitive solutions. 
              I've been sharpening my skills by building real projects that apply both coding and data analysis in practical ways.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Alongside my tech work, I run an Etsy shop, "Stellar Styles and More," where I design and sell home décor, apparel, and accessories. 
              It's my creative outlet and a way to experiment with building products and managing a business.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I see technology as the most powerful creative medium of our time—and I'm committed to growing every day as a developer and analyst.
            </p>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Coffee className="w-5 h-5" />
              <span>Fueled by coffee and curiosity</span>
            </div>

            <Button 
              variant="outline" 
              className="group"
              data-testid="button-download-resume"
            >
              <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-card-foreground mb-4">Skills & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="hover-elevate"
                    data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-card-foreground">Experience Highlights</h4>
              <div className="space-y-3">
                <div className="bg-background rounded-lg p-4 border border-border hover-elevate">
                  <h5 className="font-semibold text-foreground">One Year</h5>
                  <p className="text-muted-foreground">Full-Stack Development & Data Analysis</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border hover-elevate">
                  <h5 className="font-semibold text-foreground">Real Projects</h5>
                  <p className="text-muted-foreground">AI-powered SaaS & Automations</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border hover-elevate">
                  <h5 className="font-semibold text-foreground">Etsy Shop Owner</h5>
                  <p className="text-muted-foreground">Stellar Styles and More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}