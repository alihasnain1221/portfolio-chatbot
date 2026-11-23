// -----------------------------------------------------------------------------
// Home content, grounded in portfolio-bot-engine/data/profile.yaml and the
// git-verified CAREER-FINDINGS.md (section 9 wording). Kept honest: no invented
// projects, tech or numbers; a number appears only if it's on record.
// -----------------------------------------------------------------------------

export const API_BASE: string = (import.meta.env.VITE_API_BASE as string) ?? ''

export const nav = {
  name: 'ALI HASNAIN',
  links: [
    { label: 'PROJECTS', href: '/#projects' },
    { label: 'STACK', href: '/#stack' },
    { label: 'STORY', href: '/#story' },
  ],
  cta: 'HIRE ME',
}

export const hero = {
  titleLight: 'Architecting resilient',
  titleBold: 'systems with AI.',
  blurb:
    'Ali Hasnain is a Senior Software & AI Engineer and Technical Lead. Microservices and distributed systems at heart, run on AWS with Terraform, with production AI pipelines and Claude-powered agents on top. 5+ years across sports, fintech, healthcare, and SaaS.',
  primaryCta: 'VIEW PROJECTS',
  secondaryCta: 'ASK MY AI',
}

export const aiTwin = {
  name: "Ali's AI Twin",
  status: 'Online & Thinking',
  // Abstract network glyph (Material Symbols "hub") represents the AI as a
  // connected system rather than a human face. No image asset needed.
  icon: 'hub',
  greeting:
    "Hey, I'm Ali's AI twin. Ask me anything about my work, my stack, or whether I'm a fit for your project.",
  suggestions: ['Tell me about SPiN', 'What is your stack?', 'Are you available?'],
  placeholder: 'Ask my AI anything...',
}

// Dedicated chat-focused screen (ported from Stitch "AI Architect MVP (Chat
// Focus)"): centered headline over one big glass chat slab.
export const chatPage = {
  heroTitle: 'Ask my AI anything.',
  heroSubtitle:
    "I'm a digital twin of Ali's actual work. Ask me about the projects, the stack, or whether I'm a fit for what you're building.",
  agentTag: 'Grounded in real work',
  statusIdle: 'Online',
  inputPlaceholder: 'Ask about the work...',
}

// Hire Me page (ported from Stitch "Hire Me (Blueprint Variant)"). Copy grounded
// in the real profile; the form composes a mailto to the contact address.
export const hirePage = {
  title: 'The Blueprint Inquiry',
  subtitle:
    "Let's talk about a build, an architecture review, or a system that needs to scale. Contract, advisory, or full-time.",
  availabilityLabel: 'Availability',
  availability:
    "Open to freelance and contract work, remote and global. I've got flexibility on timing, and I'm happy to talk the specifics through on a call.",
  engagementLabel: 'Engagement Models',
  engagementModels: [
    {
      icon: 'account_tree',
      title: 'Contract / Build',
      text: 'End-to-end design and delivery: microservices architecture, AI pipelines, and cloud infrastructure with Terraform IaC. Typically 3 to 6 month engagements.',
    },
    {
      icon: 'lightbulb',
      title: 'Strategic Advisory',
      text: 'Architecture reviews, scaling and resilience strategy, CI/CD and observability setup, and engineering team mentorship on a retainer.',
    },
    {
      icon: 'business_center',
      title: 'Full-Time',
      text: 'Open to the right role solving real backend, distributed-systems, or applied-AI problems.',
    },
  ],
  domainsLabel: 'Preferred Domains',
  domains: [
    'AI & LLM Pipelines',
    'Microservices & Distributed Systems',
    'Cloud & IaC (AWS / Terraform)',
    'Backend Architecture',
  ],
  form: {
    heading: 'Start the conversation',
    sub: 'Tell me what you\'re building. This composes an email straight to my inbox.',
    to: 'alibutthasnain@gmail.com',
    engagementOptions: ['Contract / Build', 'Strategic Advisory', 'Full-Time role', 'Other'],
    submit: 'Send inquiry',
  },
}

export const projectsSection = {
  heading: 'Featured Work',
  sub: 'Selected production systems, 2021 to present.',
  allLabel: 'All Projects',
}

