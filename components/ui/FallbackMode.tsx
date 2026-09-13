'use client';

import { useTownStore } from '@/lib/store';
import { TOWN_LOCATIONS } from '@/data/locations';
import { soundManager } from '@/lib/audio';
import { Building2, Cpu, Coffee, FolderGit2, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

export function FallbackMode() {
  const gameState = useTownStore((s) => s.gameState);
  const openOverlay = useTownStore((s) => s.openOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  if (gameState !== 'fallback') return null;

  const handleOpen = (id: string) => {
    soundManager.playClick(soundEnabled);
    if (id === 'hq') openOverlay('hq');
    else if (id === 'ai-lab') openOverlay('ai-lab');
    else if (id === 'cafe') openOverlay('cafe');
    else if (id === 'projects') openOverlay('project');
    else if (id === 'post-office') openOverlay('post-office');
    else if (id === 'secret-switch') openOverlay('secret-bunker');
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'hq':
        return <Building2 className="w-6 h-6 text-black" />;
      case 'ai-lab':
        return <Cpu className="w-6 h-6 text-black" />;
      case 'cafe':
        return <Coffee className="w-6 h-6 text-black" />;
      case 'projects':
        return <FolderGit2 className="w-6 h-6 text-black" />;
      case 'post-office':
        return <Mail className="w-6 h-6 text-black" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-black" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-[#F7F7F2] p-6 sm:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-4 border-[#B7FF00] pb-6 mb-8">
          <div className="font-mono text-xs font-bold text-[#B7FF00] uppercase tracking-widest mb-1">
            QEVN TOWN // LIGHTWEIGHT ACCESS MODE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            QEVN <span className="text-[#B7FF00]">DIRECTORY</span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
            WebGL is either disabled or unsupported on this device. Explore all town locations and services through our 2D spatial directory below.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {TOWN_LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="brutalist-border-thick bg-[#F7F7F2] text-black p-6 brutalist-shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 border-3 border-black flex items-center justify-center shadow-md"
                    style={{ backgroundColor: loc.accentColor }}
                  >
                    {getIcon(loc.id)}
                  </div>
                  <span className="font-mono text-xs font-black bg-black text-[#F7F7F2] px-2.5 py-0.5 uppercase">
                    {loc.district}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-1">
                  {loc.name}
                </h3>
                <p className="font-mono text-xs text-neutral-600 font-bold mb-3">
                  {loc.tagline}
                </p>
                <p className="font-mono text-xs text-neutral-700 leading-relaxed mb-6">
                  {loc.description}
                </p>
              </div>

              <button
                onClick={() => handleOpen(loc.id)}
                className="w-full brutalist-btn py-3 px-4 text-xs font-black uppercase justify-between"
                style={{ backgroundColor: loc.accentColor, color: '#000000' }}
              >
                <span>{loc.promptLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
