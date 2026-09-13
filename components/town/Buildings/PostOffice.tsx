'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

export function PostOffice() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;

  return (
    <group position={[14, 0, 14]}>
      {/* ================= POST OFFICE MAIN PAVILION ================= */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[9, 5, 8]} />
        <meshStandardMaterial color="#191919" roughness={0.7} />
      </mesh>
      <lineSegments position={[0, 2.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(9.02, 5.02, 8.02)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>

      {/* Front Entrance */}
      <group position={[0, 0, 4]}>
        <mesh position={[0, 1.2, 0.2]} castShadow>
          <boxGeometry args={[3.2, 2.4, 0.4]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 1.1, 0.42]}>
          <planeGeometry args={[2.2, 2.0]} />
          <meshBasicMaterial color={isBlackout ? '#111111' : '#B7FF00'} />
        </mesh>
        <Text
          position={[0, 2.6, 0.5]}
          fontSize={0.28}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          [ DISPATCH INQUIRY ]
        </Text>
      </group>

      {/* Main Signboard */}
      <group position={[0, 5.8, 4.1]}>
        <Text
          fontSize={1.2}
          color={isBlackout ? '#333333' : '#B7FF00'}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.1}
        >
          POST OFFICE
        </Text>
      </group>

      <group position={[0, 4.9, 4.1]}>
        <Text
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          PROJECT COMMISSIONS & DISPATCH
        </Text>
      </group>

      {/* ================= PNEUMATIC TUBES ================= */}
      <group position={[-3.5, 2.5, 2]}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 3.5, 12]} />
          <meshStandardMaterial color="#FFD400" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
      <group position={[-3.5, 2.5, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 3.5, 12]} />
          <meshStandardMaterial color="#3A7DFF" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Parcel Drop Box on Sidewalk */}
      <group position={[3.2, 0, 5]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[1.2, 1.4, 1.0]} />
          <meshStandardMaterial color="#FF4444" />
        </mesh>
        <mesh position={[0, 1.1, 0.52]}>
          <boxGeometry args={[0.8, 0.1, 0.05]} />
          <meshBasicMaterial color="#0A0A0A" />
        </mesh>
        <Text
          position={[0, 0.7, 0.52]}
          fontSize={0.14}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          DROP BOX
        </Text>
      </group>
    </group>
  );
}