// All featured projects share one shape so the desktop "spotlight" swap can
// move any of them into the big card (badge, index, highlights and all).
export const featuredProjects = [
  {
    badge: 'Production · AI Moderation',
    index: '01/03',
    name: 'SPiN',
    blurb:
      'A production sports network for teams, leagues and families. I built its 3-layer AI content moderation pipeline, lead its API regression testing, and built a Claude agent that writes regression tests from Jira tickets, across a platform that moved from a Node monolith to microservices on AWS.',
    highlights: [
      '3-layer AI moderation: vision (Rekognition) → language (OpenAI Moderation) → judgment (GPT-4o, structured output), as Terraform-managed Lambdas',
      'Designed a ~950-case Playwright API regression suite gating a Node → .NET / Postgres backend rewrite, reported to Slack daily by impact',
      'Built a Claude Agent SDK agent on AWS Fargate that turns Jira acceptance criteria and merged backend changes into regression tests',
      'Short-lived full-stack test environments per branch (Terraform, ECS Fargate, GitHub Actions)',
      'AWS WAF on the edge, ECS autoscaling with load tests, a crawler moved from ECS to Lambda + SQS',
    ],
    tags: ['AWS', 'GPT-4o', 'Claude Agents', 'Playwright', 'Terraform'],
    image: '/FeaturedProjectsPictures/Spin.png',
    url: 'https://spinsports.ai/',
  },
  {
    badge: 'Production · Microservices Decomposition',
    index: '02/03',
    name: 'UmeedVentures',
    blurb:
      'Re-architected a coupled 3-module monolith into 12 independent microservices with full Terraform IaC on AWS, and led cross-region disaster recovery during an AWS outage.',
    highlights: [
      'Monolith-to-12 microservices decomposition, so teams deploy in parallel without blocking each other',
      'Full Terraform IaC on AWS (ECS, CDN, RDS, API Gateway), reproducible and region-portable',
      'Led disaster recovery during a Bahrain AWS region outage, moving production to a new region in hours',
      'Nest.js BFF / gateway over Node.js microservices, cost parity while doubling reliability across 3 teams',
    ],
    tags: ['NEST.JS', 'TERRAFORM', 'AWS'],
    image: '/img/umeed-microservices.svg',
  },
  {
    badge: 'Production · AI Cold Outreach',
    index: '03/03',
    name: 'Success.ai',
    blurb:
      'A multi-channel cold outreach platform. Apify scrapes LinkedIn leads, AI generates personalized copy, and a unified multi-account inbox drives automated EmailEngine sequences. Self-hosted on openClaw.',
    highlights: [
      'LinkedIn lead sourcing via automated Apify scraping pipelines',
      'AI-generated personalized outreach copy with OpenAI',
      'Unified multi-account inbox driving automated EmailEngine sequences',
      'End-to-end multi-channel cold outreach, self-hosted',
    ],
    tags: ['MERN', 'OPENAI', 'AUTOMATION'],
    image: '/FeaturedProjectsPictures/SuccessAI.png',
    url: 'https://www.success.ai/',
  },
]

export const stackSection = {
  heading: 'Technical',
  headingBreak: 'Stack',
  blurb:
    'Microservices and distributed systems at the core, MERN as the primary stack, run on AWS with Terraform. Production AI pipelines, Claude agents and MCP on top, with Playwright regression suites keeping it honest.',
}

// Primary strengths (relative emphasis, not a precision score).
export const masteryBars = [
  { label: 'BACKEND & MICROSERVICES', pct: 95 },
  { label: 'CLOUD & IaC (AWS / TERRAFORM)', pct: 88 },
  { label: 'AI & LLM PIPELINES', pct: 85 },
]

export const stackCategories = [
  {
    icon: 'psychology',
    title: 'AI/ML',
    items: ['Multi-model AI pipelines (GPT-4o, Rekognition)', 'Claude Agent SDK & Claude Code', 'MCP servers (authoring & using)', 'n8n automation, structured LLM output'],
  },
  {
    icon: 'dns',
    title: 'Backend',
    items: ['Node.js / Nest.js / Express', 'Python FastAPI, C# / .NET', 'PostgreSQL, MongoDB, Redis', 'Event-driven (SQS, Lambda)'],
  },
  {
    icon: 'cloud_queue',
    title: 'Infrastructure',
    items: ['Terraform / Terraform Cloud', 'AWS (ECS Fargate, Lambda, WAF)', 'GitHub Actions CI/CD', 'OpenTelemetry / Sentry'],
  },
  {
    icon: 'terminal',
    title: 'Frontend & Testing',
    items: ['React / Vue 3 / TypeScript', 'Capacitor (iOS & Android)', 'Playwright E2E & API suites', 'Micro-frontends'],
  },
]

export const story = {
  tag: 'Engineering Philosophy',
  heading: 'Systems that bend, not break.',
  blurb:
    "I lead architecture-first. Whether I'm leading a team of 6 or splitting a monolith into microservices, the goal is clarity and resilience: reproducible infrastructure as code, zero-downtime deploys, and recovery that holds up when a whole region goes down.",
  // The Story grid is 3 columns; keep exactly 3 stats, each on record in the CV.
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '6', label: 'Engineers Led' },
    { value: '99.9%', label: 'Uptime' },
  ],
  image: '/img/story-resilience.svg',
  badge: 'Architecture First',
}

export const footer = {
  name: 'ALI HASNAIN',
  copy: '© 2026 Ali Hasnain. Senior Software & AI Engineer.',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ali-hasnain-mir' },
    { label: 'Email', href: 'mailto:alibutthasnain@gmail.com' },
    { label: 'Call', href: 'tel:+923334422887' },
  ],
}
