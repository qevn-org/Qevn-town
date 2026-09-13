'use client';

import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

interface WindowProps {
  position: [number, number, number];
  width: number;
  height: number;
  panesX?: number;
  panesY?: number;
  hasInterior?: boolean;
  interiorType?: 'office' | 'lounge' | 'gallery' | 'residential';
}

export function ArchitecturalWindow({
  position,
  width,
  height,
  panesX = 3,
  panesY = 2,
  hasInterior = true,
  interiorType = 'office',
}: WindowProps) {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  const glowColor = isBlackout
    ? '#000000'
    : isNight
    ? '#FEF08A' // Warm halogen/LED night interior
    : isDusk
    ? '#FDBA74' // Warm amber sunset
    : '#BAE6FD'; // Daylight sky bounce reflection

  const glowIntensity = isBlackout ? 0 : isNight ? 0.85 : isDusk ? 0.45 : 0.15;

  return (
    <group position={position}>
      {/* Outer black aluminum/steel frame */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[width, height, 0.08]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main glass plane with interior emissive illumination */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[width - 0.08, height - 0.08]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive={glowColor}
          emissiveIntensity={glowIntensity}
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Vertical Mullions */}
      {panesX > 1 &&
        Array.from({ length: panesX - 1 }).map((_, i) => {
          const spacing = (width - 0.1) / panesX;
          const mx = -width / 2 + 0.05 + (i + 1) * spacing;
          return (
            <mesh key={`vm-${i}`} position={[mx, 0, 0.05]}>
              <boxGeometry args={[0.04, height - 0.08, 0.06]} />
              <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
            </mesh>
          );
        })}

      {/* Horizontal Transoms */}
      {panesY > 1 &&
        Array.from({ length: panesY - 1 }).map((_, j) => {
          const spacing = (height - 0.1) / panesY;
          const my = -height / 2 + 0.05 + (j + 1) * spacing;
          return (
            <mesh key={`hm-${j}`} position={[0, my, 0.05]}>
              <boxGeometry args={[width - 0.08, 0.04, 0.06]} />
              <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
            </mesh>
          );
        })}

      {/* Strategic Interior Depth Illusion Silhouette (Visible Behind Glazing) */}
      {hasInterior && !isBlackout && (
        <group position={[0, -height * 0.15, -0.4]}>
          {interiorType === 'office' && (
            <>
              {/* Minimalist desk silhouette */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[width * 0.65, 0.06, 0.6]} />
                <meshStandardMaterial color="#1E293B" roughness={0.5} />
              </mesh>
              {/* Monitor screen */}
              <mesh position={[0, 0.22, 0]}>
                <boxGeometry args={[width * 0.25, 0.25, 0.04]} />
                <meshStandardMaterial
                  color="#38BDF8"
                  emissive="#38BDF8"
                  emissiveIntensity={isNight ? 0.9 : 0.3}
                />
              </mesh>
            </>
          )}

          {interiorType === 'lounge' && (
            <>
              {/* Warm interior pendant light */}
              <mesh position={[0, height * 0.45, 0]}>
                <cylinderGeometry args={[0.08, 0.16, 0.18, 12]} />
                <meshStandardMaterial
                  color="#FEF08A"
                  emissive="#FEF08A"
                  emissiveIntensity={isNight ? 1.2 : 0.4}
                />
              </mesh>
            </>
          )}

          {interiorType === 'gallery' && (
            <>
              {/* Illuminated back wall art frame */}
              <mesh position={[0, height * 0.2, -0.2]}>
                <boxGeometry args={[width * 0.45, height * 0.4, 0.02]} />
                <meshStandardMaterial
                  color="#B7FF00"
                  emissive="#B7FF00"
                  emissiveIntensity={0.6}
                />
              </mesh>
            </>
          )}
        </group>
      )}
    </group>
  );
}
