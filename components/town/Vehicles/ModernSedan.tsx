'use client';

import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

/**
 * Manufactured Modern EV Sedan
 * Modeled with aerodynamic curvature, beveled contours, panoramic glass canopy,
 * multi-spoke alloy wheels, and LED lightbars.
 */
export function ModernSedan({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  bodyColor = '#F8FAFC',
  isParked = true,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  bodyColor?: string;
  isParked?: boolean;
}) {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;
  const lightsOn = (isNight || isDusk) && !isBlackout;

  return (
    <group position={position} rotation={rotation}>
      {/* ================= 1. LOWER AERODYNAMIC CHASSIS ================= */}
      {/* Lower ground-effects skirt */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <boxGeometry args={[1.9, 0.22, 4.4]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
      </mesh>

      {/* Main sculptured car body */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.94, 0.42, 4.3]} />
        <meshStandardMaterial
          color={bodyColor}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Curved Hood / Front Nose */}
      <group position={[0, 0.48, -1.6]}>
        <mesh position={[0, 0, 0]} rotation={[-0.12, 0, 0]} castShadow>
          <boxGeometry args={[1.88, 0.32, 1.2]} />
          <meshStandardMaterial
            color={bodyColor}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Tapered Rear Trunk Deck */}
      <group position={[0, 0.54, 1.6]}>
        <mesh position={[0, 0, 0]} rotation={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[1.86, 0.3, 1.1]} />
          <meshStandardMaterial
            color={bodyColor}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* ================= 2. GREENHOUSE: PANORAMIC GLASS CANOPY ================= */}
      <group position={[0, 0.92, -0.1]}>
        {/* Aerodynamic greenhouse cabin */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.65, 0.52, 2.3]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.82}
          />
        </mesh>

        {/* Slanted Windshield */}
        <mesh position={[0, -0.05, -1.15]} rotation={[-0.45, 0, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.65]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Slanted Rear Glass */}
        <mesh position={[0, -0.05, 1.15]} rotation={[0.42, 0, 0]}>
          <boxGeometry args={[1.6, 0.04, 0.65]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Roof Side Roof Pillars (A/B/C Pillars) */}
        <mesh position={[-0.82, -0.02, 0]}>
          <boxGeometry args={[0.06, 0.48, 2.2]} />
          <meshStandardMaterial color={bodyColor} roughness={0.25} metalness={0.8} />
        </mesh>
        <mesh position={[0.82, -0.02, 0]}>
          <boxGeometry args={[0.06, 0.48, 2.2]} />
          <meshStandardMaterial color={bodyColor} roughness={0.25} metalness={0.8} />
        </mesh>

        {/* Interior Steering Wheel Silhouette */}
        <group position={[-0.38, -0.12, -0.6]} rotation={[-0.4, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.15, 0.025, 8, 16]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
        </group>
      </group>

      {/* Aerodynamic Side Mirrors */}
      <mesh position={[-0.98, 0.85, -0.8]} castShadow>
        <boxGeometry args={[0.16, 0.08, 0.18]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.98, 0.85, -0.8]} castShadow>
        <boxGeometry args={[0.16, 0.08, 0.18]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* ================= 3. WHEELS & MULTI-SPOKE ALLOY RIMS ================= */}
      {[
        [-0.94, 0.32, -1.35], // Front Left
        [0.94, 0.32, -1.35],  // Front Right
        [-0.94, 0.32, 1.35],  // Rear Left
        [0.94, 0.32, 1.35],   // Rear Right
      ].map(([wx, wy, wz], i) => (
        <group key={`wheel-${i}`} position={[wx, wy, wz]} rotation={[0, 0, Math.PI / 2]}>
          {/* Black rubber tire */}
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
            <meshStandardMaterial color="#1E293B" roughness={0.9} />
          </mesh>
          {/* Machined alloy rim face */}
          <mesh position={[0, wx > 0 ? 0.11 : -0.11, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.95} />
          </mesh>
          {/* Red performance brake caliper */}
          <mesh position={[0.14, 0, 0]}>
            <boxGeometry args={[0.08, 0.16, 0.08]} />
            <meshStandardMaterial color="#EF4444" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* ================= 4. LIGHTING: FRONT & REAR LIGHTBARS ================= */}
      {/* Front Horizontal LED Lightbar */}
      <mesh position={[0, 0.44, -2.16]}>
        <boxGeometry args={[1.74, 0.06, 0.04]} />
        <meshStandardMaterial
          color={lightsOn ? '#FFFFFF' : '#E2E8F0'}
          emissive={lightsOn ? '#FFFFFF' : '#000000'}
          emissiveIntensity={lightsOn ? 2.5 : 0}
        />
      </mesh>
      {/* Front Projector Headlight Pods */}
      <mesh position={[-0.72, 0.44, -2.16]}>
        <boxGeometry args={[0.3, 0.1, 0.04]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive={lightsOn ? '#38BDF8' : '#000000'}
          emissiveIntensity={lightsOn ? 3.0 : 0}
        />
      </mesh>
      <mesh position={[0.72, 0.44, -2.16]}>
        <boxGeometry args={[0.3, 0.1, 0.04]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive={lightsOn ? '#38BDF8' : '#000000'}
          emissiveIntensity={lightsOn ? 3.0 : 0}
        />
      </mesh>

      {/* Rear Continuous Red LED Taillight Strip */}
      <mesh position={[0, 0.58, 2.16]}>
        <boxGeometry args={[1.78, 0.05, 0.04]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive={lightsOn ? '#EF4444' : '#7F1D1D'}
          emissiveIntensity={lightsOn ? 2.5 : 0.4}
        />
      </mesh>

      {/* Headlight Cones at Night when driving or active */}
      {lightsOn && !isParked && (
        <spotLight
          position={[0, 0.5, -2.2]}
          target-position={[0, 0, -12]}
          color="#FFFFFF"
          intensity={4.0}
          distance={24}
          angle={0.4}
          penumbra={0.6}
        />
      )}

      {/* Ground Contact Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[2.3, 4.6]} />
        <meshBasicMaterial color="#000000" opacity={0.45} transparent />
      </mesh>
    </group>
  );
}
