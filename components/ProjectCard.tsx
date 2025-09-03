import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../types/projects';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

const categoryBadge = (category: Project['category']) => {
  const map: Record<Project['category'], string> = {
    'data-analysis': 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    'automation': 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    'ecommerce': 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    'legal-tech': 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
  };
  return map[category];
};

export default function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:border-gray-800 ${
      isFeatured ? 'col-span-full md:col-span-2' : ''
    }`}>
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          fill
          priority={isFeatured}
          loading={isFeatured ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-60" />
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryBadge(project.category)}`}>
            {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        
        {/* Title & Description */}
        <h3 className="mb-2 text-xl font-semibold">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {project.description}
        </p>
        
        {/* Role */}
        <div className="mb-4">
          <span className="text-sm font-medium">Role:</span>
          <span className="ml-2 text-sm text-muted-foreground">{project.role}</span>
        </div>
        
        {/* Tech Stack */}
        <div className="mb-4">
          <span className="text-sm font-medium">Tech Stack:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-muted px-2 py-1 text-xs text-foreground/70 dark:bg-gray-800 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-md bg-muted px-2 py-1 text-xs text-foreground/70 dark:bg-gray-800 dark:text-gray-300">
                +{project.stack.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        {/* Key Outcomes */}
        <div className="mb-4">
          <span className="text-sm font-medium">Key Outcomes:</span>
          <ul className="mt-1 space-y-1">
            {project.outcomes.slice(0, 2).map((outcome, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {outcome}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            View Case Study
          </Link>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-center text-sm font-medium text-foreground/80 transition-all hover:bg-muted"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
