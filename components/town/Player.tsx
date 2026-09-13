'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { TOWN_LOCATIONS, TownLocation } from '@/data/locations';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';

/**
 * Hero Stylized Player Character (Phase B)
 * Loaded from public/models/characters/player/hero_player.glb.
 * Matches animated-film visual benchmark:
 * Expressive face, swept-back brown hair, red/green plaid flannel over white tee,
 * dark denim indigo jeans, brown suede skate sneakers with thick white rubber cupsole.
 */
function HeroPlayerModel({
  onMountNodes,
}: {
  onMountNodes: (nodes: {
    head: THREE.Object3D | null;
    torso: THREE.Object3D | null;
    leftArm: THREE.Object3D | null;
    rightArm: THREE.Object3D | null;
    leftLeg: THREE.Object3D | null;
    rightLeg: THREE.Object3D | null;
  }) => void;
}) {
  const { scene } = useGLTF('/models/characters/player/hero_player.glb');

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

  useEffect(() => {
    onMountNodes({
      head: clonedScene.getObjectByName('Head_Assembly') || null,
      torso: clonedScene.getObjectByName('Torso_Assembly') || null,
      leftArm: clonedScene.getObjectByName('Arm_Left') || null,
      rightArm: clonedScene.getObjectByName('Arm_Right') || null,
      leftLeg: clonedScene.getObjectByName('Leg_Left') || null,
      rightLeg: clonedScene.getObjectByName('Leg_Right') || null,
    });
  }, [clonedScene, onMountNodes]);

  return <primitive object={clonedScene} />;
}

