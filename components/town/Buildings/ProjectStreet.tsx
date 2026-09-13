'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { PROJECTS } from '@/data/projects';
import { useTownStore } from '@/lib/store';

export function ProjectStreet() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;

  return (
    <group position={[-12, 0, 14]}>
      {/* Street Signpost */}
      <group position={[7, 0, -5]}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 3.6, 8]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <boxGeometry args={[3.2, 0.6, 0.15]} />
          <meshStandardMaterial color="#FF4444" />
        </mesh>
        <Text
          position={[0, 3.2, 0.1]}
          fontSize={0.25}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.1}
        >
          PROJECT STREET
        </Text>
      </group>

      {/* Array of Project Buildings */}
      {PROJECTS.map((proj, idx) => {
        // Space them horizontally along the street
        const posX = (idx - 1.5) * 4.4;
        const height = 4.2 + (idx % 2) * 1.2;

        return (
          <group key={proj.id} position={[posX, 0, 0]}>
            {/* Building Body */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[3.8, height, 4.2]} />
              <meshStandardMaterial color={proj.color} roughness={0.7} />
            </mesh>

            {/* Edge line highlight */}
            <lineSegments position={[0, height / 2, 0]}>
              <edgesGeometry args={[new THREE.BoxGeometry(3.82, height + 0.02, 4.22)]} />
              <lineBasicMaterial color={proj.accent} />
            </lineSegments>

            {/* Front Illuminated Project Screen / Kiosk Window */}
            <mesh position={[0, height / 2 + 0.3, 2.12]}>
              <planeGeometry args={[3.2, 1.8]} />
              <meshStandardMaterial
                color="#0A0A0A"
                emissive={isBlackout ? '#000000' : proj.accent}
                emissiveIntensity={isNight ? 0.6 : 0.2}
                roughness={0.1}
              />
            </mesh>

            {/* Project Title Signage */}
            <group position={[0, height - 0.4, 2.15]}>
              <Text
                fontSize={0.28}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                fontWeight={800}
                letterSpacing={0.05}
              >
                {proj.title}
              </Text>
            </group>

            {/* Status Tag Pill on roof */}
            <group position={[0, height + 0.4, 1.2]}>
              <mesh castShadow>
                <boxGeometry args={[1.5, 0.4, 0.2]} />
                <meshStandardMaterial color={proj.accent} />
              </mesh>
              <Text
                position={[0, 0, 0.12]}
                fontSize={0.2}
                color="#0A0A0A"
                anchorX="center"
                anchorY="middle"
                fontWeight={900}
              >
                {proj.status}
              </Text>
            </group>

            {/* Ground Level Entrance */}
            <group position={[0, 0, 2.1]}>
              <mesh position={[0, 0.9, 0.05]}>
                <planeGeometry args={[1.4, 1.8]} />
                <meshBasicMaterial color={isBlackout ? '#111111' : '#B7FF00'} />
              </mesh>
              <Text
                position={[0, 1.9, 0.1]}
                fontSize={0.18}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
              >
                INSPECT [E]
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}
