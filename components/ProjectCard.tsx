import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../types/projects';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

export default function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  
  return (
    <div className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 ${
      isFeatured ? 'col-span-full md:col-span-2' : ''
    }`}>
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      {/* Project Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
            {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        
        {/* Title & Description */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
        
        {/* Role */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Role:</span>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{project.role}</span>
        </div>
        
        {/* Tech Stack */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Tech Stack:</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                +{project.stack.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        {/* Key Outcomes */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Key Outcomes:</span>
          <ul className="mt-1 space-y-1">
            {project.outcomes.slice(0, 2).map((outcome, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                • {outcome}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            View Case Study
          </Link>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
