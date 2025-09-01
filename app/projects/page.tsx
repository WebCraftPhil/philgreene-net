import { projects } from "../../lib/projects";
import ProjectCard from "../../components/ProjectCard";

export const metadata = {
  title: "Projects - Phil Greene",
  description: "Explore my portfolio of data analysis, automation, and full-stack development projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            My Projects
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Showcasing data-driven solutions and innovative applications
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Categories */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Project Categories
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-900/20">
              <div className="mb-2 text-2xl">📊</div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Data Analysis</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {projects.filter(p => p.category === 'data-analysis').length} projects
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
              <div className="mb-2 text-2xl">🤖</div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Automation</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {projects.filter(p => p.category === 'automation').length} projects
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 text-center dark:bg-purple-900/20">
              <div className="mb-2 text-2xl">🛒</div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">E-commerce</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {projects.filter(p => p.category === 'ecommerce').length} projects
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 p-6 text-center dark:bg-orange-900/20">
              <div className="mb-2 text-2xl">⚖️</div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">Legal Tech</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {projects.filter(p => p.category === 'legal-tech').length} projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
