'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { PBR_MATERIALS } from '@/lib/materials';
import { HvacUnit, SolarArray } from '../Architectural/RoofEquipment';
import { RooftopGarden } from '../Architectural/RooftopGarden';
import { BikeRack } from '../Architectural/ArchitecturalProps';

export function QevnHq() {
  const beaconRef = useRef<THREE.PointLight>(null);
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      if (isBlackout) {
        beaconRef.current.intensity = 0;
      } else {
        beaconRef.current.intensity = (Math.sin(clock.getElapsedTime() * 4) + 1) * 0.9;
      }
    }
  });

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  const interiorGlow = isBlackout
    ? '#000000'
    : isNight
    ? '#FEF08A'
    : isDusk
    ? '#FDBA74'
    : '#BAE6FD';

  const glowIntensity = isBlackout ? 0 : isNight ? 0.85 : isDusk ? 0.4 : 0.15;

  return (
    <group position={[0, 0, -22]}>
      {/* ================= 1. WRAP-AROUND PODIUM & GRAND ENTRANCE STAIRS ================= */}
      {/* Inspired by reference image 3 ("OMAR M-Y" wrap-around entrance podium) */}
      <group position={[0, 0, 8.2]}>
        {/* Tier 1 base step */}
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[18, 0.2, 5.5]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>
        {/* Tier 2 step */}
        <mesh position={[0, 0.25, -0.3]} receiveShadow>
          <boxGeometry args={[16.5, 0.15, 4.6]} />
          <meshStandardMaterial color="#ECEAE4" roughness={0.8} />
        </mesh>
        {/* Tier 3 step */}
        <mesh position={[0, 0.4, -0.6]} receiveShadow>
          <boxGeometry args={[15, 0.15, 3.8]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>

        {/* Flanking Poured Concrete Planter Beds with Architectural Trees */}
        {[-7.8, 7.8].map((px, idx) => (
          <group key={`planter-${idx}`} position={[px, 0.3, 0.2]}>
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.4, 0.7, 3.2]} />
              <meshStandardMaterial color="#1C1917" roughness={0.7} />
            </mesh>
            {/* Dark organic soil */}
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[2.2, 0.02, 3.0]} />
              <meshStandardMaterial color="#2B1D15" roughness={0.9} />
            </mesh>
            {/* Architectural manicured shrub row */}
            {[-0.8, 0, 0.8].map((sz, sIdx) => (
              <mesh key={sIdx} position={[0, 1.05, sz]} castShadow>
                <sphereGeometry args={[0.42, 10, 10]} />
                <meshStandardMaterial color="#15803D" roughness={0.85} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Stainless Steel Security Bollards */}
        {[-4.5, -1.8, 1.8, 4.5].map((bx, i) => (
          <mesh key={`bollard-${i}`} position={[bx, 0.48, 1.8]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.65, 16]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* ================= 2. GROUND FLOOR: TRIPLE-HEIGHT GLASS LOBBY ================= */}
      {/* Heavy White Architectural Concrete Corner Columns */}
      <mesh position={[-10.2, 3.2, 6.2]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 6.4, 2.2]} />
        <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
      </mesh>
      <mesh position={[10.2, 3.2, 6.2]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 6.4, 2.2]} />
        <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
      </mesh>

      {/* Warm Horizontal Wood Paneling Accent Wall (Behind White Framing) */}
      <mesh position={[-6.8, 3.2, 6.0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 6.4, 0.3]} />
        <meshStandardMaterial color="#9A5B2D" roughness={0.55} />
      </mesh>
      {/* Wood slat relief grooves */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`wood-slat-${i}`} position={[-6.8, 0.5 + i * 0.5, 6.16]}>
          <boxGeometry args={[4.76, 0.03, 0.04]} />
          <meshStandardMaterial color="#3E200C" roughness={0.6} />
        </mesh>
      ))}

      {/* Grand Entrance Canopy Portal (Like "OMAR M-Y" Entrance Frame) */}
      <group position={[2.5, 0, 7.2]}>
        {/* Cantilevered White Portal Pillar */}
        <mesh position={[3.6, 2.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 5.6, 1.6]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>
        {/* Portal Header with QEVN HQ Marquee */}
        <mesh position={[0.5, 5.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.4, 1.0, 1.6]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>
        {/* Architectural 3D Signage */}
        <Text
          position={[0.5, 5.2, 0.85]}
          fontSize={0.55}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.12}
        >
          QEVN HEADQUARTERS
        </Text>
        {/* Subtle neon lime underside LED strip */}
        <mesh position={[0.5, 4.68, 0]}>
          <boxGeometry args={[7.2, 0.04, 1.4]} />
          <meshStandardMaterial
            color="#B7FF00"
            emissive="#B7FF00"
            emissiveIntensity={isNight ? 1.0 : 0.4}
          />
        </mesh>
      </group>

      {/* Floor-to-Ceiling Curtain Wall Glazing with Multi-Pane Mullions */}
      <mesh position={[0, 3.0, 6.1]}>
        <planeGeometry args={[16, 5.6]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive={interiorGlow}
          emissiveIntensity={glowIntensity}
          roughness={0.08}
          metalness={0.9}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Grid Mullions for Ground Floor Curtain Wall */}
      {[-6, -3, 0, 3, 6].map((mx, idx) => (
        <mesh key={`mullion-v-${idx}`} position={[mx, 3.0, 6.16]}>
          <boxGeometry args={[0.08, 5.6, 0.12]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.85} />
        </mesh>
      ))}
      {[1.8, 3.8].map((my, idx) => (
        <mesh key={`mullion-h-${idx}`} position={[0, my, 6.16]}>
          <boxGeometry args={[16, 0.08, 0.12]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.85} />
        </mesh>
      ))}

      {/* Visible Reception Interior Silhouette */}
      <group position={[0, 0, 3.8]}>
        {/* Marble reception island */}
        <mesh position={[1.5, 1.0, 0]} castShadow>
          <boxGeometry args={[3.6, 1.0, 1.2]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Lime desk accent base */}
        <mesh position={[1.5, 0.1, 0]}>
          <boxGeometry args={[3.8, 0.2, 1.3]} />
          <meshStandardMaterial
            color="#B7FF00"
            emissive="#B7FF00"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Architectural floating staircase silhouette inside lobby */}
        {Array.from({ length: 8 }).map((_, stepIdx) => (
          <mesh
            key={`stair-${stepIdx}`}
            position={[-4.5 + stepIdx * 0.4, 0.6 + stepIdx * 0.4, 0]}
            castShadow
          >
            <boxGeometry args={[0.7, 0.08, 1.8]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* ================= 3. UPPER FLOORS & CANTILEVERED VOLUMES ================= */}
      {/* Inspired by reference image 3 & 4 (Interlocking white cantilevered volumes & dark recessed tiers) */}
      <group position={[0, 8.8, 0]}>
        {/* Main upper floor solid body */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[21, 5.6, 14]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
        </mesh>

        {/* Cantilevered Executive Boardroom Box with Warm Wood Soffit */}
        <group position={[-3.5, 1.8, 3.8]}>
          {/* Boardroom box frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[12.5, 5.0, 7.2]} />
            <meshStandardMaterial color="#1C1917" roughness={0.7} />
          </mesh>
          {/* Underside warm wood ceiling slats */}
          <mesh position={[0, -2.52, 0]}>
            <boxGeometry args={[12.4, 0.04, 7.0]} />
            <meshStandardMaterial color="#9A5B2D" roughness={0.55} />
          </mesh>
          {/* Full glass executive viewing front */}
          <mesh position={[0, 0, 3.65]}>
            <planeGeometry args={[11.8, 4.4]} />
            <meshStandardMaterial
              color="#0F172A"
              emissive={interiorGlow}
              emissiveIntensity={glowIntensity}
              roughness={0.05}
              metalness={0.9}
              transparent
              opacity={0.85}
            />
          </mesh>
          {/* Executive conference table inside */}
          <mesh position={[0, -1.0, 0]} castShadow>
            <boxGeometry args={[6.0, 0.1, 2.0]} />
            <meshStandardMaterial color="#9A5B2D" roughness={0.5} />
          </mesh>
          {/* Modern linear hanging pendant lamp above table */}
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[5.2, 0.08, 0.2]} />
            <meshStandardMaterial
              color="#FEF08A"
              emissive="#FEF08A"
              emissiveIntensity={isNight ? 1.5 : 0.4}
            />
          </mesh>
        </group>

        {/* Cantilevered Executive Balcony with Glass Railing */}
        <group position={[6.5, -0.6, 6.2]}>
          {/* White concrete balcony floor slab */}
          <mesh position={[0, 0, 0]} receiveShadow castShadow>
            <boxGeometry args={[6.2, 0.35, 3.8]} />
            <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
          </mesh>
          {/* Glass balustrade */}
          <mesh position={[0, 0.55, 1.85]}>
            <boxGeometry args={[6.2, 0.8, 0.04]} />
            <primitive object={PBR_MATERIALS.GLASS_BALUSTRADE} attach="material" />
          </mesh>
          <mesh position={[3.05, 0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[3.8, 0.8, 0.04]} />
            <primitive object={PBR_MATERIALS.GLASS_BALUSTRADE} attach="material" />
          </mesh>
        </group>
      </group>

      {/* ================= 4. ROOFTOP: GARDEN TERRACE & MECHANICAL PENTHOUSE ================= */}
      {/* Inspired by reference image 3 & 4 (rooftop outdoor dining, trees, glass railings) */}
      <group position={[0, 14.5, 0]}>
        {/* Rooftop Garden Terrace on the Front/East side */}
        <RooftopGarden position={[-2.5, 0, 2.5]} width={13} depth={7.5} />

        {/* Mechanical Penthouse on the Rear side */}
        <group position={[4.5, 1.6, -3.5]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[8.5, 3.2, 5.5]} />
            <meshStandardMaterial color="#1C1917" roughness={0.7} />
          </mesh>
          {/* Penthouse architectural louvers */}
          {Array.from({ length: 6 }).map((_, li) => (
            <mesh key={`louver-${li}`} position={[0, -1.0 + li * 0.4, 2.8]}>
              <boxGeometry args={[8.2, 0.08, 0.08]} />
              <meshStandardMaterial color="#0A0A0A" metalness={0.8} />
            </mesh>
          ))}
          {/* HVAC Chiller Unit */}
          <HvacUnit position={[-2.2, 1.6, 0]} />
          {/* Photovoltaic Solar Arrays */}
          <SolarArray position={[2.2, 1.6, 0]} />
        </group>

        {/* ================= 5. HIGH-ALTITUDE TELECOM MAST & BEACON ================= */}
        <group position={[-7.5, 0, -4.5]}>
          {/* Heavy Base Pedestal */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.7, 1.0, 12]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Tapered Lattice Mast */}
          <mesh position={[0, 6.0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.28, 11, 8]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Cross Antenna Spoke Arms */}
          {[2.5, 5.0, 7.5].map((my, idx) => (
            <group key={`spoke-${idx}`} position={[0, my + 1, 0]}>
              <mesh>
                <boxGeometry args={[1.4, 0.04, 0.04]} />
                <meshStandardMaterial color="#B7FF00" metalness={0.5} />
              </mesh>
              <mesh rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[1.4, 0.04, 0.04]} />
                <meshStandardMaterial color="#B7FF00" metalness={0.5} />
              </mesh>
            </group>
          ))}
          {/* Pulsating Obstruction Warning Beacon on Top */}
          <mesh position={[0, 11.6, 0]}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial
              color="#EF4444"
              emissive="#EF4444"
              emissiveIntensity={isNight ? 1.8 : 0.8}
            />
          </mesh>
          <pointLight
            ref={beaconRef}
            position={[0, 11.6, 0]}
            color="#EF4444"
            distance={28}
            intensity={1.5}
          />
        </group>
      </group>

      {/* Bicycle Rack on Plaza Side */}
      <BikeRack position={[-9.5, 0, 8.5]} />
    </group>
  );
}
