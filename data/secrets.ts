export interface SecretDiscovery {
  id: string;
  name: string;
  hint: string;
  unlockedTitle: string;
  unlockedDescription: string;
  badgeCode: string;
  color: string;
}

export const SECRETS: SecretDiscovery[] = [
  {
    id: 'secret-breaker',
    name: 'HIGH VOLTAGE BREAKER',
    hint: 'Look behind the north alley of QEVN HQ for an industrial yellow console with a warning.',
    unlockedTitle: 'YOU PULLED THE FORBIDDEN SWITCH',
    unlockedDescription:
      'Despite the clear "DO NOT TOUCH" warning, your irresistible curiosity tripped the town breaker, opening the subterranean QEVN engineering bunker. You possess the soul of a true hacker.',
    badgeCode: 'BREAKER-OVERRIDE // 001',
    color: '#FFD400',
  },
  {
    id: 'secret-datacenter',
    name: 'DATA CENTER FORBIDDEN NODE',
    hint: 'Inspect the high-security cooling vent behind the brutalist Data Center.',
    unlockedTitle: 'ROOT CLUSTER EXPOSED',
    unlockedDescription:
      'You bypassed the perimeter cooling ducts and uncovered the unindexed zero-layer compute cluster running synthetic neural simulations.',
    badgeCode: 'ZERO-LAYER // 002',
    color: '#B7FF00',
  },
  {
    id: 'secret-rooftop',
    name: 'AI LAB ROOFTOP TRANSMISSION',
    hint: 'Approach the pulsing radar antenna atop the AI Lab during nighttime.',
    unlockedTitle: 'NEURAL FREQUENCY INTERCEPTED',
    unlockedDescription:
      'You tuned into the AI Lab’s unencrypted agent communication frequency. Encrypted payload: "AGENTS DO NOT SLEEP, THEY REFINE LOSS WEIGHTS."',
    badgeCode: 'NEURAL-LINK // 003',
    color: '#3A7DFF',
  },
  {
    id: 'secret-bench',
    name: 'PHILOSOPHER’S BENCH',
    hint: 'Sit on the lonely park bench beside the Central Plaza fountain for 5 seconds.',
    unlockedTitle: 'ZEN IN THE BRUTALIST METROPOLIS',
    unlockedDescription:
      'You took a pause amidst the frantic velocity of modern technology. QEVN thanks you for breathing.',
    badgeCode: 'MINDFUL-BUILDER // 004',
    color: '#FF4444',
  },
  {
    id: 'secret-station',
    name: 'MAINTENANCE TUNNEL 05',
    hint: 'Explore the dead-end railway track switch behind Central Station.',
    unlockedTitle: 'GHOST LINE UNCOVERED',
    unlockedDescription:
      'You located the decommissioned subway spur rumored to connect QEVN Town directly to the global root internet exchange.',
    badgeCode: 'SUBNET-SPUR // 005',
    color: '#FFD400',
  },
];
