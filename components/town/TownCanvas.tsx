'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { TownWorld } from './TownWorld';
import { useTownStore } from '@/lib/store';

export function TownCanvas() {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const setGameState = useTownStore((s) => s.setGameState);

  useEffect(() => {
    // Detect WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      if (gl) {
        setHasWebGL(true);
      } else {
        setHasWebGL(false);
        setGameState('fallback');
      }
    } catch {
      setHasWebGL(false);
      setGameState('fallback');
    }
  }, [setGameState]);

  if (hasWebGL === false) {
    return null; // FallbackMode UI component handles rendering
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 9, 21], fov: 45, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <TownWorld />
      </Canvas>
    </div>
  );
}
