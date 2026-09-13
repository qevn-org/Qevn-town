export interface Service {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  deliverables: string[];
  typicalTimeline: string;
  accent: string;
  badge: string;
}

export const SERVICES: Service[] = [
  {
    id: 'ai-engineering',
    title: 'AI & AGENTIC SYSTEMS',
    category: 'Intelligence Engineering',
    shortDesc: 'Autonomous multi-agent swarms, custom fine-tuned LLMs, RAG knowledge bases, and cognitive workflows.',
    fullDesc:
      'We turn frontier machine learning research into production-grade systems. From autonomous task-completing agents and reasoning pipelines to enterprise RAG retrieval systems and custom fine-tuning, we build AI that actually ships and drives measurable ROI.',
    capabilities: [
      'Multi-agent orchestration & state machines',
      'High-throughput RAG search over vector databases',
      'Structured tool-calling with deterministic schemas',
      'Local & edge model deployment (Ollama / vLLM)',
      'Prompt evaluation pipelines & benchmark harnesses',
    ],
    deliverables: ['Production AI API', 'Agent Control Dashboard', 'Evaluation Harness', 'Deployment Runbook'],
    typicalTimeline: '4 - 10 Weeks',
    accent: '#3A7DFF',
    badge: 'CORE RESEARCH',
  },
  {
    id: 'web-platforms',
    title: 'ADVANCED WEB APPLICATIONS',
    category: 'Full-Stack Architecture',
    shortDesc: 'Hyper-responsive Next.js applications, custom 3D web experiences, and high-conversion platforms.',
    fullDesc:
      'Websites that feel like entering an entirely new dimension. We combine cutting-edge web graphics (Three.js, WebGL, WebGPU, Shaders) with robust server-side architecture (Next.js App Router, Edge compute, streaming SSR) to craft memorable, high-performance web products.',
    capabilities: [
      'Next.js App Router architecture & Server Actions',
      'Real-time interactive 3D & WebGL canvas experiences',
      'Strict accessibility, SEO, and sub-100ms Core Web Vitals',
      'Design systems with playful brutalist & editorial styling',
      'Complex state management and offline-first PWA sync',
    ],
    deliverables: ['Full Next.js Codebase', 'Design System Tokens', 'Lighthouse 95+ Audit', 'CI/CD Pipelines'],
    typicalTimeline: '4 - 8 Weeks',
    accent: '#B7FF00',
    badge: 'FLAGSHIP',
  },
  {
    id: 'mobile-engineering',
    title: 'MOBILE & CROSS-PLATFORM',
    category: 'Native & Hybrid Apps',
    shortDesc: 'Silky smooth iOS and Android applications with offline-first synchronization and native device hooks.',
    fullDesc:
      'We build mobile applications that feel native, responsive, and delightful. Leveraging React Native, Expo, and native Swift/Kotlin modules, we ship production apps to App Store and Google Play with zero friction.',
    capabilities: [
      'Cross-platform React Native / Expo development',
      '60fps fluid gesture navigation and reanimated micro-interactions',
      'Offline SQLite data caching and background sync',
      'Biometrics, push notification engines, and deep linking',
    ],
    deliverables: ['App Store & Play Store Builds', 'Over-The-Air Update Pipeline', 'Native Test Suite'],
    typicalTimeline: '6 - 12 Weeks',
    accent: '#FFD400',
    badge: 'MOBILE',
  },
  {
    id: 'workflow-automation',
    title: 'BUSINESS & SYSTEM AUTOMATION',
    category: 'Enterprise Infrastructure',
    shortDesc: 'Eliminate repetitive manual toil with deterministic webhook pipelines, CRM sync, and automated queues.',
    fullDesc:
      'We identify bottlenecks in your operational pipeline and engineer custom automation daemons, webhook listeners, automated document parsers, and custom Slack/Discord bot control panels to multiply your team’s throughput.',
    capabilities: [
      'Event-driven microservices & webhook relays',
      'Automated invoice, document, and contract OCR pipelines',
      'CRM, ERP, and payment ledger bidirectional synchronization',
      'Custom internal admin tooling & monitoring dashboards',
    ],
    deliverables: ['Automated Serverless Workflows', 'Audit Trail DB', 'Alerting & PagerDuty Integration'],
    typicalTimeline: '2 - 6 Weeks',
    accent: '#FF4444',
    badge: 'INFRASTRUCTURE',
  },
];
