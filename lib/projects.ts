import { Project, CaseStudy } from '@/types/projects';

export const projects: Project[] = [
  {
    id: 'cronpost',
    title: 'CronPost',
    description: 'Automated social media posting platform with intelligent scheduling and analytics',
    role: 'Full Stack Developer & Product Manager',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Tailwind CSS'],
    outcomes: [
      'Reduced manual posting time by 80%',
      'Increased engagement rates by 45%',
      'Scaled to 10,000+ active users'
    ],
    screenshot: '/projects/cronpost-screenshot.svg',
    link: 'https://cronpost.com',
    featured: true,
    category: 'automation',
    slug: 'cronpost'
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
      'Processed 50,000+ legal documents'
    ],
    screenshot: '/projects/legal-leaflet-screenshot.svg',
    featured: true,
    category: 'legal-tech',
    slug: 'legal-leaflet'
  },
  {
    id: 'property-iq',
    title: 'PropertyIQ',
    description: 'Real estate investment analysis platform with predictive modeling',
    role: 'Data Scientist & Backend Developer',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'FastAPI', 'PostgreSQL', 'Docker'],
    outcomes: [
      'Generated $2M+ in investment opportunities',
      'Predicted market trends with 85% accuracy',
      'Analyzed 100,000+ property listings'
    ],
    screenshot: '/projects/property-iq-screenshot.svg',
    featured: true,
    category: 'data-analysis',
    slug: 'property-iq'
  },
  {
    id: 'etsy-analytics',
    title: 'Etsy Analytics',
    description: 'Comprehensive analytics dashboard for Etsy sellers with growth insights',
    role: 'Product Developer & Data Analyst',
    stack: ['React', 'Node.js', 'Etsy API', 'Chart.js', 'MongoDB', 'AWS'],
    outcomes: [
      'Increased seller revenue by 30% on average',
      'Identified 500+ optimization opportunities',
      'Tracked 1M+ product listings'
    ],
    screenshot: '/projects/etsy-analytics-screenshot.svg',
    featured: true,
    category: 'ecommerce',
    slug: 'etsy-analytics'
  }
];

export const caseStudies: CaseStudy[] = [
  {
    ...projects[0], // CronPost
    problem: 'Small businesses and creators spend 2-3 hours daily manually posting to multiple social media platforms, leading to inconsistent posting schedules and missed engagement opportunities.',
    solution: 'Built an intelligent scheduling platform that analyzes optimal posting times, automatically generates content variations, and provides detailed analytics to maximize engagement.',
    results: {
      metrics: [
        '80% reduction in manual posting time',
        '45% increase in average engagement rates',
        '10,000+ active users within 6 months',
        '$500K+ in revenue generated'
      ],
      impact: 'Transformed how small businesses approach social media management, enabling them to compete with larger brands through consistent, data-driven content strategies.'
    },
    nextSteps: [
      'Integrate with TikTok and LinkedIn APIs',
      'Add AI-powered content generation',
      'Launch enterprise features for agencies'
    ],
    challenges: [
      'Managing rate limits across multiple social media APIs',
      'Ensuring content compliance across platforms',
      'Scaling database performance with rapid user growth'
    ],
    learnings: [
      'User onboarding is critical for SaaS adoption',
      'Analytics drive feature development decisions',
      'API reliability requires robust error handling'
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}
