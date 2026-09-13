export interface CommercialCaseStudy {
  id: string;
  name: string;
  category: string;
  district: string;
  tagline: string;
  description: string;
  qevnSolution: string;
  features: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  demoType: 'ordering' | 'booking' | 'commerce' | 'healthcare' | 'workspace' | 'gallery';
}

export const COMMERCIAL_STUDIES: CommercialCaseStudy[] = [
  {
    id: 'pixel-coffee',
    name: 'PIXEL COFFEE',
    category: 'Hospitality & Quick-Service Retail',
    district: 'Commercial Quarter',
    tagline: 'Hyper-fast mobile ordering & decentralized coffee loyalty protocol.',
    description:
      'A bustling specialty espresso bar in the heart of QEVN Town serving third-wave coffee to builders, founders, and engineers.',
    qevnSolution:
      'Engineered an edge-cached digital ordering web app with sub-second order dispatching, Apple Pay/Google Pay one-tap checkout, and live counter queue telemetry.',
    features: [
      'Sub-500ms order dispatch to barista tablet terminal',
      'Real-time live queue wait estimation via WebSocket telemetry',
      'Contactless NFC mobile tap-to-order without app installation',
      'Automated dynamic inventory tracking per espresso extraction',
    ],
    metrics: [
      { label: 'Wait Time Cut', value: '-48%' },
      { label: 'Repeat Orders', value: '76%' },
      { label: 'Checkout Speed', value: '1.2s' },
    ],
    accentColor: '#FFD400',
    demoType: 'ordering',
  },
  {
    id: 'null-hotel',
    name: 'NULL HOTEL',
    category: 'Luxury Travel & Spatial Hospitality',
    district: 'Commercial Quarter',
    tagline: 'Minimalist brutalist boutique hotel powered by zero-friction digital keys.',
    description:
      'An iconic 40-room brutalist boutique hotel for visiting researchers, designers, and executives visiting QEVN Town.',
    qevnSolution:
      'Architected a seamless spatial reservation engine with interactive 3D room configurators, WebBLE digital room keys, and automated concierge workflows.',
    features: [
      'Interactive 3D real-time room preview and bed selection',
      'Web-Bluetooth digital door unlock directly from browser',
      'Automated temperature and ambient lighting preset sync',
      'Zero-front-desk instantaneous self check-in',
    ],
    metrics: [
      { label: 'Direct Booking %', value: '88%' },
      { label: 'Guest Rating', value: '4.95/5' },
      { label: 'Check-in Duration', value: '<15s' },
    ],
    accentColor: '#B7FF00',
    demoType: 'booking',
  },
  {
    id: 'loop-market',
    name: 'LOOP MARKET',
    category: 'Next-Gen E-Commerce & Retail',
    district: 'Commercial Quarter',
    tagline: 'High-throughput omni-channel retail with unified inventory synchronization.',
    description:
      'A curated modern departmental marketplace carrying technical apparel, hardware tools, and design artifacts.',
    qevnSolution:
      'Built a headless Shopify/Medusa platform on Next.js App Router with real-time in-store inventory reservation and sub-35ms page transitions worldwide.',
    features: [
      'Instant search over 50,000 SKUs with Algolia vector embeddings',
      'Unified warehouse-to-store bi-directional inventory ledger',
      'Spatial 3D product previews on mobile Safari & Chrome',
      'Zero-layout-shift checkout architecture',
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+34%' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Order Volume', value: '$8.2M/yr' },
    ],
    accentColor: '#FF4444',
    demoType: 'commerce',
  },
  {
    id: 'patch-pharmacy',
    name: 'PATCH PHARMACY & CLINIC',
    category: 'Healthcare & Clinical Telemetry',
    district: 'Healthcare Quarter',
    tagline: 'HIPAA-compliant autonomous prescription dispatch and tele-consultation.',
    description:
      'A modern clinical diagnostics outpost providing rapid health screenings and automated medicine delivery across the town.',
    qevnSolution:
      'Engineered an encrypted telemedicine scheduling portal and autonomous locker dispatch system with biometric authentication and zero-trust audit trails.',
    features: [
      'End-to-end encrypted WebRTC consultation video streams',
      'Automated insurance eligibility verification via API in 800ms',
      'Smart temperature-monitored smart locker pickup integration',
      'SOC2 Type II & HIPAA verified database architecture',
    ],
    metrics: [
      { label: 'Triage Time', value: '-65%' },
      { label: 'Prescription SLA', value: '15 Min' },
      { label: 'Audit Score', value: '100%' },
    ],
    accentColor: '#3A7DFF',
    demoType: 'healthcare',
  },
  {
    id: 'ctrl-cowork',
    name: 'CTRL COWORK',
    category: 'Developer Spaces & SaaS Platform',
    district: 'Commercial Quarter',
    tagline: '24/7 autonomous workspace for independent engineers and agent researchers.',
    description:
      'A multi-level collaborative engineering house equipped with fiber connectivity, private server racks, and meeting pods.',
    qevnSolution:
      'Developed an all-in-one workspace operating system handling desk bookings, dynamic Wi-Fi VLAN provisioning, and computational cluster credit allocations.',
    features: [
      'Automated IEEE 802.1X private VLAN network assignment',
      'Real-time meeting pod sensor occupancy telemetry',
      'Integrated Stripe recurring membership billing',
      'Local GPU cluster compute time scheduling queue',
    ],
    metrics: [
      { label: 'Occupancy Rate', value: '96%' },
      { label: 'Active Builders', value: '420+' },
      { label: 'Uptime', value: '99.999%' },
    ],
    accentColor: '#B7FF00',
    demoType: 'workspace',
  },
  {
    id: 'frame-gallery',
    name: 'FRAME GALLERY',
    category: 'Digital Culture & Spatial Media',
    district: 'Culture Quarter',
    tagline: 'Experimental gallery exhibiting generative art and creative technology.',
    description:
      'An avant-garde exhibition hall displaying physical installations, interactive projection mapping, and digital artifacts.',
    qevnSolution:
      'Created an ultra-high resolution WebGL virtual exhibition companion platform with spatial audio tours and provenance tracking.',
    features: [
      'High-dynamic-range spatial 3D virtual tour with audio panning',
      'Cryptographic provenance verification and digital certificates',
      'Interactive visitor collaborative art canvases',
      'Sub-second 8K canvas tile streaming',
    ],
    metrics: [
      { label: 'Virtual Visitors', value: '250k+' },
      { label: 'Audio Tour Time', value: '18 Min' },
      { label: 'Exhibitions Run', value: '14' },
    ],
    accentColor: '#FFD400',
    demoType: 'gallery',
  },
];
