'use client';

import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

interface StreetLampProps {
  position: [number, number, number];
  rotation?: number;
}

function StreetLamp({ position, rotation = 0 }: StreetLampProps) {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const weather = useTownStore((s) => s.weather);
  const isBlackout = useTownStore((s) => s.isBlackout);
  const isNight =
    (timeOfDay === 'night' || timeOfDay === 'dusk' || weather === 'rain') && !isBlackout;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Heavy Base */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.6, 0.8, 0.6]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      {/* Mast */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3.4, 0.2]} />
        <meshStandardMaterial color="#1E1E1E" />
      </mesh>
      {/* Overhang Arm */}
      <mesh position={[0.6, 4.1, 0]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#1E1E1E" />
      </mesh>
      {/* Lamp Head */}
      <mesh position={[1.1, 3.9, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.4]} />
        <meshStandardMaterial
          color={isNight ? '#FFFBEB' : '#64748B'}
          emissive={isNight ? '#FDE047' : '#000000'}
          emissiveIntensity={isNight ? 1.5 : 0}
        />
      </mesh>
      {isNight && (
        <pointLight position={[1.1, 3.7, 0]} color="#FEF08A" intensity={1.8} distance={10} />
      )}
    </group>
  );
}

interface StylizedTreeProps {
  position: [number, number, number];
  scale?: number;
  type?: 'cone' | 'cube' | 'broadleaf' | 'tall';
}

function StylizedTree({ position, scale = 1, type = 'cube' }: StylizedTreeProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.28, 1.8, 6]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} />
      </mesh>

      {/* Foliage Variations */}
      {type === 'cube' && (
        <group position={[0, 2.6, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.2, 2.2, 2.2]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.8} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(2.22, 2.22, 2.22)]} />
            <lineBasicMaterial color="#1B5E20" />
          </lineSegments>
        </group>
      )}

      {type === 'cone' && (
        <group position={[0, 2.5, 0]}>
          <mesh position={[0, -0.4, 0]} castShadow>
            <coneGeometry args={[1.6, 2.2, 6]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.8, 0]} castShadow>
            <coneGeometry args={[1.2, 1.8, 6]} />
            <meshStandardMaterial color="#388E3C" roughness={0.8} />
          </mesh>
        </group>
      )}

      {type === 'broadleaf' && (
        <group position={[0, 2.6, 0]}>
          <mesh castShadow>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#33691E" roughness={0.7} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.DodecahedronGeometry(1.52, 0)]} />
            <lineBasicMaterial color="#1B5E20" />
          </lineSegments>
        </group>
      )}

      {type === 'tall' && (
        <group position={[0, 3.2, 0]}>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.7, 1.1, 3.2, 6]} />
            <meshStandardMaterial color="#1B5E20" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <coneGeometry args={[0.8, 1.5, 6]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function ModernBench({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Concrete base legs */}
      <mesh position={[-0.9, 0.25, 0]} castShadow>
        <boxGeometry args={[0.25, 0.5, 0.6]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[0.9, 0.25, 0]} castShadow>
        <boxGeometry args={[0.25, 0.5, 0.6]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      {/* Lime bench slab */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2.2, 0.12, 0.7]} />
        <meshStandardMaterial color="#B7FF00" roughness={0.4} />
      </mesh>
    </group>
  );
}

function PlanterShrub({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.2, 0.7, 1.2]} />
        <meshStandardMaterial color="#18181B" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[1.0, 0.55, 1.0]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.9} />
      </mesh>
    </group>
  );
}

function TrashReceptacle({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.9, 8]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.22, 8, 8]} />
        <meshStandardMaterial color="#FFD400" />
      </mesh>
    </group>
  );
}

export function StreetProps() {
  return (
    <group>
      {/* ================= STREET LAMPS ================= */}
      {/* Central Plaza Lamps */}
      <StreetLamp position={[-8, 0, -8]} rotation={Math.PI / 4} />
      <StreetLamp position={[8, 0, -8]} rotation={-Math.PI / 4} />
      <StreetLamp position={[-8, 0, 8]} rotation={(3 * Math.PI) / 4} />
      <StreetLamp position={[8, 0, 8]} rotation={-(3 * Math.PI) / 4} />

      {/* Innovation Avenue Lamps */}
      <StreetLamp position={[-20, 0, -10]} rotation={Math.PI / 2} />
      <StreetLamp position={[-30, 0, -10]} rotation={Math.PI / 2} />
      <StreetLamp position={[-20, 0, 10]} rotation={Math.PI / 2} />

      {/* Market Street Lamps */}
      <StreetLamp position={[20, 0, -10]} rotation={-Math.PI / 2} />
      <StreetLamp position={[30, 0, -10]} rotation={-Math.PI / 2} />
      <StreetLamp position={[20, 0, 10]} rotation={-Math.PI / 2} />

      {/* Main Street South Lamps */}
      <StreetLamp position={[-6, 0, 20]} rotation={Math.PI / 2} />
      <StreetLamp position={[6, 0, 20]} rotation={-Math.PI / 2} />
      <StreetLamp position={[-6, 0, 28]} rotation={Math.PI / 2} />
      <StreetLamp position={[6, 0, 28]} rotation={-Math.PI / 2} />

      {/* ================= VEGETATION ================= */}
      {/* Plaza perimeter trees */}
      <StylizedTree position={[-12, 0, 4]} type="broadleaf" scale={1.2} />
      <StylizedTree position={[12, 0, 4]} type="cube" scale={1.1} />
      <StylizedTree position={[-12, 0, -14]} type="cone" scale={1.3} />
      <StylizedTree position={[12, 0, -14]} type="tall" scale={1.2} />

      {/* Campus perimeter trees */}
      <StylizedTree position={[-32, 0, -4]} type="broadleaf" scale={1.1} />
      <StylizedTree position={[-32, 0, 16]} type="tall" scale={1.3} />
      <StylizedTree position={[-22, 0, -20]} type="cone" scale={1.2} />

      {/* Commercial Sector trees */}
      <StylizedTree position={[32, 0, -4]} type="cube" scale={1.1} />
      <StylizedTree position={[32, 0, 14]} type="broadleaf" scale={1.2} />
      <StylizedTree position={[18, 0, 28]} type="cone" scale={1.0} />

      {/* Transit Boulevard trees */}
      <StylizedTree position={[-14, 0, 30]} type="tall" scale={1.2} />
      <StylizedTree position={[14, 0, 30]} type="broadleaf" scale={1.1} />

      {/* ================= BENCHES & RECEPTACLES ================= */}
      <ModernBench position={[-6, 0, 0]} rotation={Math.PI / 2} />
      <ModernBench position={[6, 0, 0]} rotation={-Math.PI / 2} />
      <ModernBench position={[0, 0, -6]} rotation={0} />
      <ModernBench position={[-4, 0, 18]} rotation={0} />
      <ModernBench position={[4, 0, 18]} rotation={0} />

      {/* Planter Shrubs in Plaza */}
      <PlanterShrub position={[-5, 0, 5]} />
      <PlanterShrub position={[5, 0, 5]} />
      <PlanterShrub position={[-5, 0, -5]} />
      <PlanterShrub position={[5, 0, -5]} />

      {/* Trash Receptacles */}
      <TrashReceptacle position={[-7, 0, -4]} />
      <TrashReceptacle position={[7, 0, -4]} />
      <TrashReceptacle position={[-7, 0, 16]} />
      <TrashReceptacle position={[7, 0, 16]} />
    </group>
  );
}
