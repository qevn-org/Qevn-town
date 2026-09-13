'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

export function QevnCafe() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  return (
    <group position={[18, 0, -6]}>
      {/* ================= CAFE MAIN BUILDING ================= */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 5, 9]} />
        <meshStandardMaterial color="#2B2825" roughness={0.7} />
      </mesh>
      <lineSegments position={[0, 2.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(10.02, 5.02, 9.02)]} />
        <lineBasicMaterial color="#FFD400" />
      </lineSegments>

      {/* Warm Front Windows */}
      <mesh position={[0, 2.2, 4.55]} receiveShadow>
        <boxGeometry args={[7.5, 2.4, 0.1]} />
        <meshStandardMaterial
          color="#332211"
          emissive={isBlackout ? '#000000' : '#FFB703'}
          emissiveIntensity={isNight ? 0.8 : isDusk ? 0.5 : 0.2}
          roughness={0.2}
        />
      </mesh>

      {/* Front Entrance Door */}
      <group position={[0, 0, 4.5]}>
        <mesh position={[0, 1.1, 0.15]} castShadow>
          <boxGeometry args={[2.2, 2.2, 0.2]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 1.1, 0.26]}>
          <planeGeometry args={[1.5, 1.8]} />
          <meshBasicMaterial color={isBlackout ? '#111111' : '#FFD400'} />
        </mesh>
        <Text
          position={[0, 2.4, 0.3]}
          fontSize={0.28}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          [ ORDER / ENTER ]
        </Text>
      </group>

      {/* ================= PLAYFUL STRIPED AWNING ================= */}
      <group position={[0, 3.6, 5.2]} rotation={[0.3, 0, 0]}>
        {[-3, -2, -1, 0, 1, 2, 3].map((x, i) => (
          <mesh key={`awning-${i}`} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.95, 0.1, 1.6]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#FFD400' : '#0A0A0A'} />
          </mesh>
        ))}
      </group>

      {/* ================= ROOFTOP COFFEE CUP ICON & SIGNAGE ================= */}
      <group position={[0, 5.8, 4.6]}>
        <Text
          fontSize={1.3}
          color={isBlackout ? '#333333' : '#FFD400'}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.1}
        >
          QEVN CAFE
        </Text>
      </group>

      {/* Coffee Cup Sculpture on Roof */}
      <group position={[0, 6.2, 0]}>
        {/* Cup Body */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.7, 1.2, 16]} />
          <meshStandardMaterial color="#FAF0E6" roughness={0.3} />
        </mesh>
        {/* Liquid Surface */}
        <mesh position={[0, 1.15, 0]}>
          <circleGeometry args={[0.82, 16]} />
          <meshStandardMaterial color="#4A2E18" roughness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.95, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.4, 0.1, 8, 16]} />
          <meshStandardMaterial color="#FAF0E6" />
        </mesh>
      </group>

      {/* ================= PATIO DINING TABLES ================= */}
      {/* Left Table */}
      <group position={[-2.8, 0, 7]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.08, 12]} />
          <meshStandardMaterial color="#FFD400" />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.44, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        {/* Stools */}
        <mesh position={[-0.8, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0.8, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
      </group>

      {/* Right Table */}
      <group position={[2.8, 0, 7]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.08, 12]} />
          <meshStandardMaterial color="#FFD400" />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.44, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        {/* Stools */}
        <mesh position={[-0.8, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0.8, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
      </group>

      {/* ================= "NEWS FROM THE TOWN" BULLETIN BOARD ================= */}
      <group position={[-4.5, 0, 5.5]} rotation={[0, 0.3, 0]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.8, 1.5, 0.1]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 1.2, 0.06]}>
          <planeGeometry args={[1.6, 1.3]} />
          <meshBasicMaterial color="#FFD400" />
        </mesh>
        <Text
          position={[0, 1.6, 0.08]}
          fontSize={0.16}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          NEWS BULLETIN
        </Text>
        <Text
          position={[0, 1.1, 0.08]}
          fontSize={0.11}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
        >
          DISPATCH #04 IS OUT. TAP TO READ.
        </Text>
        {/* Posts */}
        <mesh position={[-0.7, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.0, 6]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
        <mesh position={[0.7, 0.5, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.0, 6]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      </group>
    </group>
  );
}
