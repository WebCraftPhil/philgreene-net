import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Code2, 
  Smartphone, 
  Database, 
  BarChart3, 
  Brain, 
  TrendingUp, 
  Palette, 
  Zap 
} from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.',
      features: ['React & Next.js', 'TypeScript', 'API Development', 'Performance Optimization'],
      color: 'text-primary'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Mobile-first designs that work perfectly across all devices and screen sizes.',
      features: ['Mobile-First', 'Cross-Browser', 'UI/UX Design', 'Accessibility'],
      color: 'text-accent'
    },
    {
      icon: Database,
      title: 'Backend Solutions',
      description: 'Scalable server architectures and database designs for robust applications.',
      features: ['Node.js', 'PostgreSQL', 'MongoDB', 'Cloud Deployment'],
      color: 'text-primary'
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      description: 'Transform your data into actionable insights with advanced analytics.',
      features: ['Statistical Analysis', 'Data Visualization', 'Python/R', 'Business Intelligence'],
      color: 'text-accent'
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Implement AI solutions to automate processes and predict outcomes.',
      features: ['Predictive Models', 'Classification', 'Natural Language Processing', 'Deep Learning'],
      color: 'text-primary'
    },
    {
      icon: TrendingUp,
      title: 'Business Intelligence',
      description: 'Create dashboards and reports that drive data-driven decision making.',
      features: ['Interactive Dashboards', 'KPI Tracking', 'Automated Reporting', 'Data Pipelines'],
      color: 'text-accent'
    }
  ]

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">What I Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I offer comprehensive web development and data analysis services to help your business thrive in the digital age.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card 
                key={index} 
                className="hover-elevate group transition-all duration-300 border-border/50"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <Badge 
                        key={feature} 
                        variant="outline" 
                        className="text-xs hover-elevate"
                        data-testid={`badge-feature-${feature.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-border/50">
            <Palette className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Custom Solutions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Don't see exactly what you need? I love tackling unique challenges and creating 
              custom solutions tailored to your specific requirements.
            </p>
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
              Let's Discuss Your Project
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}