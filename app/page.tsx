
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                  Data Analyst &{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Full Stack Developer
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  I build data-driven solutions that drive business growth. 
                  Specializing in AI automation, analytics platforms, and scalable web applications.
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/projects"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border border-gray-300 px-6 py-3 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Work With Me
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$2M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-8">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <div className="mb-4 text-6xl">📊</div>
                    <div className="text-xl font-semibold">Data-Driven Solutions</div>
                    <div className="text-sm opacity-90">AI • Analytics • Automation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Showcasing my expertise in data analysis, automation, and full-stack development
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              What I Do
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Comprehensive solutions for data-driven businesses
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 text-3xl">📈</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Data Analysis & BI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transform raw data into actionable insights with custom dashboards, 
                predictive modeling, and automated reporting systems.
              </p>
            </div>
            
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 text-3xl">🤖</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                AI & Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build intelligent systems that automate workflows, analyze documents, 
                and optimize business processes using cutting-edge AI technologies.
              </p>
            </div>
            
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <div className="mb-4 text-3xl">💻</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Full Stack Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create scalable web applications from concept to deployment, 
                with modern frameworks and cloud-native architectures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-blue-600 px-8 py-12 text-center dark:bg-blue-500">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Build Something Amazing?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Let&apos;s discuss how I can help you achieve your data and development goals.
            </p>
            <Link
              href="/contact"
              className="rounded-lg bg-white px-8 py-3 font-medium text-blue-600 transition-colors hover:bg-gray-100"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
