export interface CafeDispatch {
  id: string;
  title: string;
  date: string;
  category: 'DISPATCH' | 'CULTURE' | 'ENGINEERING' | 'EVENT';
  readTime: string;
  summary: string;
  content: string[];
  author: string;
}

export const CAFE_DISPATCHES: CafeDispatch[] = [
  {
    id: 'dispatch-004',
    title: 'THE DEATH OF THE GENERIC SAAS LANDING PAGE',
    date: 'OCT 2025',
    category: 'CULTURE',
    readTime: '4 MIN READ',
    author: 'DHRUV @ QEVN',
    summary: 'Why modern web users are numb to gradient cards and why spatial, brutalist digital worlds command 10x attention.',
    content: [
      'Every agency and B2B SaaS website looks like a clone of a clone: rounded corners, purple gradients, floating glass cards, and meaningless stock copy: "We transform businesses for the digital age."',
      'Nobody remembers these websites. Five seconds after closing the tab, they have completely dissolved from the visitor’s memory.',
      'QEVN Town is our philosophical antidote. We believe the web should be an environment you enter, explore, and touch. Physical spatial memory triggers completely different cognitive pathways than scrolling through boilerplate marketing templates.',
      'Brutalism provides clarity. Hard shadows provide depth without artificial blur. The town provides context. Welcome to the future of digital presence.',
    ],
  },
  {
    id: 'dispatch-003',
    title: 'HOW WE ARCHITECT 60FPS THREE.JS IN NEXT.JS APP ROUTER',
    date: 'SEP 2025',
    category: 'ENGINEERING',
    readTime: '6 MIN READ',
    author: 'ENGINEERING LAB',
    summary: 'De-coupling the 3D scene from DOM state, procedural geometry optimization, and avoiding memory leaks.',
    content: [
      'The single biggest mistake developers make when combining React Three Fiber with Next.js is binding high-frequency render loops to React state.',
      'In QEVN Town, the 3D coordinate loop runs in raw requestAnimationFrame / useFrame loops without triggering React re-renders. Zustand handles the loose coupling between proximity triggers and 2D brutalist HUD overlays.',
      'Furthermore, rather than downloading 40MB of external GLB files that stall the initial connection, our architectural buildings are composed procedurally from lightweight Three.js primitives with edge geometry highlighting.',
    ],
  },
  {
    id: 'dispatch-002',
    title: 'TOWN UPDATE: ROOFTOP ANTENNAS & NIGHT SKY CYCLES',
    date: 'AUG 2025',
    category: 'DISPATCH',
    readTime: '2 MIN READ',
    author: 'MAYOR OF QEVN',
    summary: 'District 2 street lamps have been connected to the town electrical grid. New secret switches discovered.',
    content: [
      'The town council has approved the installation of the high-voltage breaker box in Alleyway 01. Citizens are strongly advised NOT to pull the switch.',
      'We have also installed automated delivery bots patrolling the perimeter roads and added warm ambient lighting for evening strolls.',
    ],
  },
  {
    id: 'dispatch-001',
    title: 'QEVN OPEN HACKATHON & BUILD NIGHT #04',
    date: 'JUL 2025',
    category: 'EVENT',
    readTime: '3 MIN READ',
    author: 'COMMUNITY',
    summary: 'Join us at the virtual cafe table for 48 hours of autonomous agent hacking, shaders, and brutalist interfaces.',
    content: [
      'Next Friday at 18:00 UTC, the QEVN team is opening the doors to our open sprint. Bring your weirdest ideas, your most ambitious agent frameworks, and your favorite coffee beans.',
      'Prizes include custom QEVN merchandise, computational credits, and permanent plaques on Project Street.',
    ],
  },
];
