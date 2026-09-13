'use client';

import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

export function SkylineBackdrop() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  // Skyline towers positioned around town boundaries
  const skylineTowers = [
    // North Skyline (behind HQ)
    { pos: [-35, 12, -55], size: [14, 24, 14], color: '#111827' },
    { pos: [-15, 18, -65], size: [16, 36, 16], color: '#0F172A' },
    { pos: [15, 20, -68], size: [18, 40, 18], color: '#0A0A0A' },
    { pos: [38, 14, -58], size: [14, 28, 14], color: '#18181B' },

    // East Skyline (beyond Commercial Sector)
    { pos: [58, 16, -25], size: [16, 32, 16], color: '#111827' },
    { pos: [62, 22, 5], size: [18, 44, 18], color: '#0F172A' },
    { pos: [56, 14, 28], size: [15, 28, 15], color: '#18181B' },

    // West Skyline (beyond Campus)
    { pos: [-58, 16, -20], size: [16, 32, 16], color: '#111827' },
    { pos: [-64, 24, 8], size: [18, 48, 18], color: '#0A0A0A' },
    { pos: [-56, 14, 30], size: [15, 28, 15], color: '#0F172A' },

    // South Skyline (beyond Central Station)
    { pos: [-30, 12, 60], size: [14, 24, 14], color: '#18181B' },
    { pos: [0, 18, 68], size: [18, 36, 18], color: '#0A0A0A' },
    { pos: [30, 14, 62], size: [15, 28, 15], color: '#111827' },
  ];

  return (
    <group>
      {skylineTowers.map((tower, idx) => (
        <group key={`skyline-${idx}`} position={tower.pos as [number, number, number]}>
          {/* Main Tower Mass */}
          <mesh castShadow={false} receiveShadow>
            <boxGeometry args={tower.size as [number, number, number]} />
            <meshStandardMaterial
              color={tower.color}
              roughness={0.9}
              emissive={isNight ? '#0284C7' : isDusk ? '#C2410C' : '#000000'}
              emissiveIntensity={isNight ? 0.12 : isDusk ? 0.08 : 0}
            />
          </mesh>

          {/* Silhouette Edge Line */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(...(tower.size as [number, number, number]))]} />
            <lineBasicMaterial
              color={isNight ? '#38BDF8' : '#334155'}
              transparent
              opacity={0.3}
            />
          </lineSegments>

          {/* Occasional rooftop light point */}
          {idx % 2 === 0 && (
            <mesh position={[0, tower.size[1] / 2 + 0.5, 0]}>
              <sphereGeometry args={[0.3, 6, 6]} />
              <meshBasicMaterial color={isBlackout ? '#222222' : '#FF4444'} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
