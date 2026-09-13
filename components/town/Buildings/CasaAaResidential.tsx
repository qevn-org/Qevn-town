'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { PBR_MATERIALS } from '@/lib/materials';

/**
 * Casa AA — Modern Luxury Residence
 * Modeled directly after Reference Image 2:
 * - Exposed terracotta brick foundation with pedestrian gate and recessed garage
 * - Sculpted white concrete upper volume with curved corner transitions
 * - Rooftop courtyard patio with embedded turquoise plunge pool, sun terrace, and delicate saplings
 * - Recessed punch windows with warm interior lighting
 */
export function CasaAaResidential({
  position = [-24, 0, 18],
}: {
  position?: [number, number, number];
}) {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  const interiorGlow = isBlackout
    ? '#000000'
    : isNight
    ? '#FEF08A'
    : isDusk
    ? '#FDBA74'
    : '#BAE6FD';

  const glowIntensity = isBlackout ? 0 : isNight ? 0.85 : isDusk ? 0.45 : 0.15;

  return (
    <group position={position}>
      {/* ================= 1. TERRACOTTA BRICK PODIUM BASE (Reference Image 2) ================= */}
      {/* Heavy textured brick ground floor */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 2.8, 14]} />
        <meshStandardMaterial color="#9A3412" roughness={0.88} />
      </mesh>

      {/* Recessed Ground Level Garage Entry */}
      <group position={[0, 1.1, 7.02]}>
        {/* Dark aluminum sectional garage door */}
        <mesh castShadow>
          <boxGeometry args={[4.6, 2.2, 0.1]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Horizontal sectional seams */}
        {[-0.6, 0, 0.6].map((gy, i) => (
          <mesh key={`seam-${i}`} position={[0, gy, 0.06]}>
            <boxGeometry args={[4.55, 0.02, 0.02]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
        ))}
      </group>

      {/* Pedestrian Entry Portal & Steps (Reference Image 2) */}
      <group position={[4.2, 0, 7.2]}>
        {/* Poured concrete entry steps */}
        <mesh position={[0, 0.12, 0.6]} receiveShadow>
          <boxGeometry args={[2.4, 0.24, 1.2]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.28, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.32, 1.0]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
        </mesh>
        {/* Matte black steel security entry gate */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[1.8, 2.2, 0.06]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.85} />
        </mesh>
      </group>

      {/* Perimeter Brick Garden Terrace Fencing */}
      <mesh position={[-5.8, 3.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 13.8]} />
        <meshStandardMaterial color="#9A3412" roughness={0.88} />
      </mesh>
      {/* Black minimalist metal railing on top of brick wall */}
      <mesh position={[-5.8, 3.8, 0]}>
        <boxGeometry args={[0.04, 0.4, 13.8]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.8} />
      </mesh>

      {/* ================= 2. SCULPTED WHITE CONCRETE UPPER VOLUME (Reference Image 2) ================= */}
      <group position={[0, 4.4, -0.4]}>
        {/* Main white concrete block */}
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[11.2, 3.2, 13]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
        </mesh>

        {/* Sculpted Curved Corner Cylinder (Matching "CASA AA" signature curve in Ref 2) */}
        <mesh position={[4.8, 1.6, 5.7]} rotation={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.6, 1.6, 3.2, 24, 1, false, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
        </mesh>

        {/* Recessed Architectural Windows with Warm Interior Glow */}
        {/* Front window */}
        <group position={[-2.4, 1.4, 6.55]}>
          <mesh>
            <boxGeometry args={[2.6, 1.6, 0.12]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[2.4, 1.4]} />
            <meshStandardMaterial
              color="#0F172A"
              emissive={interiorGlow}
              emissiveIntensity={glowIntensity}
              roughness={0.1}
              metalness={0.9}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>

        {/* Corner Punch Window */}
        <group position={[4.2, 1.4, 4.2]}>
          <mesh position={[1.45, 0, 0]}>
            <boxGeometry args={[0.12, 1.2, 1.4]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
          <mesh position={[1.48, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[1.2, 1.0]} />
            <meshStandardMaterial
              color="#0F172A"
              emissive={interiorGlow}
              emissiveIntensity={glowIntensity}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Left Side Garden Punch Windows */}
        {[-3, 0, 3].map((wz, idx) => (
          <group key={`side-w-${idx}`} position={[-5.65, 1.4, wz]}>
            <mesh>
              <boxGeometry args={[0.12, 1.4, 1.8]} />
              <meshStandardMaterial color="#0A0A0A" />
            </mesh>
            <mesh position={[-0.04, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[1.6, 1.2]} />
              <meshStandardMaterial
                color="#0F172A"
                emissive={interiorGlow}
                emissiveIntensity={glowIntensity}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================= 3. ROOFTOP OASIS & PLUNGE POOL (Reference Image 2) ================= */}
      <group position={[0, 7.6, -0.4]}>
        {/* Rooftop white parapet walls */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[11.2, 1.0, 13]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
        </mesh>
        {/* Rooftop Sun Terrace Paved Floor */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <boxGeometry args={[10.6, 0.04, 12.4]} />
          <meshStandardMaterial color="#ECEAE4" roughness={0.7} />
        </mesh>

        {/* Embedded Turquoise Plunge Pool (Directly shown in Reference Image 2) */}
        <group position={[0.5, 0.04, 1.8]}>
          {/* Pool rim */}
          <mesh position={[0, 0.06, 0]} receiveShadow>
            <boxGeometry args={[4.4, 0.12, 3.4]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
          </mesh>
          {/* Turquoise water plane with refraction shine */}
          <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[4.0, 3.0]} />
            <meshStandardMaterial
              color="#06B6D4"
              emissive="#0891B2"
              emissiveIntensity={isNight ? 0.7 : 0.3}
              roughness={0.05}
              metalness={0.85}
              transparent
              opacity={0.88}
            />
          </mesh>
        </group>

        {/* Modern Sun Lounge Chairs on Rooftop Terrace */}
        <group position={[-3.2, 0.1, -2.4]} rotation={[0, 0.3, 0]}>
          <mesh position={[0, 0.12, 0]} castShadow>
            <boxGeometry args={[0.7, 0.1, 1.8]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.3, -0.65]} rotation={[-0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.68, 0.08, 0.7]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.7} />
          </mesh>
        </group>

        {/* Slender Rooftop Japanese Maple Saplings (Reference Image 2) */}
        <group position={[-3.6, 0.1, 3.6]}>
          {/* White cube planter */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.8, 0.7, 0.8]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.8} />
          </mesh>
          {/* Slender trunk */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 1.2, 8]} />
            <meshStandardMaterial color="#422006" />
          </mesh>
          {/* Delicate scarlet canopy */}
          <mesh position={[0, 2.0, 0]} castShadow>
            <sphereGeometry args={[0.65, 10, 10]} />
            <primitive object={PBR_MATERIALS.FOLIAGE_JAPANESE_MAPLE} attach="material" />
          </mesh>
        </group>
      </group>

      {/* Architectural Typography Marker on Street Corner (Reference Image 2: "CASA AA.") */}
      <group position={[5.2, 0.8, 7.3]}>
        <Text
          fontSize={0.28}
          color="#F8FAFC"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.15}
        >
          CASA AA.
        </Text>
      </group>
    </group>
  );
}