export function Player() {
  const groupRef = useRef<THREE.Group>(null);
  const limbsRef = useRef<{
    head: THREE.Object3D | null;
    torso: THREE.Object3D | null;
    leftArm: THREE.Object3D | null;
    rightArm: THREE.Object3D | null;
    leftLeg: THREE.Object3D | null;
    rightLeg: THREE.Object3D | null;
  }>({
    head: null,
    torso: null,
    leftArm: null,
    rightArm: null,
    leftLeg: null,
    rightLeg: null,
  });

  // Zustand state and actions
  const soundEnabled = useTownStore((s) => s.soundEnabled);
  const setPlayerPos = useTownStore((s) => s.setPlayerPos);
  const setActiveLocation = useTownStore((s) => s.setActiveLocation);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const fastTravelTarget = useTownStore((s) => s.fastTravelTarget);
  const clearTeleport = useTownStore((s) => s.clearTeleport);
  const triggerBlackout = useTownStore((s) => s.triggerBlackout);
  const unlockSecret = useTownStore((s) => s.unlockSecret);
  const interactRequested = useTownStore((s) => s.interactRequested);
  const clearInteract = useTownStore((s) => s.clearInteract);

  // Key tracking
  const keys = useRef<{ [key: string]: boolean }>({});
  const walkCycle = useRef(0);
  const footstepTimer = useRef(0);
  const currentRotation = useRef(0);
  const benchIdleTimer = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      keys.current[e.code] = true;

      if (e.code === 'KeyE' && activeOverlay === 'none') {
        executeInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeOverlay]);

  useEffect(() => {
    if (interactRequested && activeOverlay === 'none') {
      executeInteraction();
      clearInteract();
    }
  }, [interactRequested, activeOverlay]);

  const executeInteraction = () => {
    const activeLoc = useTownStore.getState().activeLocation;
    if (!activeLoc) return;

    soundManager.playChime(useTownStore.getState().soundEnabled);
    trackEvent('location_entered', { location: activeLoc.id });

    if (activeLoc.id === 'secret-switch') {
      soundManager.playSwitchSound(useTownStore.getState().soundEnabled);
      soundManager.playBlackoutSound(useTownStore.getState().soundEnabled);
      triggerBlackout(3200);
      unlockSecret('secret-breaker');
      setTimeout(() => {
        openOverlay('secret-bunker');
      }, 700);
      return;
    }

    if (activeLoc.id === 'data-center') {
      const p = groupRef.current?.position;
      if (p && p.z < -29) {
        unlockSecret('secret-datacenter');
        openOverlay('secret-bunker');
        return;
      }
      openOverlay('commercial-study', 'data-center');
      return;
    }

    if (activeLoc.id === 'hq' || activeLoc.id === 'plaza-monument') {
      openOverlay('hq');
    } else if (activeLoc.id === 'info-kiosk') {
      openOverlay('kiosk');
    } else if (activeLoc.id === 'ai-lab') {
      openOverlay('ai-lab');
    } else if (activeLoc.id === 'cafe') {
      openOverlay('cafe');
    } else if (activeLoc.id === 'projects') {
      openOverlay('project');
    } else if (activeLoc.id === 'post-office') {
      openOverlay('post-office');
    } else if (activeLoc.id === 'central-station') {
      openOverlay('station');
    } else if (
      activeLoc.id === 'pixel-coffee' ||
      activeLoc.id === 'null-hotel' ||
      activeLoc.id === 'loop-market' ||
      activeLoc.id === 'patch-clinic' ||
      activeLoc.id === 'ctrl-cowork' ||
      activeLoc.id === 'automation-factory' ||
      activeLoc.id === 'casa-aa'
    ) {
      openOverlay('commercial-study', activeLoc.id);
    }
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (fastTravelTarget) {
      groupRef.current.position.set(...fastTravelTarget);
      currentRotation.current = 0;
      groupRef.current.rotation.y = 0;
      setPlayerPos(fastTravelTarget, 0);
      clearTeleport();
      return;
    }

    let moveX = 0;
    let moveZ = 0;

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveZ -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveZ += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveX -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveX += 1;

    const isMoving = moveX !== 0 || moveZ !== 0;
    const isSprint = keys.current['ShiftLeft'] || keys.current['ShiftRight'];
    const speed = isSprint ? 12 : 6.8;

    const limbs = limbsRef.current;

    if (isMoving) {
      const length = Math.hypot(moveX, moveZ);
      const normX = (moveX / length) * speed * delta;
      const normZ = (moveZ / length) * speed * delta;

      const nextX = THREE.MathUtils.clamp(groupRef.current.position.x + normX, -38, 38);
      const nextZ = THREE.MathUtils.clamp(groupRef.current.position.z + normZ, -36, 36);

      groupRef.current.position.x = nextX;
      groupRef.current.position.z = nextZ;

      const targetAngle = Math.atan2(moveX, moveZ);
      currentRotation.current = THREE.MathUtils.lerp(currentRotation.current, targetAngle, delta * 15);
      groupRef.current.rotation.y = currentRotation.current;

      // Kinematic stride
      walkCycle.current += delta * (isSprint ? 16 : 10.5);
      const legSwing = Math.sin(walkCycle.current) * 0.55;
      const armSwing = Math.sin(walkCycle.current) * 0.45;
      const hipBob = Math.abs(Math.sin(walkCycle.current)) * 0.06;

      if (limbs.leftLeg && limbs.rightLeg) {
        limbs.leftLeg.rotation.x = legSwing;
        limbs.rightLeg.rotation.x = -legSwing;
      }
      if (limbs.leftArm && limbs.rightArm) {
        limbs.leftArm.rotation.x = -armSwing;
        limbs.rightArm.rotation.x = armSwing;
      }
      if (limbs.torso) {
        limbs.torso.rotation.y = Math.sin(walkCycle.current) * 0.08;
      }

      groupRef.current.position.y = 0.04 + hipBob;

      footstepTimer.current += delta;
      const stepInterval = isSprint ? 0.22 : 0.32;
      if (footstepTimer.current > stepInterval) {
        footstepTimer.current = 0;
        soundManager.playFootstep(soundEnabled);
      }
    } else {
      // Idle breathing sway
      const idleTime = Date.now() * 0.002;
      if (limbs.leftLeg && limbs.rightLeg) {
        limbs.leftLeg.rotation.x = 0;
        limbs.rightLeg.rotation.x = 0;
      }
      if (limbs.leftArm && limbs.rightArm) {
        limbs.leftArm.rotation.x = Math.sin(idleTime) * 0.04;
        limbs.rightArm.rotation.x = -Math.sin(idleTime) * 0.04;
      }
      if (limbs.head) {
        limbs.head.position.y = 1.52 + Math.sin(idleTime * 1.5) * 0.01;
      }
      if (limbs.torso) {
        limbs.torso.rotation.y = 0;
      }
      groupRef.current.position.y = 0.04;

      // Secret bench idle
      const px = groupRef.current.position.x;
      const pz = groupRef.current.position.z;
      if (Math.hypot(px - 0, pz - (-6)) < 2.5) {
        benchIdleTimer.current += delta;
        if (benchIdleTimer.current > 5.0) {
          unlockSecret('secret-bench');
        }
      }
    }

    const pX = groupRef.current.position.x;
    const pY = groupRef.current.position.y;
    const pZ = groupRef.current.position.z;
    setPlayerPos([pX, pY, pZ], currentRotation.current);

    let nearest: TownLocation | null = null;
    let minDist = Infinity;

    for (const loc of TOWN_LOCATIONS) {
      const dist = Math.hypot(pX - loc.position[0], pZ - loc.position[2]);
      if (dist < loc.interactionRadius && dist < minDist) {
        minDist = dist;
        nearest = loc;
      }
    }

    const currentActive = useTownStore.getState().activeLocation;
    if (nearest?.id !== currentActive?.id) {
      setActiveLocation(nearest);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.04, 8]}>
      <React.Suspense fallback={null}>
        <HeroPlayerModel
          onMountNodes={(nodes) => {
            limbsRef.current = nodes;
          }}
        />
      </React.Suspense>
    </group>
  );
}

// Preload the hero character asset
useGLTF.preload('/models/characters/player/hero_player.glb');
