import { Project, CaseStudy } from '../types/projects';

export const projects: Project[] = [
  {
    id: 'cronpost',
    title: 'CronPost',
    description:
      'Automated social media posting platform with intelligent scheduling and analytics',
    role: 'Full Stack Developer & Product Manager',
    stack: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Tailwind CSS',
    ],
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
    description:
      'AI-powered legal document analysis and contract review platform',
    role: 'Lead Developer & AI Integration Specialist',
    stack: [
      'Python',
      'FastAPI',
      'OpenAI GPT-4',
      'React',
      'PostgreSQL',
      'Docker',
    ],
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
    description:
      'Scrapes Etsy data and analyzes high‑demand, low‑competition product niches with actionable insights.',
    role: 'Product Developer & Data Analyst',
    stack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Puppeteer/Playwright',
      'Etsy API',
      'PostgreSQL',
      'Tailwind CSS',
    ],
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
    description:
      'Digital marketplace featuring templates, guides, and resources for entrepreneurs and creators looking to grow their businesses.',
    role: 'Product Creator & Digital Entrepreneur',
    stack: [
      'Gumroad Platform',
      'Digital Design',
      'Content Creation',
      'Marketing Analytics',
      'Customer Support',
    ],
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
    description:
      'Handcrafted jewelry, accessories, and unique items sold on Etsy marketplace, focusing on quality craftsmanship and customer satisfaction.',
    role: 'Shop Owner & Artisan',
    stack: [
      'Etsy Platform',
      'Product Photography',
      'Inventory Management',
      'Customer Relations',
      'SEO Optimization',
      'Social Media',
    ],
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

export const caseStudies: CaseStudy[] = [
  {
    ...projects[0], // CronPost
    problem:
      'Small businesses and creators spend 2-3 hours daily manually posting to multiple social media platforms, leading to inconsistent posting schedules and missed engagement opportunities.',
    solution:
      'Built an intelligent scheduling platform that analyzes optimal posting times, automatically generates content variations, and provides detailed analytics to maximize engagement.',
    results: {
      metrics: [
        '80% reduction in manual posting time',
        '45% increase in average engagement rates',
        '10,000+ active users within 6 months',
        '$500K+ in revenue generated',
      ],
      impact:
        'Transformed how small businesses approach social media management, enabling them to compete with larger brands through consistent, data-driven content strategies.',
    },
    nextSteps: [
      'Integrate with TikTok and LinkedIn APIs',
      'Add AI-powered content generation',
      'Launch enterprise features for agencies',
    ],
    challenges: [
      'Managing rate limits across multiple social media APIs',
      'Ensuring content compliance across platforms',
      'Scaling database performance with rapid user growth',
    ],
    learnings: [
      'User onboarding is critical for SaaS adoption',
      'Analytics drive feature development decisions',
      'API reliability requires robust error handling',
    ],
  },
  {
    ...projects[1], // LegalLeaflet
    problem:
      'Legal teams spend hours reviewing contracts manually, risking inconsistencies and slow deal cycles.',
    solution:
      'Developed an AI-powered platform to analyze and summarize legal documents with high accuracy.',
    results: {
      metrics: [
        '70% reduction in contract review time',
        '95% accuracy compared to manual review',
        '50,000+ documents processed',
      ],
      impact:
        'Enabled faster deal cycles and reduced legal spend for small teams.',
    },
    nextSteps: [
      'Expand language coverage',
      'Integrate with e-sign platforms',
      'Add collaborative review features',
    ],
    challenges: [
      'Ensuring model compliance with legal standards',
      'Handling diverse document formats',
      'Maintaining data privacy',
    ],
    learnings: [
      'User trust grows with transparent AI outputs',
      'Edge cases require human-in-the-loop review',
      'Performance tuning is ongoing',
    ],
  },
  {
    ...projects[2], // Etsy Analytics
    problem:
      'New Etsy sellers struggle to identify high-demand, low-competition niches.',
    solution:
      'Built a data pipeline that scrapes marketplace data and highlights viable product opportunities.',
    results: {
      metrics: [
        'Hundreds of profitable niches discovered automatically',
        '10x revenue growth for pilot shop',
        'Faster validation of product ideas',
      ],
      impact:
        'Helped sellers focus on listings with real demand and less competition.',
    },
    nextSteps: [
      'Add real-time market alerts',
      'Expand to other marketplaces',
      'Introduce collaborative research dashboards',
    ],
    challenges: [
      'Staying within marketplace rate limits',
      'Normalizing inconsistent category data',
      'Presenting insights clearly to non-technical users',
    ],
    learnings: [
      'Data freshness matters for trend spotting',
      'Visualization drives decision making',
      'Scrapers require constant maintenance',
    ],
  },
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
