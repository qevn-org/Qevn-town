'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { HvacUnit, SolarArray, SatelliteDish } from '../Architectural/RoofEquipment';
import { EntranceCanopy } from '../Architectural/EntranceCanopy';
import { BikeRack, SecurityTurnstile } from '../Architectural/ArchitecturalProps';

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

  return (
    <group position={[0, 0, -22]}>
      {/* ================= FOUNDATION & RECEPTION GROUND FLOOR ================= */}
      {/* Heavy Base Slab */}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 3.2, 14]} />
        <meshStandardMaterial color="#18181B" roughness={0.65} metalness={0.2} />
      </mesh>
      <lineSegments position={[0, 1.6, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(22.04, 3.24, 14.04)]} />
        <lineBasicMaterial color="#0A0A0A" />
      </lineSegments>

      {/* Transparent Glass Lobby Facade (Ground Floor) */}
      <mesh position={[0, 1.6, 7.04]}>
        <planeGeometry args={[14, 2.6]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Reception Desk Silhouette inside Lobby */}
      <mesh position={[0, 0.6, 4.5]} castShadow>
        <boxGeometry args={[3.2, 1.0, 1.2]} />
        <meshStandardMaterial color="#B7FF00" roughness={0.3} />
      </mesh>
      <Text
        position={[0, 1.3, 4.5]}
        fontSize={0.25}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
      >
        RECEPTION // SEC.01
      </Text>

      {/* Interior Security Turnstiles */}
      <SecurityTurnstile position={[-2.4, 0, 5.5]} />
      <SecurityTurnstile position={[2.4, 0, 5.5]} />

      {/* ================= SECOND TIER (STUDIO & WORKSPACE) ================= */}
      <mesh position={[0, 5.6, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[19, 4.8, 13]} />
        <meshStandardMaterial color="#27272A" roughness={0.6} />
      </mesh>
      <lineSegments position={[0, 5.6, 0.4]}>
        <edgesGeometry args={[new THREE.BoxGeometry(19.04, 4.84, 13.04)]} />
        <lineBasicMaterial color="#0A0A0A" />
      </lineSegments>

      {/* Vertical Architectural Concrete Fins / Mullions */}
      {[-8, -5, -2, 2, 5, 8].map((fx, i) => (
        <mesh key={`fin-${i}`} position={[fx, 5.6, 6.95]} castShadow>
          <boxGeometry args={[0.3, 4.4, 0.4]} />
          <meshStandardMaterial color="#09090B" metalness={0.7} />
        </mesh>
      ))}

      {/* Recessed Window Grid (Second Floor Studio) */}
      <mesh position={[0, 5.6, 6.88]}>
        <planeGeometry args={[17.5, 3.8]} />
        <meshStandardMaterial
          color="#0A0F1D"
          emissive={isNight ? '#38BDF8' : isDusk ? '#F59E0B' : '#0284C7'}
          emissiveIntensity={isNight ? 0.75 : isDusk ? 0.4 : 0.15}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* ================= THIRD TIER (EXECUTIVE & AI CORE) ================= */}
      <mesh position={[0, 10.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 4.8, 11]} />
        <meshStandardMaterial color="#18181B" roughness={0.5} />
      </mesh>
      <lineSegments position={[0, 10.4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(14.04, 4.84, 11.04)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>

      {/* Executive Balcony / Cantilever Terrace */}
      <mesh position={[0, 8.1, 6.2]} castShadow receiveShadow>
        <boxGeometry args={[12, 0.3, 1.8]} />
        <meshStandardMaterial color="#09090B" />
      </mesh>
      {/* Glass Balcony Railing */}
      <mesh position={[0, 8.6, 7.05]}>
        <planeGeometry args={[11.8, 0.8]} />
        <meshStandardMaterial
          color="#38BDF8"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* ================= GIANT BRUTALIST 3D "QEVN" MARQUEE ================= */}
      <group position={[0, 10.8, 5.6]}>
        <Text
          fontSize={3.2}
          color={isBlackout ? '#444444' : '#B7FF00'}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
          fontWeight={900}
        >
          QEVN
        </Text>
      </group>

      <group position={[0, 8.8, 5.8]}>
        <Text
          fontSize={0.45}
          color={isBlackout ? '#222222' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
          fontWeight={800}
        >
          GLOBAL DIGITAL HEADQUARTERS // ENG.01
        </Text>
      </group>

      {/* ================= ENTRANCE CANOPY & OUTDOOR APPAREL ================= */}
      <EntranceCanopy
        position={[0, 0, 7.0]}
        width={5.6}
        depth={2.8}
        height={3.4}
        accentColor="#B7FF00"
        hasBollards={true}
        hasPlanters={true}
      />

      {/* Bicycle Parking Rack on West Flank */}
      <BikeRack position={[-7.5, 0, 8.2]} rotation={0} />

      {/* Executive Delivery & Service Bay on East Flank */}
      <group position={[8.5, 0, 6.5]}>
        <mesh position={[0, 1.4, 0.4]} castShadow>
          <boxGeometry args={[3.2, 2.6, 0.2]} />
          <meshStandardMaterial color="#0A0A0A" metalness={0.7} />
        </mesh>
        <lineSegments position={[0, 1.4, 0.4]}>
          <edgesGeometry args={[new THREE.BoxGeometry(3.22, 2.62, 0.22)]} />
          <lineBasicMaterial color="#FFD400" />
        </lineSegments>
        <Text
          position={[0, 2.4, 0.52]}
          fontSize={0.2}
          color="#FFD400"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          SERVICE & LOGISTICS BAY
        </Text>
      </group>

      {/* ================= ROOF MECHANICAL PENTHOUSE ================= */}
      <group position={[0, 12.8, 0]}>
        {/* Parapet Rim */}
        <lineSegments position={[0, 0.2, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(14.2, 0.4, 11.2)]} />
          <lineBasicMaterial color="#0A0A0A" />
        </lineSegments>

        {/* Dual Industrial HVAC Units */}
        <HvacUnit position={[-4, 0, -2]} scale={1.1} />
        <HvacUnit position={[4, 0, -2]} scale={1.1} />

        {/* Solar Panel Array */}
        <SolarArray position={[0, 0, 1.8]} rows={2} cols={4} />

        {/* Satellite Dish */}
        <SatelliteDish position={[4.5, 0, 2.8]} rotation={-0.4} />

        {/* Master Communications Lattice Tower */}
        <group position={[0, 0, -2.5]}>
          <mesh position={[0, 3.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.35, 7, 6]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>
          {/* Crossbars */}
          <mesh position={[0, 2.2, 0]}>
            <boxGeometry args={[1.8, 0.08, 0.08]} />
            <meshStandardMaterial color="#94A3B8" />
          </mesh>
          <mesh position={[0, 4.4, 0]}>
            <boxGeometry args={[1.2, 0.08, 0.08]} />
            <meshStandardMaterial color="#94A3B8" />
          </mesh>
          {/* Blinking Red Beacon on top */}
          <mesh position={[0, 7.1, 0]}>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshBasicMaterial color={isBlackout ? '#222222' : '#FF2222'} />
          </mesh>
          <pointLight ref={beaconRef} position={[0, 7.2, 0]} color="#FF2222" distance={20} />
        </group>
      </group>
    </group>
  );
}
