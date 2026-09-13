'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

/**
 * Tailored Creative Partner NPC (Julian)
 * Designed directly after reference image 1:
 * Tailored camel suit, brown turtleneck, gold buckle belt, Chelsea boots,
 * expressive face with green eyes, side-parted dark hair, and proximity head-turn.
 */
function TailoredLeadNpc({
  position,
  name,
  phrases,
}: {
  position: [number, number, number];
  name: string;
  phrases: string[];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const playerPos = useTownStore((s) => s.playerPos);

  const [phraseIdx, setPhraseIdx] = useState(0);
  const phraseTimer = useRef(0);

  useFrame((_, delta) => {
    phraseTimer.current += delta;
    if (phraseTimer.current > 7.5) {
      phraseTimer.current = 0;
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    if (!groupRef.current) return;

    // Gentle breathing and subtle weight shift
    const time = Date.now() * 0.002;
    groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.015;

    // Proximity awareness: Look towards player if within 7 units
    if (headRef.current && playerPos) {
      const dx = playerPos[0] - (position[0] + groupRef.current.position.x);
      const dz = playerPos[2] - (position[2] + groupRef.current.position.z);
      const dist = Math.hypot(dx, dz);

      if (dist < 7.0) {
        const targetAngle = Math.atan2(dx, dz) - groupRef.current.rotation.y;
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          THREE.MathUtils.clamp(targetAngle, -0.7, 0.7),
          delta * 4
        );
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          Math.sin(time * 0.8) * 0.15,
          delta * 2
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* ================= 1. LEGS & CHELSEA BOOTS (Reference Image 1) ================= */}
      {/* Left Leg in Camel Trousers */}
      <group position={[-0.13, 0.46, 0]}>
        {/* Tailored trouser leg */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.52, 12]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>
        {/* Trouser cuff */}
        <mesh position={[0, -0.42, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 0.05, 12]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>
        {/* Brown Chelsea boot with heel */}
        <mesh position={[0, -0.47, 0.03]} castShadow>
          <boxGeometry args={[0.13, 0.1, 0.26]} />
          <meshStandardMaterial color="#451A03" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* Right Leg in Camel Trousers */}
      <group position={[0.13, 0.46, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.52, 12]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>
        <mesh position={[0, -0.42, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 0.05, 12]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>
        <mesh position={[0, -0.47, 0.03]} castShadow>
          <boxGeometry args={[0.13, 0.1, 0.26]} />
          <meshStandardMaterial color="#451A03" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>

      {/* ================= 2. TORSO & TAILORED SUIT ================= */}
      <group position={[0, 0.82, 0]}>
        {/* Brown turtleneck base */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.34, 0.56, 0.2]} />
          <meshStandardMaterial color="#542B14" roughness={0.7} />
        </mesh>

        {/* Tailored Camel Blazer Jacket (Reference Image 1) */}
        {/* Left jacket flap with notch lapel */}
        <mesh position={[-0.14, 0.02, 0.02]} castShadow>
          <boxGeometry args={[0.15, 0.62, 0.22]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>
        {/* Right jacket flap */}
        <mesh position={[0.14, 0.02, 0.02]} castShadow>
          <boxGeometry args={[0.15, 0.62, 0.22]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>
        {/* Back of jacket */}
        <mesh position={[0, 0.02, -0.02]} castShadow>
          <boxGeometry args={[0.38, 0.62, 0.2]} />
          <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
        </mesh>

        {/* Brown leather belt with gold buckle */}
        <mesh position={[0, -0.28, 0.02]}>
          <boxGeometry args={[0.36, 0.05, 0.22]} />
          <meshStandardMaterial color="#3E1A06" roughness={0.4} />
        </mesh>
        {/* Gold buckle */}
        <mesh position={[0, -0.28, 0.13]}>
          <boxGeometry args={[0.07, 0.06, 0.02]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Tailored arms */}
        {/* Left Arm */}
        <group position={[-0.26, 0.22, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.055, 0.44, 10]} />
            <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
          </mesh>
          {/* Hand with green signet ring (Reference Image 1) */}
          <group position={[0, -0.46, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.06, 0.1, 0.035]} />
              <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
            </mesh>
            {/* Signet ring */}
            <mesh position={[-0.025, 0, 0.01]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial color="#059669" roughness={0.2} metalness={0.7} />
            </mesh>
          </group>
        </group>

        {/* Right Arm */}
        <group position={[0.26, 0.22, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.055, 0.44, 10]} />
            <meshStandardMaterial color="#D7BA9A" roughness={0.65} />
          </mesh>
          <group position={[0, -0.46, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.06, 0.1, 0.035]} />
              <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ================= 3. STYLIZED HEAD & REFINED HAIRCUT ================= */}
      {/* Inspired directly by Reference Image 1 (Refined dark hair, expressive eyes) */}
      <group ref={headRef} position={[0, 1.44, 0]}>
        {/* Brown turtleneck collar */}
        <mesh position={[0, -0.16, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.075, 0.16, 12]} />
          <meshStandardMaterial color="#542B14" roughness={0.7} />
        </mesh>

        {/* Sculpted refined face */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.21, 20, 20]} />
          <meshStandardMaterial color="#F8C8BA" roughness={0.6} />
        </mesh>

        {/* Expressive green eyes (Reference Image 1) */}
        <group position={[-0.075, 0.07, 0.17]}>
          <mesh>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.01, 14]} />
            <meshStandardMaterial color="#059669" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.01, 10]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
        </group>

        <group position={[0.075, 0.07, 0.17]}>
          <mesh>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.01, 14]} />
            <meshStandardMaterial color="#059669" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.01, 10]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
        </group>

        {/* Defined nose & confident smile */}
        <mesh position={[0, 0.03, 0.2]}>
          <sphereGeometry args={[0.024, 10, 10]} />
          <meshStandardMaterial color="#F4A594" roughness={0.65} />
        </mesh>
        <mesh position={[0, -0.04, 0.19]}>
          <boxGeometry args={[0.06, 0.012, 0.02]} />
          <meshStandardMaterial color="#881337" />
        </mesh>

        {/* Dark wavy hair with side-part (Reference Image 1) */}
        <mesh position={[0, 0.14, -0.02]} castShadow>
          <sphereGeometry args={[0.23, 16, 16]} />
          <meshStandardMaterial color="#171717" roughness={0.5} />
        </mesh>
        {/* Volumetric side-part front locks */}
        <group position={[0, 0.22, 0.09]}>
          <mesh position={[-0.06, 0.02, 0]} rotation={[0.2, -0.4, 0.3]} castShadow>
            <boxGeometry args={[0.15, 0.08, 0.16]} />
            <meshStandardMaterial color="#1C1917" roughness={0.5} />
          </mesh>
          <mesh position={[0.07, 0, 0]} rotation={[0.1, 0.3, -0.2]} castShadow>
            <boxGeometry args={[0.14, 0.07, 0.15]} />
            <meshStandardMaterial color="#171717" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ================= 4. FLOATING BRUTALIST SPEECH BUBBLE ================= */}
      <group position={[0, 2.3, 0]}>
        {/* Card shadow */}
        <mesh position={[0.05, -0.05, -0.02]}>
          <planeGeometry args={[3.0, 0.85]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Main card */}
        <mesh>
          <planeGeometry args={[3.0, 0.85]} />
          <meshBasicMaterial color="#F7F7F2" />
        </mesh>
        {/* Header tag */}
        <Text
          position={[-1.35, 0.28, 0.02]}
          fontSize={0.11}
          color="#0A0A0A"
          anchorX="left"
          anchorY="middle"
          fontWeight={900}
        >
          {name.toUpperCase()} // QEVN PARTNER
        </Text>
        {/* Spoken phrase */}
        <Text
          position={[0, -0.08, 0.02]}
          fontSize={0.13}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.7}
          textAlign="center"
          fontWeight={700}
          lineHeight={1.2}
        >
          {phrases[phraseIdx]}
        </Text>
      </group>
    </group>
  );
}

