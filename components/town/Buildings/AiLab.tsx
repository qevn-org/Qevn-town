'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

export function AiLab() {
  const floatingCoreRef = useRef<THREE.Group>(null);
  const radarRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (floatingCoreRef.current) {
      floatingCoreRef.current.position.y = 8 + Math.sin(elapsed * 2) * 0.4;
      floatingCoreRef.current.rotation.y += delta * 0.8;
      floatingCoreRef.current.rotation.z += delta * 0.4;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 1.2;
      ringRef.current.rotation.y += delta * 0.6;
    }

    if (radarRef.current) {
      radarRef.current.rotation.y += delta * 0.5;
    }
  });

  const isNight = timeOfDay === 'night' && !isBlackout;

  return (
    <group position={[-18, 0, -6]}>
      {/* ================= LAB MAIN STRUCTURE ================= */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[11, 6, 11]} />
        <meshStandardMaterial color="#1E2229" roughness={0.5} />
      </mesh>
      <lineSegments position={[0, 3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(11.02, 6.02, 11.02)]} />
        <lineBasicMaterial color="#3A7DFF" />
      </lineSegments>

      {/* Recessed Brutalist Data Core Atrium */}
      <mesh position={[0, 3.2, 5.55]} receiveShadow>
        <boxGeometry args={[7, 4, 0.2]} />
        <meshStandardMaterial
          color="#050811"
          emissive={isBlackout ? '#000000' : '#1D4ED8'}
          emissiveIntensity={isNight ? 0.7 : 0.25}
          roughness={0.1}
        />
      </mesh>

      {/* Lab Entrance */}
      <group position={[0, 0, 5.5]}>
        <mesh position={[0, 1.2, 0.2]} castShadow>
          <boxGeometry args={[2.8, 2.4, 0.4]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 1.1, 0.42]}>
          <planeGeometry args={[1.8, 2.0]} />
          <meshBasicMaterial color={isBlackout ? '#111111' : '#3A7DFF'} />
        </mesh>
        <Text
          position={[0, 2.6, 0.5]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          [ ENTER LAB ]
        </Text>
      </group>

      {/* Lab 3D Signage */}
      <group position={[0, 6.8, 5.6]}>
        <Text
          fontSize={1.4}
          color={isBlackout ? '#333333' : '#3A7DFF'}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
          fontWeight={900}
        >
          AI LAB
        </Text>
      </group>

      <group position={[0, 5.8, 5.6]}>
        <Text
          fontSize={0.35}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          NEURAL AGENT ARCHITECTURES
        </Text>
      </group>

      {/* ================= FLOATING GEOMETRIC NEURAL CORE ================= */}
      <group ref={floatingCoreRef} position={[0, 8, 0]}>
        {/* Central glowing icosahedron */}
        <mesh castShadow>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color={isBlackout ? '#333333' : '#3A7DFF'}
            emissive={isBlackout ? '#000000' : '#2563EB'}
            emissiveIntensity={isNight ? 1.5 : 0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(1.22, 0)]} />
          <lineBasicMaterial color={isBlackout ? '#111111' : '#60A5FA'} />
        </lineSegments>

        {/* Orbiting wireframe ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.2, 0.05, 8, 32]} />
          <meshBasicMaterial color={isBlackout ? '#111111' : '#93C5FD'} />
        </mesh>

        <pointLight
          color="#3A7DFF"
          intensity={isBlackout ? 0 : isNight ? 3 : 1.5}
          distance={12}
        />
      </group>

      {/* ================= ROOFTOP RADAR & ANTENNAS ================= */}
      <group ref={radarRef} position={[3.5, 6.8, -3]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 0.6, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 0.9, 0]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[1.0, 0.2, 0.4, 12, 1, true]} />
          <meshStandardMaterial color="#E2E8F0" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* High-tech External Server Conduit Pipes */}
      <mesh position={[-5.6, 2.5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 5, 12]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[-5.6, 2.5, 1.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 5, 12]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
    </group>
  );
}
