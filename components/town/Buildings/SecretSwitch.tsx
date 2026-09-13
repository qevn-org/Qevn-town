'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

export function SecretSwitch() {
  const leverRef = useRef<THREE.Group>(null);
  const isBlackout = useTownStore((s) => s.isBlackout);

  useFrame(() => {
    if (leverRef.current) {
      leverRef.current.rotation.x = isBlackout ? 0.7 : -0.2;
    }
  });

  return (
    <group position={[-7, 0, -26]}>
      {/* Industrial Base Pillar */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.4, 0.8]} />
        <meshStandardMaterial color="#1E1E1E" roughness={0.8} />
      </mesh>

      {/* Main Yellow Hazard Breaker Box */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[1.6, 1.8, 0.9]} />
        <meshStandardMaterial color="#FFD400" roughness={0.4} />
      </mesh>
      <lineSegments position={[0, 1.8, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.62, 1.82, 0.92)]} />
        <lineBasicMaterial color="#0A0A0A" />
      </lineSegments>

      {/* Front Warning Signboard */}
      <mesh position={[0, 2.3, 0.46]}>
        <planeGeometry args={[1.4, 0.5]} />
        <meshBasicMaterial color="#FF4444" />
      </mesh>
      <Text
        position={[0, 2.3, 0.48]}
        fontSize={0.16}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        fontWeight={900}
      >
        DO NOT TOUCH
      </Text>

      {/* Lightning Hazard Symbol */}
      <Text
        position={[0, 1.8, 0.48]}
        fontSize={0.35}
        color="#0A0A0A"
        anchorX="center"
        anchorY="middle"
        fontWeight={900}
      >
        ⚡ 480V
      </Text>

      {/* Big Mechanical Pull Lever */}
      <group ref={leverRef} position={[0, 1.4, 0.48]}>
        <mesh position={[0, 0.35, 0.15]} castShadow>
          <boxGeometry args={[0.12, 0.7, 0.12]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 0.7, 0.15]} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#FF4444" roughness={0.3} />
        </mesh>
      </group>

      {/* Flashing Warning Indicator Light */}
      <mesh position={[0.6, 2.5, 0.4]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color={isBlackout ? '#FF0000' : '#440000'} />
      </mesh>

      {/* High-voltage conduit leading underground */}
      <mesh position={[0.5, 0.8, -0.2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.6, 8]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </group>
  );
}
