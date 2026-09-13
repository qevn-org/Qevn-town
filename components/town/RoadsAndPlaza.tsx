'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { DigitalBillboard } from './Architectural/ArchitecturalProps';

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
        <cylinderGeometry args={[0.06, 0.06, 3.6, 8]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <mesh position={[0, 3.3, 0]} castShadow>
        <boxGeometry args={[2.8, 0.45, 0.1]} />
        <meshStandardMaterial color="#0A0A0A" />
      </mesh>
      <lineSegments position={[0, 3.3, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.82, 0.47, 0.12)]} />
        <lineBasicMaterial color="#B7FF00" />
      </lineSegments>
      <Text
        position={[0, 3.3, 0.08]}
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

  useFrame((_, delta) => {
    if (kineticSculptureRef.current) {
      kineticSculptureRef.current.rotation.y += delta * 0.5;
      kineticSculptureRef.current.rotation.x += delta * 0.25;
    }
  });

  return (
    <group>
      {/* ================= CENTRAL PLAZA ================= */}
      {/* Main plaza concrete slab */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[28, 0.08, 28]} />
        <meshStandardMaterial color="#ECEAE2" roughness={0.75} />
      </mesh>
      <lineSegments position={[0, 0.09, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(28.04, 0.09, 28.04)]} />
        <lineBasicMaterial color="#0A0A0A" linewidth={2} />
      </lineSegments>

      {/* Monumental Plaza Sculpture & Plinth */}
      <group position={[0, 0.08, 0]}>
        {/* Tiered Brutalist Pedestal */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.8, 5.2]} />
          <meshStandardMaterial color="#18181B" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.6, 3.6]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.0, 1.1, 0.8, 8]} />
          <meshStandardMaterial
            color="#B7FF00"
            roughness={0.4}
            emissive="#B7FF00"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Floating Kinetic Brutalist Sculpture */}
        <group ref={kineticSculptureRef} position={[0, 3.0, 0]}>
          <mesh castShadow>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.OctahedronGeometry(1.22, 0)]} />
            <lineBasicMaterial color="#B7FF00" />
          </lineSegments>
        </group>

        {/* 3D Core Manifesto Wordmark on Pedestal Face */}
        <group position={[0, 0.4, 2.65]}>
          <Text
            fontSize={0.26}
            color="#B7FF00"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            BUILDING DIGITAL THINGS.
          </Text>
        </group>
        <group position={[0, 0.4, -2.65]} rotation={[0, Math.PI, 0]}>
          <Text
            fontSize={0.26}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            QEVN // CITY CORE
          </Text>
        </group>
      </group>

      {/* Interactive Civic Information Kiosk in Plaza */}
      <group position={[4.5, 0, -3]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.6]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[0, 1.4, 0.32]}>
          <planeGeometry args={[1.0, 1.4]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#FFD400"
            emissiveIntensity={0.6}
          />
        </mesh>
        <Text
          position={[0, 1.8, 0.34]}
          fontSize={0.14}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
        >
          INFO KIOSK
        </Text>
        <Text
          position={[0, 1.3, 0.34]}
          fontSize={0.1}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.9}
        >
          PRESS [E] FOR DISTRICT DIRECTORY
        </Text>
      </group>

      {/* Digital Civic Billboard on North-West Plaza Perimeter */}
      <DigitalBillboard position={[-10, 0, -11]} rotation={Math.PI / 4} />

      {/* ================= COMPREHENSIVE STREET NETWORK ================= */}
      {/* 1. Main Street (North-South: HQ to Central Station) */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[9, 0.04, 68]} />
        <meshStandardMaterial color="#222224" roughness={0.88} />
      </mesh>

      {/* 2. Innovation Avenue (East-West North: Campus to Commercial) */}
      <mesh position={[0, 0.02, -6]} receiveShadow>
        <boxGeometry args={[68, 0.04, 8]} />
        <meshStandardMaterial color="#222224" roughness={0.88} />
      </mesh>

      {/* 3. Market Street / Commercial Avenue (East-West South) */}
      <mesh position={[0, 0.02, 14]} receiveShadow>
        <boxGeometry args={[68, 0.04, 8]} />
        <meshStandardMaterial color="#222224" roughness={0.88} />
      </mesh>

      {/* 4. Transit Boulevard (Connecting South ring to Central Station) */}
      <mesh position={[0, 0.02, 26]} receiveShadow>
        <boxGeometry args={[48, 0.04, 8]} />
        <meshStandardMaterial color="#222224" roughness={0.88} />
      </mesh>

      {/* ================= DASHED LANE MARKINGS ================= */}
      {/* Main Street Dashes */}
      {[-24, -18, -12, -2, 4, 8, 18, 22, 28].map((z, i) => (
        <mesh key={`dash-main-${i}`} position={[0, 0.05, z]}>
          <boxGeometry args={[0.35, 0.02, 2.4]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
      ))}

      {/* Innovation Avenue Dashes */}
      {[-30, -24, -18, -12, 12, 18, 24, 30].map((x, i) => (
        <mesh key={`dash-inno-${i}`} position={[x, 0.05, -6]}>
          <boxGeometry args={[2.5, 0.02, 0.35]} />
          <meshStandardMaterial color="#FFD400" roughness={0.4} />
        </mesh>
      ))}

      {/* Market Street Dashes */}
      {[-30, -24, -18, -12, 12, 18, 24, 30].map((x, i) => (
        <mesh key={`dash-mkt-${i}`} position={[x, 0.05, 14]}>
          <boxGeometry args={[2.5, 0.02, 0.35]} />
          <meshStandardMaterial color="#FFD400" roughness={0.4} />
        </mesh>
      ))}

      {/* ================= ZEBRA CROSSWALKS ================= */}
      {/* Crosswalk near HQ entry */}
      <group position={[0, 0.05, -13]}>
        {[-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.5, 0.015, 2.4]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Crosswalk near Central Station */}
      <group position={[0, 0.05, 24]}>
        {[-3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.5, 0.015, 2.4]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Crosswalk West Boulevard (Innovation) */}
      <group position={[-12, 0.05, -6]}>
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((z, i) => (
          <mesh key={i} position={[0, 0, z]}>
            <boxGeometry args={[2.4, 0.015, 0.5]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Crosswalk East Boulevard (Market) */}
      <group position={[12, 0.05, -6]}>
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((z, i) => (
          <mesh key={i} position={[0, 0, z]}>
            <boxGeometry args={[2.4, 0.015, 0.5]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* ================= STREET NAME SIGNPOSTS ================= */}
      <StreetSign position={[-5, 0, -11]} rotation={0} name="MAIN ST" />
      <StreetSign position={[-11, 0, -9]} rotation={Math.PI / 2} name="INNOVATION AVE" />
      <StreetSign position={[11, 0, -9]} rotation={-Math.PI / 2} name="MARKET ST" />
      <StreetSign position={[-11, 0, 11]} rotation={Math.PI / 2} name="STARTUP LANE" />
      <StreetSign position={[5, 0, 22]} rotation={0} name="TRANSIT BLVD" />
    </group>
  );
}
