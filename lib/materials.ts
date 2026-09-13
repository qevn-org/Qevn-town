/**
 * QEVN Town 2.0 — Architectural Material Palette
 * Pre-tuned Three.js materials matching the modern architectural visualization references:
 * White concrete, warm wood slats, exposed brick, dark structural steel, clear glass, and travertine stone.
 */

import * as THREE from 'three';

export const PBR_MATERIALS = {
  // 1. Concrete & Masonry
  CONCRETE_WHITE: new THREE.MeshStandardMaterial({
    color: '#F4F4F0',
    roughness: 0.82,
    metalness: 0.05,
  }),
  CONCRETE_DARK: new THREE.MeshStandardMaterial({
    color: '#1C1917',
    roughness: 0.75,
    metalness: 0.15,
  }),
  BRICK_TERRACOTTA: new THREE.MeshStandardMaterial({
    color: '#9A3412',
    roughness: 0.88,
    metalness: 0.05,
  }),
  STONE_TRAVERTINE: new THREE.MeshStandardMaterial({
    color: '#E7E5DF',
    roughness: 0.8,
    metalness: 0.05,
  }),

  // 2. Woods
  WOOD_WARM_TEAK: new THREE.MeshStandardMaterial({
    color: '#9A5B2D',
    roughness: 0.55,
    metalness: 0.05,
  }),
  WOOD_LIGHT_OAK: new THREE.MeshStandardMaterial({
    color: '#D4A373',
    roughness: 0.6,
    metalness: 0.05,
  }),

  // 3. Metals
  METAL_STRUCTURAL_BLACK: new THREE.MeshStandardMaterial({
    color: '#0F172A',
    roughness: 0.35,
    metalness: 0.8,
  }),
  METAL_BRUSHED_ALUMINUM: new THREE.MeshStandardMaterial({
    color: '#E2E8F0',
    roughness: 0.25,
    metalness: 0.9,
  }),
  METAL_GOLD_ACCENT: new THREE.MeshStandardMaterial({
    color: '#D97706',
    roughness: 0.3,
    metalness: 0.85,
  }),

  // 4. Glazing & Glass
  GLASS_CLEAR_CURTAIN: new THREE.MeshStandardMaterial({
    color: '#0F172A',
    roughness: 0.08,
    metalness: 0.92,
    transparent: true,
    opacity: 0.45,
  }),
  GLASS_BALUSTRADE: new THREE.MeshStandardMaterial({
    color: '#94A3B8',
    roughness: 0.05,
    metalness: 0.95,
    transparent: true,
    opacity: 0.3,
  }),

  // 5. Urban Surfaces & Foliage
  ASPHALT_PREMIUM: new THREE.MeshStandardMaterial({
    color: '#1E293B',
    roughness: 0.92,
    metalness: 0.05,
  }),
  FOLIAGE_LUSH: new THREE.MeshStandardMaterial({
    color: '#2D6A4F',
    roughness: 0.85,
    metalness: 0.0,
  }),
  FOLIAGE_JAPANESE_MAPLE: new THREE.MeshStandardMaterial({
    color: '#B91C1C',
    roughness: 0.8,
    metalness: 0.0,
  }),

  // 6. QEVN Identity
  QEVN_LIME_MATTE: new THREE.MeshStandardMaterial({
    color: '#B7FF00',
    roughness: 0.35,
    metalness: 0.1,
  }),
  QEVN_LIME_EMISSIVE: new THREE.MeshStandardMaterial({
    color: '#B7FF00',
    emissive: '#B7FF00',
    emissiveIntensity: 0.8,
    roughness: 0.2,
  }),
};
