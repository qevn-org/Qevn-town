'use client';

import { useEffect } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import {
  X,
  Play,
  Compass,
  FolderGit2,
  Cpu,
  Coffee,
  Mail,
  KeyRound,
  Volume2,
  VolumeX,
  RotateCcw,
} from 'lucide-react';

export function MainMenu() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const teleportTo = useTownStore((s) => s.teleportTo);
  const soundEnabled = useTownStore((s) => s.soundEnabled);
  const toggleSound = useTownStore((s) => s.toggleSound);
  const discoveredSecrets = useTownStore((s) => s.discoveredSecrets);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      if (e.code === 'Escape') {
        if (activeOverlay !== 'none') {
          closeOverlay();
        } else {
          soundManager.playClick(soundEnabled);
          openOverlay('menu');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOverlay, closeOverlay, openOverlay, soundEnabled]);

  if (activeOverlay !== 'menu') return null;

  const handleAction = (cb: () => void) => {
    soundManager.playClick(soundEnabled);
    cb();
  };

  const handleRespawn = () => {
    soundManager.playChime(soundEnabled);
    teleportTo([0, 0.08, 8]);
    closeOverlay();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg brutalist-border-thick bg-[#F7F7F2] text-black p-6 sm:p-8 brutalist-shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-black pb-4 mb-6">
          <div>
            <div className="font-mono text-xs font-bold text-[#B7FF00] bg-black px-2 py-0.5 inline-block uppercase">
              SYSTEM CONSOLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">
              MAIN MENU
            </h2>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-black text-[#F7F7F2] p-2 hover:bg-neutral-800"
            title="Resume (ESC)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Actions List */}
        <div className="space-y-2.5">
          <button
            onClick={closeOverlay}
            className="w-full brutalist-btn bg-[#B7FF00] text-black py-3 px-4 text-sm sm:text-base font-black hover:bg-[#a5ea00] justify-start"
          >
            <Play className="w-5 h-5 fill-current" />
            RESUME EXPLORATION
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('map'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#FFD400] justify-start"
          >
            <Compass className="w-5 h-5 text-neutral-700" />
            MUNICIPAL MAP & TELEPORT [M]
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('hq'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#B7FF00] justify-start"
          >
            <span className="font-mono font-black text-xs bg-black text-[#B7FF00] px-1.5 py-0.5 mr-1">
              HQ
            </span>
            QEVN HEADQUARTERS & DOSSIER
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('project'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#FF4444] hover:text-white justify-start"
          >
            <FolderGit2 className="w-5 h-5 text-neutral-700" />
            SHIPPED PROJECTS & CASE STUDIES
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('ai-lab'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#3A7DFF] hover:text-white justify-start"
          >
            <Cpu className="w-5 h-5 text-neutral-700" />
            AI LAB & AUTONOMOUS AGENTS
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('cafe'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#FFD400] justify-start"
          >
            <Coffee className="w-5 h-5 text-neutral-700" />
            QEVN CAFE // DISPATCHES
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('post-office'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#B7FF00] justify-start"
          >
            <Mail className="w-5 h-5 text-neutral-700" />
            POST OFFICE // COMMISSION INQUIRY
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('station'))}
            className="w-full brutalist-btn bg-white text-black py-2.5 px-4 text-sm font-bold hover:bg-[#B7FF00] justify-start"
          >
            <span className="font-mono font-black text-xs bg-black text-[#B7FF00] px-1.5 py-0.5 mr-1">
              TRANSIT
            </span>
            QEVN CENTRAL STATION // RAPID TRANSIT
          </button>

          <button
            onClick={() => handleAction(() => openOverlay('discoveries'))}
            className="w-full brutalist-btn bg-neutral-100 text-black py-2.5 px-4 text-sm font-bold hover:bg-neutral-200 justify-start"
          >
            <KeyRound className="w-5 h-5 text-amber-600" />
            DISCOVERIES & EASTER EGGS ({discoveredSecrets.length}/5)
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-black">
            <button
              onClick={() => handleAction(toggleSound)}
              className="brutalist-btn bg-white text-black py-2 px-3 text-xs font-bold hover:bg-neutral-200"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {soundEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED'}
            </button>
            <button
              onClick={handleRespawn}
              className="brutalist-btn bg-white text-black py-2 px-3 text-xs font-bold hover:bg-neutral-200"
            >
              <RotateCcw className="w-4 h-4" />
              RESPAWN PLAZA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
