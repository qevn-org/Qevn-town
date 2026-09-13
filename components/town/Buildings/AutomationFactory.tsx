'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { HvacUnit } from '../Architectural/RoofEquipment';

export function AutomationFactory() {
  const armRef = useRef<THREE.Group>(null);
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  useFrame(({ clock }) => {
    if (armRef.current && !isBlackout) {
      armRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.4;
    }
  });

  const isNight = timeOfDay === 'night' && !isBlackout;

  return (
    <group position={[-26, 0, 10]}>
      {/* Main Industrial Factory Shell */}
      <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[13, 6.4, 11]} />
        <meshStandardMaterial color="#1C1917" roughness={0.7} metalness={0.4} />
      </mesh>
      <lineSegments position={[0, 3.2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(13.04, 6.44, 11.04)]} />
        <lineBasicMaterial color="#FFD400" />
      </lineSegments>

      {/* Oversized Factory Signage */}
      <group position={[0, 5.8, 5.6]}>
        <Text
          fontSize={0.9}
          color={isBlackout ? '#444444' : '#FFD400'}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.1}
        >
          AUTOMATION FACTORY
        </Text>
      </group>
      <group position={[0, 5.1, 5.6]}>
        <Text
          fontSize={0.28}
          color="#A8A29E"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          QEVN FLOW // REVENUE & LOGISTICS ENGINES
        </Text>
      </group>

      {/* Dual Cargo Loading Bays */}
      {[-3.2, 3.2].map((bx, idx) => (
        <group key={idx} position={[bx, 0, 5.5]}>
          {/* Shutter Door */}
          <mesh position={[0, 1.6, 0.1]} castShadow>
            <boxGeometry args={[3.8, 3.2, 0.2]} />
            <meshStandardMaterial color="#292524" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Hazard Line */}
          <mesh position={[0, 0.08, 1.2]} receiveShadow>
            <boxGeometry args={[4.2, 0.1, 1.6]} />
            <meshStandardMaterial color="#FFD400" />
          </mesh>
          <Text
            position={[0, 3.0, 0.22]}
            fontSize={0.22}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
          >
            BAY 0{idx + 1}
          </Text>
        </group>
      ))}

      {/* Mechanical Robotic Arm on Loading Bay 1 */}
      <group ref={armRef} position={[-3.2, 0.15, 6.8]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.45, 0.8, 8]} />
          <meshStandardMaterial color="#FFD400" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.1, 0.3]} rotation={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[0.16, 1.2, 0.16]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 1.6, 0.7]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.12, 0.8, 0.12]} />
          <meshStandardMaterial color="#FFD400" />
        </mesh>
        {/* Gripper */}
        <mesh position={[0, 1.3, 1.0]}>
          <boxGeometry args={[0.25, 0.1, 0.15]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
      </group>

      {/* Stacked Cargo Pallets & Wooden Crates */}
      <group position={[3.5, 0, 7.2]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#78350F" roughness={0.9} />
        </mesh>
        <mesh position={[0.4, 1.0, 0.2]} castShadow>
          <boxGeometry args={[0.7, 0.6, 0.7]} />
          <meshStandardMaterial color="#92400E" roughness={0.9} />
        </mesh>
      </group>

      {/* Industrial External Pipes running up the side */}
      <group position={[6.6, 3, 0]}>
        <mesh position={[0, 0, -1]}>
          <cylinderGeometry args={[0.22, 0.22, 5.5, 8]} />
          <meshStandardMaterial color="#FFD400" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, 1]}>
          <cylinderGeometry args={[0.22, 0.22, 5.5, 8]} />
          <meshStandardMaterial color="#78716C" metalness={0.8} />
        </mesh>
      </group>

      {/* Rooftop Ventilation */}
      <group position={[0, 6.4, 0]}>
        <HvacUnit position={[-2, 0, -1]} scale={1.0} />
        <HvacUnit position={[2, 0, -1]} scale={1.0} />
      </group>
    </group>
  );
}
