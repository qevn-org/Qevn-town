'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

interface CloudProps {
  initialPos: [number, number, number];
  speed: number;
}

function FloatingCloud({ initialPos, speed }: CloudProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.x += speed * delta;
    if (meshRef.current.position.x > 75) {
      meshRef.current.position.x = -75;
    }
  });

  return (
    <group ref={meshRef} position={initialPos}>
      {/* Brutalist geometric cloud cluster */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[9, 2.4, 5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
      <mesh position={[3.2, 1.2, 0.6]} castShadow>
        <boxGeometry args={[5.5, 2.5, 3.8]} />
        <meshStandardMaterial color="#F0F0EE" roughness={0.9} />
      </mesh>
      <mesh position={[-3.2, 0.8, -0.6]} castShadow>
        <boxGeometry args={[5, 2.0, 3.8]} />
        <meshStandardMaterial color="#F5F5F0" roughness={0.9} />
      </mesh>
    </group>
  );
}

function RainParticles() {
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 110;
      pos[i * 3 + 1] = Math.random() * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 110;
      vel[i] = 22 + Math.random() * 12;
    }
    return [pos, vel];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] -= velocities[i] * delta;
      if (array[i * 3 + 1] < 0) {
        array[i * 3 + 1] = 45;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#BAE6FD"
        size={0.14}
        transparent
        opacity={0.65}
      />
    </points>
  );
}

export function Environment() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const weather = useTownStore((s) => s.weather);
  const isBlackout = useTownStore((s) => s.isBlackout);

  useFrame(({ scene }, delta) => {
    let targetSkyColor = new THREE.Color('#D8E2DC'); // Day crisp clean concrete sky

    if (isBlackout) {
      targetSkyColor = new THREE.Color('#050508');
    } else if (weather === 'rain') {
      targetSkyColor = new THREE.Color('#1E293B'); // Overcast stormy slate
    } else if (timeOfDay === 'dusk') {
      targetSkyColor = new THREE.Color('#F08A5D'); // Warm amber dusk
    } else if (timeOfDay === 'night') {
      targetSkyColor = new THREE.Color('#0B0F19'); // Deep midnight navy
    }

    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(targetSkyColor, delta * 3);
    } else {
      scene.background = targetSkyColor.clone();
    }

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(targetSkyColor, delta * 3);
      scene.fog.near = weather === 'rain' ? 25 : 35;
      scene.fog.far = weather === 'rain' ? 85 : 120;
    } else {
      scene.fog = new THREE.Fog(targetSkyColor, 35, 120);
    }
  });

  const isRain = weather === 'rain';

  return (
    <group>
      {/* Floating low-poly brutalist clouds */}
      <FloatingCloud initialPos={[-35, 28, -12]} speed={1.2} />
      <FloatingCloud initialPos={[12, 32, -40]} speed={0.9} />
      <FloatingCloud initialPos={[-50, 26, 25]} speed={1.5} />
      <FloatingCloud initialPos={[30, 30, 20]} speed={1.1} />

      {/* Dynamic Rain Particles */}
      {isRain && <RainParticles />}

      {/* Ground Substrate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[260, 260]} />
        <meshStandardMaterial
          color={isRain ? '#9E9C94' : '#DEDCD3'}
          roughness={isRain ? 0.3 : 0.95}
          metalness={isRain ? 0.2 : 0}
        />
      </mesh>

      {/* Grid overlay lines on the ground substrate */}
      <gridHelper args={[200, 50, '#888880', '#BFBFB8']} position={[0, 0.01, 0]} />
    </group>
  );
}
