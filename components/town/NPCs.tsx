'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface NPCProps {
  initialPos: [number, number, number];
  color: string;
  hatColor?: string;
  name: string;
  phrases: string[];
  patrolRange?: number;
  patrolAxis?: 'x' | 'z';
}

function StylizedNpc({
  initialPos,
  color,
  hatColor = '#B7FF00',
  name,
  phrases,
  patrolRange = 0,
  patrolAxis = 'x',
}: NPCProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const timeRef = useRef(0);
  const phraseTimer = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    phraseTimer.current += delta;

    if (phraseTimer.current > 7) {
      phraseTimer.current = 0;
      setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    if (!groupRef.current) return;

    if (patrolRange > 0) {
      const offset = Math.sin(timeRef.current * 0.8) * patrolRange;
      if (patrolAxis === 'x') {
        groupRef.current.position.x = initialPos[0] + offset;
        groupRef.current.rotation.y = Math.cos(timeRef.current * 0.8) > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else {
        groupRef.current.position.z = initialPos[2] + offset;
        groupRef.current.rotation.y = Math.cos(timeRef.current * 0.8) > 0 ? 0 : Math.PI;
      }
    }

    // Walking / breathing bob
    groupRef.current.position.y = initialPos[1] + Math.abs(Math.sin(timeRef.current * 3.5)) * 0.08;
  });

  return (
    <group ref={groupRef} position={initialPos}>
      {/* Torso */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.6, 0.7, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <lineSegments position={[0, 0.7, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.62, 0.72, 0.37)]} />
        <lineBasicMaterial color="#0A0A0A" />
      </lineSegments>

      {/* Head */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial color="#F5D0C5" roughness={0.7} />
      </mesh>

      {/* Stylized Hat / Cap */}
      <mesh position={[0, 1.48, 0]} castShadow>
        <boxGeometry args={[0.42, 0.12, 0.42]} />
        <meshStandardMaterial color={hatColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.44, 0.25]} castShadow>
        <boxGeometry args={[0.38, 0.05, 0.22]} />
        <meshStandardMaterial color={hatColor} roughness={0.4} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.16, 0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.2]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[0.16, 0.2, 0]} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.2]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>

      {/* Floating Brutalist Speech Bubble */}
      <group position={[0, 2.2, 0]}>
        {/* Bubble frame */}
        <mesh>
          <planeGeometry args={[2.8, 0.8]} />
          <meshBasicMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.7, 0.72]} />
          <meshBasicMaterial color="#F7F7F2" />
        </mesh>
        {/* Name tag */}
        <Text
          position={[-1.15, 0.22, 0.02]}
          fontSize={0.11}
          color="#FF4444"
          anchorX="left"
          anchorY="middle"
          fontWeight={900}
        >
          {name}:
        </Text>
        {/* Phrase text */}
        <Text
          position={[0, -0.08, 0.02]}
          fontSize={0.105}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
        >
          {phrases[currentPhraseIdx]}
        </Text>
      </group>
    </group>
  );
}

export function NPCs() {
  return (
    <group>
      {/* NPC 1: Lead Engineer in Central Plaza */}
      <StylizedNpc
        initialPos={[-3, 0.08, -2]}
        color="#1E293B"
        hatColor="#B7FF00"
        name="KAI // ENG"
        phrases={[
          'QEVN builds digital products that live.',
          'Next.js + Three.js at 60fps is pure art.',
          'Did you check out the AI Lab?',
        ]}
        patrolRange={2.5}
        patrolAxis="x"
      />

      {/* NPC 2: AI Researcher outside AI Lab */}
      <StylizedNpc
        initialPos={[-13, 0.08, -4]}
        color="#0F172A"
        hatColor="#3A7DFF"
        name="DR. SORA // AI"
        phrases={[
          'The autonomous agents are refining weights.',
          'Never build generic chat interfaces.',
          'Everything in this town is data-driven.',
        ]}
        patrolRange={2.0}
        patrolAxis="z"
      />

      {/* NPC 3: Coffee Enthusiast at Cafe */}
      <StylizedNpc
        initialPos={[14, 0.08, -2]}
        color="#7C2D12"
        hatColor="#FFD400"
        name="LUCAS // CREATIVE"
        phrases={[
          'Dispatch #04 dropped at the cafe!',
          'Don’t browse websites. Enter worlds.',
          'Have you noticed the breaker in Alley 01?',
        ]}
        patrolRange={1.8}
        patrolAxis="x"
      />
    </group>
  );
}
