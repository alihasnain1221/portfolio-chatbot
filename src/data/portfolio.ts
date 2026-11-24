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

// Proof strip under the hero. Each one is on record (CAREER-FINDINGS.md / CV).
export const proof = [
  { value: '~950', label: 'API regression cases in a suite I designed and lead' },
  { value: 'Jira → tests', label: 'A Claude agent I built writes regression tests from tickets' },
  { value: '1 → 12', label: 'Monolith split into independent microservices' },
  { value: 'Hours', label: 'To move production to a new AWS region during an outage' },
]

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
    url: 'https://umeedcs.com/',
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

// Compact cards under the featured three. `to` is an in-site route, `url` external.
// Wording follows each project's real role: "contributed" where it was a team effort.
export const moreProjects: {
  name: string
  domain: string
  blurb: string
  tags: string[]
  url?: string
  to?: string
  cta?: string
}[] = [
  {
    name: "This site's AI twin",
    domain: 'AI · Solo build',
    blurb:
      'The chatbot on this site. It answers only from my real repos and CV, with rules against overclaiming and leaking client details. One engine runs three live bots, across four LLM providers with automatic fallback.',
    tags: ['Python', 'FastAPI', 'Claude', 'Gemini', 'Docker'],
    to: '/chat',
    cta: 'Try it',
  },
  {
    name: 'SafeScan',
    domain: 'B2B SaaS · Jobsite safety',
    blurb:
      'Compliance and jobsite safety platform with real-time check-ins and digital inspections. I led the admin backend and built its AI assistant and AI-written monthly compliance reports on xAI Grok.',
    tags: ['MERN', 'gRPC', 'xAI Grok', 'AWS Lambda'],
    url: 'https://www.safesiteusa.com/',
  },
  {
    name: 'MojoTip',
    domain: 'Fintech · Cashless tipping',
    blurb:
      'Cashless tipping platform, launched as InstaTip. Built from scratch as an MVP, then scaled horizontally as load grew, with automated CI/CD.',
    tags: ['Node.js', 'MongoDB', 'TypeScript', 'CI/CD'],
    url: 'https://mojotip.com',
  },
  {
    name: 'Lantern Finance',
    domain: 'Fintech · Web3',
    blurb:
      'Fractional ETH staking that pools investments to reach the 32 ETH minimum. I contributed to the backend: BitGo and MetaMask integration, and keeping the in-app ledger in sync with on-chain state.',
    tags: ['MERN', 'BitGo', 'MetaMask', 'ethers.js'],
    url: 'https://lantern.finance/',
  },
  {
    name: 'CastingPAX',
    domain: 'B2B2C · Casting',
    blurb:
      'Casting platform that automates the casting process for directors and talent. Micro-frontend architecture, with unit tests and test stories in CI.',
    tags: ['MERN', 'Micro-frontends', 'AWS RDS'],
    url: 'https://www.castingpax.com/',
  },
  {
    name: 'Trove',
    domain: 'eGift cards · APAC',
    blurb:
      'eGift card distribution for employee gifting across the Asia-Pacific region, with a dashboard tracking spending and redemptions.',
    tags: ['MERN', 'AWS EC2', 'GCP Cloud Functions'],
    url: 'https://trove.com/',
  },
]

export const moreProjectsSection = {
  heading: 'More work',
  sub: 'Fintech, SaaS and AI builds from the same five years.',
}

// "How I build with AI": the differentiator, said plainly.
export const aiWork = {
  tag: 'Working with AI',
  heading: 'AI is how I build, not just what I build.',
  blurb:
    'I ship AI features, and I also use agents to ship everything else faster, with tests and guardrails so it stays trustworthy.',
  items: [
    {
      icon: 'smart_toy',
      title: 'Agents in production',
      text: 'Built a Claude Agent SDK agent on AWS Fargate that reads a Jira ticket and the merged code, then opens a pull request with regression tests. Driven from Jira and Slack, with time and cost caps on every run.',
    },
    {
      icon: 'hub',
      title: 'MCP, both sides',
      text: 'Wrote an MCP server that simulates platform users to fill test environments. Daily I work through MCP connections to Figma, Jira, Slack and GitHub.',
    },
    {
      icon: 'terminal',
      title: 'Claude Code, every day',
      text: 'Around 575 commits co-authored with Claude Code since February 2026, driven by my own skills: Playwright walkthroughs of every UI change, ticket and doc authoring, live server access.',
    },
    {
      icon: 'verified_user',
      title: 'Guardrails first',
      text: 'AI output gets checked: a 3-layer moderation pipeline in production, test agents that report what they did not cover, and a portfolio bot that refuses to claim work I did not do.',
    },
  ],
}

export const stackSection = {
  heading: 'Technical',
  headingBreak: 'Stack',
  blurb:
    'Microservices and distributed systems at the core, MERN as the primary stack, run on AWS with Terraform. Production AI pipelines, Claude agents and MCP on top, with Playwright regression suites keeping it honest.',
}

// Primary strengths, each backed by something shipped instead of a self-rated score.
export const strengths = [
  { label: 'BACKEND & MICROSERVICES', shipped: 'Split one monolith into 12 services, features across Node, Python and .NET APIs' },
  { label: 'CLOUD & IaC (AWS / TERRAFORM)', shipped: 'Per-branch test environments, WAF, autoscaling, a region move in hours' },
  { label: 'AI & AGENTS', shipped: '3-layer moderation in production, a test-writing agent, an MCP server' },
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
  leadership: [
    'Technical Lead since 2022, after leading a team of 6 engineers',
    'Unblocked 3 teams to deploy independently at UmeedVentures',
    'Code reviews, mentoring and sprint leadership as a daily habit',
    'MSCS, FAST National University, graduated with High Honors',
  ],
}

export const closing = {
  heading: "Got something that needs to scale, or needs AI that's actually reliable?",
  sub: "Ask my AI anything about my work, or reach me directly. I'm open to contract, advisory and full-time roles.",
  email: 'alibutthasnain@gmail.com',
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
