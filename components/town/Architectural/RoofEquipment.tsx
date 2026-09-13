'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HvacUnitProps {
  position: [number, number, number];
  scale?: number;
}

export function HvacUnit({ position, scale = 1 }: HvacUnitProps) {
  const fanRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.y += delta * 6;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Heavy Base Enclosure */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.8, 1.2, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
      </mesh>
      <lineSegments position={[0, 0.6, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.82, 1.22, 1.42)]} />
        <lineBasicMaterial color="#0A0A0A" />
      </lineSegments>

      {/* Fan Vent Cowl */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.15, 16]} />
        <meshStandardMaterial color="#1E293B" metalness={0.6} />
      </mesh>

      {/* Spinning Fan Blades */}
      <group ref={fanRef} position={[0, 1.3, 0]}>
        {[-0.35, 0.35].map((pos, i) => (
          <mesh key={i} position={[pos, 0, 0]}>
            <boxGeometry args={[0.3, 0.02, 0.08]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
        ))}
        {[-0.35, 0.35].map((pos, i) => (
          <mesh key={`cross-${i}`} position={[0, 0, pos]}>
            <boxGeometry args={[0.08, 0.02, 0.3]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
        ))}
      </group>

      {/* Exhaust Duct Pipe */}
      <mesh position={[0.7, 0.6, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#64748B" metalness={0.7} />
      </mesh>
    </group>
  );
}

interface SolarArrayProps {
  position: [number, number, number];
  rows?: number;
  cols?: number;
}

export function SolarArray({ position, rows = 2, cols = 3 }: SolarArrayProps) {
  return (
    <group position={position}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const posX = (c - (cols - 1) / 2) * 1.8;
          const posZ = (r - (rows - 1) / 2) * 1.4;
          return (
            <group key={`solar-${r}-${c}`} position={[posX, 0.35, posZ]} rotation={[-0.35, 0, 0]}>
              {/* Stand / Frame */}
              <mesh position={[0, -0.2, 0]} castShadow>
                <boxGeometry args={[1.5, 0.05, 0.9]} />
                <meshStandardMaterial color="#0A0A0A" />
              </mesh>
              {/* Photovoltaic Glass Surface */}
              <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.4, 0.04, 0.8]} />
                <meshStandardMaterial
                  color="#1E3A8A"
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>
              {/* Grid Lines */}
              <lineSegments position={[0, 0.03, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(1.42, 0.04, 0.82)]} />
                <lineBasicMaterial color="#93C5FD" />
              </lineSegments>
            </group>
          );
        })
      )}
    </group>
  );
}

export function SatelliteDish({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Base mount */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.6, 8]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
      {/* Arm */}
      <mesh position={[0, 0.8, 0.2]} rotation={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 6]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>
      {/* Concave Dish */}
      <mesh position={[0, 1.2, 0.4]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.2, 0.25, 16, 1, true]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.3} metalness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Feed horn */}
      <mesh position={[0, 1.3, 0.7]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#B7FF00" />
      </mesh>
    </group>
  );
}
