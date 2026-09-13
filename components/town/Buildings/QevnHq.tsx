'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { BikeRack } from '../Architectural/ArchitecturalProps';

function HqModel({ isNight }: { isNight: boolean }) {
  const { scene } = useGLTF('/models/buildings/qevn_hq.glb');

  // Clone so multiple instances or material updates don't collide
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={clonedScene} />;
}

export function QevnHq() {
  const beaconRef = useRef<THREE.PointLight>(null);
  const entranceLightRef = useRef<THREE.PointLight>(null);
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      if (isBlackout) {
        beaconRef.current.intensity = 0;
      } else {
        beaconRef.current.intensity = (Math.sin(clock.getElapsedTime() * 4) + 1) * 1.2;
      }
    }
  });

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  const entranceLightColor = isBlackout ? '#000000' : isNight ? '#FEF08A' : '#FFFBEB';
  const entranceLightIntensity = isBlackout ? 0 : isNight ? 2.5 : isDusk ? 1.4 : 0.6;

  return (
    <group position={[0, 0, -22]}>
      {/* 🏛️ HIGH-FIDELITY ARCHITECTURAL GLB MODEL (OMAR M-Y BENCHMARK) */}
      <React.Suspense fallback={null}>
        <HqModel isNight={isNight} />
      </React.Suspense>

      {/* Hero Architectural Signage "QEVN" on Entrance Canopy Beam */}
      <group position={[2.8, 6.2, 8.5]}>
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.48}
          color="#0F172A"
          letterSpacing={0.22}
          anchorX="center"
          anchorY="middle"
        >
          QEVN
        </Text>
      </group>

      {/* Dynamic Entrance Architectural Downlight */}
      <pointLight
        ref={entranceLightRef}
        position={[2.8, 5.8, 7.5]}
        color={entranceLightColor}
        intensity={entranceLightIntensity}
        distance={14}
        castShadow
      />

      {/* Interior Ambient Fill Light for Night Mode Glass Translucency */}
      {(isNight || isDusk) && (
        <pointLight
          position={[2.8, 3.2, 2.0]}
          color="#FEF08A"
          intensity={isNight ? 2.8 : 1.2}
          distance={18}
        />
      )}

      {/* High-Altitude Aviation Warning Beacon Light */}
      <pointLight
        ref={beaconRef}
        position={[-1.0, 22.0, -4.2]}
        color="#EF4444"
        distance={32}
        intensity={1.8}
      />

      {/* Bicycle Rack on Pedestrian Promenade */}
      <BikeRack position={[-9.5, 0, 8.5]} />
    </group>
  );
}

// Preload the GLB model asset for instant hydration
useGLTF.preload('/models/buildings/qevn_hq.glb');
