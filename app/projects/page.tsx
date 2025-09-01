import { projects } from "../../lib/projects";
import ProjectCard from "../../components/ProjectCard";

export const metadata = {
  title: "Projects - Phil Greene",
  description: "Explore my portfolio of data analysis, automation, and full-stack development projects.",
};

export default function ProjectsPage() {
  const total = projects.length;
  const featured = projects.filter(p => p.featured).length;
  const byCategory = (cat: typeof projects[number]['category']) => projects.filter(p => p.category === cat).length;

  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-gradient-coolors text-4xl font-bold tracking-tight sm:text-5xl">
            My Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Showcasing data-driven solutions and innovative applications
          </p>
        </div>

        {/* Highlights */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="card card-hover text-center">
            <div className="mb-2 text-2xl">📁</div>
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div className="card card-hover text-center">
            <div className="mb-2 text-2xl">⭐</div>
            <div className="text-2xl font-bold">{featured}</div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </div>
          <div className="card card-hover text-center">
            <div className="mb-2 text-2xl">🏷️</div>
            <div className="text-2xl font-bold">{['data-analysis','automation','ecommerce','legal-tech'].map(c => byCategory(c as 'data-analysis' | 'automation' | 'ecommerce' | 'legal-tech')).reduce((a,b)=>a + (b>0?1:0),0)}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Categories */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Project Categories
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-6 text-center dark:bg-blue-900/20">
              <div className="mb-2 text-2xl">📊</div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Data Analysis</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {byCategory('data-analysis')} projects
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
              <div className="mb-2 text-2xl">🤖</div>
              <h3 className="font-semibold text-green-900 dark:text-green-100">Automation</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                {byCategory('automation')} projects
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 text-center dark:bg-purple-900/20">
              <div className="mb-2 text-2xl">🛒</div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">E-commerce</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {byCategory('ecommerce')} projects
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 p-6 text-center dark:bg-orange-900/20">
              <div className="mb-2 text-2xl">⚖️</div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">Legal Tech</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {byCategory('legal-tech')} projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
