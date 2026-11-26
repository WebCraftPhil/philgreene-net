export type ProjectCategory =
  | 'Data Analytics'
  | 'AI & Automation'
  | 'Hardware & Lab'
  | 'Ventures'

export interface ProjectCaseStudy {
  slug: string
  index: string
  title: string
  category: ProjectCategory
  year: string
  status: 'Active' | 'In Progress' | 'Completed' | 'Foundational'
  published?: boolean
  tagline: string
  summary: string
  stack: string[]
  featuredOnHome?: boolean
  externalUrl?: string
  repoUrl?: string
  context: {
    problem: string
    goal: string
  }
  architecture: {
    heading: string
    description: string
    components: {
      name: string
      detail: string
    }[]
  }
  methodology: string[]
  decisionsAndTradeoffs: {
    decision: string
    rationale: string
  }[]
  lessonsLearned: string[]
  nextSteps: string[]
}

export const projectCategories: ('All' | ProjectCategory)[] = [
  'All',
  'Data Analytics',
  'AI & Automation',
  'Hardware & Lab',
  'Ventures',
]

export const projects: ProjectCaseStudy[] = [
  {
    slug: 'tableau-superstore-sales-analysis',
    index: '01',
    title: 'Tableau Superstore Sales Analysis',
    category: 'Data Analytics',
    year: '2026',
    status: 'Completed',
    tagline: 'Segmenting margin erosion, discount drag, and regional performance in retail operations.',
    summary:
      'An exploratory and executive-facing Tableau workbook dissecting profitability across product sub-categories, discount tiers, and regional shipping patterns.',
    stack: ['Tableau', 'Calculated Fields', 'LOD Expressions', 'Data Storytelling', 'SQL'],
    featuredOnHome: true,
    repoUrl: 'https://github.com/WebCraftPhil/superstore-sales-analysis',
    context: {
      problem:
        'Top-line revenue in retail datasets frequently masks unprofitable product lines—especially when aggressive discounting and shipping overhead silently erode net margin.',
      goal:
        'Design an interactive analytical dashboard that separates revenue volume from unit profitability, surfaces discount thresholds where margin turns negative, and supports actionable merchandising decisions.',
    },
    architecture: {
      heading: 'Analytical Structure & Dashboard Flow',
      description:
        'Structured around a three-layer drill-down: executive KPI overview, category/sub-category margin matrix, and order-level discount sensitivity.',
      components: [
        {
          name: 'KPI & Margin Overview',
          detail: 'Pairs total sales, profit, and profit ratio side by side so volume never obscures margin health.',
        },
        {
          name: 'Discount vs. Profit Scatter & Banding',
          detail: 'Groups transactions into discrete discount brackets to pinpoint where promotional pricing crosses into net loss.',
        },
        {
          name: 'Regional & Segment Drill-Down',
          detail: 'Cross-filters Consumer, Corporate, and Home Office segments across US regions to isolate localized shipping or mix issues.',
        },
      ],
    },
    methodology: [
      'Audited the Superstore dataset for date grain, duplicate order IDs, negative profit outliers, and return flags.',
      'Built Level of Detail (LOD) expressions to compute customer-level order frequency and average discount exposure without distorting row-level aggregations.',
      'Used restrained, colorblind-safe encoding—reserving warm/alert contrast strictly for negative-margin segments rather than decorative rainbow palettes.',
    ],
    decisionsAndTradeoffs: [
      {
        decision: 'Prioritized profit ratio and margin distribution over raw sales leaderboards',
        rationale:
          'Sales-only charts reward high-discount volume. Leading with margin ratio makes unprofitable sub-categories immediately legible.',
      },
      {
        decision: 'Limited each view to three coordinated charts with shared cross-filtering',
        rationale:
          'Dense multi-chart canvases slow comprehension; deliberate whitespace and clear visual hierarchy keep the analytical narrative focused.',
      },
    ],
    lessonsLearned: [
      'High-revenue categories can still be net-negative contributors when discount bands exceed 20–30%.',
      'Dashboard clarity depends more on what you omit and how you align scales than on chart variety.',
    ],
    nextSteps: [
      'Publish an interactive Tableau Public embed and document the underlying SQL validation queries.',
    ],
  },
  {
    slug: 'python-stock-screener',
    index: '02',
    title: 'Python Stock Screener',
    category: 'Data Analytics',
    year: '2026',
    status: 'Active',
    tagline: 'Modular equity screening pipeline for reproducible fundamental and technical filtering.',
    summary:
      'A Python-based screening tool designed to fetch market data, normalize financial ratios, and rank equities against transparent, user-defined criteria.',
    stack: ['Python', 'pandas', 'NumPy', 'Market Data APIs', 'CLI'],
    featuredOnHome: true,
    repoUrl: 'https://github.com/WebCraftPhil/stock-screener-polygon-yfinance',
    context: {
      problem:
        'Web-based stock screeners lock filtering logic behind opaque UI presets, making it hard to combine custom fundamental ratios, handle missing fields consistently, or version-control screening rules.',
      goal:
        'Build a clean, scriptable Python pipeline where screening criteria are explicit, reproducible, and easy to extend into downstream quantitative notebooks.',
    },
    architecture: {
      heading: 'Pipeline Stages',
      description:
        'Decouples data ingestion, metric normalization, rule evaluation, and tabular output so data providers or rulesets can be swapped independently.',
      components: [
        {
          name: 'Ingestion & Caching Layer',
          detail: 'Fetches ticker fundamentals and price history with local caching to avoid redundant API calls during iterative rule tuning.',
        },
        {
          name: 'Normalization & Guardrails',
          detail: 'Handles missing or zero denominators (e.g., negative earnings on P/E) explicitly instead of letting NaN values silently pass or crash.',
        },
        {
          name: 'Composable Filter Engine',
          detail: 'Applies declarative threshold rules (valuation, liquidity, momentum) and outputs ranked candidates to CSV/terminal tables.',
        },
      ],
    },
    methodology: [
      'Modeled each screening rule as a pure predicate function over a typed pandas DataFrame.',
      'Separated raw data snapshots from calculated ratios so back-checks remain deterministic.',
      'Designed terminal and CSV export views for quick review alongside deeper notebook analysis.',
    ],
    decisionsAndTradeoffs: [
      {
        decision: 'CLI and CSV-first output rather than a heavy web dashboard',
        rationale:
          'Keeping the core tool lightweight in Python makes it faster to iterate on data quality, edge cases, and screening logic.',
      },
      {
        decision: 'Explicit missing-data handling over silent row dropping',
        rationale:
          'Financial APIs frequently omit fields for smaller issuers; logging why a ticker was excluded prevents survivorship or data-gap blind spots.',
      },
    ],
    lessonsLearned: [
      'Data hygiene (corporate actions, stale fundamentals, inconsistent units) consumes far more engineering effort than the screening math itself.',
      'Caching intermediate market responses turns slow API exploration into a tight, testable feedback loop.',
    ],
    nextSteps: [
      'Add automated unit tests for edge-case financial ratios and document sample screening profiles.',
    ],
  },
  {
    slug: 'ai-agent-n8n-automation-workflows',
    index: '03',
    title: 'AI Agent & n8n Automation Workflows',
    category: 'AI & Automation',
    year: '2026',
    status: 'Active',
    tagline: 'Deterministic orchestration paired with bounded LLM reasoning for real operational tasks.',
    summary:
      'Self-hosted n8n workflows combining structured webhooks, API integrations, and LLM classification/drafting steps with explicit validation and fallback paths.',
    stack: ['n8n', 'TypeScript', 'LLM Tool Calling', 'Webhooks', 'REST APIs', 'PostgreSQL'],
    featuredOnHome: true,
    context: {
      problem:
        'Purely prompt-driven AI agents are brittle in production workflows, while rigid traditional automations break when inputs are unstructured (emails, forms, or messy notes).',
      goal:
        'Combine n8n’s deterministic state machine and retry mechanics with narrow, schema-validated LLM steps for lead triage, content pipelines, and operational alerts.',
    },
    architecture: {
      heading: 'Hybrid Orchestration Pattern',
      description:
        'Uses deterministic triggers and routing around small, single-responsibility AI nodes that return strict JSON rather than open-ended prose.',
      components: [
        {
          name: 'Event & Webhook Intake',
          detail: 'Validates incoming payloads, deduplicates events, and normalizes fields before any model invocation.',
        },
        {
          name: 'Bounded AI Classification / Extraction',
          detail: 'Applies structured-output prompts to classify intent, extract entities, or draft contextual summaries.',
        },
        {
          name: 'Human-in-the-Loop & Fallback Routing',
          detail: 'Routes low-confidence outputs or external side effects through approval/notification channels instead of blind auto-execution.',
        },
      ],
    },
    methodology: [
      'Kept AI steps narrow—classification, extraction, and first-draft generation—while leaving branching, persistence, and error handling to deterministic n8n nodes.',
      'Logged execution payloads and failure states to make debugging non-deterministic edge cases straightforward.',
      'Applied rate-limiting and idempotency checks on webhook-triggered workflows.',
    ],
    decisionsAndTradeoffs: [
      {
        decision: 'Multiple small, typed workflow steps instead of one autonomous mega-agent',
        rationale:
          'Smaller steps are dramatically easier to inspect, test, and recover when an external API or model output misbehaves.',
      },
      {
        decision: 'Self-hosted n8n orchestration over custom glue scripts for every integration',
        rationale:
          'Visual execution history and built-in retry/credential management accelerate iteration without sacrificing code nodes where needed.',
      },
    ],
    lessonsLearned: [
      'Most "AI workflow" reliability problems are actually schema-validation, idempotency, and error-handling problems.',
      'Explicit human review gates build trust faster than full autonomy when stakes involve customer communication.',
    ],
    nextSteps: [
      'Publish sanitized workflow blueprints and evaluation notes on prompt/schema reliability.',
    ],
  },
  {
    slug: 'raspberry-pi-5-hailo-10h-local-ai-lab',
    index: '04',
    title: 'Raspberry Pi 5 & Hailo-10H Local AI Lab',
    category: 'Hardware & Lab',
    year: '2026',
    status: 'In Progress',
    tagline: 'Exploring edge AI inference, hardware acceleration, and local-first tooling on a 15W footprint.',
    summary:
      'A dedicated home lab built around a Raspberry Pi 5 and Hailo-10H NPU accelerator to benchmark local inference, privacy-preserving workflows, and edge deployment constraints.',
    stack: ['Raspberry Pi 5', 'Hailo-10H', 'Linux', 'Docker', 'Local Inference', 'Python'],
    featuredOnHome: true,
    context: {
      problem:
        'Cloud AI APIs make prototyping effortless, but they obscure latency, hardware constraints, memory bandwidth limits, and the real cost of running inference continuously.',
      goal:
        'Build a quiet, always-on local AI testbed to learn embedded Linux, NPU acceleration pipelines, model quantization trade-offs, and self-hosted automation.',
    },
    architecture: {
      heading: 'Edge Lab Stack',
      description:
        'An isolated ARM64 Linux environment pairing PCIe-attached Hailo-10H acceleration with containerized local services.',
      components: [
        {
          name: 'Compute & Accelerator Hardware',
          detail: 'Raspberry Pi 5 paired with a Hailo-10H AI accelerator over PCIe, actively cooled for sustained workloads.',
        },
        {
          name: 'Runtime & Model Tooling',
          detail: 'Hailo runtime/SDK stack alongside containerized Python and lightweight local service endpoints.',
        },
        {
          name: 'Telemetry & Benchmarking',
          detail: 'Captures thermal behavior, power draw, tokens/sec, and memory headroom under realistic workloads.',
        },
      ],
    },
    methodology: [
      'Configured headless Linux administration, SSH hardening, and reproducible container setups.',
      'Testing which workloads genuinely benefit from dedicated NPU acceleration versus CPU/RAM-bound small language models.',
      'Documenting driver, kernel, and quantization friction honestly as a living lab notebook.',
    ],
    decisionsAndTradeoffs: [
      {
        decision: 'Dedicated low-power edge hardware over a noisy workstation GPU',
        rationale:
          'Forces discipline around memory budgets, quantization, and thermal efficiency—skills that transfer directly to constrained production environments.',
      },
    ],
    lessonsLearned: [
      'Hardware-accelerated edge AI requires careful attention to kernel versions, PCIe configuration, and supported operator sets.',
      'Local-first setups clarify the true boundary between tasks that need frontier cloud models and tasks well suited to small local models.',
    ],
    nextSteps: [
      'Complete baseline thermal and throughput benchmarks and publish a full hardware setup guide in Writing.',
    ],
  },
  {
    slug: 'iron-and-ink-systems',
    index: '05',
    title: 'Iron & Ink Systems',
    category: 'Ventures',
    year: '2026',
    status: 'Active',
    externalUrl: 'https://ironandinksystems.com',
    tagline: 'Websites, lead capture, and practical automation systems for owner-operated local service businesses.',
    summary:
      'An entrepreneurial venture applying modern web engineering, conversion-focused UX, and pragmatic CRM/follow-up automation to help local trades and service businesses capture more work.',
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Automation', 'Technical SEO'],
    featuredOnHome: true,
    context: {
      problem:
        'Many skilled local service businesses—plumbers, roofers, contractors—lose qualified leads not because of poor craftsmanship, but because their websites are slow, unclear, or disconnected from timely call/text follow-up.',
      goal:
        'Build a focused service offering that pairs fast, clear websites with practical lead capture, missed-call text-back, and review/follow-up workflows without selling bloated software.',
    },
    architecture: {
      heading: 'System Foundation',
      description:
        'Connects conversion-focused front-end architecture with automated lead routing and lightweight diagnostic tooling.',
      components: [
        {
          name: 'Conversion-Focused Web Layer',
          detail: 'Mobile-first pages structured around clear service scope, local trust signals, and frictionless call/quote paths.',
        },
        {
          name: 'Lead Capture & Follow-Up',
          detail: 'Connects forms, missed-call triggers, and CRM pipelines so inquiries receive immediate, reliable acknowledgment.',
        },
        {
          name: 'Automated Website Diagnostics',
          detail: 'Built a live website checkup scanner evaluating lead capture, trust signals, and technical readiness.',
        },
      ],
    },
    methodology: [
      'Drew directly on firsthand experience in hands-on trades and construction-adjacent work to keep messaging grounded and jargon-free.',
      'Designed repeatable technical templates and diagnostic tools rather than one-off fragile setups.',
      'Maintained strict honesty in positioning—demonstrating real engineering capabilities without fabricated client claims.',
    ],
    decisionsAndTradeoffs: [
      {
        decision: 'Separating Iron & Ink Systems (commercial venture) from philgreene.net (personal brand)',
        rationale:
          'Gives commercial clients a clear business-solutions brand while allowing philgreene.net to showcase broader data analytics, AI lab experiments, and independent writing.',
      },
    ],
    lessonsLearned: [
      'Business owners care about reliability, speed to response, and traceability—not technical buzzwords.',
      'Building a real diagnostic scanner and clean intake pipeline teaches full-stack product thinking faster than any static portfolio.',
    ],
    nextSteps: [
      'Continue refining diagnostic tooling and publishing technical breakdowns of automation patterns.',
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((project) => project.slug === slug)
}
