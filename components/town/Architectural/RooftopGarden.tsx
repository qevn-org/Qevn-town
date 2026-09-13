'use client';

import * as THREE from 'three';
import { PBR_MATERIALS } from '@/lib/materials';

export function RooftopGarden({
  position = [0, 0, 0],
  width = 8,
  depth = 6,
}: {
  position?: [number, number, number];
  width?: number;
  depth?: number;
}) {
  return (
    <group position={position}>
      {/* Teak Wood Decking */}
      <mesh position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[width, 0.08, depth]} />
        <meshStandardMaterial color="#9A5B2D" roughness={0.6} />
      </mesh>

      {/* Glass Balustrade with Top Rail */}
      {/* Front glass rail */}
      <mesh position={[0, 0.55, depth / 2 - 0.05]}>
        <boxGeometry args={[width, 0.9, 0.04]} />
        <primitive object={PBR_MATERIALS.GLASS_BALUSTRADE} attach="material" />
      </mesh>
      {/* Front rail stainless steel cap */}
      <mesh position={[0, 1.02, depth / 2 - 0.05]}>
        <boxGeometry args={[width, 0.04, 0.06]} />
        <primitive object={PBR_MATERIALS.METAL_BRUSHED_ALUMINUM} attach="material" />
      </mesh>

      {/* Left glass rail */}
      <mesh position={[-width / 2 + 0.05, 0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[depth, 0.9, 0.04]} />
        <primitive object={PBR_MATERIALS.GLASS_BALUSTRADE} attach="material" />
      </mesh>
      <mesh position={[-width / 2 + 0.05, 1.02, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[depth, 0.04, 0.06]} />
        <primitive object={PBR_MATERIALS.METAL_BRUSHED_ALUMINUM} attach="material" />
      </mesh>

      {/* Right glass rail */}
      <mesh position={[width / 2 - 0.05, 0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[depth, 0.9, 0.04]} />
        <primitive object={PBR_MATERIALS.GLASS_BALUSTRADE} attach="material" />
      </mesh>
      <mesh position={[width / 2 - 0.05, 1.02, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[depth, 0.04, 0.06]} />
        <primitive object={PBR_MATERIALS.METAL_BRUSHED_ALUMINUM} attach="material" />
      </mesh>

      {/* Outdoor Dining Table & Chairs (Matching Reference Image 3 & 4) */}
      <group position={[0, 0.08, 0]}>
        {/* Travertine round tabletop */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.1, 0.08, 24]} />
          <meshStandardMaterial color="#EAE8E3" roughness={0.7} />
        </mesh>
        {/* Table pedestal base */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.45, 0.68, 16]} />
          <meshStandardMaterial color="#1C1917" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* 4 Surrounding modern dining armchairs */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => {
          const cx = Math.cos(angle) * 1.5;
          const cz = Math.sin(angle) * 1.5;
          return (
            <group key={i} position={[cx, 0, cz]} rotation={[0, -angle - Math.PI / 2, 0]}>
              {/* Seat cushion */}
              <mesh position={[0, 0.42, 0]} castShadow>
                <boxGeometry args={[0.6, 0.08, 0.55]} />
                <meshStandardMaterial color="#F4F4F0" roughness={0.8} />
              </mesh>
              {/* Curved backrest */}
              <mesh position={[0, 0.65, -0.24]} castShadow>
                <boxGeometry args={[0.6, 0.38, 0.08]} />
                <meshStandardMaterial color="#334155" roughness={0.6} />
              </mesh>
              {/* Slim black chair legs */}
              <mesh position={[-0.24, 0.2, -0.2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#0A0A0A" />
              </mesh>
              <mesh position={[0.24, 0.2, -0.2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#0A0A0A" />
              </mesh>
              <mesh position={[-0.24, 0.2, 0.2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#0A0A0A" />
              </mesh>
              <mesh position={[0.24, 0.2, 0.2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
                <meshStandardMaterial color="#0A0A0A" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Modern Sun Loungers on Terrace */}
      <group position={[-width / 2 + 1.6, 0.08, -depth / 2 + 1.4]} rotation={[0, 0.2, 0]}>
        {/* Chaise cushion */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.7, 0.12, 1.8]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.7} />
        </mesh>
        {/* Angled backrest */}
        <mesh position={[0, 0.38, -0.65]} rotation={[-0.4, 0, 0]} castShadow>
          <boxGeometry args={[0.68, 0.1, 0.7]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.7} />
        </mesh>
        {/* Charcoal frame */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.76, 0.14, 1.86]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
      </group>

      {/* Potted Architectural Trees (Matching Reference 3 & 4) */}
      <group position={[width / 2 - 1.2, 0.08, -depth / 2 + 1.2]}>
        {/* White concrete cube planter */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.7, 0.9]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.8} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.82, 0.02, 0.82]} />
          <meshStandardMaterial color="#2B1D15" roughness={0.9} />
        </mesh>
        {/* Tree trunk */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 1.4, 8]} />
          <meshStandardMaterial color="#422006" roughness={0.9} />
        </mesh>
        {/* Lush spherical/layered canopy */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <sphereGeometry args={[0.75, 12, 12]} />
          <meshStandardMaterial color="#166534" roughness={0.8} />
        </mesh>
        <mesh position={[0.2, 2.5, 0.1]} castShadow>
          <sphereGeometry args={[0.55, 10, 10]} />
          <meshStandardMaterial color="#15803D" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
