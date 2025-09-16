import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Download, MapPin, Coffee } from 'lucide-react'

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
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  PG
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-card-foreground">Phillip Greene</h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer and data analyst with over 5 years of experience 
              creating digital solutions that make a difference. I love turning complex problems into 
              simple, beautiful designs that users adore.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me running my Etsy shop "Stellar Styles and More", exploring the latest technologies, 
              or analyzing interesting datasets to uncover hidden patterns. I believe in combining technical expertise with creative vision.
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
                  <h5 className="font-semibold text-foreground">5+ Years</h5>
                  <p className="text-muted-foreground">Full-Stack Development</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border hover-elevate">
                  <h5 className="font-semibold text-foreground">50+ Projects</h5>
                  <p className="text-muted-foreground">Successfully Delivered</p>
                </div>
                <div className="bg-background rounded-lg p-4 border border-border hover-elevate">
                  <h5 className="font-semibold text-foreground">3+ Years</h5>
                  <p className="text-muted-foreground">Data Analysis & ML</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}