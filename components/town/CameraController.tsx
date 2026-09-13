'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

export function CameraController() {
  const { camera } = useThree();
  const playerPos = useTownStore((s) => s.playerPos);
  const activeLocation = useTownStore((s) => s.activeLocation);
  const architectureView = useTownStore((s) => s.architectureView);
  const toggleArchitectureView = useTownStore((s) => s.toggleArchitectureView);

  const currentLookAt = useRef(new THREE.Vector3(0, 1, 8));

  // KeyC shortcut listener to toggle Architecture View
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.code === 'KeyC') {
        toggleArchitectureView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleArchitectureView]);

  useFrame((_, delta) => {
    let targetX = playerPos[0];
    let targetY = playerPos[1] + 9;
    let targetZ = playerPos[2] + 13;

    let targetLookX = playerPos[0];
    let targetLookY = playerPos[1] + 1.2;
    let targetLookZ = playerPos[2];

    if (architectureView) {
      // Elevated architectural isometric model perspective
      targetX = playerPos[0] + 16;
      targetY = playerPos[1] + 24;
      targetZ = playerPos[2] + 20;
      targetLookY = playerPos[1] + 3.0;
    } else if (activeLocation?.id === 'hq') {
      // Subtle framing pull-back when near HQ or AI Lab
      targetY += 2;
      targetZ += 2.5;
      targetLookY += 2.0;
    } else if (activeLocation?.id === 'ai-lab') {
      targetY += 1.5;
      targetLookY += 1.5;
    }

    // Smooth lerp camera position
    const lerpSpeed = architectureView ? 2.5 : 3.8;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * lerpSpeed);

    // Smooth lerp lookAt target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLookX, delta * 4.5);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLookY, delta * 4.5);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLookZ, delta * 4.5);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
