'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { PBR_MATERIALS } from '@/lib/materials';
import { DigitalBillboard } from './Architectural/ArchitecturalProps';

function ModernStreetLamp({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);
  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  const lightColor = isNight ? '#FEF08A' : isDusk ? '#FDBA74' : '#FFFFFF';
  const lightIntensity = isBlackout ? 0 : isNight ? 1.4 : isDusk ? 0.6 : 0;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Sleek matte black vertical pole */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 5.6, 12]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Base decorative ring */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.4, 12]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      {/* Horizontal cantilever arm */}
      <mesh position={[0.7, 5.4, 0]} rotation={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[1.5, 0.08, 0.08]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Sleek LED luminaire head */}
      <mesh position={[1.4, 5.34, 0]} castShadow>
        <boxGeometry args={[0.45, 0.06, 0.22]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      {/* Glowing LED lens */}
      <mesh position={[1.4, 5.3, 0]}>
        <planeGeometry args={[0.4, 0.18]} />
        <meshStandardMaterial
          color={lightColor}
          emissive={lightColor}
          emissiveIntensity={lightIntensity}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Downward cone pointlight at night */}
      {lightIntensity > 0 && (
        <pointLight
          position={[1.4, 5.1, 0]}
          color={lightColor}
          intensity={lightIntensity * 2.2}
          distance={12}
        />
      )}
    </group>
  );
}

function StreetSign({
  position,
  rotation = 0,
  name,
}: {
  position: [number, number, number];
  rotation?: number;
  name: string;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 3.6, 10]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 3.3, 0]} castShadow>
        <boxGeometry args={[2.8, 0.45, 0.08]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <lineSegments position={[0, 3.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.82, 0.47, 0.1)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>
      <Text
        position={[0, 3.3, 0.06]}
        fontSize={0.2}
        color="#B7FF00"
        anchorX="center"
        anchorY="middle"
        fontWeight={900}
        letterSpacing={0.08}
      >
        {name}
      </Text>
    </group>
  );
}

