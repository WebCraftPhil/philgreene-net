export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  stack: string[];
  outcomes: string[];
  screenshot: string;
  link?: string;
  featured: boolean;
  category: 'data-analysis' | 'automation' | 'ecommerce' | 'legal-tech';
  slug: string;
}

export interface CaseStudy extends Project {
  problem: string;
  solution: string;
  results: {
    metrics: string[];
    impact: string;
  };
  nextSteps: string[];
  challenges: string[];
  learnings: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'ai-automation' | 'etsy-growth' | 'data-analysis';
  tags: string[];
  publishedAt: string;
  slug: string;
  featured: boolean;
}
