'use client';

import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useTownStore } from '@/lib/store';
import { HvacUnit } from '../Architectural/RoofEquipment';

export function CommercialBuildings() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const isNight = timeOfDay === 'night' && !isBlackout;
  const isDusk = timeOfDay === 'dusk' && !isBlackout;

  return (
    <group>
      {/* ================= 1. PIXEL COFFEE ================= */}
      <group position={[22, 0, 4]}>
        {/* Main Building */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.5, 5, 8.5]} />
          <meshStandardMaterial color="#2B1D15" roughness={0.7} />
        </mesh>
        <lineSegments position={[0, 2.5, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(8.54, 5.04, 8.54)]} />
          <lineBasicMaterial color="#FFD400" />
        </lineSegments>

        {/* Front Warm Glass Counter Window */}
        <mesh position={[0, 2.0, 4.3]}>
          <planeGeometry args={[6.8, 2.4]} />
          <meshStandardMaterial
            color="#3B2515"
            emissive={isBlackout ? '#000000' : '#FFD400'}
            emissiveIntensity={isNight ? 0.8 : isDusk ? 0.4 : 0.2}
            roughness={0.1}
          />
        </mesh>

        {/* Striped Modern Awning */}
        <group position={[0, 3.4, 4.8]} rotation={[0.3, 0, 0]}>
          {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.95, 0.08, 1.4]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#FFD400' : '#0A0A0A'} />
            </mesh>
          ))}
        </group>

        {/* Signage */}
        <group position={[0, 5.4, 4.3]}>
          <Text
            fontSize={0.9}
            color={isBlackout ? '#333333' : '#FFD400'}
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            PIXEL COFFEE
          </Text>
        </group>

        {/* Espresso Cup 3D Sign on roof */}
        <group position={[0, 5.8, 0]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.7, 0.5, 0.9, 16]} />
            <meshStandardMaterial color="#FFFBEB" />
          </mesh>
        </group>
      </group>

      {/* ================= 2. NULL HOTEL ================= */}
      <group position={[26, 0, -18]}>
        {/* Tall Tower Body */}
        <mesh position={[0, 6.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[11, 12, 10]} />
          <meshStandardMaterial color="#18181B" roughness={0.6} />
        </mesh>
        <lineSegments position={[0, 6.0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(11.04, 12.04, 10.04)]} />
          <lineBasicMaterial color="#B7FF00" />
        </lineSegments>

        {/* Modern Window Grid Bands */}
        {[2.5, 5.0, 7.5, 10.0].map((wy, idx) => (
          <mesh key={idx} position={[0, wy, 5.05]}>
            <planeGeometry args={[9.5, 1.4]} />
            <meshStandardMaterial
              color="#0F172A"
              emissive={isNight ? '#BAE6FD' : isDusk ? '#FDE68A' : '#0284C7'}
              emissiveIntensity={isNight ? 0.65 : 0.15}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Hotel Canopy & Entrance */}
        <group position={[0, 0, 5.2]}>
          <mesh position={[0, 1.4, 0.8]} castShadow>
            <boxGeometry args={[4.8, 0.12, 1.8]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
          <Text
            position={[0, 1.8, 1.4]}
            fontSize={0.32}
            color="#B7FF00"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
          >
            NULL HOTEL
          </Text>
        </group>

        {/* Rooftop Lounge Structure */}
        <group position={[0, 12.0, 0]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[7, 1.6, 6]} />
            <meshStandardMaterial color="#27272A" />
          </mesh>
          <HvacUnit position={[3.5, 0, -2]} scale={0.8} />
        </group>
      </group>

      {/* ================= 3. LOOP MARKET ================= */}
      <group position={[22, 0, 16]}>
        {/* Marketplace Shell */}
        <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[11, 6, 9]} />
          <meshStandardMaterial color="#1E293B" roughness={0.65} />
        </mesh>
        <lineSegments position={[0, 3.0, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(11.04, 6.04, 9.04)]} />
          <lineBasicMaterial color="#FF4444" />
        </lineSegments>

        {/* Front Storefront Windows */}
        <mesh position={[0, 2.2, 4.55]}>
          <planeGeometry args={[8.8, 3.0]} />
          <meshStandardMaterial
            color="#0A0F1D"
            emissive={isNight ? '#FDA4AF' : '#E11D48'}
            emissiveIntensity={isNight ? 0.6 : 0.15}
            roughness={0.1}
          />
        </mesh>

        {/* Signage */}
        <group position={[0, 5.2, 4.6]}>
          <Text
            fontSize={0.85}
            color={isBlackout ? '#333333' : '#FF4444'}
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            LOOP MARKET
          </Text>
        </group>

        {/* Entrance Portal */}
        <group position={[0, 0, 4.6]}>
          <mesh position={[0, 1.1, 0.1]}>
            <planeGeometry args={[2.0, 2.2]} />
            <meshBasicMaterial color={isBlackout ? '#111111' : '#FFFFFF'} />
          </mesh>
        </group>
      </group>

      {/* ================= 4. PATCH PHARMACY & CLINIC ================= */}
      <group position={[10, 0, 24]}>
        <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[9, 5.6, 8]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} />
        </mesh>
        <lineSegments position={[0, 2.8, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(9.04, 5.64, 8.04)]} />
          <lineBasicMaterial color="#3A7DFF" />
        </lineSegments>

        {/* Illuminated Medical Cross Emblem */}
        <group position={[0, 4.6, 4.05]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.45, 1.4, 0.1]} />
            <meshBasicMaterial color={isBlackout ? '#222222' : '#38BDF8'} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.4, 0.45, 0.1]} />
            <meshBasicMaterial color={isBlackout ? '#222222' : '#38BDF8'} />
          </mesh>
        </group>

        {/* Signage */}
        <group position={[0, 3.4, 4.05]}>
          <Text
            fontSize={0.45}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
          >
            PATCH CLINIC
          </Text>
        </group>
      </group>

      {/* ================= 5. CTRL COWORK ================= */}
      <group position={[-10, 0, 24]}>
        <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[9, 6.4, 8]} />
          <meshStandardMaterial color="#18181B" roughness={0.6} />
        </mesh>
        <lineSegments position={[0, 3.2, 0]}>
          <edgesGeometry args={[new THREE.BoxGeometry(9.04, 6.44, 8.04)]} />
          <lineBasicMaterial color="#B7FF00" />
        </lineSegments>

        {/* Front Window with Cowork Silhouettes */}
        <mesh position={[0, 3.2, 4.05]}>
          <planeGeometry args={[7.2, 4.5]} />
          <meshStandardMaterial
            color="#09090B"
            emissive={isNight ? '#38BDF8' : '#0284C7'}
            emissiveIntensity={isNight ? 0.7 : 0.2}
            roughness={0.1}
          />
        </mesh>

        {/* Signage */}
        <group position={[0, 5.6, 4.1]}>
          <Text
            fontSize={0.6}
            color={isBlackout ? '#333333' : '#B7FF00'}
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            CTRL COWORK
          </Text>
        </group>
      </group>
    </group>
  );
}
