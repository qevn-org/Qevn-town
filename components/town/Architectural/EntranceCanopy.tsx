'use client';

import * as THREE from 'three';

interface EntranceCanopyProps {
  position: [number, number, number];
  width?: number;
  depth?: number;
  height?: number;
  accentColor?: string;
  hasBollards?: boolean;
  hasPlanters?: boolean;
}

export function EntranceCanopy({
  position,
  width = 4.8,
  depth = 2.4,
  height = 3.6,
  accentColor = '#B7FF00',
  hasBollards = true,
  hasPlanters = true,
}: EntranceCanopyProps) {
  return (
    <group position={position}>
      {/* Cantilevered Steel Frame */}
      <mesh position={[0, height, depth / 2]} castShadow>
        <boxGeometry args={[width, 0.15, depth]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.4} metalness={0.8} />
      </mesh>
      <lineSegments position={[0, height, depth / 2]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width + 0.02, 0.16, depth + 0.02)]} />
        <lineBasicMaterial color={accentColor} />
      </lineSegments>

      {/* Embedded Tinted Glass Skylight Slab */}
      <mesh position={[0, height + 0.08, depth / 2]}>
        <boxGeometry args={[width - 0.4, 0.06, depth - 0.4]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Support Columns / Cantilever brackets */}
      <mesh position={[-width / 2 + 0.2, height / 2, 0.2]} castShadow>
        <boxGeometry args={[0.2, height, 0.2]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[width / 2 - 0.2, height / 2, 0.2]} castShadow>
        <boxGeometry args={[0.2, height, 0.2]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>

      {/* Recessed Downlight Fixtures */}
      {[-width / 3, 0, width / 3].map((x, i) => (
        <group key={`downlight-${i}`} position={[x, height - 0.1, depth / 2]}>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.04, 12]} />
            <meshBasicMaterial color="#FFFBEB" />
          </mesh>
          <pointLight color="#FEF08A" intensity={0.8} distance={5} />
        </group>
      ))}

      {/* Ground Welcome Step Slab */}
      <mesh position={[0, 0.08, depth / 2]} receiveShadow>
        <boxGeometry args={[width + 0.6, 0.16, depth + 0.4]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
      </mesh>

      {/* Security Bollards */}
      {hasBollards && (
        <group position={[0, 0, depth + 0.5]}>
          {[-width / 2, -width / 4, 0, width / 4, width / 2].map((bx, idx) => (
            <mesh key={`bollard-${idx}`} position={[bx, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.09, 0.1, 0.8, 12]} />
              <meshStandardMaterial color="#0A0A0A" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}
        </group>
      )}

      {/* Planter Boxes flanking entrance */}
      {hasPlanters && (
        <>
          <group position={[-width / 2 - 0.8, 0, depth / 2]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <boxGeometry args={[0.9, 0.7, depth]} />
              <meshStandardMaterial color="#1E293B" roughness={0.7} />
            </mesh>
            {/* Foliage */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <boxGeometry args={[0.75, 0.5, depth - 0.2]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.9} />
            </mesh>
          </group>
          <group position={[width / 2 + 0.8, 0, depth / 2]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <boxGeometry args={[0.9, 0.7, depth]} />
              <meshStandardMaterial color="#1E293B" roughness={0.7} />
            </mesh>
            {/* Foliage */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <boxGeometry args={[0.75, 0.5, depth - 0.2]} />
              <meshStandardMaterial color="#2E7D32" roughness={0.9} />
            </mesh>
          </group>
        </>
      )}
    </group>
  );
}
