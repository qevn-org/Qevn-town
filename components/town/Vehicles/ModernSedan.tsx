'use client';

import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useTownStore } from '@/lib/store';

function SedanModel() {
  const { scene } = useGLTF('/models/vehicles/car_sedan.glb');

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

/**
 * Manufactured Modern EV Sedan (Phase C)
 * Loaded from public/models/vehicles/car_sedan.glb.
 * Modeled with aerodynamic curvature, beveled contours, panoramic glass canopy,
 * multi-spoke alloy wheels, and LED lightbars.
 */
export function ModernSedan({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isParked = true,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  bodyColor?: string;
  isParked?: boolean;
}) {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;
  const lightsOn = (isNight || isDusk) && !isBlackout;

  return (
    <group position={position} rotation={rotation}>
      <React.Suspense fallback={null}>
        <SedanModel />
      </React.Suspense>

      {/* Headlight Forward Cones */}
      {lightsOn && (
        <>
          <spotLight
            position={[0, 0.5, -2.2]}
            target-position={[0, 0, -12]}
            color="#E0F2FE"
            intensity={4.5}
            distance={18}
            angle={0.65}
            penumbra={0.5}
            castShadow
          />
          {/* Taillight ambient glow */}
          <pointLight
            position={[0, 0.58, 2.3]}
            color="#EF4444"
            intensity={1.2}
            distance={4}
          />
        </>
      )}
    </group>
  );
}

useGLTF.preload('/models/vehicles/car_sedan.glb');
