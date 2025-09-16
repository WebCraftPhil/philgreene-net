import { Button } from '@/components/ui/button'
import { ArrowRight, Code, BarChart3, Sparkles } from 'lucide-react'
import heroImage from '@assets/generated_images/futuristic_cosmic_hero_background_14f4645e.png'

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(37, 26, 96, 0.8), rgba(37, 26, 96, 0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-primary rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-primary-foreground mb-8 border border-primary/30 particle-effect cosmic-hover">
          <Sparkles className="w-4 h-4 icon-disco" />
          <span className="text-sm font-medium">Available for Freelance Projects</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight glitch-hover" data-text="Web Solutions">
          <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-rainbow-hover">
            Web Solutions
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          I craft cutting-edge web applications and unlock insights from data. 
          Let's build something extraordinary together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg group ripple-button particle-effect cosmic-hover"
            data-testid="button-view-projects"
          >
            View My Projects
            <ArrowRight className="ml-2 h-5 w-5 icon-disco" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg ripple-button particle-effect"
            data-testid="button-get-in-touch"
          >
            Get In Touch
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cosmic-hover card-3d-hover">
            <Code className="w-8 h-8 text-primary mb-4 mx-auto icon-disco" />
            <h3 className="text-lg font-semibold text-white mb-2 text-rainbow-hover">Web Development</h3>
            <p className="text-white/80">Modern, responsive websites and applications using cutting-edge technologies</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 cosmic-hover card-3d-hover">
            <BarChart3 className="w-8 h-8 text-accent mb-4 mx-auto icon-disco" />
            <h3 className="text-lg font-semibold text-white mb-2 text-rainbow-hover">Data Analysis</h3>
            <p className="text-white/80">Transform raw data into actionable insights and beautiful visualizations</p>
          </div>
        </div>
      </div>
    </section>
  )
}