export function RoadsAndPlaza() {
  const kineticSculptureRef = useRef<THREE.Group>(null);
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  useFrame((_, delta) => {
    if (kineticSculptureRef.current) {
      kineticSculptureRef.current.rotation.y += delta * 0.45;
      kineticSculptureRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group>
      {/* ================= 1. CENTRAL PLAZA (ARCHITECTURAL PAVING) ================= */}
      {/* Main honed travertine plaza slab */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[28, 0.08, 28]} />
        <primitive object={PBR_MATERIALS.STONE_TRAVERTINE} attach="material" />
      </mesh>

      {/* Dark Basalt Expansion Joint Grid */}
      {[-10, -5, 0, 5, 10].map((x, i) => (
        <mesh key={`grid-x-${i}`} position={[x, 0.082, 0]}>
          <boxGeometry args={[0.06, 0.005, 28]} />
          <meshStandardMaterial color="#1C1917" roughness={0.8} />
        </mesh>
      ))}
      {[-10, -5, 0, 5, 10].map((z, j) => (
        <mesh key={`grid-z-${j}`} position={[0, 0.082, z]}>
          <boxGeometry args={[28, 0.005, 0.06]} />
          <meshStandardMaterial color="#1C1917" roughness={0.8} />
        </mesh>
      ))}

      {/* In-Ground Warm Linear Uplights along Plaza Axis */}
      {[-8, -4, 4, 8].map((lx, idx) => (
        <mesh key={`uplight-${idx}`} position={[lx, 0.085, 0]}>
          <boxGeometry args={[1.2, 0.01, 0.12]} />
          <meshStandardMaterial
            color="#FEF08A"
            emissive="#FEF08A"
            emissiveIntensity={isNight ? 1.0 : isDusk ? 0.4 : 0.0}
          />
        </mesh>
      ))}

      {/* ================= 2. MONUMENTAL SCULPTURE & ARCHITECTURAL PLINTH ================= */}
      <group position={[0, 0.08, 0]}>
        {/* Tier 1: Honed White Terrazzo Stepped Base */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.6, 0.5, 5.6]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>
        {/* Tier 2: Black Granite Riser */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.0, 0.45, 4.0]} />
          <meshStandardMaterial color="#1C1917" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Tier 3: Glowing Lime Glass Reveal Ring */}
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.2, 0.4, 24]} />
          <meshStandardMaterial
            color="#B7FF00"
            roughness={0.2}
            emissive="#B7FF00"
            emissiveIntensity={0.65}
          />
        </mesh>

        {/* Floating Kinetic Titanium Geometric Sculpture */}
        <group ref={kineticSculptureRef} position={[0, 2.5, 0]}>
          <mesh castShadow>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.9} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.OctahedronGeometry(1.22, 0)]} />
            <lineBasicMaterial color="#B7FF00" />
          </lineSegments>
        </group>

        {/* Core Manifesto 3D Typography */}
        <group position={[0, 0.7, 2.05]}>
          <Text
            fontSize={0.24}
            color="#B7FF00"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            BUILDING DIGITAL THINGS.
          </Text>
        </group>
        <group position={[0, 0.7, -2.05]} rotation={[0, Math.PI, 0]}>
          <Text
            fontSize={0.24}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            QEVN // DIGITAL CITY
          </Text>
        </group>
      </group>

      {/* ================= 3. PLAZA SEATING ISLANDS WITH JAPANESE MAPLE TREES ================= */}
      {/* South-West Island */}
      <group position={[-7.5, 0.08, 6.5]}>
        {/* Cantilevered concrete bench ring */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.4, 0.6, 24]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>
        {/* Teak wood bench seat slat ring */}
        <mesh position={[0, 0.62, 0]} receiveShadow>
          <cylinderGeometry args={[2.3, 2.3, 0.06, 24]} />
          <meshStandardMaterial color="#9A5B2D" roughness={0.6} />
        </mesh>
        {/* Soil core */}
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.04, 16]} />
          <meshStandardMaterial color="#2B1D15" roughness={0.9} />
        </mesh>
        {/* Japanese Maple Tree with scarlet foliage */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.8, 8]} />
          <meshStandardMaterial color="#422006" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <sphereGeometry args={[1.1, 12, 12]} />
          <primitive object={PBR_MATERIALS.FOLIAGE_JAPANESE_MAPLE} attach="material" />
        </mesh>
      </group>

      {/* South-East Island */}
      <group position={[7.5, 0.08, 6.5]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.2, 2.4, 0.6, 24]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.62, 0]} receiveShadow>
          <cylinderGeometry args={[2.3, 2.3, 0.06, 24]} />
          <meshStandardMaterial color="#9A5B2D" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.04, 16]} />
          <meshStandardMaterial color="#2B1D15" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.8, 8]} />
          <meshStandardMaterial color="#422006" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <sphereGeometry args={[1.1, 12, 12]} />
          <primitive object={PBR_MATERIALS.FOLIAGE_JAPANESE_MAPLE} attach="material" />
        </mesh>
      </group>

      {/* Interactive Civic Directory Kiosk in Plaza */}
      <group position={[5.2, 0, -3.5]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.5]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.4, 0.27]}>
          <planeGeometry args={[1.0, 1.4]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#FFD400"
            emissiveIntensity={0.65}
          />
        </mesh>
        <Text
          position={[0, 1.8, 0.29]}
          fontSize={0.14}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          CIVIC DIRECTORY
        </Text>
        <Text
          position={[0, 1.3, 0.29]}
          fontSize={0.1}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.9}
          textAlign="center"
          fontWeight={700}
        >
          PRESS [E] FOR DISTRICT MAP
        </Text>
      </group>

      {/* Digital Civic Billboard on North-West Plaza Perimeter */}
      <DigitalBillboard position={[-10.5, 0, -11]} rotation={Math.PI / 4} />

      {/* ================= 4. PREMIUM STREET NETWORK (INNOVATION AVENUE) ================= */}
      {/* Deep aggregate asphalt road bodies */}
      {/* 1. Main Boulevard (North-South) */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[9.5, 0.04, 70]} />
        <meshStandardMaterial color="#1E293B" roughness={0.92} />
      </mesh>

      {/* 2. Innovation Avenue (East-West North in front of HQ) */}
      <mesh position={[0, 0.02, -6]} receiveShadow>
        <boxGeometry args={[70, 0.04, 8.5]} />
        <meshStandardMaterial color="#1E293B" roughness={0.92} />
      </mesh>

      {/* Granite Curbs along Innovation Avenue */}
      <mesh position={[0, 0.07, -10.3]} receiveShadow>
        <boxGeometry args={[70, 0.1, 0.25]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.07, -1.7]} receiveShadow>
        <boxGeometry args={[70, 0.1, 0.25]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.8} />
      </mesh>

      {/* 3. Market Street (East-West South) */}
      <mesh position={[0, 0.02, 14]} receiveShadow>
        <boxGeometry args={[70, 0.04, 8.5]} />
        <meshStandardMaterial color="#1E293B" roughness={0.92} />
      </mesh>

      {/* ================= 5. CRISP THERMOPLASTIC ZEBRA STRIPING & ADA TACTILE PAVING ================= */}
      {/* Inspired directly by Reference Image 2 ("CASA AA" corner crosswalks & arrows) */}
      {/* Crosswalk A: Innovation Avenue & HQ Entrance */}
      <group position={[0, 0.05, -13.2]}>
        {[-3.6, -2.6, -1.6, -0.6, 0.6, 1.6, 2.6, 3.6].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.55, 0.015, 2.6]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
          </mesh>
        ))}
        {/* Yellow ADA tactile warning pad at curb cut */}
        <mesh position={[0, 0.018, 1.5]}>
          <boxGeometry args={[8.0, 0.015, 0.4]} />
          <meshStandardMaterial color="#EAB308" roughness={0.6} />
        </mesh>
      </group>

      {/* Directional Asphalt Painted Road Arrow (Reference Image 2) */}
      <group position={[-2.2, 0.045, -8.5]}>
        <mesh>
          <boxGeometry args={[0.2, 0.01, 1.4]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.35, 0.6, 3]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      </group>

      {/* Dashed Lane Dividers */}
      {[-30, -24, -18, 18, 24, 30].map((x, i) => (
        <mesh key={`dash-inno-${i}`} position={[x, 0.045, -6]}>
          <boxGeometry args={[2.6, 0.015, 0.25]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
        </mesh>
      ))}

      {/* ================= 6. MODERN STREET LIGHTING ================= */}
      <ModernStreetLamp position={[-12, 0, -10.5]} rotation={0} />
      <ModernStreetLamp position={[12, 0, -10.5]} rotation={0} />
      <ModernStreetLamp position={[-12, 0, -1.5]} rotation={Math.PI} />
      <ModernStreetLamp position={[12, 0, -1.5]} rotation={Math.PI} />

      {/* Street Signposts */}
      <StreetSign position={[-5, 0, -11]} rotation={0} name="MAIN ST" />
      <StreetSign position={[-11, 0, -9]} rotation={Math.PI / 2} name="INNOVATION AVE" />
      <StreetSign position={[11, 0, -9]} rotation={-Math.PI / 2} name="MARKET ST" />
      <StreetSign position={[5, 0, 22]} rotation={0} name="TRANSIT BLVD" />
    </group>
  );
}