/**
 * Creative Technologist NPC (Elena Rostova)
 * Styled in modern creative aesthetic:
 * Oversized cream chore coat, dark turtleneck, wide-leg trousers, white sneakers,
 * round glasses, holding an illuminated digital tablet, with proximity head-tracking.
 */
function TechnologistNpc({
  position,
  name,
  phrases,
}: {
  position: [number, number, number];
  name: string;
  phrases: string[];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const playerPos = useTownStore((s) => s.playerPos);

  const [phraseIdx, setPhraseIdx] = useState(0);
  const phraseTimer = useRef(0);

  useFrame((_, delta) => {
    phraseTimer.current += delta;
    if (phraseTimer.current > 8.0) {
      phraseTimer.current = 0;
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    if (!groupRef.current) return;

    const time = Date.now() * 0.002;
    groupRef.current.position.y = position[1] + Math.sin(time * 1.6 + 1.0) * 0.012;

    if (headRef.current && playerPos) {
      const dx = playerPos[0] - (position[0] + groupRef.current.position.x);
      const dz = playerPos[2] - (position[2] + groupRef.current.position.z);
      const dist = Math.hypot(dx, dz);

      if (dist < 7.0) {
        const targetAngle = Math.atan2(dx, dz) - groupRef.current.rotation.y;
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          THREE.MathUtils.clamp(targetAngle, -0.65, 0.65),
          delta * 4
        );
      } else {
        headRef.current.rotation.y = THREE.MathUtils.lerp(
          headRef.current.rotation.y,
          Math.sin(time * 0.7) * 0.12,
          delta * 2
        );
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Legs in Pleated Wide-Leg Trousers */}
      <group position={[-0.12, 0.44, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.085, 0.5, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        {/* White Leather Sneaker */}
        <mesh position={[0, -0.44, 0.03]} castShadow>
          <boxGeometry args={[0.13, 0.07, 0.25]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
        </mesh>
      </group>

      <group position={[0.12, 0.44, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.085, 0.5, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.44, 0.03]} castShadow>
          <boxGeometry args={[0.13, 0.07, 0.25]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
        </mesh>
      </group>

      {/* Torso in Oversized Cream Chore Coat */}
      <group position={[0, 0.8, 0]}>
        {/* Charcoal turtleneck */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.32, 0.54, 0.18]} />
          <meshStandardMaterial color="#0F172A" roughness={0.7} />
        </mesh>
        {/* Cream Chore Coat Body */}
        <mesh position={[0, -0.02, 0.01]} castShadow>
          <boxGeometry args={[0.42, 0.64, 0.24]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.65} />
        </mesh>
        {/* Large utility front patch pockets */}
        <mesh position={[-0.12, -0.16, 0.14]}>
          <boxGeometry args={[0.12, 0.14, 0.02]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.65} />
        </mesh>
        <mesh position={[0.12, -0.16, 0.14]}>
          <boxGeometry args={[0.12, 0.14, 0.02]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.65} />
        </mesh>

        {/* Arms holding illuminated digital tablet */}
        <group position={[-0.26, 0.18, 0.08]} rotation={[0.6, 0.4, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.36, 10]} />
            <meshStandardMaterial color="#F1F5F9" roughness={0.65} />
          </mesh>
        </group>
        <group position={[0.26, 0.18, 0.08]} rotation={[0.6, -0.4, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.36, 10]} />
            <meshStandardMaterial color="#F1F5F9" roughness={0.65} />
          </mesh>
        </group>

        {/* Digital Tablet with glowing screen held in front */}
        <group position={[0, 0.08, 0.32]} rotation={[-0.4, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.24, 0.02]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.34, 0.22]} />
            <meshStandardMaterial
              color="#38BDF8"
              emissive="#38BDF8"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      </group>

      {/* Head with stylish bob haircut & glasses */}
      <group ref={headRef} position={[0, 1.4, 0]}>
        <mesh position={[0, -0.14, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.14, 10]} />
          <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.04, 0]} castShadow>
          <sphereGeometry args={[0.2, 18, 18]} />
          <meshStandardMaterial color="#F8C8BA" roughness={0.6} />
        </mesh>

        {/* Big expressive animated eyes */}
        <mesh position={[-0.07, 0.06, 0.17]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>
        <mesh position={[0.07, 0.06, 0.17]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>

        {/* Round Tortoiseshell Eyeglasses */}
        <mesh position={[-0.07, 0.06, 0.19]}>
          <torusGeometry args={[0.045, 0.007, 8, 16]} />
          <meshStandardMaterial color="#78350F" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0.07, 0.06, 0.19]}>
          <torusGeometry args={[0.045, 0.007, 8, 16]} />
          <meshStandardMaterial color="#78350F" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Glasses bridge */}
        <mesh position={[0, 0.06, 0.19]}>
          <boxGeometry args={[0.05, 0.008, 0.008]} />
          <meshStandardMaterial color="#78350F" />
        </mesh>

        {/* Sleek Dark Bob Haircut */}
        <mesh position={[0, 0.12, -0.02]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#1C1917" roughness={0.5} />
        </mesh>
        <mesh position={[-0.18, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.28, 0.22]} />
          <meshStandardMaterial color="#1C1917" roughness={0.5} />
        </mesh>
        <mesh position={[0.18, 0, 0]} castShadow>
          <boxGeometry args={[0.08, 0.28, 0.22]} />
          <meshStandardMaterial color="#1C1917" roughness={0.5} />
        </mesh>
      </group>

      {/* Floating Brutalist Speech Bubble */}
      <group position={[0, 2.2, 0]}>
        <mesh position={[0.05, -0.05, -0.02]}>
          <planeGeometry args={[3.0, 0.85]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh>
          <planeGeometry args={[3.0, 0.85]} />
          <meshBasicMaterial color="#F7F7F2" />
        </mesh>
        <Text
          position={[-1.35, 0.28, 0.02]}
          fontSize={0.11}
          color="#0A0A0A"
          anchorX="left"
          anchorY="middle"
          fontWeight={900}
        >
          {name.toUpperCase()} // CREATIVE TECHNOLOGIST
        </Text>
        <Text
          position={[0, -0.08, 0.02]}
          fontSize={0.13}
          color="#0A0A0A"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.7}
          textAlign="center"
          fontWeight={700}
          lineHeight={1.2}
        >
          {phrases[phraseIdx]}
        </Text>
      </group>
    </group>
  );
}

export function NPCs() {
  return (
    <group>
      {/* 1. Julian Vance (Tailored Partner) in Central Plaza */}
      <TailoredLeadNpc
        position={[-4.5, 0.04, -3.5]}
        name="Julian Vance"
        phrases={[
          'Welcome to QEVN Town 2.0. The architecture here tells our story.',
          'Notice how our digital products have physical town addresses?',
          'The Post Office dispatches commissions straight to our engineering team.',
          'Try visiting Pixel Coffee on Market Street. The terrace just got upgraded!',
        ]}
      />

      {/* 2. Elena Rostova (Creative Technologist) on Innovation Avenue */}
      <TechnologistNpc
        position={[6.5, 0.04, -9.5]}
        name="Elena Rostova"
        phrases={[
          'Check out Casa AA on 5th Avenue — curved white concrete over brick.',
          'We author real 3D assets so the town feels like a living architectural model.',
          'Press [C] for Architecture View to get a miniature isometric perspective!',
          'Every window has modeled depth and responds dynamically to sunset and night.',
        ]}
      />
    </group>
  );
}

