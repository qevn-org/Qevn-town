'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export function BikeRack({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Concrete base pad */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 1.0]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
      </mesh>

      {/* Tubular hoops */}
      {[-1.1, -0.55, 0, 0.55, 1.1].map((x, i) => (
        <group key={i} position={[x, 0.4, 0]}>
          <mesh castShadow>
            <torusGeometry args={[0.35, 0.035, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#0A0A0A" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Parked Stylized Low-Poly Bicycle */}
      <group position={[-0.55, 0.35, 0]} rotation={[0, 0.1, 0]}>
        {/* Wheels */}
        <mesh position={[-0.45, 0, 0]}>
          <torusGeometry args={[0.22, 0.02, 6, 12]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0.45, 0, 0]}>
          <torusGeometry args={[0.22, 0.02, 6, 12]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.6, 0.04, 0.04]} />
          <meshStandardMaterial color="#B7FF00" />
        </mesh>
        {/* Handlebar */}
        <mesh position={[-0.38, 0.25, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.3]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
      </group>
    </group>
  );
}

export function DigitalBillboard({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      if (mat && mat.emissive) {
        mat.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
      }
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Heavy Brutalist Base Pillar */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[0.8, 5, 0.8]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.6} />
      </mesh>

      {/* Display Housing */}
      <mesh position={[0, 6.2, 0]} castShadow>
        <boxGeometry args={[6.4, 3.4, 0.6]} />
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </mesh>
      <lineSegments position={[0, 6.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(6.42, 3.42, 0.62)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 6.2, 0.32]}>
        <planeGeometry args={[6.0, 3.0]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#B7FF00"
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Billboard Content */}
      <group position={[0, 6.6, 0.34]}>
        <Text
          fontSize={0.42}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.08}
        >
          QEVN CITY BROADCAST
        </Text>
      </group>
      <group position={[0, 5.8, 0.34]}>
        <Text
          fontSize={0.22}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
          maxWidth={5.4}
        >
          BUILDING DIGITAL THINGS. AUTONOMOUS AGENTS • WEB PLATFORMS • 60FPS THREE.JS
        </Text>
      </group>
    </group>
  );
}

export function SecurityTurnstile({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.3, 1.0, 0.8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glowing card reader */}
      <mesh position={[0, 0.95, 0.2]}>
        <boxGeometry args={[0.15, 0.02, 0.2]} />
        <meshBasicMaterial color="#B7FF00" />
      </mesh>
      {/* Swing barrier */}
      <mesh position={[0.25, 0.5, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.05]} />
        <meshStandardMaterial color="#38BDF8" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
