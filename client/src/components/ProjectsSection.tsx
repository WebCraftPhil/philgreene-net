import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Filter, Star } from 'lucide-react'

// Import your actual project data
const projects = [
  {
    id: 'cronpost',
    title: 'CronPost',
    description: 'Automated social media posting platform with intelligent scheduling and analytics',
    role: 'Full Stack Developer & Product Manager',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Tailwind CSS'],
    outcomes: [
      'Reduced manual posting time by 80%',
      'Increased engagement rates by 45%',
      'Scaled to 10,000+ active users',
    ],
    screenshot: '/projects/cronpost-screenshot.svg',
    link: 'https://cronpost.com',
    featured: true,
    category: 'automation',
    slug: 'cronpost',
  },
  {
    id: 'legal-leaflet',
    title: 'LegalLeaflet',
    description: 'AI-powered legal document analysis and contract review platform',
    role: 'Lead Developer & AI Integration Specialist',
    stack: ['Python', 'FastAPI', 'OpenAI GPT-4', 'React', 'PostgreSQL', 'Docker'],
    outcomes: [
      'Reduced contract review time by 70%',
      'Improved accuracy to 95% vs human review',
      'Processed 50,000+ legal documents',
    ],
    screenshot: '/projects/legal-leaflet-screenshot.svg',
    featured: true,
    category: 'legal-tech',
    slug: 'legal-leaflet',
  },
  {
    id: 'etsy-analytics',
    title: 'Etsy Analytics',
    description: 'Scrapes Etsy data and analyzes high‑demand, low‑competition product niches with actionable insights.',
    role: 'Product Developer & Data Analyst',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Puppeteer/Playwright', 'Etsy API', 'PostgreSQL', 'Tailwind CSS'],
    outcomes: [
      'Identified hundreds of viable niches automatically',
      'Surfaced opportunities by balancing demand vs. competition',
      'Enabled faster product validation and listing decisions',
    ],
    screenshot: '/projects/etsy-analytics-screenshot.svg',
    featured: true,
    category: 'ecommerce',
    slug: 'etsy-analytics',
  },
  {
    id: 'gumroad-digital-products',
    title: 'VtGuy65 Digital Products',
    description: 'Digital marketplace featuring templates, guides, and resources for entrepreneurs and creators looking to grow their businesses.',
    role: 'Product Creator & Digital Entrepreneur',
    stack: ['Gumroad Platform', 'Digital Design', 'Content Creation', 'Marketing Analytics', 'Customer Support'],
    outcomes: [
      'Built diverse catalog of digital products',
      'Established recurring revenue stream',
      'Developed customer feedback system',
    ],
    screenshot: '/projects/gumroad-digital-products-screenshot.png',
    link: 'https://vtguy65.gumroad.com',
    featured: true,
    category: 'digital-products',
    slug: 'gumroad-digital-products',
  },
  {
    id: 'stellar-styles-etsy',
    title: 'Stellar Styles and More',
    description: 'Handcrafted jewelry, accessories, and unique items sold on Etsy marketplace, focusing on quality craftsmanship and customer satisfaction.',
    role: 'Shop Owner & Artisan',
    stack: ['Etsy Platform', 'Product Photography', 'Inventory Management', 'Customer Relations', 'SEO Optimization', 'Social Media'],
    outcomes: [
      'Established successful Etsy storefront',
      'Built loyal customer base',
      'Achieved consistent monthly sales',
    ],
    screenshot: '/projects/stellar-styles-etsy-screenshot.png',
    link: 'https://stellarstylesandmore.etsy.com',
    featured: true,
    category: 'ecommerce',
    slug: 'stellar-styles-etsy',
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'automation', label: 'Automation' },
    { id: 'legal-tech', label: 'Legal Tech' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'digital-products', label: 'Digital Products' }
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
            Real projects that combine full-stack development with data analysis to solve complex business challenges.
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
              className="group ripple-button particle-effect"
              data-testid={`button-filter-${category.id}`}
            >
              <Filter className="w-4 h-4 mr-2 icon-disco" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group cosmic-hover card-3d-hover transition-all duration-300 overflow-visible border-border/50"
              data-testid={`card-project-${project.id}`}
            >
              <div className="relative overflow-hidden">
                {/* Project Screenshot */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors text-rainbow-hover">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
                <div className="text-xs text-muted-foreground/70 mt-2">
                  <span className="font-medium">Role:</span> {project.role}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Key Outcomes */}
                <div>
                  <span className="text-sm font-medium text-card-foreground">Key Results:</span>
                  <ul className="mt-1 space-y-1">
                    {project.outcomes.slice(0, 2).map((outcome, index) => (
                      <li key={index} className="text-xs text-muted-foreground">
                        • {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-xs hover-elevate"
                      data-testid={`badge-tech-${tech.toLowerCase()}`}
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.stack.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.stack.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.link && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 group ripple-button particle-effect"
                      onClick={() => window.open(project.link, '_blank')}
                      data-testid={`button-live-${project.id}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 icon-disco" />
                      Live Demo
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 group ripple-button particle-effect"
                    onClick={() => console.log('View case study:', project.title)}
                    data-testid={`button-case-study-${project.id}`}
                  >
                    <Github className="w-4 h-4 mr-2 icon-disco" />
                    Case Study
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