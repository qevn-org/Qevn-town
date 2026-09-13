'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export function CityGuideMascot() {
  const mascotRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const timer = useRef(0);

  const guidancePhrases = [
    "Welcome to QEVN Town. You're entering a real digital city.",
    "HQ is straight ahead. Check out the engineering dossier.",
    "Did you inspect the autonomous swarm at the AI Lab?",
    "Pixel Coffee has the fastest digital checkout in the sector.",
    "Central Station runs high-speed trains to all districts.",
    "Whatever you do... don't touch the switch behind HQ.",
  ];

  useFrame(({ clock }, delta) => {
    timer.current += delta;
    if (timer.current > 6.5) {
      timer.current = 0;
      setCurrentIdx((prev) => (prev + 1) % guidancePhrases.length);
    }

    if (mascotRef.current) {
      mascotRef.current.position.y = 1.4 + Math.sin(clock.getElapsedTime() * 2.5) * 0.15;
      mascotRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.25;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5;
    }
  });

  return (
    <group position={[3.5, 0, 2]}>
      {/* Ground Shadow Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <circleGeometry args={[0.65, 16]} />
        <meshBasicMaterial color="#000000" opacity={0.3} transparent />
      </mesh>

      {/* Floating Drone Character */}
      <group ref={mascotRef} position={[0, 1.4, 0]}>
        {/* Core Body: Rounded Brutalist Cube */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.8} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.72, 0.72)]} />
          <lineBasicMaterial color="#B7FF00" />
        </lineSegments>

        {/* Glowing Lens Eye */}
        <mesh position={[0, 0, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
          <meshStandardMaterial color="#B7FF00" emissive="#B7FF00" emissiveIntensity={1.2} />
        </mesh>

        {/* Orbiting Halo Ring */}
        <mesh ref={ringRef} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.65, 0.03, 8, 24]} />
          <meshStandardMaterial color="#FFD400" />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#FF4444" />
        </mesh>

        {/* Floating Brutalist Speech Bubble */}
        <group position={[0, 1.3, 0]}>
          <mesh>
            <planeGeometry args={[3.6, 0.9]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[3.52, 0.82]} />
            <meshBasicMaterial color="#B7FF00" />
          </mesh>
          <Text
            position={[-1.6, 0.24, 0.02]}
            fontSize={0.13}
            color="#0A0A0A"
            anchorX="left"
            anchorY="middle"
            fontWeight={900}
          >
            QEV // CITY GUIDE:
          </Text>
          <Text
            position={[0, -0.1, 0.02]}
            fontSize={0.12}
            color="#0A0A0A"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.2}
            fontWeight={700}
          >
            {guidancePhrases[currentIdx]}
          </Text>
        </group>
      </group>
    </group>
  );
}
