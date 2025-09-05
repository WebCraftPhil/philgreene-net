import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, caseStudies } from "../../../lib/projects";
import type { Metadata } from "next";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://philgreene.net";
  return {
    title: `${study.title} Case Study - Phil Greene`,
    description: study.description,
    openGraph: {
      title: `${study.title} Case Study - Phil Greene`,
      url: `${siteUrl}/projects/${study.slug}`,
      images: [{ url: `${siteUrl}${study.screenshot}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} Case Study - Phil Greene`,
      images: [`${siteUrl}${study.screenshot}`],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return notFound();

  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">{study.title}</h1>
          <p className="text-muted-foreground">{study.description}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Problem</h2>
          <p className="text-muted-foreground">{study.problem}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Approach</h2>
          <p className="text-muted-foreground">{study.solution}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {study.results.metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <p className="mt-4 text-muted-foreground">{study.results.impact}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Screens</h2>
          <div className="relative aspect-video w-full mb-4">
            <Image src={study.screenshot} alt={`${study.title} screenshot`} fill className="object-cover rounded-lg" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span key={tech} className="rounded-md bg-muted px-2 py-1 text-xs text-foreground/70 dark:bg-gray-800 dark:text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="text-center pt-4">
          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Book a 20-min Call
          </Link>
        </div>
      </div>
    </div>
  );
}

