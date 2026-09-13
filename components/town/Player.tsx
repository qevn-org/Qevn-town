'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';
import { TOWN_LOCATIONS, TownLocation } from '@/data/locations';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';

export function Player() {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

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
      // Don't capture when typing in inputs
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      keys.current[e.code] = true;

      // Handle direct 'E' interaction
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

  // Handle mobile interact trigger
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

    // Secret 1: Breaker Switch
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

    // Secret 2: Data Center vent detection
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
      activeLoc.id === 'patch-pharmacy' ||
      activeLoc.id === 'ctrl-cowork' ||
      activeLoc.id === 'automation-factory'
    ) {
      openOverlay('commercial-study', activeLoc.id);
    }
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Check teleport
    if (fastTravelTarget) {
      groupRef.current.position.set(
        fastTravelTarget[0],
        0.08,
        fastTravelTarget[2] !== undefined ? fastTravelTarget[2] : fastTravelTarget[1]
      );
      clearTeleport();
      return;
    }

    // Don't process movement if modal overlay is open
    if (activeOverlay !== 'none') {
      return;
    }

    // Read keys
    let moveX = 0;
    let moveZ = 0;

    if (keys.current['KeyW'] || keys.current['ArrowUp']) moveZ -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) moveZ += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) moveX -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) moveX += 1;

    // Mobile joystick input
    const joystick = useTownStore.getState().joystickVector;
    if (joystick.x !== 0 || joystick.y !== 0) {
      moveX = joystick.x;
      moveZ = -joystick.y;
    }

    const isMoving = moveX !== 0 || moveZ !== 0;
    const isSprint = keys.current['ShiftLeft'] || keys.current['ShiftRight'];
    const speed = (isSprint ? 11.5 : 7.0) * delta;

    if (isMoving) {
      benchIdleTimer.current = 0;
      const len = Math.hypot(moveX, moveZ);
      const dirX = (moveX / len) * speed;
      const dirZ = (moveZ / len) * speed;

      // Expanded boundary limits to cover new campus and station
      const nextX = THREE.MathUtils.clamp(groupRef.current.position.x + dirX, -45, 45);
      const nextZ = THREE.MathUtils.clamp(groupRef.current.position.z + dirZ, -40, 42);

      groupRef.current.position.x = nextX;
      groupRef.current.position.z = nextZ;

      const targetAngle = Math.atan2(moveX, moveZ);
      currentRotation.current = THREE.MathUtils.lerp(currentRotation.current, targetAngle, delta * 14);
      groupRef.current.rotation.y = currentRotation.current;

      walkCycle.current += delta * (isSprint ? 17 : 11);
      const legSwing = Math.sin(walkCycle.current) * 0.55;

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = legSwing;
        rightLegRef.current.rotation.x = -legSwing;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -legSwing * 0.8;
        rightArmRef.current.rotation.x = legSwing * 0.8;
      }

      groupRef.current.position.y = 0.08 + Math.abs(Math.sin(walkCycle.current)) * 0.08;

      footstepTimer.current += delta;
      const stepInterval = isSprint ? 0.21 : 0.31;
      if (footstepTimer.current > stepInterval) {
        footstepTimer.current = 0;
        soundManager.playFootstep(soundEnabled);
      }
    } else {
      // Idle pose
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = 0;
        rightLegRef.current.rotation.x = 0;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = 0;
        rightArmRef.current.rotation.x = 0;
      }
      groupRef.current.position.y = 0.08;

      // Secret 4: Standing/resting near Plaza bench for >5s unlocks Philosopher's Bench
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

    // Proximity check against all TOWN_LOCATIONS
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
    <group ref={groupRef} position={[0, 0.08, 8]}>
      {/* Torso */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.62, 0.68, 0.38]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.5} />
      </mesh>
      <lineSegments position={[0, 0.72, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(0.64, 0.7, 0.4)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>

      {/* Head */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial color="#FCD34D" roughness={0.6} />
      </mesh>

      {/* Brutalist Cap with Visor */}
      <mesh position={[0, 1.48, 0]} castShadow>
        <boxGeometry args={[0.42, 0.12, 0.42]} />
        <meshStandardMaterial color="#B7FF00" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.44, 0.26]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.22]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.3} />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.42, 0.7, 0]} castShadow>
        <boxGeometry args={[0.16, 0.58, 0.18]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.42, 0.7, 0]} castShadow>
        <boxGeometry args={[0.16, 0.58, 0.18]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>

      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.18, 0.22, 0]} castShadow>
        <boxGeometry args={[0.2, 0.44, 0.22]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.18, 0.22, 0]} castShadow>
        <boxGeometry args={[0.2, 0.44, 0.22]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>

      {/* Drop Shadow Disc on Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshBasicMaterial color="#000000" opacity={0.35} transparent />
      </mesh>
    </group>
  );
}
