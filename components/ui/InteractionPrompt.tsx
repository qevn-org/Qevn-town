'use client';

import { useTownStore } from '@/lib/store';
import { Sparkles } from 'lucide-react';

export function InteractionPrompt() {
  const activeLocation = useTownStore((s) => s.activeLocation);
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const triggerInteract = useTownStore((s) => s.triggerInteract);

  if (!activeLocation || activeOverlay !== 'none') {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <button
        onClick={triggerInteract}
        className="brutalist-btn bg-[#B7FF00] text-black px-5 py-3 text-sm sm:text-base font-black tracking-wider brutalist-shadow-lg animate-pulse"
      >
        <Sparkles className="w-4 h-4 text-black" />
        <span className="font-mono bg-black text-[#B7FF00] px-1.5 py-0.5 rounded-xs mr-1">
          E
        </span>
        {activeLocation.promptLabel}
      </button>
    </div>
  );
}
