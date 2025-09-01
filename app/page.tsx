
import Link from "next/link";
import { getFeaturedProjects } from "../lib/projects";
import ProjectCard from "../components/ProjectCard";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gradient-coolors">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
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
              className="btn-secondary"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gradient-coolors">
              What I Do
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive solutions for data-driven businesses
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="card card-hover border-[#28965a]/20 hover:border-[#28965a]/40">
              <div className="mb-4 text-3xl">📈</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Data Analysis & BI
              </h3>
              <p className="text-muted-foreground">
                Transform raw data into actionable insights with custom dashboards, 
                predictive modeling, and automated reporting systems.
              </p>
            </div>
            
            <div className="card card-hover border-[#e09f3e]/20 hover:border-[#e09f3e]/40">
              <div className="mb-4 text-3xl">🤖</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                AI & Automation
              </h3>
              <p className="text-muted-foreground">
                Build intelligent systems that automate workflows, analyze documents, 
                and optimize business processes using cutting-edge AI technologies.
              </p>
            </div>
            
            <div className="card card-hover border-[#33658a]/20 hover:border-[#33658a]/40">
              <div className="mb-4 text-3xl">💻</div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                Full Stack Development
              </h3>
              <p className="text-muted-foreground">
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
          <div className="rounded-3xl bg-gradient-to-r from-[#33658a] via-[#28965a] to-[#e09f3e] px-8 py-12 text-center shadow-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Build Something Amazing?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Let&apos;s discuss how I can help you achieve your data and development goals.
            </p>
            <Link
              href="/contact"
              className="btn-secondary bg-white text-[#33658a] hover:bg-gray-100 hover:text-[#28965a]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
