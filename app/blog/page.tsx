import Link from 'next/link';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://philgreene.net';
export const metadata = {
  title: 'Blog - Phil Greene',
  description:
    'Insights on AI automation, Etsy growth, and data analysis from Phil Greene.',
  openGraph: {
    title: 'Blog - Phil Greene',
    url: `${siteUrl}/blog`,
    images: [{ url: `${siteUrl}/og-image.svg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Phil Greene',
    images: [`${siteUrl}/og-image.svg`],
  },
};

const blogPosts = [
  {
    id: 'ai-automation-guide',
    title: 'Building AI Automation Systems: A Complete Guide',
    excerpt:
      'Learn how to design and implement AI-powered automation systems that can transform your business processes and save hours of manual work.',
    category: 'ai-automation',
    publishedAt: '2024-12-15',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'etsy-analytics-mastery',
    title: 'Etsy Analytics Mastery: Boost Your Sales with Data',
    excerpt:
      'Discover the key metrics and strategies that successful Etsy sellers use to optimize their shops and increase revenue.',
    category: 'etsy-growth',
    publishedAt: '2024-12-10',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 'data-analysis-framework',
    title: 'A Framework for Effective Data Analysis',
    excerpt:
      'A systematic approach to data analysis that helps you extract meaningful insights and make data-driven decisions.',
    category: 'data-analysis',
    publishedAt: '2024-12-05',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 'automation-case-studies',
    title: 'Real-World Automation Case Studies',
    excerpt:
      'Explore how businesses are using automation to streamline operations and achieve remarkable results.',
    category: 'ai-automation',
    publishedAt: '2024-11-28',
    readTime: '7 min read',
    featured: false,
  },
];

const categories = [
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    count: 2,
    color:
      'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  },
  {
    id: 'etsy-growth',
    name: 'Etsy Growth',
    count: 1,
    color:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    count: 1,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Blog
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Insights on AI automation, Etsy growth, and data analysis
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <span
                key={category.id}
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${category.color}`}
              >
                {category.name}
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts
              .filter(post => post.featured)
              .map(post => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.id}`}>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                      <div className="mb-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            categories.find(c => c.id === post.category)
                              ?.color || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {categories.find(c => c.id === post.category)?.name}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {post.title}
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            All Posts
          </h2>
          <div className="space-y-6">
            {blogPosts.map(post => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`}>
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              categories.find(c => c.id === post.category)
                                ?.color || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {categories.find(c => c.id === post.category)?.name}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="ml-6 text-right text-sm text-gray-500 dark:text-gray-400">
                        <div>{post.publishedAt}</div>
                        <div>{post.readTime}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
