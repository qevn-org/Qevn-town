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
      {/* ================= 1. PIXEL COFFEE SPECIALTY ROASTERY (REBUILT ARCHITECTURE) ================= */}
      {/* Inspired by Reference Image 2 & 3: White concrete, warm wood slats, brick podium & glazed storefront */}
      <group position={[22, 0, 4]}>
        {/* Raised Terracotta Brick Podium Base (Reference Image 2) */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[11, 0.4, 11]} />
          <meshStandardMaterial color="#9A3412" roughness={0.88} />
        </mesh>

        {/* Main Architectural Building Body (White Board-Formed Concrete) */}
        <mesh position={[0, 3.2, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[9.8, 5.6, 9]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.82} />
        </mesh>

        {/* Warm Vertical Cedar Slat Feature Wall & Soffit */}
        <mesh position={[2.8, 3.2, 4.05]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 5.4, 0.15]} />
          <meshStandardMaterial color="#9A5B2D" roughness={0.55} />
        </mesh>
        {/* Slat relief ribs */}
        {[-1.4, -0.7, 0, 0.7, 1.4].map((sx, i) => (
          <mesh key={`slat-${i}`} position={[2.8 + sx, 3.2, 4.14]}>
            <boxGeometry args={[0.08, 5.4, 0.04]} />
            <meshStandardMaterial color="#3E200C" roughness={0.6} />
          </mesh>
        ))}

        {/* Floor-to-Ceiling Matte Black Steel Storefront Glazing */}
        <mesh position={[-1.8, 2.6, 4.05]}>
          <planeGeometry args={[5.6, 4.4]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive={isBlackout ? '#000000' : isNight ? '#FEF08A' : isDusk ? '#FDBA74' : '#BAE6FD'}
            emissiveIntensity={isNight ? 0.9 : isDusk ? 0.45 : 0.15}
            roughness={0.08}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Steel Storefront Mullions */}
        <mesh position={[-1.8, 2.6, 4.1]}>
          <boxGeometry args={[5.6, 0.06, 0.08]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        <mesh position={[-1.8, 2.6, 4.1]}>
          <boxGeometry args={[0.06, 4.4, 0.08]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>

        {/* Interior Roastery Depth Illusion (Espresso Machine & Barista Bar) */}
        {!isBlackout && (
          <group position={[-1.8, 0.4, 2.2]}>
            {/* Dark wood barista counter */}
            <mesh position={[0, 0.9, 0]} castShadow>
              <boxGeometry args={[4.2, 0.9, 1.0]} />
              <meshStandardMaterial color="#3E200C" roughness={0.5} />
            </mesh>
            {/* Chrome La Marzocco Espresso Machine silhouette */}
            <mesh position={[-0.8, 1.5, 0]} castShadow>
              <boxGeometry args={[1.1, 0.5, 0.6]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.2} metalness={0.95} />
            </mesh>
            {/* Hanging warm amber pendant lamps above counter */}
            {[-1.0, 0, 1.0].map((px, pi) => (
              <group key={`pendant-${pi}`} position={[px, 3.2, 0]}>
                <mesh>
                  <cylinderGeometry args={[0.01, 0.01, 1.2, 6]} />
                  <meshBasicMaterial color="#0A0A0A" />
                </mesh>
                <mesh position={[0, -0.6, 0]}>
                  <cylinderGeometry args={[0.08, 0.18, 0.22, 16]} />
                  <meshStandardMaterial
                    color="#F59E0B"
                    emissive="#F59E0B"
                    emissiveIntensity={isNight ? 1.8 : 0.6}
                  />
                </mesh>
              </group>
            ))}
          </group>
        )}

        {/* Architectural Cantilevered Entrance Canopy */}
        <mesh position={[-1.8, 5.0, 4.8]} castShadow>
          <boxGeometry args={[6.2, 0.15, 1.6]} />
          <meshStandardMaterial color="#1C1917" roughness={0.6} />
        </mesh>

        {/* Refined Blade Sign & 3D Typography */}
        <group position={[2.8, 4.8, 4.2]}>
          <Text
            fontSize={0.42}
            color="#FFD400"
            anchorX="center"
            anchorY="middle"
            fontWeight={900}
            letterSpacing={0.1}
          >
            PIXEL COFFEE
          </Text>
          <Text
            position={[0, -0.32, 0]}
            fontSize={0.16}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
            letterSpacing={0.08}
          >
            SPECIALTY ROASTERY // EST. 2024
          </Text>
        </group>

        {/* Minimalist 3D Ceramic Coffee Cup Sign on Roof */}
        <group position={[0, 6.4, 0]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.7, 0.5, 0.8, 20]} />
            <meshStandardMaterial color="#FFFBEB" roughness={0.3} />
          </mesh>
          {/* Coffee liquid surface */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.62, 0.62, 0.02, 20]} />
            <meshStandardMaterial color="#451A03" roughness={0.2} />
          </mesh>
          {/* Cup handle */}
          <mesh position={[0.72, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.22, 0.05, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#FFFBEB" roughness={0.3} />
          </mesh>
        </group>

        {/* ================= OUTDOOR STREET PATIO TERRACE ================= */}
        <group position={[0, 0.4, 5.8]}>
          {/* Raised teak timber deck platform */}
          <mesh position={[0, 0.06, 0]} receiveShadow>
            <boxGeometry args={[9.5, 0.12, 2.6]} />
            <meshStandardMaterial color="#9A5B2D" roughness={0.6} />
          </mesh>

          {/* Modern bistro table & chairs */}
          <group position={[-2.2, 0.12, 0]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.55, 0.04, 16]} />
              <meshStandardMaterial color="#0A0A0A" />
            </mesh>
            <mesh position={[0, 0.21, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.42, 8]} />
              <meshStandardMaterial color="#0A0A0A" />
            </mesh>
            {/* Canvas market umbrella */}
            <mesh position={[0, 1.6, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 1.8, 8]} />
              <meshStandardMaterial color="#D4A373" />
            </mesh>
            <mesh position={[0, 2.4, 0]} castShadow>
              <coneGeometry args={[1.4, 0.6, 8]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.7} />
            </mesh>
            {/* 2 bistro wire chairs */}
            <mesh position={[-0.7, 0.22, 0]} castShadow>
              <boxGeometry args={[0.34, 0.04, 0.34]} />
              <meshStandardMaterial color="#0A0A0A" />
            </mesh>
            <mesh position={[0.7, 0.22, 0]} castShadow>
              <boxGeometry args={[0.34, 0.04, 0.34]} />
              <meshStandardMaterial color="#0A0A0A" />
            </mesh>
          </group>

          {/* Chalkboard Menu A-Frame on street corner */}
          <group position={[3.2, 0.12, 0.6]} rotation={[0, -0.4, 0]}>
            <mesh position={[0, 0.45, 0]} castShadow>
              <boxGeometry args={[0.55, 0.8, 0.08]} />
              <meshStandardMaterial color="#1C1917" roughness={0.7} />
            </mesh>
            <Text
              position={[0, 0.6, 0.05]}
              fontSize={0.08}
              color="#FFD400"
              anchorX="center"
              anchorY="middle"
              fontWeight={900}
            >
              MENU
            </Text>
            <Text
              position={[0, 0.4, 0.05]}
              fontSize={0.06}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.45}
              textAlign="center"
              fontWeight={700}
            >
              BATCH BREW{'\n'}FLAT WHITE{'\n'}COLD BREW
            </Text>
          </group>
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
