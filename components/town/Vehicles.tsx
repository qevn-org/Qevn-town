'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

export function Vehicles() {
  const carRef = useRef<THREE.Group>(null);
  const vanRef = useRef<THREE.Group>(null);
  const botRef = useRef<THREE.Group>(null);

  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const weather = useTownStore((s) => s.weather);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight =
    (timeOfDay === 'night' || timeOfDay === 'dusk' || weather === 'rain') && !isBlackout;

  const carProgress = useRef(0);
  const vanProgress = useRef(0.4);
  const botProgress = useRef(0);

  useFrame((_, delta) => {
    // 1. Compact car circuit
    if (carRef.current) {
      carProgress.current = (carProgress.current + delta * 0.12) % 1;
      const t = carProgress.current;

      let x = 0;
      let z = 0;
      let rotY = 0;

      if (t < 0.35) {
        // West to East along Innovation / -6
        const segT = t / 0.35;
        x = -28 + segT * 56;
        z = -6;
        rotY = Math.PI / 2;
      } else if (t < 0.5) {
        // South along x=28
        const segT = (t - 0.35) / 0.15;
        x = 28;
        z = -6 + segT * 20;
        rotY = Math.PI;
      } else if (t < 0.85) {
        // East to West along Market / 14
        const segT = (t - 0.5) / 0.35;
        x = 28 - segT * 56;
        z = 14;
        rotY = -Math.PI / 2;
      } else {
        // North along x=-28
        const segT = (t - 0.85) / 0.15;
        x = -28;
        z = 14 - segT * 20;
        rotY = 0;
      }

      carRef.current.position.set(x, 0.15, z);
      carRef.current.rotation.y = rotY;
    }

    // 2. QEVN Service & Delivery Van circuit (Automation to Commercial)
    if (vanRef.current) {
      vanProgress.current = (vanProgress.current + delta * 0.08) % 1;
      const vt = vanProgress.current;

      let vx = 0;
      let vz = 0;
      let vrotY = 0;

      if (vt < 0.5) {
        const segT = vt / 0.5;
        vx = -24 + segT * 48;
        vz = 14;
        vrotY = Math.PI / 2;
      } else {
        const segT = (vt - 0.5) / 0.5;
        vx = 24 - segT * 48;
        vz = 14;
        vrotY = -Math.PI / 2;
      }

      vanRef.current.position.set(vx, 0.2, vz);
      vanRef.current.rotation.y = vrotY;
    }

    // 3. Autonomous Delivery Bot patrol around plaza
    if (botRef.current) {
      botProgress.current = (botProgress.current + delta * 0.22) % (Math.PI * 2);
      const angle = botProgress.current;
      const radius = 11.5;
      const bx = Math.cos(angle) * radius;
      const bz = Math.sin(angle) * radius;

      botRef.current.position.set(bx, 0.1, bz);
      botRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group>
      {/* ================= 1. CYBER COMPACT CAR ================= */}
      <group ref={carRef}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.7, 0.45, 3.4]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.72, -0.2]} castShadow>
          <boxGeometry args={[1.4, 0.45, 1.8]} />
          <meshStandardMaterial color="#B7FF00" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.7, 0.75]} rotation={[-0.4, 0, 0]}>
          <planeGeometry args={[1.3, 0.4]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        {[-0.9, 0.9].map((wx, i) =>
          [-1.0, 1.0].map((wz, j) => (
            <mesh key={`cw-${i}-${j}`} position={[wx, 0.22, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.2, 12]} />
              <meshStandardMaterial color="#262626" />
            </mesh>
          ))
        )}
        {/* Headlights */}
        <mesh position={[-0.55, 0.38, 1.72]}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
          <meshBasicMaterial color={isNight ? '#FFFBEB' : '#E2E8F0'} />
        </mesh>
        <mesh position={[0.55, 0.38, 1.72]}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
          <meshBasicMaterial color={isNight ? '#FFFBEB' : '#E2E8F0'} />
        </mesh>
        {isNight && (
          <pointLight position={[0, 0.4, 2.5]} color="#FFFBEB" intensity={1.6} distance={8} />
        )}
        {/* Taillights */}
        <mesh position={[-0.55, 0.38, -1.72]}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
          <meshBasicMaterial color="#FF3333" />
        </mesh>
        <mesh position={[0.55, 0.38, -1.72]}>
          <boxGeometry args={[0.3, 0.15, 0.05]} />
          <meshBasicMaterial color="#FF3333" />
        </mesh>
      </group>

      {/* ================= 2. QEVN DELIVERY VAN ================= */}
      <group ref={vanRef}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[2.0, 1.2, 4.4]} />
          <meshStandardMaterial color="#F7F7F2" roughness={0.4} />
        </mesh>
        <lineSegments position={[0, 0.7, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.02, 1.22, 4.42)]} />
          <lineBasicMaterial color="#0A0A0A" />
        </lineSegments>
        {/* Side QEVN Stripe */}
        <mesh position={[1.02, 0.7, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.2, 0.25]} />
          <meshBasicMaterial color="#B7FF00" />
        </mesh>
        <mesh position={[-1.02, 0.7, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[3.2, 0.25]} />
          <meshBasicMaterial color="#B7FF00" />
        </mesh>
        {/* Wheels */}
        {[-1.05, 1.05].map((vx, i) =>
          [-1.4, 1.4].map((vz, j) => (
            <mesh key={`vw-${i}-${j}`} position={[vx, 0.3, vz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.22, 12]} />
              <meshStandardMaterial color="#1E1E1E" />
            </mesh>
          ))
        )}
      </group>

      {/* ================= 3. AUTONOMOUS QEVN DELIVERY BOT ================= */}
      <group ref={botRef}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.8, 0.5, 1.1]} />
          <meshStandardMaterial color="#FFD400" roughness={0.4} />
        </mesh>
        <lineSegments position={[0, 0.3, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(0.82, 0.52, 1.12)]} />
          <lineBasicMaterial color="#0A0A0A" />
        </lineSegments>
        {[-0.44, 0.44].map((bx, i) =>
          [-0.35, 0.35].map((bz, j) => (
            <mesh key={`bw-${i}-${j}`} position={[bx, 0.12, bz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.12, 0.1, 8]} />
              <meshStandardMaterial color="#0A0A0A" />
            </mesh>
          ))
        )}
        <mesh position={[0, 0.75, -0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 0.98, -0.3]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshBasicMaterial color={isBlackout ? '#111111' : '#B7FF00'} />
        </mesh>
      </group>
    </group>
  );
}
