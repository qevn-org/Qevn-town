'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

export function CentralStation() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;

  return (
    <group position={[0, 0, 32]}>
      {/* Station Terminal Concrete Canopy Structure */}
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 7, 10]} />
        <meshStandardMaterial color="#18181B" roughness={0.7} metalness={0.2} />
      </mesh>
      <lineSegments position={[0, 3.5, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(18.04, 7.04, 10.04)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>

      {/* Grand Arch Opening / Platform Atrium */}
      <mesh position={[0, 2.2, -5.05]}>
        <planeGeometry args={[14, 4.4]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive={isNight ? '#38BDF8' : '#0284C7'}
          emissiveIntensity={isNight ? 0.6 : 0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Oversized Station Marquee Signage */}
      <group position={[0, 6.2, -5.1]}>
        <Text
          fontSize={1.0}
          color={isBlackout ? '#444444' : '#B7FF00'}
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.12}
        >
          QEVN CENTRAL
        </Text>
      </group>
      <group position={[0, 5.3, -5.1]}>
        <Text
          fontSize={0.28}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
        >
          RAPID TRANSIT NETWORK // TERMINAL 01
        </Text>
      </group>

      {/* Digital Line Status Board */}
      <group position={[0, 3.6, -5.12]}>
        <Text
          fontSize={0.2}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          ● GREEN: PRODUCTS  |  ● BLUE: PROJECTS  |  ● RED: SERVICES
        </Text>
      </group>

      {/* Railway Platform & Track Slabs */}
      <mesh position={[0, 0.2, 5.5]} receiveShadow>
        <boxGeometry args={[16, 0.4, 4]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>
      {/* Rails */}
      {[-2, 2].map((rz, idx) => (
        <group key={idx} position={[0, 0.45, 5.5 + rz]}>
          {[-0.8, 0.8].map((rx, j) => (
            <mesh key={j} position={[rx, 0, 0]}>
              <boxGeometry args={[0.06, 0.08, 3.8]} />
              <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Stylized High-Speed Train at Platform */}
      <group position={[-2, 0.7, 5.5]}>
        {/* Train Locomotive Body */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[1.4, 1.2, 7.5]} />
          <meshStandardMaterial color="#0A0A0A" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Aerodynamic Nose */}
        <mesh position={[0, 0.6, -4.2]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[1.35, 1.0, 1.2]} />
          <meshStandardMaterial color="#B7FF00" />
        </mesh>
        {/* Streamlined Windows */}
        <mesh position={[0.72, 0.7, 0]}>
          <boxGeometry args={[0.05, 0.35, 6.2]} />
          <meshBasicMaterial color={isBlackout ? '#222222' : '#38BDF8'} />
        </mesh>
        <mesh position={[-0.72, 0.7, 0]}>
          <boxGeometry args={[0.05, 0.35, 6.2]} />
          <meshBasicMaterial color={isBlackout ? '#222222' : '#38BDF8'} />
        </mesh>
        {/* Train Headlights */}
        <mesh position={[0, 0.5, -4.75]}>
          <boxGeometry args={[0.6, 0.15, 0.05]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
      </group>
    </group>
  );
}
