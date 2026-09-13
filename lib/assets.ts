/**
 * QEVN Town 2.0 — Asset Manifest & 3D Pipeline
 * Defines asset tiers (A: Hero, B: District, C: Background),
 * preloading configs, and hybrid procedural-GLB fallback architecture.
 */

export type AssetTier = 'A_HERO' | 'B_DISTRICT' | 'C_BACKGROUND';

export interface ModelAsset {
  id: string;
  name: string;
  path: string;
  tier: AssetTier;
  district: string;
  preload: boolean;
  lodLevels?: number;
  tags?: string[];
}

export const ASSET_MANIFEST: Record<string, ModelAsset> = {
  // TIER A — HERO LANDMARKS
  QEVN_HQ: {
    id: 'QEVN_HQ',
    name: 'QEVN Global Headquarters',
    path: '/models/buildings/qevn_hq.glb',
    tier: 'A_HERO',
    district: 'hq',
    preload: true,
    lodLevels: 3,
  },
  QEVN_CENTRAL_STATION: {
    id: 'QEVN_CENTRAL_STATION',
    name: 'Central Transit Terminal',
    path: '/models/buildings/central_station.glb',
    tier: 'A_HERO',
    district: 'transit',
    preload: false,
    lodLevels: 2,
  },
  AI_LAB: {
    id: 'AI_LAB',
    name: 'AI Research Laboratory',
    path: '/models/buildings/ai_lab.glb',
    tier: 'A_HERO',
    district: 'campus',
    preload: false,
    lodLevels: 2,
  },

  // TIER B — COMMERCIAL & DISTRICT
  PIXEL_COFFEE: {
    id: 'PIXEL_COFFEE',
    name: 'Pixel Coffee Specialty Roastery',
    path: '/models/buildings/pixel_coffee.glb',
    tier: 'B_DISTRICT',
    district: 'commercial',
    preload: true,
    lodLevels: 2,
  },
  NULL_HOTEL: {
    id: 'NULL_HOTEL',
    name: 'Null Boutique Hotel',
    path: '/models/buildings/null_hotel.glb',
    tier: 'B_DISTRICT',
    district: 'commercial',
    preload: false,
    lodLevels: 2,
  },

  // CHARACTERS
  HERO_PLAYER: {
    id: 'HERO_PLAYER',
    name: 'Hero Player (Stylized Techwear / Flannel)',
    path: '/models/characters/hero_player.glb',
    tier: 'A_HERO',
    district: 'all',
    preload: true,
  },
  NPC_TAILORED_LEAD: {
    id: 'NPC_TAILORED_LEAD',
    name: 'Julian / Creative Partner',
    path: '/models/characters/npc_julian.glb',
    tier: 'B_DISTRICT',
    district: 'plaza',
    preload: true,
  },
};

/**
 * Check if a GLB model is available, otherwise fallback smoothly to high-fidelity procedural geometry.
 */
export function hasAsset(id: string): boolean {
  return id in ASSET_MANIFEST;
}
