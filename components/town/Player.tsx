'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';
import { TOWN_LOCATIONS, TownLocation } from '@/data/locations';
import { soundManager } from '@/lib/audio';
import { trackEvent } from '@/lib/analytics';

/**
 * Stylized Hero Player Character
 * Designed according to character visual reference (animated film style):
 * Expressive face, swept-back textured brown hair, plaid flannel over white tee,
 * slim dark denim jeans, brown skate sneakers with white soles, and sculpted hands.
 */
export function Player() {
  const groupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

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

      // Stylized walking kinematics
      walkCycle.current += delta * (isSprint ? 16 : 10.5);
      const legSwing = Math.sin(walkCycle.current) * 0.65;
      const armSwing = Math.sin(walkCycle.current) * 0.6;
      const hipBob = Math.abs(Math.sin(walkCycle.current)) * 0.08;

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = legSwing;
        rightLegRef.current.rotation.x = -legSwing;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -armSwing;
        rightArmRef.current.rotation.x = armSwing;
      }
      if (torsoRef.current) {
        torsoRef.current.rotation.y = Math.sin(walkCycle.current) * 0.1;
      }

      groupRef.current.position.y = 0.04 + hipBob;

      footstepTimer.current += delta;
      const stepInterval = isSprint ? 0.22 : 0.32;
      if (footstepTimer.current > stepInterval) {
        footstepTimer.current = 0;
        soundManager.playFootstep(soundEnabled);
      }
    } else {
      // Gentle idle breathing sway
      const idleTime = Date.now() * 0.002;
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = 0;
        rightLegRef.current.rotation.x = 0;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(idleTime) * 0.04;
        rightArmRef.current.rotation.x = -Math.sin(idleTime) * 0.04;
      }
      if (headGroupRef.current) {
        headGroupRef.current.position.y = 1.35 + Math.sin(idleTime * 1.5) * 0.015;
      }
      if (torsoRef.current) {
        torsoRef.current.rotation.y = 0;
      }
      groupRef.current.position.y = 0.04;

      // Secret 4: Bench idle
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
      {/* ================= 1. LEGS & SNEAKERS ================= */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.14, 0.44, 0]}>
        {/* Dark indigo denim jean leg */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.065, 0.48, 12]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>
        {/* Brown skate sneaker with white cupsole (Reference Image 0) */}
        <group position={[0, -0.42, 0.04]}>
          {/* White rubber sole */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.15, 0.04, 0.28]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
          </mesh>
          {/* Brown leather sneaker upper */}
          <mesh position={[0, 0.07, 0]} castShadow>
            <boxGeometry args={[0.14, 0.07, 0.26]} />
            <meshStandardMaterial color="#78350F" roughness={0.6} />
          </mesh>
          {/* Sneaker toe cap & laces */}
          <mesh position={[0, 0.08, 0.08]}>
            <boxGeometry args={[0.12, 0.03, 0.08]} />
            <meshStandardMaterial color="#B45309" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.14, 0.44, 0]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.065, 0.48, 12]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>
        <group position={[0, -0.42, 0.04]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.15, 0.04, 0.28]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.07, 0]} castShadow>
            <boxGeometry args={[0.14, 0.07, 0.26]} />
            <meshStandardMaterial color="#78350F" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.08, 0.08]}>
            <boxGeometry args={[0.12, 0.03, 0.08]} />
            <meshStandardMaterial color="#B45309" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ================= 2. TORSO & CLOTHING ================= */}
      <group ref={torsoRef} position={[0, 0.76, 0]}>
        {/* White crewneck t-shirt interior base */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.38, 0.54, 0.22]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.7} />
        </mesh>
        {/* Red & Forest Green Plaid Flannel Overshirt (Matching Reference Image 0) */}
        {/* Left shirt flap */}
        <mesh position={[-0.14, -0.02, 0.02]} castShadow>
          <boxGeometry args={[0.14, 0.56, 0.22]} />
          <meshStandardMaterial color="#B91C1C" roughness={0.7} />
        </mesh>
        {/* Right shirt flap with chest pocket */}
        <mesh position={[0.14, -0.02, 0.02]} castShadow>
          <boxGeometry args={[0.14, 0.56, 0.22]} />
          <meshStandardMaterial color="#B91C1C" roughness={0.7} />
        </mesh>
        {/* Back of flannel */}
        <mesh position={[0, -0.02, -0.02]} castShadow>
          <boxGeometry args={[0.4, 0.56, 0.2]} />
          <meshStandardMaterial color="#14532D" roughness={0.7} />
        </mesh>
        {/* Folded shirt collar */}
        <mesh position={[0, 0.28, 0.03]}>
          <boxGeometry args={[0.32, 0.06, 0.18]} />
          <meshStandardMaterial color="#991B1B" roughness={0.7} />
        </mesh>

        {/* Slender Sculpted Arms with Rolled Cuffs */}
        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.26, 0.22, 0]}>
          {/* Plaid sleeve */}
          <mesh position={[0, -0.16, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.055, 0.32, 10]} />
            <meshStandardMaterial color="#B91C1C" roughness={0.7} />
          </mesh>
          {/* Exposed forearm (soft skin tone) */}
          <mesh position={[0, -0.34, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.18, 10]} />
            <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
          </mesh>
          {/* Sculpted hand with thumb */}
          <group position={[0, -0.46, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.065, 0.1, 0.035]} />
              <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
            </mesh>
            {/* Thumb */}
            <mesh position={[0.035, 0.02, 0.01]}>
              <boxGeometry args={[0.025, 0.04, 0.025]} />
              <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
            </mesh>
          </group>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.26, 0.22, 0]}>
          <mesh position={[0, -0.16, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.055, 0.32, 10]} />
            <meshStandardMaterial color="#B91C1C" roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.34, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.18, 10]} />
            <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
          </mesh>
          <group position={[0, -0.46, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.065, 0.1, 0.035]} />
              <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
            </mesh>
            <mesh position={[-0.035, 0.02, 0.01]}>
              <boxGeometry args={[0.025, 0.04, 0.025]} />
              <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ================= 3. STYLIZED HEAD & EXPRESSIVE FACE ================= */}
      {/* Inspired directly by Reference Image 0 (Cute animated 3D character) */}
      <group ref={headGroupRef} position={[0, 1.34, 0]}>
        {/* Slender neck */}
        <mesh position={[0, -0.14, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.065, 0.16, 10]} />
          <meshStandardMaterial color="#F8C8BA" roughness={0.65} />
        </mesh>

        {/* Sculpted stylized head with soft chin */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color="#F8C8BA" roughness={0.6} />
        </mesh>

        {/* Big expressive animated eyes (Green irises like Reference Image 0) */}
        {/* Left Eye */}
        <group position={[-0.08, 0.08, 0.18]}>
          {/* White sclera */}
          <mesh>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>
          {/* Vibrant green iris */}
          <mesh position={[0, 0, 0.026]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.01, 16]} />
            <meshStandardMaterial color="#10B981" roughness={0.2} />
          </mesh>
          {/* Black pupil */}
          <mesh position={[0, 0, 0.033]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.01, 12]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
          {/* Specular highlight glint */}
          <mesh position={[0.008, 0.008, 0.038]}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.08, 0.08, 0.18]}>
          <mesh>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.026]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.01, 16]} />
            <meshStandardMaterial color="#10B981" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.033]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.01, 12]} />
            <meshBasicMaterial color="#0A0A0A" />
          </mesh>
          <mesh position={[0.008, 0.008, 0.038]}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Cute button nose with slight warm blush */}
        <mesh position={[0, 0.04, 0.22]}>
          <sphereGeometry args={[0.028, 12, 12]} />
          <meshStandardMaterial color="#FB7185" roughness={0.7} />
        </mesh>

        {/* Friendly smile curve */}
        <mesh position={[0, -0.03, 0.2]} rotation={[0.1, 0, Math.PI]}>
          <cylinderGeometry args={[0.032, 0.032, 0.008, 12, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#881337" />
        </mesh>

        {/* Stylized Volumetric Swept Brown Hair (Reference Image 0) */}
        {/* Main hair cap */}
        <mesh position={[0, 0.14, -0.02]} castShadow>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshStandardMaterial color="#451A03" roughness={0.65} />
        </mesh>
        {/* Swept hair bangs front volume */}
        <group position={[0, 0.22, 0.1]}>
          <mesh position={[-0.07, 0, 0]} rotation={[0.2, -0.3, 0.4]} castShadow>
            <boxGeometry args={[0.14, 0.09, 0.16]} />
            <meshStandardMaterial color="#592008" roughness={0.65} />
          </mesh>
          <mesh position={[0.06, 0.02, 0]} rotation={[0.1, 0.3, -0.3]} castShadow>
            <boxGeometry args={[0.16, 0.1, 0.16]} />
            <meshStandardMaterial color="#451A03" roughness={0.65} />
          </mesh>
          <mesh position={[0, 0.05, -0.04]} castShadow>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#592008" roughness={0.65} />
          </mesh>
        </group>
      </group>

      {/* Subtle soft contact shadow puddle under player */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#000000" opacity={0.32} transparent />
      </mesh>
    </group>
  );
}
