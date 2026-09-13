export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  year: string;
  color: string;
  accent: string;
  status: 'PROD' | 'LIVE' | 'BETA';
  buildingStyle: 'tower' | 'cube' | 'prism' | 'minimal';
}

export const PROJECTS: Project[] = [
  {
    id: 'synapse-ai',
    title: 'SYNAPSE AGENT OS',
    category: 'AI & Autonomous Systems',
    tagline: 'Multi-agent orchestration framework for autonomous enterprise workflows.',
    description:
      'Engineered an agentic operational system capable of orchestrating 50+ specialized LLM agents in real time, handling deterministic fallbacks, self-healing memory pools, and sub-150ms tool execution loops.',
    deliverables: [
      'Multi-agent graph runtime with state checkpointing',
      'Real-time streaming dashboard with telemetry visualization',
      'Sub-second RAG search over 10M+ vectorized enterprise documents',
      'Deterministic safety layers and human-in-the-loop review queues',
    ],
    technologies: ['Next.js', 'Python', 'FastAPI', 'Three.js', 'Weaviate', 'Redis', 'PostgreSQL'],
    metrics: [
      { label: 'Latency Drop', value: '-64%' },
      { label: 'Agent Tasks/Day', value: '1.4M' },
      { label: 'Accuracy Score', value: '99.2%' },
    ],
    year: '2025',
    color: '#0A0A0A',
    accent: '#B7FF00',
    status: 'PROD',
    buildingStyle: 'tower',
  },
  {
    id: 'aether-commerce',
    title: 'AETHER COMMERCE CORE',
    category: 'E-Commerce & High-Volume Retail',
    tagline: 'Hyper-performant headless commerce platform with 3D product previews.',
    description:
      'A bespoke headless storefront with an integrated real-time 3D configurator, sub-second edge cache invalidation, and custom cart infrastructure engineered to handle 40,000 peak concurrent checkouts.',
    deliverables: [
      'Custom Three.js procedural 3D modular product customizer',
      'Edge SSR catalog routing under 35ms TTFB worldwide',
      'Custom checkout engine with zero layout shifts',
      'Real-time inventory synchronization across 12 warehouses',
    ],
    technologies: ['Next.js', 'React Three Fiber', 'Tailwind CSS', 'Stripe', 'Redis', 'Cloudflare Workers'],
    metrics: [
      { label: 'Conversion Lift', value: '+38%' },
      { label: 'Mobile PageSpeed', value: '99/100' },
      { label: 'Peak QPS', value: '12.8k' },
    ],
    year: '2024',
    color: '#161616',
    accent: '#FFD400',
    status: 'LIVE',
    buildingStyle: 'cube',
  },
  {
    id: 'nova-health',
    title: 'NOVA CARE PLATFORM',
    category: 'Healthcare & Clinical Telemetry',
    tagline: 'HIPAA-compliant remote patient diagnostic platform with predictive monitoring.',
    description:
      'Architected a zero-trust clinical intelligence suite connecting real-time wearable telemetry to automated triage workflows for doctors and hospital networks.',
    deliverables: [
      'Zero-trust end-to-end encrypted bi-directional WebRTC streaming',
      'Automated cardiac anomaly detection via edge inference models',
      'Interactive brutalist dashboard for emergency medical teams',
      'Full HIPAA/SOC2 Type II compliance audit passed on launch',
    ],
    technologies: ['TypeScript', 'Node.js', 'WebRTC', 'TimescaleDB', 'Docker', 'Next.js'],
    metrics: [
      { label: 'Clinical Adoption', value: '45+ Clinics' },
      { label: 'Alert Accuracy', value: '99.8%' },
      { label: 'Uptime SLA', value: '99.99%' },
    ],
    year: '2025',
    color: '#0E1726',
    accent: '#3A7DFF',
    status: 'PROD',
    buildingStyle: 'prism',
  },
  {
    id: 'orbit-cloud',
    title: 'ORBIT DEPLOYMENT CLOUD',
    category: 'Developer Tooling & Infrastructure',
    tagline: 'Ephemeral container deployment system with instant micro-preview environments.',
    description:
      'Engineered an internal cloud orchestration engine that provisions staging environments in under 3.2 seconds, with automated visual regression diffing and branch previews.',
    deliverables: [
      'Lightweight Firecracker micro-VM provisioning daemon',
      'Web-based interactive terminal with zero latency',
      'Automated visual DOM and screenshot comparison engine',
      'GitHub bot integrating directly into developer PR workflows',
    ],
    technologies: ['Rust', 'Go', 'Kubernetes', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    metrics: [
      { label: 'Provision Time', value: '3.1s' },
      { label: 'Dev Hours Saved', value: '3,200h' },
      { label: 'Monthly Builds', value: '820k' },
    ],
    year: '2024',
    color: '#1F1122',
    accent: '#FF4444',
    status: 'LIVE',
    buildingStyle: 'minimal',
  },
];
