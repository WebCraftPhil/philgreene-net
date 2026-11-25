export type ArticleKind = 'Essay' | 'Field Note' | 'Evergreen'

export interface Article {
  slug: string
  title: string
  kind: ArticleKind
  date: string
  readingTime: string
  published?: boolean
  tags: string[]
  summary: string
  sections: {
    heading?: string
    paragraphs: string[]
    code?: {
      language: string
      snippet: string
    }
  }[]
}

export const articles: Article[] = [
  {
    slug: 'from-hands-on-trades-to-data-and-systems',
    title: 'From Hands-On Trades to Data, Software, and Systems',
    kind: 'Essay',
    date: '2026-11-18',
    readingTime: '4 min read',
    tags: ['Career', 'Systems Thinking', 'Builder Notes'],
    summary:
      'Why years in physical trades and service environments turn out to be unexpectedly strong preparation for data analytics, automation, and software architecture.',
    sections: [
      {
        paragraphs: [
          'People often treat hands-on trades and software engineering as opposite worlds. One is physical, immediate, and unforgiving of sloppy prep; the other is abstract, digital, and iterative.',
          'In practice, the mental habits overlap more than you might expect. On a job site or in a service business, you learn quickly that most failures happen at the handoffs: unclear scope, missing measurements, or assumptions nobody verified before starting.',
        ],
      },
      {
        heading: 'Debugging physical systems vs. data pipelines',
        paragraphs: [
          'When something breaks in the physical world, you trace the path from symptom to root cause. You check the inputs, inspect the connections, and test one variable at a time.',
          'Transitioning into data analytics at SNHU and building Python/TypeScript tools felt like applying that same diagnostic discipline to tables, APIs, and automated workflows. Dirty data is just an unprepped surface—skip the prep, and the finish fails.',
        ],
      },
      {
        heading: 'Building for real constraints',
        paragraphs: [
          'Working around small, owner-operated businesses also teaches a healthy skepticism toward unnecessary complexity. Nobody wants a ten-layer architecture when a reliable, well-structured system solves the problem cleanly.',
          'That perspective shapes everything I build now: learn relentlessly, build practically, and keep every tool anchored to a real problem.',
        ],
      },
    ],
  },
  {
    slug: 'deterministic-rails-around-llm-workflows',
    title: 'Deterministic Rails Around Probabilistic AI Steps',
    kind: 'Field Note',
    date: '2026-11-10',
    readingTime: '5 min read',
    tags: ['AI Agents', 'n8n', 'Architecture'],
    summary:
      'Patterns for keeping n8n and TypeScript AI workflows predictable: strict schemas, idempotent triggers, and narrow model responsibilities.',
    sections: [
      {
        paragraphs: [
          'The fastest way to make an AI automation unreliable is to ask a language model to manage control flow, state, and external side effects all at once.',
          'A much sturdier pattern treats the model as a bounded transformation step inside a deterministic workflow.',
        ],
      },
      {
        heading: 'Separate orchestration from inference',
        paragraphs: [
          'In my n8n and TypeScript workflows, deterministic code handles webhook validation, deduplication, retries, and database writes. The LLM is only invoked for tasks where ambiguity is unavoidable—such as classifying an unstructured message or extracting structured fields.',
        ],
        code: {
          language: 'typescript',
          snippet: `// Keep model output strictly typed before downstream routing
const triageSchema = z.object({
  category: z.enum(['inquiry', 'support', 'spam']),
  confidence: z.number().min(0).max(1),
  summary: z.string().max(240),
})`,
        },
      },
      {
        heading: 'Design for graceful fallback',
        paragraphs: [
          'Whenever confidence is low or schema validation fails, the workflow routes the item to a human review queue rather than guessing. Predictable failure modes are what turn an experiment into dependable infrastructure.',
        ],
      },
    ],
  },
  {
    slug: 'why-a-15-watt-local-ai-lab-matters',
    title: 'Why a 15-Watt Local AI Lab Teaches More Than Cloud APIs',
    kind: 'Evergreen',
    date: '2026-11-02',
    readingTime: '4 min read',
    tags: ['Raspberry Pi 5', 'Hailo-10H', 'Edge AI'],
    summary:
      'Notes on setting up a Raspberry Pi 5 + Hailo-10H local AI testbed—and why hardware constraints sharpen engineering judgment.',
    sections: [
      {
        paragraphs: [
          'Calling a frontier cloud API is convenient, but it abstracts away everything happening beneath the HTTP request: memory bandwidth, quantization trade-offs, thermal throttling, and latency budgets.',
          'Running a Raspberry Pi 5 paired with a Hailo-10H accelerator forces you to confront those constraints directly.',
        ],
      },
      {
        heading: 'What constrained hardware reveals',
        paragraphs: [
          'On a 15-watt footprint, model size and operator support are never theoretical. You immediately see which tasks truly require large cloud reasoning models and which classification, embedding, or vision workloads belong right on local silicon.',
          'This page will grow into a living lab log as I benchmark thermals, throughput, and practical local-first workflows.',
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
