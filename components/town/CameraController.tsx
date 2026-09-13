'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

export function CameraController() {
  const { camera } = useThree();
  const playerPos = useTownStore((s) => s.playerPos);
  const activeLocation = useTownStore((s) => s.activeLocation);

  const currentLookAt = useRef(new THREE.Vector3(0, 1, 8));

  useFrame((_, delta) => {
    // Determine target camera position
    let targetX = playerPos[0];
    let targetY = playerPos[1] + 9;
    let targetZ = playerPos[2] + 13;

    let targetLookX = playerPos[0];
    let targetLookY = playerPos[1] + 1.2;
    let targetLookZ = playerPos[2];

    // Subtle framing pull-back when near HQ or AI Lab
    if (activeLocation?.id === 'hq') {
      targetY += 2;
      targetZ += 2.5;
      targetLookY += 2.0;
    } else if (activeLocation?.id === 'ai-lab') {
      targetY += 1.5;
      targetLookY += 1.5;
    }

    // Smooth lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3.8);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3.8);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3.8);

    // Smooth lerp lookAt target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLookX, delta * 4.5);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLookY, delta * 4.5);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLookZ, delta * 4.5);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
