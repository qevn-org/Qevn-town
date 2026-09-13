'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { HvacUnit } from '../Architectural/RoofEquipment';

export function DataCenter() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;

  return (
    <group position={[-18, 0, -26]}>
      {/* Heavy Monolithic Concrete Bunker */}
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[11, 7, 10]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </mesh>
      <lineSegments position={[0, 3.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(11.04, 7.04, 10.04)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>

      {/* Main Facility Signage */}
      <group position={[0, 6.2, 5.1]}>
        <Text
          fontSize={0.8}
          color={isBlackout ? '#333333' : '#B7FF00'}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.1}
        >
          DATA CENTER
        </Text>
      </group>
      <group position={[0, 5.5, 5.1]}>
        <Text
          fontSize={0.25}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
        >
          TIER-IV SECURE COMPUTE NODE // ARCH.01
        </Text>
      </group>

      {/* Live Telemetry Display Screen */}
      <group position={[0, 3.5, 5.06]}>
        <mesh>
          <planeGeometry args={[6.5, 2.6]} />
          <meshStandardMaterial
            color="#020617"
            emissive={isBlackout ? '#000000' : '#0369A1'}
            emissiveIntensity={isNight ? 0.6 : 0.25}
            roughness={0.1}
          />
        </mesh>
        <Text
          position={[-2.8, 0.8, 0.05]}
          fontSize={0.22}
          color="#38BDF8"
          anchorX="left"
          anchorY="middle"
          fontWeight={900}
        >
          NODE_01 TELEMETRY:
        </Text>
        <Text
          position={[-2.8, 0.3, 0.05]}
          fontSize={0.18}
          color="#B7FF00"
          anchorX="left"
          anchorY="middle"
          fontWeight={700}
        >
          GRID POWER: 98.4% [OPTIMAL]
        </Text>
        <Text
          position={[-2.8, -0.15, 0.05]}
          fontSize={0.18}
          color="#38BDF8"
          anchorX="left"
          anchorY="middle"
          fontWeight={700}
        >
          FIBER NETWORK: 94.2% [100Gbps]
        </Text>
        <Text
          position={[-2.8, -0.6, 0.05]}
          fontSize={0.18}
          color="#F59E0B"
          anchorX="left"
          anchorY="middle"
          fontWeight={700}
        >
          AI COMPUTE: 72.8% [SWARM ACTIVE]
        </Text>
      </group>

      {/* Armored Blast Door */}
      <group position={[0, 0, 5.0]}>
        <mesh position={[0, 1.1, 0.1]} castShadow>
          <boxGeometry args={[2.4, 2.2, 0.2]} />
          <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.2} />
        </mesh>
        <lineSegments position={[0, 1.1, 0.1]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.42, 2.22, 0.22)]} />
          <lineBasicMaterial color="#FF4444" />
        </lineSegments>
        {/* Keycard access scanner */}
        <mesh position={[1.4, 1.2, 0.1]}>
          <boxGeometry args={[0.2, 0.35, 0.1]} />
          <meshBasicMaterial color={isBlackout ? '#222222' : '#B7FF00'} />
        </mesh>
      </group>

      {/* Heavy Rooftop Cooling Battery */}
      <group position={[0, 7.0, 0]}>
        <HvacUnit position={[-2.5, 0, -1.5]} scale={1.2} />
        <HvacUnit position={[2.5, 0, -1.5]} scale={1.2} />
        <HvacUnit position={[0, 0, 1.5]} scale={1.1} />
      </group>

      {/* Secret Access Cooling Vent at Rear (Easter Egg 02) */}
      <group position={[0, 0.8, -5.1]}>
        <mesh>
          <boxGeometry args={[1.6, 1.2, 0.3]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <Text
          position={[0, 0, -0.18]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.14}
          color="#B7FF00"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          VENT // ROOT ACCESS
        </Text>
      </group>
    </group>
  );
}
