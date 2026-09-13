'use client';

import { useEffect } from 'react';
import { useTownStore } from '@/lib/store';
import { soundManager } from '@/lib/audio';
import confetti from 'canvas-confetti';
import { X, ShieldAlert, Award, ArrowRight, Terminal } from 'lucide-react';

export function SecretBunkerOverlay() {
  const activeOverlay = useTownStore((s) => s.activeOverlay);
  const closeOverlay = useTownStore((s) => s.closeOverlay);
  const soundEnabled = useTownStore((s) => s.soundEnabled);

  useEffect(() => {
    if (activeOverlay === 'secret-bunker') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B7FF00', '#FFD400', '#FF4444', '#3A7DFF'],
        });
      } catch {}
    }
  }, [activeOverlay]);

  if (activeOverlay !== 'secret-bunker') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl brutalist-border-thick bg-[#0A0A0A] text-[#F7F7F2] p-6 sm:p-10 brutalist-shadow-lime border-[#B7FF00]">
        {/* Top Warning Ribbon */}
        <div className="flex items-center justify-between border-b-2 border-neutral-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#FFD400]" />
            <span className="font-mono text-xs font-black text-[#FFD400] uppercase tracking-widest">
              EASTER EGG UNLOCKED // ARCHIVE 001
            </span>
          </div>
          <button
            onClick={closeOverlay}
            className="brutalist-btn bg-[#B7FF00] text-black p-1.5 hover:bg-[#a5ea00]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Secret Title */}
        <div className="mb-6">
          <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-1">
            MUNICIPAL BREAKER TRIPPED
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#B7FF00]">
            YOU FOUND THE QEVN SECRET.
          </h2>
        </div>

        {/* Narrative Box */}
        <div className="border-2 border-neutral-800 bg-[#141414] p-5 mb-6 font-mono text-xs sm:text-sm leading-relaxed text-neutral-300 space-y-3">
          <p>
            The sign clearly instructed <span className="text-[#FF4444] font-bold">&quot;DO NOT TOUCH&quot;</span>, yet you pulled the high-voltage breaker anyway.
          </p>
          <p>
            At QEVN, we build for people with this exact brand of relentless curiosity. Rules exist to be inspected, systems exist to be cracked open, and standard digital boundaries exist to be transcended.
          </p>
          <div className="flex items-center gap-2 text-[#FFD400] pt-2 font-bold">
            <Award className="w-4 h-4" />
            <span>ACHIEVEMENT UNLOCKED: BREAKER-OVERRIDE // 001</span>
          </div>
        </div>

        {/* Terminal Lore */}
        <div className="bg-black border border-neutral-800 p-4 font-mono text-xs text-[#B7FF00] mb-8 space-y-1">
          <div className="flex items-center gap-1.5 text-neutral-500 mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>SUBTERRANEAN DEBUG TERMINAL</span>
          </div>
          <div>&gt; ACCESS_LEVEL: ROOT_ENGINEER</div>
          <div>&gt; EASTER_EGG_STATUS: 1 OF 3 DISCOVERED</div>
          <div>&gt; HINT_02: Check the AI Lab rooftop transmission at night.</div>
          <div>&gt; HINT_03: Rest on the quiet bench beside the Cafe fountain.</div>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            soundManager.playClick(soundEnabled);
            closeOverlay();
          }}
          className="w-full brutalist-btn bg-[#B7FF00] text-black py-3.5 px-6 text-sm font-black hover:bg-[#a5ea00]"
        >
          RESUME EXPLORING QEVN TOWN
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
