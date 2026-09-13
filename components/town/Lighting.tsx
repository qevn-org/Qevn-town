'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTownStore } from '@/lib/store';

export function Lighting() {
  const timeOfDay = useTownStore((s) => s.timeOfDay);
  const weather = useTownStore((s) => s.weather);
  const isBlackout = useTownStore((s) => s.isBlackout);

  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);

  useFrame((_, delta) => {
    if (!dirLightRef.current || !ambientLightRef.current || !hemiLightRef.current) return;

    if (isBlackout) {
      // Sudden emergency blackout
      dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, 0.04, delta * 15);
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, 0.06, delta * 15);
      return;
    }

    let targetDirIntensity = 2.2;
    let targetAmbientIntensity = 0.85;
    let targetDirColor = new THREE.Color('#FFFFFF');
    let targetAmbientColor = new THREE.Color('#E5E5DF');
    let targetGroundColor = new THREE.Color('#9E9E98');

    if (weather === 'rain') {
      targetDirIntensity = 0.9;
      targetAmbientIntensity = 0.65;
      targetDirColor = new THREE.Color('#94A3B8');
      targetAmbientColor = new THREE.Color('#64748B');
      targetGroundColor = new THREE.Color('#334155');
    } else if (timeOfDay === 'dusk') {
      targetDirIntensity = 1.4;
      targetAmbientIntensity = 0.6;
      targetDirColor = new THREE.Color('#FFA64D');
      targetAmbientColor = new THREE.Color('#8A5D8A');
      targetGroundColor = new THREE.Color('#3A2A4A');
    } else if (timeOfDay === 'night') {
      targetDirIntensity = 0.45;
      targetAmbientIntensity = 0.35;
      targetDirColor = new THREE.Color('#6E88D6');
      targetAmbientColor = new THREE.Color('#1A2035');
      targetGroundColor = new THREE.Color('#0A0C14');
    }

    dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, targetDirIntensity, delta * 3);
    dirLightRef.current.color.lerp(targetDirColor, delta * 3);

    ambientLightRef.current.intensity = THREE.MathUtils.lerp(ambientLightRef.current.intensity, targetAmbientIntensity, delta * 3);
    ambientLightRef.current.color.lerp(targetAmbientColor, delta * 3);

    hemiLightRef.current.color.lerp(targetAmbientColor, delta * 3);
    hemiLightRef.current.groundColor.lerp(targetGroundColor, delta * 3);
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.85} color="#E5E5DF" />
      <hemisphereLight ref={hemiLightRef} args={['#E5E5DF', '#9E9E98', 0.5]} />
      <directionalLight
        ref={dirLightRef}
        position={[35, 48, 28]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={140}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={55}
        shadow-camera-bottom={-55}
        shadow-bias={-0.0005}
      />
    </>
  );
}
