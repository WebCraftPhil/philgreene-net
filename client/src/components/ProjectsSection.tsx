import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Filter } from 'lucide-react'

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all')

  // todo: remove mock functionality
  const projects = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description: 'A comprehensive analytics dashboard for online retailers with real-time sales data, customer insights, and inventory management.',
      image: '/api/placeholder/400/250',
      category: 'web',
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Sales Prediction Model',
      description: 'Machine learning model that predicts sales trends using historical data and market indicators with 95% accuracy.',
      image: '/api/placeholder/400/250',
      category: 'data',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter', 'Matplotlib'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates, team chat, and advanced reporting features.',
      image: '/api/placeholder/400/250',
      category: 'web',
      tech: ['Next.js', 'Prisma', 'Socket.io', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Customer Sentiment Analysis',
      description: 'NLP-powered tool that analyzes customer reviews and feedback to provide actionable insights for businesses.',
      image: '/api/placeholder/400/250',
      category: 'data',
      tech: ['Python', 'NLTK', 'TensorFlow', 'Flask', 'React'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Real Estate Platform',
      description: 'Modern property listing platform with advanced search, virtual tours, and market analysis tools.',
      image: '/api/placeholder/400/250',
      category: 'web',
      tech: ['React', 'Express', 'MongoDB', 'AWS', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 6,
      title: 'Supply Chain Analytics',
      description: 'Data visualization platform that tracks and optimizes supply chain operations for manufacturing companies.',
      image: '/api/placeholder/400/250',
      category: 'data',
      tech: ['Python', 'Plotly', 'FastAPI', 'PostgreSQL', 'Docker'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'data', label: 'Data Analysis' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A showcase of my recent work in web development and data analysis.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              onClick={() => {
                setFilter(category.id)
                console.log('Filter changed to:', category.label)
              }}
              className="group"
              data-testid={`button-filter-${category.id}`}
            >
              <Filter className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover-elevate transition-all duration-300 overflow-hidden border-border/50"
              data-testid={`card-project-${project.id}`}
            >
              <div className="relative overflow-hidden">
                {/* Placeholder for project image */}
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-background/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <p className="text-sm text-white/80 font-medium">{project.title}</p>
                  </div>
                </div>
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-xs hover-elevate"
                      data-testid={`badge-tech-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 group"
                    onClick={() => console.log('View live project:', project.title)}
                    data-testid={`button-live-${project.id}`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Live Demo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 group"
                    onClick={() => console.log('View code:', project.title)}
                    data-testid={`button-code-${project.id}`}
                  >
                    <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => console.log('View all projects clicked')}
            data-testid="button-view-all-projects"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}