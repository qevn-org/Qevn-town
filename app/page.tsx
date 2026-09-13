'use client';

import dynamic from 'next/dynamic';
import { useTownStore } from '@/lib/store';
import { BootScreen } from '@/components/ui/BootScreen';
import { HUD } from '@/components/ui/HUD';
import { InteractionPrompt } from '@/components/ui/InteractionPrompt';
import { MiniMap } from '@/components/ui/MiniMap';
import { MainMenu } from '@/components/ui/MainMenu';
import { MobileControls } from '@/components/ui/MobileControls';
import { FallbackMode } from '@/components/ui/FallbackMode';

import { HqOverlay } from '@/components/overlays/HqOverlay';
import { AiLabOverlay } from '@/components/overlays/AiLabOverlay';
import { ProjectOverlay } from '@/components/overlays/ProjectOverlay';
import { CafeOverlay } from '@/components/overlays/CafeOverlay';
import { PostOfficeOverlay } from '@/components/overlays/PostOfficeOverlay';
import { SecretBunkerOverlay } from '@/components/overlays/SecretBunkerOverlay';
import { DiscoveriesPanel } from '@/components/overlays/DiscoveriesPanel';
import { CommercialStudyOverlay } from '@/components/overlays/CommercialStudyOverlay';
import { CentralStationOverlay } from '@/components/overlays/CentralStationOverlay';
import { InfoKioskOverlay } from '@/components/overlays/InfoKioskOverlay';

// Dynamic import with ssr: false for Three.js Canvas
const TownCanvas = dynamic(
  () => import('@/components/town/TownCanvas').then((mod) => mod.TownCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center font-mono text-sm text-[#B7FF00]">
        INITIALIZING TOWN CANVAS...
      </div>
    ),
  }
);

export default function TownPage() {
  const gameState = useTownStore((s) => s.gameState);
  const isBlackout = useTownStore((s) => s.isBlackout);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] select-none">
      {/* 3D R3F Canvas World */}
      {gameState !== 'fallback' && <TownCanvas />}

      {/* Emergency Blackout Screen Effect (Tripped by Secret Breaker) */}
      {isBlackout && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-black/95 transition-opacity duration-150 flex items-center justify-center">
          <div className="font-mono text-xs sm:text-sm text-[#FF4444] font-black tracking-widest animate-ping">
            ⚠️ EMERGENCY SYSTEM SHUTDOWN // BREAKER TRIPPED
          </div>
        </div>
      )}

      {/* Scanline CRT overlay filter */}
      <div className="scanlines fixed inset-0 z-10 pointer-events-none opacity-25" />

      {/* Boot Screen */}
      {gameState === 'boot' && <BootScreen />}

      {/* Active Game HUD & Overlays */}
      {gameState === 'playing' && (
        <>
          <HUD />
          <InteractionPrompt />
          <MiniMap />
          <MainMenu />
          <MobileControls />

          {/* Core Overlays */}
          <HqOverlay />
          <AiLabOverlay />
          <ProjectOverlay />
          <CafeOverlay />
          <PostOfficeOverlay />
          <SecretBunkerOverlay />
          <DiscoveriesPanel />
          <CommercialStudyOverlay />
          <CentralStationOverlay />
          <InfoKioskOverlay />
        </>
      )}

      {/* Non-WebGL Fallback Mode */}
      {gameState === 'fallback' && (
        <>
          <FallbackMode />
          <HqOverlay />
          <AiLabOverlay />
          <ProjectOverlay />
          <CafeOverlay />
          <PostOfficeOverlay />
          <SecretBunkerOverlay />
          <DiscoveriesPanel />
          <CommercialStudyOverlay />
          <CentralStationOverlay />
          <InfoKioskOverlay />
        </>
      )}
    </main>
  );
}
