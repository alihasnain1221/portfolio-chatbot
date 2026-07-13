// -----------------------------------------------------------------------------
// Home content, grounded in backend/data/profile.yaml + the /ask bundle (real
// projects, stack, and CV metrics). Kept honest: no invented projects, tech, or
// numbers. NOTE: images in /public/img are still Stitch AI placeholders (not
// real Ali / not real screenshots) and should be swapped separately.
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
    'Ali Hasnain is a Senior Software & AI Engineer and Technical Lead. Microservices and distributed systems at heart, run on AWS with Terraform, with production multi-model AI pipelines on top. 5+ years across fintech, healthcare, and SaaS.',
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
    to: 'alihussnain20.dev@gmail.com',
    engagementOptions: ['Contract / Build', 'Strategic Advisory', 'Full-Time role', 'Other'],
    submit: 'Send inquiry',
  },
}

export const projectsSection = {
  heading: 'Featured Work',
  sub: 'Selected production systems, 2021 to present.',
  allLabel: 'All Projects',
}

export const heroProject = {
  badge: 'Production · AI Moderation',
  index: '01/03',
  name: 'SPiN',
  blurb:
    'A production sports social network where I built a 3-layer AI content moderation pipeline (AWS Rekognition, then OpenAI Moderation, then GPT-4o with structured output) and re-architected the backend from a monolith into microservices with full Terraform IaC on AWS.',
  tags: ['MERN', 'AWS', 'GPT-4o', 'Terraform', 'Microservices'],
  image: '/img/spin-pipeline.svg',
}

export const sideProjects = [
  {
    name: 'UmeedVentures',
    blurb:
      'Re-architected a coupled 3-module monolith into 12 independent microservices with full Terraform IaC on AWS, and led cross-region disaster recovery during an AWS outage.',
    tags: ['NEST.JS', 'TERRAFORM', 'AWS'],
  },
  {
    name: 'Success.ai',
    blurb:
      'A multi-channel cold outreach platform. Apify scrapes LinkedIn leads, AI generates personalized copy, and a unified multi-account inbox drives automated EmailEngine sequences. Self-hosted on openClaw.',
    tags: ['MERN', 'OPENAI', 'AUTOMATION'],
  },
]

export const stackSection = {
  heading: 'Technical',
  headingBreak: 'Stack',
  blurb:
    'Microservices and distributed systems at the core, MERN as the primary stack, run on AWS with Terraform. Production multi-model AI pipelines and agentic automation on top.',
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
    items: ['Multi-model AI pipelines', 'LLMs & GPT-4o', 'RAG & structured output', 'Agentic (n8n + MCP)'],
  },
  {
    icon: 'dns',
    title: 'Backend',
    items: ['Node.js / Nest.js / Express', 'MERN stack', 'REST & gRPC', 'Event-driven architecture'],
  },
  {
    icon: 'cloud_queue',
    title: 'Infrastructure',
    items: ['Terraform / HashiCorp', 'AWS (Lambda, ECS, RDS)', 'CI/CD pipelines', 'Grafana / OpenTelemetry'],
  },
  {
    icon: 'terminal',
    title: 'Frontend',
    items: ['React / Vite', 'TypeScript', 'Redux / Redux Saga', 'Micro-frontends'],
  },
]

export const story = {
  tag: 'Engineering Philosophy',
  heading: 'Systems that bend, not break.',
  blurb:
    "I lead architecture-first. Whether I'm leading a team of 6 or splitting a monolith into microservices, the goal is clarity and resilience: reproducible infrastructure as code, zero-downtime deploys, and recovery that holds up when a whole region goes down.",
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: 'Lead', label: 'Cross-functional teams' },
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
    { label: 'Email', href: 'mailto:alihussnain20.dev@gmail.com' },
  ],
}
